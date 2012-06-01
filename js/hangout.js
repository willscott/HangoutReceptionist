(function() {
  var findJoinButton = function() {
    var buttonQuery = document.evaluate(
        '//div[@role="button"]',
        document.body,
        null,
        XPathResult.ANY_TYPE,
        null);
    var link;
    while (link = buttonQuery.iterateNext()) {
      if (link.innerText.indexOf("Join") > -1) {
        return link;
      }
    }
    return null;
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
  
  var maybeTakeAction = function(button) {
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
  };

  var waitForClose = function() {
    document.addEventListener('DOMSubtreeModified', function() {
      if (document.body.innerText.indexOf("Waiting for people to enter this hangout") > 0) {
        window.close();
      }
    }, false);
  }

  window.setTimeout(function() {
    var join = findJoinButton();
    if (join) {
      maybeTakeAction(join);
      waitForClose();
    }
  }, 5000);
})();
