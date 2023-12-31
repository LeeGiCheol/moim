package com.moim.moim.common

class ResultValue<T> (
    var code: String,
    var message: String,
    var data: T? = null
)