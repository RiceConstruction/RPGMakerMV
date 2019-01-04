//=============================================================================
// Ricon_BattleTransition.js
// Version: 1.0.0
//----------------------------------------------------------------------------
// Copyright (c) 2019 米工事
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//----------------------------------------------------------------------------
// Versions
// 1.0.0 2019/01/02 初版
//----------------------------------------------------------------------------
// [GitHub] https://github.com/RiceConstruction/
// [Twitter] https://twitter.com/riceconstr/
// [Fantia] https://fantia.jp/rice-construction/
//=============================================================================

/*:
 * @plugindesc Change settings of battle transition
 * @author Ricon
 *
 * @help This plugin changes the speed and pattern of the transition to start a battle
 * 
 * ----------------------------------------------------------------------------
 * This plugin cannot be used together with other plugins which changes the transition to start a battle.
 * This plugin has no plugin command
 *
 * @param Speed
 * @type number
 * @min 0
 * @max 600
 * @default 60
 * @desc Frames putting the transition into effect
 * 
 * @param Zoom
 * @type combo
 * @option 0
 * @option 1
 * @option 2
 * @default 2
 * @desc Zooming effect
 * 0:no zoom　1:single zoom　2(default):double zoom
 * 
 * @param ZoomMode
 * @parent Zoom
 * @type boolean
 * @on IN
 * @off OUT
 * @default true
 * @desc TYpe of zooming
 * ON(default):zoom in　OFF:zoom out
 * 
 * @param Flash
 * @type boolean
 * @on ON
 * @off OFF
 * @default true
 * @desc Enable flashing
 * 
 * @param FlashRed
 * @parent Flash
 * @type number
 * @min 0
 * @max 255
 * @default 255
 * @desc Red color of flash
 * 
 * @param FlashGreen
 * @parent Flash
 * @type number
 * @min 0
 * @max 255
 * @default 255
 * @desc Green color of flash
 * 
 * @param FlashBlue
 * @parent Flash
 * @type number
 * @min 0
 * @max 255
 * @default 255
 * @desc Blue color of flash
 * 
 * @param FlashIntensity
 * @parent Flash
 * @type number
 * @min 0
 * @max 255
 * @default 255
 * @desc Intensity of flash
 *
 */

/*:ja
 * @plugindesc 戦闘開始時トランジション変更プラグイン
 * @author 米工事
 *
 * @help 戦闘開始時のトランジションの色合いやタイミングを変更することができます。
 * 
 * ----------------------------------------------------------------------------
 * このプラグインは他のトランジション変更プラグインと併用することは出来ません。
 * このプラグインにはプラグインコマンドはありません。
 *
 * @param Speed
 * @type number
 * @min 0
 * @max 600
 * @default 60
 * @desc トランジション効果の実行時間(フレーム)。短いほど速くなります。
 * 
 * @param Zoom
 * @type combo
 * @option 0
 * @option 1
 * @option 2
 * @default 2
 * @desc ズーム回数。
 * 0:ズームなし　1:1段階ズーム　2(デフォルト):2段階ズーム
 * 
 * @param ZoomMode
 * @parent Zoom
 * @type boolean
 * @on IN
 * @off OUT
 * @default true
 * @desc ズームの種類。
 * ON(デフォルト):ズームイン　OFF:ズームアウト
 * 
 * @param Flash
 * @type boolean
 * @on 有効
 * @off 無効
 * @default true
 * @desc フラッシュの有効化切り替え。
 * 
 * @param FlashRed
 * @parent Flash
 * @type number
 * @min 0
 * @max 255
 * @default 255
 * @desc フラッシュ色の設定(赤)。
 * 
 * @param FlashGreen
 * @parent Flash
 * @type number
 * @min 0
 * @max 255
 * @default 255
 * @desc フラッシュ色の設定(緑)。
 * 
 * @param FlashBlue
 * @parent Flash
 * @type number
 * @min 0
 * @max 255
 * @default 255
 * @desc フラッシュ色の設定(青)。
 * 
 * @param FlashIntensity
 * @parent Flash
 * @type number
 * @min 0
 * @max 255
 * @default 255
 * @desc フラッシュ色の設定(強さ)。
 *
 */

(function(){
    'use strict';

    //=============================================================================
    // プラグインパラメータ
    //=============================================================================
    var parameters = PluginManager.parameters('Ricon_BattleTransition');

    var getParamBoolean = function(paramName) {
        var value = parameters[paramName];
        return (value || '').toUpperCase() === 'ON' || (value || '').toUpperCase() === 'TRUE';
    };

    var getParamNumber = function(paramName) {
        var value = parameters[paramName];
        return (parseInt(value, 10) || 0).clamp(-Infinity,Infinity);
    };

    var RBT = {};
    RBT.speed = getParamNumber('Speed');
    RBT.zoom = getParamNumber('Zoom');
    RBT.zoomMode = getParamBoolean('ZoomMode');
    RBT.flash = getParamBoolean('Flash');
    RBT.flashR = getParamNumber('FlashRed');
    RBT.flashG = getParamNumber('FlashGreen');
    RBT.flashB = getParamNumber('FlashBlue');
    RBT.flashI = getParamNumber('FlashIntensity');

    //=============================================================================
    // Scene_Map
    //=============================================================================

    Scene_Map.prototype.updateEncounterEffect = function() {
        if (this._encounterEffectDuration > 0) {
            this._encounterEffectDuration--;
            var speed = this.encounterEffectSpeed();
            var n = speed - this._encounterEffectDuration;
            var p = n / speed;
            var zoomX = $gamePlayer.screenX();
            var zoomY = $gamePlayer.screenY() - 24;
            if (n === 2) {
                $gameScreen.setZoom(zoomX, zoomY, 1);
                this.snapForBattleBackground();
                if(RBT.flash) {
                    this.startFlashForEncounter(speed / 2);
                }
            }
            this.riconZoom(zoomX, zoomY, p);
            if (n === Math.floor(speed / 6)) {
                if(RBT.flash) {
                    this.startFlashForEncounter(speed / 2);
                }
            }
            if (n === Math.floor(speed / 2)) {
                BattleManager.playBattleBgm();
                this.startFadeOut(this.fadeSpeed());
            }
        }
    };

    Scene_Map.prototype.riconZoom = function(x,y,p) {
        var in1 = (20 * p * p + 5) * p / 2 + 1;
        var in2 = ((p - 1) * 20 * p + 5) * p + 1;
        var out1 = 1 / in1;
        var out2 = 1 / in2;
        var mode = RBT.zoomMode ? 'in' : 'out';
        var repeat = RBT.zoom;
        if(mode == 'in' && repeat == 1) {
            $gameScreen.setZoom(x,y,in1);
        }
        if(mode == 'in' && repeat == 2) {
            $gameScreen.setZoom(x,y,in2);
        }
        if(mode == 'out' && repeat == 1) {
            $gameScreen.setZoom(x,y,out1);
        }
        if(mode == 'out' && repeat == 2) {
            $gameScreen.setZoom(x,y,out2);
        }
    };

    Scene_Map.prototype.startFlashForEncounter = function(duration) {
        var color = [RBT.flashR, RBT.flashG, RBT.flashB, RBT.flashI];
        $gameScreen.startFlash(color, duration);
    };

    Scene_Map.prototype.encounterEffectSpeed = function() {
        return RBT.speed;
    };
})()