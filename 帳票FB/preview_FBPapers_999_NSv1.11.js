(function () {
  "use strict";

  let title;
  let replace = undefined;
  let ledgerNames = [];

  const Params = new URLSearchParams(window.location.search);
  const paper = Params.get("__kViewerViewCode__");
  if (paper !== null) {
    if (paper.includes("enrollment")) {
        title = "在籍証明書";
    } else if (paper.includes("worker")) {
        title = "労働者名簿";
    } else if (paper.includes("retirement")) {
        title = "退職証明書";
    } else if (paper.includes("dismissal")) {
        title = "解雇理由証明書";
    } else if (paper.includes("appointment")) {
        title = "辞令";
    } 
  }
  console.log(title); 
  if (ledgerNames.length == 0) {     
    ledgerNames.push(title);
  }

// *** formbridge event - confirm.mounted ***
  fb.events.confirm.mounted = [function (state) {
    let displayValue = state.record; 
    
    if (replace.replaceDateToString(displayValue)) {
      alert("no action since there is table with Date Object")
      return state;
    };
   
    showSpinner(); // スピナー表示
    let i = 1;
    while ((replace.replaceGetStatus() != 1) && (i < 10)) {
      setTimeout(() => {}, 200);
      i = i + 1;
    }
    if (replace.replaceGetStatus() != 1) {
      alert("帳票フィールド管理データが取得できません。\n時間をおいて再試行してください");
//      window.close();
      hideSpinner(); // スピナー非表示
      return state;
    }

    let elem = document.getElementsByClassName("ui header fb-title")[0];
    elem.children[0].innerText = ledgerNames[0] + '作成';
    elem = elem.parentElement.children[1];
    elem.children[0].style.display = "none";
    console.log("next step");

    replace.replaceGetValue(ledgerNames[0], displayValue);
    const displayHtml = replace.replaceValueProcess(ledgerNames);
        
    let newDiv = document.createElement("div");  
    newDiv.classList.value = "nkrfs grow";
    newDiv.setAttribute("id", "nkrfs-print");  
    elem.prepend(newDiv);

    const newHTML1 = document.createElement("html");
    newHTML1.setAttribute("id", "print-area"); 

    let DoubleLineflag = false;
    if (ledgerNames[0] == "退職証明書") {
       if (
           displayValue["労働者が解雇理由を請求するか"].value ==
           "解雇理由を請求しない") {
           DoubleLineflag = true;
       }
    }
    const inText1 =  displayHtml.get(ledgerNames[0]);
    newHTML1.innerHTML = inText1;
    newDiv.append(newHTML1);
    if (ledgerNames[0] == "退職証明書" && DoubleLineflag == true) {
      let element = document.getElementById("cssstyle");
      element.style.textDecoration = "line-through";
      element.style.textDecorationColor = "black";
      element.style.textDecorationStyle = "double";
    }

    hideSpinner(); // スピナー非表示
    return state;
  }];

// *** formbridge event - form.mounted ***
  fb.events.form.mounted.push(function (state) {
    console.log("form.mounted");
    const companyId = state.record.会社レコード番号.value;
    let elem = document.getElementsByClassName("ui header fb-title")[0];
    elem.children[0].innerText = ledgerNames[0] + '作成';

    if (replace === undefined) {
      replace = new ReplaceValue(companyId, "form");
      replace.replaceInitProcess(ledgerNames);
    }
    return state;
  });

  fb.events.confirm.submit.push(function (state) {
    console.log("confirm.submit");
    if (document.getElementById("nkrfs-print") !== null) {
        document.getElementById("nkrfs-print").remove();
    }
    return state;
  }); 

  fb.events.confirm.back.push(function (state) {
    console.log("confirm.submit");
    if (document.getElementById("nkrfs-print") !== null) {
        document.getElementById("nkrfs-print").remove();
    }
    return state;
  }); 

  fb.events.kviewer.record.mapped.push(function (state) {
    console.log("record.mapped");
    state.record.employeeId.value =state.record.社員No.value;
    state.record.companyId.value = state.record.会社レコード番号.value;
    console.log(title);
    state.record.帳票種別.value = title;
    return state;
  });

  fb.events.fields.証明者所在地_在籍.changed.push(function (state) {
    console.log("証明者所在地_在籍");
    const newAddress = KanaConverter.halfToFull(state.record.証明者所在地_在籍.value);
    state.record.証明者所在地_在籍.value = newAddress;
    console.log(newAddress);
  });

  fb.events.fields.在職証明書に記載する事項_在籍.changed.push(function (state) {
    console.log("在職証明書に記載する事項_在籍");
    const fullData = KanaConverter.halfToFull(state.record.在職証明書に記載する事項_在籍.value);
    state.record.在職証明書に記載する事項_在籍.value = fullData;
    console.log(fullData);
  });

  fb.events.fields.労働者名簿_備考.changed.push(function (state) {
    console.log("労働者名簿_備考");
    const fullData = KanaConverter.halfToFull(state.record.労働者名簿_備考.value);
    state.record.労働者名簿_備考.value = fullData;
    console.log(fullData);
  });

  fb.events.fields.退職または死亡事由_労働者名簿.changed.push(function (state) {
    console.log("退職または死亡事由_労働者名簿");
    const fullData = KanaConverter.halfToFull(state.record.退職または死亡事由_労働者名簿.value);
    state.record.退職または死亡事由_労働者名簿.value = fullData;
    console.log(fullData);
  });

  fb.events.fields.辞令の内容.changed.push(function (state) {
    console.log("辞令の内容");
    const fullData = KanaConverter.halfToFull(state.record.辞令の内容.value);
    state.record.辞令の内容.value = fullData;
    console.log(fullData);
  });

  fb.events.fields.具体的な理由_退職証明.changed.push(function (state) {
    console.log("具体的な理由_退職証明");
    const fullData = KanaConverter.halfToFull(state.record.具体的な理由_退職証明.value);
    state.record.具体的な理由_退職証明.value = fullData;
    console.log(fullData);
  });

})();
