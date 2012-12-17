package org.mulis.simplechat.model;

import java.util.Date;

public class ChatPostedMessage {

    private int messageId;
    private Date date;
    private ChatMessage message;

    public int getMessageId() {
        return messageId;
    }

    public void setMessageId(int messageId) {
        this.messageId = messageId;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public ChatMessage getMessage() {
        return message;
    }

    public void setMessage(ChatMessage message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return "ChatPostedMessage{" +
                "messageId=" + messageId +
                ", date=" + date +
                ", message=" + message +
                "}";
    }

}
