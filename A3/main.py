import pandas as pd
import numpy as np

if __name__ == '__main__':
    df = pd.read_csv('datasets/gdp_by_country_1999_2022.csv')
    print(df.head())