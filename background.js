console.log("url vase app kochoulo EMAM");

// chrome.browserAction.onClicked.addListener(function (tabs) {
//   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     chrome.tabs.sendMessage(
//       tabs[0].id,
//       { greeting: "hello" },
//       function (response) {
//         console.log(response.farewell);
//       }
//     );
//   });
// });
let count = 0;
let observedLinkArr = [];

let options_url = chrome.extension.getURL("html/options.html"),
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
  chrome.tabs.query({ url: options_url }, function (tabs) {
    chrome.windows.getAll({ populate: true }, function (windows) {
      windows.forEach(function (window) {
        window.tabs.forEach(function (tab) {
          observedLinkArr.indexOf(tab.url) === -1 && tab.url !== ""
            ? observedLinkArr.push(tab.url)
            : console.log("This item already exists");
          // localStorage.setItem("names", JSON.stringify(names));
          // let storedNames = JSON.parse(localStorage.getItem("names"));
        });
      });
    });
    ////////////////////////////////
    chrome.windows.getAll({ populate: true }, function (windows) {
      let i = 0;
      windows.forEach(function (window) {
        window.tabs.forEach(function (tab) {
          //collect all of the urls here, I will just log them instead
          // console.log(tab.url);
          i++;
        });
      });
      // console.log("tab.url aaaaakahari  3");
      // console.log(i);
    });
    chrome.windows.getAll({ populate: true }, function (allWindows) {
      // console.log("tab.url aaaaakahari 1 ");
      // console.log(allWindows);
    });
    count -= tabs.length;

    // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    //   chrome.tabs.sendMessage(
    //     tabs[0].id,
    //     { greeting: "hello" },
    //     function (response) {
    //       if (response != undefined) console.log(response.farewell);
    //     }
    //   );
    // });
    chrome.tabs.query({}, function (tabs) {
      count += tabs.length;

      callback(count);
    });
  });
};

getStorage = function (callback) {
  chrome.storage.local.get("open_tabs", function (items) {
    // let storedNames = localStorage.getItem("arr1");
    // console.log("Stored Names");
    // console.log(storedNames);
    callback(items.open_tabs);
  });
};

// chrome.browserAction.setBadgeBackgroundColor({ color: "#1E88E5" });

updateBrowserActionBadge = function (open_tabs) {
  if (
    open_tabs === undefined ||
    open_tabs.settings.show_browser_action_count === true
  ) {
    getOpenTabsCount(function (count) {
      //   chrome.browserAction.setBadgeText({ text: count.toString() });
      console.log(" set of observerdLink");
      console.log(observedLinkArr);
    });
  } else {
    // chrome.browserAction.setBadgeText({ text: "" });
  }
};

handleBrowserActionBadgeEvents = function () {
  let tab_listener = function () {
    getStorage(function (open_tabs) {
      return updateBrowserActionBadge(open_tabs);
    });
  };

  getStorage(function (open_tabs) {
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
//   let i = 0;
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

////////////send data to content ////////////////////////////////////////////////////
// chrome.browserAction.onClicked.addListener(function (tabs) {
//   chrome.tabs.query(
//     { active: true, currentWindow: true },
//     function (tabs) {
//       chrome.tabs.sendMessage(
//         tabs[0].id,
//         { greeting: "hello" },
//         function (response) {
//           console.log(response.farewell);
//         }
//       );
//     }
//   );
// });
/////////////////////////////////========
