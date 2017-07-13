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
		a = (window.pageYOffset <= 100)? ((window.pageYOffset <= 50)? a/10: a): a*(window.pageYOffset / 200);
		window.scrollBy(0, a.toFixed(1));
		if (window.pageYOffset == 0) {clearInterval(inter)};
	}, 1000/60);
};

function contCreate() {
    var arrAllP = document.getElementsByTagName('article')[0].getElementsByTagName('h2');
    var names = [];
	var u = 0;
    for (var i = 0; i < arrAllP.length; i++) {
		if (arrAllP[i].parentElement.offsetWidth) {
			names[u] = arrAllP[i].innerHTML;
			arrAllP[i].setAttribute('id', ('p' + i));
			u++;
		}
    }
    var charp = document.getElementsByClassName('c_as_menu')[0].getElementsByTagName('ul')[0];
	charp.innerHTML = null;
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
        var a = 10;
        var dist = elem.getBoundingClientRect().top*b;
        a = (dist <= 200*b)? ((dist <= 50*b)? a/10: a/5): a*((Math.abs(dist) / 500) + 1);
        window.scrollBy(0, a.toFixed(1)*b);
        if ((b > 0)&&(elem.getBoundingClientRect().top <= 120)) {clearInterval(inter)}
        if ((b < 0)&&(elem.getBoundingClientRect().top >= 120)) {clearInterval(inter)}
    }, 1000/60);
}