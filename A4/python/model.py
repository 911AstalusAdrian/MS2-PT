import pandas as pd
import numpy as np
import json

def load_data():
    return pd.read_csv('../dataset.csv')

class Model:
    def __init__(self):
        self.data = load_data()

    def get_shape(self):
        shape = self.data.shape
        return json.dumps({'rows': shape[0], 'columns': shape[1]})
    
    def get_column_details(self):
        details = self.data.dtypes
        dtypes_dict = details.apply(lambda x: x.name).to_dict()
        return json.dumps(dtypes_dict)
    
    def get_firstN(self, n):
        firstN = self.data.head(n)
        return json.dumps(firstN.to_dict())
    
    def get_lastN(self, n):
        lastN = self.data.tail(n)
        return json.dumps(lastN.to_dict())
    
    def get_statistics(self):
        statistics = self.data.describe()
        return json.dumps(statistics.to_dict())

    def compute(self):
        return 2