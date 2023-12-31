package com.moim.moim.moim

import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import java.time.LocalDateTime

@SpringBootTest
class MoimControllerTest {

    @Autowired
    private lateinit var moimRepository: MoimRepository

    @BeforeEach
    fun beforeEach() {
        val moim = Moim("lee", "lee", LocalDateTime.now(), "lee", LocalDateTime.now())
        moimRepository.save(moim)
    }

    @Test
    fun test() {
        val findAll = moimRepository.findAll()
        println("findAll = ${findAll}")

    }
}