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
          "Bearer ya29.c.Ko8B2QcYlp--vqY1gFUCwG_qMLpav6jsmzxOy5ULPran_2yC7C41-OeWNhfsJKBGLWEMMdz-RkQGs72M25KYt1bZtA_D8AeeMhOzMn9D5m4doRrU7g1bDovHEui4f-RoSGmd-hnHnqHA_QEe26ap4DhLP7bl9s1CTya66PbNRu03LWChlkPpd5FVNSmlpx4XEiE",
      },
    };
    const result = await Axios(config);
    return result;
  } catch (err) {
    console.log(err);
  }
};

module.exports = balikanData;
