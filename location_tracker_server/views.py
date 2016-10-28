from flask import render_template
from . import app
from .models import User

@app.route('/')
@app.route('/<username>')
def hello_world(username=None):
    return render_template('index.html', username=username)
