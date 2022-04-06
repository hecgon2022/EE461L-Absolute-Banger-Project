#simple testing to see if we can interface between
#front end and backend
import time
import json
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from flask_pymongo import PyMongo
from encryption import customEncrypt

app = Flask(__name__)
CORS(app)
#client = pymongo.MongoClient("mongodb+srv://username:12345678910@tanyasprojects.cj00q.mongodb.net/EE461L_Project?retryWrites=true&w=majority")

app.config["MONGO_URI"] = "mongodb+srv://username:12345678910@tanyasprojects.cj00q.mongodb.net/EE461L_Project?retryWrites=true&w=majority"
mongo = PyMongo(app)

@app.route("/login/", methods=["GET","POST"], strict_slashes=False)
@cross_origin()
def log_in():
    print("testing")
    print(request)
    print(request.json.get("user"))
    return jsonify('test')

    password = request.json['pass']
    pass_hash = customEncrypt(password, 2, 1) # encrypt the password
    user_doc = {
        "username" : user,
        "password" : pass_hash
    }



    #return jsonify(user_doc)

    # see if this is a valid username/password
    userFound = mongo.db.Users.find(user_doc)
    results = list(userFound)

    if len(results) == 0:
        print("user not found")
    else:
        return jsonify({
            "message": "User Found"
        })

if __name__ == "__main__":
     app.run(debug=True ,port=5000)