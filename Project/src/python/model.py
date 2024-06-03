import json
from sklearn.linear_model import LinearRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.cluster import KMeans
from sklearn.preprocessing import OrdinalEncoder, StandardScaler
import pandas as pd

class Model:
    def __init__(self):
        self.__data = None
        self.__features = []
        self.__model = None
        self.__encoder = OrdinalEncoder()
        self.__scaler = StandardScaler()

    def set_dataframe(self, dataframe):
        self.__data = dataframe

    def set_features(self, features):
        self.__features.clear()

        for feature in features:
            self.__features.append(feature)

    def get_shape(self):
        shape = self.__data.shape
        return json.dumps({'rows': shape[0], 'columns': shape[1]})
    
    def get_column_details(self):
        columns = self.__data.columns
        type = self.__data.dtypes.astype(str).tolist()
        details = {
            'Columns': columns.tolist(),
            'Type': type
        }
        return details
    
    def get_firstN(self, n):
        firstN = self.__data.head(n)
        return json.dumps(firstN.to_dict())
    
    def get_lastN(self, n):
        lastN = self.__data.tail(n)
        return json.dumps(lastN.to_dict())
    
    def get_statistics(self):
        statistics = self.__data.describe()
        return json.dumps(statistics.to_dict())
    
    def clean_data(self):
        rows_before = self.__data.shape[0]
        self.__data.dropna(inplace=True)
        rows_after = self.__data.shape[0]
        return {'removed_rows': rows_before - rows_after}

    def train(self, model_type):

        print(model_type)

        X = self.__data.copy()
        X.drop(self.__features, axis=1, inplace=True)

        y = self.__data[self.__features]

        if model_type == 'regression':
            self.__model = LinearRegression()
        elif model_type == 'classification':
            self.__model = KNeighborsClassifier()
        elif model_type == 'clustering':
            self.__model = KMeans()
        else:
            raise ValueError('Invalid model type')

        self.__model.fit(X, y)

    def normalize_data(self):
        categorical_columns = self.__data.select_dtypes(include=['object']).columns.tolist()
        numerical_columns = self.__data.select_dtypes(include=['number']).columns.tolist()

        self.__data[categorical_columns] = self.__encoder.fit_transform(self.__data[categorical_columns])
        self.__data[numerical_columns] = self.__scaler.fit_transform(self.__data[numerical_columns])

        return 'Normalized'