let allergicFoodList = [];

const scanAllergicFood = () => {
  return Array.prototype.slice.call(document.getElementsByTagName('ul')).map((ul) => {
    return Array.prototype.slice.call(ul.children).map((li) => {
      return li.innerText.trim();
    });
  });
};

const annoteAllergicFood = () => {
  
}

chrome.storage.onChanged.addListener((changes) => {
  allergicFoodList = changes.allergicFoodList.newValue;
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request) {
    if (request.msg == 'scan button clicked') {
      const temp = scanAllergicFood();
      console.log('temp', temp);
      sendResponse(temp);
      annoteAllergicFood(document.documentElement)
    }
  }
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
