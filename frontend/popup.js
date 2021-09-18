document.addEventListener('DOMContentLoaded', () => {
  let allergicFoodList = [];

  const addFoodInputBar = document.getElementById('foodText');
  const addButton = document.getElementById('addButton');
  const toggleButton = document.getElementById('toggleScanButton');

  chrome.storage.sync.get('allergicFoodList', (s) => {
    if (s.allergicFoodList) {
      allergicFoodList = s.allergicFoodList;
    }
  });

  toggleButton.addEventListener('click', (e) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        msg: 'scan button clicked',
      });
    });
  });

  addButton.addEventListener('click', (e) => {
    allergicFoodList.push(addFoodInputBar.value);
    chrome.storage.sync.set({ allergicFoodList });
  });
});
