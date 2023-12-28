package com.example.sms.service;

import java.time.LocalDate;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.sms.entity.Attendance;
import com.example.sms.entity.Student;
import com.example.sms.exception.StudentNotFoundException;
import com.example.sms.repository.AttendanceRepository;
import com.example.sms.repository.StudentRepository;

@Service
public class AttendanceService {
	
	Logger logger = LoggerFactory.getLogger(AttendanceService.class);

	@Autowired
	AttendanceRepository attendanceRepository;
	
	@Autowired
	StudentService studentService;

	@Autowired
	StudentRepository studentRepository;

	public Attendance markAttendance(int studentId) throws StudentNotFoundException {
		logger.info("Inside AttendanceService!! method!! markAttendance");

		Student student1 = studentService.getStudentById(studentId);
		if (student1 == null) {
			throw new StudentNotFoundException("Student Id not found :" + studentId);
		} 
		else 
		{

			LocalDate date = LocalDate.now();
			Attendance attendance = new Attendance(student1, date);
			return attendanceRepository.save(attendance);
		}
	}

	public List<Attendance> getAttendance() {
		logger.info("Inside AttendanceService!! method!! getAttendance");
		return attendanceRepository.findAll();

	}
	
	public List<Attendance> getAttendanceByStudentId(int studentId) throws StudentNotFoundException {
		Student student = studentRepository.findById(studentId).orElse(null);
		if(student != null)
        return attendanceRepository.findByStudentStudentId(studentId);
		else
			throw new StudentNotFoundException("student Id Not found: "+studentId);
    }


}
