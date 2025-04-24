import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import pytest
from app import app, db
from models import Client, Program, Enrollment

@pytest.fixture
def client():
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
    with app.test_client() as client:
        with app.app_context():
            db.create_all()
        yield client
        with app.app_context():
            db.drop_all()

def test_create_program(client):
    response = client.post('/programs', data={'name': 'TB Program', 'description': 'Tuberculosis treatment'})
    assert response.status_code == 302  # Redirect to index
    with app.app_context():
        program = Program.query.first()
        assert program.name == 'TB Program'

def test_register_client(client):
    response = client.post('/clients', data={'name': 'John Doe', 'age': '30', 'gender': 'Male', 'contact': 'john@example.com'})
    assert response.status_code == 302
    with app.app_context():
        client = Client.query.first()
        assert client.name == 'John Doe'

def test_enroll_client(client):
    with app.app_context():
        new_client = Client(name='Jane Doe')
        new_program = Program(name='HIV Program')
        db.session.add(new_client)
        db.session.add(new_program)
        db.session.commit()
        client_id = new_client.id
        program_id = new_program.id
    response = client.post('/enroll', data={'client_id': client_id, 'program_id': program_id})
    assert response.status_code == 302
    with app.app_context():
        enrollment = Enrollment.query.first()
        assert enrollment.client_id == client_id
        assert enrollment.program_id == program_id

def test_get_client_profile(client):
    with app.app_context():
        new_client = Client(name='Jane Doe', age=25, gender='Female')
        db.session.add(new_client)
        db.session.commit()
        client_id = new_client.id
    response = client.get(f'/api/clients/{client_id}')
    assert response.status_code == 200
    assert response.json['client']['name'] == 'Jane Doe'