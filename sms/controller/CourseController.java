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

import com.example.sms.entity.Course;
import com.example.sms.exception.CourseNotFoundException;
import com.example.sms.service.CourseSevice;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class CourseController {

	Logger logger = LoggerFactory.getLogger(CourseController.class);

	@Autowired
	CourseSevice courseService;

	// ADD COURSE
	@PostMapping(value = "/addCourse")
	public ResponseEntity<Course> addCourse(@RequestBody Course course) {
		logger.info("Inside CourseController!! method!! addCourse");
		return new ResponseEntity<>(courseService.addCourse(course), HttpStatus.CREATED);
	}

	// GET ALL COURSES
	@GetMapping(value = "/getallCourses")
	public ResponseEntity<List<Course>> getAllCourses() {
		logger.info("Inside CourseController!! method!! getAllCourses");
		return ResponseEntity.ok(courseService.getAllCourses());
	}

	// GET COURSE BY ID
	@GetMapping(value = "/getCourseById/{id}")
	public ResponseEntity<Course> getCourseById(@PathVariable("id") int courseId) throws CourseNotFoundException {
		logger.info("Inside CourseController!! method!!  getCourseById");
		return ResponseEntity.ok(courseService.getCourseById(courseId));
	}

	// EDIT COURSE
	@PutMapping(value = "/editCourse/{id}")
	public ResponseEntity<Course> editCourse(@RequestBody Course c, @PathVariable("id") int courseId)
			throws CourseNotFoundException {
		logger.info("Inside CourseController!! method!! editCourse");
		return ResponseEntity.ok(courseService.editCourse(c, courseId));
	}

	 //DELETE COURSE
	@DeleteMapping(value = "/deleteCourse/{id}")
	public String deleteCourse(@PathVariable("id") int courseId) throws CourseNotFoundException {
		logger.info("Inside CourseController!! method!! deleteCourse");
		courseService.deleteCourse(courseId);
		return "Course deleted successfully";
	}

	// GET COURSE BY NAME
	@GetMapping(value = "/getCourseByName/{Name}")
	public Course getCourseByName(@PathVariable("Name") String courseName) throws CourseNotFoundException {
		logger.info("Inside CourseController!! method!! getCourseByName");
		return courseService.getCourseByName(courseName);
	}

}
