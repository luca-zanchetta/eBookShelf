import csv
import math
import pymongo
import json
from bson import json_util

client = pymongo.MongoClient('mongodb://localhost:27017/')
db = client['ebookshelf']   # create db 'ebookshelf'

def load_data():
    books = []
    books_to_insert = []
    book_titles = []
    categories = []

    with open('./books.csv', 'r', encoding='utf-8') as file:
        # Read the CSV file
        csv_reader = csv.reader(file)

        for row in csv_reader:
            '''
            Every row is a list of the form:    
            [0=isbn13, 1=isbn10, 2=title, 3=subtitle, 4=authors, 5=categories, 6=thumbnail, 7=description, 
             8=published_year, 9=average_rating, 10=num_pages, 11=ratings_count, 12=price]
            '''
            if row[10] == 'num_pages':
                row.append('price')
                continue
            try:
                price = math.log(int(row[10]))
                row[10] = int(row[10])  # Convert num_pages into an integer
                row[11] = int(row[11])  # Convert ratings_count into an integer

                row.append(round(price,2))
                books.append(row)
            except Exception as err:
                pass
    
    book_coll = db['book']
    
    # Remove duplicates
    for book in books:
        if book[2] not in book_titles:
            book_titles.append(book[2])
            books_to_insert.append(book)
    for book in books_to_insert:
        if book[5] == '':
            books_to_insert.remove(book)

    for book in books_to_insert:
        book_to_insert = {'ISBN':book[0], 'title':book[2], 'subtitle':book[3], 'authors':book[4], 'categories':book[5], \
                          'URL':book[6], 'description':book[7], 'published_year':book[8], 'average_rating':book[9], \
                          'num_pages':book[10], 'ratings_count':book[11], 'price':book[12]}
        book_coll.insert_one(book_to_insert)

    # Categories
    for book in books_to_insert:
        if book[5] not in categories:
            categories.append(book[5])
    category_coll = db['category']
    for cat in categories:
        category_coll.insert_one({'name':cat})


def parse_json(data):
    return json.loads(json_util.dumps(data))


def getBooksByCategory(category):
    return_books = []
    book_coll = db['book']

    for book in book_coll.find({'categories':category}):
        book['_id'] = str(book['_id'])
        return_books.append(book)
    
    return return_books