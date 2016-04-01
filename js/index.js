function domReady(fn){
	if(document.addEventListener){
		document.addEventListener('DOMContentLoaded',function(){
			fn&&fn();	
		},false);	
	}else{
		document.attachEvent('onreadystatechange',function(){
			if(document.readyState=='complete'){
				fn&&fn();	
			}	
		});	
	}	
}
function rnd(n,m){
	return parseInt(n+Math.random()*(m-n));
}

function addEvent(obj,fn,sEv){
	if(obj.addEventListener){
		obj.addEventListener(sEv,fn,false);
	}else{
		obj.attachEvent('on'+sEv,fn);
	}
}
function removeEvent(obj,fn,sEv){
	if(obj.removeEventListener){
		obj.removeEventListener(sEv,fn,false);
	}else{
		obj.detachEvent('on'+sEv,fn);
	}
}
function getStyle(obj,sName){
	return (obj.currentStyle||getComputedStyle(obj,false))[sName];
}
function startMove(obj,json,options){
	options = options || {};
	options.duration = options.duration||700;
	options.easing = options.easing||'ease-out';
	
	var start = {};
	var dis = {};
	for(var name in json){
		start[name] = parseFloat(getStyle(obj,name));
		if(isNaN(start[name])){
			switch(name){
				case 'left':
					start[name] = obj.offsetLeft;
					break;
				case 'top':
					start[name] = obj.offsetTop;
					break;
				case 'width':
					start[name] = obj.offsetWidth;
					break;
				case 'height':
					start[name] = obj.offsetHeight;
					break;
				case 'opacity':
					start[name] = 1;
					break;
				case 'borderWidth':
					start[name] = 0;
					break;
			}
		}
		dis[name] = json[name] - start[name];
	}
	var count = Math.floor(options.duration/30);
	var n = 0;
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		n++;
		for(var name in json){
			switch(options.easing){
				case 'linear':
					var cur = start[name]+dis[name]*n/count;
					break;
				case 'ease-in':
					var a = n/count;
					var cur = start[name]+dis[name]*Math.pow(a,3);
					break;
				case 'ease-out':
					var a = 1-n/count;
					var cur = start[name]+dis[name]*(1-Math.pow(a,3));
					break;
				default:
					var a = 1-n/count;
					var cur = start[name]+dis[name]*(1-Math.pow(a,3));
					break;
			}
			if(name=='opacity'){
				obj.style[name] = cur;
				obj.style.filter = 'alpha(opacity:'+cur*100+')';
			}else{
				obj.style[name] = cur+'px';
			}
		}
		if(n==count){
			clearInterval(obj.timer);
			options.complete&&options.complete();
		}
	},30);
}

;(function(){
	var left=0;
	var iSpeed=20;
	var timer=null;
	window.elastic=function (obj,distance){
		clearInterval(timer);
		timer=setInterval(function(){
			iSpeed+=(distance-left)/10;
			iSpeed*=0.8;
			left+=iSpeed;
			obj.style.left=left+'px';
			if(Math.round(iSpeed)==0&&Math.round(left)==distance){
				clearInterval(timer);
			}
		},30);	
	}
})();
//through
function a2d(n){
	return n*180/Math.PI;
}
function d2a(n){
	return n*Math.PI/180;
}
function hoverDir(obj,ev){
	var oS=document.documentElement.scrollTop||document.body.scrollTop;
	var w = obj.offsetWidth;
	var h = obj.offsetHeight;
	var x = obj.offsetLeft+w/2-ev.clientX;
	var y = obj.offsetTop+h/2-ev.clientY-oS;
	return Math.round((a2d(Math.atan2(y,x))+180)/90)%4;
}
function through(obj){
	var oSpan = obj.children[0];
	obj.onmouseover=function(ev){
		var oEvent = ev||event;
		var oForm = oEvent.formElement||oEvent.relatedTarget;
		if(this.contains(oForm))return;
		var dir = hoverDir(this,oEvent);
		switch(dir){
			case 0:
				oSpan.style.left = '250px';
				oSpan.style.top = 0;
				break;
			case 1:
				oSpan.style.left = 0;
				oSpan.style.top = '300px';
				break;
			case 2:
				oSpan.style.left = '-250px';
				oSpan.style.top = 0;
				break;
			case 3:
				oSpan.style.left = 0;
				oSpan.style.top = '-300px';
				break;
		}
		startMove(oSpan,{top:0,left:0});
	};
	obj.onmouseout=function(ev){
		var oEvent = ev||event;
		var oTo = oEvent.toElement||oEvent.relatedTarget;
		if(this.contains(oTo))return;
		var dir = hoverDir(this,oEvent);
		switch(dir){
			case 0:
				//right
				startMove(oSpan,{left:250,top:0});
				break;
			case 1:
				//down
				startMove(oSpan,{left:0,top:300});
				break;
			case 2:
				//left
				startMove(oSpan,{left:-250,top:0});
				break;
			case 3:
				//top
				startMove(oSpan,{left:0,top:-300});
				break;
		}
	};
}
function wheel(obj,fn){
	function site(ev){
		var oEvent=ev||event;
		var down=false;
		if(oEvent.wheelDelta){
			down=oEvent.wheelDelta>0?true:false;	
		}else{
			down=oEvent.detail>0?false:true;	
		}
		fn(down);
		oEvent.preventDefault&&oEvent.preventDefault();
		return false;	
	}
	if(window.navigator.userAgent.indexOf('Firefox')!=-1){
		obj.addEventListener('DOMMouseScroll',site,false);	
	}else{
		obj.onmousewheel=site;	
	}	
}
