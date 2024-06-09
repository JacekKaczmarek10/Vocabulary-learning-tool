package com.quizapp.quiz;

import com.quizapp.answer.Answer
import com.quizapp.question.Question;
import com.quizapp.answer.AnswerRepository;
import com.quizapp.question.QuestionRepository;
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
