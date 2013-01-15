var c1, c2, c3;

$('document').ready(function() {

    c1 = new Chat($('#chat1'), "http://localhost:8080/chat");
    c2 = new Chat($('#chat2'), "http://localhost:8080/chat");
    c3 = new Chat($('#chat3'), "http://localhost:8080/chat");

});

console.log();
