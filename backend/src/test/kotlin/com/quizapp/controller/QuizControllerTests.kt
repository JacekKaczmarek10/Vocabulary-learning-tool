package com.quizapp.controller

import com.fasterxml.jackson.databind.ObjectMapper
import com.quizapp.dto.QuestionDto
import com.quizapp.dto.QuizDto
import com.quizapp.entity.Question
import com.quizapp.entity.Quiz
import com.quizapp.service.QuizService
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.mockito.ArgumentMatchers.*
import org.mockito.Mockito.`when`
import org.mockito.Mockito.doNothing
import org.mockito.MockitoAnnotations
import org.mockito.junit.jupiter.MockitoExtension
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.http.MediaType
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.junit.jupiter.SpringExtension
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers
import java.util.Collections

@ExtendWith(SpringExtension::class, MockitoExtension::class)
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class QuizControllerTests {

    @Autowired
    private lateinit var mockMvc: MockMvc

    @MockBean
    private lateinit var quizService: QuizService

    @BeforeEach
    fun initMocks() {
        MockitoAnnotations.openMocks(this)
    }

    @BeforeEach
    fun setUp() {
        `when`(quizService.gradeQuiz(anyLong(), anyList())).thenReturn(Collections.emptyList())
        `when`(quizService.getQuizById(anyLong())).thenReturn(createMockQuiz())
        `when`(quizService.getAllQuizzes()).thenReturn(listOf(createMockQuiz()))
        doNothing().`when`(quizService).deleteQuestion(anyLong())
        doNothing().`when`(quizService).deleteQuizById(anyLong())
    }

    @Test
    fun gradeQuiz_validQuizIdAndAnswers_shouldReturnOk() {
        mockMvc.perform(
            MockMvcRequestBuilders.post("/api/quizzes/grade/{quizId}", 1L)
                .contentType(MediaType.APPLICATION_JSON)
                .content("[]")
        )
            .andExpect(MockMvcResultMatchers.status().isOk)
    }

    @Test
    fun getQuizById_existingQuizId_shouldReturnOk() {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/quizzes/{quizId}", 1L))
            .andExpect(MockMvcResultMatchers.status().isOk)
    }

    @Test
    fun getAllQuizzes_shouldReturnOk() {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/quizzes"))
            .andExpect(MockMvcResultMatchers.status().isOk)
    }

    @Test
    fun addQuiz_validQuizDto_shouldReturnCreated() {
        val quizDto = ObjectMapper().writeValueAsString(createMockQuizDto())
        mockMvc.perform(
            MockMvcRequestBuilders.post("/api/quizzes")
                .contentType(MediaType.APPLICATION_JSON)
                .content(quizDto)
        )
            .andExpect(MockMvcResultMatchers.status().isCreated)
    }

    @Test
    fun updateQuestion_validIdsAndDto_shouldReturnOk() {
        val questionDto = ObjectMapper().writeValueAsString(createMockQuestionDto())
        mockMvc.perform(
            MockMvcRequestBuilders.put("/api/quizzes/{quizId}/questions/{questionId}", 1L, 1L)
                .contentType(MediaType.APPLICATION_JSON)
                .content(questionDto)
        )
            .andExpect(MockMvcResultMatchers.status().isOk)
    }

    @Test
    fun deleteQuestion_validIds_shouldReturnNoContent() {
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/quizzes/{quizId}/questions/{questionId}", 1L, 1L))
            .andExpect(MockMvcResultMatchers.status().isNoContent)
    }

    @Test
    fun deleteQuiz_validQuizId_shouldReturnNoContent() {
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/quizzes/{quizId}", 1L))
            .andExpect(MockMvcResultMatchers.status().isNoContent)
    }

    private fun createMockQuiz(): Quiz {
        return Quiz(id = 1, title = "Mock Quiz", fullDescription = "Mock Quiz Description")
    }

    private fun createMockQuizDto(): QuizDto {
        return QuizDto(title = "Mock Quiz", fullDescription = "Mock Quiz Description", questions = mutableListOf(createMockQuestionDto()))
    }

    private fun createMockQuestion(): Question {
        return Question(id = 1, content = "Mock Question", answer = "Mock Answer", quiz = createMockQuiz())
    }

    private fun createMockQuestionDto(): QuestionDto {
        return QuestionDto(content = "Mock Question", answer = "Mock Answer")
    }
}