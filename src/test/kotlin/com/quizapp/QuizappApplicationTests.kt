package com.quizapp

import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.runApplication
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.context.ApplicationContext

@SpringBootTest
class QuizappApplicationTests {

    @Autowired
    private lateinit var applicationContext: ApplicationContext

    @Test
    fun contextLoads() {
        assertThat(applicationContext).isNotNull
    }

    @Test
    fun main() {
        val args = emptyArray<String>()
        runApplication<QuizappApplication>(*args)
    }
}