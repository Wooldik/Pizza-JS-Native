import Clear from "./Clear.js";

// Модальное окно
// import Clear from ' адрес'
// открыть по кнопке
$(".js-button-campaign").click(function () {
	$(".text-center").css("filter", "blur(5px)");
	$(".js-overlay-campaign").fadeIn();
	$(".js-overlay-campaign").addClass("disabled");
});

// закрыть на крестик
$(".js-close-campaign").click(function () {
	$(".js-overlay-campaign").fadeOut();
	$(".text-center").css("filter", "none");

});
