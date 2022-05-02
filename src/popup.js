
function notifyActiveTab(msg) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, msg, function(response) {
    });
  });
}

const enableCheckbox = document.getElementById("checkbox");
enableCheckbox.addEventListener("click", (event) => {
  let enabled = enableCheckbox.checked;
  console.log(`You like ${enabled}`);
  notifyActiveTab({
    type: "isEnabled",
    value: enabled
  })
})