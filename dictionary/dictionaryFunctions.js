export const fetchDictionaryEntry = (word = "help") => {
  const params = {
    method: "GET",
    headers: {
      Accept: "application/json",
      app_id: "a6274974",
      app_key: "06e17db5b5ac409a0ce68f3b330a4f43",
    },
  };

  fetch(
    `https://od-api.oxforddictionaries.com/api/v2/search/en-gb?q=${word}`,
    params
  )
    .then((response) => response.json())
    .then((body) => console.log(body.results));
};

export const fetchTranslation = (wordToTranslate = "spoon") => {
  const params = {
    method: "GET",
    headers: {
      Accept: "application/json",
      app_id: "a6274974",
      app_key: "06e17db5b5ac409a0ce68f3b330a4f43",
    },
  };

  fetch(
    `https://od-api.oxforddictionaries.com/api/v2/translations/en/de/${wordToTranslate}?strictMatch=false&fields=translations`,
    params
  )
    .then((response) => response.json())
    .then((body) => {
      return body.results[0].lexicalEntries[0].entries[0].senses[0]
        .translations[0].text;
    });
};
