# https://medium.com/@sachadehe/encrypt-decrypt-data-between-python-3-and-javascript-true-aes-algorithm-7c4e2fa3a9ff

import base64 
import ast
import json
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad,unpad
from dotenv import dotenv_values

#AES ECB mode without IV
key = dotenv_values(".env")['key'] #Must Be 16 char for AES128

def encrypt(raw):
        raw = json.dumps(raw)
        raw = pad(raw.encode(),16)
        cipher = AES.new(key.encode('utf-8'), AES.MODE_ECB)
        encrypted = base64.b64encode(cipher.encrypt(raw))
        return encrypted.decode("utf-8", "ignore")

def decrypt(enc):
        enc = base64.b64decode(enc)
        cipher = AES.new(key.encode('utf-8'), AES.MODE_ECB)
        decrypted = unpad(cipher.decrypt(enc),16)
        return ast.literal_eval(decrypted.decode("utf-8", "ignore"))


### TESTING 

# data = {
#   "startCord": {"long": -79.919225, "lat":43.260879}, 
#         "endCord":  {"long": -79.390331772, "lat":43.656997372},
# }

# encrypted = encrypt(data)
# print('encrypted ECB Base64:', encrypted)
# print('data: ', decrypt("3KujHfKr/UCAUqS+9p6bz0F7vSdpvB49+7sTtON0YDx0tzKaKNefLn31dPb8QBpvR9lXczfM5iOSkpqm20p5ie7YANI7GKr7slH0zTtsdqz9K1Tk+/qd0kFmk22ZxFnQ9XnxUNXKPGTCjXGc6aRKzTBTBOz8JVBryzOJ+YyF5rSJEL3mr6OGz0X6fjuXEv5d"))