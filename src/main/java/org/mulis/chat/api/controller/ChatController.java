package org.mulis.chat.api.controller;

import java.util.Collection;

public interface ChatController<PostMessageRequest> {

    public Integer login(String nickname, String color);

    public void logout(Integer userId);

    public Integer postMessage(PostMessageRequest request);

    public Collection getMessages(Integer userId, Integer lastReceivedMessageId);

    public Collection getUsers();

}
