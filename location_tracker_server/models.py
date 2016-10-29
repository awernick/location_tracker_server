from . import db, bcrypt

class User(db.Model):
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
        self.__generate_encrypted_password(password, password_confirmation)

    def __generate_encrypted_password(self, password, password_confirmation):
        if password == password_confirmation:
            if len(password) > 8:
                self.encrypted_password = bcrypt.generate_password_hash(password)
            else:
                raise Exception('Password should be greater than or equal to 8 characters')
        else:
            raise Exception('Password and confirmation do not match')
