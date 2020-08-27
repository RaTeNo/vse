$(() => {
	// Регистрация
	$('.auth .form .next_btn').click(function(e){
		e.preventDefault()

		$('.auth .form .step1').hide()
		$('.auth .form .step2').fadeIn(300)
	})


	// Обсуждение
	$('.responses .response .dialog_btn').click(function(e) {
		e.preventDefault()

		const $parent = $(this).closest('.response')

		if ($(this).hasClass('active')) {
			$(this).removeClass('active')

			$parent.find('.dialog').slideUp(500)
		} else {
			$(this).addClass('active')

			$parent.find('.dialog').slideDown(500)
		}
	})

	$('.request_info .data .dialog_btn').click(function(e) {
		e.preventDefault()

		const $parent = $(this).closest('.request_info')

		if ($(this).hasClass('active')) {
			$(this).removeClass('active')

			$parent.find('.dialog').slideUp(500)
		} else {
			$(this).addClass('active')

			$parent.find('.dialog').slideDown(500)
		}
	})


	// Отклик
	$('.request_info .data .respond_btn').click(function(e) {
		e.preventDefault()

		const $parent = $(this).closest('.request_info')

		if ($(this).hasClass('active')) {
			$(this).removeClass('active')

			$parent.find('.response_form').slideUp(500)
		} else {
			$(this).addClass('active')

			$parent.find('.response_form').slideDown(500)
		}
	})


	// Всплывающие окна
	var messageModal = $('#message_modal')

	if(messageModal.length){
		$.fancybox.open({
			src   : messageModal,
			type  : 'inline',
			touch : false
		})
	}
})