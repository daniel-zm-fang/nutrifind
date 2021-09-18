document.addEventListener('DOMContentLoaded', () => {
  let allergicFoodList = [];
  let state = 'Dashboard';

  const foodList = document.getElementById('foodList');
  const addFoodInputBar = document.getElementById('foodText');
  const addButton = document.getElementById('addButton');
  const scanButton = document.getElementById('scanButton');
  const clearButton = document.getElementById('clearButton');
  const dashboardButton = document.getElementById('dashboardButton');
  const allergyButton = document.getElementById('allergyButton');
  const caloriesButton = document.getElementById('caloriesButton');
  const dashboard = document.getElementById('dashboard');
  const allergy = document.getElementById('allergy');
  const calories = document.getElementById('calories');

  chrome.storage.sync.get(null, (items) => {
    if (items.allergicFoodList) {
      allergicFoodList = items.allergicFoodList;
    }
    if (items.state) {
      state = items.state;
    } else {
      items.state = 'Dashboard';
    }
    allergicFoodList.forEach((food) => {
      const newFood = document.createElement('li');
      newFood.innerText = food;
      newFood.classList.add('list-group-item');
      newFood.addEventListener('mouseover', () => {
        newFood.classList.add('active');
      });
      newFood.addEventListener('mouseout', () => {
        newFood.classList.remove('active');
      });
      foodList.appendChild(newFood);
    });
  });

  addButton.addEventListener('click', (e) => {
    if (addFoodInputBar.value.length > 0) {
      allergicFoodList.push(addFoodInputBar.value);
      const newFood = document.createElement('li');
      newFood.classList.add('list-group-item');
      newFood.innerText = addFoodInputBar.value;
      newFood.addEventListener('mouseover', () => {
        newFood.classList.add('active');
      });
      newFood.addEventListener('mouseout', () => {
        newFood.classList.remove('active');
      });
      foodList.appendChild(newFood);
      chrome.storage.sync.get(null, (items) => {
        items.allergicFoodList = allergicFoodList;
        chrome.storage.sync.set(items);
      });
    }
    addFoodInputBar.value = '';
  });

  scanButton.addEventListener('click', (e) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        {
          msg: 'scan button clicked',
        },
        (res) => {
          console.log(res);
        }
      );
    });
  });

  clearButton.addEventListener('click', () => {
    allergicFoodList = [];
    chrome.storage.sync.get(null, (items) => {
      if (items.allergicFoodList) {
        items.allergicFoodList = [];
        foodList.innerHTML = '';
        chrome.storage.sync.set(items);
      }
    });
  });

  [dashboardButton, allergyButton, caloriesButton].forEach((button) => {
    button.addEventListener('click', (e) => {
      state = e.target.innerText;
      chrome.storage.sync.get(null, (items) => {
        items.state = state;
        chrome.storage.sync.set(items);
        console.log(items);
      });
      dashboard.style.display = 'none';
      allergy.style.display = 'none';
      calories.style.display = 'none';
      if (state == 'Dashboard') {
        dashboard.style.display = 'block';
      } else if (state == 'Allergy Filter') {
        allergy.style.display = 'block';
      } else {
        calories.style.display = 'block';
      }
    });
  });
});
