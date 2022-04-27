
function queryByBingT2(text, onresult) {
  fetch(`https://www.bing.com/dict/SerpHoverTrans?q=${escape(text)}`, {
    "headers": {
      "accept": "*/*",
      "accept-language": "en-US,en;q=0.9",
      "cache-control": "no-cache",
      "pragma": "no-cache",
      "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"100\", \"Microsoft Edge\";v=\"100\"",
      "sec-ch-ua-arch": "\"x86\"",
      "sec-ch-ua-bitness": "\"64\"",
      "sec-ch-ua-full-version": "\"100.0.1185.50\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-model": "",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-ch-ua-platform-version": "\"14.0.0\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-client-data": "eyIxIjoiMiIsIjIiOiIxIiwiMyI6IjAiLCI0IjoiNTkzNTkyOTAxMzIwMDc2Mjk1NCIsIjUiOiJcImpMZHZobG02cEVRa3A5MGtWeXkwVmZYY3l1S2VtNGtQTXZxa3dPeXdPNmM9XCIiLCI2Ijoic3RhYmxlIiwiNyI6IjM1NjQ4MjI4NTU5NCIsIjgiOiIxIiwiOSI6ImRlc2t0b3AifQ=="
    },
    "referrer": "https://www.bing.com/search?q=hello+world&form=QBLHCN&sp=-1&pq=&sc=8-0&qs=n&sk=&cvid=BA4F8CC4E4E842A9BD370F4B0B5D55B7",
    "referrerPolicy": "origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors",
    "credentials": "include"
  })
    .then(response => response.text())
    .then(data => {
      console.log(data);
      onresult(data);
    });
}

function queryByBing(text, onresult) {
  queryByBingT2(text, onresult);
}

chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name === "translator");
  port.onMessage.addListener(function(msg) {
    if (msg.type === "query") {
      queryByBing(msg.data, function(data) {
        port.postMessage({"type": "update_div", "data": data})
      })
    }
  });
});