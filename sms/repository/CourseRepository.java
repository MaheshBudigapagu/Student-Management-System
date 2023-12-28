package com.example.sms.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.sms.entity.Course;

@Repository
public interface CourseRepository extends JpaRepository<Course, Integer>{


	Course findByCourseName(String courseName);



}
