package org.mulis.simplechat.model;

public class ChatUser {

    private String nickname;
    private String color;
    private Integer lastReceivedMessageId;
    private Integer id;

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    Integer getLastReceivedMessageId() {
        return lastReceivedMessageId;
    }

    void setLastReceivedMessageId(Integer lastMessageId) {
        this.lastReceivedMessageId = lastMessageId;
    }

    Integer getId() {
        return id;
    }

    void setId(Integer id) {
        this.id = id;
    }

}
