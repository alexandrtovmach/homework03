function arrows() {
	document.addEventListener('scroll', function () {
		if(window.pageYOffset > 50) {
			arrow.className = '';
		} else {
			arrow.className = 'hidden';
		}
	})
}
function scrollToTop() {
	var inter = setInterval(function () {
		var a = -20;
		a = (window.pageYOffset <= 100)? ((window.pageYOffset <= 50)? a/10: a/1): a/0.5;
		window.scrollBy(0, a.toFixed(1));
		if (window.pageYOffset == 0) {clearInterval(inter)};
	}, 1000/60);
};

function contCreate() {
    var arrAllP = document.getElementsByTagName('article')[0].getElementsByTagName('h2');
    var names = []
    for (var i = 0; i < arrAllP.length; i++) {
        names[i] = arrAllP[i].innerHTML;
        arrAllP[i].setAttribute('id', ('p' + i))
    }
    var charp = document.getElementsByClassName('c_as_menu')[0].getElementsByTagName('ul')[0];
    var li = document.createElement('li')
    for (var i = 0; i < names.length; i++) {
        var li = document.createElement('li');
        li.setAttribute('charpenter', ('p' + i));
        li.onclick = function(event) {scrollToElem(event)}
        li.innerHTML = names[i];
        charp.appendChild(li);
    }
}
function scrollToElem(targ) {
    var elem = document.getElementById(targ.target.getAttribute('charpenter')).parentElement;
    var b = (elem.getBoundingClientRect().top < 0)? -1: 1;
    var inter = setInterval(function () {
        var a = 50;
        var dist = elem.getBoundingClientRect().top*b;
        a = (dist <= 120*b)? ((dist <= 50*b)? a/20: a/10): a/2;
        window.scrollBy(0, a.toFixed(1)*b);
        if (elem.getBoundingClientRect().top*b <= 120*b) {clearInterval(inter)};
    }, 1000/60);
}