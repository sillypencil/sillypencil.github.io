var boardWidth = 4;
var boardHeight = 4;
var board = new Array();
var score = 0;
var hasConflicted = new Array();
var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;

$(document).ready(function() {
	prepareForMobile();
	newgame();
})
function prepareForMobile(){
	$("#grid-container").css({"width": gridContainerWidth - 2*cellSpace,
	"height": gridContainerWidth - 2*cellSpace,
	"padding": cellSpace,
	"border-radius": 0.02*gridContainerWidth});

	$(".grid-cell").css({"width": cellSlideLength,
	"height": cellSlideLength,
	"border-radius": 0.02*cellSlideLength});
}

function newgame () {
	score = 0;
	updateScore( score );
	// 初始化棋盘格
	init();
	//在随机两个格子里生成数字
	generateOneNumber();
	generateOneNumber();

}

function init () {
	for( var i = 0; i < boardWidth; i++){
		for( var j = 0; j < boardHeight; j++){
			var gridCell = $("#grid-cell-"+i+"-"+j);
			gridCell.css({"left": getPosTop(i),
			"top": getPosLeft(j)})
		}
	}

	for( var i = 0; i < boardWidth; i++){
		board[i] = new Array();
		hasConflicted[i] = new Array();
		for(var j = 0; j < boardHeight; j++){
			board[i][j] = 0;
			hasConflicted[i][j] = false;
		}

	}

	updateBoardView();
}

function updateBoardView () {
	// body...
	$(".number-cell").remove();
	for( var i = 0; i < boardWidth; i++){
		for( var j = 0; j < boardHeight; j++){
			$("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>')
			var theNumberCell = $("#number-cell-"+i+"-"+j);

			if(board[i][j] === 0){
				theNumberCell.css({"width": 0,
					"height": 0,
					"top": getPosTop(i)+0.5*cellSlideLength,
					"left": getPosLeft(j)+0.5*cellSlideLength});
			}
			else{
				theNumberCell.css({"width": cellSlideLength,
					"height": cellSlideLength,
					"top": getPosTop(i),
					"left": getPosLeft(j),
					"background-color": getNumberBackgroundColor(board[i][j]),
					"color": getNumberColor(board[i][j])}).text(board[i][j]);
			}
			hasConflicted[i][j] = false;
		}
	}
	$(".number-cell").css({"line-height":cellSlideLength+"px",
	"font-size": 0.6*cellSlideLength+"px  "});
}

function generateOneNumber () {
	// body...
	// console.log("generateOneNumber")
	if(nospace( board )){
		// console.log("nospace")
		return false;
	}
	else{
		//随机一个位置
		// console.log("there is space")
		var randx = parseInt(Math.floor(Math.random() *4));
		var randy = parseInt(Math.floor(Math.random() *4));
		var times = 0;

		while( times < 30 ){
			if(board[randx][randy] === 0){
				// console.log("times = "+times);
				break;
			}
			else{
				randx = parseInt(Math.floor(Math.random() *4));
				randy = parseInt(Math.floor(Math.random() *4));
				times++;
				// console.log("times = "+times);
			}
		}
		//随机一个数字
		if( times == 30){
			// alert('times = 30')
			for(var i = 0; i < boardHeight; i++){
				for(var j = 0; j < boardWidth; j ++){
					if( board[i][j] === 0 ){
						randx = i;
						randy = j;
						break;
					}
				}
			}
			
		}
		var radNum =Math.random() < 0.2?4:2;
		// console.log(radNum)

		//在随机位置显示随机数字
		
		board[randx][randy] = radNum;

		showNumberAnimaion(randx, randy, radNum);
		return true;
	}
	
}

//键盘响应
$(document).keydown(function( event ){
	// console.log(event.keyCode);
	switch( event.keyCode ){
		case 37:  //left
			stopDefault(event);
			if( moveLeft() ){
				setTimeout(function(){
					generateOneNumber();
					isgameover();
					isComplete();
				}, 210);				
			}
			break;
		case 38:  //up
			stopDefault(event);
			if( moveUp() ){
				setTimeout(function(){
					generateOneNumber();
					isgameover();
					isComplete();
				}, 210);	
			}
			break;
		case 39: //right
			stopDefault(event);
			if( moveRight() ){
				setTimeout(function(){
					generateOneNumber();
					isgameover();
					isComplete();
				}, 210);	
			}
			break;
		case 40:  //down
			stopDefault(event);
			if( moveDown() ){
				setTimeout(function(){
					generateOneNumber();
					isgameover();
					isComplete();
				}, 210);	
			}
			break;
		case 32 ://new game
			stopDefault(event);
			newgame();
			break;
		default:  //default 
			break;
	}
});

//移动端划动响应
document.addEventListener("touchstart", function( event ){
	startx = event.touches[0].pageX;
	starty = event.touches[0].pageY;
})

document.addEventListener("touchend", function( event ){
	endx = event.changedTouches[0].pageX;
	endy = event.changedTouches[0].pageY;
	// console.log(endx + ", "+endy +", "+ startx +", "+starty);
	var deltax = endx - startx;
	var deltay = endy - starty;
	if( Math.abs(deltax) < 0.3*documentWidth && Math.abs(deltay) < 0.3*documentWidth ){
		return;
	}

	if( Math.abs(deltax) >= Math.abs(deltay) ){  //direction x
		if( deltax > 0 ){  //right
			if( moveRight() ){
				setTimeout(function(){
					generateOneNumber();
					isgameover();
					isComplete();
				}, 210);				
			}
		}else{  //left
			if( moveLeft() ){
				setTimeout(function(){
					generateOneNumber();
					isgameover();
					isComplete();
				}, 210);				
			}
		}
	}else{  //direction y
		if( deltay > 0 ){  //down
			if( moveDown() ){
				setTimeout(function(){
					generateOneNumber();
					isgameover();
					isComplete();
				}, 210);				
			}
		}else{  //up
			if( moveUp() ){
				setTimeout(function(){
					generateOneNumber();
					isgameover();
					isComplete();
				}, 210);				
			}
		}
	}
})

function isgameover(){
	if( nospace( board) && nomove( board)){
		// console.log('game over');
		gameover();
	}
	else{
		// console.log("game not over")
	}
}

function gameover(){
	setTimeout(function(){
		alert("game over");
	},1000);
}

function isComplete(){
	var cn = 2048;
	for( var i = 0; i < boardHeight; i++){
		for( var j = 0; j < boardWidth; j++){
			if(board[i][j] === cn){
				alert('恭喜您成功玩到' + cn);
				cn += cn;
			}
		}
	}
}

function moveLeft(){
	if(!canMoveLeft(board)){
		// console.log("can not move left");
		return false;
	}

	//canMoveLeft
	for( var i = 0; i < boardHeight; i++){
		for( var j = 1; j < boardWidth; j++){
			if(board[i][j] !== 0){
				// console.log(i+'-'+j+'!=0')
				for( var k = 0; k < j; k++){
					if( board[i][k] === 0 && noBlockHorizontal( i, k ,j, board)){
						//move
						// console.log("just move left");
						// console.log(i+"-"+k+" = 0");
						showMoveAnimation( i, j, i, k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					}else{
						if(board[i][k] === board[i][j]){
							// console.log('maybe move left and add');
							if( noBlockHorizontal( i, k ,j, board) && !hasConflicted[i][k]){
								// console.log('move left and add');
								//move & combine
								showMoveAnimation( i, j, i, k);
								board[i][k] += board[i][j];
								board[i][j] =0;
								score += board[i][k];
								hasConflicted[i][k] = true; 
								updateScore( score );
								continue;
							}
						}
					}
				}
			}
		}
	}

	setTimeout("updateBoardView()", 200);
	return true;
}

 function moveRight(){
	if(!canMoveRight(board)){
		// console.log("can not move right");
		return false;
	}

	//canMoveRight
	for( var i = 0; i < boardHeight; i++){
		for( var j = boardWidth-1; j >= 0; j--){
			if(board[i][j] !== 0){
				// console.log(i+'-'+j+'!=0')
				for( var k = boardWidth; k > j; k--){
					if( board[i][k] === 0 && noBlockHorizontal( i, j ,k, board)){
						//move
						// console.log("just move right");
						// console.log(i+"-"+k+" = 0");
						showMoveAnimation( i, j, i, k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					}else{
						if(board[i][k] === board[i][j]){
							// console.log('maybe move right and add');
							if( noBlockHorizontal( i, j ,k, board) && !hasConflicted[i][k]){
								// console.log('move right and add');
								//move & combine
								showMoveAnimation( i, j, i, k);
								board[i][k] += board[i][j];
								board[i][j] =0;
								hasConflicted[i][k] = true;
								score += board[i][k];
								updateScore( score );
								continue;
							}
						}
					}
				}
			}
		}
	}

	setTimeout("updateBoardView()", 200);
	return true;
}

function moveUp(){
	if(!canMoveUp(board)){
		// console.log("can not move Up");
		return false;
	}

	//canMoveUp
	for( var j = 0; j < boardWidth; j++){
		for( var i = 1; i < boardHeight; i++){
			if(board[i][j] !== 0){
				// console.log(i+'-'+j+'!=0')
				for( var k = 0; k < i; k++){
					if( board[k][j] === 0 && noBlockVertical( j, k ,i, board)){
						//move
						// console.log("just move Up");
						// console.log(i+"-"+k+" = 0");
						showMoveAnimation( i, j, k, j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue;
					}else{
						if(board[k][j] === board[i][j]){
							// console.log('maybe move Up and add');
							if( noBlockVertical( j, k ,i, board) && !hasConflicted[k][j]){
								// console.log('move Up and add');
								//move & combine
								showMoveAnimation( i, j, k, j);
								board[k][j] += board[i][j];
								board[i][j] =0;
								hasConflicted[k][j] = true;
								score += board[k][j];
								updateScore( score );
								continue;
							}
						}
					}
				}
			}
		}
	}

	setTimeout("updateBoardView()", 200);
	return true;
}

function moveDown(){
	if(!canMoveDown(board)){
		// console.log("can not move Down");
		return false;
	}

	//canMoveDown
	for( var j = 0; j < boardWidth; j++){
		for( var i = boardHeight-1; i >= 0; i--){
			if(board[i][j] !== 0){
				// console.log(i+'-'+j+'!=0')
				for( var k = boardHeight-1; k > i; k--){
					if( board[k][j] === 0 && noBlockVertical( j, i ,k, board)){
						//move
						// console.log("just move Down");
						// console.log(i+"-"+k+" = 0");
						showMoveAnimation( i, j, k, j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue;
					}else{
						if(board[k][j] === board[i][j]){
							// console.log('maybe move Down and add');
							if( noBlockVertical( j, i ,k, board) && !hasConflicted[k][j]){
								// console.log('move Down and add');
								//move & combine
								showMoveAnimation( i, j, k, j);
								board[k][j] += board[i][j];
								board[i][j] =0;
								hasConflicted[k][j] = true;
								score += board[k][j];
								updateScore( score );
								continue;
							}
						}
					}
				}
			}
		}
	}

	setTimeout("updateBoardView()", 200);
	return true;
}