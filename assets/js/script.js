/* ========================================================================= */
/*	CARLO SCRIPT: HOVERING SIDEBAR + FOOTER
/* ========================================================================= */

/*var sidebar = true;
function toggleSidebar() {
  if (sidebar) {
    document.getElementsByClassName("navigation")[0].style.width = "400px";
    document.getElementsByClassName("section")[0].style.marginLeft = "400px";

    document.getElementsByClassName("navbar-left")[0].style.marginLeft = "0px";
    document.getElementsByClassName("navbar-brand")[0].style.marginLeft = "20px";
    this.sidebar = false;
  } else {
    document.getElementsByClassName("navigation")[0].style.width = "50px";
    document.getElementsByClassName("section")[0].style.marginLeft = "50px";

    document.getElementsByClassName("navbar-left")[0].style.marginLeft = "-290px";
    document.getElementsByClassName("navbar-brand")[0].style.marginLeft = "-30px";
    this.sidebar = true;
  }
}*/

//DESKTOP SIDEBAR
document.getElementById('menu_lid').addEventListener('mouseover', function(e) {
  toggleSidebar();
});
document.getElementById('menu_lid').addEventListener('mouseout', function(e) {
  untoggleSidebar();
});

document.getElementById("navigation").addEventListener('mouseover', function(e) {
  toggleSidebar();
});
document.getElementById("navigation").addEventListener('mouseout', function(e) {
  untoggleSidebar();
});

function toggleSidebar() {
  if(window.innerWidth >= 768){
    document.getElementById("menu_lid").style.marginLeft = "calc(50vw - 5px)";
    document.getElementById("navigation").style.width = "50vw";
  }
}
function untoggleSidebar() {
  if(window.innerWidth >= 768){
    document.getElementById("menu_lid").style.marginLeft = "-5px";
    document.getElementById("navigation").style.width = "0px";
  }
}

//OPEN SYNOPSIS BOX
document.getElementsByClassName('open_synopsis_box')[0].addEventListener('click', function(e) {
  toggleSynopsisBox();
});
var synopsisboxisclosed = true;
function toggleSynopsisBox() {
	if (synopsisboxisclosed) {
		document.getElementsByClassName('open_synopsis_box')[0].style.transform = "rotate(45deg)";
		document.getElementsByClassName('synopsis_box')[0].classList.add("isopen");
		this.synopsisboxisclosed = false;
	} else {
		document.getElementsByClassName('open_synopsis_box')[0].style.transform = "rotate(0deg)";
		document.getElementsByClassName('synopsis_box')[0].classList.remove("isopen");
		this.synopsisboxisclosed = true;
	}
}

//MAKE AUTHOR'S NAME A LINK
var authors_initial = document.getElementById('this_article_author').innerHTML;
var authors_without_by = authors_initial.replace('by', '');

if (authors_without_by.includes(', ')){

	document.getElementById('this_article_author').innerHTML="";
	document.getElementById('this_article_author').append('by ');

	var single_authors = authors_without_by.split(', ');

	for (let i = 0; i < single_authors.length; i++) { //for each result in "persontags"…

    data = single_authors[i].split(' ');

    for (var j = 0; j < data.length; j++) { //capitalize first letter
      data[j] = data[j].charAt(0).toUpperCase() + data[j].slice(1);
    }

    if (data.length == 4) { //rearrange
      var author = data[3] + ' ' + data[0] + ' ' + data[1] + ' ' + data[2];
    } if (data.length == 3) {
      var author = data[2] + ' ' + data[0] + ' ' + data[1];
    } if (data.length == 2) {
      var author = data[1] + ' ' + data[0];
    }

    var name = document.createElement('a');
		var nameText = document.createTextNode(single_authors[i]);

		console.log(i, name[i], name[0], name, nameText);

		//name[i].setAttribute('href', 'https://harfenlabor.netlify.app/persontags#'+author);
		

		if (i>0) {
			//name.append(', ');
		}

		//name.appendChild(nameText);

		document.getElementById('this_article_author').append(name);

	}
	
} else {

	data = authors_without_by.split(' ');
	for (var j = 0; j < data.length; j++) { //capitalize first letter
    data[j] = data[j].charAt(0).toUpperCase() + data[j].slice(1);
  }
  if (data.length == 4) { //rearrange
    var author_0 = data[3] + ' ' + data[0] + ' ' + data[1] + ' ' + data[2];
  } if (data.length == 3) {
    var author_0 = data[2] + ' ' + data[0] + ' ' + data[1];
  } if (data.length == 2) {
    var author_0 = data[1] + ' ' + data[0];
  }
  var name_0 = document.createElement('a');
	var name_0Text = document.createTextNode(authors_without_by);
	name_0.setAttribute('href', 'https://harfenlabor.netlify.app/persontags#'+author_0);
	name_0.appendChild(name_0Text);
	document.getElementById('this_article_author').innerHTML="";
	document.getElementById('this_article_author').append("by ", name_0);
}






//FOOTER
var footer = true;
function toggleFooter() {
  if (footer) {
    document.getElementById("footer").style.height = "250px";
    this.footer = false;
  } else {
    document.getElementById("footer").style.height = "28px";
    this.footer = true;
  }
}

function showFooterText(e) {
	var footertexts= document.querySelectorAll('.footer_text_'+e);
	for(var i = 0; i < footertexts.length; ++i) {
		document.getElementsByClassName("footer_text_1")[i].classList.remove('visible');
		document.getElementsByClassName("footer_text_1")[i].classList.add('notvisible');
		document.getElementsByClassName("footer_text_2")[i].classList.remove('visible');
		document.getElementsByClassName("footer_text_2")[i].classList.add('notvisible');
		document.getElementsByClassName("footer_text_3")[i].classList.remove('visible');
		document.getElementsByClassName("footer_text_3")[i].classList.add('notvisible');
		document.getElementsByClassName("footer_text_4")[i].classList.remove('visible');
		document.getElementsByClassName("footer_text_4")[i].classList.add('notvisible');
		document.getElementsByClassName("footer_text_5")[i].classList.remove('visible');
		document.getElementsByClassName("footer_text_5")[i].classList.add('notvisible');
		document.getElementsByClassName("footer_text_6")[i].classList.remove('visible');
		document.getElementsByClassName("footer_text_6")[i].classList.add('notvisible');

		document.getElementsByClassName("footer_text_"+e)[i].classList.remove('notvisible');
		document.getElementsByClassName("footer_text_"+e)[i].classList.add('visible');
	}
}



/* ========================================================================= */
/*	Page Preloader
/* ========================================================================= */

$(window).on('load', function () {
	$('.preloader').fadeOut(100);
});

jQuery(function ($) {
	"use strict";

	/* ========================================================================= */
	/*	lazy load initialize
	/* ========================================================================= */

	const observer = lozad(); // lazy loads elements with default selector as ".lozad"
	observer.observe();

	/* ========================================================================= */
	/*	Magnific popup
	/* =========================================================================  */
	$('.image-popup').magnificPopup({
		type: 'image',
		removalDelay: 160, //delay removal by X to allow out-animation
		callbacks: {
			beforeOpen: function () {
				// just a hack that adds mfp-anim class to markup
				this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
				this.st.mainClass = this.st.el.attr('data-effect');
			}
		},
		closeOnContentClick: true,
		midClick: true,
		fixedContentPos: false,
		fixedBgPos: true
	});

	/* ========================================================================= */
	/*	Portfolio Filtering Hook
	/* =========================================================================  */

	var containerEl = document.querySelector('.shuffle-wrapper');
	if (containerEl) {
		var Shuffle = window.Shuffle;
		var myShuffle = new Shuffle(document.querySelector('.shuffle-wrapper'), {
			itemSelector: '.shuffle-item',
			buffer: 1
		});

		jQuery('input[name="shuffle-filter"]').on('change', function (evt) {
			var input = evt.currentTarget;
			if (input.checked) {
				myShuffle.filter(input.value);
			}
		});
	}

	/* ========================================================================= */
	/*	Testimonial Carousel
	/* =========================================================================  */

	$("#testimonials").slick({
		infinite: true,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 4000
	});

	/* ========================================================================= */
	/*	animation scroll js
	/* ========================================================================= */



	function myFunction(x) {
		if (x.matches) {
			var topOf = 50
		} else {
			var topOf = 350
		}
	}

	var html_body = $('html, body');
	$('nav a, .page-scroll').on('click', function () { //use page-scroll class in any HTML tag for scrolling
		if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				html_body.animate({
					scrollTop: target.offset().top - 50
				}, 1500, 'easeInOutExpo');
				return false;
			}
		}
	});

	// easeInOutExpo Declaration
	jQuery.extend(jQuery.easing, {
		easeInOutExpo: function (x, t, b, c, d) {
			if (t === 0) {
				return b;
			}
			if (t === d) {
				return b + c;
			}
			if ((t /= d / 2) < 1) {
				return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
			}
			return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
		}
	});

	/* ========================================================================= */
	/*	counter up
	/* ========================================================================= */
	function counter() {
		var oTop;
		if ($('.count').length !== 0) {
			oTop = $('.count').offset().top - window.innerHeight;
		}
		if ($(window).scrollTop() > oTop) {
			$('.count').each(function () {
				var $this = $(this),
					countTo = $this.attr('data-count');
				$({
					countNum: $this.text()
				}).animate({
					countNum: countTo
				}, {
					duration: 1000,
					easing: 'swing',
					step: function () {
						$this.text(Math.floor(this.countNum));
					},
					complete: function () {
						$this.text(this.countNum);
					}
				});
			});
		}
	}
	$(window).on('scroll', function () {
		counter();
	});

});
