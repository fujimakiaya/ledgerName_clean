"use strict";

let inText = "";
let elem;
let button_elem;
let iskV = false;

function make_iconButton(icon_key, icon_label, icon_id) {
const Icons = [
  {
    "key" : "printer",
    "url" : "https://kviewer.s3.ap-northeast-1.amazonaws.com/upload/6739460862adc5.303729942736/printer.svg",
  },
  {
    "key" : "download",
    "url" : "https://kviewer.s3.ap-northeast-1.amazonaws.com/upload/67393fe70a31a8.291351432736/download.svg",
  },
  {
    "key" : "close",
    "url" : "https://kviewer.s3.ap-northeast-1.amazonaws.com/upload/673ad57bcf9b19.286980382736/close.svg",
  },
  {
    "key" : "family",
    "url" : "https://kviewer.s3.ap-northeast-1.amazonaws.com/upload/6739e1891eeee8.309455522736/family.svg",
  },
  {
    "key" : "preview",
    "url" : "https://kviewer.s3.ap-northeast-1.amazonaws.com/upload/6743094bbdd583.862986902736/preview.svg",
  },
];
  let classD;

  try {
      iskV = window.location.href.includes('viewer');    
      if (iskV) {
        elem = document.getElementsByClassName("flex h-full items-center")[0];
      } else {
        elem = document.getElementsByClassName("ui header fb-title")[0];
        classD = elem.classList.value;
        classD = classD + " sticky z-10 top-0 flex";
        elem.classList.value = classD;
//        elem.setAttribute("class", "sticky z-10 top-0 flex");
        elem.setAttribute("style","background-color: white; border-bottom: solid 1px;");
      }
      
    button_elem = elem.getElementsByClassName("ml-auto")[0];
    if (button_elem === undefined) {
      // make icon area if not made yet
      button_elem = document.createElement("div");
//      button_elem.setAttribute("class", "ml-auto shrink-0 gap-1 md:flex");
        classD = button_elem.classList.value;
        classD = classD + " ml-auto shrink-0 gap-1 md:flex";
        button_elem.classList.value = classD;
    } else {
      button_elem = document.createElement("div");
//      button_elem.setAttribute("class", "ml-2 shrink-0 gap-1 md:flex"); 
        classD = button_elem.classList.value;
        classD = classD + " ml-2 shrink-0 gap-1 md:flex";
        button_elem.classList.value = classD   
    }
    button_elem.setAttribute("id", icon_id);
    elem.appendChild(button_elem);

    const a_button =  document.createElement("button");
    if (!iskV) a_button.setAttribute("style", "cursor: pointer;");
    if (icon_key === "") {
//      a_button.setAttribute("class", "border-role-action bg-role-action border rounded pl-1 pr-1");
      a_button.classList.value = "class", "border-role-action bg-role-action border rounded pl-1 pr-1";
      inText =  '<p class="text-white font-bold">' + icon_label + '</p>';
    } else {
      Icons.forEach(icon => {
        if (icon.key === icon_key) {
//          a_button.setAttribute("class", "border-role-action bg-role-action border rounded pl-1 pr-1");
          a_button.classList.value = "border-role-action bg-role-action border rounded pl-1 pr-1";
          inText = `<img src="${icon.url}" alt="image" style=" margin: auto;" width="28" height="28">`;
          inText =  inText + '<p  class="text-white" style="font-size: 10px;">' + icon_label + '</p>';     
          return          
        };
      });
    }
    a_button.innerHTML = inText;
    button_elem.appendChild(a_button);
    return a_button;
  } catch(e) {
    console.error(e);
  }
};