from flask import Flask
from . import db

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(55))
    email = db.Column(db.String(120), unique=True)
    encrypted_password = db.Column(db.Text)
    auth_token = db.Column(db.Text)
    auth_expires_at = db.Column(db.Date)

    def __init__(self, name, email, encrypted_password):
        pass
