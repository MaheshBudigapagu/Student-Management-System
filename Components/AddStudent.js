import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function AddStudent() {
  let navigate = useNavigate();

  const [student, setStudent] = useState({
    studentName: '',
    studentEmail: '',
    courseId: '',
  });

  const [errors, setErrors] = useState({
    studentName: '',
    studentEmail: '',
    courseId: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const { studentName, studentEmail, courseId } = student;

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const updatedErrors = {
      studentName: '',
      studentEmail: '',
      courseId: '',
    };

    if (!studentName) {
      updatedErrors.studentName = 'Student Name is required.';
      isValid = false;
    }

    if (!studentEmail) {
      updatedErrors.studentEmail = 'Email is required.';
      isValid = false;
    } else if (!validateEmail(studentEmail)) {
      updatedErrors.studentEmail = 'Invalid email format.';
      isValid = false;
    }

    if (!courseId) {
      updatedErrors.courseId = 'Course ID is required.';
      isValid = false;
    }

    setErrors(updatedErrors);
    return isValid;
  };

  const validateEmail = (email) => {
    // Simple email validation using regular expression
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log(student);
      const st = {
        studentName: student.studentName,
        studentEmail: student.studentEmail,
        course: {
          courseId: student.courseId,
        },
      };
      console.log(st);

      try {
        const response = await axios.post('http://localhost:8081/addStudent', st);
        if (response.status === 201) {
          navigate('/studentlist');
        }
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          const errorMessage = error.response.data.message;
          if (errorMessage.startsWith('Student limit exceeded for courseId')) {
            setErrorMessage('Student limit exceeded for this course');
          } else {
            setErrorMessage(`Error adding student: ${errorMessage}`);
          }
        } else {
          setErrorMessage('Error adding student');
        }
      }
    }
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
          <h2 className='text-center m-4'>Register Student</h2>

          {errorMessage && (
            <div className='alert alert-danger' role='alert'>
              {errorMessage}
            </div>
          )}

          <form onSubmit={onSubmit}>
            <div>
              <label htmlFor='name' className='form-label'>
                Student Name
              </label>
              <input
                type='text'
                id='name'
                name='studentName'
                className={`form-control ${errors.studentName ? 'is-invalid' : ''}`}
                placeholder='Enter Student Name'
                value={studentName}
                onChange={onInputChange}
              />
              {errors.studentName && <div className="invalid-feedback">{errors.studentName}</div>}
            </div>
            <div>
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="text"
                name="studentEmail"
                className={`form-control ${errors.studentEmail ? 'is-invalid' : ''}`}
                placeholder="ex.user@gmail.com"
                value={studentEmail}
                onChange={onInputChange}
              />
              {errors.studentEmail && <div className="invalid-feedback">{errors.studentEmail}</div>}
            </div>
            <div>
              <label htmlFor="courseId" className="form-label">
                Course Id
              </label>
              <input
                type="text"
                name="courseId"
                className={`form-control ${errors.courseId ? 'is-invalid' : ''}`}
                placeholder="Enter Course Id"
                value={courseId}
                onChange={onInputChange}
              />
              {errors.courseId && <div className="invalid-feedback">{errors.courseId}</div>}
            </div>
            <br />
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link to="/studentlist" className="btn btn-outline-danger mx-2">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

