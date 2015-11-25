let poemLinesWrapper = document.getElementById('poem-lines');
let poemLinesChildren = poemLinesWrapper.querySelectorAll('span');

let poemOne = "Hey there + my name is + jonas mccoolster + whats yours?";
let poemTwo = "Greetings + i am called + james corvich + and your title is?";
let poemThree = "Salutations + my birth name is + eric alas + its a pleasure to meet you...";
let poemFour =  "Hello there sailor + i am known as + usidore the blue + do you have a name?";

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
	let poemOneSplit 	= poemOne.split(" + ");
	let poemTwoSplit 	= poemTwo.split(" + ");
	let poemThreeSplit 	= poemThree.split(" + ");
	let poemFourSplit 	= poemFour.split(" + ");
	for(let i = 0 ; i < poemOneSplit.length; ++i){
		//this is how many poems there are
		poems[i] = new Array(numberOfPoems);
		poems[i][0] = poemOneSplit[i];
		poems[i][1] = poemTwoSplit[i]; 
		poems[i][2] = poemThreeSplit[i]; 
		poems[i][3] = poemFourSplit[i]; 
	}

};

function initilizePoems(){
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
	splitPoems();
	initilizePoems();
}


init();