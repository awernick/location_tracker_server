import re
from . import app, db, bcrypt
from sqlalchemy.orm import validates
from itsdangerous import (TimedJSONWebSignatureSerializer
                           as Serializer, BadSignature, SignatureExpired)

class User(db.Model):
    EMAIL_REGEX = r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)"

    # -- schema ----------------------------------------------------------------
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(55))
    email = db.Column(db.String(120), unique=True)
    encrypted_password = db.Column(db.Text)
    is_admin = db.Column(db.Boolean)

    def __init__(self, name, email, password, password_confirmation, is_admin=False):
        self.name = name
        self.email = email
        self.is_admin = is_admin
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

    def verify_password(self, password):
        if bcrypt.check_password_hash(self.encrypted_password, password):
            return True
        else:
            return False

    def generate_auth_token(self, expiration=600):
        s = Serializer(app.config['SECRET_KEY'], expires_in=expiration)
        return s.dumps({'id': self.id})

    @staticmethod
    def verify_auth_token(auth_token):
        s = Serializer(app.config['SECRET_KEY'])
        try:
            data = s.loads(auth_token)
        except SignatureExpired:
            # Valid token, but expired
            return None
        except BadSignature:
            # Invalid token
            return None

        user = User.query.get(data['id'])
        return user

    def as_dict(self):
               return {c.name: getattr(self, c.name) for c in self.__table__.columns}
