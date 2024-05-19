from flask import Flask, request
from flask_cors import CORS
from model import Model

app = Flask(__name__)
CORS(app)
model = Model()


@app.route('/')
def home():
    var = model.compute()
    return f'Hello, {var}!'

@app.route('/shape')
def shape():
    return model.get_shape()

@app.route('/columns')
def columns():
    return model.get_column_details()
    # return 'Hello, columns!'

@app.route('/first', methods=['GET'])
def first():
    n = int(request.args.get('n', 5))
    return model.get_firstN(n)
    # return 'Hello, first!'

@app.route('/last', methods=['GET'])
def last():
    n = int(request.args.get('n', 5))
    return model.get_lastN(n)
    # return 'Hello, last!'

@app.route('/info')
def info():
    return model.get_statistics()
    # return 'Hello, info!'

@app.route('/predict', methods=['POST', 'GET'])
def predict():
    return model.predict(2)
    # return 'Hello, predict!'
