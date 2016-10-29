import re
from . import db, bcrypt
from sqlalchemy.orm import validates

class User(db.Model):
    EMAIL_REGEX = r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)"

    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(55))
    email = db.Column(db.String(120), unique=True)
    encrypted_password = db.Column(db.Text)
    auth_token = db.Column(db.Text)
    auth_expires_at = db.Column(db.Date)

    def __init__(self, name, email, password, password_confirmation):
        self.name = name
        self.email = email
        self.set_encrypted_password(password, password_confirmation)

    @validates('email')
    def validate_email(self, key, email):
        assert len(email) >= 3 and len(email) <= 255
        email_regex = re.compile(self.EMAIL_REGEX)
        assert email_regex.match(email)
        return email

    def set_encrypted_password(self, password, password_confirmation):
        if password == password_confirmation:
            if len(password) > 8:
                self.encrypted_password = bcrypt.generate_password_hash(password)
            else:
                raise Exception('Password should be greater than or equal to 8 characters')
        else:
            raise Exception('Password and confirmation do not match')

    def as_dict(self):
               return {c.name: getattr(self, c.name) for c in self.__table__.columns}
