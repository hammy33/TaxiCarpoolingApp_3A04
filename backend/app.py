from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from crypto import * # ONLY JSON
from profiles import * # ONLY JSON
from utils import *

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Hello, World!"

DEG_TO_METERS = 111139
LOC_TOLERANCE = 1000 # meters
COST_PER_KM = 2

### ------ STATES ------ ###

# Offer : {email, startCord: {long: float, lat: float}, endCord: {long: float, lat: float}}
offers = [
    {
        "offerer": "test@1.com", 
        "startCord": {"long": -79.919225, "lat":43.260879}, # mcmaster
        "endCord":  {"long": -79.390331772, "lat":43.656997372}, #uoft
    }
]

# Request : {requester, offerer}
requests = [
    {
        "requester": "test@2.com",
        "offerer": "test@1.com", 
    }
]

# Request : {carpoolers: [email], startCord: float, endCord: float}
carpools = [
    {
        "carpoolers": ["test@2.com", "test@1.com"],
        "startCord": {"long": -79.919225, "lat":43.260879}, # mcmaster
        "endCord":  {"long": -79.390331772, "lat":43.656997372}, #uoft
        "active": True,
        "costPerPerson": 10.40,
    }
]


### All bodies in requests are wrapped with a data field, this data is encrypted and decrypted when communicating

### ------ ACCOUNTS ------ ###

# Register
# BODY: See profiles sample data type above
@app.route("/register", methods = ['POST'])
def register():
    addAccount(decrypt(request.get_json()['data']))
    res = {'success': True}
    return jsonify({'data': encrypt(res)})

# Login
# BODY: {email, password}
@app.route("/login", methods = ['POST'])
def login():
    req = decrypt(request.get_json()['data'])
    email, password = req["email"], req["password"]

    res = False
    account = getAccount(email)
    if password == account["password"]:
        res = account 

    if res:
        return jsonify({'data': encrypt(res)})
    return "Record not found", 400

# Get Account
# BODY: {email}
@app.route("/getaccount", methods = ['POST'])
def getaccount():
    req = decrypt(request.get_json()['data'])
    email = req["email"]
    return jsonify({'data': encrypt(getAccount(email))})


# Update account
# BODY: {data: Account}
@app.route("/account/update", methods = ['POST'])
def update():
    updateAccount(decrypt(request.get_json()['data']))
    res = {'success': True}
    return jsonify({'data': encrypt(res)})

# Delete account
# BODY: {data: {email}}
@app.route("/account/delete", methods = ['POST'])
def delete():
    status = delAccount(decrypt(request.get_json()['data'])['email'])
    res = {'success': status}
    return jsonify({'data': encrypt(res)})


### ------ OFFERS ------ ###

# Gets active carpool offers given start and end cords
# BODY: {startCord: {long, lat}, endCord: {long, lat}}
@app.route("/getoffers", methods = ['POST'])
def getOffers():
    req = decrypt(request.get_json()['data'])
    start, end = req["startCord"], req["endCord"]
    nearbyOffers = []
    for offer in offers:
        if abs(offer["startCord"]["long"] - start["long"])*DEG_TO_METERS <= LOC_TOLERANCE and \
            abs(offer["startCord"]["lat"] - start["lat"])*DEG_TO_METERS <= LOC_TOLERANCE and \
            abs(offer["endCord"]["long"] - end["long"])*DEG_TO_METERS <= LOC_TOLERANCE and \
            abs(offer["endCord"]["lat"] - end["lat"])*DEG_TO_METERS <= LOC_TOLERANCE:
            nearbyOffers.append(offer)

    res = nearbyOffers
    return jsonify({'data': encrypt(res)})

# Adds carpool offer given offerer email, start and end cords
# BODY: {offerer, startCord: {long, lat}, endCord: {long, lat}}
@app.route("/offer", methods = ['POST'])
def addOffers():
    offers.append(decrypt(request.get_json()['data']))
    res = {'success': True}
    return jsonify({'data': encrypt(res)})


### ------ REQUESTS ------ ###

# Gets requests made to offers for an offerer
# BODY {offerer: email}
@app.route("/getrequests", methods = ['POST'])
def getRequests(offerer):
    req = decrypt(request.get_json()['data'])
    offerer = req['offerer']
    offerRequests = []
    for request in requests:
        if request['offerer'] == offerer:
            offerRequests.append(request)

    res = offerRequests
    return jsonify({'data': encrypt(res)})

# Adds request (interest to join carpool)
# BODY: {requester:email, offerer:email}
@app.route("/request", methods = ['POST'])
def addRequests():
    requests.append(decrypt(request.get_json()['data']))
    res = {'success': True}
    return jsonify({'data': encrypt(res)})


# Create carpool, after offerer accpets request 
# BODY {offerer: email, requester: email}
@app.route("/acceptrequest", methods = ['POST'])
def acceptRequest(offerer):
    req = decrypt(request.get_json()['data'])
    offerer, requester = req['offerer'], req['requester']

    confirmedRequest = None
    confirmedOffer = None

    for idx, request in enumerate(requests):
        if request['offerer'] == offerer and request['requester'] == requester:
            confirmedRequest = request
            requests.pop(idx) # Delete the request
            break
    if not confirmedRequest: # No request from requester to offerer
        return "Record not found", 400

    for idx, offer in enumerate(offers):
        if offer['offerer'] == offerer:
            confirmedOffer = offer
            offers.pop(idx) # Delete the request
            break
    if not confirmedOffer: # Indicated offer doesnt exist
        requests.append(confirmedRequest)
        return "Record not found", 400
    
    carpool = {
        "carpoolers": [confirmedRequest['requester'], confirmedRequest['offerer']],
        "startCord": confirmedOffer['startCord'],
        "endCord": confirmedOffer['endCord'],
        "active": True,
        "costPerPerson": distance(confirmedOffer['startCord'], confirmedOffer['endCord'])*COST_PER_KM/2
    }
    carpools.append(carpool)

    return jsonify({'data': encrypt(carpool)})


### ------ CARPOOLS ------ ###


# Get active carpool given offerer + requester
# BODY {offerer: email, requester: email}
@app.route("/carpools", methods = ['POST'])
def getCarpool():
    req = decrypt(request.get_json()['data'])
    email = req['email']

    for carpool in carpools:
        if carpool['active'] and email in carpool['carpoolers']:
            return jsonify({'data': encrypt(carpool)})
    
    return "Record not found", 400


# End carpool given offerer + requester
# BODY {offerer: email, requester: email}
@app.route("/endcarpool", methods = ['POST'])
def endCarpool(offerer):
    req = decrypt(request.get_json()['data'])
    email = req['email']
  
    for carpool in carpools:
        if carpool['active'] and email in carpool['carpoolers']:
            carpool['active'] = False
            return jsonify({'data': encrypt(carpool)})

    return "Record not found", 400


if __name__ == "__main__":
    app.run(debug=True)
