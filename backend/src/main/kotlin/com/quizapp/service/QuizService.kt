package com.quizapp.service

import com.quizapp.dto.AnswerDto
import com.quizapp.dto.QuestionDto
import com.quizapp.dto.QuizDto
import com.quizapp.dto.QuizResultsDto
import com.quizapp.entity.Question
import com.quizapp.entity.Quiz
import com.quizapp.mapper.QuizMapper
import com.quizapp.repository.QuestionRepository
import com.quizapp.repository.QuizRepository
import jakarta.persistence.EntityNotFoundException
import lombok.extern.slf4j.Slf4j
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.slf4j.Logger

@Slf4j
@Service
class QuizService(
    @Autowired val quizRepository: QuizRepository,
    @Autowired val questionRepository: QuestionRepository,
    @Autowired val log: Logger
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

    @Transactional
    fun gradeQuiz(quizId: Long, userAnswers: List<AnswerDto>): List<QuizResultsDto> {
        val quiz: Quiz = quizRepository.findById(quizId)
            .orElseThrow { EntityNotFoundException("Quiz with id $quizId not found") }

        val quizResults = quiz.questions.map { question ->
            val userAnswerDto = userAnswers.find { it.questionId == question.id }
            log.info("User answer: $userAnswerDto")
            val correctAnswer = question.answer

            val result = if (userAnswerDto != null && userAnswerDto.content == correctAnswer) {
                "Correct"
            } else {
                "Incorrect"
            }

            QuizResultsDto(
                questionId = question.id,
                userAnswer = userAnswerDto?.content ?: "Not answered",
                correctAnswer = correctAnswer,
                result = result
            )
        }

        return quizResults
    }

    @Transactional
    fun add(quizDTO: QuizDto): Quiz {
        val quiz = QuizMapper.mapToEntity(quizDTO)
        return quizRepository.save(quiz)
    }

    @Transactional
    fun updateQuestion(questionId: Long, questionDto: QuestionDto): Question {
        val question = questionRepository.findById(questionId)
            .orElseThrow { EntityNotFoundException("Question with id $questionId not found") }

        question.content = questionDto.content
        question.answer = questionDto.answer

        return questionRepository.save(question)
    }

    @Transactional
    fun deleteQuestion(questionId: Long) {
        val question = questionRepository.findById(questionId)
            .orElseThrow { EntityNotFoundException("Question with id $questionId not found") }

        question.quiz.questions.remove(question)
        questionRepository.delete(question)
    }

    @Transactional
    fun deleteQuizById(quizId: Long) {
        val quiz = quizRepository.findById(quizId)
            .orElseThrow { EntityNotFoundException("Quiz with id $quizId not found") }

        quiz.questions.clear()
        quizRepository.delete(quiz)
    }
}