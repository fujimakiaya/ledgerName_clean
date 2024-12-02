(function () {
  "use strict";

  let replace = {};
  let ledgerNames = [];

  const Params = new URLSearchParams(window.location.search);
  const companyId = Params.get("companyId");
  if (companyId === "") companyId = 327;

  let title = document.getElementsByTagName("h1")[0].textContent;
  title = title.replaceAll("・", "");
  title = title.replaceAll("閲覧", "");
  title = title.replaceAll("印刷", "");
  title = title.replaceAll("修正", "");  
  if (ledgerNames.length == 0) {     
      ledgerNames.push(title);
      if (title === "雇用契約書") {
          ledgerNames.push("労働条件通知書");
      }
  }
  replace = new ReplaceValue(companyId);

// *** kViewer event - record.show ***
  kviewer.events.on("record.show", function (state) {
    let displayValue = state.record.kintoneRecord;
    document.getElementById("__next").style.visibility = "hidden";

    showSpinner(); // スピナー表示
    
    let i = 1;
    while ((replace.replaceGetStatus() != 1) && (i < 5)) {
        setTimeout(() => {}, 200);
        i = i + 1;
    }
    if (replace.replaceGetStatus() != 1) {
         alert("kintone record load time out");
         window.close();
    }

    console.log("next step");
    replace.replaceGetValue(ledgerNames[0], displayValue);
    const displayHtml = replace.replaceValueProcess(ledgerNames);

    let newDiv = document.createElement("div");  
    newDiv.setAttribute("class", "grow");   
    document.getElementsByClassName("flex grow")[0].remove();
    document.getElementsByClassName("flex h-screen flex-col overflow-y-auto kv-container")[0].append(newDiv);

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
           
     const aButton1 = make_iconButton("printer", ledgerNames[0], "nkrfs-action1");
     aButton1.addEventListener("click", function () {
     let newTab1 = window.open("", "帳票", "_blank");
     if (newTab1 === null) {
         alert("window open error");
         return;
     }
          
      const inText = displayHtml.get(ledgerNames[0]);
      newTab1.document.getElementsByTagName("html")[0].innerHTML = inText;
          if (ledgerNames[0] == "退職証明書" && DoubleLineflag == true) {
            let element = document.getElementById("cssstyle");
            element.style.textDecoration = "line-through";
            element.style.textDecorationColor = "black";
            element.style.textDecorationStyle = "double";
          }
          
          newTab1.print();
          newTab1.close();
        })
        
        if (ledgerNames.length === 2) {
          const aButton2 = make_iconButton("printer", ledgerNames[1], "nkrfs-action2");
          aButton2.addEventListener("click", function () {
            let newTab2 = window.open("", "帳票", "_blank");
            if (newTab2 === null) {
              alert("window open error");
              return;
            }
            const inText = displayHtml.get(ledgerNames[1]);
            newTab2.document.getElementsByTagName("html")[0].innerHTML = inText;
            newTab2.print();
            newTab2.close();
       })
    }

    hideSpinner(); // スピナー非表示
    document.getElementById("__next").style.visibility = "visible";     
    return state;
  });

// *** kViewer event - view.index.show ***
  kviewer.events.on("view.index.show", function (state) {
    if (replace.replaceGetStatus() === 0) {
      replace.replaceInitProcess(ledgerNames);
    }

    if ((ledgerNames[0] === "労働者名簿") && (document.getElementById("nkrfs-button1") == null)) {
      const pButton1 = make_iconButton("printer", "全社員（退職者含む）", "nkrfs-button1");
      const pButton2 = make_iconButton("printer", "全社員（退職者除く）", "nkrfs-button2");
    }
    
    if (document.getElementById("nkrfs-button3") == null) {
      const pButton3 = make_iconButton("close", "ウィンドウを閉じる", "nkrfs-button3");
      pButton3.addEventListener("click", function () {
        window.close();
      })
    }
    return state;
  });

})();
