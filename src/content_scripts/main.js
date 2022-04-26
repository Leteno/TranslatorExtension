
console.log("hi, now you see me, soon you won't")

function createSimplePanel(text) {
  var t = document.createElement('h1');
  t.id = "my_translator_h1";
  t.innerText = text;
  document.body.appendChild(t);
}

createSimplePanel("I miss you")