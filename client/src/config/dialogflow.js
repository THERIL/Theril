const Axios = require("axios");
const baseUrl =
      "https://dialogflow.clients6.google.com/v2beta1/projects/theril-owsy/locations/global/agent/sessions/3e05caeb-cbde-5223-255c-9c8db430f5db:detectIntent";

const AUTH = "Bearer ya29.c.Ko8B2QfiRdbCiVyxDgliOT5LXsDpxdfVbCZEXKyO8mqYALqyjoSH47LSFscTE4w8e29t2qquvRbt39eI0Spr67lEUDDyoILI57CBYIf02b4YJFAxZ9ScJ_ZGAmghArcoY7Rwe4G0aZb2gOY1ewy8CqWNIYiucrJSB-v5DEN5-yzYji6HV1_Sv6Zl-nNRSO28iGk"
let queryInput = {
      "queryInput":
      {
            "text":
            {
                  "text": "",
                  "languageCode": "en"
            }
      }, "queryParams": { "timeZone": "Asia/Jakarta" }
}
const balikanData = async (data) => {
      queryInput.queryInput.text.text = data
      try {
            const config = {
                  url: baseUrl,
                  method: "post",
                  queryInput,
                  headers: {
                        "Content-Type": "application/json; charset=utf-8",
                        "Access-Control-Allow-Origin": "*",
                        AUTH,
                  },
            };
            const result = await Axios(config);
            console.log(result)
            return result;
      } catch (err) {
            console.log(err);
      }
};

module.exports = balikanData;
