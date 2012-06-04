(function() {
  window.addEventListener('load', function() {
    var child = document.createElement('embed');
    child.type = "application/x-powersaver";
    child.addEventListener('load', function() {
      console.log("child loaded."):
      chrome.extension.onRequest.addListener(function(request, sender, resp) {
        if (request.state !== undefined) {
          child.state = request.state;
          console.log("set state to " + request.state);
        }
      });
    }, false);
    document.body.appendChild(child);
  }, false);
})();