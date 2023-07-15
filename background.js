// general error handler.
function onError(error) {
  console.log(`Error: ${error}`);
}

//load css on focus change
function listener(tabId) {
  let insert = browser.scripting.insertCSS({
    files: ["/css/spassmodus.css"],
    origin: "USER",
    target: {
      tabId: tabId,
    },
  });
  insert.then(null, onError);
}

//add relevant event listeners
browser.tabs.onUpdated.addListener(listener);
console.log("Background.js finished");
