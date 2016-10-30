from os import path, environ
from flask import Flask
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from flask_httpauth import HTTPBasicAuth
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config.from_object(environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# -- database ------------------------------------------------------------------
db = SQLAlchemy(app)
migrate = Migrate(app, db)

# -- security ------------------------------------------------------------------
bcrypt = Bcrypt(app)
auth = HTTPBasicAuth()

import views

