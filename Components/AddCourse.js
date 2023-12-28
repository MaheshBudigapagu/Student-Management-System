import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AddCourse() {
    let navigate = useNavigate();

    const [course, setCourse] = useState({
        courseName: '',
        duration: '',
        courseFee: ''
    });

    const [errors, setErrors] = useState({
        courseName: '',
        duration: '',
        courseFee: ''
    });

    const validateForm = () => {
        let isValid = true;
        const updatedErrors = {
            courseName: '',
            duration: '',
            courseFee: ''
        };

        if (!course.courseName) {
            updatedErrors.courseName = 'Course Name is required.';
            isValid = false;
        }

        if (!course.duration) {
            updatedErrors.duration = 'Duration is required.';
            isValid = false;
        }

        if (!course.courseFee) {
            updatedErrors.courseFee = 'Course Fee is required.';
            isValid = false;
        }

        setErrors(updatedErrors);
        return isValid;
    };

    const onInputChange = (e) => {
        setCourse({ ...course, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log(course);
            axios.post('http://localhost:8081/addCourse', course);
            navigate('/courselist');
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Add Course</h2>

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
                            {errors.courseName && <div className="text-danger">{errors.courseName}</div>}
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
                            {errors.duration && <div className="text-danger">{errors.duration}</div>}
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
                            {errors.courseFee && <div className="text-danger">{errors.courseFee}</div>}
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
