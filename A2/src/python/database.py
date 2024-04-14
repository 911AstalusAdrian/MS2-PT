import sqlite3

def init_db():
    # Create a database connection
    conn = sqlite3.connect('Personal.db')

    # Create a cursor object to execute SQL queries
    cursor = conn.cursor()

    # Create the 'about' table
    cursor.execute('''
        CREATE TABLE about (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            age INTEGER,
            bio TEXT
        )
    ''')

    # Create the 'work' table
    cursor.execute('''
        CREATE TABLE work (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            company TEXT,
            position TEXT,
            start_date TEXT,
            end_date TEXT
        )
    ''')

    # Create the 'education' table
    cursor.execute('''
        CREATE TABLE education (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            institution TEXT,
            degree TEXT,
            start_date TEXT,
            end_date TEXT
        )
    ''')

    # Create the 'hobbies' table
    cursor.execute('''
        CREATE TABLE hobbies (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            description TEXT
        )
    ''')

    # Commit the changes and close the connection
    conn.commit()
    conn.close()


# API calls to retrieve data from each table

def get_about_data():
    conn = sqlite3.connect('Personal.db')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM about')
    data = cursor.fetchall()
    conn.close()
    return data

def get_work_data():
    conn = sqlite3.connect('Personal.db')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM work')
    data = cursor.fetchall()
    conn.close()
    return data

def get_education_data():
    conn = sqlite3.connect('Personal.db')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM education')
    data = cursor.fetchall()
    conn.close()
    return data

def get_hobbies_data():
    conn = sqlite3.connect('Personal.db')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM hobbies')
    data = cursor.fetchall()
    conn.close()
    return data