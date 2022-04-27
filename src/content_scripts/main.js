
console.log("hi, now you see me, soon you won't")

function createSimplePanel(text, x, y) {
  var div = document.createElement('div');
  div.className = "my_translation_div";
  div.style.left = x + "px";
  div.style.top = y + "px";

  var t = document.createElement('p');
  t.className = "my_translation_text";
  t.innerText = text;
  queryByBing(text, function(result) {
    t.innerText = result;
  })

  div.appendChild(t);
  document.documentElement.appendChild(div);
}

function removeSimplePanels() {
  var div_list = document.getElementsByClassName("my_translation_div");
  for (let i = 0; i < div_list.length; i++) {
    document.documentElement.removeChild(div_list[i]);
  }
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

function getSelectionChecker() {
  var lastSelection = "";
  return function(selection) {
    var finalText = `${selection}`.trim();
    console.log(`finalText '${finalText}', lastText: '${lastSelection}'`)
    if (finalText.length == 0) {
      lastSelection = "";
      return false;
    }
    if (lastSelection == finalText) {
        return false;
    }
    lastSelection = finalText;
    return true;
  }
}

function main() {
  var checker = getSelectionChecker();
  document.addEventListener('mouseup', (event) => {
    var selection = getSelectionText();
    if (checker(selection)) {
      createSimplePanel(selection, event.clientX + window.scrollX, event.clientY + window.scrollY);
    } else {
      removeSimplePanels()
    }
  })
  document.addEventListener('mousedown', (event) => {
    removeSimplePanels()
  })
}

main()