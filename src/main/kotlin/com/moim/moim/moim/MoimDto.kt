package com.moim.moim.moim



data class MoimDto(
    var id: Long? = null,
    var title: String = "",
    var content: String = "",
    var author: String = "",
    var imageSrc: String = "",
) {
}