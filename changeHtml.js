//html書き換え

const weaponSelect = document.getElementById('weapon');
const enemySelect = document.getElementById('enemy');
const helmetSelect = document.getElementById('helmet');
const chestplateSelect = document.getElementById('chestplate');
const leggingsSelect = document.getElementById('leggings');
const bootsSelect = document.getElementById('boots');

weaponList.forEach((value, key) => {
   const option = document.createElement('option');
   option.innerText = value.japaneseName;
   option.value = key;
   weaponSelect.appendChild(option);
});

mobArmorList.forEach((value, key) => {
   const option = document.createElement('option');
   option.innerText = value.japaneseName;
   option.value = key;
   enemySelect.appendChild(option);
});

helmetList.forEach((value, key) => {
   const option = document.createElement('option');
   option.innerText = value.japaneseName;
   option.value = key;
   helmetSelect.appendChild(option);
});

chestplateList.forEach((value, key) => {
   const option = document.createElement('option');
   option.innerText = value.japaneseName;
   option.value = key;
   chestplateSelect.appendChild(option);
});

leggingsList.forEach((value, key) => {
   const option = document.createElement('option');
   option.innerText = value.japaneseName;
   option.value = key;
   leggingsSelect.appendChild(option);
});

bootsList.forEach((value, key) => {
   const option = document.createElement('option');
   option.innerText = value.japaneseName;
   option.value = key;
   bootsSelect.appendChild(option);
});

console.log('Load:changeHtml.js');
