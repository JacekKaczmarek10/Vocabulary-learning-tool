package com.quizapp.repository;

import com.quizapp.entity.Answer
import org.springframework.data.jpa.repository.JpaRepository

interface AnswerRepository : JpaRepository<Answer, Long>
