package com.jumbocash.t7.beanMapper;

public interface BeanMapperFunction<J, D> {
	
	D convertFromJsonToDto(J c);
	
	J convertFromDtoToJson(D c);

}
