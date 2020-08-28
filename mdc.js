'use-strict';

const FLOAT32MAX = 16777215;
const calcButton = document.getElementById('calc');
const resultAreaTitle = document.getElementById('result_area_title');
const normalArea = document.getElementById('normal_area');
const criticalArea = document.getElementById('critical_area');

const smiteList = [
   'zombie',
   'skeleton',
   'husk',
   'zombified_piglin'
];

const baneOfArthropodsList = [
   'spider',
   'cave_spider'
];

const weaponList = new Map([
   ['none', new Data('素手またはその他', 1)],
   ['wooden_sword', new Data('木の剣', 4)],
   ['stone_sword', new Data('石の剣', 5)],
   ['iron_sword', new Data('鉄の剣', 6)],
   ['goolden_sword', new Data('金の剣', 4)],
   ['diamond_sword', new Data('ダイヤの剣', 7)]
]);

const helmetList = new Map([
   ['none', new Data('なし', [0,0])],
   ['leather_helmet', new Data('革の帽子', [1,0])],
   ['chainmail_helmet', new Data('チェーンのヘルメット', [2,0])],
   ['iron_helmet', new Data('鉄のヘルメット', [2,0])],
   ['goolden_helmet', new Data('金のヘルメット', [2,0])],
   ['diamond_helmet', new Data('ダイヤモンドのヘルメット', [3,2])],
]);

const chestplateList = new Map([
   ['none', new Data('なし', [0,0])],
   ['leather_chestplate', new Data('革の上着', [3,0])],
   ['chainmail_chestplate', new Data('チェーンのチェストプレート', [5,0])],
   ['iron_chestplate', new Data('鉄のチェストプレート', [6,0])],
   ['goolden_chestplate', new Data('金のチェストプレート', [5,0])],
   ['diamond_chestplate', new Data('ダイヤモンドのチェストプレート', [8,2])],
]);

const leggingsList = new Map([
   ['none', new Data('なし', [0,0])],
   ['leather_leggings', new Data('革のズボン', [2,0])],
   ['chainmail_leggings', new Data('チェーンのレギンス', [4,0])],
   ['iron_leggings', new Data('鉄のレギンス', [5,0])],
   ['goolden_leggings', new Data('金のレギンス', [3,0])],
   ['diamond_leggings', new Data('ダイヤモンドのレギンス', [6,2])],
]);

const bootsList = new Map([
   ['none', new Data('なし', [0,0])],
   ['leather_boots', new Data('革のブーツ', [1,0])],
   ['chainmail_boots', new Data('チェーンのブーツ', [1,0])],
   ['iron_boots', new Data('鉄のブーツ', [2,0])],
   ['goolden_boots', new Data('金のブーツ', [4,0])],
   ['diamond_boots', new Data('ダイヤモンドのブーツ', [7,2])],
]);

const mobArmorList = new Map([
   ['human', new Data('プレイヤー', 0)],
   ['zombie', new Data('ゾンビ', 2)],
   ['zombified_piglin', new Data('ゾンビピグリン', 2)],
   ['husk', new Data('ハスク', 2)],
   ['drowned', new Data('ドラウンド', 2)],
   ['skeleton', new Data('スケルトン', 0)],
   ['spider', new Data('蜘蛛', 0)],
   ['cave_spider', new Data('毒蜘蛛', 0)],
]);
// コンストラクタ群

function Enemy(enemy){
   var isUndead = false;
   var isInsect = false;
   smiteList.forEach((listEnemy) => {
      if(enemy == listEnemy){
         isUndead = true;
      }
   });
   baneOfArthropodsList.forEach((listEnemy) => {
      if(enemy == listEnemy){
         isInsect = true;
      }
   });
   this.enemy = enemy;
   this.isUndead = isUndead;
   this.isInsect = isInsect;
}

function DefensePoints(defensePoint,toughness){
   this.defensePoint = defensePoint,
   this.toughness = toughness
}

function Damage(damage,criticalDamage){
   this.damage = damage,
   this.criticalDamage = criticalDamage
}

function Data(japaneseName,param) {
   this.japaneseName = japaneseName,
   this.param = param
}

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

//ここからロジック

/* 関数について
中央関数：直説呼び出される関数。基本的には内部で数値をいじらない。
中間関数：中央関数に呼び出される関数。変換関数、正規化関数を呼び出す。
変換関数：上部にあるListを参照して文字を数値に変換する関数。DNSから思想を得た
正規化関数：数値を実際関数で使える状態に変換する関数
*/

/**
 * 攻撃側の中間関数
 * @param {object} OffensePointCalcParam
 * @return {object} damage[damage,criticalDamage]
 */
function offensePointCalc(OffensePointCalcParam,enemy) {
   var damage = new Damage(
      weaponToInt(OffensePointCalcParam.selectedWeapon),
      weaponToInt(OffensePointCalcParam.selectedWeapon) * 1.5
   )
   var addDamageByEnchant = ((OffensePointCalcParam.sharpnessLevel > 0) ? 0.5 + OffensePointCalcParam.sharpnessLevel * 0.5 : 0) +
   (enemy.isUndead ? OffensePointCalcParam.smiteLevel * 2.5 : 0) +
   (enemy.isInsect ? OffensePointCalcParam.baneOfArthropods * 2.5 : 0);
   damage.damage += addDamageByEnchant;
   damage.criticalDamage += addDamageByEnchant;
   var addDamageByPotion = (OffensePointCalcParam.strength * 3);
   damage.damage += addDamageByPotion;
   damage.criticalDamage += addDamageByPotion;
   return damage
}

/**
 * 武器を攻撃力に変換する変換関数
 * @param {string} weapon
 * @return {int} damage
 */
function weaponToInt(weapon) {
   let returnParam;
   weaponList.forEach((value, key) => {
      if(key === weapon){
         returnParam = value.param;
         console.log(value.param);
      }
   });
   return returnParam;
}

/**
 * 防御系の中間関数
 * @param {object} DefensePointCalcParam
 * @return {object} defensePoints[defensePoint,toughness]
 */
function defencePointCalc(DefensePointCalcParam,enemy) {
   let armors = {
      helmet: helmetToDefensePoints(DefensePointCalcParam.helmet),
      chestplate: chestplateToDefensePoints(DefensePointCalcParam.chestplate),
      leggings: leggingsToDefensePoints(DefensePointCalcParam.leggings),
      boots: bootsToDefensePoints(DefensePointCalcParam.boots)
   }
   let totalDefensePoints = new DefensePoints(
      armors.helmet.defensePoint + armors.chestplate.defensePoint + armors.leggings.defensePoint + armors.boots.defensePoint,armors.helmet.toughness + armors.chestplate.toughness + armors.leggings.toughness + armors.boots.toughness
   );
   let enemyDefensePoints = enemyToDefensePoints(enemy);
   totalDefensePoints.defensePoint += enemyDefensePoints.defensePoint;
   totalDefensePoints.toughness += enemyDefensePoints.toughness;
   return totalDefensePoints;
}


/**
 * 相手によって防具値をかえる変換関数
 * @param {object} enemy
 * @return {object} defensePoints
 */
function enemyToDefensePoints(enemy) {
   let _defensePoints;
   mobArmorList.forEach((value, key) => {
      if(key == enemy.enemy){
         _defensePoints = value.param;
      }
   });
   if(_defensePoints == undefined){
      console.log('[Error]:Not in the mobArmorList')
   }
   let defensePoints = new DefensePoints(_defensePoints,0);
   return defensePoints;
}

/**
 * helmetを数値に変換する変換関数
 * @param {string} itemId
 * @return {object} defensePoints
 */
function helmetToDefensePoints(armor) {
   let _defensePoints;
   helmetList.forEach((value, key) => {
      if(key === armor){
         _defensePoints = value.param;
      }
   });
   if(_defensePoints == undefined){
      console.log('[Error]:Not in the helmetList');
   }
   let defensePoints = new DefensePoints(_defensePoints[0],_defensePoints[1]);
   return defensePoints;
}

/**
 * chestplateを数値に変換する変換関数
 * @param {string} itemId
 * @return {object} defensePoints
 */
function chestplateToDefensePoints(armor) {
   let _defensePoints;
   chestplateList.forEach((value, key) => {
      if(key === armor){
         _defensePoints = value.param;
      }
   });
   if(_defensePoints == undefined){
      console.log('[Error]:Not in the chestplateList');
   }
   let defensePoints = new DefensePoints(_defensePoints[0],_defensePoints[1]);
   return defensePoints;
}

/**
 * leggingsを数値に変換する変換関数
 * @param {string} itemId
 * @return {object} defensePoints
 */
function leggingsToDefensePoints(armor) {
   let _defensePoints;
   leggingsList.forEach((value, key) => {
      if(key === armor){
         _defensePoints = value.param;
      }
   });
   if(_defensePoints == undefined){
      console.log('[Error]:Not in the leggingsList');
   }
   let defensePoints = new DefensePoints(_defensePoints[0],_defensePoints[1]);
   return defensePoints;
}

/**
 * bootsを数値に変換する変換関数
 * @param {string} itemId
 * @return {object} defensePoints
 */
function bootsToDefensePoints(armor) {
   let _defensePoints;
   bootsList.forEach((value, key) => {
      if(key === armor){
         _defensePoints = value.param;
      }
   });
   if(_defensePoints == undefined){
      console.log('[Error]:Not in the bootsList');
   }
   let defensePoints = new DefensePoints(_defensePoints[0],_defensePoints[1]);
   return defensePoints;
}

/**
 * protectionを20以上の場合20にする正規化関数
 * @param {int} totalProtection
 * @return {int} AdProtection
 */
function transProtection(totalProteciton) {
   return totalProteciton > 20 ? 20 : totalProteciton
}

/**
 * ダメージを防具値の計算以外を行う正規化中間関数
 * @param {object} subCalcParam
 * @param {int} damage
 * @return {int} damage
 */
function subCalc(subCalcParam,_damage) {
   const damage = Math.floor(resistanceCalc(subCalcParam.resistance,enchantCalc(subCalcParam.totalProtection,_damage)) * 100000) / 100000;
   return damage;
}

/**
 * ダメージをprotectionを考慮してカットする正規化関数
 * @param {int} totalProtectionLevel
 * @param {int} damage
 * @return {int} damage
 */
function enchantCalc(totalProtectionLevel,damage) {
   if(totalProtectionLevel == 0){
      return damage;
   }else {
      return damage * ((4 * totalProtectionLevel) / 100);
   }
}

/**
 * 耐性レベルに応じてダメージをカットする正規化関数
 * @param {int} resistance
 * @param {int} damage
 * @return {int} damage
 */
function resistanceCalc(resistance,damage) {
   return damage * (1 - (resistance * 20) / 100);
}

/**
 * 合計値を出す中央関数
 * @param {object} damage
 * @param {object} defensePoints
 * @return {int} totalDamage[normal,critical]
 */
function mainCalc(damage,defensePoints,subCalcParam) {
   let _totalDamage = {
      normal: damage.damage * (1 - (Math.min(20, Math.max(defensePoints.defensePoint / 5, defensePoints.defensePoint - damage.damage / (2 + defensePoints.toughness / 4)))) / 25),
      critical: damage.criticalDamage * (1 - (Math.min(20, Math.max(defensePoints.defensePoint / 5, defensePoints.defensePoint - damage.criticalDamage / (2 + defensePoints.toughness / 4)))) / 25)};

   let totalDamage = {
      normal: subCalc(subCalcParam,_totalDamage.normal),
      critical: subCalc(subCalcParam,_totalDamage.critical)
   };
   return totalDamage;
}

/**
 * 特定の子をすべて消す関数
 * @param {object} resultArea
 */
function removeAllChildren(resultArea){
   while (resultArea.firstChild) resultArea.removeChild(resultArea.firstChild);
}

/**
 * 指定の数値に丸め込む関数
 * 具体的には
 * ・09などの数値を9に変換する(parseInt)
 * ・最大値、最小値を超えていた場合最大値または最小値を代入する
 * ・空白が送られてきた場合に0に置き換える
 * @param {int} num
 * @param {int} max
 * @param {int} min
 * @return {int} number
 */
function normalization(num,max,min) {
   let _num = parseInt(num);
   if(_num == NaN)_num = 0;
   if(_num < min)_num = min;
   else if(_num > max)_num = max;
   return _num
}

/**
 * ダメージを描画用に変換する関数
 * 返り値は
 * ・haert10_imageを描画する回数
 * ・heart_imageを描画する回数
 * ・harfheart_imageを描画する回数
 * から構成されている配列
 * @param {int} damage
 * @return {array} [haert10_imageを描画する回数, heart_imageを描画する回数, harfheart_imageを描画する回数]
 */
function analysisDamage(damage) {
   const _damage = [Math.floor(damage / 20), Math.floor(damage % 20 / 2), damage % 2];
   return _damage;
}

calcButton.onclick = () => {
   //数値取得
   const _sharpnessLevel = document.getElementById('sharpness').value;
   const _smiteLevel = document.getElementById('smite').value;
   const _baneOfArthropods = document.getElementById('bane_of_arthropods').value;
   const _strength = document.getElementById('strength').value;
   const OffensePointCalcParam = {
      selectedWeapon: document.getElementById('weapon').value,
      sharpnessLevel: normalization(_sharpnessLevel, 9999, 0),
      smiteLevel: normalization(_smiteLevel, 9999, 0),
      baneOfArthropods: normalization(_baneOfArthropods, 9999, 0),
      strength: normalization(_strength, 127, 0),
   };

   const DefensePointCalcParam = {
      helmet: document.getElementById('helmet').value,
      chestplate: document.getElementById('chestplate').value,
      leggings: document.getElementById('leggings').value,
      boots: document.getElementById('boots').value
   };

   const _protections = [
      document.getElementById('helmet_protection').value,
      document.getElementById('chestplate_protection').value,
      document.getElementById('leggings_protection').value,
      document.getElementById('boots_protection').value
   ];

   const protections = {
      helmet: normalization(_protections[0], 9999, 0),
      chestplate: normalization(_protections[1], 9999, 0),
      leggings: normalization(_protections[2], 9999, 0),
      boots: normalization(_protections[3], 9999, 0)
   }

   const _resistance = document.getElementById('resistance').value;
   const SubCalcParam ={
      totalProtection: transProtection(protections.helmet + protections.chestplate + protections.leggings + protections.boots),
      resistance: normalization(_resistance, 127, 0)
   }

   const enemy = new Enemy(document.getElementById('enemy').value);

   console.log(OffensePointCalcParam);
   console.log(DefensePointCalcParam);
   console.log(enemy);
   console.log(SubCalcParam);

   const totalDamage = mainCalc(
      offensePointCalc(OffensePointCalcParam,enemy),
      defencePointCalc(DefensePointCalcParam,enemy),
      SubCalcParam
   );

   //描画

   removeAllChildren(resultAreaTitle);
   removeAllChildren(normalArea);
   removeAllChildren(criticalArea);

   const header = document.createElement('h2');
   header.innerText = '計算結果' ;
   resultAreaTitle.appendChild(header);

   //文字の描画normal
   const totalDamageP = document.createElement('p');
   totalDamageP.innerText = 'トータルダメージ: ' + totalDamage.normal ;
   normalArea.appendChild(totalDamageP);

   //ハート画像の描画normal
   const parsedDamageNormal = analysisDamage(totalDamage.normal);
   const imgBoxNormal = document.createElement('div');
   normalArea.appendChild(imgBoxNormal);
   imgBoxNormal.id = 'img_box';
   for (let i = 0; i < parsedDamageNormal[0]; i++) {
      const heartImage = document.createElement('img');
      heartImage.classList.add('heart');
      heartImage.src = './image/heart10_image.png';
      imgBoxNormal.appendChild(heartImage);
   }
   for (let i = 0; i < parsedDamageNormal[1]; i++) {
      const heartImage = document.createElement('img');
      heartImage.classList.add('heart');
      heartImage.src = './image/heart_image.png';
      imgBoxNormal.appendChild(heartImage);
   }
   if(parsedDamageNormal[2]){
      const heartImage = document.createElement('img');
      heartImage.classList.add('heart');
      heartImage.src = './image/halfheart_image.png';
      console.log(heartImage);
      imgBoxNormal.appendChild(heartImage);
   }

   //文字の描画critical
   const criticalDamageP = document.createElement('p');
   const br = document.createElement('br');
   criticalDamageP.innerText = 'クリティカルダメージ: ' + totalDamage.critical ;
   criticalArea.appendChild(criticalDamageP);

   //ハート画像の描画critical
   const parsedDamageCritical = analysisDamage(totalDamage.critical);
   const imgBoxCritical = document.createElement('div');
   criticalArea.appendChild(imgBoxCritical);
   imgBoxCritical.id = 'img_box';
   for (let i = 0; i < parsedDamageCritical[0]; i++) {
      const heartImage = document.createElement('img');
      heartImage.classList.add('heart');
      heartImage.src = './image/heart10_image.png';
      imgBoxCritical.appendChild(heartImage);
   }
   for (let i = 0; i < parsedDamageCritical[1]; i++) {
      const heartImage = document.createElement('img');
      heartImage.classList.add('heart');
      heartImage.src = './image/heart_image.png';
      imgBoxCritical.appendChild(heartImage);
   }
   if(parsedDamageCritical[2]){
      const heartImage = document.createElement('img');
      heartImage.classList.add('heart');
      heartImage.src = './image/halfheart_image.png';
      console.log(heartImage);
      imgBoxCritical.appendChild(heartImage);
   }
}
