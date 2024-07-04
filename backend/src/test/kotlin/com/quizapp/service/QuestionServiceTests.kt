package com.quizapp.service

import com.quizapp.dto.AnswerDto
import com.quizapp.dto.QuestionDto
import com.quizapp.entity.Question
import com.quizapp.entity.Quiz
import com.quizapp.repository.QuestionRepository
import com.quizapp.repository.QuizRepository
import jakarta.persistence.EntityNotFoundException
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertThrows
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.mockito.InjectMocks
import org.mockito.Mock
import org.mockito.Mockito
import org.mockito.junit.jupiter.MockitoExtension
import java.util.*

@ExtendWith(MockitoExtension::class)
class QuestionServiceTests {

    @Mock
    private lateinit var questionRepository: QuestionRepository

    @Mock
    private lateinit var quizRepository: QuizRepository

    @InjectMocks
    private lateinit var questionService: QuestionService

    private lateinit var mockQuiz: Quiz
    private lateinit var mockQuestion: Question

    @BeforeEach
    fun setUp() {
        mockQuiz = Quiz(title = "Mock Quiz", fullDescription = "Mock quiz description")
        mockQuestion = Question(content = "Mock Question", answer = "Mock Answer", quiz = mockQuiz)
    }

    @Test
    fun `Test addQuestionToQuiz`() {
        val questionDto = QuestionDto("New Question", "New Answer")
        val savedQuestion = Question(id = 2L, content = "New Question", answer = "New Answer", quiz = mockQuiz)
        Mockito.`when`(quizRepository.findById(1L)).thenReturn(Optional.of(mockQuiz))
        Mockito.`when`(questionRepository.save(Mockito.any(Question::class.java))).thenReturn(savedQuestion)
        val result = questionService.addQuestionToQuiz(1L, questionDto)
        assertEquals(savedQuestion, result)
    }

    @Test
    fun `Test updateQuestion`() {
        val questionDto = QuestionDto("Updated Question", "Updated Answer")
        val updatedQuestion = mockQuestion.copy(content = questionDto.content, answer = questionDto.answer)
        Mockito.`when`(questionRepository.findById(1L)).thenReturn(Optional.of(mockQuestion))
        Mockito.`when`(questionRepository.save(Mockito.any(Question::class.java))).thenReturn(updatedQuestion)
        val result = questionService.updateQuestion(1L, questionDto)
        assertEquals(updatedQuestion, result)
    }

    @Test
    fun `Test deleteQuestion`() {
        Mockito.`when`(questionRepository.findById(1L)).thenReturn(Optional.of(mockQuestion))
        questionService.deleteQuestion(1L)
        Mockito.verify(questionRepository, Mockito.times(1)).delete(mockQuestion)
    }

    @Test
    fun `Test updateAnswer`() {
        val answerDto = AnswerDto(1L, "Updated Answer")
        val updatedQuestion = mockQuestion.copy(answer = answerDto.content)
        Mockito.`when`(questionRepository.findById(1L)).thenReturn(Optional.of(mockQuestion))
        Mockito.`when`(questionRepository.save(Mockito.any(Question::class.java))).thenReturn(updatedQuestion)
        val result = questionService.updateAnswer(1L, answerDto)
        assertEquals(updatedQuestion, result)
    }

    @Test
    fun `Test getAllQuestionsByQuizId`() {
        val questions = mutableListOf(mockQuestion)
        val mockQuiz: Quiz = Mockito.mock(Quiz::class.java)
        Mockito.`when`(quizRepository.findById(1L)).thenReturn(Optional.of(mockQuiz))
        Mockito.`when`(mockQuiz.questions).thenReturn(questions)
        val result = questionService.getAllQuestionsByQuizId(1L)
        assertEquals(questions, result)
    }

    @Test
    fun `Test addQuestionToQuiz throws EntityNotFoundException`() {
        val questionDto = QuestionDto("New Question", "New Answer")
        Mockito.`when`(quizRepository.findById(1L)).thenReturn(Optional.empty())
        assertThrows(EntityNotFoundException::class.java) {
            questionService.addQuestionToQuiz(1L, questionDto)
        }
    }
}