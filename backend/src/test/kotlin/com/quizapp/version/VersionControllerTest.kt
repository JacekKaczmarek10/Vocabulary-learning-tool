package com.quizapp.version

import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.mockito.junit.jupiter.MockitoExtension
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.core.env.Environment
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.content
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

@ExtendWith(MockitoExtension::class)
@SpringBootTest
@ActiveProfiles("test")
@AutoConfigureMockMvc
class VersionControllerTest {

    @Autowired
    private lateinit var mockMvc: MockMvc

    @Autowired
    private lateinit var environment: Environment

    @Test
    fun `should return correct app version`() {
        val expectedVersion = environment.getProperty("app.version") ?: ""
        mockMvc.perform(get("/api/version"))
            .andExpect(status().isOk)
            .andExpect(content().string(expectedVersion))
    }
}
