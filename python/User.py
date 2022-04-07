from flask_pymongo import PyMongo
from encryption import customEncrypt

class User:
    def __init__(self, username, password):
        self.__username = username
        #need to change 2 & 1 to random number generated 
        self.__password = customEncrypt(password, 2, 1) 
        

    def getpassword(self):
        return self.__password

    def getusername(self):
        return self.username