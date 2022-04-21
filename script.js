window.onload = function () {
	document.body.classList.add('loaded_hiding');
	window.setTimeout(function () {
	  document.body.classList.add('loaded');
	  document.body.classList.remove('loaded_hiding');
	}, 500);
 }

let burger = document.querySelector('.burger'),
 	 burgerMenu = document.querySelector('.burger-menu');

burger.addEventListener('click', function() {
	if (burger.classList.contains('active')) {
		burger.classList.remove('active');
		burgerMenu.classList.remove('active');
		burgerMenu.classList.add('hidden');
	} else {
		burger.classList.add('active');
		burgerMenu.classList.add('active');
		burgerMenu.classList.remove('hidden');
	}
});


/*POPUP*/
let popupForm = document.querySelector('.popup-form'),
	 introButton = document.querySelector('.intro__button'),
	 closePopupBtn = document.querySelector('.form-closebtn'),
	 popupWindow = document.querySelector('.popup-form__window');

introButton.addEventListener('click', function() {
	if (popupForm.classList.contains('hidden')) {
		popupForm.classList.remove('hidden');
	} else { 
		popupForm.classList.add('hidden');
	};
});

closePopupBtn.addEventListener('click', function() {
	if (!popupForm.classList.contains('hidden')) {
		popupForm.classList.add('hidden');
	}
});

/*PHONE MASK*/ 
let phoneInputs = document.querySelectorAll('input[data-tel-input]');
let phoneInputsPop = popupForm.querySelectorAll('input[data-tel-input]');


let getInputNumbersValue = function(input) {
	return input.value.replace(/\D/g, "");
}

let onPhoneInput = function(e) {
	let input = e.target,
		 inputNumbersValue = getInputNumbersValue(input);
		 formattedInputValue = "",
		 selectionStart = input.selectionStart;

	if (!inputNumbersValue) {
		return input.value = "";
	}

	if (input.value.length != selectionStart) {
		if (e.data && /\D/g.test(e.data)) {
			input.value = inputNumbersValue;
		}

		return;
	}

	if (["7", "8"].indexOf(inputNumbersValue[0]) > -1) {
		//KZ Number
		if (inputNumbersValue[0] == "7", "8") {
			let firstSymbols = (inputNumbersValue[0] == "8") ? "8" : "+7";
			formattedInputValue = firstSymbols + " ";
			if (inputNumbersValue.length > 1) {
				formattedInputValue += "" + inputNumbersValue.substring(1, 4);
			}
			if (inputNumbersValue >= 5) {
				formattedInputValue += " " + inputNumbersValue.substring(4, 7);
			}
			if (inputNumbersValue >= 7) {
				formattedInputValue += " " + inputNumbersValue.substring(7, 9);
			}
			if (inputNumbersValue >= 9) {
				formattedInputValue += " " + inputNumbersValue.substring(9, 11);
			}
		}
	} else {
		//Not KZ number
		formattedInputValue = "+" + inputNumbersValue;
	}
	input.value = formattedInputValue;
}

let onPhoneKeyDown = function(e) {
	let input = e.target;
	if (e.keyCode == 8 && getInputNumbersValue(input).length > 1) {
		input.value = getInputNumbersValue(input);
	} else if (e.keyCode == 8 && getInputNumbersValue(input).length == 1) {
		input.value = "";
	}
}

let onPhonePaste = function(e) {
	let pasted = e.clipboardData || window.clipboardData,
		input = e.target,
		inputNumbersValue = getInputNumbersValue(input);

		if (pasted) {
			let pastedText = pasted.getData("Text");
			if (/\D/g.test(pastedText)) {
				input.value = inputNumbersValue;
			}
		}
}


for (i = 0; i < phoneInputs.length; i++) {
	let input = phoneInputs[i];
	input.addEventListener('input', onPhoneInput);
	input.addEventListener('keydown', onPhoneKeyDown);
	input.addEventListener('paste', onPhonePaste);
}

let formPopup = document.querySelector('.popup-form'),
	 formWebsites = document.querySelector('.form-block__form--websites'),
	 formChatbots = document.querySelector('.form-block__form--chatbots'),
	 formSuccess = document.querySelector('.popup-success');


/*SUBMIT*/
'use strict'
$('form').submit(function(e) {
	e.preventDefault();
	$.ajax({
		type: "POST",
		url: "send.php",
		data: $(this).serialize()
	}).done(function() {
		$(this).find("input").val("");

		formPopup.classList.add('hidden');
		formSuccess.classList.remove('hidden');
		setTimeout(function(){ 
		formSuccess.classList.add('hidden');
		}, 3000);
		$('form').trigger('reset');
	});
	return false;
});

$('form').submit(function(e) {
	e.preventDefault();
	$.ajax({
		type: "POST",
		url: "send.php",
		data: $(this).serialize()
	}).done(function() {
		$(this).find("input").val("");

		formChatbots.classList.add('hidden');
		formSuccess.classList.remove('hidden');
		setTimeout(function(){ 
		formSuccess.classList.add('hidden');
		}, 3000);
		$('form').trigger('reset');
	});
	return false;
});

$('form').submit(function(e) {
	e.preventDefault();
	$.ajax({
		type: "POST",
		url: "send.php",
		data: $(this).serialize()
	}).done(function() {
		$(this).find("input").val("");

		formWebsites.classList.add('hidden');
		formSuccess.classList.remove('hidden');
		setTimeout(function(){ 
		formSuccess.classList.add('hidden');
		}, 3000);
		$('form').trigger('reset');
	});
	return false;
});

/*SLIDER*/ 
let position = 0;
const slidesToShow = 1,
		slidesToScroll = 1,
		container = document.querySelector('.slider-container'),
		track = document.querySelector('.slider-track'),
		btnPrev = document.querySelector('.slider-buttons__prev'),
		btnNext = document.querySelector('.slider-buttons__next'),
		items = document.querySelectorAll('.slider-item'),
		itemsCount = items.length,
		itemWidth = container.clientWidth / slidesToShow,
		movePosition = slidesToScroll * itemWidth;

items.forEach((item) => {
	item.style.minWidth = `${itemWidth}px`;
});

btnPrev.addEventListener('click', () => {
	const itemsLeft = Math.abs(position) / itemWidth;
	position += itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
	setPosition();
	checkButtons();
});

btnNext.addEventListener('click', () => {
	const itemsLeft = itemsCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;
	position -= itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
	setPosition();
	checkButtons();
});

const setPosition = () => {
	track.style.transform = `translateX(${position}px)`;
};

const checkButtons = () => {
	btnPrev.disabled = position === 0;
	btnNext.disabled = position <= -(itemsCount - slidesToShow) * itemWidth;
};

checkButtons();