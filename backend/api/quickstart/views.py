from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.decorators import api_view
from api.quickstart.serializers import UserSerializer, GroupSerializer
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from api.db_driver.mongo_driver import MongoDriver
import json
import jwt
import datetime
from functools import wraps


mongo_driver = MongoDriver('mate')


def token_required(f):
    @wraps(f)
    @api_view(['GET','POST'])
    def decorated(*args, **kwargs):
        token = None
        request = args[0]
        if 'X-Access-Token' in request.headers:
            token = request.headers['X-Access-Token']
        if not token:
            return JsonResponse({'msg':'no token'}, safe=False)

        try:
            key = 'secret'
            data = jwt.decode(token, key, algorithms=["HS256"])
        except Exception as e:

            return JsonResponse({'msg': str(e)}, safe=False)
        try: 
            key = 'secret'
            data = jwt.decode(token, key, algorithms=["HS256"])
            current_user = data
            
        except:
            return JsonResponse({'msg':'no user'}, safe=False)

        return f(current_user, *args, **kwargs)

    return decorated

@api_view(['GET'])
def main_graph(request):
    data_str = mongo_driver.get_main_graph()
     
    response = JsonResponse(data_str, safe=False)
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Methods"] = "GET, OPTIONS"
    response["Access-Control-Max-Age"] = "1000"
    response["Access-Control-Allow-Headers"] = "X-Requested-With, Content-Type"

    return response


@token_required
def me(current_user, request):
    user = mongo_driver.get_user(current_user)

    return JsonResponse({"user":user}, safe=False)


@api_view(['GET','POST'])
def login(request):
    
    params = {"user":request.data["user"],"pass":request.data["pass"]}

    user = mongo_driver.get_user(params)

    if user == None or isinstance(user, bool):

        return JsonResponse({'status':False}, safe=False)

    else:

        data_str = mongo_driver.get_main_graph()
        info = mongo_driver.get_graph_info()
        payload = request.data
        print(payload)
        key = 'secret'
        try:
            token = jwt.encode(payload, key, algorithm="HS256")
        except Exception as e:
            print("error: " + str(e))

            return JsonResponse({"msg": str(e)})
        
        return JsonResponse({'token':token,'data':data_str, 'info':info, 'user':user, 'status': True}, safe=False)

@api_view(['GET','POST'])
def get_user_level(request):
    print(request.data)
    param = request.data
    user = mongo_driver.get_user_level(param)

    return JsonResponse({'msg':user}, safe=False)

@api_view(['GET','POST'])
def get_topic_graph(request):
    print(request.data)
    param = request.data['level']
    graph = mongo_driver.get_topic_graph(param)

    return JsonResponse({'msg':graph}, safe=False)

@api_view(['GET','POST'])
def get_questions(request):
    print(request.data)

    questions = mongo_driver.get_exercise({})

    return JsonResponse({'data':questions}, safe=False)

@token_required
def update_progress(current_user, request):

    check = mongo_driver.update_progress(request.data, current_user)

    return JsonResponse({'data': check}, safe= False)

@api_view(['GET','POST'])
def register_user(request):

    print("DATA: ", request.data)


    check = mongo_driver.create_user(request.data)

    if isinstance(check, bool):
        return JsonResponse({'data':False}, safe = False)
    else:
        return JsonResponse({'data':True}, safe = False)
    