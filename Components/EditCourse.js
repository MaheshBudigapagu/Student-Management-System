import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function EditCourse() {
  let navigate = useNavigate();
  const { courseId } = useParams();

  const [course, setCourse] = useState({
    courseName: '',
    duration: '',
    courseFee: '',
  });

  useEffect(() => {
    axios.get(`http://localhost:8081/getCourseById/${courseId}`).then((res) => {
      setCourse(res.data);
    });
  }, [courseId]);

  const onInputChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(course);
    axios.put(`http://localhost:8081/editCourse/${courseId}`, course);
    navigate('/courselist');
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit Course</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div>
              <label htmlFor="courseName" className="form-label">
                Course Name
              </label>
              <input
                type="text"
                id="courseName"
                name="courseName"
                className="form-control"
                placeholder="Enter Course Name"
                value={course.courseName}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div>
              <label htmlFor="duration" className="form-label">
                Duration
              </label>
              <input
                type="text"
                name="duration"
                className="form-control"
                placeholder="duration"
                value={course.duration}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div>
              <label htmlFor="fee" className="form-label">
                Fee
              </label>
              <input
                type="text"
                name="courseFee"
                className="form-control"
                placeholder="Enter the fee Rs."
                value={course.courseFee}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <br />
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link to="/courselist" className="btn btn-outline-danger mx-2">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
