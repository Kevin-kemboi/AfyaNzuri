import pytest
from backend.app import app, db

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

def test_register_client(client):
    response = client.post('/api/clients', json={
        'name': 'John Doe',
        'age': 30,
        'gender': 'Male',
        'contact': 'john@example.com'
    })
    assert response.status_code == 201
    assert response.json['client_id'] is not None

def test_get_client(client):
    client.post('/api/clients', json={'name': 'Jane Doe'})
    response = client.get('/api/clients/1')
    assert response.status_code == 200
    assert response.json['name'] == 'Jane Doe'

def test_create_program(client):
    response = client.post('/api/programs', json={
        'name': 'TB Program',
        'description': 'Tuberculosis treatment'
    })
    assert response.status_code == 201
    assert response.json['program_id'] is not None

def test_get_programs(client):
    client.post('/api/programs', json={'name': 'HIV Program'})
    response = client.get('/api/programs')
    assert response.status_code == 200
    assert len(response.json) == 1
    assert response.json[0]['name'] == 'HIV Program'

def test_enroll_client(client):
    client.post('/api/clients', json={'name': 'Jane Doe'})
    client.post('/api/programs', json={'name': 'HIV Program'})
    response = client.post('/api/enroll', json={
        'client_id': 1,
        'program_id': 1
    })
    assert response.status_code == 201
    assert response.json['msg'] == 'Enrollment successful'

def test_get_enrollments(client):
    client.post('/api/programs', json={'name': 'TB Program'})
    response = client.get('/api/enrollments')
    assert response.status_code == 200
    assert 'labels' in response.json
    assert 'datasets' in response.json 
