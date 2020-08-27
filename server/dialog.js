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
          "Bearer ya29.c.Ko8B2Qce_YLstgMkSPCzvO8kMzlhdM-GFipGXk-WFfk5YhkzqSNALEWFumDROtavXsMDGJkXsaokgW7k3c5jsWEYm5HsEPBbYz1FFSNhqc6dIxoZGUPoOPWBggg8PdlpTrns2g94QYWVK24WAu3ITgVCPB5rSJG2QJOXPhKDInYf4Y_bxUIzMJ1PHRE4eBy1K1E",
      },
    };
    const result = await Axios(config);
    return result;
  } catch (err) {
    console.log(err);
  }
};

module.exports = balikanData;
