package com.moim.moim.moim

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Lob
import lombok.Builder
import lombok.Getter
import java.time.LocalDateTime

@Entity
class Moim (

    var title: String,
    var content: String,
    var author: String,
    @Lob
    var imageSrc: String,
    var createdBy: String,
    var createdDt: LocalDateTime,
    var updatedBy: String,
    var updatedDt: LocalDateTime,

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null,

)