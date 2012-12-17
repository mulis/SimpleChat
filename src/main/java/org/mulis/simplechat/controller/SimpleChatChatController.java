package org.mulis.simplechat.controller;

import org.apache.log4j.Logger;
import org.mulis.chat.api.controller.ChatController;
import org.mulis.simplechat.model.ChatPostedMessage;
import org.mulis.simplechat.model.ChatUser;
import org.mulis.simplechat.model.SimpleChatModel;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.util.Collection;

@Controller
public class SimpleChatChatController implements ChatController<PostMessageRequestBody> {

    private final static Logger logger = Logger.getLogger(SimpleChatModel.class);

    @Inject
    private SimpleChatModel model;

    @RequestMapping(value = "/test", method = RequestMethod.GET, produces = "text/plain")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public String test(@RequestParam final String nickname, @RequestParam final String color) {

        //Integer userId = model.login(nickname, color);

        return "Ok";

    }

    @RequestMapping(value = "/login", method = RequestMethod.GET, produces = "text/plain")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    @Override
    public Integer login(@RequestParam final String nickname, @RequestParam final String color) {

        Integer userId = model.login(nickname, color);

        return userId;

    }

    @RequestMapping(value = "/logout", method = RequestMethod.GET, produces = "text/plain")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    @Override
    public void logout(@RequestParam final Integer userId) {


    }

    @RequestMapping(value = "/message", method = RequestMethod.POST, consumes = "application/json", produces = "text/plain")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    @Override
    public Integer postMessage(@RequestBody final PostMessageRequestBody request) {

        logger.debug("public Integer postMessage(PostMessageRequestBody request)");
        logger.debug("request: " + request);

        Integer messageId = model.postMessage(request.getMessage());

        logger.debug("messageId: " + messageId);

        return messageId;

    }

    @RequestMapping(value = "/messages", method = RequestMethod.GET, produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    @Override
    public Collection<ChatPostedMessage> getMessages(@RequestParam final Integer userId) {

        Collection<ChatPostedMessage> messages = model.getMessages(userId);

        return messages;

    }

    @RequestMapping(value = "/users", method = RequestMethod.GET, produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    @Override
    public Collection<ChatUser> getUsers() {

        Collection<ChatUser> users = model.getUsers();

        return users;

    }

}
