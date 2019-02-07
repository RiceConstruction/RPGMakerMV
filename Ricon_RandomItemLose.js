//=============================================================================
// Ricon_RandomItemLose.js
// Version: 1.0.0
//----------------------------------------------------------------------------
// Copyright (c) 2019 Ricon
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//----------------------------------------------------------------------------
// Versions
// 1.0.0 2019/02/07 初版
//----------------------------------------------------------------------------
// [Website] https://riceconstruction.weebly.com/
// [GitHub] https://github.com/RiceConstruction/
// [Twitter] https://twitter.com/riceconstr/
// [Fantia] https://fantia.jp/rice-construction/
//=============================================================================

/*:
 * @plugindesc アイテムのランダム消失プラグイン
 * @author べるろ＊(Ricon)
 *
 * @help プラグインコマンドを呼び出した際に持ち物をランダムで失います。
 * 
 * 消失する所持品の範囲を決定するものは
 * プラグインパラメータ
 * メタタグ<RandomLoseException>
 * コマンド「RandomLose」
 * コマンド「RandomLoseSetting」
 * の4要素があり、
 * <RandomLoseException> ＞ RandomLoseSetting ＞ パラメータ ＞ RandomLose
 * の順に優先度が高くなります。
 * つまり、RandomLoseでアイテム・武器・防具のすべてを対象としていても
 * 他の要素で除外されている所持品は対象外となります。
 * 
 * ----------------------------------------------------------------------------
 * メタタグ
 * 
 * <RandomLoseException>
 * このタグを記入したアイテムはランダム消失の対象から除外します。
 * 記入場所：アイテム・武器・防具のメモ欄
 * 
 * ----------------------------------------------------------------------------
 * プラグインコマンド
 * 
 * RandomLose 対象 固定値
 * 所持品をランダムに消失させます。
 * 対象にコードを入れることで、消失させるアイテムの範囲を限定させることが可能です。
 * 対象コードを入力した状態で固定値を入力すると、パラメータの値を無視して
 * 消失するアイテムの合計数を変更することができます。
 *  対象コード：
 *      ALL(アイテム・武器・防具) ← パラメータの設定と同じ
 *      ITEM(アイテムのみ)
 *      WEAPON(武器のみ)
 *      ARMOR(防具のみ)
 *      EQUIP(武器・防具のみ)
 *  例：
 *      RandomLose ⇒ 通常の設定に従ってアイテムを消失
 *      RandomLose WEAPON 3 ⇒ 所持している武器を合計3つ消失
 * 
 * 
 * RandomLoseSetting IncludeItems on/off
 * 消失対象に一般アイテムを含むかどうかを変更します。
 * onなら含み、offなら除外します。
 * 大事なものを含めるならばこのパラメータと下記IncludeImportantsの
 * 両方をonにしてください。
 * on/off部分にdefaultと入力するとパラメータで設定した初期値に戻ります。
 * 
 * RandomLoseSetting IncludeWeapons on/off
 * 消失対象に武器を含むかどうかを変更します。
 * onなら含み、offなら除外します。
 * パーティメンバーが装備中の武器も含める場合はこのパラメータと
 * 下記IncludeEquipsの両方をonにしてください。
 * on/off部分にdefaultと入力するとパラメータで設定した初期値に戻ります。
 * 
 * RandomLoseSetting IncludeAromors on/off
 * 消失対象に防具を含むかどうかを変更します。
 * onなら含み、offなら除外します。
 * パーティメンバーが装備中の防具も含める場合はこのパラメータと
 * 下記IncludeEquipsの両方をonにしてください。
 * on/off部分にdefaultと入力するとパラメータで設定した初期値に戻ります。
 * 
 * RandomLoseSetting IncludeImportants on/off
 * 消失対象に大事なものを含むかどうかを変更します。
 * onなら含み、offなら除外します。
 * on/off部分にdefaultと入力するとパラメータで設定した初期値に戻ります。
 * 
 * RandomLoseSetting IncludeEquips on/off
 * 消失対象に装備品を含むかどうかを変更します。
 * onなら含み、offなら除外します。
 * on/off部分にdefaultと入力するとパラメータで設定した初期値に戻ります。
 * 
 * RandomLoseSetting MinCount 数値
 * ランダムで消失させるアイテム総数の最小値を設定します。
 * 数値には0以上の整数を入力してください。
 * 数値部分にdefaultと入力するとパラメータで設定した初期値に戻ります。
 * 
 * RandomLoseSetting MaxCount 数値
 * ランダムで消失させるアイテム総数の最大値を設定します。
 * 数値には0以上の整数を入力してください。
 * 数値部分にdefaultと入力するとパラメータで設定した初期値に戻ります。
 * 
 * RandomLoseSetting VariousItems on/off
 * 消失させるアイテムを複数種類にするかを変更できます。
 * ランダムで消失させるアイテムの総数がNのとき
 * この設定がonならば複数のアイテムを合計N個消失し、
 * offならば1つのアイテムをN個消失します。
 * on/off部分にdefaultと入力するとパラメータで設定した初期値に戻ります。
 * 
 * RandomLoseSetting Message 文字列
 * 消失時に表示するメッセージを文字列部分に入力した文に変更します。
 * %1が消失するアイテム名、%2が消失する個数、%3がパーティ先頭のアクター名に対応します。
 * \nを入れるとその部分で改行します。
 * 文字列部分にdefaultと入力するとパラメータで設定した初期値に戻ります。
 * 
 * RandomLoseSetting Sound Name ファイル名
 * 消失時に再生するSEをファイル名部分に入力したSEファイルに変更します。
 * ファイル名部分にdefaultと入力するとパラメータで設定した初期値に戻ります。
 * 
 * RandomLoseSetting Sound Volume 数値
 * 消失時に再生するSEの音量を数値部分に入れた値に変更します。
 * 数値部分にdefaultと入力するとパラメータで設定した初期値に戻ります。
 * 
 * RandomLoseSetting Sound Pitch 数値
 * 消失時に再生するSEのピッチを数値部分に入れた値に変更します。
 * 数値部分にdefaultと入力するとパラメータで設定した初期値に戻ります。
 * 
 * RandomLoseSetting Sound Pan 数値
 * 消失時に再生するSEの位相を数値部分に入れた値に変更します。
 * 数値部分にdefaultと入力するとパラメータで設定した初期値に戻ります。
 * 
 * ----------------------------------------------------------------------------
 * このプラグインは他のトランジション変更プラグインと併用することは出来ません。
 *
 * @param IncludeItems
 * @type boolean
 * @on 有効
 * @off 無効
 * @default true
 * @desc 消失するものに一般アイテムを含む
 * デフォルト：on(有効)
 * 
 * @param IncludeWeapons
 * @type boolean
 * @on 有効
 * @off 無効
 * @default false
 * @desc 消失するものに武器を含む
 * デフォルト：off(無効)
 * 
 * @param IncludeArmors
 * @type boolean
 * @on 有効
 * @off 無効
 * @default false
 * @desc 消失するものに武器を含む
 * デフォルト：off(無効)
 * 
 * @param IncludeImportants
 * @type boolean
 * @on 有効
 * @off 無効
 * @default false
 * @desc 消失するものに大事なものを含む
 * デフォルト：off(無効)
 * 
 * @param IncludeEquips
 * @type boolean
 * @on 有効
 * @off 無効
 * @default false
 * @desc 消失するものに装備品を含む
 * デフォルト：off(無効)
 * 
 * @param MinCount
 * @type number
 * @min 0
 * @default 1
 * @desc 消失する所持品の総数の最小値
 * デフォルト：1
 * 
 * @param MaxCount
 * @type number
 * @min 0
 * @default 3
 * @desc 消失する所持品の総数の最大値
 * デフォルト：3
 * 
 * @param VariousItems
 * @type boolean
 * @on 有効
 * @off 無効
 * @default false
 * @desc 消失するアイテムが複数種類になることを許可
 * デフォルト：off(無効)
 * 
 * @param Message
 * @type string
 * @default %1を%2個失った。
 * @desc アイテム消失時に表示するメッセージ
 * 使用可能な記号：%1(アイテム名)、%2(消失数)、%3(先頭アクター)
 * 
 * @param Sound
 * @type struct<sound>
 * @desc アイテム消失時に再生するSEの設定
 *
 */
/*~struct~sound:
 * @param name
 * @type file
 * @require 1
 * @dir audio/se
 * @desc SEファイル
 * @default
 * @param volume
 * @type number
 * @min 0
 * @max 100
 * @default 90
 * @desc SEの音量
 * @param pitch
 * @type number
 * @min 50
 * @max 150
 * @default 100
 * @desc SEのピッチ
 * @param pan
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * @desc SEの位相
 */


(function(){
    'use strict'

    //=============================================================================
    // プラグインパラメータ
    //=============================================================================

    var parameters = PluginManager.parameters('Ricon_RandomItemLose');

    var getParamBoolean = function(paramName) {
        var value = parameters[paramName];
        return (value || '').toUpperCase() === 'ON' || (value || '').toUpperCase() === 'TRUE';
    };

    var getParamNumber = function(paramName) {
        var value = parameters[paramName];
        return (parseInt(value, 10) || 0).clamp(-Infinity,Infinity);
    };

    var getParamString = function(paramName) {
        var value = parameters[paramName];
        return String(value);
    };

    var paramParse = function(obj) {
        return JSON.parse(JSON.stringify(obj, paramReplace));
    };

    var paramReplace = function(key, value) {
        try {
            return JSON.parse(value || null);
        } catch (e) {
            return value;
        }
    };

    var RRIL = {};
    RRIL.game = {};
    RRIL.game.includeItems = getParamBoolean('IncludeItems');
    RRIL.game.includeWeapons = getParamBoolean('IncludeWeapons');
    RRIL.game.includeArmors = getParamBoolean('IncludeArmors');
    RRIL.game.includeImportants = getParamBoolean('IncludeImportants');
    RRIL.game.includeEquips = getParamBoolean('IncludeEquips');
    RRIL.game.minCount = getParamNumber('MinCount');
    RRIL.game.maxCount = getParamNumber('MaxCount');
    RRIL.game.variousItems = getParamBoolean('VariousItems');
    RRIL.game.message = getParamString('Message');
    RRIL.game.sound = paramParse(parameters['Sound']);

    RRIL.itemLose = function(args) {
        var scope = String(args[0]).toUpperCase();
        var min = this.game.minCount;
        var max = this.game.maxCount;
        var value = Math.floor(Math.random() * (max + 1 - min)) + min;
        if(args[1]) {
            value = Number(args[1]);
        }
        var list = this.getScopeList(scope);
        this.loseList = [];
        if(list.length <= 0 || value <= 0) {
            return;
        }
        while(value > 0) {
            value -= this.setLoseList(list,value);
            if(!this.game.variousItems) {
                break;
            }
        }
        this.operateLose();
    };
    
    RRIL.getScopeList = function(scope) {
        this.setItemLists();
        var items = this.lists.items;
        var weapons = this.lists.weapons;
        var armors = this.lists.armors;
        var list = [];
        switch(scope) {
            case 'ALL':
                list = items.concat(weapons,armors);
                break;
            case 'ITEM':
                list = items;
                break;
            case 'WEAPON':
                list = weapons;
                break;
            case 'ARMOR':
                list = armors;
                break;
            case 'EQUIP':
                list = weapons.concat(armors);
                break;
            default:
                list = items.concat(weapons,armors);
                break;
        }
        return list;
    };

    RRIL.setItemLists = function() {
        var items = this.getPartyItems('item');
        this.removeSecrets(items);
        this.removeExceptions(items);
        var weapons = this.getPartyItems('weapon');
        this.addEquips(weapons,'weapon');
        this.removeExceptions(weapons);
        var armors = this.getPartyItems('armor');
        this.addEquips(armors,'armor');
        this.removeExceptions(armors);
        if(!this.game.includeItems) {
            items = [];
        }
        if(!this.game.includeWeapons) {
            weapons = [];
        }
        if(!this.game.includeArmors) {
            armors = [];
        }
        if(!this.game.includeImportants) {
            items = this.removeImportants(items);
        }
        this.lists = this.lists || {};
        this.lists.items = items;
        this.lists.weapons = weapons;
        this.lists.armors = armors;
    };

    RRIL.getPartyItems = function(type) {
        var idList = {};
        var itemList = [];
        switch(type) {
            case 'item':
                idList = $gameParty._items;
                break;
            case 'weapon':
                idList = $gameParty._weapons;
                break;
            case 'armor':
                idList = $gameParty._armors;
                break;
            default:
                break;
        }
        for(var id of Object.keys(idList)) {
            var value = idList[id];
            var data = {};
            switch(type) {
                case 'item':
                    data = $dataItems[id];
                    break;
                case 'weapon':
                    data = $dataWeapons[id];
                    break;
                case 'armor':
                    data = $dataArmors[id];
                    break;
                default:
                    break;
            }
            itemList.push({'data':data,'value':value});
        }
        return itemList
    };

    RRIL.addEquips = function(list,scope) {
        for(var i = 0; i < $gameParty.members().length; i++) {
            var equips = $gameParty.members()[i]._equips;
            for(var equip of equips) {
                if((DataManager.isWeapon(equip) && scope == 'weapon') || 
                   (DataManager.isArmor(equip) && scope == 'armor')) {
                    list = list.push(equip);
                }
            }
        }
        return list;
    };

    RRIL.removeExceptions = function(list) {
        for(var i = 0; i < list.length; i++) {
            var item = list[i]['data'];
            if(DataManager.isItem(item) && item.meta['RandomLoseException']) {
                list.splice(i--,1);
            } else if(DataManager.isWeapon(item) && item.meta['RandomLoseException']) {
                list.splice(i--,1);
            } else if(DataManager.isArmor(item) && item.meta['RandomLoseException']) {
                list.splice(i--,1);
            }
        }
        return list;
    };

    RRIL.removeSecrets = function(list) {
        for(var i = 0; i < list.length; i++) {
            var type = list[i]['data'].itypeId;
            if(type >= 3) {
                list.splice(i--,1);
            }
        }
        return list;
    };

    RRIL.removeImportants = function(list) {
        for(var i = 0; i < list.length; i++) {
            var type = list[i]['data'].itypeId;
            if(type == 2) {
                list.splice(i--,1);
            }
        }
        return list;
    };

    RRIL.setLoseList = function(list,value) {
        var listIndex = Math.floor(Math.random() * list.length);
        var item = list[listIndex];
        var itemValue = item['value'];
        var randomValue = Math.floor(Math.random() * value) + 1;
        var loseValue = !!this.game.variousItems ? randomValue : value;
        if(randomValue >= itemValue) {
            loseValue = itemValue;
            list.splice(listIndex,1);
        } else if(randomValue < itemValue){
            list[listIndex]['value'] -= loseValue;
        }
        var itemData = item['data'];
        this.listRegulate(itemData,loseValue);
        return loseValue;
    };

    RRIL.listRegulate = function(item,value) {
        for(var i = 0; i < this.loseList.length; i++) {
            if(item == this.loseList[i]['data']) {
                this.loseList[i]['value'] += value;
                return
            }
        }
        this.loseList.push({'data':item,'value':value});
    };

    RRIL.operateLose = function() {
        var sound = this.game.sound;
        console.log(sound);
        if(sound['name']) {
            sound['name'] = String(sound['name']);
            sound['volume'] = Number(sound['volume']);
            sound['pitch'] = Number(sound['pitch']);
            sound['pan'] = Number(sound['pan']);
            AudioManager.playSe(sound);
        }
        var template = this.game.message;
        var heroName = $gameParty.members()[0].name;
        var message = '';
        var list = this.loseList;
        for(var i = 0; i < list.length; i++) {
            var itemName = list[i]['data'].name;
            var value = list[i]['value'];
            message = template.replace('%1',itemName);
            message = message.replace('%2',value);
            message = message.replace('%3',heroName);
            $gameMessage.add(message);
            var data = list[i]['data']
            $gameParty.loseItem(data,value,this.game.includeEquips);
        }
    };

    RRIL.setting = function(args) {
        var mode = String(args[0]).toUpperCase();
        var value = args[1];
        var value2 = args[2];
        switch(mode) {
            case 'INCLUDEITEMS':
                this.game.includeItems = this.setGameBoolean(value,'IncludeItems');
                break;
            case 'INCLUDEWEAPONS':
                this.game.includeWeapons = this.setGameBoolean(value,'IncludeWeapons');
                break;
            case 'INCLUDEARMORS':
                this.game.includeArmors = this.setGameBoolean(value,'IncludeArmors');
                break;
            case 'INCLUDEIMPORTANTS':
                this.game.includeImportants = this.setGameBoolean(value,'IncludeImportants');
                break;
            case 'INCLUDEEQUIPS':
                this.game.includeEquips = this.setGameBoolean(value,'IncludeEquips');
                break;
            case 'MINCOUNT':
                this.game.minCount = this.setGameNumber(value,'MinCount');
                break;
            case 'MAXCOUNT':
                this.game.maxCount = this.setGameNumber(value,'MaxCount');
                break;
            case 'VARIOUSITEMS':
                this.game.variousItems = this.setGameBoolean(value,'VariousItems');
                break;
            case 'MESSAGE':
                var newMessage = args.slice(1).join(' ');
                this.game.message = this.setGameString(newMessage,'Message');
                break;
            case 'SOUND':
                this.setSound(value,value2);
                break;
        }
    };

    RRIL.setGameBoolean = function(value,name) {
        var _value = String(value).toUpperCase()
        if(_value == 'DEFAULT') {
            return getParamBoolean(name);
        } else if(_value == 'ON') {
            return true;
        } else if(_value == 'OFF') {
            return false;
        }
    };

    RRIL.setGameNumber = function(value,name) {
        if(String(value).toUpperCase() == 'DEFAULT') {
            return getParamNumber(name);
        } else if(!isNaN(value)) {
            return Math.abs(Number(value));
        }
    };

    RRIL.setGameString = function(value,name) {
        if(String(value).toUpperCase() == 'DEFAULT') {
            return getParamString(name);
        } else {
            return String(value);
        }
    };

    RRIL.setSound = function(param,value) {
        console.log('SetSound');
        var _param = String(param).toLowerCase();
        if(String(value).toUpperCase() == 'DEFAULT') {
            this.game.sound[_param] = paramParse('Sound')[_param];
        } else if(_param == 'name') {
            this.game.sound[_param] = String(value);
        } else {
            this.game.sound[_param] = Number(value);
        }
        console.log(this.game.sound);
    };


    //=============================================================================
    // Game_Interpreter
    //=============================================================================

    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if(command == 'RandomLose') {
            RRIL.itemLose(args);
        }
        if(command == 'RandomLoseSetting') {
            RRIL.setting(args);
        }
    };
})()