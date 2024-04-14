from flask import Flask, render_template
import sqlite3
import json


connect = sqlite3.connect('personal.db')
conn = connect.cursor()
app = Flask(__name__, template_folder='../html')

# Create 'About' table
conn.execute(
    '''CREATE TABLE IF NOT EXISTS about \
    (id INTEGER PRIMARY KEY, \
        name TEXT, \
        dateOfBirth TEXT, \
        placeOfBirth TEXT, \
        currentCity TEXT, \
        addressStreet TEXT, \
        addressCity TEXT, \
        addressState TEXT, \
        addressZip TEXT)''')

# Insert data into 'About' table
# conn.execute(
# '''INSERT INTO about (name, dateOfBirth, placeOfBirth, currentCity, addressStreet, addressCity, addressState, addressZip) \
# VALUES ('Adrian Astalus', 'March 17th 2002', 'Ludus, Mures County', 'Cluj-Napoca', 'Str. Dambovitei nr. 15', 'Cluj-Napoca', 'Cluj', '400584')''')
# connect.commit()

# Create 'Work' table
conn.execute(
    'CREATE TABLE IF NOT EXISTS work \
    (id INTEGER PRIMARY KEY, \
        company TEXT, \
        position TEXT, \
        start_date TEXT, \
        end_date TEXT)')

# Insert data into 'Work' table
# conn.execute('''INSERT INTO work (id, company, position, start_date, end_date)
#              VALUES (1, 'Betfair Romania', 'Intern QA Data Engineer', 'October 2023', 'Present'),
#                     (2, 'Wolfpack Digital', 'iOS Intern', 'July 2022', 'August 2022')''')
# connect.commit()

# Create 'Education' table
conn.execute(
    'CREATE TABLE IF NOT EXISTS education \
    (id INTEGER PRIMARY KEY, \
        institution TEXT, \
        degree TEXT, \
        major TEXT, \
        start_date TEXT, \
        end_date TEXT)')

# Insert data into 'Education' table
# conn.execute('''INSERT INTO education (id, institution, degree, major, start_date, end_date)
#     VALUES (1, 'Babes-Bolyai University', 'Masters', 'Data Science', '2023', '2025'),
#         (2, 'Babes-Bolyai University', 'Bachelor''s', 'Computer Science', '2020', '2023')
# ''')
# connect.commit()

# Create 'Hobbies' table
conn.execute(
    'CREATE TABLE IF NOT EXISTS hobbies \
    (id INTEGER PRIMARY KEY, \
        hobby TEXT)')

# Insert data into 'Hobbies' table
# conn.execute('''INSERT INTO hobbies (id, hobby)
#     VALUES (1, 'Hiking'),
#         (2, 'Video Games'),
#         (3, 'Cooking')
# ''')
# connect.commit()

@app.route('/')
def index():
    return 'Hello World!'
    # with sqlite3.connect('personal.db') as connection:
    #     cursor = connection.cursor()

    #     cursor.execute('SELECT * FROM about')
    #     about = cursor.fetchall()

    #     cursor.execute('SELECT * FROM work')
    #     work = cursor.fetchall()

    #     cursor.execute('SELECT * FROM education')
    #     education = cursor.fetchall()

    #     cursor.execute('SELECT * FROM hobbies')
    #     hobbies = cursor.fetchall()

    #     return render_template('index.html', about=about, work=work, education=education, hobbies=hobbies)


@app.route('/about')
def get_about():
    with sqlite3.connect('personal.db') as connection:
        cursor = connection.cursor()
        cursor.execute('SELECT * FROM about')
        about = cursor.fetchall()
        # print(about)
        # return json.dumps(about)
        return about

@app.route('/work')
def get_work():
    with sqlite3.connect('personal.db') as connection:
        cursor = connection.cursor()
        cursor.execute('SELECT * FROM work')
        work = cursor.fetchall()
        return work
    
@app.route('/education')
def get_education():
    with sqlite3.connect('personal.db') as connection:
        cursor = connection.cursor()
        cursor.execute('SELECT * FROM education')
        education = cursor.fetchall()
        return education
    
@app.route('/hobbies')
def get_hobbies():
    with sqlite3.connect('personal.db') as connection:
        cursor = connection.cursor()
        cursor.execute('SELECT * FROM hobbies')
        hobbies = cursor.fetchall()
        return hobbies

if __name__ == '__main__':
    app.run(debug=True)
    # # Create the database tables
    # database.db.create_all()

    # # Run the Flask application
    # app.run()