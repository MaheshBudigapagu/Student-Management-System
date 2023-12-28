import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function StudentSearch() {
  const [idSearchValue, setIdSearchValue] = useState('');
  const [nameSearchValue, setNameSearchValue] = useState('');
  const [studentById, setStudentById] = useState(null);
  const [studentsByName, setStudentsByName] = useState([]);
  const [idError, setIdError] = useState('');
  const [nameError, setNameError] = useState('');

  const handleIdSearchChange = (event) => {
    setIdSearchValue(event.target.value);
  };

  const handleNameSearchChange = (event) => {
    setNameSearchValue(event.target.value);
  };

  const handleIdSearch = () => {
    axios
      .get(`http://localhost:8081/getstudentbyid/${idSearchValue}`)
      .then((response) => {
        setStudentById(response.data);
        setIdError('');
      })
      .catch((error) => {
        console.error('student Id Not found');
        setIdError('Student ID not found');
      });
  };

  const handleNameSearch = () => {
    axios
      .get(`http://localhost:8081/getStudentByName/${nameSearchValue}`)
      .then((response1) => {
        setStudentsByName(response1.data);
        setNameError('');
      })
      .catch((error) => {
        console.error('student Name Not found');
        setNameError('Student Name not found');
      });
  };

  return (
    <div>
      <div className='text-end'><Link className='btn btn-outline-info my-2' to='/'>Back</Link>  </div>
      <h3>Search by ID</h3>
      <div>
      <input type="text" value={idSearchValue} onChange={handleIdSearchChange} />
      <button onClick={handleIdSearch}>Search</button>
      {idError && <p>{idError}</p>}
      {studentById && (
        <div className='my-5'>
          <h4 id='id'>Student Details</h4>
          <p>ID: {studentById.studentId}</p>
          <p>Name: {studentById.studentName}</p>
          <p>Email: {studentById.studentEmail}</p>
          <p>Course: {studentById.course.courseName}</p>
        </div>
      )}
      </div>
      <div className='my-5'>
      <h3>Search by Name</h3>
      <input type="text" value={nameSearchValue} onChange={handleNameSearchChange} />
      <button onClick={handleNameSearch}>Search</button>
      {nameError && <p>{nameError}</p>}
      {studentsByName.length > 0 && (
        <div>
          <h4>Students List</h4>
          <ul>
            {studentsByName.map((student) => (
              <li key={student.studentId}>
                Name: {student.studentName} - Email: {student.studentEmail} - Course: {student.course.courseName}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    </div>
  );
}

export default StudentSearch;
