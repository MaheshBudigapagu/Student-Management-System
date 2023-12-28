import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

export default function CourseList() {

    const [courses,setCourses] = useState([]);

    useEffect(()=>{
        loadCourses();
    },[]);

    const loadCourses=async()=>{
        const result =await axios.get("http://localhost:8081/getallCourses");
        setCourses(result.data);
    }

     const deleteCourse = async (courseId) => {
         console.log("Deleting course with ID:", courseId);
         try {
           await axios.delete(`http://localhost:8081/deleteCourse/${courseId}`);
           console.log("Course deleted successfully");
           loadCourses();
         } catch (error) {
           console.error("Error deleting course:", error.response);
        }
       };
      
      

    return (
        <div className='container'>
            <h2 className='text-center'>Course List</h2>
            <div className='text-start'>
            <Link className='btn btn-outline-success my-2' to="/addcourse">Add Course</Link>
            </div>
           <div className='text-end'><Link className='btn btn-outline-info my-2' to='/'>Back</Link>  </div>
            <div className='row'>
                <table className="table table-striped border shadow">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Id</th>
                            <th scope="col">Course Name</th>
                            <th scope='col'>Course Duration</th>
                            <th scope='col'>Course Fees</th>
                            <th scope='col'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            courses.map((course,index)=>(
                            <tr>
                            <th scope="row" key={index}>{index+1}</th>
                            <td>{course.courseId}</td>
                            <td>{course.courseName}</td>
                            <td>{course.duration}</td>
                            <td>{course.courseFee}</td>

                             <td>
                            <Link className='btn btn-primary mx-2' to={`/editcourse/${course.courseId}`}>Edit</Link>
                                <button className='btn btn-danger '
                                onClick={() => deleteCourse(course.courseId)}
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
