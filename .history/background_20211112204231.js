console.log("url vase app kochoulo EMAM");

let count = 0;
let observedLinkArr = [];
let uniqueCount = 0;
let newUniqueCount = 0;

// function locationHashChanged() {
//   if (location.hash === '#cool-feature') {
//     console.log("You're visiting a cool feature! xxxx0000");
//   }
// }
// document.getElementById("myBtn").addEventListener("click", function () {
//   alert("Hello World!111");
// });

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
    if (tabs.length > 0) {
      chrome.tabs.update(
        tabs[0].id,
        { active: true, highlighted: true, currentWindow: true },

        function (current_tab) {
          chrome.windows.update(current_tab.windowId, { focused: true });
        }
      );
    } else {
      window.addEventListener(hash, function () {
        //url hash # has changed
        console.log(" //url hash # has changed 3");
      });
      chrome.tabs.create({
        url: hash !== undefined ? options_url + "#" + hash : options_url,
      });
    }
  });
};

getOpenTabsCount = function (callback) {
  chrome.tabs.query({ url: options_url }, function (tabs) {
    chrome.windows.getAll({ populate: true }, function (windows) {
      windows.forEach(function (window) {
        window.tabs.forEach(function (tab) {
          observedLinkArr.indexOf(tab.url) === -1 &&
          tab.url !== "" &&
          tab.url !== "chrome://newtab/" // ( x )? if x true: if x false
            ? observedLinkArr.push(tab.url)
            : console.log("This URL item already exists");
        });
      });
    });
    ////////////////////////////////
    chrome.windows.getAll({ populate: true }, function (windows) {
      let i = 0;
      windows.forEach(function (window) {
        window.tabs.forEach(function (tab) {
          i++;
        });
      });
    });
    chrome.windows.getAll({ populate: true }, function (allWindows) {});
    count -= tabs.length;
    chrome.tabs.query({}, function (tabs) {
      count += tabs.length;

      callback(count);
    });
  });
};

getStorage = function (callback) {
  chrome.storage.local.get("open_tabs", function (items) {
    callback(items.open_tabs);
  });
};

updateBrowserActionBadge = function (open_tabs) {
  if (
    open_tabs === undefined ||
    open_tabs.settings.show_browser_action_count === true
  ) {
    getOpenTabsCount(function (count) {
      function locationHashChanged() {
        if (location.hash === "#cool-feature") {
          console.log("You're visiting a cool feature! xxxx0000");
        }
      }
      // console.log(" set of observerdLink");
      //
      newUniqueCount = observedLinkArr.length;
      // console.log("new Unique Count");
      // console.log(newUniqueCount);
      // console.log("Unique Count");
      // console.log(uniqueCount);

      ////////////////////////////////////////////////////API section////////////////////////////////////////////////
      if (newUniqueCount > uniqueCount) {
        console.log("new unique URL added !!!!!!!!!!!!!!!!");
        console.log(newUniqueCount);
        uniqueCount = newUniqueCount;
        console.log(observedLinkArr);

        const openTabsAndTheirCounts = async (userToken, experienceID) => {
          try {
            const res = await fetch(
              // fetch (url,{})
              "http://localhost:3005/experienceCounter/opentabsandtheircounts", //TODO: can usr names be upperCase
              {
                method: "POST",
                body: JSON.stringify({
                  uniqueCount: uniqueCount,
                  observedLinkArr: observedLinkArr,
                }),
                headers: {
                  "content-type": "application/json",
                },
              }
            );
            // console.log(res);
            let result = await res.json();
            return result;
          } catch (error) {
            console.log("got problem in fetch API ");
          }
        };
        const sosis = async () => {
          let bangeladesh = await openTabsAndTheirCounts(
            "usrT5SD5FG33@5OCT2021HRW.eu",
            "5OCT2021HRW"
          );
          console.log(openTabsAndTheirCounts.count);
        };
        sosis();
      }
    });
  } else {
  }
};

handleBrowserActionBadgeEvents = function () {
  let tab_listener = function () {
    getStorage(function (open_tabs) {
      return updateBrowserActionBadge(open_tabs);
    });
  };

  getStorage(function (open_tabs) {
    if (
      open_tabs === undefined ||
      open_tabs.settings.show_browser_action_count === true
    ) {
      window.addEventListener("onhashchange", function () {
        //url hash # has changed
        console.log(" //url hash # has changed");
      });
      function locationHashChanged() {
        if (location.hash === "#cool-feature") {
          console.log("You're visiting a cool feature! xxxx");
        }
      }
      chrome.tabs.onActivated.addListener(tab_listener);
      chrome.tabs.onActiveChanged.addListener(tab_listener);
      chrome.tabs.onAttached.addListener(tab_listener);
      chrome.tabs.onCreated.addListener(tab_listener);
      chrome.tabs.onDetached.addListener(tab_listener);
      chrome.tabs.onMoved.addListener(tab_listener);
      chrome.tabs.onHighlightChanged.addListener(tab_listener);
      chrome.tabs.onHighlighted.addListener(tab_listener);
      chrome.tabs.onActiveChanged.addListener(tab_listener);
      chrome.tabs.onSelectionChanged.addListener(tab_listener);
      chrome.tabs.onUpdated.addListener(tab_listener);
      chrome.tabs.onReplaced.addListener(tab_listener);
      chrome.tabs.onZoomChange.addListener(tab_listener);
      chrome.tabs.onRemoved.addListener(tab_listener);
    } else {
      chrome.tabs.onActivated.addListener(tab_listener);
      chrome.tabs.onActiveChanged.addListener(tab_listener);
      chrome.tabs.onAttached.addListener(tab_listener);
      chrome.tabs.onCreated.addListener(tab_listener);
      chrome.tabs.onDetached.addListener(tab_listener);
      chrome.tabs.onMoved.addListener(tab_listener);
      chrome.tabs.onHighlightChanged.addListener(tab_listener);
      chrome.tabs.onHighlighted.addListener(tab_listener);
      chrome.tabs.onActiveChanged.addListener(tab_listener);
      chrome.tabs.onSelectionChanged.addListener(tab_listener);
      chrome.tabs.onUpdated.addListener(tab_listener);
      chrome.tabs.onReplaced.addListener(tab_listener);
      chrome.tabs.onZoomChange.addListener(tab_listener);
      chrome.tabs.onRemoved.addListener(tab_listener);
    }
    updateBrowserActionBadge(open_tabs);
  });
};

// --------------------------------------------------------------------------------------------------------
// Events

handleBrowserActionBadgeEvents();

chrome.runtime.onInstalled.addListener(function (details) {
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
