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
          "Bearer ya29.c.Ko8B2Qdn2z5S5B0m8jjMTlNqfk4GN4jigZ1xXNSvbfBDOZHLTuciiyPZfTVeIawcfBUjCZRknu-Ica0XGr40ZOzTeDG3TEyYzrH22rsNzJEE1ZU18-W-cXU7bQiZPguRUSCJM2op2r35sQ33k7X0NIoXm1C65QJLzo-Cr33m33H1J5R4MOgM7mfDUshBCm7mdTo",
      },
    };
    const result = await Axios(config);
    return result;
  } catch (err) {
    console.log(err);
  }
};

module.exports = balikanData;
