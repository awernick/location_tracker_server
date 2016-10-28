from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://localhost/location_tracker'
db = SQLAlchemy(app)

from .models import User

@app.route('/')
@app.route('/<username>')
def hello_world(username=None):
    User.query.all()
    return render_template('example.html', username=username)
