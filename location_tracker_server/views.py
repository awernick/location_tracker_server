from flask import g, render_template, abort, request, jsonify
from . import app, auth, bcrypt, db
from .models import User

# -- users  ---------------------------------------------------------------------
@app.route('/users/<id>')
@auth.login_required
def get_user(id=None):
    if id is None:
        return abort(404)

    user = User.query.filter_by(id=id).first_or_404()
    return jsonify({"users": [user.as_dict()]}), 200


@app.route('/users', methods=['GET'])
@auth.login_required
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

@app.route('/token')
@auth.login_required
def get_auth_token():
    auth_token = g.user.generate_auth_token()
    return jsonify({'auth_token': auth_token.decode('ascii')}), 200

# -- auth ----------------------------------------------------------------------
@auth.verify_password
def verify_password(email_or_token, password):
    user = User.verify_auth_token(email_or_token)

    # Attempt auth through password if user could not be found
    if not user:
        user = User.query.filter_by(email=email_or_token).first()
        if not user or not user.verify_password(password):
            return False

    g.user = user
    return True

# -- errors --------------------------------------------------------------------
@app.errorhandler(400)
def bad_request(e):
    return jsonify(error=400, text=str(e)), 400

@app.errorhandler(404)
def record_not_found(e):
    return jsonify(error=404, text=str(e)), 404
