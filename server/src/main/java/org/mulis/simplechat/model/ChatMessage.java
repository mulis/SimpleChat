package org.mulis.simplechat.model;

public class ChatMessage {

    private String senderNickname;
    private String receiverNickname;
    private String text;

    public String getSenderNickname() {
        return senderNickname;
    }

    public void setSenderNickname(String senderNickname) {
        this.senderNickname = senderNickname;
    }

    public String getReceiverNickname() {
        return receiverNickname;
    }

    public void setReceiverNickname(String receiverNickname) {
        this.receiverNickname = receiverNickname;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    @Override
    public String toString() {
        return "ChatMessage{" +
                "senderNickname='" + senderNickname + "'" +
                ", receiverNickname='" + receiverNickname + "'" +
                ", text='" + text + "'" +
                "}";
    }

}
