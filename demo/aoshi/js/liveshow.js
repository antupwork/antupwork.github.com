addReady(function(){	
	//libin
	
	;(function(){
		var oRight=document.getElementById('lb_right');
		var oRin=document.getElementById('lb_r_inside');
		var oScroll=document.getElementById('lb_scroll');
		var oScroImg=document.getElementById('lb_scroImg');
		var oScroBig=oScroImg.children;
		var oScroList=document.getElementById('lb_scroList');
		var oScroSmall=oScroList.children;
		var timer=null;
		var t_wheel=null;
		var iNow=0;
		
		
		
		
		//====显隐视频上的图标start====
		var oA=document.getElementsByClassName('lb_showimg');
		for(var i=0;i<oA.length;i++){
			oA[i].onmouseover=function(){
				ico(this,'block');
			};
			oA[i].onmouseout=function(){
				ico(this,'none');
			};
		}
		function ico(obj,cont){
			for(var j=1;j<obj.children.length;j++){
				obj.children[j].style.display=cont;
			}
		}
		//====显隐视频上的图标end====
		
		//====拖动start====
		var oRoll=document.getElementById('lb_roll');
		var oUp=oRoll.children[0];
		var oDown=oRoll.children[1];
		var oRollBox=oRoll.children[2];
		//拖动滚动条
		oRollBox.onmousedown=function(ev){
			var oEvent=ev||event;
			oEvent.cancelBubble=true;
			var disY=oEvent.clientY-oRollBox.offsetTop;
			document.onmousemove=function(ev){
				var oEvent=ev||event;
				var t=oEvent.clientY-disY;
				var minSH=0;
				var maxSH=oRoll.offsetHeight-oUp.offsetHeight-oDown.offsetHeight-oRollBox.offsetHeight;
				
				if(t<minSH){
					t=minSH;
				}else if(t>maxSH){
					t=maxSH;
				}
				oRollBox.style.top=t+'px';
				
				var scale=parseFloat(t/maxSH);
				oRin.style.top=-scale*(oRin.offsetHeight-oRight.offsetHeight)+'px';
			};
			document.onmouseup=function(){
				document.onmousemove=null;
				document.onmouseup=null;
				oRollBox.releaseCapture&&oRollBox.releaseCapture();
			};
			oRollBox.setCapture&&oRollBox.setCapture();
			return false;
		};
		//滚动上下按钮和滚动底框的事件
		oRollBox.onclick=function(ev){
			var oEvent=ev||event;
			oEvent.cancelBubble=true;
		};
		oUp.onclick=function(ev){
			var oEvent=ev||event;
			oEvent.cancelBubble=true;
			fnwheel(false);
		};
		oUp.onmousedown=function(ev){
			var oEvent=ev||event;
			oEvent.cancelBubble=true;
			clearInterval(t_wheel);
			t_wheel=setInterval(function(){
				fnwheel(false);
			},30);
		};
		oUp.onmouseup=function(){
			clearInterval(t_wheel);
		};
		oDown.onclick=function(ev){
			var oEvent=ev||event;
			oEvent.cancelBubble=true;
			fnwheel(true);
		};
		oDown.onmousedown=function(ev){
			var oEvent=ev||event;
			oEvent.cancelBubble=true;
			clearInterval(t_wheel);
			t_wheel=setInterval(function(){
				fnwheel(true);
			},30);
		};
		oDown.onmouseup=function(){
			clearInterval(t_wheel);
		};
		oRoll.onclick=function(ev){
			var oEvent=ev||event;
			var curr=oEvent.clientY-oRoll.offsetTop-oUp.offsetHeight;
			var tar=oRoll.offsetTop+oUp.offsetHeight+oRollBox.offsetTop+oRollBox.offsetHeight;
			if(curr>tar){
				fnwheel(true);
			}else{
				fnwheel(false);
			}
		};
		//====拖动end====
		
		//====滚动start====
		addWheel(oRight);
		function addWheel(obj){
			if(window.navigator.userAgent.indexOf('Firefox')!=-1){
				obj.addEventListener('DOMMouseScroll',fnscroll,false);
			}else{
				obj.onmousewheel=fnscroll;
			}
			function fnscroll(ev){
				var oEvent=ev||event;
				var down=false;
				
				if(oEvent.wheelDelta){
					down=oEvent.wheelDelta<0?true:false;
				}else{
					down=oEvent.detail<0?false:true;
				}
				fnwheel(down);
				oEvent.preventDefault&&oEvent.preventDefault();
				return false;
			};
		}
		//核心滚动模块
		function fnwheel(down){
			var t=oRollBox.offsetTop-oUp.offsetHeight;
			var maxSH=oRoll.offsetHeight-oUp.offsetHeight-oDown.offsetHeight-oRollBox.offsetHeight;
			if(down){
				t+=10;
			}else{
				t-=10;
			}
			if(t<0){
				t=0;
			}else if(t>maxSH){
				t=maxSH;
			}
			oRollBox.style.top=t+'px';
			var scale=parseFloat(t/maxSH);
			oRin.style.top=-scale*(oRin.offsetHeight-oRight.offsetHeight)+'px';	
		}
		//====滚动end====
			
		//====轮播图start====
		//给每个小图加点击事件
		for(var i=0;i<oScroSmall.length;i++){
			oScroSmall[i].index=i;
			(function(index){
				oScroSmall[index].onmouseover=function(){
					iNow=this.index;
					show();
				};
			})(i);
		}
		
		//开定时器
		timer=setInterval(function(){
			iNow++;
			iNow%=10;
			show();
		},3000);
		
		//核心的显隐及运动
		function show(){
			for(var i=0;i<oScroSmall.length;i++){
				oScroSmall[i].className='';
				oScroBig[i].style.opacity=0;
				oScroBig[i].style.filter='alpha(opacity:0)';
				oScroBig[i].style.display='none';
			}
			oScroSmall[iNow].className='on';
			oScroBig[iNow].style.display='block';
			startMove(oScroBig[iNow],{
				opacity:1
			},{duration:300,easing:'linear'});		
		}
		show();
		
		//移入和离开事件
		oScroll.onmouseover=function(){
			clearInterval(timer);
		};
		oScroll.onmouseout=function(){
			timer=setInterval(function(){
				iNow++;
				iNow%=10;
				show();
			},3000);
		};	
	})();
	
	//xhz
	;(function(){
		var oDrop=document.getElementById('xhz_drop');
		var oMovieBox=document.getElementById('xhz_movieBox');
		var oRollBox=document.getElementById('xhz_rollBox');
		var oRollBar=oRollBox.getElementsByTagName('div')[0];
		var oRollUp=oRollBox.getElementsByTagName('div')[1];
		var oRollDown=oRollBox.getElementsByTagName('div')[2];
		var oListBox=document.getElementById('xhz_movieBox_tv');
		var aLi=oDrop.getElementsByTagName('li');
		
		for(var i=0;i<aLi.length;i++){
			(function(index){
				aLi[i].onmouseenter=function(){
					this.className='on';	
				};
				aLi[i].onmouseleave=function(){
					this.className='';	
				};	
			})(i);	
		}
		
		/*oDrop.onmouseenter=function(ev){
			var oEvent=ev||event;
			var oSrc=oEvent.srcElement||oEvent.target;
			var aLi=oDrop.getElementsByTagName('li');
			if(oSrc.tagName=='LI'){
				for(var i=0;i<aLi.length;i++){
					aLi[i].className='';
				}
				oSrc.className='on';				
			}
			oDrop.onmouseleave=function(){
				for(var i=0;i<aLi.length;i++){
					aLi[i].className='';
				}
			};		
		};*/
	
		//鼠标点击菜单移动
		oRollDown.onclick=function(){
			var t=oRollBar.offsetTop; 
			t+=10;
			if(t>oRollBox.offsetHeight-oRollBar.offsetHeight-13){
				t=oRollBox.offsetHeight-oRollBar.offsetHeight-13;
			}
			var scale=(t+13)/(oRollBox.offsetHeight-oRollBar.offsetHeight);
			oRollBar.style.top=t+'px';
			oListBox.style.top=-scale*(oListBox.offsetHeight-oRollBox.offsetHeight)+'px';
			oRollBar.style.top=t+'px';
		};
		oRollUp.onclick=function(){
			var t=oRollBar.offsetTop; 
			t-=10;
			if(t<13){
				t=13;
			}
			var scale=(t-13)/(oRollBox.offsetHeight-oRollBar.offsetHeight);
			oRollBar.style.top=t+'px';
			oListBox.style.top=-scale*(oListBox.offsetHeight-oRollBox.offsetHeight)+'px';
			oRollBar.style.top=t+'px';
		};

		
		//鼠标托拽滚动条
		oRollBar.onmousedown=function(ev){
			var oEvent=ev||event;
			var disY=oEvent.clientY-oRollBar.offsetTop;
			document.onmousemove=function(ev){
				var oEvent=ev||event;
				var t=oEvent.clientY-disY;
				if(t<13){
					t=13;
				}else if(t>oRollBox.offsetHeight-oRollBar.offsetHeight-13){
					t=oRollBox.offsetHeight-oRollBar.offsetHeight-13;
				}
				oRollBar.style.top=t+'px';
				var scale=(t-13)/(oRollBox.offsetHeight-oRollBar.offsetHeight);				
				oListBox.style.top=-scale*(oListBox.offsetHeight-oRollBox.offsetHeight+57)+'px';
			};
			
			document.onmouseup=function(){
				document.onmousemove=null;
				document.onmouseup=null;
				oRollBar.releaseCapture&&oRollBar.releaseCapture()
			};
			oRollBar.setCapture&&oRollBar.setCapture();
			return false;
		}
		//鼠标滚动
		addWheel(oMovieBox,function(down){
			var t=oRollBar.offsetTop;
			if(down){
				t+=5;			
			}else{
				t-=5;
			}			
			if(t<13){
				t=13;

			}else if(t>oRollBox.offsetHeight-oRollBar.offsetHeight-13){
				t=oRollBox.offsetHeight-oRollBar.offsetHeight-13;
			}
			var scale=(t-13)/(oRollBox.offsetHeight-oRollBar.offsetHeight);
			oRollBar.style.top=t+'px';
			oListBox.style.top=-scale*(oListBox.offsetHeight-oRollBox.offsetHeight+57)+'px';
		});
	})();
});
	