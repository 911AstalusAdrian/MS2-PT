from flask import Flask, request, jsonify
from model import Model

app = Flask(__name__)
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

@app.route('/first')
def first():
    return model.get_firstN(5)
    # return 'Hello, first!'

@app.route('/last')
def last():
    return model.get_lastN(5)
    # return 'Hello, last!'

@app.route('/info')
def info():
    return model.get_statistics()
    # return 'Hello, info!'

@app.route('/predict')
def predict():
    return 'Hello, predict!'
