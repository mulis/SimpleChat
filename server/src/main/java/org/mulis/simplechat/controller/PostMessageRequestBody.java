package org.mulis.simplechat.controller;

import org.mulis.simplechat.model.ChatMessage;

public class PostMessageRequestBody {

    private int userId;
    private ChatMessage message;

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public ChatMessage getMessage() {
        return message;
    }

    public void setMessage(ChatMessage message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return "PostMessageRequestBody{" +
                "userId=" + userId +
                ", message=" + message +
                "}";
    }

}
