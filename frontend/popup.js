document.addEventListener('DOMContentLoaded', () => {
  let allergicFoodList = [];

  const addButton = document.getElementById('addButton');
  // const automateButton = document.getElementById('automate_button');
  // const clearButton = document.getElementById('clear_button');
  // let lastState = recordButton.innerText;
  chrome.storage.sync.get('state', (s) => {
    if (s.allergicFoodList) {
      allergicFoodList = s.allergicFoodList;
      recordButton.innerText = lastState;
    }
  });

  const scan = document.getElementById('scanForIngredients');
  scan.addEventListener('click', (e) => {
    const list = document.getElementsByTagName('li');
    console.log(list);
  });

  // recordButton.addEventListener('click', (e) => {
  //   if (recordButton.innerText == 'Start Recording') {
  //     recordButton.innerText = 'Stop Recording';
  //   } else {
  //     recordButton.innerText = 'Start Recording';
  //   }
  //   chrome.storage.sync.set({ state: recordButton.innerText });
  //   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  //     chrome.tabs.sendMessage(tabs[0].id, {
  //       msg: 'record button clicked',
  //       data: recordButton.innerText,
  //     });
  //   });
  // });
  // automateButton.addEventListener('click', (e) => {
  //   if (automateButton.innerText == 'Automate') {
  //     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  //       chrome.tabs.sendMessage(tabs[0].id, {
  //         msg: 'automate button clicked',
  //       });
  //     });
  //   } else {
  //     automateButton.innerText = 'Automate';
  //   }
  // });
  // clearButton.addEventListener('click', (e) => {
  //   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  //     chrome.tabs.sendMessage(tabs[0].id, {
  //       msg: 'clear button clicked',
  //     });
  //   });
  // });
  // chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  //   console.log(message);
  // });
});
