import requests
import json
import time
from random import randint

url = 'http://www.b-max.xyz/api/'

headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}

while True:
    myobj = {"timestamp": str(time.time()), "sensor_id": "4",
             "sensor_type": "iot-4", "lighting_level": str(randint(0, 100)),
             "sensor_lacation": str(str(randint(0, 100))),
             "humidity": str(randint(0, 100)),
             "farm_address": str(randint(0, 100)),
             "SECRETKEY": "^%$#@!"}
    x = requests.post(url, data=json.dumps(myobj), headers=headers)
    print("seccess:", myobj)
    print(x.text)
    time.sleep(3)