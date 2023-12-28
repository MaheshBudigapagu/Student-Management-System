package com.example.sms.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.sms.entity.Attendance;
import com.example.sms.entity.Student;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Integer>{

	void deleteAllByStudent(Student student);

	List<Attendance> findByStudentStudentId(int studentId);

}
