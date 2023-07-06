const input = document.getElementById("search")
const resultDiv = document.getElementById("result")

const apiUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/"

input.onchange = () => {
  getWord(input.value)
}

function getWord(word) {
  fetch(apiUrl + word)
    .then((response) => response.json())
    .then((textData) => {
      console.log(textData);
      renderResult(textData)
      state = textData
    }).finally(() => {
      input.value = ""
    })
}

function renderResult(data) {
  resultDiv.innerHTML = `
    <h3>${data[0].word}</h3>
        <p>
            ${data[0].meanings.map(val => `
            <span>${val.partOfSpeech}</span>`)}
            <span>${data[0].phonetic}</span>
            <button style="float:right" onclick="play()">
                <i class="bi bi-volume-up"></i>
            </button>
        </p>
          <hr />
          <div class="border-l">
          <h3>Meaning</h3>
          <p>${data[0].meanings[0].definitions[0].definition}</p>
          </div>
          <hr />
          <div class="border-l">
          <h3>Example</h3>
          <p>${data[0].meanings[0].definitions[0].example}</p>
          </div>
          <hr />
          <div class="border-l">
          <h3>Synonyms</h3>
          <p>${data[0].meanings[0].definitions[0].synonyms}</p>
          </div>
          <hr />
          `

}

function play() {
  console.log(state[0].phonetics);
  if (state[0].phonetics[0].audio) {
    new Audio(state[0].phonetics[0].audio).play()
  } else {
    new Audio(state[0].phonetics[1].audio).play()
  }
}

