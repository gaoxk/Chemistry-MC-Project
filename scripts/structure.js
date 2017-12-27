//quiz variables 
var text="lmao";



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
    console.log(text);
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
        i++//to get out of the ZzZ indicator

        q[arraycounter] = new quest(ans, qtext, info[i], info[i+1], info[i+2], info[i+3], info[i+4]);
        arraycounter++; 
        
        i+=4;
    }
    //all questions from the doc are now in the array q
    q = shuffle(q);
    return q;
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
     console.log(text);
});


$(document).ready(function(){
var q = arrayLoad();
//insert info into quiz
document.getElementById("qq1").innerHTML = q[0].question;
document.getElementById("q1al").innerHTML = q[0].a;
document.getElementById("q1bl").innerHTML = q[0].b;
document.getElementById("q1cl").innerHTML = q[0].c;
document.getElementById("q1dl").innerHTML = q[0].d;
document.getElementById("q1el").innerHTML = q[0].e;
document.getElementById("a1").innerHTML = q[0].ans;
document.getElementById("qq2").innerHTML = q[1].question;
document.getElementById("q2al").innerHTML = q[1].a;
document.getElementById("q2bl").innerHTML = q[1].b;
document.getElementById("q2cl").innerHTML = q[1].c;
document.getElementById("q2dl").innerHTML = q[1].d;
document.getElementById("q2el").innerHTML = q[1].e;
document.getElementById("a2").innerHTML = q[1].ans;
document.getElementById("qq3").innerHTML = q[2].question;
document.getElementById("q3al").innerHTML = q[2].a;
document.getElementById("q3bl").innerHTML = q[2].b;
document.getElementById("q3cl").innerHTML = q[2].c;
document.getElementById("q3dl").innerHTML = q[2].d;
document.getElementById("q3el").innerHTML = q[2].e;
document.getElementById("a3").innerHTML = q[2].ans;


//quiz logic
var cor1= ((q[0].ans).trim()).toLowerCase();//NEED .trim!!!!!
var cor2= ((q[1].ans).trim()).toLowerCase();
var cor3= ((q[2].ans).trim()).toLowerCase();

document.getElementById("answers").onclick = function () {
    if(($('input[name=q1]:checked').val() + "" =="undefined") || ($('input[name=q2]:checked').val() + "" =="undefined") || ($('input[name=q3]:checked').val() + "" =="undefined")){
        alert("not done boi");
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

        if($('input[name=q3]:checked').val()==cor3){
            $("#q3").css("color","green");
        }else{
            $("#q3").css("color","red");
        }
    }

};


//new questions logic
document.getElementById("next").onclick = function () {
    q.splice(0,1);
    q.splice(0,1);
    q.splice(0,1);
    if (q[0] === undefined){
        alert("ya done boi");
    }
    //insert info into quiz
    document.getElementById("qq1").innerHTML = q[0].question;
    document.getElementById("q1al").innerHTML = q[0].a;
    document.getElementById("q1bl").innerHTML = q[0].b;
    document.getElementById("q1cl").innerHTML = q[0].c;
    document.getElementById("q1dl").innerHTML = q[0].d;
    document.getElementById("q1el").innerHTML = q[0].e;
    document.getElementById("a1").innerHTML = q[0].ans;
    document.getElementById("qq2").innerHTML = q[1].question;
    document.getElementById("q2al").innerHTML = q[1].a;
    document.getElementById("q2bl").innerHTML = q[1].b;
    document.getElementById("q2cl").innerHTML = q[1].c;
    document.getElementById("q2dl").innerHTML = q[1].d;
    document.getElementById("q2el").innerHTML = q[1].e;
    document.getElementById("a2").innerHTML = q[1].ans;
    document.getElementById("qq3").innerHTML = q[2].question;
    document.getElementById("q3al").innerHTML = q[2].a;
    document.getElementById("q3bl").innerHTML = q[2].b;
    document.getElementById("q3cl").innerHTML = q[2].c;
    document.getElementById("q3dl").innerHTML = q[2].d;
    document.getElementById("q3el").innerHTML = q[2].e;
    document.getElementById("a3").innerHTML = q[2].ans;
}

})