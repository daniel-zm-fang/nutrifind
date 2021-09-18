document.addEventListener('DOMContentLoaded', () => {
  let allergicFoodList = [];

  const addFoodInputBar = document.getElementById('foodText');
  const addButton = document.getElementById('addButton');

  chrome.storage.sync.get('allergicFoodList', (s) => {
    if (s.allergicFoodList) {
      allergicFoodList = s.allergicFoodList;
    }
  });

  addButton.addEventListener('click', (e) => {
    allergicFoodList.push(addFoodInputBar.value);
    chrome.storage.sync.set({ allergicFoodList: allergicFoodList }, () => {
      console.log(allergicFoodList);
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
          allergicFoodList: allergicFoodList,
        });
      });
    });
  });
});
