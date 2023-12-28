import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link} from 'react-router-dom';

export default function StudentList() {

    const [students,setStudents] = useState([]);

    useEffect(()=>{
        loadStudents();
    },[]);

    const loadStudents=async()=>{
        const result =await axios.get("http://localhost:8081/getAllStudents");
        setStudents(result.data);
    }

    const deleteStudent = async (studentId) => {
        console.log("Deleting student with ID:", studentId);
        try {
          await axios.delete(`http://localhost:8081/deleteStudent/${studentId}`);
          console.log("Student deleted successfully");
          loadStudents();
        } catch (error) {
          console.error("Error deleting student:", error.response);
        }
      };
      
      

    return (
        <div className='container'>
            <h2 className='text-center'>Students List</h2>
            <div className='text-start'>
            <Link className='btn btn-outline-success my-2' to="/add-student">Register Student</Link>
            </div>
           <div className='text-end'><Link className='btn btn-outline-info my-2' to='/'>Back</Link>  </div>
            <div className='row'>
                <table className="table table-striped border shadow">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope='col'>Action</th>
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

                            <td>
                            <Link className='btn btn-primary mx-2' to={`/editstudent/${student.studentId}`}>Edit</Link>
                                <button className='btn btn-danger '
                                onClick={() => deleteStudent(student.studentId)}
                                >Delete</button>
                            </td>
                        </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
