package org.mulis.simplechat.model;

import org.apache.log4j.Logger;
import org.mulis.simplechat.api.model.ChatModel;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Comparator;
import java.util.Date;
import java.util.Iterator;
import java.util.concurrent.ConcurrentSkipListMap;
import java.util.concurrent.ConcurrentSkipListSet;

@Service
public class SimpleChatModel implements ChatModel<ChatUser, ChatMessage, ChatPostedMessage> {

    private final static Logger logger = Logger.getLogger(SimpleChatModel.class);

    private final class UserNicknameComparator implements Comparator<ChatUser> {
        @Override
        public int compare(ChatUser user1, ChatUser user2) {
            return user1.getNickname().compareTo(user2.getNickname());
        }
    }

    ;

    private final ConcurrentSkipListSet<ChatUser> users = new ConcurrentSkipListSet<ChatUser>(new UserNicknameComparator());
    private final ConcurrentSkipListMap<String, ChatUser> nicknameUserMap = new ConcurrentSkipListMap<String, ChatUser>();
    private final ConcurrentSkipListMap<Integer, ChatUser> userIdUserMap = new ConcurrentSkipListMap<Integer, ChatUser>();
    private Integer lastUserId = -1;

    private final ConcurrentSkipListMap<Integer, ChatPostedMessage> postedMessages = new ConcurrentSkipListMap<Integer, ChatPostedMessage>();
    private Integer lastPostedMessageId = -1;

    @Override
    public Integer login(String nickname, String color) {

        Integer userId;

        if (nicknameUserMap.containsKey(nickname)) {

            ChatUser user = getUser(nickname);
            user.setColor(color);

            userId = user.getId();


        } else {

            userId = createUser(nickname, color);

        }

        return userId;

    }

    private ChatUser getUser(Integer userId) {
        return userIdUserMap.get(userId);
    }

    private ChatUser getUser(String nickname) {
        return nicknameUserMap.get(nickname);
    }

    synchronized private Integer createUser(String nickname, String color) {

        Integer userId = ++lastUserId;

        ChatUser user = new ChatUser();

        user.setNickname(nickname);
        user.setColor(color);
        user.setLastReceivedMessageId(lastPostedMessageId);
        user.setId(userId);

        users.add(user);
        nicknameUserMap.put(user.getNickname(), user);
        userIdUserMap.put(user.getId(), user);

        return userId;

    }

    public void logout(Integer userId) {

        if (userIdUserMap.containsKey(userId)) {

            ChatUser user = getUser(userId);

            userIdUserMap.remove(userId);
            nicknameUserMap.remove(user.getNickname());
            users.remove(user);

        }

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
        return users;
    }

    @Override
    public Integer postMessage(ChatMessage message) {
        return addMessage(message);
    }

    synchronized private Integer addMessage(ChatMessage message) {

        Integer messageId = ++lastPostedMessageId;

        ChatPostedMessage postedMessage = new ChatPostedMessage();
        postedMessage.setMessageId(messageId);
        postedMessage.setDate(new Date());
        postedMessage.setMessage(message);

        postedMessages.put(messageId, postedMessage);

        return messageId;

    }

    @Override
    public Collection<ChatPostedMessage> getMessages(Integer userId, Integer lastReceivedMessageId) {

        ChatUser user = getUser(userId);

        if (lastReceivedMessageId < 0) {
            lastReceivedMessageId = user.getLastReceivedMessageId();
        }

        Collection<ChatPostedMessage> messages = this.postedMessages.tailMap(lastReceivedMessageId + 1, true).values();

        user.setLastReceivedMessageId(lastReceivedMessageId + messages.size());

        Iterator<ChatPostedMessage> iterator = messages.iterator();
        ChatPostedMessage message;
        boolean match;

        while (iterator.hasNext()) {

            message = iterator.next();

            match = message.getMessage().getSenderNickname().equals(user.getNickname()) ||
                    message.getMessage().getReceiverNickname().equals(user.getNickname()) ||
                    message.getMessage().getReceiverNickname().isEmpty();

            if (!match) iterator.remove();

        }

        return messages;

    }

}
