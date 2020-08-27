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
          "Bearer ya29.c.Ko8B2QcAY5E0obh4_0xfTRg6jfGkNsOHsT1uUEn369GzISr-GYPxXWUwYWYtE374041Zu5otUxzu9zuhlXj8i_PYymyw4osXbJELkgvnDIITiSy5d37scx-WOMbgXpmg0j7Q7jKLyquabkuC3av679sz9Mh6g7NLg6t9EEvBU1q2BoYNmZY5eL5yCLQpA9EPsHk",
      },
    };
    const result = await Axios(config);
    return result;
  } catch (err) {
    console.log(err);
  }
};

module.exports = balikanData;
