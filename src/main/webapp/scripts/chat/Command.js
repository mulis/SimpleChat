Chat.Command = [
{

    name : "login",
    arguments : "nickname password color",
    description : "logging in to chat",
    run : function() {

        try {

            if (this.user.userId == -1) {

                if (arguments.length == 1) {
                    this.user.nickname = arguments[0];
                } else if (arguments.length == 2) {
                    this.user.nickname = arguments[0];
                    this.user.color = arguments[1];
                } else {
                    throw("Wrong login command arguments number.");
                }

                this.element.trigger(this.events.LOGIN_ATTEMPT);

            } else {
                throw("You must logout before login.");
            }

        } catch (exception) {
            this.view.printMessage(exception);
        }

    }

},

{

    name : "logout",
    arguments : "",
    description : "logging out from chat",
    run : function() {

        try {

            if (this.user.userId > -1) {
                this.element.trigger(this.events.LOGOUT_ATTEMPT);
            }
            else {
                throw("You must login before logout.");
            }

        } catch (exception) {
            this.view.printMessage(exception);
        }

   }

},

{

    name : "clear",
    arguments : "",
    description : "clear output",
    run : function() {

        this.view.clearMessagesOutput();

    }

},

{

    name : "help",
    arguments : "",
    description : "print help",
    run : function() {

        this.view.printMessage("Available commands:");
        for (var i = 0; i < Chat.Command.length; i++) {
            this.view.printMessage("." + Chat.Command[i].name + " " + Chat.Command[i].arguments + " - " + Chat.Command[i].description);
        }

   }

}]

Chat.Command.wire = function(chat) {
    for (var i = 0; i < Chat.Command.length; i++) {
        chat[Chat.Command[i].name] = Chat.Command[i].run;
    }
}
