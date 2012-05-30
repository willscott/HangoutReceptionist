var plusoneurl = "https://apis.google.com/js/plusone.js?onload=onPlusOneLoaded_&googleapis=1";
var plusone = document.createElement("script");
plusone.type = "text/javascript";
plusone.async = true;
plusone.src = plusoneurl;
document.body.appendChild(plusone);
window.onPlusOneLoaded_ = function() {
  console.log("Plusone API Loaded");
}