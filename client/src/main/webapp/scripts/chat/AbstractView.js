Chat.AbstractView = function() {
}

Chat.AbstractView.prototype.loadResources = function(name) {

    var path = this.getPath(name);

    if (!this.isStyleLoaded(path)) {
        this.loadStyle(path + '/' + name + '.css');
    }

    this.loadTemplate(path + '/' + name + '.tmpl');

}

Chat.AbstractView.prototype.loadStyle = function(path) {

    var me = this;

    $.ajax({
        type : 'GET',
        url : path,
        dataType : 'text'
    }).
    success(function(data) {
        if (!me.isStyleLoaded(path)) {
            var ss = document.createElement("link");
            ss.type = "text/css";
            ss.rel = "stylesheet";
            ss.href = path;
            document.getElementsByTagName("head")[0].appendChild(ss);
            me.chat.element.trigger(me.chat.events.VIEW_STYLE_LOAD);
        }
    }).
    error(function(data) {
        me.chat.element.append('Chat view style file ' + name + '.css loading error.</br>');
    }).
    complete(function(data) {
    });

}

Chat.AbstractView.prototype.loadTemplate = function(path) {

    var me = this;

    $.ajax({
        type : 'GET',
        url : path,
        dataType : 'text'
    }).
    success(function(data) {
        me.chat.element.html(data);
        me.chat.element.trigger(me.chat.events.VIEW_TEMPLATE_LOAD);
    }).
    error(function(data) {
        me.chat.element.append('Chat view template file ' + name + '.tmpl loading error.</br>');
    }).
    complete(function(data) {
    });

}

Chat.AbstractView.prototype.getPath = function(name) {

    for (var i = 0; i < document.scripts.length; i++) {
        var scriptSrc = document.scripts.item(i).src;
        if (scriptSrc.indexOf(name) > -1) {
            return scriptSrc.substring(0, scriptSrc.lastIndexOf('/'));
        }
    }

}

Chat.AbstractView.prototype.isStyleLoaded = function(path) {

    var links = document.getElementsByTagName('link');

    for (var i = 0; i < links.length; i++) {
        if (links.item(i).rel == 'stylesheet' || links.item(i).type == 'text/css') {
            if (links.item(i).href.indexOf(path) > -1) {
                return true;
            }
        }
    }

    return false;

}

