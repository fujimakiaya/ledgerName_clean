/*
 * Spinner
 * Copyright (c) 2016 Cybozu
 *
 * Licensed under the MIT License
 * https://opensource.org/license/mit/
*/


/**
* スピナー設置用の関数
**/
// スピナーを動作させる関数
const showSpinner = () => {
  // 要素作成等初期化処理
  if (document.getElementsByClassName('.kintone-spinner').length === 0) {

    // スピナー設置用要素の作成
    const spinDiv = document.createElement('div');
    spinDiv.id = 'kintone-spin';
    spinDiv.classList.add('kintone-spinner');

    // スピナーと背景要素の作成
    const spinBgDiv = document.createElement('div');
    spinBgDiv.id = 'kintone-spin-bg';
    spinBgDiv.classList.add('kintone-spinner');

    // スピナー用要素をbodyにappend
    document.body.appendChild(spinDiv);
    document.body.appendChild(spinBgDiv);

    // スピナー動作に伴うスタイル設定
    spinDiv.style.cssText = 'position: fixed; top: 50%; left: 50%; z-index: 510; background-color: #fff; padding: 26px; border-radius: 4px;';
    spinBgDiv.style.cssText = 'position: fixed; top: 0px; left: 0px; z-index: 500; width: 100%; height: 100%; background-color: #000; opacity: 0.5;';


    // スピナーに対するオプション設定
    const opts = {
      color: '#000'
    };

    // スピナーを作動
    new Spinner(opts).spin(document.getElementById('kintone-spin'));
  }

  document.querySelectorAll('.kintone-spinner').forEach(element => {
    element.style.display = 'block';
  });
};

// スピナーを停止させる関数
const hideSpinner = () => {
  // スピナー停止（非表示）
  document.querySelectorAll('.kintone-spinner').forEach(element => {
    element.style.display = 'none';
  });
};