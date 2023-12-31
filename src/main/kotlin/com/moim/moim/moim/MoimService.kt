package com.moim.moim.moim

import org.modelmapper.ModelMapper
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.stream.Collectors

@Service
@Transactional(readOnly = false)
class MoimService(
        private val moimRepository: MoimRepository,
        private val modelMapper: ModelMapper
) {

    @Transactional(readOnly = true)
    fun findAll(): MutableList<MoimDto> {
        val findAll = moimRepository.findAllLimitedTo(Pageable.ofSize(10))
        return findAll.stream()
                .map { moim -> modelMapper.map(moim, MoimDto::class.java) }
                .collect(Collectors.toList())
    }

    fun createMoim(moimDto: MoimDto): MoimDto {
        val moim = modelMapper.map(moimDto, Moim::class.java)
        val save = moimRepository.save(moim)
        return modelMapper.map(save, MoimDto::class.java)
    }

    fun updateMoim(id: Long, moimDto: MoimDto) {
        val findMoim = moimRepository.findById(id)
        if (!findMoim.isPresent) throw RuntimeException("not found moim")

        val moim = findMoim.get()
        modelMapper.map(moimDto, moim)
    }

    fun removeMoim(id: Long) {
        moimRepository.deleteById(id)
    }

}