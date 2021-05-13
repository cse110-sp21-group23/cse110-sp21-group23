function expandComponent(e) {
  
  var content = e.nextElementSibling;

  if (content.style.maxHeight) {
    content.style.maxHeight = null;
  }
  else {
    content.style.maxHeight = content.scrollHeight + "px";
  }
}