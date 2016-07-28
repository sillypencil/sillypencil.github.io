var documentWidth = window.screen.availWidth;
var gridContainerWidth = documentWidth < 500?0.92*documentWidth:500;
var cellSlideLength = documentWidth < 500?0.18*documentWidth:100;
var cellSpace = documentWidth < 500?0.04*documentWidth:20;

function getPosTop (i) {
	// body...
	return cellSpace + i*(cellSlideLength+cellSpace);
}

function getPosLeft (j) {
	// body...
	return cellSpace + j*(cellSlideLength+cellSpace);
}

function getNumberBackgroundColor (number) {
	// body...
	var obj = {
		"2": "#eee4de",
		"4": "#ede0c8",
		"8": "#f2b179",
		"16": "#f59563",
		"32": "#f67c5f",
		"64": "#f65e3b",
		"128": "#edcf72",
		"256": "#edcc61",
		"512": "#9c0",
		"1024": "#33b5e5",
		"2048": "#09c",
		"4096": "#a6c",
		"8192": "#93c"
	}

	return obj[number];
}
function getNumberColor (number) {
	// body...
	// number<=4?return "#776a65":return "white";
	if(number <= 4){
		return "#776a65";
	}
	else{
		return "white";
	}
}

function nospace(board) {
	// body...
	for( var i = 0; i < boardHeight; i++){
		for( var j = 0; j < boardWidth; j++){
			if(board[i][j]===0)
				return false;
		}
	}
	return true;

}

function canMoveLeft(board){
	// console.log(board)
	for( var i = 0; i < boardHeight; i++){
		for( var j = 1; j < boardWidth; j++){
			// console.log(board[i][j-1] + "," + board[i][j]);
			if(board[i][j] !== 0 &&(board[i][j-1] === 0 || board[i][j-1] === board[i][j])){
				// console.log("can move left")
				return true;
			}
		}
	}
	// console.log("can not move left");
	return false;
}
function canMoveRight(board){
	for( var i = 0; i < boardHeight; i++){
		for( var j = 0; j < boardWidth-1; j++){
			if(board[i][j] !==0 && (board[i][j+1]===0 || board[i][j+1]===board[i][j])){
				// console.log("can move right")
				return true;
			}
		}
	}
	// console.log("can not move right");
	return false;
}
function canMoveUp(board){
	for( var j = 0; j < boardWidth; j++){
		for( var i = 1; i < boardHeight; i++){
			if(board[i][j] !==0 && (board[i-1][j]===0 || board[i-1][j]===board[i][j])){
				// console.log("can move up")
				return true;
			}
		}
	}
	// console.log("can not move up");
	return false;
}
function canMoveDown(board){
	for( var j = 0; j < boardWidth; j++){
		for( var i = 0; i < boardHeight-1; i++){
			if(board[i][j] !==0 &&(board[i+1][j]===0 || board[i+1][j]===board[i][j])){
				// console.log("can move down")
				return true;
			}
		}
	}
	// console.log("can not move down");
	return false;
}

function noBlockHorizontal(row, col1, col2, board){
	for( var i = col1+1; i < col2; i++){
		if( board[row][i]!==0)
			return false;
	}
	return true;
}

function noBlockVertical(col, row1, row2, board){
	for( var i = row1+1; i < row2; i++){
		if( board[i][col] !== 0)
			return false;
	}
	return true;
}

function nomove( board ){
	if( canMoveLeft( board )||
		canMoveRight( board )||
		canMoveUp( board )||
		canMoveDown( board ) ){
		// console.log("can move");
		return false;
	}
	// console.log("no move");	
	return true;
}

function stopDefault( e ){
	if( e&& e.preventDefault )
		e.preventDefault();
	else
		window.event.returnValue = false;
	return false;
}