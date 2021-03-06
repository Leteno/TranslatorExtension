
console.log("hi, now you see me, soon you won't")

let _enable = true;
let my_translation_active_div = null;
var port = null;
function renewPort() {
  console.log("port is renewing");
  port = chrome.runtime.connect({name: "translator"});

  port.onMessage.addListener(function(msg) {
    console.log(`main.js receive msg ${JSON.stringify(msg)}`)
    if (msg.type === "update_div") {
      if (my_translation_active_div) {
        show(my_translation_active_div, msg.data)
      }
    }
  });
  port.onDisconnect.addListener(function(msg) {
    port = null;
    console.log("port is disconnected")
  });

}

function createSimplePanel(text, x, y) {
  var div = document.createElement('div');
  div.className = "my_translation_div";
  div.style.left = x + "px";
  div.style.top = y + "px";
  div.style.overflow = "hidden";
  div.style.boxSizing = "border-box";
  div.style.display = "inline-block !important";
  div.style.position = "absolute";
  div.style.zIndex = 2147483646;
  div.style.pointerEvents = "none";
  div.style.backgroundColor = "white";
  div.style.border = "1px solid #e0e0e0";
  div.style.boxShadow = "0 2px 6px #e0e0e0";

  var t = document.createElement('p');
  t.className = "my_translation_text";
  t.innerText = `Translating...`;

  div.appendChild(t);
  document.documentElement.appendChild(div);
  my_translation_active_div = div;
  if (port == null) {
    renewPort();
  }
  port.postMessage({type: 'query', data: escape(`${text}`.trim())});
}

function removeSimplePanels() {
  my_translation_active_div = null;
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
    if (checker(selection) && _enable) {
      createSimplePanel(selection, event.clientX + window.scrollX, event.clientY + window.scrollY);
    } else {
      removeSimplePanels()
    }
  })
  document.addEventListener('mousedown', (event) => {
    removeSimplePanels()
  });
  chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
      console.log(`main.js: ${JSON.stringify(request)}`)
      if (request.type == undefined) {
        return;
      }
      if (request.type == "isEnabled") {
        console.log("got message about isEnabled: " + (!!request.value));
        _enable = !!request.value;
      }
    }
  );
}
main()