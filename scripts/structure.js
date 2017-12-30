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
function arrayLoadPage(q, n){
    for (var i = 0; i < n; i++) {
        console.log(i);
        var j = i+1;
        $("#qq" + j).html(q[i].question);
        $("#q" + j + "al").html( q[i].a);
        $("#q" + j + "bl").html( q[i].b);
        $("#q" + j + "cl").html( q[i].c);
        $("#q" + j + "dl").html( q[i].d);
        $("#q" + j + "el").html( q[i].e);
    }
}
//clear a number of questions
function clearPage(n){
    for (var j = 5; j > n; j--) {
        $("#q" + j).css("display","none");
    }
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
    xhttp.open("GET", "texts/structure.txt", false);
    xhttp.send(); 
});


$(document).ready(function(){
var q = arrayLoad();
arrayLoadPage(q, 5);
barFn("refresher");

//quiz logic
var cor1= ((q[0].ans).trim()).toLowerCase();//NEED .trim!!!!!
var cor2= ((q[1].ans).trim()).toLowerCase();
var cor3= ((q[2].ans).trim()).toLowerCase();
var cor4= ((q[3].ans).trim()).toLowerCase();
var cor5= ((q[4].ans).trim()).toLowerCase();
var corrects = [cor1, cor2, cor3, cor4, cor5];


$("#next").prop('disabled', true);

document.getElementById("answer").onclick = function () {    
    console.log(q.length);
    //if statement removed for testing only

  /*  if(($('input[name=q1]:checked').val() + "" =="undefined") || 
        ($('input[name=q2]:checked').val() + "" =="undefined") || 
        ($('input[name=q3]:checked').val() + "" =="undefined") ||
        ($('input[name=q4]:checked').val() + "" =="undefined") ||
        ($('input[name=q5]:checked').val() + "" =="undefined")){
        barFn("notDone");*/
 //   }else{ 
        $(".reveal").css("visibility","visible");
        for (var i = 0; i < corrects.length; i++) {
            var j= i+1;
            if($('input[name=q'+ j +']:checked').val()==corrects[i]){//correct answer
                $("#q" + j).css("color","green");//make everything green
                correct++;
            }else{//wrong answer
                $("#q" + j).css("color","red");//make everything red
            }
            $("#q" + j + ""+ corrects[i] + "l").css("color","green");//make answer green
        }
        answered+=corrects.length;  
         $("#next").prop('disabled', false);

        $("#score").text("Score: " + correct + "/" + answered);
  ///  }
};


//new questions logic
document.getElementById("next").onclick = function () {
    $("#score").text("Score: " + correct + "/" + answered);
    q.splice(0,5);   

    for (var i = 0; i <5; i++) {
        var j=i+1;
        $("#q" + j + ""+ corrects[i] + "l").css("color","inherit");
    }

    if (q[0] === undefined ){
        barFn("out");
        for (var j = 1; j < 6; j++) {
            $("#q" + j).css("color", "grey");
        }
        $("#next").prop('disabled', true);
        $("#answer").prop('disabled', true);
    }else{
        var smaller = Math.min(q.length, 5);
        //reset correct answers
        for (var i = 0; i <smaller; i++) {
            corrects[i]=((q[i].ans).trim()).toLowerCase();
        }
        corrects.splice(smaller, 5);
        //insert info into quiz
        console.log("nextbutton, correctlength: " + corrects.length);
        arrayLoadPage(q, corrects.length);
        clearPage(corrects.length);
        
        for (var j = 1; j < 6; j++) {
            //reset colors to black
            $("#q" + j).css("color", "inherit");
            //clear radio button
            $("input:radio[name=q" + j +"]").each(function () { $(this).prop('checked', false); });
        }        

        $("#next").prop('disabled', true);
    }
}

//error bar functions
function barFn(nom){
    $("#" + nom).addClass("show");
    setTimeout(function(){ $("#" + nom).removeClass("show").addClass(""); }, 3000);
}
//error popup
document.getElementById("errorpopper").onclick = function () {
    $("#errorpop").addClass("show");
    $("#errorpop").css("visibility", "visible");
}
document.getElementById("errorpop").onclick = function (){
    $("#errorpop").fadeOut("slow"); 
    setTimeout(function() { $("#errorpop").removeClass("show").addClass(""); }, 400);
}
})