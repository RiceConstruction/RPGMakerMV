//=============================================================================
// Ricon_TweakVolume.js
// Version: 1.0.0
//----------------------------------------------------------------------------
// Copyright (c) 2019 RiceConstruction
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//----------------------------------------------------------------------------
// Versions
// 1.0.0 2019/10/12 初版
//----------------------------------------------------------------------------
// [ホームページ] https://riceconstruction.weebly.com/
// [GitHub] https://github.com/RiceConstruction/
// [Twitter] https://twitter.com/riceconstr/
// [Fantia] https://fantia.jp/rice-construction/
//=============================================================================

/*:
 * @plugindesc 音量微調整プラグイン
 * @author べるろ＊(Ricon)
 *
 * @help オプション画面での細かい音量調節を可能とします。
 * 
 * 出来ること
 * ・オプション画面での音量変化量の設定
 * ・オプション画面で音量を変更するときに再生する音源の設定
 * 
 * ----------------------------------------------------------------------------
 * このプラグインにプラグインコマンドはありません。
 * 
 * @param BGM Scale
 * @type number
 * @min 1
 * @max 100
 * @default 20
 * @desc BGM音量変更単位（デフォルト 20）
 * 
 * @param BGM Test File
 * @type file
 * @require 1
 * @dir audio/bgm
 * @default 
 * @desc BGM音量変更時に再生するBGMファイル（空白なら再生中のBGM）
 * 
 * @param BGM Test Volume
 * @parent BGM Test File
 * @type number
 * @min 1
 * @max 100
 * @default 90
 * @desc BGM音量変更時に再生するBGMの基本音量
 * 
 * @param BGM Test Pitch
 * @parent BGM Test File
 * @type number
 * @min 50
 * @max 150
 * @default 100
 * @desc BGM音量変更時に再生するBGMのピッチ
 * 
 * @param BGM Test Pan
 * @parent BGM Test File
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * @desc BGM音量変更時に再生するBGMの位相
 * 
 * @param BGM Test Offset
 * @parent BGM Test File
 * @type number
 * @min 0
 * @default 0
 * @desc BGM音量変更時に再生するBGMの再生開始秒数
 * 
 * @param BGS Scale
 * @type number
 * @min 1
 * @max 100
 * @default 20
 * @desc BGS音量変更単位（デフォルト 20)
 * 
 * @param BGS Test File
 * @type file
 * @require 1
 * @dir audio/bgs
 * @default 
 * @desc BGS音量変更時に再生するBGSファイル（空白なら再生中のBGS）
 * 
 * @param BGS Test Volume
 * @parent BGS Test File
 * @type number
 * @min 1
 * @max 100
 * @default 90
 * @desc BGS音量変更時に再生するBGSの基本音量
 * 
 * @param BGS Test Pitch
 * @parent BGS Test File
 * @type number
 * @min 50
 * @max 150
 * @default 100
 * @desc BGS音量変更時に再生するBGSのピッチ
 * 
 * @param BGS Test Pan
 * @parent BGS Test File
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * @desc BGS音量変更時に再生するBGSの位相
 * 
 * @param BGS Test Offset
 * @parent BGS Test File
 * @type number
 * @min 0
 * @default 0
 * @desc BGS音量変更時に再生するBGSの再生開始秒数
 * 
 * @param ME Scale
 * @type number
 * @min 1
 * @max 100
 * @default 20
 * @desc ME音量変更単位（デフォルト 20）
 * 
 * @param ME Test File
 * @type file
 * @require 1
 * @dir audio/me
 * @default 
 * @desc ME音量変更時に再生するMEファイル（空白ならカーソルSEのみ再生）
 * 
 * @param ME Test Volume
 * @parent ME Test File
 * @type number
 * @min 1
 * @max 100
 * @default 90
 * @desc ME音量変更時に再生するMEの基本音量
 * 
 * @param ME Test Pitch
 * @parent ME Test File
 * @type number
 * @min 50
 * @max 150
 * @default 100
 * @desc ME音量変更時に再生するMEのピッチ
 * 
 * @param ME Test Pan
 * @parent ME Test File
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * @desc ME音量変更時に再生するMEの位相
 * 
 * @param SE Scale
 * @type number
 * @min 1
 * @max 100
 * @default 20
 * @desc SE音量変更単位（デフォルト 20）
 * 
 * @param SE Test File
 * @type file
 * @require 1
 * @dir audio/se
 * @default 
 * @desc SE音量変更時に再生するSEファイル（空白ならカーソルSEのみ再生）
 * 
 * @param SE Test Volume
 * @parent SE Test File
 * @type number
 * @min 1
 * @max 100
 * @default 90
 * @desc SE音量変更時に再生するSEの基本音量
 * 
 * @param SE Test Pitch
 * @parent SE Test File
 * @type number
 * @min 50
 * @max 150
 * @default 100
 * @desc SE音量変更時に再生するSEのピッチ
 * 
 * @param SE Test Pan
 * @parent SE Test File
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * @desc SE音量変更時に再生するSEの位相
 *
 */

var Ricon_TweakVolume = Ricon_TweakVolume || {};

(function() {
    'use strict';

    //=============================================================================
    // プラグインパラメータ
    //=============================================================================

    var parameters = PluginManager.parameters('Ricon_TweakVolume');

    function getNumber(paramName) {
        return (parseInt(parameters[paramName], 10) || 0).clamp(-Infinity, Infinity);
    }

    function getString(paramName) {
        return String(parameters[paramName]) || '';
    }

    Ricon_TweakVolume.params = {
        get bgmScale() { return getNumber('BGM Scale'); },
        get bgmFile() { return getString('BGM Test File'); },
        get bgmVolume() { return getNumber('BGM Test Volume'); },
        get bgmPitch() { return getNumber('BGM Test Pitch'); },
        get bgmPan() { return getNumber('BGM Test Pan'); },
        get bgmOffset() { return getNumber('BGM Test Offset'); },

        get bgsScale() { return getNumber('BGS Scale'); },
        get bgsFile() { return getString('BGS Test File'); },
        get bgsVolume() { return getNumber('BGS Test Volume'); },
        get bgsPitch() { return getNumber('BGS Test Pitch'); },
        get bgsPan() { return getNumber('BGS Test Pan'); },
        get bgsOffset() { return getNumber('BGS Test Offset'); },

        get meScale() { return getNumber('ME Scale'); },
        get meFile() { return getString('ME Test File'); },
        get meVolume() { return getNumber('ME Test Volume'); },
        get mePitch() { return getNumber('ME Test Pitch'); },
        get mePan() { return getNumber('ME Test Pan'); },
        
        get seScale() { return getNumber('SE Scale'); },
        get seFile() { return getString('SE Test File'); },
        get seVolume() { return getNumber('SE Test Volume'); },
        get sePitch() { return getNumber('SE Test Pitch'); },
        get sePan() { return getNumber('SE Test Pan'); }
    };

    //=============================================================================
    // Window_Options
    //=============================================================================
    var _Window_Options_initialize = Window_Options.prototype.initialize;
    Window_Options.prototype.initialize = function() {
        _Window_Options_initialize.call(this);
        this._currentBgm = {};
        this._currentBgs = {};
    };

    Window_Options.prototype.saveBgm = function() {
        this._currentBgm = AudioManager._currentBgm;
    };

    Window_Options.prototype.saveBgs = function() {
        this._currentBgs = AudioManager._currentBgs;
    };

    Window_Options.prototype.loadBgm = function() {
        if (!!this._currentBgm) {
            AudioManager.playBgm(this._currentBgm);
            this._currentBgm = {};
        }
    };

    Window_Options.prototype.loadBgs = function() {
        if (!!this._currentBgs) {
            AudioManager.playBgs(this._currentBgs);
            this._currentBgs = {};
        }
    };

    var _Window_Options_volumeOffset = Window_Options.prototype.volumeOffset;
    Window_Options.prototype.volumeOffset = function() {
        var index = this.index();
        var symbol = this.commandSymbol(index);
        switch (symbol) {
        case 'bgmVolume':
            return Ricon_TweakVolume.params.bgmScale;
        case 'bgsVolume':
            return Ricon_TweakVolume.params.meScale;
        case 'meVolume':
            return Ricon_TweakVolume.params.bgsScale;
        case 'seVolume':
            return Ricon_TweakVolume.params.seScale;
        default:
            return _Window_Options_volumeOffset.call(this);
        }
    };

    var _Window_Options_changeValue = Window_Options.prototype.changeValue;
    Window_Options.prototype.changeValue = function(symbol, value) {
        if (symbol !== 'bgmVolume') {
            this.loadBgm();
        }
        if (symbol !== 'bgsVolume') {
            this.loadBgs();
        }
        if (symbol === 'seVolume' && !!Ricon_TweakVolume.params.seFile) {
            var lastValue = this.getConfigValue(symbol);
            if (lastValue !== value) {
                this.setConfigValue(symbol, value);
                this.redrawItem(this.findSymbol(symbol));
                var se = {
                    'name': Ricon_TweakVolume.params.seFile,
                    'volume': Ricon_TweakVolume.params.seVolume,
                    'pitch': Ricon_TweakVolume.params.sePitch,
                    'pan': Ricon_TweakVolume.params.sePan
                };
                AudioManager.playSe(se);
            }
        } else if (symbol === 'meVolume' && !!Ricon_TweakVolume.params.meFile) {
            var lastValue = this.getConfigValue(symbol);
            if (lastValue !== value) {
                this.setConfigValue(symbol, value);
                this.redrawItem(this.findSymbol(symbol));
                var me = {
                    'name': Ricon_TweakVolume.params.meFile,
                    'volume': Ricon_TweakVolume.params.meVolume,
                    'pitch': Ricon_TweakVolume.params.mePitch,
                    'pan': Ricon_TweakVolume.params.mePan
                };
                AudioManager.playMe(me);
            }
        } else {
            _Window_Options_changeValue.call(this, symbol, value);
            if (symbol === 'bgmVolume' && !!Ricon_TweakVolume.params.bgmFile) {
                this.saveBgm();
                var bgm = {
                    'name': Ricon_TweakVolume.params.bgmFile,
                    'volume': Ricon_TweakVolume.params.bgmVolume,
                    'pitch': Ricon_TweakVolume.params.bgmPitch,
                    'pan': Ricon_TweakVolume.params.bgmPan
                };
                AudioManager.playBgm(bgm, Ricon_TweakVolume.params.bgmOffset);
            } else if (symbol === 'bgsVolume' && !!Ricon_TweakVolume.params.bgsFile) {
                this.saveBgs();
                var bgs = {
                    'name': Ricon_TweakVolume.params.bgsFile,
                    'volume': Ricon_TweakVolume.params.bgsVolume,
                    'pitch': Ricon_TweakVolume.params.bgsPitch,
                    'pan': Ricon_TweakVolume.params.bgsPan
                };
                AudioManager.playBgs(bgs, Ricon_TweakVolume.params.bgsOffset);
            }
        }
    };

    var _Window_Options_prototype_processCancel = Window_Options.prototype.processCancel;
    Window_Options.prototype.processCancel = function() {
        this.loadBgm();
        this.loadBgs();
        _Window_Options_prototype_processCancel.call(this);
    };

})();