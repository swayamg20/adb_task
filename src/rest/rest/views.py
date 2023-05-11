from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json, logging, os
from pymongo import MongoClient
from bson.json_util import dumps

mongo_uri = 'mongodb://' + os.environ["MONGO_HOST"] + ':' + os.environ["MONGO_PORT"]
db = MongoClient(mongo_uri)['test_db']
collection = db['todos']
class TodoListView(APIView):

    def get(self, request):
        # Implement this method - return all todo items from db instance above.
        todos = list(collection.find())
        todos = json.loads(dumps(todos)) # Convert MongoDB documents to Python objects
        return Response(todos, status=status.HTTP_200_OK)
        
    def post(self, request):
        # Implement this method - accept a todo item in a mongo collection, persist it using db instance above.
        description = request.data.get('description')
        if not description:
            return Response({'error': 'Missing description field'}, status=status.HTTP_400_BAD_REQUEST)
        todo = {'description': description}     # Create a new TODO item in the MongoDB collection
        result = collection.insert_one(todo)
        created_todo = collection.find_one({'_id': result.inserted_id})
        created_todo = {'id': str(created_todo['_id']), 'description': created_todo['description']}
        return Response(created_todo, status=status.HTTP_201_CREATED)
