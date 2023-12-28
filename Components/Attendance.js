import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Attendance = () => {
  const [attendanceList, setAttendanceList] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const response = await axios.get('http://localhost:8081/getattendance');
      setAttendanceList(response.data);
    } catch (error) {
      setError('Error retrieving attendance');
    }
  };

  const markAttendance = async () => {
    try {
      await axios.post(`http://localhost:8081/mark/${studentId}`);
      fetchAttendance();
      setStudentId('');
      setError('');
    } catch (error) {
      setError('Error marking attendance');
    }
  };

  return (
    <div>
      <div className='my-2'><Link to='/getattendancebyid'>Get Attendance</Link></div>
      <h2>Attendance</h2>
      <div>
        <label htmlFor="studentId">Student ID:</label>
        <input
          type="text"
          id="studentId"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className='mx-2'
        />
        <button className='btn btn-info mx-2' onClick={markAttendance}>Mark Attendance</button>
      </div>
      {error && <p>{error}</p>}
      <table className='table table-striped border shadow my-5'>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Name</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {attendanceList.map((attendance) => (
            <tr key={attendance.id}>
              <td>{attendance.student.studentId}</td>
              <td>{attendance.student.studentName}</td>
              <td>{attendance.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Attendance;
