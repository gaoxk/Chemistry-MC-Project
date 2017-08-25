//quiz variables 
var text;
var quest;
//quiz loading
$(window).on('load', function () {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {//when the readystate changes
       // alert("readyState " + this.readyState + " stats " + this.status );   
        if (this.readyState == 4 && this.status == 200) {
          text = this.responseText;
        }
    };
    //file path is relative to HTML file, NOT this JS file. 
    //Third argument false indicates synchronous
    xhttp.open("GET", "texts/structure.txt", false);
    xhttp.send(); 
});



$(document).ready(function(){

document.getElementById("qq1").innerHTML = text;

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