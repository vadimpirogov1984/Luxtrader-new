//Адаптивное меню=========================================
let user_icon = document.querySelector(".user-header__icon");
user_icon.addEventListener("click", function (e) {
  let user_menu = document.querySelector(".user-header__menu");
  user_menu.classList.toggle("_active");
});

let menu_icon = document.querySelector(".menu__icon");
menu_icon.addEventListener("click", function (e) {
  let icon_menu = document.querySelector(".icon-menu");
  let body_menu = document.querySelector(".menu__body");

  icon_menu.classList.toggle("_active");
  body_menu.classList.toggle("_active");
});

document.documentElement.addEventListener("click", function (e) {
  if (!e.target.closest(".user-header")) {
    let user_menu = document.querySelector(".user-header__menu");
    user_menu.classList.remove("_active");
  }
});
//Скрипт для фоновых изображений=========================
function ibg() {
  let ibg = document.querySelectorAll(".ibg");

  for (var i = 0; i < ibg.length; i++) {
    if (ibg[i].querySelector("img")) {
      ibg[i].style.backgroundImage =
        "url(" + ibg[i].querySelector("img").getAttribute("src") + ")";
    }
  }
}

ibg();
//Слайдер главного экрана==================================
$(document).ready(function () {
  $(".slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: $(".control-main-slider__arrow_prev"),
    nextArrow: $(".control-main-slider__arrow_next"),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  });
});

//Слайдер блока Лоты========================================
$(document).ready(function () {
  $(".slider-lots__slider").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    infinite: true,
    //variableWidth: true,
    //adaptiveHeight: true,
    prevArrow: $(".control-slider-lots__arrow_prev"),
    nextArrow: $(".control-slider-lots__arrow_next"),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: true,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
        },
      },
    ],
  });
});
// Корректировка слайдера для работы с 3мя слайдами
let maxSlidesToShow = 7;
while ($('.slider-lots__slider > div').length <= maxSlidesToShow) {
  $('.slider-lots__slider > div').each(function() {
    $(this).clone().appendTo('.slider-lots__slider');
  });
};

//Слайдер блока Цитаты======================================
$(document).ready(function () {
  $(".slider-quotes__body").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    infinite: true,
    prevArrow: $(".control-slider-quotes-prev"),
    nextArrow: $(".control-slider-quotes-next"),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  });
});

//Перброска части кода в другое место кода================
let move_array=[];
if($('*[data-move]')){
	$.each($('*[data-move]'), function(index, val) {
		if($(this).data('move')!='' && $(this).data('move')!=null){
			$(this).attr('data-move-index',index);
			move_array[index]={
				'parent':$(this).parent(),
				"index":$(this).index()
			};
		}
	});
}
function dynamic_adaptive(){
		let w=$(window).outerWidth();
	$.each($('*[data-move]'), function(index, val) {
		if($(this).data('move')!='' && $(this).data('move')!=null){
				let dat_array=$(this).data('move').split(',');
				let dat_parent=$('.'+dat_array[0]);
				let dat_index=dat_array[1];
				let dat_bp=dat_array[2];
			if(w<dat_bp){
				if(!$(this).hasClass('js-move_done_'+dat_bp)){
					if(dat_index>0){
						$(this).insertAfter(dat_parent.find('*').eq(dat_index-1));
					}else{
						$(this).prependTo(dat_parent);
					}
					$(this).addClass('js-move_done_'+dat_bp);
				}
			}else{
				if($(this).hasClass('js-move_done_'+dat_bp)){
					dynamic_adaptive_back($(this));
					$(this).removeClass('js-move_done_'+dat_bp);
				}
			}
		}
	});
}
function dynamic_adaptive_back(el){
		let index_original=el.data('move-index');
		let move_place=move_array[index_original];
		let parent_place=move_place['parent'];
		let index_place=move_place['index'];
	if(index_place>0){
		el.insertAfter(parent_place.find('*').eq(index_place-1));
	}else{
		el.prependTo(parent_place);
	}
}
$(window).resize(function(event) {
	dynamic_adaptive();
});
	dynamic_adaptive();