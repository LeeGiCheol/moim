package com.moim.moim.moim

import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query

interface MoimRepository: JpaRepository<Moim, Long> {

    @Query("SELECT m FROM Moim m")
    fun findAllLimitedTo(pageable: Pageable): MutableList<Moim>

}