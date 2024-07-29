package com.quizapp.service

import com.quizapp.dto.AnswerDto
import com.quizapp.dto.QuestionDto
import com.quizapp.entity.Question
import com.quizapp.repository.QuestionRepository
import com.quizapp.repository.QuizRepository
import jakarta.persistence.EntityNotFoundException
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class QuestionService(
    private val questionRepository: QuestionRepository,
    private val quizRepository: QuizRepository
) {

    @Transactional
    fun updateAnswer(questionId: Long, answerDto: AnswerDto): Question {
        val question = questionRepository.findById(questionId)
            .orElseThrow { EntityNotFoundException("Question with id $questionId not found") }

        question.answer = answerDto.content
        return questionRepository.save(question)
    }

    @Transactional
    fun addQuestionToQuiz(quizId: Long, questionDto: QuestionDto): Question {
        val quiz = quizRepository.findById(quizId)
            .orElseThrow { EntityNotFoundException("Quiz with id $quizId not found") }

        val question = Question(
            content = questionDto.content,
            answer = questionDto.answer,
            quiz = quiz
        )

        quiz.questions.add(question)
        return questionRepository.save(question)
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

    @Transactional(readOnly = true)
    fun getAllQuestionsByQuizId(quizId: Long): List<Question> {
        val quiz = quizRepository.findById(quizId)
            .orElseThrow { EntityNotFoundException("Quiz with id $quizId not found") }

        return quiz.questions
    }
}