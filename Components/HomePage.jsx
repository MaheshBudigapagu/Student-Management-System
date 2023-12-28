import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function HomePage() {
  const [students,setStudents] = useState([]);

  useEffect(()=>{
      loadStudents();
  },[]);

  const loadStudents=async()=>{
      const result =await axios.get("http://localhost:8081/getAllStudents");
      setStudents(result.data);
  }

  return (
      <div className='container'>
          <h2 className='text-center text-info my-2'>List</h2>
          <div className='row'>
              <table className="table table-striped border shadow my-2">
                  <thead>
                      <tr>
                          <th scope="col">#</th>
                          <th scope="col">Id</th>
                          <th scope="col">Name</th>
                          <th scope="col">Email</th>
                          <th scope="col">Course Id</th>
                          <th scope="col">Course Name</th>
                          <th scope='col'>Course Duration</th>
                          <th scope='col'>Course Fees</th>
                      </tr>
                  </thead>
                  <tbody>
                      {
                          students.map((student,index)=>(
                          <tr>
                          <th scope="row" key={index}>{index+1}</th>
                          <td>{student.studentId}</td>
                          <td>{student.studentName}</td>
                          <td>{student.studentEmail}</td>
                          <td>{student.course.courseId}</td>
                          <td>{student.course.courseName}</td>
                          <td>{student.course.duration}</td>
                          <td>{student.course.courseFee}</td>
                      </tr>
                      ))
                  }
                  </tbody>
              </table>
          </div>
      </div>
  )
}
