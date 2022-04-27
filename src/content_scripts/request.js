
function queryByBing(text, onresult) {
  fetch("https://cn.bing.com/ttranslatev3?isVertical=1&&IG=F6B56D4F15E941A78C2288A66ECFF99D&IID=translator.5023.1", {
    "headers": {
      "accept": "*/*",
      "accept-language": "en-US,en;q=0.9",
      "cache-control": "no-cache",
      "content-type": "application/x-www-form-urlencoded",
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
      "x-client-data": "eyIxIjoiMiIsIjIiOiIxIiwiMyI6IjAiLCI0IjoiNTkzNTkyOTAxMzIwMDc2Mjk1NCIsIjUiOiJcImpMZHZobG02cEVRa3A5MGtWeXkwVmZYY3l1S2VtNGtQTXZxa3dPeXdPNmM9XCIiLCI2Ijoic3RhYmxlIiwiNyI6IjM1NjQ4MjI4NTU5MyIsIjgiOiIxIiwiOSI6ImRlc2t0b3AifQ=="
      },
      "referrer": "https://cn.bing.com/translator",
      "referrerPolicy": "origin-when-cross-origin",
      "body": `&fromLang=en&text=${escape(text)}&to=yue&token=wki7r2JJULsNOv8IaDiJPET8IVYuVEUC&key=1651068292081`,
      "method": "POST",
      "mode": "cors",
      "credentials": "include"
    }).then(response => response.json()).then(data => {console.log(`got the data: ${JSON.stringify(data)}`); onresult(data[0]['translations'][0]['text']);});
}