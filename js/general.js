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
	var json;
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'https://api.myjson.com/bins/152f9j');
	xhr.send();
	xhr.onload = function () {
        if (xhr.status == 200) {
            json = JSON.parse(xhr.responseText).data;
			showPost()
        } else {
			alert('Sorry, but server not response\n' + xhr.status + ' : ' + xhr.statusText)
		}
    }
	
	//check localStorage to liked tags
	function checkLocalStorage() {
		if(!localStorage.getItem('tagsOfPost')) {
			return false;
		} else {
			return localStorage.getItem('tagsOfPost').split(',');
		}
	}
	//select Post for showing
	function showPost() {
		var arrLikesTags = []
		if (!(checkLocalStorage())) {
			selectTags(json);
		} else {
			arrLikesTags = checkLocalStorage();
			//set only liked post to likedPosts from json
			var likedPosts = [];
			strt: for (var key in json) {
				for (var i = 0; i < json[key].tags.length; i++) {
					for (var e = 0; e < arrLikesTags.length; e++) {
						if (arrLikesTags[e] == json[key].tags[i]) {
							likedPosts.push(json[key]);
							continue strt;
						}
					}
				}
			}
			likedPosts.sort(sortToDate)
			//sort function
			function sortToDate(a, b) {
				if (Date.parse(a.createdAt) < Date.parse(b.createdAt)) {
					return 1;} 
				if (Date.parse(a.createdAt) > Date.parse(a.createdAt)) {
					return -1}
			}
			//show in DOM all sorted liked post
			for (var r = 0; r < likedPosts.length; r++) {
				var b = new Post(likedPosts[r]);
				document.getElementsByClassName('c_article')[0].appendChild(b);
			}
			//create side nav menu
			contCreate()
		}
		
		//show form to select likes tags
		function selectTags(json) {
			var formSelect = document.forms.selectTag;
			formSelect.className = 'selectTag';
			//onsubmit form preventDefault and get checked tags to arrLikesTags and add to localStorage
			formSelect.onsubmit = function (event) {
				event.preventDefault();
				var arrInput = formSelect.getElementsByTagName('input');
				for (var i = 0; i < arrInput.length; i++) {
					if (arrInput[i].checked) {
						arrLikesTags.push(arrInput[i].value)
					}
				}
				formSelect.className = 'hidden';
				localStorage.setItem('tagsOfPost', arrLikesTags);
				showPost();
			}
			//push all tags to uniqeTags
			var uniqeTags = [];
			for (var key in json) {
				for (var i = 0; i < json[key].tags.length; i++) {
					uniqeTags.push(json[key].tags[i])
				}
			}
			//remove duplicate from uniqeTags
			uniqeTags = unique(uniqeTags)
			//create checkbox
			for (var w = 0; w < uniqeTags.length; w++) {
				var checkboxEl = document.createElement('input'),
					labelEl = document.createElement('label');
				checkboxEl.type = 'checkbox';
				checkboxEl.value = uniqeTags[w];
				labelEl.innerHTML = uniqeTags[w];
				labelEl.prepend(checkboxEl);
				formSelect.prepend(labelEl);
			}
			formSelect.classList.remove('hidden');
		}
	}
	
	//function for remove duplicate
	function unique(arr) {
		var obj = {};
	
		for (var i = 0; i < arr.length; i++) {
			var str = arr[i];
			obj[str] = true;
		}
		return Object.keys(obj);
	}
	//constructor of Post
	function Post(obj) {
		var postDiv = document.createElement('div'),
			h2 = document.createElement('h2'),
			p =  document.createElement('p'),
			pict =  document.createElement('img'),
			spanDate =  document.createElement('span'),
			divTag =  document.createElement('div');
		h2.innerHTML = obj.title;
        p.innerHTML = obj.description;
        pict.src = obj.image;
        pict.alt = obj.title.substr(0, 5);
        spanDate.innerHTML = (new Date(Date.parse(obj.createdAt))).toLocaleString('ru').split(', ').join('<br>');
        if (obj.tags) {
            for (var i = 0; i < obj.tags.length; i++) {
            	var spanTag =  document.createElement('span');
                spanTag.innerHTML = obj.tags[i];
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































