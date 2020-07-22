package com.teng;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.teng.siedemo.dao")
public class SieDemoOneApplication {

    public static void main(String[] args) {
        SpringApplication.run(SieDemoOneApplication.class, args);
    }

}
