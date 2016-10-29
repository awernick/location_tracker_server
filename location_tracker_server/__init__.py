from os import path
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt

app = Flask(__name__)
database_path = path.join(app.root_path, 'tmp', 'development.db')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///{}'.format(database_path)
db = SQLAlchemy(app)
migrate = Migrate(app, db)
bcrypt = Bcrypt(app)

import views

