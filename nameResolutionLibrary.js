'use strict';

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
   ['diamond_sword', new Data('ダイヤの剣', 7)],
   ['bow', new Data('弓', 2)]
]);

const bowList = new Array(['bow']);

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

console.log('Load: nameResolutionLibrary.js');
