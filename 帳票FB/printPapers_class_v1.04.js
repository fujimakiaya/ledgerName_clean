class ChangeValue {
  functionsObject = {
    文字消去_1文字: function remove_oneword(i, value) {
      try {
        if (value[i].length > 0) {
          value[i] = value[i].slice(0, -1);
          return value;
        } else {
          return value;
        }
      } catch (e) {
        console.error(e);
      }
    },
    日付: function date_array(i, value, replace_data, cer_name) {
      try {
        if (replace_data.get(cer_name)["day_display"] == "YYYY年MM月DD日") {
          if (Object.prototype.toString.call(value[i]).includes("Date")) {
            value[i] = value[i]
              .toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })
              .replaceAll("/", "-");
          }

          if (value[i] && value[i].trim() !== "") {
            let originalDateString = value[i];
            let originalDate = new Date(originalDateString);

            let year = originalDate.getFullYear();
            let month = originalDate.getMonth() + 1;
            let day = originalDate.getDate();
            let formattedDate = year + "年" + month + "月" + day + "日";
            value[i] = formattedDate;
            return value;
          } else {
            return value;
          }
        } else {
          return value;
        }
      } catch (e) {
        console.error(e);
      }
    },
    日付_年月のみ: function date_array(i, value, replace_data, cer_name) {
      try {
        if (replace_data.get(cer_name)["day_display"] == "YYYY年MM月DD日") {
          if (Object.prototype.toString.call(value[i]).includes("Date")) {
            value[i] = value[i]
              .toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })
              .replaceAll("/", "-");
          }

          if (value[i] && value[i].trim() !== "") {
            let originalDateString = value[i];
            let originalDate = new Date(originalDateString);

            let year = originalDate.getFullYear();
            let month = originalDate.getMonth() + 1;
            let formattedDate = year + "年" + month + "月";
            value[i] = formattedDate;

            return value;
          } else {
            return value;
          }
        } else {
          if (value[i] && value[i].trim() !== "") {
            let originalDateString = value[i];
            let originalDate = new Date(originalDateString);

            let year = originalDate.getFullYear();
            let month = originalDate.getMonth() + 1;
            let formattedDate = year + "-" + month;
            value[i] = formattedDate;
            return value;
          } else {
            return value;
          }
        }
      } catch (e) {
        console.error(e);
      }
    },
    金額: function addCommasToValue(i, value) {
      try {
        if (!isNaN(value[i]) && value[i] !== "") {
          value[i] = parseFloat(value[i]).toLocaleString("en-US");
        }
        return value;
      } catch (e) {
        console.error(e);
      }
    },
    テーブル: function table_array(
      i,
      value,
      replace_data,
      cer_name,
      displayValue
    ) {
      try {
        let tablefield_name = replace_data.get(cer_name)["table_field"];
        let table = tablefield_name.map((name) =>
          name.replace(/^\{%|\%}$/g, "")
        );
        let table_content = displayValue[table[i]].value;
        let pp = 0;
        for (let jj = i + 1; jj < tablefield_name.length - 1; jj++) {
          if (table[jj] !== "") {
            if (table[jj - 1] == table[jj]) {
              pp += 1;
            } else {
              pp = 0;
            }
          }
          if (table_content[pp]) {
            let name = table[jj];
            value[jj] = table_content[pp].value[name].value;
          } else {
            value[jj] = "";
          }
        }
      } catch (e) {
        console.error(e);
        value[jj] = "";
      }
      //      console.log(value);
      return value;
    },
    個別関数1: function original_function1(
      i,
      value,
      replace_data,
      cer_name,
      displayValue
    ) {
      try {
        let tablefield_name = replace_data.get(cer_name)["table_field"];
        let index = 0;
        const mapping = {
          ア: { index: 1, value1: "１", value2: "①", value3: "ア" },
          イ: { index: 2, value1: "２", value2: "②", value3: "イ" },
          ウ: { index: 3, value1: "３", value2: "③", value3: "ウ" },
          エ: { index: 4, value1: "４", value2: "④", value3: "エ" },
          オ: { index: 5, value1: "５", value2: "⑤", value3: "オ" },
          カ: { index: 6, value1: "６", value2: "⑥", value3: "カ" },
          キ: { index: 7, value1: "７", value2: "⑦", value3: "キ" },
        };

        const alphabet = displayValue[tablefield_name[i]].value;
        for (let key in mapping) {
          if (alphabet == key) {
            value[i + mapping[key].index] = mapping[key].value2;
            index = mapping[key].index;
          } else {
            value[i + mapping[key].index] = mapping[key].value1;
          }
        }
      } catch (e) {
        console.error(e);
      }
      return value;
    },
    個別関数2: function original_function2(
      i,
      value,
      replace_data,
      cer_name,
      displayValue
    ) {
      try {
        let tablefield_name = replace_data.get(cer_name)["table_field"];
        let index = 0;
        const mapping = {
          ア: { index: 1, value1: "１", value2: "①", value3: "ア" },
          イ: { index: 2, value1: "２", value2: "②", value3: "イ" },
          ウ: { index: 3, value1: "３", value2: "③", value3: "ウ" },
          エ: { index: 4, value1: "４", value2: "④", value3: "エ" },
          オ: { index: 5, value1: "５", value2: "⑤", value3: "オ" },
          カ: { index: 6, value1: "６", value2: "⑥", value3: "カ" },
        };

        const alphabet = displayValue[tablefield_name[i]].value;
        for (let key in mapping) {
          if (alphabet == key) {
            value[i + mapping[key].index] = mapping[key].value2;
            index = mapping[key].index;
            value[i + 7] = mapping[key].index;
          } else {
            value[i + mapping[key].index] = mapping[key].value1;
          }
        }
      } catch (e) {
        console.error(e);
      }
      return value;
    },
    個別関数3: function original_function3(
      i,
      value,
      replace_data,
      cer_name,
      displayValue
    ) {
      try {
        let tablefield_name = replace_data.get(cer_name)["table_field"];
        let index = value[i];
        let reasons = displayValue[tablefield_name[i]].value;
        if (reasons.length < 35) {
          value[i + 2 + (index - 1) * 3] = reasons;
        } else if (reasons.length < 53) {
          value[i + 1 + (index - 1) * 3] = reasons.substring(0, 10);
          value[i + 2 + (index - 1) * 3] = reasons.substring(
            11,
            reasons.length
          );
        } else {
          value[i + 1 + (index - 1) * 3] = reasons.substring(0, 10);
          value[i + 2 + (index - 1) * 3] = reasons.substring(11, 53);
          value[i + 3 + (index - 1) * 3] = reasons.substring(
            54,
            reasons.length
          );
        }

        value[i] = "";
      } catch (e) {
        console.error(e);
      }
      return value;
    },
  };
}

//replace作業
class ReplaceValue extends ChangeValue {
  constructor(companyId, caller) {
    super();
    this.companyId = companyId;
    this.template_array = [];
    this.replace_data = {};
    this.field_name_array = [];
    this.replace_value_array = [];
    this.kind_value_array = [];
    this.customer_value = [];
    this.display_html = new Map();
    this.displayValue = {};
    this.initialized = 0;
    this.caller = caller === undefined ? "viewer" : caller;
  }

  replaceGetValue(cer_name, displayValue) {
    try {
      this.displayValue = displayValue;
      this.field_name_array = this.replace_data.get(cer_name)["field_name"];
      this.replace_value_array =
        this.replace_data.get(cer_name)["replace_value"];
      this.kind_value_array = this.replace_data.get(cer_name)["kind_value"];
      this.customer_value = [];

      for (let [index, element] of this.field_name_array.entries()) {
        this.customer_value[index] = replaceTemplate.call(this, element);
        function replaceTemplate(templateString) {
          // プレースホルダーを正規表現でマッチさせる
          return templateString.replace(/{%([^%]+)%}/g, (match, p1) => {
            // プレースホルダーからフィールド名を取得し、値に変換する
            const key = p1.trim();
            if (
              this.displayValue[key] &&
              this.displayValue[key].value != null
            ) {
              return this.displayValue[key].value.replace(/\n/g, "<br>");
            }
            return ""; // 値が存在しない場合は空文字を返す
          });
        }
      }

      for (let i = 0; i < this.customer_value.length; i++) {
        if (this.kind_value_array[i] != null && this.customer_value != "") {
          this.customer_value = this.functionsObject[
            `${this.kind_value_array[i]}`
          ](
            i,
            this.customer_value,
            this.replace_data,
            cer_name,
            this.displayValue
          );
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  replaceValueProcess(ledgerNames) {
    for (let ledgerName of ledgerNames) {
      //      this.replaceGetValue(ledgerName);
      for (let template of this.template_array) {
        if (template[0].indexOf(ledgerName) > -1) {
          if (ledgerName == "退職証明書") {
            template[1] = template[1].replace(
              ">%e22%",
              " id = cssstyle > （別紙の理由による）"
            );
          }
          for (let i = 0; i < this.replace_value_array.length; i++) {
            template[1] = template[1].replace(
              this.replace_value_array[i],
              this.customer_value[i]
            );
          }
          this.display_html.set(ledgerName, template[1]);
        }
      }
    }
    return this.display_html;
  }

  replaceDateToString(data_object) {
    let retC = false;
    const entries = Object.entries(data_object);
    for (let [key, obj] of entries) {
      //        console.log(key, obj);
      if (obj.type === "DATE" && obj.value !== "") {
        obj.value = new Date(obj.value)
          .toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
          .replaceAll("/", "-");
      } else if (obj.type === "SUBTABLE") {
        //        delete data_object[key];
      } else if (obj.type === "LABEL") {
        //        delete data_object[key];
      }
    }
    return retC;
  }

  replaceGetStatus() {
    return this.initialized;
  }

  replaceInitProcess(ledgerNames) {
    //*** Initialization of printprocess - get 帳票フィールド管理アプリ・データ ***
    const relay = new Relay(
      3851,
      [
        {
          key: "会社レコード番号",
          operator: "=",
          value: this.companyId,
        },
      ],
      ["帳票名", "フィールド管理", "日付の表示方法", "htmファイル"]
    );

    relay
      .RelayGetValue()
      .then((data) => {
        const storedValues = JSON.parse(sessionStorage.getItem("fileValues1"));
        if (storedValues) {
          const restoredTemplateArray = new Map(Object.entries(storedValues));
          return restoredTemplateArray;
        } else {
          return relay.FileGetValue(ledgerNames, data);
        }
      })
      .then((fileValues) => {
        this.template_array = fileValues;
        return relay.GetRequireValue();
      })
      .then((ret_value) => {
        this.replace_data = ret_value;
        this.initialized = 1;
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

const ENDPOINT = "https://kintone-relay-api-eidnwbgjma-an.a.run.app";

//リレーAPIで情報取得 replace_dataを返す
class Relay {
  constructor(appid, query_params, records) {
    this.appid = appid;
    this.records = records;
    this.query_params = query_params;
    this.data = null;
  }

  async RelayGetValue() {
    if (!JSON.parse(sessionStorage.getItem("getValue1"))) {
      const requestParam = {
        id: this.appid,
        query_params: this.query_params,
        fields: this.records,
      };

      try {
        const response = await fetch(ENDPOINT + "/getRecord", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestParam),
        });

        if (!response.ok) {
          console.error("Error: ", await response.json());
          throw new Error("Network response was not ok");
        }

        this.data = await response.json();
        sessionStorage.setItem("getValue1", JSON.stringify(this.data));
        //        console.log(this.data); // レスポンスデータを処理
      } catch (error) {
        console.error("Error:", error); // エラーハンドリング
      }
    }
    this.data = JSON.parse(sessionStorage.getItem("getValue1"));
    return JSON.parse(sessionStorage.getItem("getValue1"));
  }

  async FileGetValue(ledgerNames, data) {
    let template_array = new Map();
    let file_records = data["records"];
    for (let e of file_records) {
      if (
        e["htmファイル"].value.length != 0 &&
        ledgerNames.includes(e["帳票名"].value)
      ) {
        const requestParam2 = {
          id: this.appid,
          file_key: e["htmファイル"].value[0].fileKey,
        };

        try {
          const response = await fetch(ENDPOINT + "/getFile", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestParam2),
          });

          if (!response.ok) {
            console.error("Error: ", await response.blob());
            throw new Error("Network response was not ok");
          }

          let blob = await response.blob();
          let arrayBuffer = await blob.arrayBuffer();
          let decoder = new TextDecoder("shift-jis");
          let template = decoder.decode(arrayBuffer);
          // console.log(template); // レスポンスデータを処理
          template_array.set(e["帳票名"].value, template);
          // console.log(template_array);
        } catch (error) {
          console.error("Error:", error); // エラーハンドリング
        }
      }
    }
    let templateObject = Object.fromEntries(template_array.entries());
    sessionStorage.setItem("fileValues1", JSON.stringify(templateObject));
    return template_array;
  }

  GetRequireValue() {
    let data_records = JSON.parse(sessionStorage.getItem("getValue1"))[
      "records"
    ];
    const replace_data = new Map();
    for (let e of data_records) {
      let cer_name = e["帳票名"].value;
      let table_value = e["フィールド管理"].value;
      let day_display = e["日付の表示方法"].value;
      let field_name = [];
      let kind_value = [];
      let table_field = [];
      let replace_value = [];
      let replace_obj = {};

      for (let [index, element] of table_value.entries()) {
        let value_obj = element.value;
        field_name[index] = value_obj["フィールド名"].value;
        replace_value[index] = value_obj["置き換えるべき値"].value;
        kind_value[index] = value_obj["種類"].value;
        table_field[index] = value_obj["テーブル用フィールド"].value;
        replace_obj = {
          field_name: field_name,
          replace_value: replace_value,
          kind_value: kind_value,
          table_field: table_field,
          day_display: day_display,
        };
      }
      replace_data.set(cer_name, replace_obj);
    }
    return replace_data;
  }
}
