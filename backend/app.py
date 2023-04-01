from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Hello, World!"

DEG_TO_METERS = 111139
LOC_TOLERANCE = 1000 # meters

### ------ STATES ------ ###

# Offer : {email, startCord: {long: float, lat: float}, endCord: {long: float, lat: float}}
offers = [
    {
        "email": "test@1.com", 
        "startCord": {"long": -79.919225, "lat":43.260879}, # mcmaster
        "endCord":  {"long": -79.390331772, "lat":43.656997372} #uoft
    }
]

# Request : {requester, offerer}
requests = []

# Request : {carpoolers: [email], startCord: float, endCord: float}
carpools = []


### ------ OFFERS ------ ###

# Gets active carpool offers given start and end cords
# BODY: {startCord: {long, lat}, endCord: {long, lat}}
@app.route("/offers")
def getOffers():
    req = request.get_json()
    start, end = req["startCord"], req["endCord"]
    nearbyOffers = []
    for offer in offers:
        if abs(offer["startCord"]["long"] - start["long"])*DEG_TO_METERS <= LOC_TOLERANCE and \
            abs(offer["startCord"]["lat"] - start["lat"])*DEG_TO_METERS <= LOC_TOLERANCE and \
            abs(offer["endCord"]["long"] - end["long"])*DEG_TO_METERS <= LOC_TOLERANCE and \
            abs(offer["endCord"]["lat"] - end["lat"])*DEG_TO_METERS <= LOC_TOLERANCE:
            nearbyOffers.append(offer)

    return jsonify(nearbyOffers)

# Adds carpool offer given email, start and end cords
# BODY: {email, startCord: {long, lat}, endCord: {long, lat}}
@app.route("/offers", methods = ['POST'])
def addOffers():
    offers.append(request.get_json())
    return jsonify(success=True)


### ------ REQUESTS ------ ###

# Gets requests made to offers for an offerer
# /requests/offerer@test.com
@app.route("/requests/<offerer>")
def getRequests(offerer):
    offerRequests = []
    for request in requests:
        if request['offerer'] == offerer:
            offerRequests.append(request)

    return jsonify(offerRequests)

# Adds requests 
# BODY: {requester:email, offerer:email}
@app.route("/requests", methods = ['POST'])
def addRequests():
    requests.append(request.get_json())
    return jsonify(success=True)

if __name__ == "__main__":
    app.run(debug=True)
