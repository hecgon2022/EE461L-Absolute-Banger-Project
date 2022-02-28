from flask import Flask
import pymongo
from pymongo import MongoClient

# testing connection of database

# connect to the database
client = pymongo.MongoClient("mongodb+srv://username:12345678910@tanyasprojects.cj00q.mongodb.net/EE461L_Project?retryWrites=true&w=majority")

# for the database
db = client.EE461L_Project.Users

# add a new collection
username = db["arya"]

# add the document
usernameDocument = {
    "name": {"first": "Arya", "last": "Amin"},
    "password": "12345"
}

username.insert_one(usernameDocument)