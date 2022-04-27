
console.log("hi, now you see me, soon you won't")

function createSimplePanel(text, x, y) {
  var div = document.createElement('div');
  div.className = "my_translation_div";
  div.style.left = x + "px";
  div.style.top = y + "px";

  var t = document.createElement('p');
  t.className = "my_translation_text";
  t.innerText = text;

  div.appendChild(t);
  document.documentElement.appendChild(div);
}

function getSelectionText() {
  var txt = '';
  if (window.getSelection) {
    txt = window.getSelection();
  }
  else if (document.getSelection) {
    txt = document.getSelection();
  }
  else if (document.selection) {
    txt = document.selection.createRange().text;
  }
  return txt;
}

function main() {
  document.addEventListener('mouseup', (event) => {
    var selection = getSelectionText();
    createSimplePanel(selection, event.clientX + window.scrollX, event.clientY + window.scrollY);
  })
}

main()