import pymongo
from utilities import load_data

client = pymongo.MongoClient('mongodb://localhost:27017/')
db = client['ebookshelf']   # create db 'ebookshelf'

# Reset collections
collections = db.list_collection_names()
if len(collections) > 0:
    for collection in collections:
        db[collection].drop()

# Collection 'user'
user = db['user']
tmp = {'username':'admin', 'name':'admin', 'surname':'admin', 'balance':100_000, 'password':'ciaociao'}
x = user.insert_one(tmp)
print('[INFO] Collection \'user\' created.')

load_data()
print('[INFO] Collection \'book\' created.')
print('[INFO] Collection \'category\' created.')
print('[INFO] The system is ready!')