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

accounts = [
    {
        "email": "test@1.com",
        "password": "test1",
        "name": "Test User1",
        "rating": 4.5,
        "personality" : {
            "p1": 2,
            "p2": 3,
            "p3": 4,
            "p4": 1,
            "p5": 5,
        }
    }
]

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
carpools = []


### ------ ACCOUNTS ------ ###

# Register
# BODY: See profiles sample data type above
@app.route("/register", methods = ['POST'])
def register():
    accounts.append(request.get_json())
    return jsonify(success=True)

# Login
# BODY: {email, password}
@app.route("/login", methods = ['POST'])
def login():
    req = request.get_json()
    email, password = req["email"], req["password"]
    for account in accounts:
        if account['email'] == email and account['password'] == password:
            return jsonify(account)
    return jsonify(found=False)


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

# Adds carpool offer given offerer email, start and end cords
# BODY: {offerer, startCord: {long, lat}, endCord: {long, lat}}
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
