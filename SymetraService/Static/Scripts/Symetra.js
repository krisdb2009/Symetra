var hub = $.connection.hub;
var symetra = $.connection.symetra;
var mem = {
    username: "",
    tooltip: {
        timer: 0
    }
};
hub.start().done(function () {
    symetra.server.connected();
});
symetra.client.debug = function (text) {
    $('#body').text(text);
};
symetra.client.setUsername = function(text) {
    mem.username = text;
    $('#username').text(text);
}
$('html').on('mouseenter', '.tooltip', function() {
    var item = $(this);
    var tooltip = $('#tooltip');
    mem.tooltip.timer = setTimeout(function() {
        tooltip.text(item.attr('tooltip'));
        var top = item[0].offsetTop + item[0].clientHeight + 10;
        var left = item[0].offsetLeft - (tooltip[0].clientWidth / 2) + (item[0].clientWidth / 2);
        tooltip.attr('style', 'top:' + top + 'px;left:' + left + 'px;');
        tooltip.addClass('visible');
    }, 500); 
});
$('html').on('mouseleave mousedown', '.tooltip', function() {
    var tooltip = $('#tooltip');
    clearTimeout(mem.tooltip.timer);
    tooltip.removeClass('visible');
    setTimeout(function() {
        tooltip.attr('style', null);
    }, 500);
});
$('html').on('click', '#menu_button', function(e) {
    e.stopImmediatePropagation();
    $('#menu').toggleClass('visible');
});
$('html').on('click', function(e) {
    if($('#menu')[0] !== $(e.target)[0] && $('#menu').hasClass('visible')) {
        $('#menu').removeClass('visible');
    } 
});