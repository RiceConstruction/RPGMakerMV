//=============================================================================
// Ricon_SGHint.js
// Version: 1.0.0
//----------------------------------------------------------------------------
// Copyright (c) 2019 米工事
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//----------------------------------------------------------------------------
// Versions
// 1.0.0 2019/01/03 初版
//----------------------------------------------------------------------------
// [GitHub] https://github.com/RiceConstruction/
// [Twitter] https://twitter.com/riceconstr/
// [Fantia] https://fantia.jp/rice-construction/
//=============================================================================

/*:
 * @plugindesc Add a hint to SceneGlossary
 * @author Ricon
 *
 * @help This plugin adds a function which shows a hint for items of SceneGlossary.js.
 * 
 * This plugin needs to be placed below SceneGlossary.js on the plugins list.
 * 
 * ----------------------------------------------------------------------------
 * Memo Tag
 * 
 * 【Set a hint text】
 * ・Place to write: Memo of Item, Armor, or Weapon database
 * ・How to write: <SGHint:text>
 * ・How to use: A text written with the tag above will be shown on a description window of an item of SceneGlossary
 * 
 *
 */

 /*:ja
 * @plugindesc SceneGlossaryに入手ヒントを追加
 * @author 米工事
 *
 * @help トリアコンタン様作のプラグインSceneGlossaryに入手方法のヒントなどを追加することができます。
 * 
 * プラグイン管理画面ではSceneGlossaryよりもRicon_SGHintが下に来るように設定して下さい。
 * 
 * ----------------------------------------------------------------------------
 * メモタグ
 * 
 * 【未入手時に表示するヒント文の設定】
 * ・記入場所：アイテム・武器・防具のメモ欄
 * ・書き方：<SGヒント:内容> または <SGHint:内容>
 * ・使い方：上記タグの「内容」部分に記入した文章が未入手用語の説明欄に表示されます。
 * 
 *
 */

(function(){
    'use strict';

    Window_Glossary.prototype.drawItem = function(index, noSound) {
        this.contents.clear();
        this._pageIndex = index;
        this.updateArrows();
        if(this._itemData && !$gameParty.hasGlossary(this._itemData)) {
            this.drawItemHint();
        }
        if (!this._itemData || !$gameParty.hasGlossary(this._itemData)) {
            return;
        }
        var bitmap = this.getGlossaryBitmap(index);
        if (bitmap) {
            bitmap.addLoadListener(this.drawItemSub.bind(this, bitmap));
        } else {
            this.drawItemSub(null);
        }
        if (!noSound) SoundManager.playCursor();
    };

    Window_Glossary.prototype.drawItemHint = function() {
        var id = this._itemData.id;
        var text = "";
        if(this._itemData.itypeId > 0 && $dataItems[id] && $dataItems[id].meta['SGヒント']) {
            text = $dataItems[id].meta['SGヒント'];
        }
        if(this._itemData.wtypeId > 0 && $dataWeapons[id] && $dataWeapons[id].meta['SGヒント']) {
            text = $dataWeapons[id].meta['SGヒント'];
        }
        if(this._itemData.atypeId > 0 && $dataArmors[id] && $dataArmors[id].meta['SGヒント']) {
            text = $dataArmors[id].meta['SGヒント'];
        }
        var textPos = this.getTextPosition();
        if(text) {
            this.drawTextEx(text, 0, textPos);
        }
    };

})()