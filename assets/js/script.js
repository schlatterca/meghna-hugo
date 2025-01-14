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
var synopsisBoxExists = document.getElementsByClassName('open_synopsis_box')[0];

if ( synopsisBoxExists ) {
	/*document.getElementsByClassName('open_synopsis_box')[0].addEventListener('click', function(e) {
	  toggleSynopsisBox();
	});*/

	$('.open_synopsis_box').each(
    function() {
    	$(this).on("click", function() {
				toggleSynopsisBox();
			});
    }
  );

	var synopsisboxisclosed = true;
	function toggleSynopsisBox() {
		if (synopsisboxisclosed) {
			//document.getElementsByClassName('open_synopsis_box')[0].style.transform = "rotate(45deg)";
			//document.getElementsByClassName('synopsis_box')[0].classList.add("isopen");
			
			$('.open_synopsis_box').css('transform', 'rotate(45deg)');
			$('.synopsis_box').addClass('isopen');

			this.synopsisboxisclosed = false;
		} else {
			//document.getElementsByClassName('open_synopsis_box')[0].style.transform = "rotate(0deg)";
			//document.getElementsByClassName('synopsis_box')[0].classList.remove("isopen");
			
			$('.open_synopsis_box').css('transform', 'rotate(0deg)');
			$('.synopsis_box').removeClass('isopen');

			this.synopsisboxisclosed = true;
		}
	}
}

/*OPEN FOOTNOTES BOX*/
var footnotesBoxExists = document.getElementsByClassName('open_footnotes_box')[0];

if ( footnotesBoxExists ) {
	/*document.getElementsByClassName('open_footnotes_box')[0].addEventListener('click', function(e) {
	  toggleFootnotesBox();
	});*/

	$('.open_footnotes_box').each(
    function() {
    	$(this).on("click", function() {
				toggleFootnotesBox();
			});
    }
  );

	var footnotesboxisclosed = true;
	function toggleFootnotesBox() {
		if (footnotesboxisclosed) {
			//document.getElementsByClassName('open_footnotes_box')[0].style.transform = "rotate(45deg)";
			//document.getElementsByClassName('footnotes_box')[0].classList.add("isopen_footnotes");

			$('.open_footnotes_box').css('transform', 'rotate(45deg)');
			$('.footnotes_box').addClass('isopen_footnotes');

			this.footnotesboxisclosed = false;
		} else {
			//document.getElementsByClassName('open_footnotes_box')[0].style.transform = "rotate(0deg)";
			//document.getElementsByClassName('footnotes_box')[0].classList.remove("isopen_footnotes");
				
			$('.open_footnotes_box').css('transform', 'rotate(0deg)');
			$('.footnotes_box').removeClass('isopen_footnotes');

			this.footnotesboxisclosed = true;
		}
	}
}


//BREAK LINES IN SYNOPSIS
var synopsis = document.getElementsByClassName('synopsis')[0];

if ( synopsis ) {
	var synopsis_paragraphs = synopsis.innerHTML.split('&amp;&amp;');

	var paragraphBox = document.createElement('div');
	paragraphBox.setAttribute('class', 'paragraph_box');

	for (let i = 0; i < synopsis_paragraphs.length; i++) {
		var paragraph = document.createElement('p');
		var paragraphText = document.createTextNode(synopsis_paragraphs[i]);
		paragraph.setAttribute('class', 'synopsis');
		paragraph.appendChild(paragraphText);
		paragraphBox.appendChild(paragraph);
	}
	document.getElementsByClassName('synopsis')[0].innerHTML="";
	document.getElementsByClassName('synopsis_box')[0].append(paragraphBox);
}

//BREAK LINES IN FOOTNOTES
var footnotes = document.getElementsByClassName('footnotes')[0];

if ( footnotes ) {
	var footnotes_paragraphs = footnotes.innerHTML.split('&amp;&amp;');

	var paragraphBox = document.createElement('div');
	paragraphBox.setAttribute('class', 'paragraph_box');

	for (let i = 0; i < footnotes_paragraphs.length; i++) {
		var paragraph = document.createElement('p');
		var paragraphText = document.createTextNode(footnotes_paragraphs[i]);
		paragraph.setAttribute('class', 'footnotes');
		paragraph.appendChild(paragraphText);
		paragraphBox.appendChild(paragraph);
		if (i == footnotes_paragraphs.length-1){
			var paragraph_extraSpace = document.createElement('p');
			var extraSpace = document.createTextNode(" ");
			paragraph_extraSpace.setAttribute('class', 'footnotes');
			paragraph_extraSpace.appendChild(extraSpace);
			paragraph_extraSpace.style.whiteSpace = 'break-spaces';
			paragraphBox.appendChild(paragraph_extraSpace);
		}
	}
	document.getElementsByClassName('footnotes')[0].innerHTML="";
	document.getElementsByClassName('footnotes_box')[0].append(paragraphBox);
}

//MAKE AUTHOR'S NAME A LINK
var authorsNameExists = document.getElementById('this_article_author');

if ( authorsNameExists ) {
	var authors_initial = document.getElementById('this_article_author').innerHTML;
	var authors_without_by = authors_initial.replace('by ', '');

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

	    author = author.replaceAll("-", " ");

			let name = document.createElement('a');
			let nameText = document.createTextNode(single_authors[i].replaceAll("-", " "));
			name.setAttribute('href', '..\/..\/indextag#'+author);
			if (i>0) {
				this_article_author.append(', ');
			}
			name.appendChild(nameText);
			document.getElementById('this_article_author').append(name);

		}
		
	} else {

		data = authors_without_by.split(' ');
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

	  author = author.replaceAll("-", " ");

	  let name = document.createElement('a');
		let nameText = document.createTextNode(authors_without_by.replaceAll("-", " "));
		name.setAttribute('href', '..\/..\/indextag#'+author);
		name.appendChild(nameText);
		document.getElementById('this_article_author').innerHTML="";
		document.getElementById('this_article_author').append("by ", name);
	}
}




//FOOTER
var footer = true;
function toggleFooter(e) {
	if (footer) {
		e.style.width = "40vw";
		this.footer = false;
	} else {
		e.style.width = "2em";
		this.footer = true;
	}
}

function showFooterText(e) { //CHECK ??? ###
	var footertexts= document.querySelectorAll('.footer_text_'+e);
	for(var i = 0; i < footertexts.length; ++i) {
		document.getElementsByClassName("footer_text_1")[i].classList.remove('visible');
		document.getElementsByClassName("footer_text_1")[i].classList.add('notvisible');
	}
}

//MAKE EACH IMAGE CLICKABLE TO BE SEEN FULL SCREEN
$('img').addClass('img-enlargeable').click(function() {
  var src = $(this).attr('src');
  var modal;

  function removeModal() {
    modal.remove();
    $('body').off('keyup.modal-close');
  }
  modal = $('<div>').css({
    background: 'RGBA(0,0,0,.5) url(' + src + ') no-repeat center',
    backgroundSize: 'contain',
    width: '100%',
    height: '100%',
    position: 'fixed',
    zIndex: '10000',
    top: '0',
    left: '0',
    cursor: 'zoom-out'
  }).click(function() {
    removeModal();
  }).appendTo('body');
  //handling ESC
  $('body').on('keyup.modal-close', function(e) {
    if (e.key === 'Escape') {
      removeModal();
    }
  });
});




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
