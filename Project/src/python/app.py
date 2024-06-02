from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.cluster import KMeans
import io

app = Flask(__name__)
CORS(app)
data = None

@app.route('/upload', methods=['POST', 'GET'])
def upload_csv():

    print('-----------------UPLOAD-----------------')

    global data
    file = request.files['file']
    print(file)
    if not file:
        return "No file", 400
    data = pd.read_csv(io.StringIO(file.stream.read().decode('UTF-8')))
    response = {
        "rows": data.shape[0],
        "cols": data.shape[1],
        "columns": data.columns.tolist(),
        "first_rows": data.head().to_dict(orient='records'),
        "last_rows": data.tail().to_dict(orient='records'),
        "stats": data.describe().to_dict()
    }
    return jsonify(response)

@app.route('/remove_empty', methods=['POST'])
def remove_empty_rows():
    global data
    if data is None:
        return "No data", 400
    data.dropna(inplace=True)
    return "Empty rows removed", 200

@app.route('/transform', methods=['POST'])
def transform_data():
    global data
    if data is None:
        return "No data", 400
    columns = request.json.get('columns', [])
    data = pd.get_dummies(data, columns=columns)
    scaler = StandardScaler()
    data[data.columns] = scaler.fit_transform(data)
    return "Data transformed", 200

@app.route('/train_regression', methods=['POST'])
def train_regression():
    global data
    if data is None:
        return "No data", 400
    X = data.drop('target_column', axis=1)  # Replace 'target_column' with your target column name
    y = data['target_column']
    model = LinearRegression()
    model.fit(X, y)
    # Save model or perform any other tasks
    return "Regression model trained", 200

@app.route('/train_classification', methods=['POST'])
def train_classification():
    global data
    if data is None:
        return "No data", 400
    X = data.drop('target_column', axis=1)  # Replace 'target_column' with your target column name
    y = data['target_column']
    model = RandomForestClassifier()
    model.fit(X, y)
    # Save model or perform any other tasks
    return "Classification model trained", 200

@app.route('/train_clustering', methods=['POST'])
def train_clustering():
    global data
    if data is None:
        return "No data", 400
    X = data.drop('target_column', axis=1)  # Replace 'target_column' with your target column name
    model = KMeans(n_clusters=3)  # Example for 3 clusters
    model.fit(X)
    # Save model or perform any other tasks
    return "Clustering model trained", 200

@app.route('/predict', methods=['POST'])
def predict():
    global data
    if data is None:
        return "No data", 400
    input_data = request.json
    input_df = pd.DataFrame([input_data])
    # Assuming the model is saved and loaded, e.g., model = joblib.load('model.pkl')
    # result = model.predict(input_df)
    result = "example prediction"  # Placeholder
    return jsonify({"result": result})

if __name__ == '__main__':
    app.run(debug=True)
