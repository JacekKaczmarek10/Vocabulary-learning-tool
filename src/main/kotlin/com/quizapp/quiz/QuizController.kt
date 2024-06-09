package com.quizapp.quiz;

import com.quizapp.answer.Answer
import com.quizapp.question.Question
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
