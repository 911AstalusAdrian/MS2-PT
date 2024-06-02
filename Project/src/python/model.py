import json

class Model:
    def __init__(self):
        self.__data = None

    def set_dataframe(self, dataframe):
        self.__data = dataframe

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
