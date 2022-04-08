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

    user = request.json.get("user") # get the username from the frontend
    password = request.json.get("pass") # get the password from the frontend

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
        return jsonify(output="User Not Found")

    else:
        print("user found!")
        return jsonify(output="User Found")

        # return jsonify({
        #     "message": "User Found"
        # })

    # gotta figure out how to send data back to the frontend and then BOOOOOOOOOOM


# this is for the signup route, we will do this stuff later
@app.route("/signup/", methods=["GET","POST"], strict_slashes=False)
@cross_origin()
def sign_up():
    print("testing")

    user = request.json.get("user") # get the username from the frontend
    password = request.json.get("pass") # get the password from the frontend

    pass_hash = customEncrypt(password, 2, 1) # encrypt the password

    user_doc = {
        "username" : user,
        "password" : pass_hash
    } 

    userFound = mongo.db.Users.find(user_doc)
    results = list(userFound)


    if len(results) == 0:
        print("user doesn't exist rn")
        mongo.db.Users.insert_one(user_doc)
        return jsonify(output="User Found")

    else:
        print("user exists")
        return jsonify(output="User Not Found")

        # return jsonify({
        #     "message": "User Found"
        # })
    return jsonify('test')

@app.route("/projects/", methods=["GET","POST"], strict_slashes=False)
@cross_origin()
def projects():
    
    return jsonify('test')


if __name__ == "__main__":
     app.run(debug=True ,port=5000)