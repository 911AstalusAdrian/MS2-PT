from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.cluster import KMeans
import io
from model import Model

app = Flask(__name__)
CORS(app)
model = Model()

@app.route('/upload', methods=['POST', 'GET'])
def upload_csv():
    file = request.files['file']
    if not file:
        return {"No file": 400}
    
    data = pd.read_csv(io.StringIO(file.stream.read().decode('UTF-8')))
    model.set_dataframe(data)
    return {'columns': data.columns.tolist()}

@app.route('/shape')
def shape():
    return model.get_shape()

@app.route('/columns')
def columns():
    return model.get_column_details()

@app.route('/first', methods=['GET'])
def first():
    n = int(request.args.get('n', 5))
    return model.get_firstN(n)

@app.route('/last', methods=['GET'])
def last():
    n = int(request.args.get('n', 5))
    return model.get_lastN(n)

@app.route('/info')
def info():
    return model.get_statistics()

@app.route('/clean')
def clean():
    return model.clean_data()

@app.route('/features', methods=['POST'])
def set_features():
    features = request.json['features']
    model.set_features(features)
    return "Features set"

@app.route('/normalize')
def normalize():
    return model.normalize_data()

@app.route('/train', methods=['GET', 'POST'])
def train_model():
    model_type = request.json['model_type']
    return model.train(model_type)

@app.route('/predict', methods=['GET', 'POST'])
def predict():
    input_data = request.json['input_data']
    print(input_data)
    return model.predict(input_data)


if __name__ == '__main__':
    app.run(debug=True)
