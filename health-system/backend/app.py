from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
from datetime import datetime

app = Flask(__name__)
CORS(app)

def init_db():
    conn = sqlite3.connect('health.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS clients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        age INTEGER,
        gender TEXT,
        contact TEXT
    )''')
    c.execute('''CREATE TABLE IF NOT EXISTS programs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        category TEXT
    )''')
    c.execute('''CREATE TABLE IF NOT EXISTS enrollments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        client_id INTEGER,
        program_id INTEGER,
        date TEXT,
        FOREIGN KEY (client_id) REFERENCES clients(id),
        FOREIGN KEY (program_id) REFERENCES programs(id)
    )''')
    conn.commit()
    conn.close()

init_db()

@app.route('/api/clients', methods=['GET', 'POST'])
def handle_clients():
    conn = sqlite3.connect('health.db')
    c = conn.cursor()
    if request.method == 'GET':
        c.execute('SELECT * FROM clients')
        clients = [{'id': row[0], 'name': row[1], 'age': row[2], 'gender': row[3], 'contact': row[4]} for row in c.fetchall()]
        conn.close()
        return jsonify(clients)
    elif request.method == 'POST':
        data = request.get_json()
        name = data.get('name')
        age = data.get('age')
        gender = data.get('gender')
        contact = data.get('contact')
        if not name:
            conn.close()
            return jsonify({'msg': 'Name is required'}), 400
        c.execute('INSERT INTO clients (name, age, gender, contact) VALUES (?, ?, ?, ?)', (name, age, gender, contact))
        client_id = c.lastrowid
        conn.commit()
        conn.close()
        return jsonify({'client_id': client_id}), 201

@app.route('/api/programs', methods=['GET', 'POST'])
def handle_programs():
    conn = sqlite3.connect('health.db')
    c = conn.cursor()
    if request.method == 'GET':
        c.execute('SELECT * FROM programs')
        programs = [{'id': row[0], 'name': row[1], 'description': row[2], 'category': row[3]} for row in c.fetchall()]
        conn.close()
        return jsonify(programs)
    elif request.method == 'POST':
        data = request.get_json()
        name = data.get('name')
        description = data.get('description')
        category = data.get('category')
        if not name:
            conn.close()
            return jsonify({'msg': 'Name is required'}), 400
        c.execute('INSERT INTO programs (name, description, category) VALUES (?, ?, ?)', (name, description, category))
        program_id = c.lastrowid
        conn.commit()
        conn.close()
        return jsonify({'program_id': program_id}), 201

@app.route('/api/enroll', methods=['POST'])
def enroll():
    conn = sqlite3.connect('health.db')
    c = conn.cursor()
    data = request.get_json()
    client_id = data.get('client_id')
    program_id = data.get('program_id')
    if not client_id or not program_id:
        conn.close()
        return jsonify({'msg': 'Client ID and Program ID are required'}), 400
    c.execute('SELECT id FROM clients WHERE id = ?', (client_id,))
    if not c.fetchone():
        conn.close()
        return jsonify({'msg': 'Client not found'}), 404
    c.execute('SELECT id FROM programs WHERE id = ?', (program_id,))
    if not c.fetchone():
        conn.close()
        return jsonify({'msg': 'Program not found'}), 404
    c.execute('SELECT * FROM enrollments WHERE client_id = ? AND program_id = ?', (client_id, program_id))
    if c.fetchone():
        conn.close()
        return jsonify({'msg': 'Client is already enrolled in this program'}), 400
    date = datetime.now().isoformat()
    c.execute('INSERT INTO enrollments (client_id, program_id, date) VALUES (?, ?, ?)', (client_id, program_id, date))
    enrollment_id = c.lastrowid
    conn.commit()
    conn.close()
    return jsonify({'enrollment_id': enrollment_id}), 201

@app.route('/api/enrollments', methods=['GET'])
def get_enrollments():
    conn = sqlite3.connect('health.db')
    c = conn.cursor()
    c.execute('SELECT * FROM enrollments')
    enrollments = [{'id': row[0], 'client_id': row[1], 'program_id': row[2], 'date': row[3]} for row in c.fetchall()]
    conn.close()
    return jsonify(enrollments)

if __name__ == '__main__':
    app.run(debug=True)