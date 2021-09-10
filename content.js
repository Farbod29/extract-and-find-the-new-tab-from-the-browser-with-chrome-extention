// let currentUlr = window.location.toString();
// console.log(" currentUlr content");
// console.log(currentUlr);
// // chrome.tabs.sendMessage(tab.url, "toggle");

// function notifyReady() {
//   chrome.runtime.sendMessage(
//     {
//       type: "ACTIVITY_HISTORY_READY",
//       sosis: "bandari",
//     },
//     function (response) {
//       console.log(">>>>Response: ", response);
//       if (response.type == "HISTORY_DATA") {
//         processLog(response);
//       }
//     }
//   );
// }

// chrome.runtime.sendMessage({ currentUlr: currentUlr }, function (response) {
//   console.log(response.farewell);
// });

// chrome.runtime.onMessage.addListener(function (msg) {
//   console.log("message is", msg);
//   sendResponse({ farewell: "goodbye umad" });
// });

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(
    sender.tab ? "from a bk script:" + sender.tab.url : "from the extension"
  );
  if (request.greeting === "hello") sendResponse({ farewell: "goodbye" });
});
