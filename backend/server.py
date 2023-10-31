import pymongo
import re
from flask import Flask, jsonify, request
from flask_cors import CORS
from utilities import parse_json

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


#############################################################################################
###################################### USER APIs ############################################
#############################################################################################
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

    if target_user is None:
        return jsonify({'message':'ERROR: User was not found.', 'status':404})
    
    balance = float(target_user['balance']) + float(amount)
    query = { 'username': username }
    newvalues = { '$set': { 'balance': balance } }
    user_coll.update_one(query, newvalues)

    # Create an income transaction
    transaction_coll = db['transaction']
    code = 0
    if transaction_coll.find() is None:
        code = 1
    else:
        transactions = transaction_coll.find()
        last_transaction = transactions[0]
        for t in transactions:
            last_transaction = t

        code = last_transaction['code'] + 1
    
    # Create new transaction    
    new_transaction = {'code':code, 'amount':amount, 'user':username}
    tmp = transaction_coll.insert_one(new_transaction)
    if tmp is None:
        return jsonify({'message':'ERROR: charge not completed.', 'status':501})
    
    return jsonify({'message':'Balance successfully updated!', 'status':200})
    

@app.route('/getBalance', methods=['GET'])
def get_balance():
    username = request.args.get('username')

    user_coll = db['user']
    query = {'username':username}
    user = user_coll.find_one(query)
    
    if user is None:
        return jsonify({'message':'ERROR: User not found.', 'status':404})
    
    balance = user['balance']
    if balance is None:
        return jsonify({'message':'ERROR: Missing balance or internal server error.', 'status':500})
    
    return jsonify({'balance':balance, 'status':200})


@app.route('/getTransactions', methods=['GET'])
def get_transactions():
    username = request.args.get('username')

    transaction_coll = db['transaction']
    query = {'user':username}
    transactions = transaction_coll.find(query)

    if transactions is None:
        return jsonify({'transactions':[], 'status':201})
    
    return jsonify({'transactions':transactions, 'status':200})


@app.route('/deleteAccount', methods=['POST'])
def delete_account():
    data = request.get_json()

    username = data['username']
    user_coll = db['user']
    
    # Check if the user exists
    query = {'username':username}
    user = user_coll.find_one(query)

    if user is None:
        return jsonify({'message':'ERROR: User was not found.', 'status':404})
    
    transaction_coll = db['transaction']
    query_2 = {'user':username}
    transaction_coll.delete_many(query_2)

    transaction = transaction_coll.find_one(query_2)
    if transaction is None:
        return jsonify({'message':'Account deleted successfully!', 'status':200})
    
    return jsonify({'message':'ERROR: Something wrong happened.', 'status':500})


@app.route('/getTotalChargedMoney', methods=['GET'])
def get_total_charged_money():
    username = request.args.get('username')
    amount = 0

    transaction_coll = db['transaction']
    user_coll = db['user']

    # Check if the user exists
    query = {'username':username}
    user = user_coll.find_one(query)
    if user is None:
        return jsonify({'message':'ERROR: User was not found.', 'status':404})
    
    query = {'user':username}
    transactions = transaction_coll.find(query)
    if transactions is None:
        return jsonify({'amount':amount, 'status':201})
    
    for transaction in transactions:
        if transaction['amount'] >= 0:
            amount += transaction['amount']
    
    return jsonify({'amount':amount, 'status':200})


@app.route('/getTotalExpenses', methods=['GET'])
def get_total_expenses():
    username = request.args.get('username')
    amount = 0

    transaction_coll = db['transaction']
    user_coll = db['user']

    # Check if the user exists
    query = {'username':username}
    user = user_coll.find_one(query)
    if user is None:
        return jsonify({'message':'ERROR: User was not found.', 'status':404})
    
    query = {'username':username}
    transactions = transaction_coll.find(query)
    if transactions is None:
        return jsonify({'amount':amount, 'status':201})
    
    for transaction in transactions:
        if transaction['amount'] < 0:
            amount += transaction['amount']
    
    return jsonify({'amount':amount, 'status':200})


@app.route('/getNameByUsername', methods=['GET'])
def get_name_by_username():
    username = request.args.get('username')
    user_coll = db['user']

    # Check if the user exists
    query = {'username':username}
    user = user_coll.find_one(query)
    if user is None:
        return jsonify({'message':'ERROR: User was not found.', 'status':404})
    
    return jsonify({'name':user['name'], 'surname':user['surname'], 'status':200})



#############################################################################################
###################################### BOOKS APIs ###########################################
#############################################################################################
@app.route('/getBooks', methods=['GET'])
def get_books():
    books = []

    book_coll = db['book']

    # Check if no book is available
    if book_coll.find() is None:
        return jsonify({'books':[], 'status':201})

    for book in book_coll.find():
        books.append(book)
    
    return jsonify({'books':books, 'status':200})


@app.route('/getBookByISBN', methods=['GET'])
def get_book():
    isbn = request.args.get('isbn')

    book_coll = db['book']
    query = {'ISBN':isbn}
    book = parse_json(book_coll.find_one(query))

    if book is None:
        return jsonify({'message':'The book was not found!', 'status':404})
    
    return jsonify({'book':book, 'status':200})


@app.route('/buyBook', methods=['POST'])
def buy_book():
    data = request.get_json()
    isbn = data['isbn']
    username = data['username']
    transactions = []

    # Get book by ISBN
    book_coll = db['book']
    query = {'ISBN':isbn}
    book = book_coll.find_one(query)
    if book is None:
        return jsonify({'message':'The book was not found!', 'status':404})
    
    # Get user by username
    user_coll = db['user']
    query = {'username':username}
    user = user_coll.find_one(query)
    if user is None:
        return jsonify({'message':'ERROR: User not found.', 'status':500})
    
    # Verify user balance
    if user['balance'] < book['price']:
        return jsonify({'message':'ERROR: Your account has insufficient funds to cover this transaction.', 'status':400})
    
    # Buy the book
    transaction_coll = db['transaction']
    code = 1
    for t in transaction_coll.find():
        transactions.append(t)

    if len(transactions) > 0:
        last_transaction = transactions[-1]
        code = last_transaction['code'] + 1
    
    # Create new transaction    
    amount = book['price']
    new_transaction = {'code':code, 'amount':-amount, 'user':username, 'book':isbn}
    tmp = transaction_coll.insert_one(new_transaction)
    if tmp is None:
        return jsonify({'message':'ERROR: purchase not completed.', 'status':501})
    

    # Update user's balance
    new_balance = user['balance'] - amount
    if new_balance < 0:
        return jsonify({'message':'ERROR: Your account has insufficient funds to cover this transaction.', 'status':401})

    query = { 'username': username }
    new_values = { '$set': { 'balance': new_balance } }
    user_coll.update_one(query, new_values)

    return jsonify({'message':'Transaction successfully performed!', 'status':200})


@app.route('/getBoughtBooks', methods=['GET'])
def get_bought_books():
    username = request.args.get('username')
    transactions = []
    books = []

    transaction_coll = db['transaction']
    book_coll = db['book']

    query = {'user':username}
    for x in transaction_coll.find(query):
        transactions.append(x)

    if len(transactions) == 0:
        return jsonify({'books':[], 'status':201})
    
    for t in transactions:
        isbn = t['book']
        query = {'ISBN':isbn}
        book = book_coll.find_one(query)
        if book is None:
            return jsonify({'message':'ERROR: The book was not found.', 'status':500})
        
        book['_id'] = str(book['_id'])
        books.append(book)
    
    if len(books) == 0:
        return jsonify({'books':[], 'status':201})
    
    return jsonify({'books':books, 'status':200})


@app.route('/getCategories', methods=['GET'])
def get_categories():
    categories = []
    book_coll = db['book']
    categories = book_coll.distinct('categories')
    
    if len(categories) == 0:
        return jsonify({'message':'ERROR: there is no data!', 'status':500})

    if '' in categories:
        categories.remove('')
    return jsonify({'categories':categories, 'status':200})


@app.route('/getBooksByCategory', methods=['GET'])
def get_books_by_category():
    category = request.args.get('category')
    books = []

    book_coll = db['book']
    query = {'categories':category}
    books = book_coll.find(query)
    if books is None:
        return jsonify({'message':'No book found for this category!', 'status':201})
    
    return jsonify({'books':books, 'status':200})


@app.route('/getAllBooksByName', methods=['GET'])
def get_all_books_by_name():
    name = request.args.get('name')
    books = []
    return_books = []

    book_coll = db['book']
    for book in book_coll.find({'title':{'$regex':name, "$options": "i"}}):
        books.append(book)
    if len(books) == 0:
        return jsonify({'books':[], 'status':201})
    
    for book in books:
        book['_id'] = str(book['_id'])
        return_books.append(book)
    
    return jsonify({'books':return_books, 'status':200})


@app.route('/getBoughtBooksByName', methods=['GET'])
def get_bought_books_by_name():
    username = request.args.get('username')
    name = request.args.get('name')

    transactions = []
    bought_books = []
    books = []
    return_books = []

    transaction_coll = db['transaction']
    book_coll = db['book']

    query = {'user':username}
    for x in transaction_coll.find(query):
        transactions.append(x)

    if len(transactions) == 0:
        return jsonify({'books':[], 'status':201})
    
    for t in transactions:
        isbn = t['book']
        query = {'ISBN':isbn}
        book = book_coll.find_one(query)
        if book is None:
            return jsonify({'message':'ERROR: The book was not found.', 'status':500})
        
        book['_id'] = str(book['_id'])
        bought_books.append(book)
    
    if len(bought_books) == 0:
        return jsonify({'books':[], 'status':201})
    if name == '':
        return jsonify({'books':bought_books, 'status':200})
    

    for book in book_coll.find({'title':{'$regex':name, "$options": "i"}}):
        books.append(book)
    if len(books) == 0:
        return jsonify({'books':[], 'status':201})


    for book in books:
        for book1 in bought_books:
            if book['title'] == book1['title']:
                book['_id'] = str(book['_id'])
                return_books.append(book)
    if len(return_books) == 0:
        return jsonify({'books':[], 'status':201})
    

    return jsonify({'books':return_books, 'status':200})


@app.route('/getPopularBooks', methods=['GET'])
def getPopularBooks():
    books = []

    book_coll = db['book']
    
    # Check if no book is available
    if book_coll.find() is None:
        return jsonify({'books':[], 'status':201})

    for book in book_coll.find().sort([("ratings_count",pymongo.DESCENDING),("average_rating",pymongo.DESCENDING)]).limit(4):
        books.append(parse_json(book))
    
    return jsonify({'books':books, 'status':200})



##############################################################################################################
if __name__ == "__main__":
    app.run(debug=True, host="localhost", port=5000)