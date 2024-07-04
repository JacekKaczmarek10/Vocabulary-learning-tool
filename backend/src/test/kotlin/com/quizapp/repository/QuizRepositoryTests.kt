package com.quizapp.repository

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
class QuizRepositoryTests {

    @Autowired
    lateinit var quizRepository: QuizRepository

    private lateinit var quiz: Quiz

    @BeforeEach
    fun setUp() {
        quiz = Quiz(title = "Quiz Title")
        quizRepository.save(quiz)
    }

    @Test
    fun `test save quiz`() {
        val savedQuiz = quizRepository.save(quiz)
        assertNotNull(savedQuiz.id)
    }

    @Test
    fun `test find by id`() {
        val foundQuiz = quizRepository.findById(quiz.id)
        assertTrue(foundQuiz.isPresent)
        assertEquals(quiz.title, foundQuiz.get().title)
    }

    @Test
    fun `test find all`() {
        val quizzes = quizRepository.findAll()
        assertFalse(quizzes.isEmpty())
    }

    @Test
    fun `test delete by id`() {
        quizRepository.deleteById(quiz.id)
        val foundQuiz = quizRepository.findById(quiz.id)
        assertFalse(foundQuiz.isPresent)
    }

    @Test
    fun `test count`() {
        val count = quizRepository.count()
        assertTrue(count > 0)
    }

    @Test
    fun `test exists by id`() {
        val exists = quizRepository.existsById(quiz.id)
        assertTrue(exists)
    }
}