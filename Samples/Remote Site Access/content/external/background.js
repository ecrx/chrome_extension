var html = '<div id="ECRHOME" style="-webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none;  user-select: none; z-index:1000000000; display:block; position:absolute; left:10px; top:0px; text-align:center;"><a href="chrome-extension://mdcelgbejldflfecmfpfddnaabgabofd/content/newtab.html" style="color:#FFF; padding:20px; font-size:14px; background:#333; line-height:50px; text-decoration:none;">Home</a></div>';
var button = document.createElement('div');
button.innerHTML = html;
document.body.appendChild(button);
 var draggable = document.getElementById('ECRHOME');
  draggable.addEventListener('touchmove', function(event) {
    var touch = event.targetTouches[0];
 
    // Place element where the finger is
    draggable.style.left = touch.pageX-25 + 'px';
    draggable.style.top = touch.pageY-25 + 'px';
    event.preventDefault();
  }, false);
