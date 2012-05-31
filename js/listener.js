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

  var findStreamContainer = function() {
    var streamQuery = document.evaluate(
        '//div[@guidedhelpid="streamcontent"]',
        document.body,
        null,
        XPathResult.ANY_TYPE,
        null);
    var div = streamQuery.iterateNext();
    return div;
  }; 
   
  var findHangoutButton = function() {
    var hangoutButtonQuery = document.evaluate(
        '//div[@guidedhelpid="hangouts"]//div[@role="button"]',
        document.body,
        null,
        XPathResult.ANY_TYPE,
        null);
    var button;
    while(button = hangoutButtonQuery.iterateNext()) {
      if (!button) {break;}
      if (button.innerText.indexOf("Hang out") > -1) {
        return button;
      }
    }
  };
  
  var quietPhase = 0;
  var inQuietPhase = function() {
    return (new Date() - quietPhase) / 1000 < 120; // 2 minutes, for calming.
  };
  var startQuietPhase = function() {
    quietPhase = new Date();
  };
  
  var makeMouse = function(what) {
    var evt = document.createEvent("MouseEvents");
    evt.initMouseEvent("mouse" + what, true, true, window, 0,0,0,0,0,false,false,false,false,0,null);
    return evt;
  };
  
  var maybeTakeAction = function() {
    var button = findHangoutButton();
    if (button && !inQuietPhase()) {
      console.log("clicking");
      window.setTimeout(function() {
        var over = makeMouse("over");
        button.dispatchEvent(over);
      }, 1);
      window.setTimeout(function() {
        var down = makeMouse("down");
        button.dispatchEvent(down);
      }, 100);
      window.setTimeout(function() {
        var up = makeMouse("up");
        button.dispatchEvent(up);
      }, 200);
      startQuietPhase();
    }
  }
  
  var modificationListener = function(element, e) {
    var count = 0;
    try {
      count = parseInt(element.innerText.trim());
    } catch (e) {}
    if (count) {
      element.click();
      maybeTakeAction();
    }
  };
  var postListener = function(element, e) {
    var postQuery = document.evaluate(
        '//div[starts-with(@id,"update-")]',
        element,
        null,
        XPathResult.ANY_TYPE,
        null);
    var firstPost = postQuery.iterateNext();
    if (firstPost) {
      if (firstPost.innerText.indexOf("Hang out") > -1) {
        window.setTimeout(maybeTakeAction, 2000); //let the post animate in.
      }
    }
  };

  var listenToElement = function(element, handler) {
    var boundListener = handler.bind(this, element);
    element.addEventListener('DOMSubtreeModified', boundListener, false);
    element.addEventListener('DOMNodeRemoved', function(e) {
      element.removeEventListener('DOMSubtreeModified', boundListener, false);
    }, false);
  };

  addEventListener('load', function() {
    var stream = findStreamContainer();
    if (stream) {
      listenToElement(stream, postListener);      
    } else {
      var link = findNotificationButton();
      listenToElement(link, modificationListener);
    }
  }, false);
})();