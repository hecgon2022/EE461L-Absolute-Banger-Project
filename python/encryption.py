#password hashing
#authors: Kushal Vajrala, Arya Amin
from pymongo import MongoClient

def customEncrypt(inputText, n, d):
  inputText = inputText[::-1] #reverses the string
  for i in range(len(inputText)):
    char = inputText[i]
    if(ord(char) > 33 and ord(char) < 127):
      shift = ord(char) + (n * d);
      if(shift <= 33):
        diff = 34 - shift
        shift = 127 - diff
        inputText = inputText[:i] + chr(shift) + inputText[i+1:]
      elif(shift >= 127):
        diff = shift - 126
        shift = diff + 33
        inputText = inputText[:i] + chr(shift) + inputText[i+1:]
      else:
        inputText = inputText[:i] + chr(shift) + inputText[i+1:]
    else:
      inputText = inputText[:i] + char + inputText[i+1:]
  return inputText

"""
client = MongoClient("mongodb+srv://username:12345678910@tanyasprojects.cj00q.mongodb.net/EE461L_Project?retryWrites=true&w=majority")

# for the database
db = client.EE461L_Project

# add a new collection
username = db["Users"]

user = "vajrala.kushal"
password = "hello123"
pass_hash = customEncrypt(password, 2, 1)

document = {
    "username" : user,
    "password" : pass_hash
}

inserted = username.insert_one(document)
client.close()
"""