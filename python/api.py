#simple testing to see if we can interface between
#front end and backend
import time
from flask import Flask

app = Flask(__name__)

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route("/login", methods=["POST"], strict_slashes=False)
def log_in():
    user = request.json['user']
    password = request.json['pass']