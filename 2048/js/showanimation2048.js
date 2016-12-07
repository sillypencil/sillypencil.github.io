function showNumberAnimaion (i, j, num) {
	// body...
	// console.log("showNumberAnimaion")
	var numberCell = $("#number-cell-" + i + "-" + j);
	numberCell.css({
		"background-color": getNumberBackgroundColor(num),
		"color": getNumberColor(num),
	}).text(num).animate({
		width: cellSlideLength+"px",
		height: cellSlideLength+"px",
		top: getPosTop(i),
		left: getPosLeft(j)
	},200);
}

function showMoveAnimation( fromx, fromy, tox, toy){
	var numberCell = $("#number-cell-" + fromx + "-" + fromy);
	numberCell.animate({
		top:getPosTop(tox),
		left:getPosLeft(toy)
	},200);
}

function updateScore( score ){
	$("#score").text( score );
}