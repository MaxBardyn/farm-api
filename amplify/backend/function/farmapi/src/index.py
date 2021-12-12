import json
import awsgi
import boto3
import os
from flask_cors import CORS
from flask import Flask, jsonify, request
from uuid import uuid4

AWS_ACCESS_KEY_ID = os.environ.get("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.environ.get("AWS_SECRET_ACCESS_KEY")
client = boto3.client("dynamodb", region_name='us-east-1', aws_access_key_id=AWS_ACCESS_KEY_ID, aws_secret_access_key=AWS_SECRET_ACCESS_KEY)
TABLE = os.environ.get("STORAGE_FARMAPI_NAME")
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*", "allow_headers": "*", "expose_headers": "*"}})
BASE_ROUTE = "/farm"


@app.route(BASE_ROUTE, methods=['POST'])
def add_farm():
    request_json = request.get_json()
    if request_json.get("SECRETKEY") != "^%$#@!":
        return jsonify(message="Wrong data !!! ")
    client.put_item(TableName=TABLE, Item={
        'id': {'S': str(uuid4())},
        'timestamp': {'S': request_json.get("timestamp")},
        'sensor_id': {'S': request_json.get("sensor_id")},
        'sensor_type': {'S': request_json.get("sensor_type")},
        'SECRETKEY': {'S': request_json.get("SECRETKEY")},
        'humidity': {'S': request_json.get("humidity")},
        'lighting_level': {'S': request_json.get("lighting_level")},
        'sensor_lacation': {'S': request_json.get("sensor_lacation")},
        'farm_address': {'S': request_json.get("farm_address")},
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
if __name__ == '__main__':
    app.run(host='0.0.0.0')