/**
 * Created by Alexandr on 07.07.2017.
 */
function init() {
    document.getElementsByClassName('c_aside')[0].addEventListener('click', showSideBar);
	document.addEventListener('click', function (event) {
		if ((!phaseSmallMenu)||(event.target == document.getElementsByClassName('h_panelBar')[0])||
		(event.target == document.getElementsByTagName('INPUT')[0])||
		(event.target == document.getElementsByClassName('h_search')[0])) {return}
		document.getElementsByClassName('h_panel')[0].style.display = 'none';
		phaseSmallMenu = 0;
	});
}

var phaseSideBar = 0;
var phaseSmallMenu = 0;

function showSideBar() {
    var element = document.getElementsByClassName('c_aside')[0]
    if (!phaseSideBar) {
        element.firstElementChild.style.left = '0px';
        phaseSideBar = 1;
    } else {
        element.firstElementChild.style.left = '';
        phaseSideBar = 0;
    }
}
function smallMenuShow() {
	var elem = document.getElementsByClassName('h_panelBar')[0];
	elem.previousElementSibling.style.display = 'block';
	elem.previousElementSibling.style.top = elem.getBoundingClientRect().top + 40 + 5 + 'px';
	elem.previousElementSibling.style.right = '5px';
	phaseSmallMenu = 1;
}

function loadContent() {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'https://api.myjson.com/bins/152f9j');
	xhr.send();
	xhr.onload = function () {
        if (xhr.status == 200) {
            var a = JSON.parse(xhr.responseText).data[0];
            var b = new Post(a.title, a.description, a.image, a.createdAt, a.tags);
            document.getElementsByClassName('c_article')[0].appendChild(b);
            var a = JSON.parse(xhr.responseText).data[1];
            var b = new Post(a.title, a.description, a.image, a.createdAt, a.tags);
            document.getElementsByClassName('c_article')[0].appendChild(b);
            var a = JSON.parse(xhr.responseText).data[2];
            var b = new Post(a.title, a.description, a.image, a.createdAt, a.tags);
            document.getElementsByClassName('c_article')[0].appendChild(b);
            contCreate();
        }
    }
	function Post(header, paragraph, img, date, tags) {
		var postDiv = document.createElement('div'),
			h2 = document.createElement('h2'),
			p =  document.createElement('p'),
			pict =  document.createElement('img'),
			spanDate =  document.createElement('span'),
			divTag =  document.createElement('div');
		h2.innerHTML = header;
        p.innerHTML = paragraph;
        pict.src = img;
        pict.alt = header.substr(0, 5);
        spanDate.innerHTML = (new Date(Date.parse(date))).toLocaleString('ru').split(', ').join('<br>');
        if (tags) {
            for (var i = 0; i < tags.length; i++) {
            	var spanTag =  document.createElement('span');
                spanTag.innerHTML = tags[i];
                divTag.appendChild(spanTag);
            }
        }
        postDiv.appendChild(h2);
        postDiv.appendChild(pict);
        postDiv.appendChild(p);
        postDiv.appendChild(divTag);
        postDiv.appendChild(spanDate);
		postDiv.className = "c_ar_content";
		return postDiv
	}
}