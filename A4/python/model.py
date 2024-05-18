import pandas as pd
import numpy as np

def load_data():
    return pd.read_csv('../dataset.csv')

class Model:
    def __init__(self):
        self.data = load_data()

    def get_shape(self):
        return self.data.shape

    def compute(self):
        return 2