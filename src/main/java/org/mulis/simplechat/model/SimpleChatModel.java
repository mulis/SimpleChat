package org.mulis.simplechat.model;

import org.apache.log4j.Logger;
import org.mulis.chat.api.model.ChatModel;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Date;
import java.util.Iterator;
import java.util.concurrent.ConcurrentSkipListMap;

@Service
public class SimpleChatModel implements ChatModel<ChatUser, ChatMessage, ChatPostedMessage> {

    private final static Logger logger = Logger.getLogger(SimpleChatModel.class);

    private final ConcurrentSkipListMap<Integer, ChatUser> users = new ConcurrentSkipListMap<Integer, ChatUser>();
    private final ConcurrentSkipListMap<String, Integer> userIds = new ConcurrentSkipListMap<String, Integer>();
    private Integer lastUserId = -1;

    private final ConcurrentSkipListMap<Integer, ChatPostedMessage> postedMessages = new ConcurrentSkipListMap<Integer, ChatPostedMessage>();
    private Integer lastPostedMessageId = -1;

    @Override
    public Integer login(String nickname, String color) {

        Integer userId;

        if (userIds.containsKey(nickname)) {

            userId = getUserId(nickname);

            ChatUser user = getUser(userId);
            user.setColor(color);

        } else {

            ChatUser user = new ChatUser();
            user.setNickname(nickname);
            user.setColor(color);
            user.setLastMessageId(lastPostedMessageId);

            userId = addUser(user);

        }

        return userId;
    }

    private Integer getUserId(String nickname) {
        return userIds.get(nickname);
    }

    private ChatUser getUser(Integer userId) {
        return users.get(userId);
    }

    synchronized private Integer addUser(ChatUser user) {

        Integer userId = ++lastUserId;

        userIds.put(user.getNickname(), userId);
        users.put(userId, user);

        return userId;

    }

    @Override
    public String changeNickname(Integer userId, String newNickname) {

        ChatUser user = getUser(userId);
        String oldNickname = user.getNickname();

        user.setNickname(newNickname);

        return oldNickname;

    }

    @Override
    public String changeColor(Integer userId, String newColor) {

        ChatUser user = getUser(userId);
        String oldColor = user.getColor();

        user.setColor(newColor);

        return oldColor;

    }

    @Override
    public Collection<ChatUser> getUsers() {
        return users.values();
    }

    @Override
    public Integer postMessage(ChatMessage message) {
        return addMessage(message);
    }

    synchronized private Integer addMessage(ChatMessage message) {

        logger.debug("synchronized private Integer addMessage(ChatMessage message)");
        logger.debug("message: " + message);

        Integer messageId = ++lastPostedMessageId;
        logger.debug("lastPostedMessageId: " + lastPostedMessageId);

        ChatPostedMessage postedMessage = new ChatPostedMessage();
        postedMessage.setMessageId(messageId);
        postedMessage.setDate(new Date());
        postedMessage.setMessage(message);

        postedMessages.put(messageId, postedMessage);

        logger.debug("postedMessage: " + postedMessage);

        return messageId;

    }

    @Override
    public Collection<ChatPostedMessage> getMessages(Integer userId) {

        ChatUser user = getUser(userId);

        Collection<ChatPostedMessage> userPostedMessages = postedMessages.tailMap(user.getLastMessageId(), false).values();

        user.setLastMessageId(user.getLastMessageId() + userPostedMessages.size());

        Iterator<ChatPostedMessage> iterator = userPostedMessages.iterator();
        ChatPostedMessage postedMessage;
        boolean match;

        while (iterator.hasNext()) {

            postedMessage = iterator.next();

            match = postedMessage.getMessage().getSenderNickname().equals(user.getNickname()) ||
                    postedMessage.getMessage().getReceiverNickname().equals(user.getNickname()) ||
                    postedMessage.getMessage().getReceiverNickname().isEmpty();

            if (!match) iterator.remove();

        }

        return userPostedMessages;

    }

}
