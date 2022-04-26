
console.log("hi, now you see me, soon you won't")

function createSimplePanel(text) {
  var t = document.createElement('h1');
  t.id = "my_translator_h1";
  t.innerText = text;
  document.body.appendChild(t);
}

createSimplePanel("I miss you")

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
    console.log(`Position: ${event.clientX} ${event.clientY}`)
    var selection = getSelectionText();
    console.log(`selection is ${selection}`);
  })
}

main()