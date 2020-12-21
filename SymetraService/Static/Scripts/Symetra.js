var hub = $.connection.hub;
var symetra = $.connection.symetra;
hub.start().done(function () {
    symetra.server.connected();
});
symetra.client.debug = function (text) {
    document.body.append(text);
};