package com.quizapp.service

import com.quizapp.dto.*
import com.quizapp.entity.Question
import com.quizapp.entity.Quiz
import com.quizapp.mapper.QuizMapper
import com.quizapp.repository.QuestionRepository
import com.quizapp.repository.QuizRepository
import jakarta.persistence.EntityNotFoundException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class QuizService(
    @Autowired val quizRepository: QuizRepository,
    @Autowired val questionRepository: QuestionRepository
) {

    @Transactional(readOnly = true)
    fun getAllQuizzes(): List<Quiz> {
        return quizRepository.findAll()
    }

    @Transactional(readOnly = true)
    fun getQuizById(quizId: Long): Quiz {
        return quizRepository.findById(quizId)
            .orElseThrow { EntityNotFoundException("Quiz with id $quizId not found") }
    }

    @Transactional(readOnly = false)
    fun gradeQuiz(quizId: Long, userAnswers: List<AnswerDto>): List<QuizResultsDto> {
        val quiz: Quiz = quizRepository.findById(quizId)
            .orElseThrow { EntityNotFoundException("Quiz with id $quizId not found") }

        val quizResults = mutableListOf<QuizResultsDto>()

        quiz.questions.forEach { question ->
            val userAnswerDto = userAnswers.find { it.questionId == question.id }
            val correctAnswer = question.answer

            val result = if (userAnswerDto != null && userAnswerDto.content == correctAnswer) {
                "Correct"
            } else {
                "Incorrect"
            }

            val quizResultDto = QuizResultsDto(
                questionId = question.id,
                userAnswer = userAnswerDto?.content ?: "Not answered",
                correctAnswer = correctAnswer,
                result = result
            )

            quizResults.add(quizResultDto)
        }

        return quizResults
    }

    @Transactional(readOnly = false)
    fun add(quizDTO: QuizDto): Quiz {
        val quiz = QuizMapper.mapToEntity(quizDTO)
        return quizRepository.save(quiz)
    }

    @Transactional(readOnly = false)
    fun updateQuestion(questionId: Long, questionDto: QuestionDto): Question {
        val question = questionRepository.findById(questionId)
            .orElseThrow { EntityNotFoundException("Question with id $questionId not found") }

        question.content = questionDto.content
        question.answer = questionDto.answer

        return questionRepository.save(question)
    }

    @Transactional(readOnly = false)
    fun deleteQuestion(questionId: Long) {
        val question = questionRepository.findById(questionId)
            .orElseThrow { EntityNotFoundException("Question with id $questionId not found") }

        question.quiz.questions.remove(question)
        questionRepository.delete(question)
    }

    @Transactional(readOnly = false)
    fun deleteQuizById(quizId: Long) {
        val quiz = quizRepository.findById(quizId)
            .orElseThrow { EntityNotFoundException("Quiz with id $quizId not found") }

        quiz.questions.clear()
        quizRepository.delete(quiz)
    }
}