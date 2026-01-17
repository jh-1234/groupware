package com.project.groupware.config;

import com.project.groupware.properties.StorageProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.File;

@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {

    private final StorageProperties storageProperties;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        storageProperties.paths().forEach((_, pathInfo) -> {
            String uploadPath = "file:" + pathInfo.uploadPath() + File.separator;
            String loadPath = pathInfo.loadPath() + "/**";

            registry
                    .addResourceHandler(loadPath)
                    .addResourceLocations(uploadPath);
        });
    }
}
