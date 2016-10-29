from flask import render_template, abort, request, jsonify
from . import app, db
from .models import User

# -- users  ---------------------------------------------------------------------
@app.route('/users/<id>')
def get_user(id=None):
    return render_template('index.html', username=username)

@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify({"users": [u.as_dict() for u in users]}), 200

@app.route('/users', methods=['POST'])
def create_user():
    if not request.json or 'user' not in request.json:
        return abort(400)
    try:
        u = User(name=request.json['user'].get('name'),
                 email=request.json['user'].get('email'),
                 password=request.json['user'].get('password'),
                 password_confirmation=request.json['user'].get('password_confirmation'))

        db.session.add(u)
        db.session.commit()
        return jsonify({"users": [u.as_dict()]}), 200
    except Exception as err:
        return abort(400)


