from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return 'Hello, Home!'

@app.route('/shape')
def shape():
    return 'Hello, shape!'

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
