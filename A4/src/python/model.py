import pandas as pd
import numpy as np
import json
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression


def load_data():
    return pd.read_csv('../../dataset.csv')

class Model:
    def __init__(self):
        self.__model = LinearRegression()
        self.__data = load_data()
        self.__modelData = load_data()
        self.__y = self.__data['2022']
        self.__X = self.__modelData.drop(columns=['Country', '2022'])
        self.__model.fit(self.__X, self.__y)

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

    def compute(self):
        return 2

    def predict(self, GDPArray):
        years = list(range(1999, 2022))
        years.remove(2011)
        df = pd.DataFrame([GDPArray], columns=years)
        
        prediction = self.__model.predict(df)
        print(prediction[0])

        return {'prediction': prediction[0]}