package com.quizapp.entity

import jakarta.persistence.*

@Entity
@Table(name = "quizes")
data class Quiz(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(nullable = false)
    var title: String,

    @Column(nullable = false)
    val fullDescription: String = "",

    @OneToMany(mappedBy = "quiz", cascade = [CascadeType.ALL], orphanRemoval = true)
    val questions: MutableList<Question> = mutableListOf()
)