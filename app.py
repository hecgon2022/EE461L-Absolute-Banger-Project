#simple testing to see if we can interface between
#front end and backend
#push
from distutils.command.build import build
from re import I
import time
import json
import metadata_parser
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from flask_pymongo import PyMongo
from python.encryption import customEncrypt

app = Flask(__name__, static_folder="./materialUIFrontEnd/build", static_url_path="/")
#app = Flask(__name__)
CORS(app)
#client = pymongo.MongoClient("mongodb+srv://username:12345678910@tanyasprojects.cj00q.mongodb.net/EE461L_Project?retryWrites=true&w=majority")

app.config["MONGO_URI"] = "mongodb+srv://username:12345678910@tanyasprojects.cj00q.mongodb.net/EE461L_Project?retryWrites=true&w=majority"
mongo = PyMongo(app)

@app.route("/")
def index():
    return app.send_static_file('index.html')


@app.route("/login/", methods=["GET","POST"], strict_slashes=False)
#@cross_origin()
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

    # when the length is zero, this means that nothing was foumd
    if len(results) == 0:
        print("user not found")
        return jsonify(output="User Not Found")

    else:
        print("user found!")
        return jsonify(output="User Found")



# this is for the signup route, we will do this stuff later
@app.route("/signup/", methods=["GET","POST"], strict_slashes=False)
#@cross_origin()
def sign_up():
    print("testing")

    user = request.json.get("user") # get the username from the frontend
    password = request.json.get("pass") # get the password from the frontend

    pass_hash = customEncrypt(password, 2, 1) # encrypt the password

    user_doc = {
        "username" : user,
        "password" : pass_hash,
        "projects": [],
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
#@cross_origin()
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

    # this is for the join command of the website
    elif project_type == "join":
        if len(results) == 0:
            return jsonify(output="project doesn't exist")
        else:
            username = user['user']
            user_doc = (mongo.db.Users.find_one({'username': username}))
            projects = user_doc['projects']

            # gotta add in a check for to make sure that we dont add in same project name to list
            # we can honestly do this tmrw
            print(projects)

            flag = 0 # if flag gets set to 1, then we just don't include this in the projects list

            for items in projects:
                if projectID == items:
                    flag = 1

            if flag == 0:
                projects.append(projectID)
                mongo.db.Users.update_one({'username': username}, {'$set': {'projects': projects}})

            #########################################
            # TESTING
            ################################################

            # we should return the project id and the project description
            projectCursor = mongo.db.Projects.find({"projectID": projectID}, {"_id":0, "projectID":1, "projectDescription":1, "units":1})
            projectList = list(projectCursor) 

            print(projectList)

            projectDict = projectList[0]
            ID = projectDict["projectID"]
            description = projectDict["projectDescription"]
            units = projectDict["units"]
            
            print(ID)
            print(description)
            print(units)

            # create a dictionary for these two values to pass back to frontend
            projectInfo = {
                "projectID": ID,
                "projectDescription": description,
                "hwset1": units[0],
                "hwset2": units[1]
            }
            
            return jsonify(output=projectInfo)

            
    return jsonify('test')


###################################################################################
###################################################################################
###################################################################################
###################################################################################

@app.route("/check-in-out/", methods=["GET","POST"], strict_slashes=False)
#@cross_origin()
def check_in_out():

    # this lets us know whether we check in or check out
    checkinout = request.json.get("checkInOut")
    print(checkinout)

    # this is for the check in
    if str(checkinout) == "In":
        projectID = request.json.get("projectID") 
        hwSetNum = int(request.json.get("hwset"))
        numUnits = int(request.json.get("qty"))

        print(projectID)
        print(hwSetNum)
        print(numUnits)


        projectCursor = mongo.db.Projects.find({"projectID":projectID}, {"_id":0, "projectID":0, "projectDescription":0})
        unitList = list(projectCursor)
        unitDict = unitList[0]
        units_user = unitDict["units"] #this is an array cuh lets goooooo 

        print(unitList)
        print(unitDict)
        print(units_user) # this gets the units checked out for each hw set

        temp = hwSetNum - 1 # this is to make the hw set to 0 and 1

        if numUnits < 0 or numUnits > units_user[temp]:
            return jsonify({
                "output": "ERROR; illegal number of units being checked in."
            })

        
        hwSetCursor = mongo.db.HardwareSets.find({"hardwareSetNum": temp}, {"_id":0, "capacity":1, "availability":1})
        hwSetList = list(hwSetCursor)
        hwSetDict = hwSetList[0]
        availability = hwSetDict["availability"]
        capacity = hwSetDict["capacity"]

        print("availability", availability)
        print("capacity", capacity)

        if (numUnits + availability) > capacity:
            message = "ERROR; attempting to check in too many units past capacity of " + str(capacity) + " units"
            return jsonify({
                "output": message
            })

        # this is for a successful check in 
        else:
            updatedAvailability = availability + numUnits
            print('updated availability ', str(updatedAvailability))

            mongo.db.HardwareSets.update_one({"hardwareSetNum": temp}, {"$set": {"availability": updatedAvailability}})
            units_user[temp] -= numUnits
            mongo.db.Projects.update_one({"projectID": projectID}, {"$set": {"units": units_user}})

            # TESTING, want to return the updated hardware sets to the screen
            projectCursor = mongo.db.Projects.find({"projectID": projectID}, {"_id":0, "projectID":1, "projectDescription":1, "units":1})
            projectList = list(projectCursor) 

            print(projectList)
            projectDict = projectList[0]
            units = projectDict["units"]

            hwSets = {
                "hwset1": units[0],
                "hwset2": units[1]
            }


            # ret_message = "successful checkin of " + str(numUnits) + " units to hwSet " + str(temp)

            return jsonify({
                "output": hwSets
            })



    #######################################################################
    #######################################################################
    #######################################################################
    # this is for check out
    elif checkinout == "Out":
        projectID = request.json.get("projectID") 
        hwSetNum = int(request.json.get("hwset"))
        numUnits = int(request.json.get("qty"))

        projectCursor = mongo.db.Projects.find({"projectID":projectID}, {"_id":0, "projectID":0, "projectDescription":0})
        unitList = list(projectCursor)
        unitDict = unitList[0]
        units_user = unitDict["units"] #this is an array cuh

        temp = hwSetNum - 1
        
        hwSetCursor = mongo.db.HardwareSets.find({"hardwareSetNum": temp}, {"_id":0, "availability":1})
        hwSetList = list(hwSetCursor)
        hwSetDict = hwSetList[0]
        availability = hwSetDict["availability"]

        # still need to include something for check out errors
        # like if we to check out stuff when there is no availability
        
        # all of these statements below correspond to successfule check out messages

        if numUnits > hwSetDict["availability"]:
            mongo.db.HardwareSets.update_one({"hardwareSetNum": temp}, {"$set": {"availability": 0}})
            units_user[temp] += availability
            mongo.db.Projects.update_one({"projectID": projectID}, {"$set": {"units": units_user}})

            # TESTING, want to return the updated hardware sets to the screen
            projectCursor = mongo.db.Projects.find({"projectID": projectID}, {"_id":0, "projectID":1, "projectDescription":1, "units":1})
            projectList = list(projectCursor) 

            print(projectList)
            projectDict = projectList[0]
            units = projectDict["units"]

            hwSets = {
                "hwset1": units[0],
                "hwset2": units[1]
            }

            return jsonify({
                "output": hwSets
            })


        else:
            updatedAvailability = availability - numUnits
            mongo.db.HardwareSets.update_one({"hardwareSetNum": temp}, {"$set": {"availability": updatedAvailability}})
            units_user[temp] += numUnits
            mongo.db.Projects.update_one({"projectID": projectID}, {"$set": {"units": units_user}})

            # TESTING, want to return the updated hardware sets to the screen
            projectCursor = mongo.db.Projects.find({"projectID": projectID}, {"_id":0, "projectID":1, "projectDescription":1, "units":1})
            projectList = list(projectCursor) 

            print(projectList)
            projectDict = projectList[0]
            units = projectDict["units"]

            hwSets = {
                "hwset1": units[0],
                "hwset2": units[1]
            }

            # ret_message = "successful checkout of " + str(numUnits) + " units"
            return jsonify({
                "output": hwSets
            })
# for the metadata route
@app.route("/metadata/", methods=["GET","POST"], strict_slashes=False)
#@cross_origin()
def metadata():

    url1 = request.json.get("url1") # get the url from the frontend
    url2 = request.json.get("url2") # get the url from the frontend
    url3 = request.json.get("url3") # get the url from the frontend
    url4 = request.json.get("url4") # get the url from the frontend
    url5 = request.json.get("url5") # get the url from the frontend
    url6 = request.json.get("url6") # get the url from the frontend

    page1 = metadata_parser.MetadataParser(url1)
    page2 = metadata_parser.MetadataParser(url2)
    page3 = metadata_parser.MetadataParser(url3)
    page4 = metadata_parser.MetadataParser(url4)
    page5 = metadata_parser.MetadataParser(url5)
    page6 = metadata_parser.MetadataParser(url6)

    print(page3.metadata)

    
    description1 = page1.get_metadatas('description') 
    description2 = page2.get_metadatas('description') 
    description3 = page3.get_metadatas('title') 
    description4 = page4.get_metadatas('description') 
    description5 = page5.get_metadatas('description') 
    description6 = page6.get_metadatas('description') 

    print(description3)


    urlDict = {
        "url1": description1,
        "url2": description2,
        "url3": description3,
        "url4": description4,
        "url5": description5,
        "url6": description6
    }

    return jsonify({
         "output": urlDict
    })


if __name__ == "__main__":
     app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))
# comment





















# @app.route("/check_out/", methods=["GET","POST"], strict_slashes=False)
# @cross_origin()
# def check_out():
#     projectID = request.json.get("projectID") 
#     hwSetNum = int(request.json.get("hwset"))
#     numUnits = int(request.json.get("qty"))

#     projectCursor = mongo.db.Projects.find({"projectID":projectID}, {"_id":0, "projectID":0, "projectDescription":0})
#     unitList = list(projectCursor)
#     unitDict = unitList[0]
#     units_user = unitDict["units"] #this is an array cuh

    
#     hwSetCursor = mongo.db.HardwareSets.find({"hardwareSetNum": hwSetNum}, {"_id":0, "availability":1})
#     hwSetList = list(hwSetCursor)
#     hwSetDict = hwSetList[0]
#     availability = hwSetDict["availability"]

#     if numUnits > hwSetDict["availability"]:
#         mongo.db.HardwareSets.update_one({"hardwareSetNum": hwSetNum}, {"$set": {"availability": 0}})
#         units_user[hwSetNum] += availability
#         mongo.db.Projects.update_one({"projectID": projectID}, {"$set": {"units": units_user}})
#         return jsonify({
#             "status": "successful checkout of all available items"
#         })
#     else:
#         updatedAvailability = availability - numUnits
#         mongo.db.HardwareSets.update_one({"hardwareSetNum": hwSetNum}, {"$set": {"availability": updatedAvailability}})
#         units_user[hwSetNum] += numUnits
#         mongo.db.Projects.update_one({"projectID": projectID}, {"$set": {"units": units_user}})
#         ret_message = "successful checkout of " + str(numUnits) + " units"
#         return jsonify({
#             "status": ret_message
#         })
#     return jsonify(unitDict)
