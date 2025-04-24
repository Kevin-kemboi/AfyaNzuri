from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timezone  # Add timezone import

db = SQLAlchemy()

class Client(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    age = db.Column(db.Integer)
    gender = db.Column(db.String(10))
    contact = db.Column(db.String(100))
    enrollments = db.relationship('Enrollment', backref='client', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'age': self.age,
            'gender': self.gender,
            'contact': self.contact
        }

class Program(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    enrollments = db.relationship('Enrollment', backref='program', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description
        }

class Enrollment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    client_id = db.Column(db.Integer, db.ForeignKey('client.id'), nullable=False)
    program_id = db.Column(db.Integer, db.ForeignKey('program.id'), nullable=False)
    enrollment_date = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))  # Updated to timezone.utc

    def to_dict(self):
        return {
            'client_id': self.client_id,
            'program_id': self.program_id,
            'enrollment_date': self.enrollment_date.isoformat()
        }