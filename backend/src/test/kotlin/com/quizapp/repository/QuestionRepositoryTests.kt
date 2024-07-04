package com.quizapp.repository

import com.quizapp.entity.Question
import com.quizapp.entity.Quiz
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ActiveProfiles
import org.springframework.transaction.annotation.Transactional

@SpringBootTest
@Transactional
@ActiveProfiles("test")
class QuestionRepositoryTests {

    @Autowired
    lateinit var quizRepository: QuizRepository

    @Autowired
    lateinit var questionRepository: QuestionRepository

    private lateinit var question: Question

    @BeforeEach
    fun setUp() {
        val quiz = Quiz(title = "title")
        question = Question(content = "question", answer = "answer", quiz = quiz)
        quizRepository.save(quiz)
        questionRepository.save(question)
    }

    @Test
    fun `test save question`() {
        val savedQuestion = questionRepository.save(question)
        assertNotNull(savedQuestion.id)
    }

    @Test
    fun `test find by id`() {
        val foundQuestion = questionRepository.findById(question.id)
        assertTrue(foundQuestion.isPresent)
        assertEquals(question.content, foundQuestion.get().content)
    }

    @Test
    fun `test find all`() {
        val questions = questionRepository.findAll()
        assertFalse(questions.isEmpty())
    }

    @Test
    fun `test delete by id`() {
        questionRepository.deleteById(question.id)
        val foundQuestion = questionRepository.findById(question.id)
        assertFalse(foundQuestion.isPresent)
    }

    @Test
    fun `test count`() {
        val count = questionRepository.count()
        assertTrue(count > 0)
    }

    @Test
    fun `test exists by id`() {
        val exists = questionRepository.existsById(question.id)
        assertTrue(exists)
    }
}