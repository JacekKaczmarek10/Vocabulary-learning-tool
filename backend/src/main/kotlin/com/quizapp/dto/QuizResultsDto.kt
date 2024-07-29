package com.quizapp.dto;

data class QuizResultsDto(
    val questionId: Long,
    val userAnswer: String,
    val correctAnswer: String,
    val result: String
)
