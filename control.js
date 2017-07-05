domReady(function(){
	(function(){
		var oNav=document.querySelector('.nav');
		var oS=oNav.children[0];
		var oA=oNav.getElementsByTagName('a');
		var N=0;
		var iNow=0;
		setInterval(function(){
			N+=859/24;
			if(N>859){
				N=0;	
			}
			oS.style.backgroundPosition=-N+'px 0px';	
		},100);
		
		for(var i=0;i<oA.length;i++){
			oA[i].onmouseover=function(){
				elastic(oS,this.offsetLeft+40);
			};
			oA[i].onmouseout=function(){
				elastic(oS,iNow*oA[0].offsetWidth+40);
			};
			;(function(index){
				oA[i].onclick=function(){
					for(var i=0;i<oA.length;i++){
						oA[i].style.color='#fff'
					}
					oA[index].style.color='#997';
					iNow=index;
				};
			})(i);
		}
	})();	
	
	//clock
	;(function(){
			var oC=document.querySelector('.clock');
			var oH=document.querySelector('.hour');
			var oM=document.querySelector('.min');
			var oS=document.querySelector('.sec');
			var iNum=60;
			var index;
			var index2;
			function oClock(){
				var oDate=new Date();
				var H=oDate.getHours();
				var M=oDate.getMinutes();
				var S=oDate.getSeconds();
				var mS=oDate.getMilliseconds();
				oH.style.WebkitTransform='rotate('+(H*30+M/60*30)+'deg)';
				oM.style.WebkitTransform='rotate('+(M*6+S/60*6)+'deg)';
				index=(S*6+mS/1000*6);
				oS.style.WebkitTransform='rotate('+index+'deg)';
			}
			for(var i=0;i<iNum;i++){
				var oI=document.createElement('i');
				if(i%5==0){
					oI.className='needle_m';
					var oMark=document.createElement('span');
					oMark.innerHTML=i/5;
					if(i/5==0)oMark.innerHTML=12;
					oMark.style.WebkitTransform='rotate('+-i*6+'deg)';
					oI.appendChild(oMark);
				}else{
					oI.className='needle';
				}
				
				oI.style.WebkitTransform='rotate('+i*6+'deg)';
				oC.appendChild(oI);	
			}
			oClock();
			setInterval(oClock,1);
	})();
	//back to top
	;(function(){
		var oBox=document.querySelector('.back');
		var aA=document.querySelectorAll('.nav a');	
		var bOk=false;
		var oHead=document.querySelector('.header');
		var oHead_B=document.querySelector('.header_bck');
		var oT=oHead.offsetTop;
		window.onscroll=function(){
			var oS=document.documentElement.scrollTop||document.body.scrollTop;
			if(oS>=oT){
				oHead.style.position='fixed';
				oHead_B.style.display='block';
			}else{
				oHead.style.position='static';
				oHead_B.style.display='none';
			}	
			if(bOk){
				clearInterval(oBox.timer);	
			}
			if(bOk){
				clearInterval(oBox.timer);	
			}
			bOk=true;
			if(oS>100){
				oBox.style.display='block';	
			}else{
				oBox.style.display='none';	
			}	
		};
		function backP(obj,space){
			var start=document.documentElement.scrollTop||document.body.scrollTop;
			var iTarget=space;
			var dis=iTarget-start;
			var count=Math.floor(1000/30);
			var n=0;
			clearInterval(obj.timer);	
			obj.timer=setInterval(function(){
				bOk=false;
				n++;
				var a=1-n/count;
				document.documentElement.scrollTop=document.body.scrollTop=start+dis*(1-Math.pow(a,3));
				if(n==count){
					clearInterval(obj.timer);	
				}	
			},30);
		}
		aA[0].onclick=oBox.onclick=function(){
			backP(oBox,0);
		};
		aA[1].onclick=function(){
			backP(aA[0],620);
		};
		aA[2].onclick=function(){
			backP(aA[2],1990);
		};
		aA[3].onclick=function(){
			backP(aA[2],2650);
		};
	})();
	//through
	;(function(){
		var oUl=document.getElementById('through');	
		var aCh=oUl.children;
		for(var i=0;i<aCh.length;i++){
			aCh[i].style.background='rgba('+rnd(0,256)+','+rnd(0,256)+','+rnd(0,256)+',0.4)';
			aCh[i].children[0].style.background='rgba('+rnd(0,256)+','+rnd(0,256)+','+rnd(0,256)+',0.7)';
			through(aCh[i]);
		}
	})();
	//worklist
	;(function(){
		var oUl=document.querySelector('.worklist ul');
		var aLi = document.querySelectorAll(' .worklist ul li');
		var aClass = [];
		for(var i=0;i<aLi.length;i++){
			aClass.push(aLi[i].className);
		}
		wheel(oUl,function(down){
			if(down){
				aClass.unshift(aClass.pop());
				for(var i=0;i<aLi.length;i++){
					aLi[i].className=aClass[i];
				}
			}else{
				aClass.push(aClass.shift());
				for(var i=0;i<aLi.length;i++){
					aLi[i].className=aClass[i];
				}
			}	
		});
	})();
	//ball	
	;(function(){
		var aBox=document.querySelectorAll('.ball');
		var oS=document.documentElement.srollTop||document.body.scrollTop;
		var oH=document.documentElement.clientHeight;
		for(var i=0;i<aBox.length;i++){
				aBox[i].iSpeedX = 0;
				aBox[i].iSpeedY = 0;
				aBox[i].lastX = 0;
				aBox[i].lastY = 0;
				aBox[i].style.background='rgba('+rnd(0,256)+','+rnd(0,256)+','+rnd(0,256)+',0.5)';
				aBox[i].style.left=i*rnd(200,300)+'px';
				elastic(aBox[i]);
				drag(aBox[i]);				
		}
		function drag(obj){
			obj.onmousedown=function(ev){
				var _this = this;
				clearInterval(_this.timer);
				var oEvent=ev||event;
				var disX=oEvent.clientX-_this.offsetLeft;
				var disY=oEvent.clientY-_this.offsetTop-oS;
				addEvent(document,fnMove,'mousemove');
				addEvent(document,fnUp,'mouseup');
				function fnUp(){
					elastic(_this);
					removeEvent(document,fnMove,'mousemove');
					removeEvent(document,fnUp,'mouseup');
					_this.releaseCapture&&_this.releaseCapture();
				};
				function fnMove(ev){
					var oEvent=ev||event;
					_this.style.left=oEvent.clientX-disX+'px';
					_this.style.top=oEvent.clientY-disY-oS+'px';
					_this.iSpeedX=oEvent.clientX-_this.lastX;
					_this.iSpeedY=oEvent.clientY-_this.lastY;
					_this.lastX=oEvent.clientX;
					_this.lastY=oEvent.clientY;
				}
				_this.setCapture&&_this.setCapture();
				return false;
			};
		}
		
		function elastic(obj){
			clearInterval(obj.timer);
			obj.timer=setInterval(function(){
				obj.iSpeedY+=6;
				var t=obj.offsetTop+obj.iSpeedY;
				var l=obj.offsetLeft+obj.iSpeedX;
				if(l<0){
					l=0;
					obj.iSpeedX*=-0.8;
					obj.iSpeedY*=0.8;
				}
				if(t<0){
					t=0;
					obj.iSpeedX*=0.8;
					obj.iSpeedY*=-0.8;
				}
				if(l>document.documentElement.clientWidth-obj.offsetWidth){
					l=document.documentElement.clientWidth-obj.offsetWidth;
					obj.iSpeedX*=-0.8;
					obj.iSpeedY*=0.8;
				}
				if(t>obj.parentNode.offsetHeight-obj.offsetHeight){
					t=obj.parentNode.offsetHeight-obj.offsetHeight;
					obj.iSpeedX*=0.8;
					obj.iSpeedY*=-0.8;
				}
				obj.style.left=l+'px';
				obj.style.top=t+'px';					
				if(Math.abs(obj.iSpeedX)<1){
					obj.iSpeedX=0;
				}
				if(Math.abs(obj.iSpeedY)<1){
					obj.iSpeedY=0;
				}
				if(obj.iSpeedX==0&&obj.iSpeedY==0&&t==document.documentElement.clientHeight-obj.offsetHeight){
					clearInterval(obj.timer);
				}
			
			},30);
		}	
	})();
	// ;(function(){
	// 		var oDiv=document.querySelector('.information_list');
	// 		var R=5;
	// 		var L=7;
	// 		var count=0;
	// 		var bOk=false;
	// 		for(var i=0;i<R;i++){
	// 			for(j=0;j<L;j++){
	// 				var oS=document.createElement('span');
	// 				oS.style.width=oDiv.offsetWidth/L+'px';
	// 				oS.style.height=oDiv.offsetHeight/R+'px';
	// 				oDiv.appendChild(oS);
	// 				oS.style.left=j*oS.offsetWidth+'px';
	// 				oS.style.top=i*oS.offsetHeight+'px';
	// 				oS.style.backgroundPosition='-'+j*oS.offsetWidth+'px -'+i*oS.offsetHeight+'px';
	//
	// 			}
	// 		}
	// 		var aS=document.querySelectorAll('.information_list span');
	// 		oDiv.onclick=function(){
	// 			if(bOk)return;
	// 			bOk=true;
	// 			count++;
	// 			for(var i=0;i<aS.length;i++){
	// 				aS[i].style.WebkitTransition='1s all ease';
	// 				var spaceX=aS[i].offsetLeft+aS[i].offsetWidth/2-oDiv.offsetWidth/2;
	// 				var spaceY=aS[i].offsetTop+aS[i].offsetHeight/2-oDiv.offsetHeight/2;
	// 				aS[i].style.WebkitTransform='translate('+spaceX+'px,'+spaceY+'px) rotateX('+rnd(-180,180)+'deg) rotateY('+rnd(-180,180)+'deg)';
	// 				aS[i].style.opacity=0;
	// 			}
	// 			aS[aS.length-1].addEventListener('transitionend',function(){
	// 				for(var i=0;i<aS.length;i++ ){
	// 					aS[i].style.WebkitTransition='none';
	// 					aS[i].style.WebkitTransform='translate(0px,0px) rotateX(0deg) rotateY(0deg)';
	// 					aS[i].style.opacity=1;
	// 					aS[i].style.backgroundImage='url(images/in'+(count%4+1)+'.jpg)';
	// 				}
	// 				oDiv.style.backgroundImage='url(images/in'+((count+1)%4+1)+'.jpg)';
	// 				bOk=false;
	// 			},false);
	// 		};
	// })();
	//chose
	;(function(){
		function marqueeTab(id){
			var oBox = document.getElementById(id);
			var oUl = oBox.children[0];
			var oOl = oBox.children[1];
			oUl.innerHTML+=oUl.innerHTML;
			var aLi = oUl.children;
			var aBtn = oOl.children;
			oUl.style.width = aLi.length*aLi[0].offsetWidth+'px';
			var W = oUl.offsetWidth/2;
			var iNow = 0;
			oBox.onmouseover=function(){
				clearInterval(oBox.timer);
			};
			oBox.onmouseout=function(){
				oBox.timer = setInterval(function(){
					next();
				},1000);
			};
			for(var i=0;i<aBtn.length;i++){
				(function(index){
					aBtn[i].onclick=function(){
						if((iNow%aBtn.length==4||iNow%aBtn.length==-1)&&index==0){
							iNow++;
						}
						if(iNow%aBtn.length==0&&index==4){
							iNow--;
						}
						iNow = Math.floor(iNow/aBtn.length)*aBtn.length+index;
						tab();
					};
				})(i);
			}
			function tab(){
				for(var i=0;i<aBtn.length;i++){
					aBtn[i].className='';
				}
				if(iNow>0){
					aBtn[iNow%aBtn.length].className='on';
				}else{
					aBtn[(iNow%aBtn.length+aBtn.length)%aBtn.length].className='on';
				}
				move(oUl,-iNow*aLi[0].offsetWidth);
			}
			var left = 0;
			function move(obj,iTarget){
				var start = left;
				var dis = iTarget - start;
				var count = Math.floor(700/30);
				var n = 0;
				clearInterval(obj.timer);
				obj.timer = setInterval(function(){
					n++;
					var a = 1-n/count;
					left = start+dis*(1-Math.pow(a,3));
					if(left<0){
						obj.style.left = left%W+'px';
					}else{
						obj.style.left = (left%W-W)%W+'px';
					}
					if(n==count){
						clearInterval(obj.timer);
					}
				},30);
			}
			function next(){
				iNow++;
				tab();
			}
			oBox.timer = setInterval(function(){
				next();
			},1000);
		}
		marqueeTab('imitate_page');
	})();
})
