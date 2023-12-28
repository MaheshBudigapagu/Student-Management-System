import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';

export default function EditStudent() {

    const navigate = useNavigate();
    const { id } = useParams();

    const [student, setStudent] = useState({
        studentName: "",
        studentEmail: "",
        course: {
            courseId: ""
        }
    });
   
    const { studentName, studentEmail, course } = student;
    const { courseId } = course;

    useEffect(() => {
        loadStudent();
    }, []);

    // const onInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setStudent((prevStudent) => ({
    //         ...prevStudent,
    //         [name]: value,
    //         course: {
    //             ...prevStudent.course, 
    //             courseId: value,
    //         },
    //     }));
    // };
    const onInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'courseId') {
          setStudent((prevStudent) => ({
            ...prevStudent,
            course: {
              ...prevStudent.course,
              courseId: value,
            },
          }));
        } else {
          setStudent((prevStudent) => ({
            ...prevStudent,
            [name]: value,
          }));
        }
      };
      
   
    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(student);
        try {
            await axios.put(`http://localhost:8081/editstudent/${id}`, student);
            navigate("/studentlist");
        } catch (error) {
            console.error("Error updating student:", error.response);
        }
    };
    
    const loadStudent = async () => {
        const result = await axios.get(`http://localhost:8081/getstudentbyid/${id}`);
        setStudent(result.data);
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Edit Student</h2>

                    <form onSubmit={onSubmit}>
                        <div>
                            <label htmlFor="studentName" className='form-label'>
                                Student Name
                            </label>
                            <input
                                type="text"
                                name="studentName"
                                className='form-control'
                                placeholder='Enter Student Name'
                                value={studentName}
                                onChange={onInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="studentEmail" className='form-label'>
                                Email
                            </label>
                            <input
                                type="text"
                                name="studentEmail"
                                className='form-control'
                                placeholder='ex.user@gmail.com'
                                value={studentEmail}
                                onChange={onInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="courseId" className='form-label'>Course Id</label>
                            <input
                                type="text"
                                name="courseId"
                                className='form-control'
                                placeholder='Enter Course Id'
                                value={student.course.courseId}
                                onChange={onInputChange}
                            />
                        </div>
                        <br />
                        <button type='submit' className='btn btn-outline-primary'>Submit</button>
                        <Link to='/studentlist' className='btn btn-outline-danger mx-2'>Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    );
}