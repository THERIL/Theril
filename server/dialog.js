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
          "Bearer ya29.c.Ko8B2QfRIWKnY6zLC7fE2GEUsr69l9r5XnygzK3gsoKHk39-L8imvB91YFDn-Ju6D-DCwBNwoqfQfPJGH2nLxf2NHCtgJzAfHV-PJPFIwSar6y3MxEZB5Sxde4ZT8mjseTxxpjBAIyHy6oBTmcIgKe-VR9RcYgPESxve4WBwo8fijdovo6iC1Ert7QcuQfiYGCU",
      },
    };
    const result = await Axios(config);
    return result;
  } catch (err) {
    console.log(err);
  }
};

module.exports = balikanData;
