var hub = $.connection.hub;
var symetra = $.connection.symetra;
var mem = {
    userinfo: {
        username: "",
        displayname: "",
        photo: ""  
    },
    tooltip: {
        timer: 0
    },
    pages: {},
    intervals: []
};
$.ajaxSetup({
    cache: true
});
symetra.client.debug = function (text) {
    console.log(text);
};
symetra.client.setPage = function (page) {
    location.hash = page;
    clearAllIntervals();
    $('#page_style').attr('href', './Static/Pages/' + page + '/' + page + '.css');
    $('#body').html($('#skeleton').html()).load('./Static/Pages/' + page + '/' + page + '.html', function() {
        $.getScript('./Static/Pages/' + page + '/' + page + '.js');
    });
};
symetra.client.gatherUserData = function(username, displayname, photo) {
    mem.userinfo.username = username;
    mem.userinfo.displayname = displayname;
    mem.userinfo.photo = 'data:image/jpeg;base64,' + photo[0];
    $('#user_button_image').attr('style', 'background-image:url(\'' + mem.userinfo.photo + '\');');
    $('#user_button').attr('tooltip', displayname);
}
$(document).ready(function() {
    hub.start().done(function () {
        symetra.server.connected(location.hash.replace('#', ''));
    });
});
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
window.onhashchange = function() {
    symetra.client.setPage(location.hash.replace('#', ''));
};
window.setIntervalNormal = window.setInterval;
window.setInterval = function(callback, interval) {
    var result = window.setIntervalNormal(callback, interval);
    mem.intervals.push(result);
    return result;
};
window.clearAllIntervals = function() {
    $.each(mem.intervals, function(k, v) {
        window.clearInterval(v);
    });
};