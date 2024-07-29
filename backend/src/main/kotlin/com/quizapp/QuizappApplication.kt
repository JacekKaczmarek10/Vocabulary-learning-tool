package com.quizapp

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class QuizappApplication

fun main(args: Array<String>) {
    runApplication<QuizappApplication>(*args)
}
