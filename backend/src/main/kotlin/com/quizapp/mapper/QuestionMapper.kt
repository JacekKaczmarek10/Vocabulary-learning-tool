package com.quizapp.mapper

import com.quizapp.dto.QuestionDto
import com.quizapp.entity.Question
import com.quizapp.entity.Quiz

object QuestionMapper {

    fun mapToEntity(questionDto: QuestionDto, quiz: Quiz): Question {
        return Question(
            content = questionDto.content,
            answer = questionDto.answer,
            quiz = quiz
        )
    }
}
