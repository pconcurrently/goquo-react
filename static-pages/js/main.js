$('span[data-toggle="sidebar"').click(function() {
    var target = $(this).attr('data-toggle-target');
    var targetClasses = $(target).attr('class');
    if (targetClasses.indexOf('collapsed') === -1) {
        $(target).addClass('collapsed');
    } else {
        $(target).removeClass('collapsed');
    }
});
