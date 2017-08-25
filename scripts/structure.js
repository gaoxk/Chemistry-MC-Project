//quiz variables 
var text;
var quest;

$(document).ready(function(){




//loading text
var client = new XMLHttpRequest();
client.open('GET', '/structure.txt', true);
client.onreadystatechange = function() {
    if (client.readyState === 4 && client.status === 200) {
        console.log(client.responseText);              
    }
}
client.send(null);






//quiz logic
var cor1= "a";
var cor2= "b";

document.getElementById("answers").onclick = function () {
    if(($('input[name=q1]:checked').val() + "" =="undefined") || ($('input[name=q2]:checked').val() + "" =="undefined")){
        alert("notdone");
    }else{
        $(".reveal").css("visibility","visible");

        if($('input[name=q1]:checked').val()==cor1){//correct answer
            $("#q1").css("color","green");//make everything green
        }else{//wrong answer
            $("#q1").css("color","red");//make everything red
        }

        if($('input[name=q2]:checked').val()==cor2){
            $("#q2").css("color","green");
        }else{
            $("#q2").css("color","red");
        }
    }
};

})


//quiz loading
$(window).on('load', function () {
  document.getElementById("qq1").innerHTML = cor1;
});