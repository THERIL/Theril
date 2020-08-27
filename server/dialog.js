const Axios = require("axios");
const baseUrl =
  "https://dialogflow.clients6.google.com/v2beta1/projects/theril-owsy/locations/global/agent/sessions/3e05caeb-cbde-5223-255c-9c8db430f5db:detectIntent";

const balikanData = async (text) => {
  try {
    const config = {
      url: baseUrl,
      method: "post",
      data: {
        queryInput: {
          text: { text, languageCode: "en" },
        },
        queryParams: { timeZone: "Asia/Jakarta" },
      },
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization:
          "Bearer ya29.c.Ko8B2QdQqCZAmmtceEv99Tb8_pyCBtJc7zsBPaYLpfUTkYH3PaQcKy-x6D8b1u6P3_EMpCzUcRJq-pKobhNHq5TW5-GBUABhoTChrG1wHKUpxkqDN4O6mOHby892vesIgny6IZ0YXQQC5ELtwClu3FaFlYnrNGceW539IOcXIrtohUxaclfyNHZn6RvrVxamPoY",
      },
    };
    const result = await Axios(config);
    return result;
  } catch (err) {
    console.log(err);
  }
};

module.exports = balikanData;
