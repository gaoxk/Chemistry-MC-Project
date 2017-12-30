//quiz variables 
var text;
var correct=0;
var answered=0;
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

//function to shuffle an array
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

//object loading from text files
function arrayLoad(){
    var info, qtext, i;
    info = text.split("\n");//info is an array of every line of text in the file 
    var q = [];//primative array (non OOP arrays in js act like java arraylists) of questions for this page
    var arraycounter=0;
    for(i = 0; i<info.length;i++){
        var ans = info[i];
        i++;
        qtext="";
        while((info[i].trim()) !== "ZzZ"){
            qtext+=info[i] + "<br>";
            i++;
        }
        i++;//to get out of the ZzZ indicator

        q[arraycounter] = new quest(ans, qtext, info[i], info[i+1], info[i+2], info[i+3], info[i+4]);
        arraycounter++; 
        
        i+=4;
    }
    //all questions from the doc are now in the array q
    q = shuffle(q);
    return q;
}

//load questions into page
function arrayLoadPage(q){
    for (var i = 0; i < 5; i++) {
        var j = i+1;
        document.getElementById("qq" + j).innerHTML = q[i].question;
        document.getElementById("q" + j + "al").innerHTML = q[i].a;
        document.getElementById("q" + j+ "bl").innerHTML = q[i].b;
        document.getElementById("q" + j+ "cl").innerHTML = q[i].c;
        document.getElementById("q" + j+ "dl").innerHTML = q[i].d;
        document.getElementById("q" + j+ "el").innerHTML = q[i].e;
    }
}

//error bar functions
function barFn(nom){
    var bar = document.getElementById(nom);
    bar.className = "show";
    setTimeout(function(){ bar.className = bar.className.replace("show", ""); }, 3000);
}


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
    xhttp.open("GET", "texts/kakb.txt", false);
    xhttp.send(); 
});


$(document).ready(function(){
var q = arrayLoad();
arrayLoadPage(q);
barFn("refresher");

//quiz logic
var cor1= ((q[0].ans).trim()).toLowerCase();//NEED .trim!!!!!
var cor2= ((q[1].ans).trim()).toLowerCase();
var cor3= ((q[2].ans).trim()).toLowerCase();
var cor4= ((q[3].ans).trim()).toLowerCase();
var cor5= ((q[4].ans).trim()).toLowerCase();
$("#next").prop('disabled', true);

document.getElementById("answer").onclick = function () {    

    //if statement removed for testing only

  /*  if(($('input[name=q1]:checked').val() + "" =="undefined") || 
        ($('input[name=q2]:checked').val() + "" =="undefined") || 
        ($('input[name=q3]:checked').val() + "" =="undefined") ||
        ($('input[name=q4]:checked').val() + "" =="undefined") ||
        ($('input[name=q5]:checked').val() + "" =="undefined")){
        barFn("notDone");*/
 //   }else{ 
        $(".reveal").css("visibility","visible");
        if($('input[name=q1]:checked').val()==cor1){//correct answer
            $("#q1").css("color","green");//make everything green
            correct++;
        }else{//wrong answer
            $("#q1").css("color","red");//make everything red
        }
        if($('input[name=q2]:checked').val()==cor2){
            $("#q2").css("color","green");
            correct++;
        }else{
            $("#q2").css("color","red");
        }

        if($('input[name=q3]:checked').val()==cor3){
            $("#q3").css("color","green");
            correct++;
        }else{
            $("#q3").css("color","red");
        }

        if($('input[name=q4]:checked').val()==cor4){
            $("#q4").css("color","green");
            correct++;
        }else{
            $("#q4").css("color","red");
        }
        if($('input[name=q5]:checked').val()==cor5){
            $("#q5").css("color","green");
            correct++;
        }else{
            $("#q5").css("color","red");
        }
        answered+=5;
         $("#q1" + cor1 + "l").css("color", "green");
         $("#q2" + cor2 + "l").css("color", "green");
         $("#q3" + cor3 + "l").css("color", "green");
         $("#q4" + cor4 + "l").css("color", "green");
         $("#q5" + cor5 + "l").css("color", "green");
         $("#next").prop('disabled', false);

        $("#score").text("Score: " + correct + "/" + answered);
  ///  }
};


//new questions logic
document.getElementById("next").onclick = function () {
    $("#score").text("Score: " + correct + "/" + answered);
    for (var i = 0 ; i < 5; i++) {//move on to the next questions
        q.splice(0,1);
    }
    
    $("#q1" + cor1 + "l").css("color", "inherit");
    $("#q2" + cor2 + "l").css("color", "inherit");
    $("#q3" + cor3 + "l").css("color", "inherit");
    $("#q4" + cor4 + "l").css("color", "inherit");
    $("#q5" + cor5 + "l").css("color", "inherit");

    if (q[0] === undefined){
        barFn("out");
        for (var j = 1; j < 6; j++) {
            document.getElementById("q" + j).style.color = "grey";
        }
        $("#next").prop('disabled', true);
        $("#answer").prop('disabled', true);
    }else{
        cor1= ((q[0].ans).trim()).toLowerCase();//NEED .trim!!!!!
        cor2= ((q[1].ans).trim()).toLowerCase();
        cor3= ((q[2].ans).trim()).toLowerCase();
        cor4= ((q[3].ans).trim()).toLowerCase();
        cor5= ((q[4].ans).trim()).toLowerCase();
        
        arrayLoadPage(q);
        //insert info into quiz
        for (var j = 1; j < 6; j++) {
            //reset colors to black
            document.getElementById("q" + j).style.color = "inherit";
            //clear radio button
            $("input:radio[name=q" + j +"]").each(function () { $(this).prop('checked', false); });
        }        

        $("#next").prop('disabled', true);
    }
}

//error popup
document.getElementById("errorpopper").onclick = function () {
    var bar = document.getElementById("errorpop");
    bar.className = "show";
    $("#errorpop").css("visibility", "visible")
}
document.getElementById("errorpop").onclick = function (){
    $("#errorpop").fadeOut("slow"); 
    setTimeout(function() {$("#errorpop").css("visibility", "hidden"); }, 400);
}
})