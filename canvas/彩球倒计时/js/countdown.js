var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var RADIUS = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;
var CNT = 300;

const endTime = new Date().getTime() + 3600000;
var curShowTimeSeconds = getCurrentShowTimeSeconds();
var colors = ["#FFFFCC", "#CCFFFF", "#FFCCCC", "#99CCCC", "#FFCC99", "#FFCCCC", "#0099CC", "#FFFF00", "#0066CC", "#FF0033", "#99CC66", "#FF9900", "#996600", "#99CC99", "#00CC00", "#339999", "#CC99CC", "#990066", "#009966"]

var balls = [];

window.onload = function () {
	
	var canvas = document.getElementById('canvas');

	if( canvas.getContext("2d") ){
		canvas.width = WINDOW_WIDTH;
		canvas.height = WINDOW_HEIGHT;
		var context = canvas.getContext("2d");

		// render( context );
		setInterval(function(){
			render(context);
			update();
		},50);
	}
	else{
		alert("当前浏览器不支持Canvas，请更换浏览器之后再试")
	}
}

function getCurrentShowTimeSeconds(){
	var curTime = new Date();
	var ret = endTime - curTime.getTime();
	ret = Math.round( ret/1000 );

	return ret >= 0? ret : 0;
}

function update(){
	var nextShowTimeSeconds = getCurrentShowTimeSeconds();

	var nextHours = parseInt( nextShowTimeSeconds/3600 );
	var nextMinutes = parseInt( (nextShowTimeSeconds - nextHours * 3600)/60 );
	var nextSeconds = nextShowTimeSeconds%60;

	var curHours = parseInt( curShowTimeSeconds/3600 );
	var curMinutes = parseInt( (curShowTimeSeconds - curHours * 3600)/60 );
	var curSeconds = curShowTimeSeconds%60
	if( nextSeconds !== curSeconds){
		if( parseInt(curHours/10) !== parseInt(nextHours/10) )
		{
			addBalls( MARGIN_LEFT+0, MARGIN_TOP, parseInt(curHours/10));
		}
		if( parseInt(curHours%10) !== parseInt(nextHours%10) )
		{
			addBalls( MARGIN_LEFT+15*(RADIUS+1), MARGIN_TOP, parseInt(curHours%10));
		}
		if( parseInt(curMinutes/10) !== parseInt(nextMinutes/10) )
		{
			addBalls( MARGIN_LEFT+39*(RADIUS+1), MARGIN_TOP, parseInt(curMinutes/10));
		}
		if( parseInt(curMinutes%10) !== parseInt(nextMinutes%10) )
		{
			addBalls( MARGIN_LEFT+54*(RADIUS+1), MARGIN_TOP, parseInt(curMinutes%10));
		}
		if( parseInt(curSeconds/10) !== parseInt(nextSeconds/10) )
		{
			addBalls( MARGIN_LEFT+78*(RADIUS+1), MARGIN_TOP, parseInt(curSeconds/10));
		}
		if( parseInt(curSeconds%10) !== parseInt(nextSeconds%10) )
		{
			addBalls( MARGIN_LEFT+93*(RADIUS+1), MARGIN_TOP, parseInt(curSeconds%10));
		}

		curShowTimeSeconds = nextShowTimeSeconds;

	}
	updateBalls();
}

function updateBalls(){
	for( var i = 0; i < balls.length; i++){
		
		balls[i].x += balls[i].vx;
		balls[i].y += balls[i].vy;
		balls[i].vy += balls[i].g;

		if( balls[i].y >= WINDOW_HEIGHT - RADIUS){
			balls[i].y = WINDOW_HEIGHT - RADIUS;
			balls[i].vy = -balls[i].vy * 0.75;
		}
		if( balls[i].x <= RADIUS ){
			balls[i].x = RADIUS;
			balls[i].vx = -balls[i].vx;
		}
		if( balls[i].x >= WINDOW_WIDTH - RADIUS){
			balls[i].x = WINDOW_WIDTH - RADIUS;
			balls[i].vx = -balls[i].vx;
		}
	}

	while( balls.length > CNT){
		balls.shift();
	}
}

function addBalls(x,y,num){
	for( var i = 0; i < digit[num].length; i++){
		for( var j = 0; j < digit[num][i].length; j++){
			if(digit[num][i][j]){
				var aBal = {
					x: x + j*2*(RADIUS+1) + (RADIUS+1),
					y: y + i*2*(RADIUS+1) + (RADIUS+1),
					g: 1.5 + Math.random(),
					vx: Math.pow( -1, Math.ceil(Math.random()*100 ) ) *10 + 10*Math.random(),
					vy: -5*Math.random(),
					color: colors[Math.floor(Math.random()*colors.length)]
				}

				balls.push( aBal );
			}
		}
	}
}

function render( cxt ){

	console.log(balls.length);

	cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
	var hours = parseInt( curShowTimeSeconds/3600 );
	var minutes = parseInt( (curShowTimeSeconds - hours * 3600)/60 );
	var seconds = curShowTimeSeconds%60

	renderDigit( MARGIN_LEFT, MARGIN_TOP, parseInt(hours/10), cxt);
	renderDigit( MARGIN_LEFT+15*(RADIUS+1), MARGIN_TOP, parseInt(hours%10), cxt);
	renderDigit( MARGIN_LEFT + 30*(RADIUS+1), MARGIN_TOP, 10,cxt);
	renderDigit( MARGIN_LEFT + 39*(RADIUS+1), MARGIN_TOP, parseInt(minutes/10), cxt);
	renderDigit( MARGIN_LEFT + 54*(RADIUS+1), MARGIN_TOP, parseInt(minutes%10), cxt);
	renderDigit( MARGIN_LEFT + 69*(RADIUS+1), MARGIN_TOP, 10,cxt);
	renderDigit( MARGIN_LEFT + 78*(RADIUS+1), MARGIN_TOP, parseInt(seconds/10), cxt);
	renderDigit( MARGIN_LEFT + 93*(RADIUS+1), MARGIN_TOP, parseInt(seconds%10), cxt);

	for( var i = 0; i < balls.length; i++){
		cxt.fillStyle = balls[i].color;

		cxt.beginPath();
		cxt.arc( balls[i].x, balls[i].y, RADIUS, 0, 2*Math.PI, true	);
		cxt.closePath();

		cxt.fill();
	}
}

function renderDigit( x, y, num, cxt){
	cxt.fillStyle = "rgb(0,102,153)"; 
	for( var i = 0; i <　digit[num].length; i++){
		// console.log(i + ", "+digit[num][i]);
		for( var j = 0; j < digit[num][i].length; j++){
			if( digit[num][i][j] === 1 ){
				cxt.beginPath();
				cxt.arc( x+j*2*(RADIUS+1)+(RADIUS+1), y+i*2*(RADIUS+1)+(RADIUS+1), RADIUS, 0, 2*Math.PI);
				cxt.closePath();
				cxt.fill();
			}
		}
	}
}