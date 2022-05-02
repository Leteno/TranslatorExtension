
function notifyActiveTab(msg) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, msg, function(response) {
    });
  });
}

const enableCheckbox = document.getElementById("checkbox");
chrome.storage.local.get(['enable'], function(result) {
  console.log('Value currently is ' + result.key);
  enableCheckbox.checked.result.key;
});
enableCheckbox.addEventListener("click", (event) => {
  let enabled = enableCheckbox.checked;
  chrome.storage.local.set({'enable': enabled}, function() {
    console.log('Value is set to ' + value);
  });
  console.log(`You like ${enabled}`);
  notifyActiveTab({
    type: "isEnabled",
    value: enabled
  })
})