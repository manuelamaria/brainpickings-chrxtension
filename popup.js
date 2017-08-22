const ERROR_CODE_CONTAINER_NOT_FOUND = 1;

document.addEventListener('DOMContentLoaded', function() {
  chrome.tabs.executeScript(
    null, 
    {'code': 'var ERROR_CODE_CONTAINER_NOT_FOUND = '+ ERROR_CODE_CONTAINER_NOT_FOUND + ';'}, 
    function() {
      chrome.tabs.executeScript(null, {file: "bpextension.js"})
    }
  );
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    var container = document.getElementById('container');
    var message = JSON.parse(request);

    if (message.type === 'error') {
      if (message.errorCode === ERROR_CODE_CONTAINER_NOT_FOUND) {
        container.innerHTML = 'Due to recent changes in brainpickings.org we are unable to show results.';
      }
    } else {
      var links = message.links;
      var list = "<ul>";
      links.map(function(item) {
        list = `${list}<li><a href='${item.location}'>${item.text}</a></li>`;
      });
      list = `${list}</ul>`;      

      container.innerHTML = list;
    }
});