$(document).ready(function () {
    $('span[data-toggle="sidebar"').click(function () {
        var target = $(this).attr('data-toggle-target');
        var targetClasses = $(target).attr('class');
        if (targetClasses.indexOf('collapsed') === -1) {
            $(target).addClass('collapsed');
            $('.content-container').addClass('extend');
        } else {
            $(target).removeClass('collapsed');
            $('.content-container').removeClass('extend');
        }
    });

    $('aside.sidebar').click(function () {
        if ($(this).attr('class').indexOf('collapsed') !== -1) {
            $(this).removeClass('collapsed');
            $('.content-container').removeClass('extend');
        }
    })

    setTimeout(function() {
        $('.xloading').removeClass('xloading');
    }, 4000)
})
