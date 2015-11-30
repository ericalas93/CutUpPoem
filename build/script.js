let poemSubmitter = document.getElementById('poem-input');
let poemLinesWrapper = document.getElementById('poem-lines');
let resetPoems = document.getElementById('reset-poems');

let addAnotherPoemBtn = document.getElementById('add-poem');
let submitButton = document.getElementById('submit-poems');


document.getElementById('clipboard').addEventListener("click", copyToClipboard, false);

let submittedPoems = [];
let numberOfPoems = 0;
let poems = [];


/*
	Simple Function to copy to clipboard
	Since clipboard.js requires the element to be visible to copy, 
	we element in the DOM has been pushed outside of the screen and the user won't see it
*/

function copyToClipboard(){
	let textContent = document.getElementById('poem-lines').textContent;
	document.getElementById('copy-me').innerHTML = textContent;
	new Clipboard('.clippy');

}

/*
	This function takes all the submitted poems, splits them and stores them into a 1D array
	It then takes the 1D array. and adds them (the splitted poems) and stores them into a 2D array
	ex:
	
	index|	0	|	1	|	2	|
	-----|------------------------
	0	 |poem1 |poem1	|poem1	|
		 |line1	|line2	|line3	|
	-----|------------------------
	1	 |poem2 |poem2	|poem2	|
		 |line1	|line2	|line3	|
		 
*/
function splitPoems(){
	let poemsSplit = [];

	for(let poemNumber = 0; poemNumber < submittedPoems.length; ++poemNumber){
		poemsSplit.push(submittedPoems[poemNumber].split(" + "))
	}
	
 	for(let j = 0 ; j < numberOfPoems; ++j){
	 	let poemSplitLength = poemsSplit[j].length;
	 	poems[j] = new Array(poemSplitLength)
	 	for(let k = 0; k < poemSplitLength; ++k){
		 	let temp  = poemsSplit[j][k];
 		 	poems[j][k] = temp
	 	}
 	}

}

/*
	this function finds the max number of lines in all the poems
	one poem may have 4 lines, and the next may have 5, and so on
	it'll return the max number of lines of all the poems (ex, 5)
*/

function findMaxLinesInPoem(){
	let max = poems[0].length;
	for(let i = 0; i < numberOfPoems; ++i){
		if(max < poems[i].length)
			max = poems[i].length
	}
	return max;
}

/*
	this function finds the max number of lines from function findMaxLinesInPoem, 
	creates span elements to display the lines of the poems
*/

function initilizeHTML(){
	let maxLines = findMaxLinesInPoem();
	
	for(let i = 0; i < maxLines ; ++i){
		let newSpan = document.createElement("span");
		newSpan.setAttribute("data-line", `line-${i+1}`);
		poemLinesWrapper.appendChild(newSpan);
		poemLinesWrapper.appendChild(document.createElement("br"))
	}
	
}

/*
	this function takes each span element created in initilizeHTML, 
	adds an event handler based on the data-line attribute, 
	and places the first poem inside each span,
	if the max lines is greater than the number of lines in the first poem, 
	print an elipses (...)
*/

function initilizePoems(){	
	//hide poem input box to begin intilizing the poems
	//using jQuery for browser support
	$("#poem-input").fadeOut(1000, function(){
		$("#poem-lines-wrapper").fadeIn(0, function(){
			$("#poem-lines").fadeIn();
		});
	});
	
	let maxLines = findMaxLinesInPoem();
	let poemLinesChildren = poemLinesWrapper.querySelectorAll('span');

	for(let i = 0; i < maxLines; ++i){
		let poemLineNumber = poemLinesChildren[i].getAttribute("data-line");
		poemLinesChildren[i].addEventListener("mouseover", hoverHandler(i), false);
		poemLinesChildren[i].style.color = "#3f3f3f";
		
		if(poems[0][i] === undefined)
			poemLinesChildren[i].innerHTML = "... ";
		else
			poemLinesChildren[i].innerHTML = poems[0][i] + " ";
	}
}

/*
	as the user hovers over different poems, this functions
	changes the color a shade lighter so that the user can see
	the changes in poem lines
*/

function shadeColor(color, shade) {
    let colorInt = parseInt(color.substring(1),16);

    let R = (colorInt & 0xFF0000) >> 16;
    let G = (colorInt & 0x00FF00) >> 8;
    let B = (colorInt & 0x0000FF) >> 0;

    R = R + Math.floor((shade/255)*R);
    G = G + Math.floor((shade/255)*G);
    B = B + Math.floor((shade/255)*B);

    let newColorInt = (R<<16) + (G<<8) + (B);
    let newColorStr = `#${newColorInt.toString(16)}`;

    return newColorStr;
}

/*
	this functions uses closure to store information for each event listener
	it iterates though the 2D array through colums, not rows, displaying the line
	of each poem as the user hovers over them.
	if they reach the first line in the poem, (first if condition) return to first poem
	index, and restore default color.
	Similar to initilizePoems, if there is a blank (due to shortage of lines in poem) 
	display elipsis (...)
*/

var hoverHandler = function(poemLineNumber){
	let lineNumber = 0;
	let poemLine = poemLineNumber;
	let defaultColor = "#3f3f3f";
	let style = defaultColor;
	
	function incrementNextPoemLine(){	
		lineNumber++;
		style = shadeColor(style, +100)

		if( (lineNumber) ===  numberOfPoems ){
			lineNumber = 0;
			style = defaultColor;
		}
		
		this.style.color = style;
		if(poems[lineNumber][poemLine] ===  undefined)
			this.innerHTML = '... '
		else
	 		this.innerHTML = poems[lineNumber][poemLine] + " ";
	}
	
	return incrementNextPoemLine;
};

/*
	init function is called as soon as page is loaded, 
	hides certain elements, adds an event listener to three
	buttons, add poem, submit poems, and reset poems
*/
function init(){
	//hide the poem display
	$("#poem-lines, #poem-lines-wrapper").hide();
	
	//copied clipboard popup init
 	$('#clipboard').popover();
	
	let poem = document.getElementById('poem-writing');
	resetPoems.addEventListener("click", () => {
		submittedPoems = [];
		numberOfPoems = 0;
		poems = [];

		$("#poem-lines-wrapper").fadeOut(1000, function(){
			$("#poem-input").fadeIn(1000, function(){
				//once all animations are complete
				//remove span elements
				while(poemLinesWrapper.firstChild){
					poemLinesWrapper.removeChild(poemLinesWrapper.firstChild);
				}
			});
		});
	});
	
	
	addAnotherPoemBtn.addEventListener("click", () => {
		submittedPoems.push(poem.value);
		poem.value = "";
		numberOfPoems++;
	});
	
	submitButton.addEventListener("click", () => {
		if(poem.value !== ""){
			submittedPoems.push(poem.value);
			numberOfPoems++;
		}
		poem.value = "";
		splitPoems();
		initilizeHTML();
		initilizePoems();
	});
	
}




init();