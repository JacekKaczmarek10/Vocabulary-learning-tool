package com.quizapp.entity;

import com.fasterxml.jackson.annotation.JsonIgnore
import jakarta.persistence.*

@Entity
@Table(name = "questions")
data class Question(

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = 0,

        @Column(nullable = false)
        var content: String,

        @Column(nullable = false)
        var answer: String,

        @JsonIgnore
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "quiz_id", nullable = false)
        var quiz: Quiz
)
