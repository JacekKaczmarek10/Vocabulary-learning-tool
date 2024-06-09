package com.quizapp.question;

import com.quizapp.answer.Answer
import jakarta.persistence.*

@Entity
@Table(name = "questions")
data class Question(

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = 0,

        @Column(nullable = false)
        var content: String,

        @OneToMany(mappedBy = "question", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
        val answers: List<Answer> = mutableListOf()
)
