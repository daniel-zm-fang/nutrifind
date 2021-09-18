// let xpaths = [];
// let buttonState = 'off';

// const getElementsByXPATH = (xpath) => {
//   return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
//     .singleNodeValue;
// };

// const getXPath = (element) => {
//   let xpath = '';
//   for (; element && element.nodeType == 1; element = element.parentNode) {
//     let id =
//       Array.from(element.parentNode.children)
//         .filter((x) => x.nodeName == element.nodeName)
//         .findIndex((x) => x.isSameNode(element)) + 1;
//     // this method to compute id requires jquery, but it's the same
//     // let id = $(element.parentNode).children(element.tagName).index(element) + 1;
//     if (id > 1) {
//       id = '[' + id + ']';
//     } else {
//       id = '';
//     }
//     xpath = '/' + element.tagName.toLowerCase() + id + xpath;
//   }
//   return xpath;
// };

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request) {
//     if (request.msg == 'record button clicked') {
//       if (request.data == 'Stop Recording') {
//         buttonState = 'on';
//       } else {
//         buttonState = 'off';
//       }
//     } else if (request.msg == 'automate button clicked') {
//       for (let i = 0; i < xpaths.length; i++) {
//         let x = getElementsByXPATH(xpaths[i]);
//         x.click();
//         console.log(x);
//         //console.log(xpaths[i] + ' clicked');
//       }
//     } else if (request.msg == 'clear button clicked') {
//       xpaths = [];
//     }
//   }
// });

// window.onclick = (e) => {
//   // console.log(e.target);
//   // console.log(e.target.nodeName);

//   if (buttonState == 'on') {
//     const xpath = getXPath(e.target);
//     xpaths.push(xpath);
//     chrome.runtime.sendMessage({ xpaths });
//   }
//   if (e.target.nodeName == 'INPUT') {
//     console.log(e.target.value);
//   }
// };

// // onmousemove = (e) => {
// //   console.log('mouse location:', e.clientX, e.clientY);
// // };

// window.addEventListener('mouseover', function (e) {
//   if (buttonState == 'on') {
//     updateMask(e.target);
//   }
// });

// function updateMask(target) {
//   let elements = document.getElementsByClassName('highlight-wrap');
//   let hObj;
//   if (elements.length !== 0) {
//     hObj = elements[0];
//   } else {
//     hObj = document.createElement('div');
//     hObj.className = 'highlight-wrap';
//     hObj.style.position = 'absolute';
//     hObj.style.backgroundColor = '#205081';
//     hObj.style.opacity = '0.5';
//     hObj.style.cursor = 'default';
//     hObj.style.pointerEvents = 'none';
//     document.body.appendChild(hObj);
//   }
//   let rect = target.getBoundingClientRect();
//   hObj.style.left = rect.left + window.scrollX + 'px';
//   hObj.style.top = rect.top + window.scrollY + 'px';
//   hObj.style.width = rect.width + 'px';
//   hObj.style.height = rect.height + 'px';
// }
