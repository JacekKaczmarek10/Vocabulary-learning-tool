package com.quizapp.version

import org.springframework.beans.factory.annotation.Value
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api")
class VersionController {

    @Value("\${app.version}")
    private lateinit var appVersion: String

    @GetMapping("/version")
    fun getAppVersion(): String {
        return appVersion
    }
}
