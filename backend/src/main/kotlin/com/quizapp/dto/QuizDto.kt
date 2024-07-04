package com.quizapp.dto

data class QuizDto(
    val title: String,
    val fullDescription: String,
    val questions: List<QuestionDto>
)