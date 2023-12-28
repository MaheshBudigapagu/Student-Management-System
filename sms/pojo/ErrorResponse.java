package com.example.sms.pojo;


import java.util.Map;

public class ErrorResponse {

	String code;
	String message;
	Map<String, String> map;

	public ErrorResponse() {
		super();
	}

	public ErrorResponse(String code, String message, Map<String, String> map) {
		super();
		this.code = code;
		this.message = message;
		this.map = map;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Map<String, String> getMap() {
		return map;
	}

	public void setMap(Map<String, String> map) {
		this.map = map;
	}

}
