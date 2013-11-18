/*============原生封装============*/

function addLoadEvent(func){
	var oldonload = window.onload;
	if(typeof window.onload != "function"){
		window.onload = func;
	}else{
		window.onload = function(){
			oldonload();
			func();
		}
	}
};
function insertAfter(newElement,targetElement){
	var parent = targetElement.parentNode;
	if(parent.lastChild == targetElement){
		parent.appendChild(newElement);
	}else{
		parent.insertBefore(newElement,targetElement.nextSibling);
	}
};
function addClass(element,value){
	if(!element.className){
		element.className = value;
	}else{
		newClassName = element.className;
		newClassName += "";
		newClassName += value;
		element.className = newClassName;
	}
};

/*============主导航条效果============*/

//与当前url和导航链接一致的导航添加类
function highlightPage(){
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	var headers = document.getElementsByTagName('header');
	if(headers.length == 0) return false;
	var navs = document.getElementsByTagName('nav');
	if(navs.length == 0) return false;
	var links = document.getElementsByTagName('a');
	for (var i = 0; i < links.length; i++) {
		var linkurl;
		for (var i = 0; i < links.length; i++) {
			linkurl = links[i].href;
			if(window.location.href.indexOf(linkurl) !=-1){
				links[i].className = 'here';
				var linktext = links[i].lastChild.nodeValue.toLowerCase();
				document.body.setAttribute('id',linktext);
			}
			// console.log(linkurl);
		};
	};
};
//调用函数highlightPage
addLoadEvent(highlightPage);

/*============小幻灯片============*/

//获取参数实现图片移动效果
function moveElement(elementID,final_x,final_y,interval){
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById(elementID)) return false;
	var elem = document.getElementById(elementID);
	if(elem.movement){
		clearTimeout(elem.movement);
	}
	if(!elem.style.left){
		elem.style.left="0px";
	}
	if(!elem.style.left.top){
		elem.style.top="0px";
	}
	var xpos = parseInt(elem.style.left);
	var ypos = parseInt(elem.style.top);
	if (xpos == final_x && ypos == final_y) {
		return true;
	}
	if(xpos < final_x){
		var dist = Math.ceil((final_x-xpos)/10);
		xpos = xpos + dist;
	}
	if(xpos > final_x){
		var dist = Math.ceil((xpos-final_x)/10);
		xpos = xpos - dist;
	}
	if(ypos < final_y){
		var dist = Math.ceil((final_y - ypos)/10);
		ypos = ypos + dist;
	}
	if(ypos > final_y){
		var dist = Math.ceil((ypos-final_y)/10);
		ypos = ypos - dist;
	}
	elem.style.left = xpos +'px';
	elem.style.top = ypos + 'px';
	var repeat = "moveElement("+elementID+","+final_x+","+final_y+","+interval+")";
	elem.movement = setTimeout(repeat,setInterval);
};
//添加img,鼠标移上去发送参数数值
function prepareSlideshow(){
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById) return false;
	if (!document.getElementById('intro')) return false;
	var intro = document.getElementById('intro');
	var slideshow = document.createElement('div');
	slideshow.setAttribute('id','slideshow');
	var preview = document.createElement('img');
	preview.setAttribute('src','images/fire.png');
	preview.setAttribute('alt','a glimpse of what awaits you')
	preview.setAttribute('id','preview');
	preview.style.width = '750px';
	slideshow.appendChild(preview);
	insertAfter(slideshow,intro);
	var links = intro.getElementsByTagName('a');
	var destination;
	for (var i = 0; i < links.length; i++) {	
		links[i].onmouseover = function(){
			destination = this.getAttribute('href');
			if (destination.indexOf('index.html') != -1) {
				moveElement('preview',0,0,5);
			};
			if (destination.indexOf('about.html') != -1) {
				moveElement('preview',-150,0,5);
			};
			if (destination.indexOf('photos.html') != -1) {
				moveElement('preview',-300,0,5);
			};
			if (destination.indexOf('live.html') != -1) {
				moveElement('preview',-450,0,5);
			};
			if (destination.indexOf('contact.html') != -1) {
				moveElement('preview',-600,0,5);
			};
		};
	};
};

addLoadEvent(prepareSlideshow);

/*============文字切换效果============*/

//获取id,控制section显示隐藏
function showSection(id){
	var sections = document.getElementsByTagName('section');
	for (var i = 0; i < sections.length; i++) {
		if (sections[i].getAttribute('id') != id){
			sections[i].style.display = 'none';
		}else{
			// document.getElementById(id).style.display='block';
			sections[i].style.display = 'block';
		};
	};
};
//导航获取,绑定鼠标划过并且调用函数showSection
function prepareInternalnav(){
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	var articles = document.getElementsByTagName('article');
	if (articles.length == 0) return false;
	var navs = articles[0].getElementsByTagName('nav');
	if (navs.length == 0) return false;
	var links = navs[0].getElementsByTagName('a');
	for (var i = 0; i < links.length; i++) {
		var slideId = links[i].href.split('#')[1];
		if (!document.getElementById(slideId)) continue;
		document.getElementById(slideId).style.display = 'none';
		links[i].destination = slideId;
		links[i].onmouseover = function(){
			showSection(this.destination);
			return false;
		};
	};
};
addLoadEvent(prepareInternalnav);

/*============图片库============*/

//获取信息添加到相应的标签上
function showPic(whichpic){
	if (!document.getElementById('placeholder')) return false;
	var imagesR = whichpic.getAttribute('href');
	var placeholder = document.getElementById('placeholder');
	placeholder.setAttribute('src',imagesR);
	if (whichpic.getAttribute('title')) {
		var text = whichpic.getAttribute('title');
	} else{
		var text = '';
	};
	description = document.getElementById('description');
	if (description.firstChild.nodeType == 3) {
		description.firstChild.nodeValue = text;
	};
	return false;
};
//在ul标签后来添加p标签和img标签
function preparePlaceholder(){
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById) return false;
	if (!document.createTextNode) return false;
	if (!document.getElementById('imagegallery')) return false;
	var gallery = document.getElementById('imagegallery');
	var placeholder = document.createElement('img');
	placeholder.setAttribute('id','placeholder');
	placeholder.setAttribute('src','images/photos.png');
	placeholder.setAttribute('alt','images');
	var description = document.createElement('p');
	description.setAttribute('id','description');
	var descriptionText = document.createTextNode('choose an images');
	description.appendChild(descriptionText);
	insertAfter(description,gallery);	
	insertAfter(placeholder,description);
};
//获取a标签并且绑定点击事件
function prepareGallery(){
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById) return false;
	if (!document.getElementById('imagegallery')) return false;
	var gallery = document.getElementById('imagegallery');
	var links = gallery.getElementsByTagName('a');
	for (var i = 0; i < links.length; i++) {
		links[i].onmouseover = function(){
			return showPic(this);
		};
	};
};
//调用函数
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);

/*============表格高亮============*/

//隔行换色
function striptTables(){
	if (!document.getElementsByTagName) return false;
	var tables = document.getElementsByTagName('table');
	for (var i = 0; i < tables.length; i++) {
		var trTag = document.getElementsByTagName('tr');
		var odd = false;
		for (var l = 0; l < trTag.length; l++) {
			if (odd == true) {
				addClass(trTag[l],'odd');
				odd = false;
			} else{
				odd = true;
			};
		};
	};
};
/*我的写法
function striptTables(){
	if (!document.getElementsByTagName) return false;
	var trTag=document.getElementsByTagName('tr');
	var odd=false;
	for (var l = 0; l < trTag.length; l++) {
		if (odd == true) {
			addClass(trTag[l],'odd');
			odd=false;
		} else{
			odd=true;
		};
	};
};
*/

//鼠标经过背景色变化
function highlightRows(){
	if (!document.getElementsByTagName) return false;
	var trTag = document.getElementsByTagName('tr');
	for (var i = 0; i < trTag.length; i++) {
		trTag[i].oldClassName = trTag[i].className;
		trTag[i].onmouseover = function(){
			this.className = '';
			addClass(this,'highlight');
		};
		trTag[i].onmouseout = function(){
			this.className = this.oldClassName;
		}
	};
};

//获取关联数组，添加元素节点和文本节点
function displayAbbreviations(){
	if (!document.getElementsByTagName || !document.createTextNode || !document.createElement) return false;
	var abbreviations = document.getElementsByTagName('abbr');
	if (abbreviations.length <1) return false;
	var defs = new Array();
	for (var i = 0; i < abbreviations.length; i++) {
		var destination = abbreviations[i].getAttribute('title');
		if (destination.length <1) return false;
		var key = abbreviations[i].firstChild.nodeValue;
		defs[key] = destination;
	};
	var dllist = document.createElement('dl');
	for (key in defs) {
		destination = defs[key];
		var dttitle = document.createElement('dt');
		var dttitle_text = document.createTextNode(key);
		var ddtitle = document.createElement('dd');
		var ddtitle_text = document.createTextNode(destination);
		dttitle.appendChild(dttitle_text);
		ddtitle.appendChild(ddtitle_text);
		dllist.appendChild(dttitle);
		dllist.appendChild(ddtitle);
	};
	var articles = document.getElementsByTagName('article')[0];
	if (articles.length < 0) return false;
	var headers = document.createElement('h3');
	var headers_text = document.createTextNode('aaaaa');
	headers.appendChild(headers_text);
	articles.appendChild(headers);
	articles.appendChild(dllist);
};
addLoadEvent(striptTables);
addLoadEvent(highlightRows);
addLoadEvent(displayAbbreviations);

/*============表单============*/

//点击label标签聚焦到相应的input标签
function focuslabels(){
	if (!document.getElementsByTagName) return false;
	var labels = document.getElementsByTagName('label');
	for(var i=0; i< labels.length;i++){
		if (!labels[i].getAttribute('for')) continue;
		labels[i].onclick = function(){
			var id = this.getAttribute('for');
			if(!document.getElementById(id)) return false;
			var element = document.getElementById(id);
			element.focus();
			element.style.border = '1px solid #444';
		};
	};
};
addLoadEvent(focuslabels);

//input执行鼠标获取焦点失去焦点
function reseFields(whichform){
	if(!Modernizr.input.placeholder) return;
	for (var i = 0; i < whichform.elements.length; i++) {
		var element=whichform.elements[i];
		if (element.type == 'submit') continue;
		var check = element.placeholder || element.getAttribute('placeholder');
		if (!check) continue;
		element.onfocus = function(){
			var text = this.placeholder || this.getAttribute('placeholder');
			if (this.value == text) {
				this.className ='';
				this.value ='';
			}
		}
		element.onblur = function(){
			if (this.value == '') {
				this.className = 'placeholder';
				this.value =this.placeholder || this.getAttribute('placeholder');
			}
		}
		element.onblur();
	};
};
//检测用户名
function isFilled(field){
	if (field.value.indexOf(' ') > -1) return false;
	var placeholder = field.placeholder || field.getAttribute('placeholder');
	return (field.value !=placeholder);
}
//检测email的格式是否正确
function isEmail(field){
	return (field.value.indexOf('@')!= -1 && field.value.indexOf('.')!= -1);
}
//检测用户名和邮箱是否符合格式
function validateForm(whichpic){
	for (var i = 0; i < whichpic.elements.length; i++) {
		var element=whichpic.elements[i];
		if (element.type == 'text') {
			if (!isFilled(element)) {
				alert('Please fill in the '+element.name+' field'+' user_name have blank');
				return false;
			}
		};
		if (element.type == 'email') {
			if (!isEmail(element)) {
				alert('the '+element.name+' field must be a valid email address.');
				return false;
			}
		};
	};
	return true; 
};
//获取forms绑定提交按钮
// function prepareForms(){
// 	for (var i = 0; i < document.forms.length; i++) {
// 		var thisform=document.forms[i];
// 		reseFields(thisform);
// 		thisform.onsubmit= function(){
// 			return validateForm(this);
// 		}
// 	};
// };
// addLoadEvent(prepareForms);

/*============ajax提交表单============*/

//XMLHttpRequest兼容所有浏览器
function getHTTPObject(){
	if ( typeof XMLHttpRequest == 'undefined')
	XMLHttpRequest = function(){
		try{ return new ActiveXObject('Msxml2.XMLHTTP.6.0');}catch (e){}
		try{ return new ActiveXObject('Msxml2.XMLHTTP.3.0');}catch (e){}
		try{ return new ActiveXObject('Msxml2.XMLHTTP');}catch (e){}
		return false;
	}
	return new XMLHttpRequest();
};
//移除节点，添加加载图片
function displayAjaxLoading(element){
	while (element.hasChildNodes()) {
		element.removeChild(element.lastChild);
	};
	var content = document.createElement('img');
	content.setAttribute('src','images/loading.gif');
	content.setAttribute('alt','loading...');
	element.appendChild(content);
};
//ajax表单post请求方法
function submitFormWithAjax(whichform,thetarget){
	var request = getHTTPObject();
	if (!request) return false;
	displayAjaxLoading(thetarget);
	var dataParts = [];
	var element;
	for (var i = 0; i < whichform.elements.length; i++) {
		element = whichform.elements[i];
		dataParts[i] = element.name + '='+encodeURIComponent(element.value);
	};
	var data = dataParts.join('&');
	request.open('POST',whichform.getAttribute('action'),true);
	request.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	request.send(data);
	request.onreadystatechange = function () {
		if (request.readyState == 4) {
			if (request.status == 200 || request.status == 0) {
				var matches =request.responseText.match(/<article>([\s\S]+)<\/article>/);
				if (matches.length > 0) {
					thetarget.innerHTML = matches[1];
				}else{
					thetarget.innerHTML = '<p>Oops , there was an error. Sorry.</p>'
				}
			}else{
				thetarget.innerHTML = '<p>'+request.statusText +'</p>';
			};
		};
		return true;
	};
};
//获取forms绑定提交按钮
function prepareForms(){
	for (var i = 0; i < document.forms.length; i++) {
		var thisform = document.forms[i];
		// resetFields(thisform);
		thisform.onsubmit = function(){
			if (!validateForm(this)) return false;
			var article = document.getElementsByTagName('article')[0];
			if (submitFormWithAjax(this,article)) return false;
			return true;
		};
	};
};

addLoadEvent(prepareForms);