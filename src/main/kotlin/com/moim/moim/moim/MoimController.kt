package com.moim.moim.moim

import com.moim.moim.common.ResultValue
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class MoimController(
        private val moimService: MoimService
) {

    @GetMapping("/moim")
    fun moim(): ResponseEntity<MutableList<MoimDto>> {
        val findAll = moimService.findAll()
        return ResponseEntity.ok(findAll)
    }

    @PostMapping("/moim")
    fun createMoim(@RequestBody moimDto: MoimDto): ResponseEntity<ResultValue<Any>> {
        val createMoim = moimService.createMoim(moimDto)
        return ResponseEntity.ok(ResultValue("0000", "Success"))
    }

    @PatchMapping("/moim/{id}")
    fun updateMoim(@PathVariable id: Long, @RequestBody moimDto: MoimDto): ResponseEntity<ResultValue<Any>> {
        moimService.updateMoim(id, moimDto)
        return ResponseEntity.ok(ResultValue("0000", "Success"))
    }

    @DeleteMapping("/moim/{id}")
    fun deleteMoim(@PathVariable id: Long): ResponseEntity<ResultValue<Any>> {
        moimService.removeMoim(id)
        return ResponseEntity.ok(ResultValue("0000", "Success"))
    }

}