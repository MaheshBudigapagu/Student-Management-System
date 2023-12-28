import React, { useState} from 'react';
import axios from 'axios';

function AttendanceByStudentId() {
  const [studentId, setStudentId] = useState('');
  const [attendance, setAttendance] = useState([]);
  const [error, setError] = useState('');

  const fetchAttendanceByStudentId = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/student/${studentId}`);
      console.log(response.data);
      setAttendance(response.data);
      setError('');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError('Student ID not found.');
      } else {
        setError('An error occurred while fetching attendance.');
      }
      setAttendance([]);
    }
  };

  const handleStudentIdChange = (event) => {
    setStudentId(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchAttendanceByStudentId();
  };

  return (
    <div>
      <h2>Fetch Attendance by Student ID</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Student ID:
          <input type="text" value={studentId} onChange={handleStudentIdChange} />
        </label>
        <button type="submit" className='mx-2'>Fetch Attendance</button>
      </form>
      {error && <p>{error}</p>}

      <ol className='my-3'>
        {attendance.map((item) => (
          <li key={item.id}>
            <p>
              Student ID: {item.student.studentId} | Name: {item.student.studentName} | Date: {item.date}
            </p>
          </li>
        ))}
      </ol>

    </div>
  );
}

export default AttendanceByStudentId;
