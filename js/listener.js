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
  
  var listenToElement = function(element) {
    var modificationListener = function(e) {
      console.log('hi');
    };
    element.addEventListener('DOMSubtreeModified',modificationListener, false);
    element.addEventListener('DOMNodeRemoved', function(e) {
      element.removeEventListener('DOMSubtreeModified', modificationListener, false);
    }, false);
  };

  addEventListener('load', function() {
    var link = findNotificationButton();
    listenToElement(link);
  }, false);
})();