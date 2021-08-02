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
* Django
* django-cors-headers

#### django-cors-headers

Se puede instalar mediante _pip_:
`python -m pip install django-cors-headers` 

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
# Create the project directory
mkdir tutorial
cd tutorial

# Create a virtual environment to isolate our package dependencies locally
python3 -m venv env
source env/bin/activate  # On Windows use `env\Scripts\activate`

# Install Django and Django REST framework into the virtual environment
pip install django
pip install djangorestframework

# Set up a new project with a single application
django-admin startproject tutorial .  # Note the trailing '.' character
cd tutorial
django-admin startapp quickstart
cd ..
```


### MongoDB

Ejecución del Servidor
Ref: https://www.tutorialspoint.com/mongodb/mongodb_environment.htm

```
C:\>md data
C:\md data\db

C:\Users\XYZ>d:cd C:\Program Files\MongoDB\Server\4.2\bin
C:\Program Files\MongoDB\Server\4.2\bin>mongod.exe --dbpath "C:\data" 
```


