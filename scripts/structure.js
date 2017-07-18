/*
function getText(){
    // read text from URL location
    var request = new XMLHttpRequest({mozSystem: true});
    request.open('GET', 'http://www.puzzlers.org/pub/wordlists/pocket.txt', true);
    request.send(null);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            var type = request.getResponseHeader('Content-Type');
            if (type.indexOf("text") !== 1) {
                return request.responseText;  
            }
        }
    }
}
var outer_text = getText();
outer_text = outer_text.split('\n');
console.log(outer_text);
*/


var client = new XMLHttpRequest();
client.open('GET', '/structure.txt', true);
client.onreadystatechange = function() {
    if (client.readyState === 4 && client.status === 200) {
        console.log(client.responseText);              
    }
}
client.send(null);
