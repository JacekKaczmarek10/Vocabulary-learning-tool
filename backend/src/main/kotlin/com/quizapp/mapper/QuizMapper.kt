package com.quizapp.mapper

import com.quizapp.dto.QuizDto
import com.quizapp.entity.Quiz

object QuizMapper {

    fun mapToEntity(quizDTO: QuizDto): Quiz {
        val quiz = Quiz(
            title = quizDTO.title,
            fullDescription = quizDTO.fullDescription,
            questions = mutableListOf()
        )
        quizDTO.questions.forEach { questionDto ->
            val question = QuestionMapper.mapToEntity(questionDto, quiz)
            quiz.questions.add(question)
        }
        return quiz
    }
}