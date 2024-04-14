from flask import Flask, render_template
import database

app = Flask(__name__, template_folder='../html')

# Define your database models here
# class User(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(50), nullable=False)

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
    # # Create the database tables
    # database.db.create_all()

    # # Run the Flask application
    # app.run()