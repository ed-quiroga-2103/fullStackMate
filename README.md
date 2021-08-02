# fullStackMate
Frontend y Backend, Proyecto Matemática


# Requerimientos

Los requierimientos del sistema son los siguientes:

## Frontend

Requerimientos:

* NodeJS
* Node Package Manager (NPM)

Los paquetes de NodeJS se deben instalar de la siguiente manera

```
npm install
```

## Backend

Requerimientos:

* Python 3.7+
* django
* djangorestframework
* django-cors-headers
* jwt
* pymongo

* MongoDB

#### Virtual Enviroment

Se debe crear un virtual enviroment donde se van a instalar las dependencias de Python

```
python3 -m venv env
source env/bin/activate  # On Windows use `env\Scripts\activate`
```

#### Dependencias de Python

Se pueden instalar mediante _pip_:
```
pip install django djangoframework django-cors-headers PyJWT pymongo
```

#### MongoDB

Se debe instalar MongoDB. En la siguiente dirección se encuentran las instrucciones de instalacion: https://docs.mongodb.com/manual/installation/

Adicionalmente, se recomienda instalar la herramienta MongoDBCompass para administrar la base de datos con mayor facilidad.


# Instrucciones de Ejecución

Las instrucciones de ejecución son las siguientes:

## Frontend

Para la ejecución en desarrollo, se puede ejecutar el siguiente comando para compilar y ejecutar con hot-reloads

```
npm run serve
```

## Backend

### Server

Ejecución del servidor Django:
Ref: https://www.django-rest-framework.org/tutorial/quickstart/

```
#Se debe ingresar en el virtual enviroment

source env/bin/activate  # On Windows use `env\Scripts\activate`

python manage.py runserver
```



### MongoDB

Ejecución del Servidor
Ref: https://www.tutorialspoint.com/mongodb/mongodb_environment.htm


```
#La creacion de la carpeta solamente se debe realizar la primera vez que se ejecuta el servidor
C:\>md data
C:\md data\db 

C:\Users\XYZ>d:cd C:\Program Files\MongoDB\Server\4.2\bin
C:\Program Files\MongoDB\Server\4.2\bin>mongod.exe --dbpath "C:\data" 
```