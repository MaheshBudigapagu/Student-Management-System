package com.example.sms.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.sms.entity.Course;
import com.example.sms.entity.Student;

@Repository
public interface StudentRepository extends JpaRepository<Student, Integer> {


	@Query("select count(s.studentId),s.course.courseName from Student s group by s.course.courseName")
	List<Object[]> countStudentByCourse();

	public List<Student> findByStudentName(String studentName);

	int countStudentsByCourse(Course course);

}