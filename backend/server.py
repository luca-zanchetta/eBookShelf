import pymongo
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Middleware per gestire le richieste preflight OPTIONS
@app.before_request
def before_request():
    if request.method == "OPTIONS":
        headers = {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
            "Access-Control-Allow-Credentials": "true",
        }
        return ("", 200, headers)
    

# DB setup
client = pymongo.MongoClient('mongodb://localhost:27017/')
db = client['ebookshelf']   # create or select db 'ebookshelf'


####################################### REST APIs ###########################################
@app.route("/")
def fetch():
    return jsonify({"message":"The server is working! :)", "status":200})


@app.route("/register", methods=['POST'])
def register():
    data = request.get_json()
    
    username = data['username']
    name = data['name']
    surname = data['surname']
    balance = 0.0
    password = data['password']
    
    user_coll = db['user']
    new_user = {'username':username, 'name':name, 'surname':surname, 'balance':balance, 'password':password}
    
    # Check uniqueness of username
    for elem in user_coll.find():
        if elem['username'] == new_user['username']:
            return jsonify({'message':'ERROR: This username is not valid.', 'status':400})
    
    # Insert new user
    x = user_coll.insert_one(new_user)    
    if x is not None:
        return jsonify({'message':f'User {username} has been registered!', 'status':200})
    
    return jsonify({'message':'ERROR: User has not been registered.', 'status':500})


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    username = data['username']
    password = data['password']
    user_coll = db['user']

    # Check the user
    query = {'username':username}
    user = user_coll.find_one(query)

    if user is None:
        return jsonify({'message':'The user is not registered!', 'status':404})
    
    if user['password'] == password:
        return jsonify({'message':'Login successful!', 'status':200})
    
    return jsonify({'message':'Wrong username and/or password. Try again!', 'status':400})


@app.route('/addMoney', methods=['POST'])
def add_money():
    data = request.get_json()
    
    username = data['username']
    amount = data['amount']
    
    if amount < 0:
        return jsonify({'message':'ERROR: The amount cannot be less than zero!', 'status':400})
    
    user_coll = db['user']
    target_user = user_coll.find_one({'username':username})    
    balance = float(target_user['balance']) + float(amount)
    
    query = { 'username': username }
    newvalues = { '$set': { 'balance': balance } }
    user_coll.update_one(query, newvalues)
    
    return jsonify({'message':'Balance successfully updated!', 'status':200})
    
    

#############################################################################################

if __name__ == "__main__":
    app.run(debug=True, host="localhost", port=5000)