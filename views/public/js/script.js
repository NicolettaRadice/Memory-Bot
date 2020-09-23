var names;
var order = 7;
var ngrams = {};
var beginnings = [];
var lines, markov,x = 160, y = 240;
var menuLoaded = 0;
var label, input, checkbox, speakbutton, vslider, rslider, pslider; // UI
// var speech = new p5.Speech('Google UK English Female');
// speech.setVoice('Alice');
// speech.setLang('en-US');
var context = new AudioContext();
// var speechRec = new p5.SpeechRec('en-US');

var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
if (isMobile) {
  $(".phone").show();
}

 if (navigator.userAgent.match(/Mac/) && navigator.maxTouchPoints && navigator.maxTouchPoints > 1) {
  	$(".phone").show();
  }

var $tickerWrapper = $(".tickerwrapper  ");
var $list = $tickerWrapper.find("ul.list");
var $clonedList = $list.clone();
var listWidth = 15;

$list.find("li").each(function (i) {
			listWidth += $(this, i).outerWidth(true);
});

var endPos = $tickerWrapper.width() - listWidth;

$list.add($clonedList).css({
	"width" : listWidth + "px"
});

$clonedList.addClass("cloned1").appendTo($tickerWrapper);

//TimelineMax
var infinite = new TimelineMax({repeat: -1, paused: true});
var time = 700;

infinite
  .fromTo($list, time, {rotation:0.01,x:0}, {force3D:true, x: -listWidth, ease: Linear.easeNone}, 0)
  .fromTo($clonedList, time, {rotation:0.01, x:listWidth}, {force3D:true, x:0, ease: Linear.easeNone}, 0)
  .set($list, {force3D:true, rotation:0.01, x: listWidth})
  .to($clonedList, time, {force3D:true, rotation:0.01, x: -listWidth, ease: Linear.easeNone}, time)
  .to($list, time, {force3D:true, rotation:0.01, x: 0, ease: Linear.easeNone}, time)
  .progress(1).progress(0)
  .play();

//Pause/Play		
$tickerWrapper.on("mouseenter", function(){
	infinite.pause();
}).on("mouseleave", function(){
	infinite.play();
});

var $tickerWrapper2 = $(".tickerwrapper due");
var $list2 = $tickerWrapper2.find("ul.list");
var $clonedList2 = $list.clone();
var listWidth2 = 15;

$list.find("li").each(function (i) {
			listWidth += $(this, i).outerWidth(true);
});

var endPos = $tickerWrapper2.width() - listWidth;

$list.add($clonedList2).css({
	"width" : listWidth + "px"
});

$clonedList2.addClass("cloned1").appendTo($tickerWrapper2);

//TimelineMax
var infinite = new TimelineMax({repeat: -1, paused: true});
var time = 700;

infinite
  .fromTo($list2, time, {rotation:0.01,x:0}, {force3D:true, x: -listWidth, ease: Linear.easeNone}, 0)
  .fromTo($clonedList2, time, {rotation:0.01, x:listWidth}, {force3D:true, x:0, ease: Linear.easeNone}, 0)
  .set($list2, {force3D:true, rotation:0.01, x: listWidth})
  .to($clonedList2, time, {force3D:true, rotation:0.01, x: -listWidth, ease: Linear.easeNone}, time)
  .to($list2, time, {force3D:true, rotation:0.01, x: 0, ease: Linear.easeNone}, time)
  .progress(1).progress(0)
  .play();

//Pause/Play		
$tickerWrapper2.on("mouseenter", function(){
	infinite.pause();
}).on("mouseleave", function(){
	infinite.play();
});



let mic;
mic = new p5.AudioIn();
mic.start();
//load the txt file

if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))) {

    document.write('<a id="init" ontouchstart="javascript:sndInit();"></a>');

    function sndInit(){
    snd.play();
    snd.pause();
    document.getElementById('init').style.display = 'none';
    }
}

function preload() {
  names = loadStrings('../assets/memories.txt');
}

var triggers = [
	
{
  name: "skateboarding",
  sound: "https://actions.google.com/sounds/v1/sports/skateboard_kick_push.ogg"
},

{
  name: "rollerblading",
  sound: "./assets/sounds/rollerskates.mp3"
},

{
  name: "walking",
  sound: "https://actions.google.com/sounds/v1/foley/walk.ogg"
},

{
  name: "walk",
  sound: "https://actions.google.com/sounds/v1/foley/walk.ogg"
},


{
  name: "woods",
  sound: "./assets/sounds/nature.mp3"
},


{
  name: "festival",
  sound: "./assets/sounds/crowd.mp3"
},

{
  name: "beach",
  sound: "./assets/sounds/beach.mp3"
},

{
  name: "beaches",
  sound: "./assets/sounds/beach.mp3"
},

{
  name: "swimming",
  sound: "./assets/sounds/water.mp3"
},

{
  name: "turtles",
  sound: "./assets/sounds/nature.mp3"
},

{
  name: "turtle",
  sound: "./assets/sounds/nature.mp3"
},

{
  name: "key",
  sound: "https://actions.google.com/sounds/v1/doors/opening_door_with_key.ogg"
},

{
  name: "party",
  sound: "./assets/sounds/crowd.mp3"
},

{
  name: "parties",
  sound: "./assets/sounds/crowd.mp3"
},

{
  name: "arcade",
  sound: "./assets/sounds/arcade.mp3"
},

{
  name: "vulture",
  sound: "./assets/sounds/vulture.mp3"
},

{
  name: "sliding",
  sound: "./assets/sounds/sliding.mp3"
},

{
  name: "drive",
  sound: "./assets/sounds/Car.mp3"
},

{
  name: "football",
  sound: "./assets/sounds/Ball.wav"
},


{
  name: "park",
  sound: "./assets/sounds/nature.mp3"
},

{
  name: "biking",
  sound: "https://actions.google.com/sounds/v1/transportation/bicycle_pedaling.ogg"
},

{
  name: "bicycles",
  sound: "https://actions.google.com/sounds/v1/transportation/bicycle_pedaling.ogg"
},

{
  name: "coffee",
  sound: "./assets/sounds/drinking.mp3"
},

{
  name: "calm",
  sound: "./assets/sounds/Silence.mp3"
},

{
  name: "silent",
  sound: "./assets/sounds/Silence.mp3"
},

{
  name: "silence",
  sound: "./assets/sounds/Silence.mp3"
},

{
  name: "breathe",
  sound: "./assets/sounds/Breathing.wav"
},

{
  name: "Lego",
  sound: "./assets/sounds/Lego.wav"
},

{
  name: "river",
  sound: "./assets/sounds/River.mp3"
},

{
  name: "firework",
  sound: "./assets/sounds/fireworks.mp3"
},

{
  name: "fireworks",
  sound: "./assets/sounds/fireworks.mp3"
},

{
  name: "restaurant",
  sound: "./assets/sounds/Restaurant.mp3"
},

{
  name: "register",
  sound: "./assets/sounds/Register.wav"
},

{
  name: "street",
  sound: "./assets/sounds/street.mp3"
},
	
{
  name: "running",
  sound: "./assets/sounds/running.mp3"
},

{
  name: "rainy",
  sound: "./assets/sounds/rain.mp3"
},

{
  name: "stir",
  sound: "./assets/sounds/Stirr.wav"
},

{
  name: "goat",
  sound: "./assets/sounds/Goat.mp3"
},

{
  name: "pizzeria",
  sound: "./assets/sounds/Restaurant.mp3"
},

{
  name: "talked",
  sound: "./assets/sounds/Talking.mp3"
},

{
  name: "summer",
  sound: "./assets/sounds/summer.mp3"
},

{
  name: "summers",
  sound: "./assets/sounds/summer.mp3"
},

{
  name: "cooks",
  sound: "./assets/sounds/cooking.wav"
},

{
  name: "Disney",
  sound: "./assets/sounds/crowd.mp3"
},


{
  name: "laughing",
  sound: "./assets/sounds/laughing.mp3"
},

{
  name: "dogs",
  sound: "./assets/sounds/dog.mp3"
},

{
  name: "dog",
  sound: "./assets/sounds/dog.mp3"
},

{
  name: "duck",
  sound: "./assets/sounds/duck.mp3"
},

{
  name: "lake",
  sound: "./assets/sounds/water.mp3"
},


{
  name: "cats",
  sound: "./assets/sounds/cat.mp3"
},

{
  name: "New Years Eve",
  sound: "./assets/sounds/fireworks.mp3"
},

{
  name: "countryside",
  sound: "./assets/sounds/nature.mp3"
},

{
  name: "nature",
  sound: "./assets/sounds/nature.mp3"
},

{
  name: "train",
  sound: "./assets/sounds/train.mp3"
},

{
  name: "water",
  sound: "./assets/sounds/water.mp3"
},

{
  name: "fell",
  sound: "./assets/sounds/fell.mp3"
},

{
  name: "rhymes",
  sound: "./assets/sounds/rhymes.mp3"
},

{
  name: "night",
  sound: "./assets/sounds/night.mp3"
},

{
  name: "cicadas",
  sound: "./assets/sounds/cicada.mp3"
},

{
  name: "drinking",
  sound: "./assets/sounds/drinking.mp3"
},

{
  name: "run",
  sound: "./assets/sounds/running.mp3"
},

{
  name: "crickets",
  sound: "./assets/sounds/crickets.mp3"
},

{
  name: "chirping",
  sound: "./assets/sounds/chirping.mp3"
},

{
  name: "crowd",
  sound: "./assets/sounds/crowd.mp3"
},
				
{
  name: "song",
  sound: "./assets/sounds/song.mp3"
},
				
{
  name: "singing",
  sound: "./assets/sounds/Singing.mp3"
},

];

const cities = ["Bucharest, Romania", "Sydney, Australia", "Torino, Italy", "Chiasso, Switzerland", "Lugano, Switzerland", "Zurich, Switzerland", "Potenza, Italy", "Matera, Italy", "Groningen, The Netherlands", "Antwerp, Belgium", "El Bolson, Argentina", "Trelew, Argentina", "Naples, Italy", "Rome, Italy", "Seattle, USA", "Rio de Janeiro, Brasil", "Como, Italy", "Geneva, Switzerland", "Paris, France"];

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const day = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "27", "28"];

const hours = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];

const minutes = ["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"];

const num  = ["3", "4", "5", "6", "7"];

const year = ["2000", "2001", "2002", "2003", "2004", "2010", "2019", "2018", "2017", "2015", "2014", "2012"];


function scrollPage() {
  $("html, body").animate({ scrollTop: $(document).height() }, 1000);
};

function scrollPage2() {
  $("html, body").animate({ scrollTop: $(document).height() }, 100);
};


  
  


//bot
function setup() {
  noCanvas;

  lines = [];
  markov = new RiMarkov(4);
  markov.loadText(names.join(' '));
  
  var buttonStart = document.getElementById("start");
	
  buttonStart.onclick = function(){ 
  buttonStart.style.visibility = "hidden";
  var hide = document.getElementById("demo");
  hide.style.visibility = "visible";
	  
  var hide2 = document.getElementById("circle");
  hide2.style.visibility = "visible";
	  
  var hide3 = document.getElementById("none");
  hide3.style.display = "none";

  var speechRec = new p5.SpeechRec('en-US', gotSpeech); // new P5.SpeechRec object
  let continuous = false;
  
  let interim = false;
  speechRec.onEnd = restart;
  speechRec.start(continuous, interim);
  getAudioContext().resume();

  
  // speech.listVoices();
  // speech.setVoice('Kate');
  // speech.setRate(1);
  // speech.setPitch(1);
  

  function restart() {
    speechRec.start();
  };


 


(function() {
  var visited = sessionStorage['visited'];
  if (!visited) {
     init();
     sessionStorage['visited'] = true;
  } else {
    chooseVoice(); 
    play();
	// setTimeout(() => 
	// {speech.speak("Hello, how can I be of help?"); }, 1000); 
    document.querySelector("#demo").innerHTML = "Hello, how can I be of help?<hr><span class='span4'>Speak 'I would like to have a new memory' to get a new memory. <br>Speak 'I would like to leave a memory in the archive' to leave a memory.";
    Timer();
    document.getElementById("p").innerText += "You are now connected to MemoryBot";
    
    }

  function init() {
    chooseVoice(); 
    play();
    // setTimeout(() => {  speech.speak("Hello and welcome to MemoryBot! What can I help you with?"); }, 1000); 
    document.querySelector("#demo").innerHTML = "Hello and welcome to MemoryBot!</br>What can I help you with?<hr><span class='span4'>  Speak 'I would like to have a new memory' to get a new memory. <br>Speak 'I would like to leave a memory in the archive'to leave a memory.";
    Timer()
    document.getElementById("p").innerText += "You are now connected to MemoryBot";
  }
}());

  function gotSpeech() {

    var mostrecentword = speechRec.resultString.split(' ').pop();
    if(speechRec.resultValue && mostrecentword.indexOf("memory")!==-1) { 
      document.getElementById("p").innerText = "Collecting memories...";
      // document.querySelector(".robotMessage").remove();
      setTimeout(() => { 
        Reply();
		let hide4 = document.getElementById("demo");
  		hide4.style.display = "none";
        // scrollPage()
        chooseVoice(); 
        // speech.speak(lines);
        play(); 
        
    
       
    }, 2000);


    document.getElementById("p").innerText = "Collecting memory..."
    setTimeout(() => {
      StopTimer()
	  let hide4 = document.getElementById("demo");
  	  hide4.style.display = "none";
      var elements = document.querySelectorAll(".robotMessage");
var message = elements[elements.length-1]; //get last message
const text = message.innerText;

for (let trigger of triggers) {
   if (text.toLowerCase().indexOf(trigger.name.toLowerCase()) !== -1) {
        var track = new Audio(trigger.sound);
        track.load();
        track.play();
        track.volume = 0.5;
       $(track).animate({volume: 1}, 3000);
	   if(track.currentTime>20){
		track.pause();
		}
	   
            // console.log(trigger.name);
            var str = document.body.innerHTML;
            var toChange = [/skateboarding/ig, /rollerblading/ig, /walking/ig, /walk/ig, /woods/ig, /festival/ig, /beach/ig, /beaches/ig, /swimming/ig, /turtles/ig, /turtle/ig, /key/ig, /party/ig, /parties/ig, /arcade/ig, /vulture/ig, /sliding/ig, /drive/ig, /football/ig, /park/ig, /biking/ig, /bicycles/ig, /coffee/ig, /calm/ig, /silent/ig, /silence/ig, /breathe/ig, /lego/ig, /river/ig, /firework/ig, /fireworks/ig, /restaurant/ig, /register/ig, /street/ig, /running/ig, /rainy/ig, /stir/ig, /goat/ig, /pizzeria/ig, /talked/ig, /summer/ig, /summers/ig, /cooks/ig, /Disney/ig, /laughing/ig, /dogs/ig, /dog/ig, /duck/ig, /lake/ig, /cats/ig, /New Years Eve/ig, /countryside/ig, /nature/ig, /train/ig, /water/ig, /fell/ig, /rhymes/ig, /night/ig, /cicadas/ig, /drinking/ig, /run/ig, /crickets/ig, /chirping/ig, /crowd/ig, /song/ig, /singing/ig];
            for (let i = 0; i < triggers.length; i++) {
              str = str.replace(toChange[i], `<span class="span">${triggers[i].name}</span>`);
              document.body.innerHTML = str;
              console.log(toChange[i], `<span>${triggers[i].name}</span>`);
            }
          }
        }
             

          }, 6000);
    Timer();
    // scrollPage()
    setTimeout(() => {document.getElementById("p").textContent = document.getElementById("p").textContent.replace("Memory ready", "You are connected with MemoryBot")}, 75000);

   
   
    
    
    
     
    }
    else if (speechRec.resultValue && mostrecentword.indexOf("archive")!==-1) {
      
      chooseVoice(); 
      scrollPage2();
      play();
      // setTimeout(() => {  speech.speak("Leave your memory under here:"); }, 2000); 
      // var p3 = createP("Leave your memory under here:");
      // p3.class('robotMessage');
      // document.querySelector(".robotMessage").remove();
      play();
      StopTimer();
      input = createElement('textarea');
      input.elt.placeholder = 'Write your memory here, it will be safely stored in the Memory Archive and used for a memory of somebody else (Note: this memory will be publicly shown)';
      input.elt.rows = 10;
      // inpt.elt.cols = 32;
      createElement("br");
      
      inputCity = createElement('textarea');
      inputCity.elt.placeholder = "City where you're from";
      inputCity.elt.rows = 1;
      inputEmail = createElement('textarea');
      inputEmail.elt.placeholder = 'Please write here your email (Optional / your Email will NEVER be publicly dispayed!)';
      inputEmail.elt.rows = 1;
	  inputTime = createInput('2020-0kk-28', 'date');
	  inputTime.elt.placeholder = 'aprox. date of the memory'
		
	  inputEmail.name = "email";
	  inputCity.name = "city";
	  input.name = "text";
	  inputTime.name = "time";
	  // console.log(input.name);
      input.class('memory');
      inputCity.class('memory');
      inputEmail.class('memory');
	  inputTime.class('memory');
      inputCity.id('city');
      inputEmail.id('email');
	  inputTime.id('time');

      var button = document.createElement("button");
      button.textContent = "SEND";
      // button.id('send');
	
	  

      document.body.appendChild(button);
	
	

      button.onclick = function(){
		  
	var email = inputEmail.value();
	var date = inputTime.value();
	var text = input.value();
	var city = inputCity.value();
		
	var data = {email, text, city, date};
	const options = {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify(data)
	};
	  
	fetch('/', options);
		  
		  
		  
		  
		  
		  
        document.getElementById("p").innerText = "Saving memory..."
        play();
        // console.log(input.value());
        // console.log(inputTime.value());
        // console.log(inputCity.value());
        document.querySelector(".memory").remove();
        document.getElementById("time").remove();
		document.getElementById("email").remove();
        document.getElementById("city").remove();
        document.getElementById("p").innerText = "Memory saved in archive.";
        button.style.visibility = "hidden";
        var p3 = createDiv("Thank you! Your memory is safely stored! Can I do anything else?");
        // setTimeout(() => {  speech.speak("Thank you! Your memory is safelu stored! Can I do anything else?"); }, 2000); 
        Timer();
        
        p3.class("robotMessage");
        // scrollToBottom();
        
        setTimeout(() => {document.getElementById("p").textContent = document.getElementById("p").textContent.replace("Memory saved in archive", "You are connected with MemoryBot")}, 30000);
    }
    
  //  setTimeoutsetTimeout(() => { document.getElementById("p").innerText += "You are now connected to MemoryBot"}, 6000);
    } else if (speechRec.resultValue && mostrecentword.indexOf("hello")!==-1) {
      play();
      // var p3 = createDiv("Hello to you! How can I be of help?");
      // p3.class("robotMessage");
      // setTimeout(() => {  speech.speak("Hello to you! How can I be of help?"); }, 2000);
      scrollPage();
      Timer();
    }

    else if (speechRec.resultValue && mostrecentword.indexOf("thanks")!==-1) {
      play();
      var p3 = createDiv("You are more than welcome, I'm glad to be of help!");
      p3.class("robotMessage");
      // setTimeout(() => {  speech.speak("You are more than welcome, I'm glad to be of help!"); }, 2000);
      scrollPage();
      Timer();
    }

    else if (speechRec.resultValue && mostrecentword.indexOf("thank")!==-1) {
      play();
      var p3 = createDiv("You are more than welcome, I'm glad to be of help!");
      p3.class("robotMessage");
      // setTimeout(() => {  speech.speak("You are more than welcome, I'm glad to be of help!"); }, 2000);
      scrollPage();
      Timer();
    }
   
    else if (speechRec.resultValue && mostrecentword.indexOf("name")!==-1) {
      play();
      var p3 = createDiv("My name is MemoryBot but my creator calls me Eli.");
      p3.class("robotMessage");
      setTimeout(() => {  speech.speak("My name is MemoryBot but my creator calls me Eli."); }, 2000);
      scrollPage();
      Timer();
    };





    
  

    

    //text-to-speach
  
    speech.onLoad = voiceReady;

    function voiceReady() {
      console.log('voice ready');
    }
    
    

}
}



function Reply() {
  x = y = 50;
  lines = markov.generateSentences(3);
  const randomPlace = cities[Math.floor(Math.random() * cities.length)];
  const randomHour = hours[Math.floor(Math.random() * hours.length)];
  const randomMinute = minutes[Math.floor(Math.random() * minutes.length)];
  const randomMonth = months[Math.floor(Math.random() * months.length)];
  const randomDay = day[Math.floor(Math.random() * day.length)]; 
  const randomMemoryN = num[Math.floor(Math.random() * num.length)];
  const randomYear = year[Math.floor(Math.random() * year.length)];
  const randomNum = Math.floor(Math.random() * 10 + 1);
  const randomG = Math.floor(Math.random() * 6 + 2);
  var reply = createDiv(
	  					 lines.join(' ') 
	  					+ '</br><hr>' 
	  					+ '<span class="span5">Memory Info:</span>'
						+ '</br>'
	  					+ '<span class="span5">This memory was generated in </span><span class="span5"> ' 
                        + randomG
                        + ' </span><span class="span5">seconds and it is similar to </span><span class="span5">' 
	  					+ randomNum 
	  					+ "</span><span class='span5'> other memories.</span> "
	  					+ '<span class="span5">The place of the memory is</span><span class="span5"> ' 
                        + randomPlace
                        + '</span><span class = "span5"> and the date is </span><span class="span5">' 
                        + randomDay
                        + '</span><span class="span5"> </span></span><span class="span5">'
                        + randomMonth 
                        + '</span><span class="span5"> </span><span class="span5">'
                        + randomYear 
                        + '</span><span class="span5">. This is a collection of memories of </span><span class="span5">' 
                        + randomMemoryN 
                        + '</span><span class="span5"> people.</span>'
						+ "<span class='span4'><hr>If you haven't done that yet, I suggest you to leave a memory in the archive.<br> Thank you very much for using MemoryBot, please feel free to ask for a new memory.</span>"
					   
					   );
	


  reply.class('robotMessage');
  document.getElementById("p").innerText = "Memory ready.";

  
}

var time;

function Timer() {  
  time = setTimeout(() => { 
    // scrollPage();
    }
    , 120000);
}

function StopTimer() {
  clearTimeout(time);
}


function setVolume(){
	speech.setVolume(50);
}

function setRate(){
	// speech.setRate(-1);
}

function setPitch(){
	// speech.setPitch(1.8);
}




function chooseVoice() {
  // setPitch();
  // setRate();
  // setVolume();
  
  
}


function play() {
  var audio = new Audio('../assets/sounds/notification/juntos.ogg');
  audio.play();
}


// const messages = document.getElementsByClassName('robotMessage');
// function scrollToBottom() {
//   messages.scrollTop = messages.scrollHeight;
// }

// change skins + voice
// function changeSkin() {
//   var color = document.getElementById('change').value;
//   var font = document.getElementById('change').find(':selected').data('font');
//   console.log(font);
  

// }



function setVoice(){
  // speech.setVoice('Fiona');
  // speech.listVoices();
  
}
}





