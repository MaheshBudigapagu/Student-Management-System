package com.example.sms.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.sms.entity.Course;
import com.example.sms.entity.Student;
import com.example.sms.exception.CourseNotFoundException;
import com.example.sms.exception.StudentLimitExceededException;
import com.example.sms.exception.StudentNotFoundException;
import com.example.sms.repository.AttendanceRepository;
import com.example.sms.repository.CourseRepository;
import com.example.sms.repository.StudentRepository;

import jakarta.transaction.Transactional;

@Service
public class StudentService {
	Logger logger = LoggerFactory.getLogger(StudentService.class);
	@Autowired
	StudentRepository studentRepository;
	@Autowired
	CourseRepository courseRepository;
	
	@Autowired
	AttendanceRepository attendanceRepository;

	public List<Student> getAllStudents() {
		logger.info("Inside StudentService!! method!! getAllStudents");
		return studentRepository.findAll();
	}

	public Student getStudentById(int studentId) throws StudentNotFoundException {
		logger.info("Inside StudentService!! method!! getStudentById");
		Student student = studentRepository.findById(studentId).orElse(null);
		if (student != null)
			return student;
		else
			throw new StudentNotFoundException("Studedent id Not Found : " + studentId);
	}


	
	    public Student addStudent(Student student) throws CourseNotFoundException, StudentLimitExceededException {
	        logger.info("Inside StudentService!! method addStudent");
	        Course course = courseRepository.findById(student.getCourse().getCourseId()).orElse(null);
	        if (course == null) {
	            throw new CourseNotFoundException("Course id Not Found : " + student.getCourse().getCourseId());
	        } else {
	            int maxStudentLimit = 4; // Set the maximum student limit for a course here
	            int currentStudentCount = studentRepository.countStudentsByCourse(course);
	            if (currentStudentCount > maxStudentLimit) {
	                throw new StudentLimitExceededException("Student limit exceeded for courseId: " + course.getCourseId());
	            }
	            
	            student.setCourse(course);
	            System.out.println("count = "+currentStudentCount);
	            return studentRepository.save(student); 
	        }
	    }

	
	public Student editStudent(Student s, int studentId) throws StudentNotFoundException, CourseNotFoundException {
		logger.info("Inside StudentService!! method!! editStudent");
		Student student = studentRepository.findById(studentId).orElse(null);

		if (student == null) {
			throw new StudentNotFoundException("Student id Not Found : " + studentId);
		}
		
			Course course = courseRepository.findById(student.getCourse().getCourseId()).orElse(null);
			if (course == null) {
				throw new CourseNotFoundException("Course id Not Found : " + student.getCourse().getCourseId());
			} else {
				student.setStudentName(s.getStudentName());
				student.setStudentEmail(s.getStudentEmail());
				student.setCourse(s.getCourse());
				return studentRepository.save(student);
			}

		

	}
	
	@Transactional
    public void deleteStudent(int studentId) throws StudentNotFoundException {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new StudentNotFoundException("Student not found"));

        attendanceRepository.deleteAllByStudent(student);
        studentRepository.delete(student);
    }

	public List<Student> getByName(String studentName) throws StudentNotFoundException {
		logger.info("Inside StudentService!! method!! getByName");
		List<Student> students = studentRepository.findByStudentName(studentName);
		if (students.size() == 0) {
			throw new StudentNotFoundException("Student name not found " + studentName);
		} else {
			return students;
		}
	}

	public List<Object[]> countStudentByCourse() {
		logger.info("Inside StudentService!! method!! countStudentByCourse");
		return studentRepository.countStudentByCourse();
	}

	
	
	

}
