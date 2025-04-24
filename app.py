from flask import Flask, render_template, request, jsonify, redirect, url_for
from models import db, Client, Program, Enrollment
from datetime import datetime
from werkzeug.exceptions import NotFound  # Add for manual 404 handling

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///health.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

# Create database tables
with app.app_context():
    db.create_all()

# Homepage
@app.route('/')
def index():
    return render_template('index.html')

# Create a health program
@app.route('/programs', methods=['GET', 'POST'])
def programs():
    if request.method == 'POST':
        data = request.form
        if not data.get('name'):
            return render_template('create_program.html', error='Program name is required')
        new_program = Program(name=data['name'], description=data.get('description', ''))
        db.session.add(new_program)
        db.session.commit()
        return redirect(url_for('index'))
    return render_template('create_program.html')

# Register a new client
@app.route('/clients', methods=['GET', 'POST'])
def clients():
    if request.method == 'POST':
        data = request.form
        if not data.get('name'):
            return render_template('register_client.html', error='Client name is required')
        new_client = Client(
            name=data['name'],
            age=data.get('age', type=int),
            gender=data.get('gender'),
            contact=data.get('contact')
        )
        db.session.add(new_client)
        db.session.commit()
        return redirect(url_for('index'))
    return render_template('register_client.html')

# Enroll a client in a program
@app.route('/enroll', methods=['GET', 'POST'])
def enroll():
    if request.method == 'POST':
        client_id = request.form.get('client_id', type=int)
        program_id = request.form.get('program_id', type=int)
        if not client_id or not program_id:
            return render_template('enroll_client.html', error='Client and program are required',
                                 clients=Client.query.all(), programs=Program.query.all())
        if Enrollment.query.filter_by(client_id=client_id, program_id=program_id).first():
            return render_template('enroll_client.html', error='Client already enrolled in this program',
                                 clients=Client.query.all(), programs=Program.query.all())
        new_enrollment = Enrollment(client_id=client_id, program_id=program_id)
        db.session.add(new_enrollment)
        db.session.commit()
        return redirect(url_for('index'))
    return render_template('enroll_client.html', clients=Client.query.all(), programs=Program.query.all())

# Search for a client
@app.route('/clients/search', methods=['GET', 'POST'])
def search_client():
    if request.method == 'POST':
        name = request.form.get('name')
        if not name:
            return render_template('search_client.html', error='Name is required', clients=[])
        clients = Client.query.filter(Client.name.ilike(f'%{name}%')).all()
        return render_template('search_client.html', clients=clients)
    return render_template('search_client.html', clients=[])

# View client profile
@app.route('/clients/<int:client_id>')
def view_client(client_id):
    client = db.session.get(Client, client_id)
    if not client:
        raise NotFound('Client not found')
    programs = [enrollment.program for enrollment in client.enrollments]
    return render_template('view_client.html', client=client, programs=programs)

# API: Get client profile
@app.route('/api/clients/<int:client_id>', methods=['GET'])
def get_client_profile(client_id):
    client = db.session.get(Client, client_id)
    if not client:
        raise NotFound('Client not found')
    programs = [enrollment.program.to_dict() for enrollment in client.enrollments]
    return jsonify({
        'client': client.to_dict(),
        'programs': programs
    })

if __name__ == '__main__':
    app.run(debug=True)