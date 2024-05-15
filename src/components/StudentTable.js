// src/components/StudentTable.js
import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { db } from '../firebase';
import { collection, getDocs, onSnapshot, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { jsPDF } from 'jspdf';
import { CSVLink } from 'react-csv';
import './App.css';

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [currentStudent, setCurrentStudent] = useState({});

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'students'), (snapshot) => {
      const newStudents = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setStudents(newStudents);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'students', id));
  };

  const handleEdit = (student) => {
    setCurrentStudent(student);
    setEditModal(true);
  };

  const handleSave = async () => {
    const studentDoc = doc(db, 'students', currentStudent.id);
    await updateDoc(studentDoc, currentStudent);
    setEditModal(false);
  };

  const handleExportPdf = () => {
    const doc = new jsPDF();
    doc.text("Student Records", 10, 10);
    students.forEach((student, index) => {
      doc.text(`${index + 1}. ${student.name}, ${student.age}, ${student.grade}`, 10, 20 + index * 10);
    });
    doc.save("students.pdf");
  };

  const headers = [
    { label: "Name", key: "name" },
    { label: "Age", key: "age" },
    { label: "Grade", key: "grade" }
  ];

  const csvReport = {
    filename: 'students.csv',
    headers: headers,
    data: students
  };

  return (
    <>
      <div className="controls">
        <Button variant="" onClick={handleExportPdf}>Export to PDF</Button>
        <CSVLink {...csvReport} className="btn ">Export to CSV</CSVLink>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Age</th>
            <th>Grade</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student.grade}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(student)}>Edit</Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(student.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={editModal} onHide={() => setEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={currentStudent.name}
                onChange={(e) => setCurrentStudent({ ...currentStudent, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formAge">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                value={currentStudent.age}
                onChange={(e) => setCurrentStudent({ ...currentStudent, age: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formGrade">
              <Form.Label>Grade</Form.Label>
              <Form.Control
                type="text"
                value={currentStudent.grade}
                onChange={(e) => setCurrentStudent({ ...currentStudent, grade: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleSave}>Save changes</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default StudentTable;
