$(document).ready(function(){

var client = new XMLHttpRequest();
client.open('GET', '/structure.txt', true);
client.onreadystatechange = function() {
    if (client.readyState === 4 && client.status === 200) {
        console.log(client.responseText);              
    }
}
client.send(null);

var cor1= "a";
var cor2= "b";

document.getElementById("answers").onclick = function () {
    if(($('input[name=q1]:checked').val() + "" =="undefined") || ($('input[name=q2]:checked').val() + "" =="undefined")){
        alert("notdone");
    }else{
        $(".reveal").css("visibility","visible");

        if($('input[name=q1]:checked').val()==cor1){
            $("#q1").css("color","green");
        }else{
            $("#q1").css("color","red");
        }

        if($('input[name=q2]:checked').val()==cor2){
            $("#q2").css("color","green");
        }else{
            $("#q2").css("color","red");
        }
    }
};

})
