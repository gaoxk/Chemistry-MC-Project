//quiz variables 
var text;

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

//quest object
function quest (ans, question, a, b, c, d,e){
    this.question = question;
    this.ans = ans;
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.e = e;
}


$(document).ready(function(){
//very primative object loading from text files
var info;
info = text.split("\n");
var q1 = new quest(info[0], info[1], info[2], info[3], info[4], info[5]);

//insert info into quiz
document.getElementById("qq1").innerHTML = q1.question;
document.getElementById("q1al").innerHTML = q1.a;
document.getElementById("q1bl").innerHTML = q1.b;
document.getElementById("q1cl").innerHTML = q1.c;
document.getElementById("q1dl").innerHTML = q1.d;
document.getElementById("q1el").innerHTML = q1.e;

//quiz logic
var cor1= ((q1.ans).trim()).toLowerCase();//NEED .trim!!!!!
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