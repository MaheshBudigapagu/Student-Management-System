package com.example.sms.controller;

import java.util.List;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.sms.entity.Attendance;

import com.example.sms.exception.StudentNotFoundException;
import com.example.sms.service.AttendanceService;



@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class AttendanceController {
	
	Logger logger = LoggerFactory.getLogger(AttendanceController.class);

	@Autowired
	AttendanceService attendanceService;
	

	@PostMapping("/mark/{studentId}")
	public Attendance markAttendance(@PathVariable int studentId) throws StudentNotFoundException {
		logger.info("Inside AttendanceController!! method!! markAttendance");
		return attendanceService.markAttendance(studentId);

	}

	@GetMapping(value = "/getattendance")
	public List<Attendance> getAttendance() {
		logger.info("Inside AttendanceController!! method!! getAttendance");
		return attendanceService.getAttendance();
	}
	
	 @GetMapping("/student/{studentId}")
	    public List<Attendance> getAttendanceByStudentId(@PathVariable int studentId) throws StudentNotFoundException {
	        return attendanceService.getAttendanceByStudentId(studentId);
	    }
}
