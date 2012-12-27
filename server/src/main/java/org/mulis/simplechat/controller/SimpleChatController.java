package org.mulis.simplechat.controller;

import org.apache.log4j.Logger;
import org.mulis.simplechat.api.controller.ChatController;
import org.mulis.simplechat.model.ChatPostedMessage;
import org.mulis.simplechat.model.ChatUser;
import org.mulis.simplechat.model.SimpleChatModel;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.util.Collection;

//import org.mulis.simplechat.api.controller.*;

@Controller
public class SimpleChatController implements ChatController<PostMessageRequestBody> {

    private final static Logger logger = Logger.getLogger(SimpleChatModel.class);

    @Inject
    private SimpleChatModel model;

    @RequestMapping(value = "/login", method = RequestMethod.GET, produces = "text/plain")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    @Override
    public Integer login(@RequestParam final String nickname, @RequestParam final String color) {

        logger.debug("login");
        logger.debug("nickname: " + nickname);
        logger.debug("color:" + color);

        Integer userId = model.login(nickname, color);

        logger.debug("userId:" + userId);

        return userId;

    }

    @RequestMapping(value = "/logout", method = RequestMethod.GET, produces = "text/plain")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    @Override
    public void logout(@RequestParam final Integer userId) {

        logger.debug("logout");
        logger.debug("userId: " + userId);

        model.logout(userId);

    }

    @RequestMapping(value = "/message", method = RequestMethod.POST, consumes = "application/json", produces = "text/plain")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    @Override
    public Integer postMessage(@RequestBody final PostMessageRequestBody request) {

        logger.debug("postMessage");
        logger.debug("request: " + request);

        Integer messageId = model.postMessage(request.getMessage());

        logger.debug("messageId: " + messageId);

        return messageId;

    }

    @RequestMapping(value = "/messages", method = RequestMethod.GET, produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    @Override
    public Collection<ChatPostedMessage> getMessages(@RequestParam final Integer userId, @RequestParam final Integer lastReceivedMessageId) {

        logger.debug("getMessages");
        logger.debug("userId: " + userId);
        logger.debug("lastReceivedMessageId: " + lastReceivedMessageId);

        Collection<ChatPostedMessage> messages = model.getMessages(userId, lastReceivedMessageId);

        logger.debug("messages: " + messages);

        return messages;

    }

    @RequestMapping(value = "/users", method = RequestMethod.GET, produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    @Override
    public Collection<ChatUser> getUsers() {

        logger.debug("getUsers");

        Collection<ChatUser> users = model.getUsers();

        logger.debug("users: " + users);

        return users;

    }

}
