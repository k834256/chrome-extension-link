async function getActiveTabId() {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      resolve(tabs[0].id);
    });
  });
}

async function sendMessage(tabId, object) {
  return new Promise((resolve, reject) => {
    chrome.tabs.sendMessage(tabId, object, (message) => {
      resolve(message);
    });
  });
}

window.addEventListener("load", async (e) => {
  try {
    const activeTabId = await getActiveTabId();
    const result = await sendMessage(activeTabId, {
      command: "getTitleAndUrl",
    });
    const textareaPlain = document.getElementById("textareaPlain");
    textareaPlain.value = `${result["title"]}\n${result["url"]}`;
    textareaPlain.addEventListener("focus", onInputTextFocus);
    const inputTextHtml = document.getElementById("inputTextHtml");
    inputTextHtml.value = `<a href="${result["url"]}">${result["title"]}</a>`;
    inputTextHtml.addEventListener("focus", onInputTextFocus);
    const inputTextMarkdown = document.getElementById("inputTextMarkdown");
    inputTextMarkdown.value = `[${result["title"]}](${result["url"]})`;
    inputTextMarkdown.addEventListener("focus", onInputTextFocus);
  } catch (error) {
  }
});

function onInputTextFocus(event) {
  event.target.select();
}