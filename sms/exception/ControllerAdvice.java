package com.example.sms.exception;

import java.util.HashMap;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import com.example.sms.pojo.ErrorResponse;

@org.springframework.web.bind.annotation.ControllerAdvice
public class ControllerAdvice {
	
	@ExceptionHandler(StudentNotFoundException.class)
	public ResponseEntity<ErrorResponse> handleStudentNotFoundException(StudentNotFoundException e,WebRequest request){
		ErrorResponse response = new ErrorResponse("400",e.getMessage(), new HashMap<>());
		return new ResponseEntity<ErrorResponse>(response,HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(CourseNotFoundException.class)
	public ResponseEntity<ErrorResponse> handleCourseNotFoundException(CourseNotFoundException e,WebRequest request){
		ErrorResponse response = new ErrorResponse("400",e.getMessage(),new HashMap<>());
		return new ResponseEntity<ErrorResponse>(response,HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(StudentLimitExceededException.class)
	public ResponseEntity<ErrorResponse> handleStudentLimitExceededException(StudentLimitExceededException e, WebRequest request){
		ErrorResponse response = new ErrorResponse("400",e.getMessage(),new HashMap<>());
		return new ResponseEntity<ErrorResponse>(response,HttpStatus.BAD_REQUEST);
	}
	
	
}

