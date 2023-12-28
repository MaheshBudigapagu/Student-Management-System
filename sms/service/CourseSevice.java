package com.example.sms.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.sms.entity.Course;
import com.example.sms.exception.CourseNotFoundException;
import com.example.sms.repository.CourseRepository;

@Service
public class CourseSevice {

	Logger logger = LoggerFactory.getLogger(CourseSevice.class);
	@Autowired
	CourseRepository courseRepository;

	public Course addCourse(Course course) {
		logger.info("In CourseService!! method!! addCourse");
		return courseRepository.save(course);
	}

	public List<Course> getAllCourses() {
		logger.info("In CourseService!! method!! getAllCourses");
		return courseRepository.findAll();
	}

	public Course getCourseById(int courseId) throws CourseNotFoundException {
		logger.info("In CourseService!! method!! getCourseById");
		Course course = courseRepository.findById(courseId).orElse(null);
		if (course != null)
			return course;
		else
			throw new CourseNotFoundException("Course id not Found : " + courseId);
	}

	public Course editCourse(Course c, int courseId) throws CourseNotFoundException {
		logger.info("In CourseService!! method!! editCourse");
		Course course = courseRepository.findById(courseId).orElse(null);
		if (course == null) {
			throw new CourseNotFoundException("Course id not Found :" + courseId);
		} else {
			course.setCourseName(c.getCourseName());
			course.setDuration(c.getDuration());
			course.setCourseFee(c.getCourseFee());

			return courseRepository.save(course);
		}
	}

	public Course getCourseByName(String courseName) throws CourseNotFoundException {
		logger.info("In CourseService!! method!! getCourseByName");
		Course course = courseRepository.findByCourseName(courseName);
		if (course == null) {
			throw new CourseNotFoundException("Course name not found: " + courseName);
		} else {
			return courseRepository.findByCourseName(courseName);
		}
	}

	public void deleteCourse(int courseId) throws CourseNotFoundException {
		logger.info("In CourseService!! method!! deleteCourse");
		Course course = courseRepository.findById(courseId).orElse(null);
		if(course == null) {
			throw new CourseNotFoundException("Course id not found :" +courseId);
		}
		courseRepository.deleteById(courseId);
		
	}
}
