chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (!msg.command) {
    return;
  }
  if (msg.command === "getTitleAndUrl") {
    try {
      const url = location.href;
      const title = document.title;
      sendResponse({ url, title });
    } catch (error) {
      console.error(error);
      sendResponse({});
    }
    return true;
  }
});
