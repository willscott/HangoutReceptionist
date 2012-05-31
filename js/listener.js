(function() {
  var findNotificationButton = function() {
    var notificationLinkQuery = document.evaluate(
        '//a[@href="/u/0/notifications/all"]',
        document.body,
        null,
        XPathResult.ANY_TYPE,
        null);
    var link = notificationLinkQuery.iterateNext();
    return link;
  };
  
  var modificationListener = function(element, e) {
    var count = 0;
    try {
      count = parseInt(element.innerText.trim());
    } catch (e) {}
    if (count) {
      // Find a hangout.
    }
  };

  var listenToElement = function(element) {
    var boundListener = modificationListener.bind(this, element);
    element.addEventListener('DOMSubtreeModified', boundListener, false);
    element.addEventListener('DOMNodeRemoved', function(e) {
      element.removeEventListener('DOMSubtreeModified', boundListener, false);
    }, false);
  };

  addEventListener('load', function() {
    var link = findNotificationButton();
    listenToElement(link);
  }, false);
})();