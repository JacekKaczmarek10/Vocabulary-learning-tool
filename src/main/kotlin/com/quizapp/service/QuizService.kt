package com.quizapp.service;

import com.quizapp.entity.Answer
import com.quizapp.entity.Question;
import com.quizapp.repository.AnswerRepository;
import com.quizapp.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class QuizService(
        @Autowired val questionRepository: QuestionRepository,
        @Autowired val answerRepository: AnswerRepository
) {
    fun getQuestions(): List<Question> {
        return questionRepository.findAll()
    }

    fun gradeAnswers(answers: List<Answer>): Int {
        var score = 0
        for (answer in answers) {
            val savedAnswer = answerRepository.findById(answer.id).orElse(null)
            if (savedAnswer != null && savedAnswer.isCorrect) {
                score++
            }
        }
        return score
    }
}
