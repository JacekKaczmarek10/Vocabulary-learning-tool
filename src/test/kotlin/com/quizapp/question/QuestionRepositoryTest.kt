package com.quizapp.question

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
class QuestionRepositoryTest {

    @Autowired
    private lateinit var questionRepository: QuestionRepository

    @Test
    @Transactional
    fun `shouldSaveAndFindById`() {
        val question = Question(content = "Example Question")
        val savedQuestion = questionRepository.save(question)
        val foundQuestion = questionRepository.findById(savedQuestion.id!!)

        assertThat(foundQuestion).isPresent
        assertThat(foundQuestion.get()).isEqualTo(savedQuestion)
    }

    @Test
    @Transactional
    fun `shouldFindAll`() {
        questionRepository.deleteAll()
        val question1 = Question(content = "Question 1")
        val question2 = Question(content = "Question 2")
        questionRepository.save(question1)
        questionRepository.save(question2)

        val allQuestions = questionRepository.findAll()

        assertThat(allQuestions).isNotEmpty
        assertThat(allQuestions).hasSize(2)
    }

    @Test
    fun `shouldUpdate`() {
        val question = Question(content = "Old Question")
        val savedQuestion = questionRepository.save(question)
        val updatedContent = "Updated Question"
        savedQuestion.content = updatedContent

        val updatedQuestion = questionRepository.save(savedQuestion)

        assertThat(updatedQuestion.content).isEqualTo(updatedContent)
    }

    @Test
    fun `shouldDelete`() {
        val question = Question(content = "Question to delete")
        val savedQuestion = questionRepository.save(question)
        questionRepository.delete(savedQuestion)

        val foundQuestion = questionRepository.findById(savedQuestion.id!!)

        assertThat(foundQuestion).isEmpty
    }
}