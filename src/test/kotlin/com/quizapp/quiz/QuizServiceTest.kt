package com.quizapp.quiz

import com.quizapp.answer.Answer
import com.quizapp.answer.AnswerRepository
import com.quizapp.question.Question
import com.quizapp.question.QuestionRepository
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.mockito.Mockito
import org.mockito.Mockito.`when`
import org.mockito.junit.jupiter.MockitoExtension
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ActiveProfiles
import java.util.*

@ExtendWith(MockitoExtension::class)
@SpringBootTest
@ActiveProfiles("test")
class QuizServiceTest {

    private val questionRepository = Mockito.mock(QuestionRepository::class.java)
    private val answerRepository = Mockito.mock(AnswerRepository::class.java)
    private val quizService = QuizService(questionRepository, answerRepository)

    @Nested
    inner class GetQuestionsTest {

        @Test
        fun shouldGetQuestions() {
            val questions = listOf(Question(content = "Example Question1"), Question(content = "Example Question2"))
            `when`(questionRepository.findAll()).thenReturn(questions)

            val result = quizService.getQuestions()

            assertThat(result).isEqualTo(questions)
        }

        @Test
        fun shouldGetEmptyList() {
            `when`(questionRepository.findAll()).thenReturn(Collections.emptyList())

            val result = quizService.getQuestions()

            assertThat(result).isEmpty();
        }

    }

    @Nested
    inner class GradeAnswersTest {

        @Test
        fun shouldGradeAnswersAllCorrect() {
            var question = Question(content = "Example Question1");
            val answers = listOf(
                Answer(id = 1L, content = "Example Answer1", question = question, isCorrect = true),
                Answer(id = 2L, content = "Example Answer2", question = question, isCorrect = true)
            )
            `when`(answerRepository.findById(1L)).thenReturn(Optional.of(answers[0]))
            `when`(answerRepository.findById(2L)).thenReturn(Optional.of(answers[1]))

            val score = quizService.gradeAnswers(answers)

            assertThat(score).isEqualTo(2)
        }

        @Test
        fun testGradeAnswersSomeCorrect() {
            var question = Question(content = "Example Question1");
            val answers = listOf(
                Answer(id = 1L, content = "Example Answer1", question = question, isCorrect = true),
                Answer(id = 2L, content = "Example Answer2", question = question, isCorrect = false)
            )
            `when`(answerRepository.findById(1)).thenReturn(Optional.of(answers[0]))
            `when`(answerRepository.findById(2)).thenReturn(Optional.of(answers[1]))

            val score = quizService.gradeAnswers(answers)

            assertThat(score).isEqualTo(1)
        }

        @Test
        fun testGradeAnswersNoneCorrect() {
            var question = Question(content = "Example Question1");
            val answers = listOf(
                Answer(content = "Example Answer1", question = question),
                Answer(content = "Example Answer2", question = question)
            )
            `when`(answerRepository.findById(1)).thenReturn(Optional.of(answers[0]))
            `when`(answerRepository.findById(2)).thenReturn(Optional.of(answers[1]))

            val score = quizService.gradeAnswers(answers)

            assertThat(score).isEqualTo(0)
        }

        @Test
        fun testGradeAnswersSomeNotFound() {
            var question = Question(content = "Example Question1");
            val answers = listOf(
                Answer(id = 1L, content = "Example Answer1", question = question, isCorrect = true),
                Answer(content = "Example Answer2", question = question)
            )
            `when`(answerRepository.findById(1)).thenReturn(Optional.of(answers[0]))
            `when`(answerRepository.findById(2)).thenReturn(Optional.empty())

            val score = quizService.gradeAnswers(answers)

            assertThat(score).isEqualTo(1)
        }

    }

}
