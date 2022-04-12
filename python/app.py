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
    # user_doc = {
    #     "username" : user,
    #     "password" : pass_hash
    # }


    # see if this is a valid username/password
    # userFound = mongo.db.Users.find(user_doc)
    userFound = mongo.db.Users.find({"username": user, "password": pass_hash})
    results = list(userFound)

    
    if len(results) == 0:
        print("user not found")
        return jsonify(output="User Not Found")

    else:
        print("user found!")
        return jsonify(output="User Found")



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
        "password" : pass_hash,
        "projects": [""],
    }

    userFound = mongo.db.Users.find({"username": user, "password": pass_hash})
    results = list(userFound)


    if len(results) == 0:
        print("user doesn't exist rn")
        mongo.db.Users.insert_one(user_doc)
        return jsonify(output="User Created")

    else:
        print("user exists")
        return jsonify(output="User already created")

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
        "units": [0, 0],        
    }

    projectFound = mongo.db.Projects.find({"projectID": projectID})
    results = list(projectFound)    

    if project_type == "create":
        if len(results) == 0:
            mongo.db.Projects.insert_one(project_doc)
            username = user['user']
            user_doc = (mongo.db.Users.find_one({'username': username}))
            projects = user_doc['projects']
            projects.append(projectID)
            mongo.db.Users.update_one({'username': username}, {'$set': {'projects': projects}})
            return jsonify(output="new project")
        else:
            print("project exists")
            return jsonify(output="project invalid")

    elif project_type == "join":
        if len(results) == 0:
            return jsonify(output="project doesn't exist")
        else:
            username = user['user']
            user_doc = (mongo.db.Users.find_one({'username': username}))
            projects = user_doc['projects']
            projects.append(projectID)
            mongo.db.Users.update_one({'username': username}, {'$set': {'projects': projects}})
            return jsonify(output="project exists")

            
    return jsonify('test')

@app.route("/check_out/", methods=["GET","POST"], strict_slashes=False)
@cross_origin()
def check_out():
    projectID = request.json.get("projectID") 
    hwSetNum = int(request.json.get("hardwareSetNum"))
    numUnits = int(request.json.get("numberUnits"))

    projectCursor = mongo.db.Projects.find({"projectID":projectID}, {"_id":0, "projectID":0, "projectDescription":0})
    unitList = list(projectCursor)
    unitDict = unitList[0]
    units_user = unitDict["units"] #this is an array cuh

    
    hwSetCursor = mongo.db.HardwareSets.find({"hardwareSetNum": hwSetNum}, {"_id":0, "availability":1})
    hwSetList = list(hwSetCursor)
    hwSetDict = hwSetList[0]
    availability = hwSetDict["availability"]

    if numUnits > hwSetDict["availability"]:
        mongo.db.HardwareSets.update_one({"hardwareSetNum": hwSetNum}, {"$set": {"availability": 0}})
        units_user[hwSetNum] += availability
        mongo.db.Projects.update_one({"projectID": projectID}, {"$set": {"units": units_user}})
        return jsonify({
            "status": "successful checkout of all available items"
        })
    else:
        updatedAvailability = availability - numUnits
        mongo.db.HardwareSets.update_one({"hardwareSetNum": hwSetNum}, {"$set": {"availability": updatedAvailability}})
        units_user[hwSetNum] += numUnits
        mongo.db.Projects.update_one({"projectID": projectID}, {"$set": {"units": units_user}})
        ret_message = "successful checkout of " + str(numUnits) + " units"
        return jsonify({
            "status": ret_message
        })
    return jsonify(unitDict)

@app.route("/check_in/", methods=["GET","POST"], strict_slashes=False)
@cross_origin()
def check_in():
    projectID = request.json.get("projectID") 
    hwSetNum = int(request.json.get("hardwareSetNum"))
    numUnits = int(request.json.get("numberUnits"))

    projectCursor = mongo.db.Projects.find({"projectID":projectID}, {"_id":0, "projectID":0, "projectDescription":0})
    unitList = list(projectCursor)
    unitDict = unitList[0]
    units_user = unitDict["units"] #this is an array cuh

    if numUnits < 0 or numUnits > units_user[hwSetNum]:
        return jsonify({
            "message": "ERROR; illegal number of units being checked in."
        })

    
    hwSetCursor = mongo.db.HardwareSets.find({"hardwareSetNum": hwSetNum}, {"_id":0, "capacity":1, "availability":1})
    hwSetList = list(hwSetCursor)
    hwSetDict = hwSetList[0]
    availability = hwSetDict["availability"]
    capacity = hwSetDict["capacity"]

    if (numUnits + availability) > capacity:
        message = "ERROR; attempting to check in too many units past capacity of " + str(capacity) + " units"
        return jsonify({
            "message": message
        })
    else:
        updatedAvailability = availability + numUnits
        mongo.db.HardwareSets.update_one({"hardwareSetNum": hwSetNum}, {"$set": {"availability": updatedAvailability}})
        units_user[hwSetNum] -= numUnits
        mongo.db.Projects.update_one({"projectID": projectID}, {"$set": {"units": units_user}})
        ret_message = "successful checkin of " + str(numUnits) + " units to hwSet " + str(hwSetNum)
        return jsonify({
            "status": ret_message
        })




if __name__ == "__main__":
     app.run(debug=True ,port=5000)
