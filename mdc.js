'use-strict';
const calcButton = document.getElementById('calc');
const resultArea = document.getElementById('result_area');

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
   ['none',1],
   ['wooden_sword',4],
   ['stone_sword',5],
   ['iron_sword',6],
   ['goolden_sword',4],
   ['diamond_sword',7]
]);

const helmetList = new Map([
   ['none',[0,0]],
   ['leather_helmet',[1,0]],
   ['chainmail_helmet',[2,0]],
   ['iron_helmet',[2,0]],
   ['goolden_helmet',[2,0]],
   ['diamond_helmet',[3,2]]
]);

const chestplateList = new Map([
   ['none',[0,0]],
   ['leather_chestplate',[3,0]],
   ['chainmail_chestplate',[5,0]],
   ['iron_chestplate',[6,0]],
   ['goolden_chestplate',[5,0]],
   ['diamond_chestplate',[8,2]]
]);

const leggingsList = new Map([
   ['none',[0,0]],
   ['leather_leggings',[2,0]],
   ['chainmail_leggings',[4,0]],
   ['iron_leggings',[5,0]],
   ['goolden_leggings',[3,0]],
   ['diamond_leggings',[6,2]]
]);

const bootsList = new Map([
   ['none',[0,0]],
   ['leather_boots',[1,0]],
   ['chainmail_boots',[1,0]],
   ['iron_boots',[2,0]],
   ['goolden_boots',[4,0]],
   ['diamond_boots',[7,2]]
]);

const mobArmorList = new Map([
   ['human',0],
   ['zombie',2],
   ['zombified_piglin',2],
   ['husk',2],
   ['drowned',2],
   ['skeleton',0],
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


// 引数群

/**
 * 攻撃側の中央関数
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
 * 武器を攻撃力に変換する変換属関数
 * @param {string} weapon
 * @return {int} damage
 */
function weaponToInt(weapon) {
   let returnParam;
   weaponList.forEach((value, key) => {
      if(key === weapon){
         returnParam = value;
      }
   });
   return returnParam;
}

/**
 * 防御系の中央関数
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
         _defensePoints = value;
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
         _defensePoints = value;
      }
   });
   if(_defensePoints == undefined){
      console.log('[Error]:Not in the helmetList')
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
         _defensePoints = value;
      }
   });
   if(_defensePoints == undefined){
      console.log('[Error]:Not in the chestplateList')
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
         _defensePoints = value;
      }
   });
   if(_defensePoints == undefined){
      console.log('[Error]:Not in the leggingsList')
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
         _defensePoints = value;
      }
   });
   if(_defensePoints == undefined){
      console.log('[Error]:Not in the bootsList')
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
 * ダメージをprotectionを考慮してカットする関数
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
 * 耐性レベルに応じてダメージをカットする関数
 * @param {int} resistance
 * @param {int} damage
 * @return {int} damage
 */
function resistanceCalc(resistance,damage) {
   console.log();
   return damage * (1 - (resistance * 20) / 100);
}

/**
 * 数値を小数第六桁までにする正規化関数
 * @param {int} damage
 * @return {int} number
 */
function _floor(damage) {
   return Math.floor(damage * 1000000) / 1000000;
}

/**
 * ダメージを防具値の計算以外を行う正規化中央関数
 * @param {object} subCalcParam
 * @param {int} damage
 * @return {int} damage
 */
function subCalc(subCalcParam,damage) {
   return Math.floor(resistanceCalc(subCalcParam.resistance,enchantCalc(subCalcParam.totalProtection,damage)) * 1000000) / 1000000;
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
 * @param {int} number
 * @return {int} number
 */
function normalization(num,max,min) {
   let _num = parseInt(num);
   if(_num == "")_num = 0;
   if(_num < min)_num = min;
   else if(_num > max)_num = max;
   return _num
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
   //描画
   removeAllChildren(resultArea);
   const header = document.createElement("h2");
   header.innerText = '計算結果';
   resultArea.appendChild(header);

   const totalDamage = mainCalc(
      offensePointCalc(OffensePointCalcParam,enemy),
      defencePointCalc(DefensePointCalcParam,enemy),
      SubCalcParam
   );
   const paragraph = document.createElement('p');
   resultArea.appendChild(paragraph);
   paragraph.innerText = '貴方が相手に与えられるダメージは' + totalDamage.normal + 'で、criticalを出したときは' + totalDamage.critical + 'です';
}
