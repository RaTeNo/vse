$(() => {
	// Есть ли поддержка тач событий или это apple устройство
	if (!is_touch_device() || !/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)) $('html').addClass('custom_scroll')


	// Ленивая загрузка
	setTimeout(() => {
		observer = lozad('.lozad', {
			rootMargin : '200px 0px',
			threshold  : 0,
			loaded     : (el) => el.classList.add('loaded')
		})

		observer.observe()
	}, 200)


	// Установка ширины стандартного скроллбара
	$(':root').css('--scroll_width', widthScroll() + 'px')


	// Кнопка 'Вверх'
	$('.buttonUp button').click((e) => {
		e.preventDefault()

		$('body, html').stop(false, false).animate({ scrollTop: 0 }, 1000)
	})


	// Маска ввода
	$('input[type=tel]').inputmask('+7999999999')

	// Кастомный select
	$('select').niceSelect()

	// Фокус при клике на название поля
	$('body').on('click', '.form .label', function() {
		$(this).closest('.line').find('.input, textarea').focus()
	})


	// Fancybox
	$.fancybox.defaults.hash             = false
	$.fancybox.defaults.backFocus        = false
	$.fancybox.defaults.autoFocus        = false
	$.fancybox.defaults.animationEffect  = 'zoom-in-out'
	$.fancybox.defaults.transitionEffect = 'slide'
	$.fancybox.defaults.speed            = 500
	$.fancybox.defaults.gutter           = 40
	$.fancybox.defaults.i18n             = {
		'en': {
			CLOSE       : "Закрыть",
			NEXT        : "Следующий",
			PREV        : "Предыдущий",
			ERROR       : "Запрошенный контент не может быть загружен.<br /> Пожалуйста, повторите попытку позже.",
			PLAY_START  : "Запустить слайдшоу",
			PLAY_STOP   : "Остановить слайдшоу",
			FULL_SCREEN : "На весь экран",
			THUMBS      : "Миниатюры",
			DOWNLOAD    : "Скачать",
			SHARE       : "Поделиться",
			ZOOM        : "Увеличить"
		}
	}

	// Увеличение картинки
	$('.fancy_img').fancybox({
		mobile : {
			clickSlide : "close"
		}
	})


	// Аккордион
	$('.accordion .item .title').click(function(e) {
		e.preventDefault()

		const $item      = $(this).closest('.item'),
			  $accordion = $(this).closest('.accordion')

		if ($item.hasClass('active')) {
			$item.removeClass('active').find('.data').slideUp(300)
		} else {
			$accordion.find('.item').removeClass('active')
			$accordion.find('.data').slideUp(300)

			$item.addClass('active').find('.data').slideDown(300)
		}
	})


	// Моб. версия
	if ($(window).width() < 360) $('meta[name=viewport]').attr('content', 'width=360, user-scalable=no')


	// Моб. меню
	$('.mob_header .mob_menu_btn').click((e) => {
		e.preventDefault()

		$('.mob_header .mob_menu_btn').addClass('active')
		$('body').addClass('menu_open')
		$('header').addClass('show')
		$('.overlay').fadeIn(300)
	})

	$('header > .close, .overlay').click((e) => {
		e.preventDefault()

		$('.mob_header .mob_menu_btn').removeClass('active')
		$('body').removeClass('menu_open')
		$('header').removeClass('show')
		$('.overlay').fadeOut(300)
	})


	if (is_touch_device()) {
		// Закрытие моб. меню свайпом справо на лево
		let ts

		$('body').on('touchstart', (e) => { ts = e.originalEvent.touches[0].clientX })

		$('body').on('touchend', (e) => {
			let te = e.originalEvent.changedTouches[0].clientX

			if ($('body').hasClass('menu_open') && ts > te + 50) {
				// Свайп справо на лево
				$('.mob_header .mob_menu_btn').removeClass('active')
				$('body').removeClass('menu_open')
				$('header').removeClass('show')
				$('.overlay').fadeOut(300)
			} else if (ts < te - 50) {
				// Свайп слева на право
			}
		})
	}
})



$(window).scroll(() => {
	// Кнопка 'Вверх'
	$(window).scrollTop() > 500
		? $('.buttonUp').fadeIn(300)
		: $('.buttonUp').fadeOut(200)
})



$(window).resize(() => {
	// Моб. версия
	$('meta[name=viewport]').attr('content', 'width=device-width, initial-scale=1, maximum-scale=1')
	if ($(window).width() < 360) $('meta[name=viewport]').attr('content', 'width=360, user-scalable=no')
})



// Вспомогательные функции
const is_touch_device = () => !!('ontouchstart' in window)


const widthScroll = () => {
	let div = document.createElement('div')

	div.style.overflowY  = 'scroll'
	div.style.width      = '50px'
	div.style.height     = '50px'
	div.style.visibility = 'hidden'

	document.body.appendChild(div)

	let scrollWidth = div.offsetWidth - div.clientWidth
	document.body.removeChild(div)

	return scrollWidth
}