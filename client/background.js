document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
var Fetcher = window.BackgroundFetch;

// Your background-fetch handler.
var fetchCallback = function() {
    console.log('[js] BackgroundFetch initiated');

    // perform some ajax request to server here
    $.get({
        url: '/heartbeat.json',
        callback: function(response) {
            // process your response and whatnot.

            Fetcher.finish();   // <-- N.B. You MUST called #finish so that native-side can signal completion of the background-thread to the os.
        }
    });
}
var failureCallback = function(error) {
    console.log('- BackgroundFetch failed', error);
};
Fetcher.configure(fetchCallback, failureCallback, {
    stopOnTerminate: false  // <-- true is default
});
}