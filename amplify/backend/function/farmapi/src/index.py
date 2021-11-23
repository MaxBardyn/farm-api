import json
import awsgi
import boto3
import os
from flask_cors import CORS
from flask import Flask, jsonify, request
from uuid import uuid4
os.environ['AWS_DEFAULT_REGION'] = 'us-east-1'
client = boto3.client("dynamodb")
TABLE = os.environ.get("STORAGE_FARMAPI_NAME")
app = Flask(__name__)
CORS(app)
BASE_ROUTE = "/farm"


@app.route(BASE_ROUTE, methods=['POST'])
def add_farm():
    request_json = request.get_json()
    client.put_item(TableName=TABLE, Item={
        'id': {'S': str(uuid4())},
        'farm_address': {'S': request_json.get("farm_address")},
        'humidity': {'S': request_json.get("humidity")},
        'lighting_level': {'S': request_json.get("lighting_level")},
        'sensor_lacation': {'S': request_json.get("sensor_lacation")}
    })
    return jsonify(message="farm sensor created")

@app.route(BASE_ROUTE, methods=['GET'])
def farm_list():
    response = client.scan(TableName=TABLE)
    data = response['Items']
    while response.get('LastEvaluatedKey'):
        response = table.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
        data.extend(response['Items'])
    return jsonify(data)

@app.route(BASE_ROUTE + '/<farm_id>', methods=['DELETE'])
def remove_farm(farm_id):
    client.delete_item(
        TableName=TABLE,
        Key={'id': {'S': farm_id}}
    )
    return jsonify(message="farm sensor deleted?")

def handler(event, context):
    return awsgi.response(app, event, context)