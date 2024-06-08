package com.quizapp.controller;

import com.quizapp.entity.Answer
import com.quizapp.entity.Question
import com.quizapp.service.QuizService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/quiz")
class QuizController(@Autowired val quizService: QuizService) {

    @GetMapping("/questions")
    fun getQuestions(): List<Question> {
        return quizService.getQuestions()
    }

    @PostMapping("/grade")
    fun gradeAnswers(@RequestBody answers: List<Answer>): Int {
        return quizService.gradeAnswers(answers)
    }
}
