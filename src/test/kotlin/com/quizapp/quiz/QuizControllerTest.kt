package com.quizapp.quiz

import com.quizapp.answer.Answer
import com.quizapp.question.Question
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test
import org.mockito.Mockito.*
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.*
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.extension.ExtendWith
import org.mockito.junit.jupiter.MockitoExtension
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ActiveProfiles

@ExtendWith(MockitoExtension::class)
@SpringBootTest
@ActiveProfiles("test")
@AutoConfigureMockMvc
class QuizControllerTest {

    @Autowired
    private lateinit var mockMvc: MockMvc

    @MockBean
    private lateinit var quizService: QuizService

    private val objectMapper = jacksonObjectMapper()

    @Nested
    inner class GetQuestionsTest {

        @Test
        fun shouldGetQuestions() {
            val questions = listOf(Question(id = 1, content = "Question 1"), Question(id = 2, content = "Question 2"))
            `when`(quizService.getQuestions()).thenReturn(questions)

            val result = mockMvc.perform(get("/quiz/questions"))
                .andExpect(status().isOk)
                .andReturn()

            val responseBody = result.response.contentAsString
            val returnedQuestions: List<Question> = objectMapper.readValue(responseBody)
            assertThat(returnedQuestions).isEqualTo(questions)
        }

    }

    @Nested
    inner class GradeAnswersTest {

        @Test
        fun testGradeAnswers() {
            val answers = listOf(
                Answer(id = 1, content = "Answer 1", isCorrect = true, question = Question(id = 1, content = "Question 1")),
                Answer(id = 2, content = "Answer 2", isCorrect = false, question = Question(id = 2, content = "Question 2"))
            )
            val answersJson = objectMapper.writeValueAsString(answers)
            `when`(quizService.gradeAnswers(answers)).thenReturn(1)

            val result = mockMvc.perform(
                post("/quiz/grade")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(answersJson)
            )
                .andExpect(status().isOk)
                .andReturn()

            val responseBody = result.response.contentAsString
            val score = responseBody.toInt()
            assertThat(score).isEqualTo(1)
        }

    }


}
