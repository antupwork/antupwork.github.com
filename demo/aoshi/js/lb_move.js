'use strict'
function getStyle(obj,sName){
	return parseInt((obj.currentStyle||getComputedStyle(obj,false))[sName]);
}

function startMove(obj,json,options){
	
	options=options||{};
	options.duration=options.duration||3000;
	options.easing=options.easing||'linear';
		
	var start={};
	var dis={};
	
	for(var name in json){
		start[name]=getStyle(obj,name);
		if(isNaN(start[name])){
			switch(name){
				case 'width':
					start[name]=obj.offsetWidth;
					break;
				case 'height':
					start[name]=obj.offsetHeight;
					break;
				case 'top':
					start[name]=obj.offsetTop;
					break;
				case 'left':
					start[name]=obj.offsetLeft;
					break;
				case 'borderWidth':
					start[name]=0;
					break;
			}
		}
		dis[name]=json[name]-start[name];
	}
	
	var count=Math.floor(options.duration/30);
	var n=0;
	var timer=null;
	
	//start+dis*n/count
	
	timer=setInterval(function(){
		n++;		
		for(var name in json){
			var curr=0;
			switch(options.easing){
				case 'linear':
					curr=start[name]+dis[name]*n/count;
					break;
				case 'ease-in':
					var a=n/count;
					curr=start[name]+dis[name]*(Math.pow(a,3));
					break;
				case 'ease-out':
					var a=1-n/count;
					curr=start[name]+dis[name]*(1-Math.pow(a,3));
					break;
				default:
					curr=start[name]+dis[name]*n/count;
					break;
			}
			if(name=='opacity'){
				obj.style.opacity=curr;
				obj.style.filter='alpha(opacity:'+curr*100+')';
			}else{
				obj.style[name]=curr+'px';
			}
		}
		if(n==count){
			clearInterval(timer);
			options.complete&&options.complete();
		}
	},30);

}