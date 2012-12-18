package org.mulis.chat.api.model;

import java.util.Collection;

public interface ChatModel<ChatUser, ChatMessage, ChatPostedMessage> {

    public Integer login(String nickname, String color);

    public void logout(Integer userId);

    public String changeNickname(Integer userId, String newNickname);

    public String changeColor(Integer userId, String newColor);

    public Collection<ChatUser> getUsers();

    public Integer postMessage(ChatMessage message);

    public Collection<ChatPostedMessage> getMessages(Integer userId, Integer lastReceivedMessageId);

}
