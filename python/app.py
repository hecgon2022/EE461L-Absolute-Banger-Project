#simple testing to see if we can interface between
#front end and backend
import time
import json
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS, cross_origin
from flask_pymongo import PyMongo
from encryption import customEncrypt

app = Flask(__name__, static_folder='../materialUIFrontEnd/build', static_url_path='')
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

    projectID = request.json.get("projectID") 
    description = request.json.get("projectDescription") 
    #funds = request.json.get("projectFunds")
    user = request.json.get("user") 
    project_type = request.json.get("project_type")

    project_doc = {
        "projectID" : projectID,
        "projectDescription" : description,
        #"projectFunds": funds,
        "users": user
    }

    projectFound = mongo.db.Projects.find({"projectID":projectID})
    results = list(projectFound)

    if project_type == "create":
        if len(results) == 0:
            mongo.db.Projects.insert_one(project_doc)
            return jsonify(output="new project")
        else:
            print("project exists")
            return jsonify(output="project invalid")
    elif project_type == "join":
        if len(results) == 0:
            #mongo.db.Projects.insert_one(project_doc)
            return jsonify(output="project doesn't exist")
        else:
            #print("project exists")
            return jsonify(output="project exists")

    
    
    

        # return jsonify({
        #     "message": "User Found"
        # })
    return jsonify('test')

@app.route('/')
@cross_origin()
def serve():
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == "__main__":
     app.run(host='0.0.0.0', port=80)
