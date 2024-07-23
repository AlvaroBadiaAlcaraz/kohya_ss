import shutil
from clarifai.client.model import Model
from clarifai.client.input import Inputs
import os
import json
import subprocess
import webbrowser
import toml

ruta_json = "clasificaciones.json"
etiquetas = {}
os.environ["CLARIFAI_PAT"] = ""
modelo_gpt_vision = "https://clarifai.com/openai/chat-completion/models/openai-gpt-4-vision"



#input_imagenes = 'input'
#archivos_input = os.listdir(carpeta_imagenes)


def crear_entorno(carpeta_input, sujeto, clase):

    n_inputs = len(os.listdir(carpeta_input))
    steps = round((1500/n_inputs))
    if steps < 100:
        steps = 100

    str_steps = str(steps)
    train_file = f"{str_steps}_{sujeto} {clase}"

    env = 'entorno'
    
    try:
        if os.path.isdir(env):
            # Si la carpeta está vacía, usa os.rmdir
            if not os.listdir(env):
                os.rmdir(env)
                print(f"La carpeta vacía '{env}' ha sido eliminada con éxito.")
            else:
                # Si la carpeta tiene contenido, usa shutil.rmtree
                shutil.rmtree(env)
                print(f"La carpeta '{env}' y su contenido han sido eliminados con éxito.")
        else:
            print(f"'{env}' no es una carpeta.")
    except FileNotFoundError:
        print(f"La carpeta '{env}' no existe.")
    except OSError as e:
        print(f"Error al eliminar la carpeta '{env}': {e}")

    try:
        os.mkdir(env)
        print(f"La carpeta '{env}' ha sido creada con éxito.")
    except FileExistsError:
        print(f"La carpeta '{env}' ya existe.")
    except OSError as e:
        print(f"Error al crear la carpeta '{env}': {e}")

    env_image = f"{env}/image"
    try:
        os.mkdir(env_image)
        print(f"La carpeta '{env_image}' ha sido creada con éxito.")
    except FileExistsError:
        print(f"La carpeta '{env_image}' ya existe.")
    except OSError as e:
        print(f"Error al crear la carpeta '{env_image}': {e}")

    env_model = f"{env}/model"
    try:
        os.mkdir(env_model)
        print(f"La carpeta '{env_model}' ha sido creada con éxito.")
    except FileExistsError:
        print(f"La carpeta '{env_model}' ya existe.")
    except OSError as e:
        print(f"Error al crear la carpeta '{env_model}': {e}")

    env_log = f"{env}/log"
    try:
        os.mkdir(env_log)
        print(f"La carpeta '{env_log}' ha sido creada con éxito.")
    except FileExistsError:
        print(f"La carpeta '{env_log}' ya existe.")
    except OSError as e:
        print(f"Error al crear la carpeta '{env_log}': {e}")

    image_train = f"{env}/image/{train_file}"
    try:
        os.mkdir(image_train)
        print(f"La carpeta '{image_train}' ha sido creada con éxito.")
    except FileExistsError:
        print(f"La carpeta '{image_train}' ya existe.")
    except OSError as e:
        print(f"Error al crear la carpeta '{image_train}': {e}")

    root = os.getcwd()
    file_path = 'config_lora/config_lora.toml'

    config_lora = toml.load(file_path)

    config_lora['logging_dir'] = root + "\entorno\log"
    config_lora['output_dir'] = root + "\entorno\model"
    config_lora['train_data_dir'] = root + "\entorno\image"
    config_lora['output_name'] = sujeto

    with open(file_path, 'w') as toml_file:
        toml.dump(config_lora, toml_file)

    return image_train


def describir_y_copiar(origen, destino, sujeto):

    prompt = "Describe using between 25 and 75 words the subject in the image, start the description with the string " + sujeto + " \
    and avoid using after that things as the subject o the individual, \
    describe the subject using the third person, focus the descrption on the physical attributes and ignore the background"

    # Recorrer la carpeta de origen
    for nombre_archivo in os.listdir(origen):
        ruta_archivo_origen = os.path.join(origen, nombre_archivo)

        # Verificar si el archivo es una imagen (puedes agregar más extensiones según sea necesario)
        if os.path.isfile(ruta_archivo_origen) and nombre_archivo.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp')):
            # Copiar la imagen a la carpeta de destino
            ruta_archivo_destino = os.path.join(destino, nombre_archivo)
            shutil.copy2(ruta_archivo_origen, ruta_archivo_destino)

            #Analizar la imagen y obtener descripción
            with open(ruta_archivo_destino, "rb") as f:
                file_bytes = f.read()

            inference_params = dict(temperature=0.2, max_tokens=100)
            inputs = [Inputs.get_multimodal_input(input_id="",image_bytes=file_bytes, raw_text=prompt)]

            model_prediction = Model(modelo_gpt_vision).predict(inputs,inference_params=inference_params)

            tags = model_prediction.outputs[0].data.text.raw

            # Crear el archivo .txt asociado a la imagen
            nombre_txt = os.path.splitext(nombre_archivo)[0] + '.txt'
            ruta_txt_destino = os.path.join(destino, nombre_txt)

            #Escribir la descripción en el .txt
            with open(ruta_txt_destino, 'w') as archivo_txt:
                archivo_txt.write(tags)

            print(f"Imagen '{nombre_archivo}' copiada y archivo '{nombre_txt}' creado.")


def modificar_config():
    #modificar el config d elora, no el general, el de lora es el que se usa en el entrenamiento sin necesidad de pasar por la gui
    with open('config.toml', 'r') as f:
        config = toml.load(f)

    root = os.getcwd()

    config["model"]["models_dir"] = "runwayml/stable-diffusion-v1-5"

    config["model"]["train_data_dir"]= root + "\entorno\image"

    config["folders"]["output_dir"] = root + "\entorno\model"

    config["folders"]["logging_dir"] = root + "\entorno\log"

    config["model"]["dataset_config"]=""
    config["folders"]["reg_data_dir"]=""
    config["advanced"]["vae_dir"]=""
    config["advanced"]["state_dir"]=""

    with open('config.toml', 'w') as f:
        toml.dump(config, f)


def start_train():

    root = os.getcwd()

    comando = [
    root + '\\venv\\Scripts\\accelerate.EXE',
    'launch',
    '--dynamo_backend', 'no',
    '--dynamo_mode', 'default',
    '--mixed_precision', 'fp16',
    '--num_processes', '1',
    '--num_machines', '1',
    '--num_cpu_threads_per_process', '2',
    root + '/sd-scripts/train_network.py',
    '--config_file',
    root + '\\config_lora\\config_lora.toml'
    ]

    try:
        resultado = subprocess.run(comando, check=True)
        print("El comando se ejecutó correctamente.")
    except subprocess.CalledProcessError as e:
        print(f"Error al ejecutar el comando: {e}")
    except FileNotFoundError:
        print("No se encontró el archivo especificado.")
    except Exception as e:
        print(f"Ocurrió un error inesperado: {e}")



"""
def launch_train_gui():
        # Especifica la ruta del archivo .bat que deseas ejecutar
    ruta_bat = "gui.bat"
    url = "http://127.0.0.1:7860"

    webbrowser.open_new_tab(url)

    # Ejecutar el archivo .bat
    try:
        resultado = subprocess.Popen([ruta_bat], shell=True)
        print("El archivo .bat se ejecutó correctamente.")
        resultado.wait()
    except subprocess.CalledProcessError as e:
        print(f"Error al ejecutar el archivo .bat: {e}")
    except FileNotFoundError:
        print("El archivo .bat no se encontró.")
"""

def obtener_carpeta_entrenamiento(base_path):
    image_path = os.path.join(base_path, 'image')
    carpetas = [f for f in os.listdir(image_path) if os.path.isdir(os.path.join(image_path, f))]
    
    if carpetas:
        # Suponiendo que solo hay una carpeta dinámica
        carpeta_entrenamiento = os.path.join(image_path, carpetas[0])
        return carpeta_entrenamiento
    else:
        return None

"""
def describe(archivos):
    for archivo in os.listdir(archivos):
        if archivo.endswith((".jpg", ".jpeg", ".png", ".JPG")):
            ruta_imagen = os.path.join(carpeta_imagenes, archivo)
            
            with open(ruta_imagen, "rb") as f:
                file_bytes = f.read()

            inference_params = dict(temperature=0.2, max_tokens=100)
            inputs = [Inputs.get_multimodal_input(input_id="",image_bytes=file_bytes, raw_text=prompt)]

            model_prediction = Model(modelo_gpt_vision).predict(inputs,inference_params=inference_params)

            tags = model_prediction.outputs[0].data.text.raw
            info = {archivo : tags}
            etiquetas.update(info)

            print(archivo + ":")
            print(tags)

    return etiquetas

def guardar_json(ruta):
    
    if os.path.exists(ruta):
        os.remove(ruta)

    if os.path.exists(ruta):
        with open(ruta, "r") as archivo_json:
            try:
                data = json.load(archivo_json)
            except json.decoder.JSONDecodeError:
                data = {}
    else:
        data = {}

    data.update(etiquetas)

    with open(ruta, "w") as archivo_json:
        json.dump(data, archivo_json)
"""

if __name__ == '__main__':
    #image_train = crear_entorno(input_imagenes, sujeto, clase)
    #describir_y_copiar(input_imagenes, image_train)
    #modificar_config()
    #launch_train_gui()
    start_train()
    #base_path = "entorno"
    #print(obtener_carpeta_entrenamiento(base_path))

    


    #describe(input_imagenes)
    #guardar_json(ruta_json)
