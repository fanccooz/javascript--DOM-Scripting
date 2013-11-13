/*============原生封装============*/

function addLoadEvent(func){
	var oldonload = window.onload;
	if(typeof window.onload != "function"){
		window.onload =func;
	}else{
		window.onload =function(){
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
		newClassName+="";
		newClassName+=value;
		element.className = newClassName;
	}
};

/*============主导航条效果============*/

//与当前url和导航链接一致的导航添加类
function highlightPage(){
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	var headers=document.getElementsByTagName('header');
	if(headers.length == 0) return false;
	var navs=document.getElementsByTagName('nav');
	if(navs.length == 0) return false;
	var links=document.getElementsByTagName('a');
	for (var i = 0; i < links.length; i++) {
		var linkurl;
		for (var i = 0; i < links.length; i++) {
			linkurl=links[i].href;
			if(window.location.href.indexOf(linkurl) !=-1){
				links[i].className='here';
				var linktext=links[i].lastChild.nodeValue.toLowerCase();
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
	var elem=document.getElementById(elementID);
	if(elem.movement){
		clearTimeout(elem.movement);
	}
	if(!elem.style.left){
		elem.style.left="0px";
	}
	if(!elem.style.left.top){
		elem.style.top="0px";
	}
	var xpos=parseInt(elem.style.left);
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
	elem.style.top =ypos + 'px';
	var repeat = "moveElement("+elementID+","+final_x+","+final_y+","+interval+")";
	elem.movement = setTimeout(repeat,setInterval);
};
//添加img,鼠标移上去发送参数数值
function prepareSlideshow(){
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById) return false;
	if (!document.getElementById('intro')) return false;
	var intro=document.getElementById('intro');
	var slideshow=document.createElement('div');
	slideshow.setAttribute('id','slideshow');
	var preview = document.createElement('img');
	preview.setAttribute('src','images/fire.png');
	preview.setAttribute('alt','a glimpse of what awaits you')
	preview.setAttribute('id','preview');
	preview.style.width='750px';
	slideshow.appendChild(preview);
	insertAfter(slideshow,intro);
	var links=intro.getElementsByTagName('a');
	var destination;
	for (var i = 0; i < links.length; i++) {	
		links[i].onmouseover = function(){
			destination=this.getAttribute('href');
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
	var sections=document.getElementsByTagName('section');
	for (var i = 0; i < sections.length; i++) {
		if (sections[i].getAttribute('id') != id){
			sections[i].style.display='none';
		}else{
			// document.getElementById(id).style.display='block';
			sections[i].style.display='block';
		};
	};
};
//导航获取,点击并且传送id
function prepareInternalnav(){
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	var articles=document.getElementsByTagName('article');
	if (articles.length ==0 ) return false;
	var navs=articles[0].getElementsByTagName('nav');
	if (navs.length == 0) return false;
	var links=navs[0].getElementsByTagName('a');
	for (var i = 0; i < links.length; i++) {
		var slideId=links[i].href.split('#')[1];
		if (!document.getElementById(slideId)) continue;
		document.getElementById(slideId).style.display='none';
		links[i].destination=slideId;
		links[i].onclick=function(){
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
	var imagesR=whichpic.getAttribute('href');
	var placeholder=document.getElementById('placeholder');
	placeholder.setAttribute('src',imagesR);
	if (whichpic.getAttribute('title')) {
		var text=whichpic.getAttribute('title');
	} else{
		var text='';
	};
	description=document.getElementById('description');
	if (description.firstChild.nodeType == 3) {
		description.firstChild.nodeValue=text;
	};
	return false;
};
//在ul标签后来添加p标签和img标签
function preparePlaceholder(){
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById) return false;
	if (!document.createTextNode) return false;
	if (!document.getElementById('imagegallery')) return false;
	var gallery=document.getElementById('imagegallery');
	var placeholder=document.createElement('img');
	placeholder.setAttribute('id','placeholder');
	placeholder.setAttribute('src','images/photos.png');
	placeholder.setAttribute('alt','images');
	var description=document.createElement('p');
	description.setAttribute('id','description');
	var descriptionText=document.createTextNode('choose an images');
	description.appendChild(descriptionText);
	insertAfter(description,gallery);	
	insertAfter(placeholder,description);
};
//获取a标签并且绑定点击事件
function prepareGallery(){
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById) return false;
	if (!document.getElementById('imagegallery')) return false;
	var gallery=document.getElementById('imagegallery');
	var links=gallery.getElementsByTagName('a');
	for (var i = 0; i < links.length; i++) {
		links[i].onmouseover=function(){
			return showPic(this);
		};
	};
};
//调用函数
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);