Modelo de entrenamiento loras: https://www.youtube.com/watch?v=70H03cv57-o&ab_channel=Aitrepreneur
Hilo reddit entrenamiento loras: https://www.reddit.com/r/StableDiffusion/comments/123z0gm/how_do_i_train_my_own_lora_locally_can_it_be_done/

Recortar imagenes para el entrenamiento con python: https://cloudinary.com/guides/automatic-image-cropping/cropping-images-in-python-with-pillow-and-opencv 

https://civitai.com/articles/391/tutorial-dreambooth-lora-training-using-kohyass

Parametros entrenamiento: https://github.com/bmaltais/kohya_ss/wiki/LoRA-training-parameters

Posible modelo python entrenamiento: https://huggingface.co/docs/diffusers/training/lora
https://www.yeschat.ai/blog-Train-your-own-LORA-model-in-30-minutes-LIKE-A-PRO-20527
https://machinelearningmastery.com/fine-tuning-stable-diffusion-with-lora/

Ejecutar .bat:
import subprocess

# Especifica la ruta del archivo .bat que deseas ejecutar
ruta_bat = 'ruta/al/archivo.bat'

# Ejecutar el archivo .bat
try:
    resultado = subprocess.run([ruta_bat], check=True, shell=True)
    print("El archivo .bat se ejecutó correctamente.")
except subprocess.CalledProcessError as e:
    print(f"Error al ejecutar el archivo .bat: {e}")
except FileNotFoundError:
    print("El archivo .bat no se encontró.")


Ejecutar comando desde un directorio:

import subprocess

# Especifica la ruta del directorio de trabajo y el comando que deseas ejecutar
directorio_trabajo = 'ruta/al/directorio'
comando = 'comando_a_ejecutar'

try:
    resultado = subprocess.run(comando, cwd=directorio_trabajo, check=True, shell=True)
    print("El comando se ejecutó correctamente.")
except subprocess.CalledProcessError as e:
    print(f"Error al ejecutar el comando: {e}")
except FileNotFoundError:
    print("El directorio de trabajo o el comando no se encontraron.")