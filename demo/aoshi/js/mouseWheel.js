// JavaScript Document
function addWheel(obj,fn){	
	function fnWheel(ev){
		var oEvent=ev||event;			
		var down=false;
		if(oEvent.wheelDelta){
			down=oEvent.wheelDelta>0?false:true;
		}else{
			down=oEvent.detail>0?true:false;
		}
		fn(down);
		
		oEvent.preventDefault&&oEvent.preventDefault();
		return false;
	}
	if(window.navigator.userAgent.indexOf('Firefox')!=-1){
		obj.addEventListener('DOMMouseScroll',fnWheel,false);
	}else{
		obj.onmousewheel=fnWheel;
	}			
}
