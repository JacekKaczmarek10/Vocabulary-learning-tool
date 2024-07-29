package com.quizapp.controller

import com.quizapp.dto.AnswerDto
import com.quizapp.dto.QuestionDto
import com.quizapp.dto.QuizDto
import com.quizapp.dto.QuizResultsDto
import com.quizapp.entity.Question
import com.quizapp.entity.Quiz
import com.quizapp.service.QuizService
import jakarta.persistence.EntityNotFoundException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/quizzes")
class QuizController @Autowired constructor(private val quizService: QuizService) {

    @PostMapping("/grade/{quizId}")
    fun gradeQuiz(
        @PathVariable quizId: Long,
        @RequestBody userAnswers: List<AnswerDto>
    ): ResponseEntity<List<QuizResultsDto>> {
        return try {
            val quizResults = quizService.gradeQuiz(quizId, userAnswers)
            ResponseEntity.ok(quizResults)
        } catch (e: EntityNotFoundException) {
            ResponseEntity.notFound().build()
        } catch (e: IllegalArgumentException) {
            ResponseEntity.badRequest().build()
        }
    }

    @GetMapping("/{quizId}")
    fun getQuizById(@PathVariable quizId: Long): ResponseEntity<Quiz> {
        return try {
            val quiz = quizService.getQuizById(quizId)
            ResponseEntity.ok(quiz)
        } catch (e: EntityNotFoundException) {
            ResponseEntity.notFound().build()
        }
    }

    @GetMapping
    fun getAllQuizzes(): ResponseEntity<List<Quiz>> {
        val quizzes = quizService.getAllQuizzes()
        return ResponseEntity.ok(quizzes)
    }

    @PostMapping
    fun addQuiz(@RequestBody quizDto: QuizDto): ResponseEntity<Quiz> {
        return try {
            val createdQuiz = quizService.add(quizDto)
            ResponseEntity.status(HttpStatus.CREATED).body(createdQuiz)
        } catch (e: IllegalArgumentException) {
            ResponseEntity.badRequest().build()
        }
    }

    @PutMapping("/{quizId}/questions/{questionId}")
    fun updateQuestion(
        @PathVariable quizId: Long,
        @PathVariable questionId: Long,
        @RequestBody questionDto: QuestionDto
    ): ResponseEntity<Question> {
        return try {
            val updatedQuestion = quizService.updateQuestion(questionId, questionDto)
            ResponseEntity.ok(updatedQuestion)
        } catch (e: EntityNotFoundException) {
            ResponseEntity.notFound().build()
        }
    }

    @DeleteMapping("/{quizId}/questions/{questionId}")
    fun deleteQuestion(
        @PathVariable quizId: Long,
        @PathVariable questionId: Long
    ): ResponseEntity<Unit> {
        return try {
            quizService.deleteQuestion(questionId)
            ResponseEntity.noContent().build()
        } catch (e: EntityNotFoundException) {
            ResponseEntity.notFound().build()
        }
    }

    @DeleteMapping("/{quizId}")
    fun deleteQuiz(@PathVariable quizId: Long): ResponseEntity<Unit> {
        return try {
            quizService.deleteQuizById(quizId)
            ResponseEntity.noContent().build()
        } catch (e: EntityNotFoundException) {
            ResponseEntity.notFound().build()
        }
    }
}