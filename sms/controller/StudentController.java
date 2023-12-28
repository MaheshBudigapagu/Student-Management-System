package com.example.sms.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.sms.entity.Student;
import com.example.sms.exception.CourseNotFoundException;
import com.example.sms.exception.StudentLimitExceededException;
import com.example.sms.exception.StudentNotFoundException;
import com.example.sms.service.StudentService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class StudentController {
	
	Logger logger = LoggerFactory.getLogger(StudentController.class);
	
	@Autowired
	StudentService studentService;

	@PostMapping(value = "/addStudent")
	public ResponseEntity<Student> addStudent(@RequestBody Student student) throws CourseNotFoundException, StudentLimitExceededException {
		logger.info("Inside StudentController!! AddStudent method");
		return new ResponseEntity<>(studentService.addStudent(student), HttpStatus.CREATED);
	}

	@GetMapping(value = "/getAllStudents")
	public ResponseEntity<List<Student>> getAllStudents() {
		logger.info("Inside StudentController!! method!! getAllStudents");
		return ResponseEntity.ok(studentService.getAllStudents());
	}

	@GetMapping(value = "/getstudentbyid/{id}")
	public ResponseEntity<Student> getStudentById(@PathVariable("id") int studentId) throws StudentNotFoundException {
		logger.info("Inside StudentController!! method!! getStudentById");
		return ResponseEntity.ok(studentService.getStudentById(studentId));
	}

	@PutMapping(value = "/editstudent/{id}")
	public ResponseEntity<Student> editStudent(@RequestBody Student s, @PathVariable("id") int studentId)
			throws StudentNotFoundException, CourseNotFoundException {
		logger.info("Inside StudentController!! method!! editStudent");
		return new ResponseEntity<>(studentService.editStudent(s, studentId), HttpStatus.CREATED);
	}

	@DeleteMapping(value = "/deleteStudent/{id}")
	public String deleteStudent(@PathVariable("id") int studentId) throws StudentNotFoundException {
		logger.info("Inside StudentController!! method!! deleteStudent");
		studentService.deleteStudent(studentId);
		return "Student deleted successfully";
	}

	@GetMapping(value = "/getStudentByName/{name}")
	public List<Student> getByName(@PathVariable("name") String studentName) throws StudentNotFoundException {
		logger.info("Inside StudentController!! method!! getByName");
		return studentService.getByName(studentName);
	}
	
	@GetMapping(value = "/countStudentByCourse")
	public List<Object[]> countStudentByCourse(){
		logger.info("Inside StudentController!! method!! countStudentByCourse");
		return studentService.countStudentByCourse();
	}
	

}
