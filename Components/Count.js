import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function Count() {
  const [studentCounts, setStudentCounts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8081/countStudentByCourse')
      .then(response => response.json())
      .then(data => setStudentCounts(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className='container'>
      <h2 className='text-primary my-3'>Number of Students enrolled in Courses</h2>

      <div className='text-end'><Link className='btn btn-outline-info my-2' to='/'>Back</Link>  </div>
      <div>
      <table className='table table-striped border shadow my-1'>
        <thead>
          <tr>
            <th>Count</th>
            <th>Course</th>
          </tr>
        </thead>
        <tbody>
          {studentCounts.map(([count, course], index) => (
            <tr key={index}>
              <td>{count}</td>
              <td>{course}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default Count;
