addReady(function(){
	function getByClass(oParent,sClass){
	var aAll=oParent.getElementsByTagName('*');
	var result=[];
		function findInArr(str,arr){
			for(var i=0;i<arr.length;i++){
				if(arr[i]==str){
					return true;
				}
			}
			return false;
		}		
		for(var i=0;i<aAll.length;i++){
			var arr=aAll[i].className.split(' ');		
			if(findInArr(sClass,arr)){
				result.push(aAll[i]); 
			}
		}
		return result;			
	}
	function tab(id){
		var oDiv = document.getElementById(id);	
		var oTop = oDiv.getElementsByTagName('div')[0];
		var oUl = oTop.getElementsByTagName('ul')[0];	
		var aLi = oUl.getElementsByTagName('li');
		var oList = oDiv.getElementsByTagName('div')[1];
		var aUl = oList.getElementsByTagName('ul');
		var iNow=0;
		function change(){
			for(var i=0;i<aLi.length;i++){
				aLi[i].className='';
				aUl[i].className=''
			}
			aLi[iNow].className='on';
			aUl[iNow].className='show';	
		}
		for(var i=0;i<aLi.length;i++){
			aLi[i].index=i;
			aLi[i].onclick=function(){
				iNow = this.index;
				change();
			}
		}
		function next(){
			iNow++;
			if(iNow>=aLi.length){
				iNow=0;	
			}
			change();
		}
		var timer=setInterval(next,3000);
		oDiv.onmouseenter=function(){
			clearInterval(timer);	
		};
		oDiv.onmouseleave=function(){
			clearInterval(timer);
			timer=setInterval(next,3000);	
		};			
	}
	;(function(){
	var oBox=document.getElementById('zd_box');
	var oSider=document.getElementById('zd_sider'); 	
	var oMove=document.getElementById('zd_move');
	var oBar=document.getElementById('zd_bar');	
		oMove.onmousedown=function(ev){
			if(oSider.offsetHeight<=oBox.offsetHeight)return;
			var oEvent=ev||event;
			var	disY=oEvent.clientY-oMove.offsetTop;
			document.onmousemove=function(ev){
				var oEvent=ev||event;
				var t = oEvent.clientY - disY;
				if(t<13){
					t=13;
				}else if(t>oBar.offsetHeight-oMove.offsetHeight-13){
					t=oBar.offsetHeight-oMove.offsetHeight-13;
				}
				oMove.style.top = t +'px';
				var scale = (t-13)/(oBar.offsetHeight-oMove.offsetHeight);
				oSider.style.top=-scale*(oSider.offsetHeight-oBox.offsetHeight)+'px';
			};
			document.onmouseup=function(){
				document.onmousemove=null;
				document.onmouseup=null;
				oMove.setCapture&&oMove.releaseCapture();	
			};
			oMove.setCapture&&oMove.setCapture();
			return false;
		};
		var t = oMove.offsetTop;
		addWheel(oBox,function(down){				
			if(oSider.offsetHeight<=oBox.offsetHeight)return;
			if(down){
				t+=10;
			}else{
				t-=10;
			}
			if(t<13){
				t=13;
			}else if(t>oBar.offsetHeight-oMove.offsetHeight-13){
				t=oBar.offsetHeight-oMove.offsetHeight-13;
			}
			oMove.style.top = t +'px';
			var scale = (t-13)/(oMove.offsetHeight-oBar.offsetHeight);
			oSider.style.top=scale*(oSider.offsetHeight-oBox.offsetHeight)+'px';					
		});			
	})();
	;(function(){
		tab('zd_game');
	})();
	;(function(){
		tab('zd_hot');
	})();
	;(function(){
		tab('zd_in');
	})();
	;(function(){
		tab('zd_out');
	})();
	;(function(){
		tab('zd_my');
	})();
	;(function(){
	function move(id){
		function change(){
			for(var i=0;i<aActive.length;i++){
				aActive[i].style.display='block';
				aDes[i].style.display='none';
			}
			aActive[iNow].style.display='none';
			aDes[iNow].style.display='block';	
		}		
		
		var oBox = document.getElementById(id);	
		var	aActive = getByClass(oBox,'active');
		var aDes = getByClass(oBox,'des');
		var iNow=0;
		for(var i=0;i<aActive.length;i++){
			aActive[i].index=i;
			aActive[i].onmouseenter=function(){
				iNow=this.index;
				change();
			};
		}
		function next(){
			iNow++;
			if(iNow>=aActive.length){
				iNow=0;				
			}
			change();
		}
		var timer=setInterval(next,2000);
		oBox.onmouseenter=function(){
			clearInterval(timer);
		};
		oBox.onmouseleave=function(){
			clearInterval(timer);
			timer=setInterval(next,2000);
		};			
		
	}
	move('zd_mv');
	move('zd_fly');
	move('zd_fash');
	move('zd_three');		
	})();
	;(function(){
	var oBox = document.getElementById('zd_box'); 
	var aBtn = 	getByClass(oBox,'zd_btn');
	for(var i=0;i<aBtn.length;i++){
		aBtn[i].onclick=function(){
			var oNext = this.parentNode.nextElementSibling||this.parentNode.nextSibling;
			if(this.innerHTML=='-'){
				oNext.style.display='none';
				this.innerHTML='+';
			}else{
				oNext.style.display='block';
				this.innerHTML='-';					
			}
			
		};
	}	
	})();
	
	
});
	