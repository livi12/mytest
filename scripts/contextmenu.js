	var EventUtil={
		addHandler:function(element,type,handler){
			if(element.addEventListener){
				element.addEventListener(type, handler,false);
			}else if(element.attachEvent){
				element.attachEvent('on'+type,handler);
			}else{
				element['on'+type]=handler;
			}
		},
		removeHandler:function(element,type,handler){
			if(element.removeEventListener){
				element.removeEventListener(type, handler,false)
			}
			else if(element.detachEvent){
				element.detachEvent('on'+type,handler);
			}else{
				element['on'+type]=handler;
			}
		},
		getEvent:function(event){
			return event?event:window.event;
		},
		getTarget:function(event){
			return event.target ||event.srcElement;
		},
		preventDefault:function(event){
			if(event.preventDefault){
				event.preventDefault();
			}else{
				event.returnValue=false;
			}
		},
		stopPropagation:function(event){
			if(event.stopPropagation){
				event.stopPropagation()
			}else{
				event.cancelBubble=true;
			}
		}
	}
	window.onload=function(){
		var myDiv=document.getElementById('myDiv');
		EventUtil.addHandler(myDiv,'contextmenu',function(event){

			var event=EventUtil.getEvent(event);
			/*阻止默认行为*/
			EventUtil.preventDefault(event);
			var divMenu=document.getElementById('myMenu');
			divMenu.style.left=event.clientX +'px';
			divMenu.style.top=event.clientY +'px';
			divMenu.style.visibility='visible';
		});
	}
	EventUtil.addHandler(document,'click',function(){
		document.getElementById('myMenu').style.visibility='hidden';
	});
	EventUtil.addHandler(window,'beforeunload',function(event){
		var event=EventUtil.getEvent(event);
		var message="你真的要离开此页面吗？"
		event.returnValue=message;
		return message;
	});

	(function(){
		var showCount=0;
		EventUtil.addHandler(window,'load',function(){ alert("Load fired");});
		EventUtil.addHandler(window,'pageshow',function(event){
				showCount++;
			alert("Show has been fired "+showCount+" times. persisted?　"+ event.persisted);});
	})();