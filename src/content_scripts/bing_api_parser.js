
/**
 * 
 * @param {*} div 
 * @param {*} bing_output 
 * <div>
 *   <span id=\"ht_logo\"></span>
 *   <h4>written</h4>
 *   <span class=\"ht_attr\" lang=\"en\">[ˈrɪt(ə)n] </span>
 *   <ul>
 *     <li><span class=\"ht_pos\">adj.</span> <span class=\"ht_trs\">书面的；笔头的；以书信（或文件等）形式的；成文的</span></li>
 *   </ul>
 *   <ul>
 *     <li><span class=\"ht_pos\">v.</span><span class=\"ht_trs\">“write”的过去分词</span></li>
 *   </ul>
 * </div>
 */
function show(div, bing_output) {
  for (let i = 0; i < div.childNodes.length; i++) {
    div.removeChild(div.childNodes[i]);
  }
  if (!bing_output || bing_output.length == 0) {
    let h1 = document.createElement('p')
    h1.innerText = "Something wrong, sorry, we don't support multi-words yet."
    div.appendChild(h1);
    return;
  }
  const parser = new DOMParser()
  var htmlElement = parser.parseFromString(bing_output, "text/html");
  var target_div = htmlElement.body.childNodes[0];
  target_div.id = "ht_content";
  var mid_div = document.createElement('div');
  mid_div.id = "ht_pop";
  mid_div.className = "hts_pop"
  mid_div.appendChild(target_div)
  div.appendChild(mid_div);
}