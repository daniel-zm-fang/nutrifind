document.addEventListener('DOMContentLoaded', () => {
  let allergicFoodList = [];
  let foodSummaryList = [];
  let state = 'Dashboard';
  let on = true;

  const createRows = () => {
    let totalCalories = 0;
    let totalPrice = 0;
    foodSummaryList.forEach((food, index) => {
      const tableRow = document.createElement('tr');
      const foodId = document.createElement('td');
      const foodName = document.createElement('td');
      const foodCalories = document.createElement('td');
      const foodPrice = document.createElement('td');
      foodId.innerText = index + 1;
      foodName.innerText = food.ingredient;
      foodCalories.innerText = food.calories.toFixed(3);
      foodPrice.innerText = food.price[0].price;
      tableRow.appendChild(foodId);
      tableRow.appendChild(foodName);
      tableRow.appendChild(foodCalories);
      tableRow.appendChild(foodPrice);
      foodSummaryTable.appendChild(tableRow);
      totalCalories += food.calories.toFixed(3);
      totalPrice += food.price[0].price;
    });
    const summaryRow = document.createElement('tr');
    const summaryFoodId = document.createElement('td');
    const summaryFoodName = document.createElement('td');
    const summaryFoodCalories = document.createElement('td');
    const summaryFoodPrice = document.createElement('td');
    foodId.innerText = 'summary';
    foodName.innerText = '';
    foodCalories.innerText = totalCalories;
    foodPrice.innerText = totalPrice;
    summaryRow.appendChild(summaryFoodId);
    summaryRow.appendChild(summaryFoodName);
    summaryRow.appendChild(summaryFoodCalories);
    summaryRow.appendChild(summaryFoodPrice);
    foodSummaryTable.appendChild(summaryRow);
  }

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
  const menuBar = document.getElementById('menuBar');

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
    createRows();
  });

  chrome.storage.onChanged.addListener(function (changes, namespace) {
    if (changes.foodSummaryList && changes.foodSummaryList.newValue) {
      foodSummaryList = changes.foodSummaryList.newValue;
      if (foodSummaryList.length > 0) {
        createRows();
      } else {
        foodSummaryTable.innerHTML = '';
        const tableHead = document.createElement('thead');
        const tableRow = document.createElement('tr');
        let tableCols = []
        for (let i = 0; i < 4; i++) {
          tableCols[i] = document.createElement('th')
          tableCols[i].scope = 'col'
        }
        tableCols[0].innerText = '#'
        tableCols[1].innerText = 'Food'
        tableCols[2].innerText = 'Calories'
        tableCols[3].innerText = 'Price'
        for (let i = 0; i < 4; i++) {
          tableRow.appendChild(tableCols[i]);
        }
        tableHead.appendChild(tableRow);
        foodSummaryTable.appendChild(tableHead);
      }
    }
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
    console.log('clearing foodSummaryList')
    chrome.storage.sync.get(null, (items) => {
      items.foodSummaryList = [];
      chrome.storage.sync.set(items);
    });
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        {
          msg: 'scan button clicked',
        },
        (resTo) => {
          console.log('resto', resTo);
          axios.post('http://localhost:3000/api/nlp', resTo
          ).then((resFrom) => {
            chrome.storage.sync.get(null, (items) => {
              console.log('setting foodSummaryList:')
              console.log(resFrom.data);
              items.foodSummaryList = resFrom.data;
              chrome.storage.sync.set(items);
            });
            console.log('resfrom', resFrom);
          })
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
      menuBar.style.visibility = 'visible';
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
      menuBar.style.visibility = 'hidden';
      document.body.style.minHeight = '200px';
    }
    chrome.storage.sync.get(null, (items) => {
      items.on = !on;
      chrome.storage.sync.set(items);
    });
  });

  [dashboardButton, allergyButton, caloriesButton, settingsButton].forEach((a) => {
    a.addEventListener('click', (e) => {
      if (!on) {
        if (e.target.innerText != null) {
          state = e.target.innerText;
        } else {
          state = 'Settings';
        }
        console.log(state);
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
        } else if (state == 'Allergy') {
          allergy.style.display = 'block';
        } else if (state == 'Calories') {
          calories.style.display = 'block';
        } else {
          settings.style.display = 'block';
        }
      }
    });
  });
});
