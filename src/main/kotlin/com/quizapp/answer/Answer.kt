package com.quizapp.answer;

import com.quizapp.question.Question
import jakarta.persistence.*

@Entity
@Table(name = "answers")
data class Answer(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(nullable = false)
    val content: String,

    @Column(nullable = false)
    val isCorrect: Boolean = false,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id")
    val question: Question
)

