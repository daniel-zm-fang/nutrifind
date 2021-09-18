let allergicFoodList = [];

const scanAllergicFood = () => {
  const uls = Array.prototype.slice.call(document.getElementsByTagName('ul'));
  // console.log(messy[0].children);
  for (let i = 0; i < uls.length; i++) {
    uls[i] = uls[i].innerText;
  }
  return uls;
  // chrome.storage.sync.get(null, (items) => {
  //   chrome.storage.sync.set({ ...items, uls });
  // });
};

chrome.storage.onChanged.addListener((changes) => {
  allergicFoodList = changes.allergicFoodList.newValue;
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request) {
    if (request.msg == 'scan button clicked') {
      scanAllergicFood();
    }
  }
  sendResponse('hello');
});

function updateMask(target) {
  let elements = document.getElementsByClassName('highlight-wrap');
  let hObj;
  if (elements.length !== 0) {
    hObj = elements[0];
  } else {
    hObj = document.createElement('div');
    hObj.className = 'highlight-wrap';
    hObj.style.position = 'absolute';
    hObj.style.backgroundColor = '#205081';
    hObj.style.opacity = '0.5';
    hObj.style.cursor = 'default';
    hObj.style.pointerEvents = 'none';
    document.body.appendChild(hObj);
  }
  let rect = target.getBoundingClientRect();
  hObj.style.left = rect.left + window.scrollX + 'px';
  hObj.style.top = rect.top + window.scrollY + 'px';
  hObj.style.width = rect.width + 'px';
  hObj.style.height = rect.height + 'px';
}
