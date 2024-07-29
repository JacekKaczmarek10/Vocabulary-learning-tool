package com.quizapp.controller

import com.quizapp.dto.AnswerDto
import com.quizapp.dto.QuestionDto
import com.quizapp.entity.Question
import com.quizapp.entity.Quiz
import com.quizapp.service.QuestionService
import jakarta.persistence.EntityNotFoundException
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Disabled
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.mockito.Mockito
import org.mockito.junit.jupiter.MockitoExtension
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.http.MediaType
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.junit.jupiter.SpringExtension
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.setup.MockMvcBuilders
import org.springframework.web.context.WebApplicationContext
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.*

@ExtendWith(SpringExtension::class, MockitoExtension::class)
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class QuestionControllerTests {

    @Autowired
    private lateinit var mockMvc: MockMvc

    @MockBean
    private lateinit var questionService: QuestionService

    @Autowired
    private lateinit var webApplicationContext: WebApplicationContext

    @BeforeEach
    fun setUp() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build()
    }

    @Test
    @Disabled
    fun `addQuestionToQuiz success`() {
        val quiz = Quiz(title = "title")
        val question = Question(content = "Question 1", answer = "Answer 1", quiz = quiz)
        Mockito.`when`(questionService.addQuestionToQuiz(Mockito.anyLong(), Mockito.any(QuestionDto::class.java)))
            .thenReturn(question)

        mockMvc.perform(post("/api/questions/quiz/{quizId}", 1L)
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"content\": \"Question content\", \"answer\": \"Answer content\"}"))
            .andExpect(status().isCreated)
            .andExpect(jsonPath("$.content").value("Question content"))
            .andExpect(jsonPath("$.answer").value("Answer content"))
    }

    @Test
    @Disabled
    fun `addQuestionToQuiz not found`() {
        Mockito.doThrow(EntityNotFoundException::class.java).`when`(questionService)
            .addQuestionToQuiz(Mockito.anyLong(), Mockito.any(QuestionDto::class.java))

        mockMvc.perform(post("/api/questions/quiz/{quizId}", 1L)
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"content\": \"Question content\", \"answer\": \"Answer content\"}"))
            .andExpect(status().isNotFound)
            .andExpect(content().string("Quiz with id 1 not found"))
    }

    @Test
    @Disabled
    fun `addQuestionToQuiz internal error`() {
        Mockito.doThrow(RuntimeException::class.java).`when`(questionService)
            .addQuestionToQuiz(Mockito.anyLong(), Mockito.any(QuestionDto::class.java))

        mockMvc.perform(post("/api/questions/quiz/{quizId}", 1L)
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"content\": \"Question content\", \"answer\": \"Answer content\"}"))
            .andExpect(status().isInternalServerError)
            .andExpect(content().string("Failed to add question to quiz"))
    }

    @Test
    @Disabled
    fun `updateQuestion success`() {
        val quiz = Quiz(title = "title")
        val questionDto = Question(content = "Question 1", answer = "Answer 1", quiz = quiz)
        Mockito.`when`(questionService.updateQuestion(Mockito.anyLong(), Mockito.any(QuestionDto::class.java)))
            .thenReturn(questionDto)

        mockMvc.perform(put("/api/questions/{questionId}", 1L)
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"content\": \"Updated content\", \"answer\": \"Updated answer\"}"))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.content").value("Updated content"))
            .andExpect(jsonPath("$.answer").value("Updated answer"))
    }

    @Test
    @Disabled
    fun `updateQuestion internal error`() {
        Mockito.doThrow(RuntimeException::class.java).`when`(questionService)
            .updateQuestion(Mockito.anyLong(), Mockito.any(QuestionDto::class.java))

        mockMvc.perform(put("/api/questions/{questionId}", 1L)
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"content\": \"Updated content\", \"answer\": \"Updated answer\"}"))
            .andExpect(status().isInternalServerError)
            .andExpect(content().string("Failed to update question"))
    }

    @Test
    fun `deleteQuestion success`() {
        mockMvc.perform(delete("/api/questions/{questionId}", 1L))
            .andExpect(status().isNoContent)
    }

    @Test
    fun `deleteQuestion not found`() {
        Mockito.doThrow(EntityNotFoundException::class.java).`when`(questionService).deleteQuestion(Mockito.anyLong())

        mockMvc.perform(delete("/api/questions/{questionId}", 1L))
            .andExpect(status().isNotFound)
            .andExpect(content().string("Question with id 1 not found"))
    }

    @Test
    fun `deleteQuestion internal error`() {
        Mockito.doThrow(RuntimeException::class.java).`when`(questionService).deleteQuestion(Mockito.anyLong())

        mockMvc.perform(delete("/api/questions/{questionId}", 1L))
            .andExpect(status().isInternalServerError)
            .andExpect(content().string("Failed to delete question"))
    }

    @Test
    @Disabled
    fun `updateAnswer success`() {
        val quiz = Quiz(title = "title")
        val question = Question(content = "Question 1", answer = "Answer 1", quiz = quiz)
        Mockito.`when`(questionService.updateAnswer(Mockito.anyLong(), Mockito.any(AnswerDto::class.java)))
            .thenReturn(question)

        mockMvc.perform(put("/api/questions/{questionId}/answer", 1L)
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"questionId\": 1, \"content\": \"Updated answer\"}"))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.questionId").value(1L))
            .andExpect(jsonPath("$.content").value("Updated answer"))
    }

    @Test
    @Disabled
    fun `updateAnswer not found`() {
        Mockito.doThrow(EntityNotFoundException::class.java).`when`(questionService)
            .updateAnswer(Mockito.anyLong(), Mockito.any(AnswerDto::class.java))

        mockMvc.perform(put("/api/questions/{questionId}/answer", 1L)
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"questionId\": 1, \"content\": \"Updated answer\"}"))
            .andExpect(status().isNotFound)
            .andExpect(content().string("Question with id 1 not found"))
    }

    @Test
    @Disabled
    fun `updateAnswer internal error`() {
        Mockito.doThrow(RuntimeException::class.java).`when`(questionService)
            .updateAnswer(Mockito.anyLong(), Mockito.any(AnswerDto::class.java))

        mockMvc.perform(put("/api/questions/{questionId}/answer", 1L)
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"questionId\": 1, \"content\": \"Updated answer\"}"))
            .andExpect(status().isInternalServerError)
            .andExpect(content().string("Failed to update answer"))
    }

    @Test
    fun `getAllQuestionsByQuizId success`() {
        val quiz = Quiz(title = "title")
        val questions = listOf(
            Question(content = "Question 1", answer = "Answer 1", quiz = quiz),
            Question(content = "Question 2", answer = "Answer 2", quiz = quiz)
        )
        Mockito.`when`(questionService.getAllQuestionsByQuizId(Mockito.anyLong())).thenReturn(questions)

        mockMvc.perform(get("/api/questions/quiz/{quizId}", 1L))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$[0].content").value("Question 1"))
            .andExpect(jsonPath("$[0].answer").value("Answer 1"))
            .andExpect(jsonPath("$[1].content").value("Question 2"))
            .andExpect(jsonPath("$[1].answer").value("Answer 2"))
    }

    @Test
    fun `getAllQuestionsByQuizId not found`() {
        Mockito.doThrow(EntityNotFoundException::class.java).`when`(questionService).getAllQuestionsByQuizId(Mockito.anyLong())

        mockMvc.perform(get("/api/questions/quiz/{quizId}", 1L))
            .andExpect(status().isNotFound)
            .andExpect(content().string("Quiz with id 1 not found"))
    }

    @Test
    fun `getAllQuestionsByQuizId internal error`() {
        Mockito.doThrow(RuntimeException::class.java).`when`(questionService).getAllQuestionsByQuizId(Mockito.anyLong())

        mockMvc.perform(get("/api/questions/quiz/{quizId}", 1L))
            .andExpect(status().isInternalServerError)
            .andExpect(content().string("Failed to retrieve questions for quiz"))
    }
}