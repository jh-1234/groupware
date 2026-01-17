package com.project.groupware.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MainController {

    @RequestMapping(value = {"/{path:[^\\.]*}", "/{path:^(?!api$).*}/{subPath:[^\\.]*}", "/{path:^(?!api$).*}/{subPath:[^\\.]*}/{subSubPath:[^\\.]*}"})
    public String forward() {
        return "forward:/index.html";
    }
}
