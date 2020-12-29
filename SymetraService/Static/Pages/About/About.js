mem.pages.About = {
    stats: {}
};
setInterval(getStats, 500);
function setStats() {
    $.each(mem.pages.About.stats, function(k, v) {
        $('.about_statistics .' + k).text(v);
    });
}
function getStats() {
    symetra.server.getSymetraStats().done(function(data) {
        mem.pages.About.stats = data;
        setStats();
    }); 
}
getStats();