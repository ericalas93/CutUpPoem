let poemSubmitter = document.getElementById('poem-input');
let poemLinesWrapper = document.getElementById('poem-lines');
let poemLinesChildren = poemLinesWrapper.querySelectorAll('span');

let addAnotherPoemBtn = document.getElementById('add-poem');
let submitButton = document.getElementById('submit-poems');

let poemOne = "Hey there + my name is + jonas mccoolster + whats yours?";
let poemTwo = "Greetings + i am called + james corvich + and your title is?";
let poemThree = "Salutations + my birth name is + eric alas + its a pleasure to meet you...";
let poemFour =  "Hello there sailor + i am known as + usidore the blue + do you have a name?";

let submittedPoems = [];

let numberOfPoems = 4;

//this is how many poems there are
let poems = new Array(numberOfPoems);

//each poem gets its own color
let styles = {
	0: 'red', 
	1: 'green', 
	2: 'orange', 
	3: 'blue', 
};


function splitPoems(){
	let poemsSplit = [];

	for(let poemNumber = 0; poemNumber < submittedPoems.length; ++poemNumber){
		poemsSplit.push(submittedPoems[poemNumber].split(" + "))
	}
	
 	for(let j = 0 ; j < poemsSplit.length; ++j){
	 	poems[j] = new Array(numberOfPoems)
	 	
	 	for(let k = 0; k < poemsSplit[j].length; ++k){
		 	poems[j][k] = poemsSplit[k][j]
	 	}
 	}


};

function initilizePoems(){
	//hide poem input box to begin intilizing the poems
	//using jQuery for browser support
	$("#poem-input").hide();
	$("#poem-lines").show();
	
	for(let i = 0; i < poemLinesChildren.length; ++i){
		let poemLineNumber = poemLinesChildren[i].getAttribute("data-line");
		poemLinesChildren[i].addEventListener("mouseover", hoverHandler(poemLineNumber));
		poemLinesChildren[i].style.color = styles[0];
		poemLinesChildren[i].innerHTML = poems[i][0];
	}
};

var hoverHandler = function(poemLineNumber){
	let lineNumber = poemLineNumber - 1;
	let poemLine = 0;
	
	function incrementNextPoemLine(){	
		
		if( (poemLine + 1) ===  poems[lineNumber].length || poems[lineNumber][poemLine + 1 ] === undefined)	
			poemLine = 0;
		else
			poemLine++;
			
		this.style.color = styles[poemLine]
 		this.innerHTML = poems[lineNumber][poemLine]
		
	}
	
	return incrementNextPoemLine;
};


function init(){
	//hide the poem display
	$("#poem-lines").hide();
	
	
	let poem = document.getElementById('poem-writing');
	
	
	addAnotherPoemBtn.addEventListener("click", () => {
		submittedPoems.push(poem.value);
		poem.value = "";
	});
	
	submitButton.addEventListener("click", () => {
		submittedPoems.push(poem.value);
		poem.value = "";
		splitPoems();
		initilizePoems();
	});
	
}


init();