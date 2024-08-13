const selectTag = document.querySelectorAll("select");
const baseLanguageTextArea = document.getElementById("base");
const targetLanguageTextArea = document.getElementById("target");
const translatorButton = document.getElementById("button");
const exchangeButton = document.getElementById("exchange");
const icons = document.querySelectorAll(".row i");
let speech = new SpeechSynthesisUtterance();

selectTag.forEach((tag) => {
  for (const country_code in countries) {
    let option = `<option value ="${country_code}">${countries[country_code]}</option>`;
    tag.insertAdjacentHTML("beforeend", option);
  }
});

translatorButton.addEventListener("click", () => {
  let text = baseLanguageTextArea.value;
  let translateFrom = selectTag[0].value;
  let translateTo = selectTag[1].value;
  if (!text) return;
  let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
  async function GetTranstion() {
    try {
      let responce = await fetch(apiUrl);
      let data = await responce.json();
      targetLanguageTextArea.value = data.responseData.translatedText;
    } catch {
      alert("Error in loading data");
    }
  }
  GetTranstion();
});
exchangeButton.addEventListener("click", () => {
  let value = selectTag[1].value;
  selectTag[1].value = selectTag[0].value;
  selectTag[0].value = value;

  let text = baseLanguageTextArea.value;
  baseLanguageTextArea.value = targetLanguageTextArea.value;
  targetLanguageTextArea.value = text;
});

icons.forEach((icon) => {
  icon.addEventListener("click", ({ target }) => {
    if (target.classList.contains("fa-copy")) {
      if (target.id == "from") {
        navigator.clipboard.writeText(baseLanguageTextArea.value);
      } else {
        navigator.clipboard.writeText(targetLanguageTextArea.value);
      }
    } else {
      if (target.id == "from") {
        speech.text = baseLanguageTextArea.value;
        speech.lang = selectTag[0].value; 
      } else {
        speech.text = targetLanguageTextArea.value;
        speech.lang = selectTag[1].value;
       
      }
      window.speechSynthesis.speak(speech);
    }
  });
});
