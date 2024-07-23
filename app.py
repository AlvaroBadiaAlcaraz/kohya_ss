import shutil
from flask import Flask, request, jsonify, send_from_directory
import os

import toml
from logic import describir_y_copiar, crear_entorno, obtener_carpeta_entrenamiento, start_train
import logic

app = Flask(__name__)


@app.route('/api/process', methods=['POST'])
def process_data():
    data = request.json
    # Aquí puedes acceder a los parámetros y ejecutar tu lógica
    param1 = data.get('param1')
    param2 = data.get('param2')
    # Realiza la lógica deseada con los parámetros
    result = f"Processed: {param1} and {param2}"
    return jsonify({"result": result})

@app.route('/api/addKey', methods=['POST'])
def addKey():
    data = request.json
    param1 = data.get('param1')
    os.environ["CLARIFAI_PAT"] = param1
    
    return jsonify("Clave clarifai añadida")

@app.route('/api/upload', methods=['POST'])
def upload_files():

    dir = 'input'
    
    try:
        if os.path.isdir(dir):
            # Si la carpeta está vacía, usa os.rmdir
            if not os.listdir(dir):
                os.rmdir(dir)
                print(f"La carpeta vacía '{dir}' ha sido eliminada con éxito.")
            else:
                # Si la carpeta tiene contenido, usa shutil.rmtree
                shutil.rmtree(dir)
                print(f"La carpeta '{dir}' y su contenido han sido eliminados con éxito.")
        else:
            print(f"'{dir}' no es una carpeta.")
    except FileNotFoundError:
        print(f"La carpeta '{dir}' no existe.")
    except OSError as e:
        print(f"Error al eliminar la carpeta '{dir}': {e}")

    try:
        os.mkdir(dir)
        print(f"La carpeta '{dir}' ha sido creada con éxito.")
    except FileExistsError:
        print(f"La carpeta '{dir}' ya existe.")
    except OSError as e:
        print(f"Error al crear la carpeta '{dir}': {e}")
        

    if 'files' not in request.files:
        return 'No files part in the request', 400
    
    files = request.files.getlist('files')
    for file in files:
        if file:
            file.save(os.path.join(dir, file.filename))
    
    return jsonify('Files successfully uploaded', 200)


@app.route('/api/env', methods=['POST'])
def create_env():
    data = request.json
    sujeto = data.get('sujeto')
    clase = data.get('clase')

    #TODO guardar nombre modelo en el config del lora

    if clase == "Hombre":
        clase = "man"
    elif clase == "Mujer":
        clase = "woman"

    image_train = crear_entorno("input", sujeto, clase)

    describir_y_copiar("input", image_train, sujeto)

    result = f"Entorno creado con éxito"
    return jsonify({"result": result})


@app.route('/api/images', methods=['GET'])
def get_images():

    Image_folder = obtener_carpeta_entrenamiento("entorno")

    files = os.listdir(Image_folder)
    images = [f for f in files if f.endswith('.jpg') or f.endswith('.png') or f.endswith('.PNG') or f.endswith('.JPG')]
    data = []
    for img in images:
        txt_file = os.path.splitext(img)[0] + '.txt'
        txt_path = os.path.join(Image_folder, txt_file)
        if os.path.exists(txt_path):
            with open(txt_path, 'r') as file:
                description = file.read()
        else:
            description = ''
        data.append({'image': img, 'description': description})
    return jsonify(data)


@app.route('/images/<filename>', methods=['GET'])
def get_image(filename):

    Image_folder = obtener_carpeta_entrenamiento("entorno")
    
    return send_from_directory(Image_folder, filename)


@app.route('/api/update_description', methods=['POST'])
def update_description():

    Image_folder = obtener_carpeta_entrenamiento("entorno")

    data = request.json
    image = data['image']
    description = data['description']
    txt_file = os.path.splitext(image)[0] + '.txt'
    txt_path = os.path.join(Image_folder, txt_file)
    with open(txt_path, 'w') as file:
        file.write(description)
    return jsonify({'status': 'success'})


@app.route('/api/crear_config', methods=['POST'])
def crear_config():

    TOML_FOLDER = 'config_lora'

    base_env = os.getcwd()

    data = request.json
    filename = data.get('filename', 'default.toml')
    content = data.get('content', {})

    if not os.path.exists(TOML_FOLDER):
        os.makedirs(TOML_FOLDER)

    file_path = os.path.join(TOML_FOLDER, filename)
    with open(file_path, 'w') as toml_file:
        toml.dump(content, toml_file)

    config_lora = toml.load(file_path)

    config_lora['sample_prompts'] = base_env + "\config_lora\prompt.txt"

    with open(file_path, 'w') as toml_file:
        toml.dump(config_lora, toml_file)

    prompt_file_path = os.path.join(TOML_FOLDER, 'prompt.txt')
    with open(prompt_file_path, 'w') as prompt_file:
        prompt_file.write('')

    return jsonify({'status': 'success', 'file_path': file_path})


@app.route('/api/cargar_config', methods = ['GET'])
def cargar_config():

    TOML_FOLDER = 'config_lora'

    filename = request.args.get('filename', 'default.toml')
    file_path = os.path.join(TOML_FOLDER, filename)
    
    if not os.path.exists(file_path):
        return jsonify({'error': 'File not found'}), 404
    
    with open(file_path, 'r') as toml_file:
        content = toml.load(toml_file)
    
    return jsonify(content)


@app.route('/api/update_config', methods=['POST'])
def update_config():

    TOML_FOLDER = 'config_lora'

    data = request.json
    filename = data.get('filename', 'default.toml')
    content = data.get('content', {})

    file_path = os.path.join(TOML_FOLDER, filename)
    if not os.path.exists(file_path):
        return jsonify({'error': 'File not found'}), 404
    
    with open(file_path, 'w') as toml_file:
        toml.dump(content, toml_file)

    return jsonify({'status': 'success', 'file_path': file_path})


@app.route('/api/start_train', methods=['GET'])
def start_training():
    # Aquí puedes realizar cualquier lógica que necesites
    data = {
        'message': 'Entrenamiento completado',
        'status': 'success'
    }

    start_train()

    return jsonify(data)


@app.route('/api/list_files', methods=['GET'])
def list_files():
    MODEL_FOLDER = 'entorno/model'
    files = os.listdir(MODEL_FOLDER)
    return jsonify({"files": files})

# Endpoint para descargar un archivo
@app.route('/api/download/<filename>', methods=['GET'])
def download_file(filename):

    MODEL_FOLDER = 'entorno/model'   
    return send_from_directory(MODEL_FOLDER, filename)


if __name__ == '__main__':
    app.run(debug=True)
