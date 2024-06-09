package com.quizapp.answer

import com.quizapp.question.Question
import com.quizapp.question.QuestionRepository
import jakarta.transaction.Transactional
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.junit.jupiter.SpringExtension

@ExtendWith(SpringExtension::class)
@SpringBootTest
@ActiveProfiles("test")
class AnswerRepositoryTest {

    @Autowired
    private lateinit var answerRepository: AnswerRepository

    @Autowired
    private lateinit var questionRepository: QuestionRepository

    @Test
    @Transactional
    fun `shouldSaveAndFindById`() {
        val question = Question(content = "Example Question")
        val savedQuestion = questionRepository.saveAndFlush(question)
        val answer = Answer(content = "Example Answer", question = savedQuestion)

        val savedAnswer = answerRepository.saveAndFlush(answer)
        val foundAnswer = answerRepository.findById(savedAnswer.id)

        assertThat(foundAnswer.get()).isEqualTo(savedAnswer)
    }

    @Test
    fun `shouldFindAll`() {
        val question = Question(content = "Example Question")
        val savedQuestion = questionRepository.save(question)
        val answer1 = Answer(content = "Answer 1", question = savedQuestion)
        val answer2 = Answer(content = "Answer 2", question = savedQuestion)
        answerRepository.save(answer1)
        answerRepository.save(answer2)

        val allAnswers = answerRepository.findAll()

        assertThat(allAnswers.size).isEqualTo(allAnswers.size)
    }

    @Test
    fun `shouldUpdate`() {
        val question = Question(content = "Example Question")
        val savedQuestion = questionRepository.save(question)
        val answer = Answer(content = "Old Answer", question = savedQuestion)
        val savedAnswer = answerRepository.save(answer)
        val updatedText = "Updated Answer"
        savedAnswer.content = updatedText

        val updatedAnswer = answerRepository.save(savedAnswer)

        assertThat(updatedAnswer.content).isEqualTo(updatedText)
    }

    @Test
    fun `shouldDelete`() {
        val question = Question(content = "Example Question")
        val savedQuestion = questionRepository.save(question)
        val answer = Answer(content = "Answer to delete", question = savedQuestion)
        val savedAnswer = answerRepository.save(answer)
        answerRepository.delete(savedAnswer)

        val foundAnswer = answerRepository.findById(savedAnswer.id!!)

        assertThat(foundAnswer.isEmpty).isTrue()
    }
}
