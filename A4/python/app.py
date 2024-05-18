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
    result = {}
    rows,cols = model.get_shape()
    result['rows'] = rows
    result['columns'] = cols
    return result

@app.route('/columns')
def columns():
    return 'Hello, columns!'

@app.route('/first')
def first():
    return 'Hello, first!'

@app.route('/last')
def last():
    return 'Hello, last!'

@app.route('/info')
def info():
    return 'Hello, info!'

@app.route('/predict')
def predict():
    return 'Hello, predict!'
