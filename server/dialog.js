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
          "Bearer ya29.c.Ko8B2QeTCwyNhqw3MW2c8YHIMogbos-T72g_ZCpssDCBERBQk_s7hJyAWMzp5oWygKKxbEhdY17w7i0v2l7YfjvmrmosUnUw9NfXLnIBFI0yxIGbezLWM-HTiKL8ArhgEZXosI9QJ_l9G9R84sueN6Ah5FCSFkTYoOyp1SL6lfcmVeXMpaaPAgP8m-XmnAxOaxc",
      },
    };
    const result = await Axios(config);
    return result;
  } catch (err) {
    console.log(err);
  }
};

module.exports = balikanData;
