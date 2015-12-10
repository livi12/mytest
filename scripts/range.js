var textareaText=document.getElementById('textarea1');
	var submitBtn=document.getElementById('submit');
	var startIndex=document.getElementById('startIndex');
	var endIndex=document.getElementById('endIndex');
	function Range(){
		var startIndexValue=startIndex.value;
		var endIndexValue=endIndex.value;
		var textareaTextText=textareaText.firstChild;
		if( /\d+/.test(startIndexValue) && /\d+/.test(endIndexValue) && parseInt(startIndexValue)<parseInt(endIndexValue )&&parseInt(startIndexValue)>=0){
			if(textareaTextText.length <endIndexValue){
				endIndex.value='';
				return false;
			}
			if(typeof document.createRange =='function'){
				/*DOM创建范围*/
				var range=document.createRange();
				range.selectNode(textareaText);
				 range.setStart(textareaTextText, startIndex.value);
				 range.setEnd(textareaTextText,endIndex.value);
				var spanLight=document.createElement('span');
				spanLight.setAttribute('class', 'light');
				range.surroundContents(spanLight);
			}
			else{
				/*ie创建范围*/
				var range=document.body.createTextRange();
				range.moveToElementText(textareaText);
				/*用range折叠当前范围，然后将范围移动到指定的单位数量。*/
				range.move('character',0);
				/*调用move()之后，范围的起点和终点相同，因此必须使用moverStart和moveEnd()创建新的选区*/
				range.moveStart('character',parseInt(startIndexValue));
				range.moveEnd('character',parseInt(endIndexValue));
				range.pasteHTML('<span class="light">'+range.text+'</span>');
			}
		}else{
			endIndex.value='';
			startIndex.value='';
			return false;
		}
	}
	function selectText(){

			if(typeof document.addEventListener=='function'){
				submitBtn.addEventListener('click', Range,false);
			}
			else{
				submitBtn.attachEvent('onclick',Range);
			}

	}
	selectText();