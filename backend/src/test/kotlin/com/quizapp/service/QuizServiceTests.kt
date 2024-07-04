package com.quizapp.service

import com.quizapp.dto.AnswerDto
import com.quizapp.dto.QuestionDto
import com.quizapp.dto.QuizDto
import com.quizapp.entity.Question
import com.quizapp.entity.Quiz
import com.quizapp.mapper.QuizMapper
import com.quizapp.repository.QuestionRepository
import com.quizapp.repository.QuizRepository
import jakarta.persistence.EntityNotFoundException
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertThrows
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.mockito.ArgumentMatchers.any
import org.mockito.InjectMocks
import org.mockito.Mock
import org.mockito.Mockito.`when`
import org.mockito.Mockito.verify
import org.mockito.MockitoAnnotations
import java.util.*

class QuizServiceTests {

    @Mock
    lateinit var quizRepository: QuizRepository

    @Mock
    lateinit var questionRepository: QuestionRepository

    @InjectMocks
    lateinit var quizService: QuizService

    @BeforeEach
    fun setUp() {
        MockitoAnnotations.openMocks(this)
    }

    @Test
    fun testGetAllQuizzes() {
        val quizzes = listOf(
            Quiz(id = 1L, title = "Quiz 1", questions = mutableListOf()),
            Quiz(id = 2L, title = "Quiz 2", questions = mutableListOf())
        )
        `when`(quizRepository.findAll()).thenReturn(quizzes)
        val result = quizService.getAllQuizzes()
        assertEquals(2, result.size)
        assertEquals("Quiz 1", result[0].title)
        assertEquals("Quiz 2", result[1].title)
    }

    @Test
    fun testGetQuizById() {
        val quiz = Quiz(id = 1L, title = "Quiz 1", questions = mutableListOf())
        `when`(quizRepository.findById(1L)).thenReturn(Optional.of(quiz))
        val result = quizService.getQuizById(1L)
        assertEquals("Quiz 1", result.title)
    }

    @Test
    fun testGetQuizById_NotFound() {
        `when`(quizRepository.findById(any())).thenReturn(Optional.empty())
        assertThrows(EntityNotFoundException::class.java) {
            quizService.getQuizById(1L)
        }
    }

    @Test
    fun testGradeQuiz() {
        val quiz = Quiz(id = 1L, title = "Quiz 1", questions = mutableListOf(
            Question(id = 1L, content = "Question 1", answer = "Answer 1",
                quiz = Quiz(id = 1L, "title 1"))
        ))
        `when`(quizRepository.findById(1L)).thenReturn(Optional.of(quiz))
        val userAnswers = listOf(
            AnswerDto(questionId = 1L, content = "Answer 1")
        )
        val result = quizService.gradeQuiz(1L, userAnswers)
        assertEquals(1, result.size)
        assertEquals("Correct", result[0].result)
    }

    @Test
    fun testAddQuiz() {
        val quizDto = QuizDto(title = "New Quiz", fullDescription = "Description", questions = emptyList())
        val quiz = QuizMapper.mapToEntity(quizDto)
        `when`(quizRepository.save(any())).thenReturn(quiz)
        val result = quizService.add(quizDto)
        assertEquals("New Quiz", result.title)
    }

    @Test
    fun testUpdateQuestion() {
        val questionDto = QuestionDto(content = "Updated Content", answer = "Updated Answer")
        val question = Question(id = 1L, content = "Old Content", answer = "Old Answer", quiz = Quiz(id = 1L, "title 1"))
        `when`(questionRepository.findById(1L)).thenReturn(Optional.of(question))
        `when`(questionRepository.save(any())).thenReturn(question)
        val result = quizService.updateQuestion(1L, questionDto)
        assertEquals("Updated Content", result.content)
        assertEquals("Updated Answer", result.answer)
    }

    @Test
    fun testUpdateQuestion_NotFound() {
        val questionDto = QuestionDto(content = "Updated Content", answer = "Updated Answer")
        `when`(questionRepository.findById(any())).thenReturn(Optional.empty())
        assertThrows(EntityNotFoundException::class.java) {
            quizService.updateQuestion(1L, questionDto)
        }
    }

    @Test
    fun testDeleteQuestion() {
        val question = Question(id = 1L, content = "Question 1", answer = "Answer 1", quiz = Quiz(id = 1L, "title 1"))
        `when`(questionRepository.findById(1L)).thenReturn(Optional.of(question))
        quizService.deleteQuestion(1L)
        verify(questionRepository).delete(question)
    }

    @Test
    fun testDeleteQuestion_NotFound() {
        `when`(questionRepository.findById(any())).thenReturn(Optional.empty())
        assertThrows(EntityNotFoundException::class.java) {
            quizService.deleteQuestion(1L)
        }
    }

    @Test
    fun testDeleteQuizById() {
        val quiz = Quiz(id = 1L, title = "Quiz 1", questions = mutableListOf())
        `when`(quizRepository.findById(1L)).thenReturn(Optional.of(quiz))
        quizService.deleteQuizById(1L)
        verify(quizRepository).delete(quiz)
    }

    @Test
    fun testDeleteQuizById_NotFound() {
        `when`(quizRepository.findById(any())).thenReturn(Optional.empty())
        assertThrows(EntityNotFoundException::class.java) {
            quizService.deleteQuizById(1L)
        }
    }
}