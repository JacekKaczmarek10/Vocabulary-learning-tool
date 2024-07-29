package com.quizapp.controller

import com.quizapp.dto.AnswerDto
import com.quizapp.dto.QuestionDto
import com.quizapp.service.QuestionService
import jakarta.persistence.EntityNotFoundException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/questions")
class QuestionController @Autowired constructor(
    private val questionService: QuestionService
) {

    @PostMapping("/quiz/{quizId}")
    fun addQuestionToQuiz(
        @PathVariable quizId: Long,
        @RequestBody questionDto: QuestionDto
    ): ResponseEntity<*> {
        return try {
            val question = questionService.addQuestionToQuiz(quizId, questionDto)
            ResponseEntity(question, HttpStatus.CREATED)
        } catch (e: EntityNotFoundException) {
            ResponseEntity.status(HttpStatus.NOT_FOUND).body("Quiz with id $quizId not found")
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add question to quiz")
        }
    }

    @PutMapping("/{questionId}")
    fun updateQuestion(
        @PathVariable questionId: Long,
        @RequestBody questionDto: QuestionDto
    ): ResponseEntity<*> {
        return try {
            val updatedQuestion = questionService.updateQuestion(questionId, questionDto)
            ResponseEntity(updatedQuestion, HttpStatus.OK)
        } catch (e: EntityNotFoundException) {
            ResponseEntity.status(HttpStatus.NOT_FOUND).body("Question with id $questionId not found")
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update question")
        }
    }

    @DeleteMapping("/{questionId}")
    fun deleteQuestion(@PathVariable questionId: Long): ResponseEntity<*> {
        return try {
            questionService.deleteQuestion(questionId)
            ResponseEntity.noContent().build<Unit>()
        } catch (e: EntityNotFoundException) {
            ResponseEntity.status(HttpStatus.NOT_FOUND).body("Question with id $questionId not found")
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete question")
        }
    }

    @PutMapping("/{questionId}/answer")
    fun updateAnswer(
        @PathVariable questionId: Long,
        @RequestBody answerDto: AnswerDto
    ): ResponseEntity<*> {
        return try {
            val updatedAnswer = questionService.updateAnswer(questionId, answerDto)
            ResponseEntity(updatedAnswer, HttpStatus.OK)
        } catch (e: EntityNotFoundException) {
            ResponseEntity.status(HttpStatus.NOT_FOUND).body("Question with id $questionId not found")
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update answer")
        }
    }

    @GetMapping("/quiz/{quizId}")
    fun getAllQuestionsByQuizId(@PathVariable quizId: Long): ResponseEntity<*> {
        return try {
            val questions = questionService.getAllQuestionsByQuizId(quizId)
            ResponseEntity(questions, HttpStatus.OK)
        } catch (e: EntityNotFoundException) {
            ResponseEntity.status(HttpStatus.NOT_FOUND).body("Quiz with id $quizId not found")
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to retrieve questions for quiz")
        }
    }
}