// JavaScript Document
addReady(function(){
		var movie_moreMsgTitle_h=document.getElementsByClassName('movie_moreMsgTitle')[0];
		var movie_moreMsgCon_PH=document.getElementsByClassName('movie_moreMsgCon play_history');
		var oUl=movie_moreMsgTitle_h.children[1];
		var oRollBar=document.getElementsByClassName('rollBar')[0];
		var oRollBox=document.getElementById('rollBox');
		var	movieBox_top=document.getElementsByClassName('movieBox')[0];
		var movieBox_msg_alltop=document.getElementsByClassName('movieBox_msg')[0];
		var oRollBarUp=document.getElementsByClassName('rollBarUp')[0];
		var oRollBarDown=document.getElementsByClassName('rollBarDown')[0];
		var aLi=oUl.children;
		var timer=null;
		var iNow=0;
		var tp=0;
		//点击向上向下；
		oRollBarDown.onclick=function(){
			var t=oRollBar.offsetTop; 
			t+=10;
			if(t<0){
				t=0;
			}else if(t>oRollBox.offsetHeight-oRollBar.offsetHeight){
				t=oRollBox.offsetHeight-oRollBar.offsetHeight;
			}
			var scale=t/(oRollBox.offsetHeight-oRollBar.offsetHeight);
			oRollBar.style.top=t+'px';
			movieBox_msg_alltop.style.top=-scale*(movieBox_msg_alltop.offsetHeight-movieBox_top.offsetHeight)+'px';	
			oRollBar.style.top=t+'px';
		};
		oRollBarUp.onclick=function(){
			var t=oRollBar.offsetTop; 
			t-=10;
			if(t<0){
				t=0;
			}else if(t>oRollBox.offsetHeight-oRollBar.offsetHeight){
				t=oRollBox.offsetHeight-oRollBar.offsetHeight;
			}
			var scale=t/(oRollBox.offsetHeight-oRollBar.offsetHeight);
			oRollBar.style.top=t+'px';
			movieBox_msg_alltop.style.top=-scale*(movieBox_msg_alltop.offsetHeight-movieBox_top.offsetHeight)+'px';	

			oRollBar.style.top=t+'px';
		};
		//滚动播放历史；
		function show(){
			for(var i=0;i<aLi.length;i++){
				aLi[i].className='';
				movie_moreMsgCon_PH[i].style.display='none';
			}
			aLi[iNow].className='active';
			movie_moreMsgCon_PH[iNow].style.display='block';	
		}
		for(var i=0;i<aLi.length;i++){			
			aLi[i].index=i;
			aLi[i].onclick=function(){
				this.index=iNow;
				show();
			}	
		}
		function next(){
			iNow++;
			if (iNow==aLi.length) {
				iNow=0;
			};
			show();
		}
		timer=setInterval(next,1000)
		//自定义滚动条；
		oRollBar.onmousedown=function(ev){
			var oEvent=ev||event;
			var disY=oEvent.clientY-oRollBar.offsetTop;
			document.onmousemove=function(ev){
				var oEvent=ev||event;
				var t=oEvent.clientY-disY;
				if(t<0){
					t=0;	
				}else if(t>oRollBox.offsetHeight-oRollBar.offsetHeight){
					t=oRollBox.offsetHeight-oRollBar.offsetHeight;
				}
				oRollBar.style.top=t+'px';	
				var scale=t/(oRollBox.offsetHeight-oRollBar.offsetHeight);
				movieBox_msg_alltop.style.top=-scale*(movieBox_msg_alltop.offsetHeight-movieBox_top.offsetHeight)+'px';	
			};
			document.onmouseup=function(){
				document.onmousemove=null;
				document.onmouseup=null;	
				oRollBar.releaseCaputue&&oRollBar.releaseCapture();
			};
			oRollBar.setCapture&&oRollBar.setCapture();
			return false;	
		};
		//滚轮；
		addWheel(movieBox_top,function(down){
			var t=oRollBar.offsetTop;
			if(down){
				t+=5;			
			}else{
				t-=5;
			}
			if(t<0){
				t=0;
			}else if(t>oRollBox.offsetHeight-oRollBar.offsetHeight){
				t=oRollBox.offsetHeight-oRollBar.offsetHeight;
			}
			var scale=t/(oRollBox.offsetHeight-oRollBar.offsetHeight);
			oRollBar.style.top=t+'px';
			movieBox_msg_alltop.style.top=-scale*(movieBox_msg_alltop.offsetHeight-movieBox_top.offsetHeight)+'px';	
		});
	});
