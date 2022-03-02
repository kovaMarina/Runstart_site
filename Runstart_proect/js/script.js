$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1200,
      /*   adaptiveHeight: true, */
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    dots: true,
                    arrows: false
                }
            }
        ]
    });

//madal
$('[data-modal=consultation]').on('click', function(){
    $('.overlay, #consultation').fadeIn('slow');
})
$('.modal__close').on('click',function(){
    $('.overlay, #consultation, #thanks, #order').fadeOut('slow')
})



$('.catalog_item_mini').each(function(i) {
    $(this).on('click',function(){
        $('#order .modal__descr').text($('.catalog_item_subtitle').eq(i).text());
        $('.overlay, #order').fadeIn('slow');
    })
})

$('#consultation-form form').validate();
$('#order form').validate();
$('#consultation form').validate({
    rules: {
        name: "required",
        phone: "required",
        email: {
            required: true,
            email: true
        }
    }
})


$('input[phone=phone]').mask("+7 (999) 999-99-99");

$('form').submit(function(e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "../mailer/smart.php",
        data: $(this).serialize()
    }).done(function() {
        $(this).find("input").val("");
        $('#consultation, #order').fadeOut();
        $('.overlay, #thanks').fadeIn('slow');

        $('form').trigger('reset');
    });
    return false;
});

});
