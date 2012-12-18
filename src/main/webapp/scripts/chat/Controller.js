Chat.Controller = function(chat) {

    var me = this;

    this.chat = chat;

    $(this.chat.element).bind(
        'click',
        function(aEvent) {
            if (me.chat.user.userId > -1) {
                me.chat.messagesTimer.decreaseIntervalToMin();
            }
        }
    );

    $(this.chat.element).bind(
        chat.events.LOGIN_ATTEMPT,
        function() {
            me.login();
        }
    )

    $(this.chat.element).bind(
        chat.events.LOGIN_SUCCESS,
        function() {
            me.chat.usersTimer.start();
            me.chat.messagesTimer.start();
        }
    )

    $(this.chat.element).bind(
        chat.events.LOGOUT_ATTEMPT,
        function() {
            me.logout();
        }
    )

    $(this.chat.element).bind(
        chat.events.LOGOUT_SUCCESS,
        function() {
            me.chat.messagesTimer.stop();
            me.chat.usersTimer.stop();
        }
    )

    $(this.chat.element).bind(
        chat.events.POST_MESSAGE_ATTEMPT,
        function(event, message) {
            me.postMessage(message);
        }
    )

    $(this.chat.element).bind(
        chat.events.GET_MESSAGES_ATTEMPT,
        function(event, message) {
            me.getMessages();
        }
    )

    $(this.chat.element).bind(
        chat.events.GET_USERS_ATTEMPT,
        function(event, message) {
            me.getUsers();
        }
    )

}

Chat.Controller.prototype.login = function() {

    var me = this;

    $.ajax({
        'type' : 'GET',
        'url' : me.chat.serviceUrl + '/login?nickname=' + encodeURI(me.chat.user.nickname) + '&color=' + encodeURI(me.chat.user.color),
        'contentType' : 'text/plain',
        'dataType' : 'text',
        'processData' : false
    })
    .success(function(data) {
        var userId = parseInt(data);
        if (userId >= 0) {
            me.chat.user.userId = userId;
            me.chat.element.trigger(me.chat.events.LOGIN_SUCCESS);
        }
        else {
            me.chat.element.trigger(me.chat.events.LOGIN_FAILURE);
        }
     })
    .error(function(data) {
        me.chat.messagesTimer.increaseInterval();
        me.chat.element.trigger(me.chat.events.SERVICE_ERROR);
    })
    .complete(function(data) {
    })

}

Chat.Controller.prototype.logout = function() {

    var me = this;

    $.ajax({
        'type' : 'GET',
        'url' : me.chat.serviceUrl + '/logout?userId=' + encodeURI(me.chat.user.userId),
        'contentType' : 'text/plain',
        'dataType' : 'text',
        'processData' : false
    })
    .success(function(data) {
        me.chat.messagesTimer.stop();
        me.chat.usersTimer.stop();
        me.chat.element.trigger(me.chat.events.LOGOUT_SUCCESS);
     })
    .error(function(data) {
        me.chat.messagesTimer.increaseInterval();
        me.chat.element.trigger(me.chat.events.SERVICE_ERROR);
    })
    .complete(function(data) {
    })

}

Chat.Controller.prototype.postMessage = function(message) {

    var me = this;

    $.ajax({
        'type' : 'POST',
        'url' : me.chat.serviceUrl + '/message',
        'data' : JSON.stringify({
            userId : me.chat.user.userId,
            message : message,
        }),
        'contentType' : 'application/json',
        'dataType' : 'text',
        'processData' : false
    })
    .success(function(data) {
        var messageId = parseInt(data);
        if (messageId >= 0) {
            me.chat.element.trigger(me.chat.events.POST_MESSAGE_SUCCESS);
        }
        else {
            me.chat.element.trigger(me.chat.events.POST_MESSAGE_FAILURE);
        }
     })
    .error(function(data) {
        me.chat.messagesTimer.increaseInterval();
        me.chat.element.trigger(me.chat.events.SERVICE_ERROR);
    })
    .complete(function(data) {
    })

    me.chat.messagesTimer.decreaseIntervalToMin();

}

Chat.Controller.prototype.getMessages = function() {

    var me = this;

    $.ajax({
        'type' : 'GET',
        'url' : me.chat.serviceUrl + '/messages?userId=' + encodeURI(me.chat.user.userId) + "&lastReceivedMessageId=" + encodeURI(me.chat.user.lastReceivedMessageId),
        'contentType' : 'text/plain',
        'dataType' : 'json',
        'processData' : false
    }).success(function(data) {
        var result = data;
        if (result) {
            if (result.length > 0) {
                me.chat.user.lastReceivedMessageId = result[result.length - 1].messageId;
                me.chat.model.addNewMessages(result);
                me.chat.messagesTimer.decreaseIntervalToMin();
            }
            else {
                me.chat.messagesTimer.increaseInterval();
            }
            me.chat.element.trigger(me.chat.events.GET_MESSAGES_SUCCESS);
        }
        else {
            me.chat.messagesTimer.increaseInterval();
            me.chat.element.trigger(me.chat.events.GET_MESSAGES_FAILURE);
        }
     })
    .error(function(data) {
        me.chat.messagesTimer.increaseInterval();
        me.chat.element.trigger(me.chat.events.SERVICE_ERROR);
    })
    .complete(function(data) {
    })

}

Chat.Controller.prototype.getUsers = function(user) {

    var me = this;

    $.ajax({
        'type' : 'GET',
        'url' : me.chat.serviceUrl + '/users',
        'contentType' : 'text/plain',
        'dataType' : 'json',
        'processData' : false
    }).success(function(data) {
        var result = data;
        if (result) {
            if (result.length > 0) {
                me.chat.model.setUsers(result);
                me.chat.usersTimer.decreaseIntervalToMin();
            }
            else {
                me.chat.usersTimer.increaseInterval();
            }
            me.chat.element.trigger(me.chat.events.GET_USERS_SUCCESS);
        }
        else {
            me.chat.usersTimer.increaseInterval();
            me.chat.element.trigger(me.chat.events.GET_USERS_FAILURE);
        }
     })
    .error(function(data) {
        me.chat.usersTimer.increaseInterval();
        me.chat.element.trigger(me.chat.events.SERVICE_ERROR);
    })
    .complete(function(data) {
    })

}

