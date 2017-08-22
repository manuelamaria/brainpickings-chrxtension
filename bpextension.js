var MAIN_CONTAINER_CLASS_NAME = "entry_content";
var REGEX_HTML_ELEMENTS = /<[a-z][\s\S]*>/;
var REGEX_ORIGIN = /^https:\/\/www.brainpickings.org/;

var message;

var container = document.getElementsByClassName(MAIN_CONTAINER_CLASS_NAME);
if (container.length === 0) {
    message = {
        'type' : 'error',
        'errorCode' : ERROR_CODE_CONTAINER_NOT_FOUND
    };
} else {
    var linksCollection = container[0].getElementsByTagName('a');
    var result = [];
    for (item of linksCollection) {
        if (item.href.match(REGEX_ORIGIN) && !item.innerHTML.match(REGEX_HTML_ELEMENTS)) {
            result.push({
                'location' : item.href,
                'text' : item.innerHTML
            });
        }
    }
    message = {
        'type' : 'valid',
        'links' : result
    }
}

chrome.runtime.sendMessage(JSON.stringify(message));