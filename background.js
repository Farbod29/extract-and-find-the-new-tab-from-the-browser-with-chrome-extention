// console.log("background is running nOww");
// //courage function activity

// chrome.browserAction.onClicked.addListener(function (CurrTab) {
//   // var CurrTab = tabs[0];
//   chrome.tabs.sendMessage(CurrTab.id, "run", function (response) {
//     console.log(response.farewell);
//   });
// });

// chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
//   console.log(response.farewell);
// });

chrome.browserAction.onClicked.addListener(function (tabs) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { greeting: "hello" },
      function (response) {
        console.log(response.farewell);
      }
    );
  });
});

// function buttonClicked(tab) {
//   console.log("Button Clicked!");
//   //     console.log(tab);
// chrome.browserAction.onClicked.addListener(function () {

// });
//}
// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   console.log(
//     sender.tab
//       ? "from a content script:" + sender.tab.url
//       : "from the extension"
//   );
//   if (request.greeting === "hello") sendResponse({ farewell: "goodbye" });
// });
// chrome.tabs.query(
//   {
//     active: true,
//     currentWindow: true,
//   },
//   function (tabs) {
//     var tab = tabs[0];
//     var url = tab.url;
//     console.log("url vase app kochoulo");
//     console.log(url);
//   }
// );
// console.log("url vase app kochoulo EMAM");

// chrome.tabs.sendMessage("toggle 222");

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   console.log(
//     sender.tab
//       ? "from a content script:" + sender.tab.url
//       : "from the extension"
//   );
//   console.log("request.greeting");
//   console.log(request.currentUlr);
//   sendResponse({ farewell: "goodbye umad" });
// });

// chrome.runtime.onMessage.addListener(function (msg, sendResponse) {
//   console.log("received " + msg.type);
//   if ((msg.type = "ACTIVITY_HISTORY_READY")) {
//     console.log("msg.sosis");
//     console.log(msg.sosis);
//     if (historyData) {
//       sendResponse({
//         type: "HISTORY_DATA",
//         position: historyData.position,
//         company: historyData.company,
//       });
//       historyData = "";
//     } else {
//       sendResponse({
//         type: "NO_DATA",
//       });
//     }
//   }
// });
/*** 
var options_url = chrome.extension.getURL("html/options.html"),
  openOptionsPage,
  getOpenTabsCount,
  getStorage,
  updateBrowserActionBadge,
  handleBrowserActionBadgeEvents;

// --------------------------------------------------------------------------------------------------------
// Functions

openOptionsPage = function (hash) {
  chrome.tabs.query({ url: options_url }, function (tabs) {
    // console.log(options_url);
    if (tabs.length > 0) {
      chrome.tabs.update(
        tabs[0].id,
        { active: true, highlighted: true, currentWindow: true },
        function (current_tab) {
          chrome.windows.update(current_tab.windowId, { focused: true });
        }
      );
    } else {
      chrome.tabs.create({
        url: hash !== undefined ? options_url + "#" + hash : options_url,
      });
      //   console.log("options_url");
      //   console.log(options_url);
    }
  });
};

getOpenTabsCount = function (callback) {
  var count = 0;

  chrome.tabs.query({ url: options_url }, function (tabs) {
    chrome.windows.getAll({ populate: true }, function (windows) {
      windows.forEach(function (window) {
        window.tabs.forEach(function (tab) {
          //collect all of the urls here, I will just log them instead
          console.log("tab.url xxx2");

          let x = tab.url;
          console.log(x);
        });
      });
    });
    ////////////////////////////////
    // chrome.windows.getAll({ populate: true }, function (windows) {
    //   var i = 0;
    //   windows.forEach(function (window) {
    //     window.tabs.forEach(function (tab) {
    //       //collect all of the urls here, I will just log them instead
    //       console.log(tab.url);
    //       i++;
    //     });
    //   });
    //   console.log("tab.url aaaaakahari  3");
    //   console.log(i);
    // });
    // chrome.windows.getAll({ populate: true }, function (allWindows) {
    //   console.log("tab.url aaaaakahari 1 ");
    //   console.log(allWindows);
    // });
    count -= tabs.length;

    chrome.tabs.query({}, function (tabs) {
      count += tabs.length;

      callback(count);

      let currentUlr = window.location.toString();
      console.log("currentUlr22");
      console.log(currentUlr);
      /// send message to content.js

      
      var CurrTab = tabs[0];
      chrome.tabs.sendMessage(CurrTab.id, "run");
    });
  });
};

getStorage = function (callback) {
  chrome.storage.local.get("open_tabs", function (items) {
    callback(items.open_tabs);
    // console.log("items.open_tabs");
    // console.log(items.open_tabs);
  });
};

// chrome.browserAction.setBadgeBackgroundColor({ color: "#1E88E5" });

updateBrowserActionBadge = function (open_tabs) {
  // console.log("open_tabs");
  // console.log(open_tabs);
  if (
    open_tabs === undefined ||
    open_tabs.settings.show_browser_action_count === true
  ) {
    getOpenTabsCount(function (count) {
      //   chrome.browserAction.setBadgeText({ text: count.toString() });
      console.log("count");
      console.log(count);
    });
  } else {
    // chrome.browserAction.setBadgeText({ text: "" });
  }
};

handleBrowserActionBadgeEvents = function () {
  var tab_listener = function () {
    getStorage(function (open_tabs) {
      return updateBrowserActionBadge(open_tabs);
    });
  };

  getStorage(function (open_tabs) {
    let currentUlr = window.location.toString();
    console.log(" currentUlr asdasdasd");
    console.log(currentUlr);
    // console.log("tab_listener");
    // console.log(tab_listener);
    if (
      open_tabs === undefined ||
      open_tabs.settings.show_browser_action_count === true
    ) {
      chrome.tabs.onCreated.addListener(tab_listener);
      chrome.tabs.onRemoved.addListener(tab_listener);
    } else {
      chrome.tabs.onCreated.removeListener(tab_listener);
      chrome.tabs.onRemoved.removeListener(tab_listener);
    }

    updateBrowserActionBadge(open_tabs);
  });
};

// --------------------------------------------------------------------------------------------------------
// Events

// chrome.browserAction.onClicked.addListener(function () {
//   openOptionsPage();
// });

handleBrowserActionBadgeEvents();

chrome.runtime.onInstalled.addListener(function (details) {
  // console.log("details");
  // console.log(details);
  switch (details.reason) {
    case "install":
      openOptionsPage("install");
      break;
    case "update":
      getStorage(function (open_tabs) {
        if (open_tabs === undefined || open_tabs.settings === undefined) {
          return;
        }
        if (
          open_tabs.settings !== undefined &&
          open_tabs.settings.enable_new_version_notification === true &&
          details.previousVersion !== chrome.runtime.getManifest().version
        ) {
          openOptionsPage("update/" + chrome.runtime.getManifest().version);
        }
      });
      break;
  }
});

////////////////////////////////////////////////////////////////

// chrome.windows.getAll({ populate: true }, function (allWindows) {
//   console.log("tab.url aaaaakahari 1 ");
//   console.log(allWindows);
// });

// chrome.windows.getAll({ populate: true }, function (windows) {
//   windows.forEach(function (window) {
//     window.tabs.forEach(function (tab) {
//       //collect all of the urls here, I will just log them instead
//       console.log("tab.url aaaaakahari 2");
//       console.log(tab.url);
//     });
//   });
// });
// ////////////////////////////////
// chrome.windows.getAll({ populate: true }, function (windows) {
//   var i = 0;
//   windows.forEach(function (window) {
//     window.tabs.forEach(function (tab) {
//       //collect all of the urls here, I will just log them instead
//       console.log(tab.url);
//       i++;
//     });
//   });
//   console.log("tab.url aaaaakahari  3");
//   console.log(i);
// });


***/
