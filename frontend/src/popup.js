document.addEventListener('DOMContentLoaded', () => {
  let allergicFoodList = [];
  let foodSummaryList = [];
  let state = 'Dashboard';
  let on = true;

  const foodList = document.getElementById('allergicFoodul');
  const addFoodInputBar = document.getElementById('foodText');
  const addButton = document.getElementById('addButton');
  const scanButton = document.getElementById('scanButton');
  const clearButton = document.getElementById('clearButton');
  const settingsButton = document.getElementById('settingsButton');
  const dashboardButton = document.getElementById('dashboardButton');
  const allergyButton = document.getElementById('allergyButton');
  const caloriesButton = document.getElementById('caloriesButton');
  const dashboard = document.getElementById('dashboard');
  const allergy = document.getElementById('allergy');
  const calories = document.getElementById('calories');
  const settings = document.getElementById('settings');
  const onOffButton = document.getElementById('onOffButton');
  const foodSummaryTable = document.getElementById('foodSummaryTable');

  chrome.storage.sync.get(null, (items) => {
    if (items.on) {
      on = items.on;
      onOffButton.click();
    } else if (items.allergicFoodList) {
      allergicFoodList = items.allergicFoodList;
    }
    if (items.state) {
      state = items.state;
    } else {
      items.state = 'Dashboard';
    }
    if (items.foodSummaryList) {
      foodSummaryList = items.foodSummaryList;
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
    foodSummaryList.forEach((food) => {
      const tableRow = document.createElement('tr');
      const foodName = document.createElement('td');
      const foodCalories = document.createElement('td');
      const foodPrice = document.createElement('td');
      foodName.innerText = food.name;
      foodCalories.innerText = food.calories;
      foodPrice.innerText = food.price;
      tableRow.appendChild(foodName);
      tableRow.appendChild(foodCalories);
      tableRow.appendChild(foodPrice);
      foodSummaryTable.appendChild(tableRow);
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

  onOffButton.addEventListener('click', () => {
    if (on) {
      on = false;
      dashboard.style.visibility = 'visible';
      allergy.style.visibility = 'visible';
      calories.style.visibility = 'visible';
      settings.style.visibility = 'visible';
      document.body.style.minHeight = '480px';
    } else {
      on = true;
      dashboard.style.display = 'none';
      dashboard.style.visibility = 'hidden';
      allergy.style.display = 'none';
      allergy.style.visibility = 'hidden';
      calories.style.display = 'none';
      calories.style.visibility = 'hidden';
      settings.style.display = 'none';
      settings.style.visibility = 'hidden';
      document.body.style.minHeight = '200px';
    }
    chrome.storage.sync.get(null, (items) => {
      items.on = !on;
      chrome.storage.sync.set(items);
    });
  });

  //!!!!!!!!!!! nav to button
  [dashboardButton, allergyButton, caloriesButton, settingsButton].forEach((a) => {
    a.addEventListener('click', (e) => {
      console.log(on);
      if (!on) {
        if (e.target.innerText != null) {
          state = e.target.innerText;
        } else {
          state = 'Settings';
        }
        chrome.storage.sync.get(null, (items) => {
          items.state = state;
          chrome.storage.sync.set(items);
        });
        dashboard.style.display = 'none';
        allergy.style.display = 'none';
        calories.style.display = 'none';
        settings.style.display = 'none';
        if (state == 'Dashboard') {
          dashboard.style.display = 'block';
        } else if (state == 'Allergy Filter') {
          allergy.style.display = 'block';
        } else if (state == 'Calories Checker') {
          calories.style.display = 'block';
        } else {
          settings.style.display = 'block';
        }
      }
    });
  });
});
