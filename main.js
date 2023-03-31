// 랜덤번호 지정
// 유저가 번호를 입력한다 / go 버튼을 누름
// 만약, 유저가 랜덤번호를 맞추면, 맞췄습니다!
// 랜덤번호가 < 유저번호, Down!!
// 랜덤번호가 > 유저번호, Up!!
// Reset버튼 누르면 게임이 리셋
// 5번의 기회를 다쓰면 게임이 끝난다(play 버튼이 disable 된다)
// 유저가 1~100 범위 밖에 숫자를 입력하면 알려주고, 기회를 깍지 않는다
// 유저가 이미 입력한 숫자를 입력하면 알려주고, 기회를 깍지 않는다.
let randomNum = 0;
let input = document.getElementById("user-input");
let playButton = document.getElementById("play-button");
let resetButton = document.getElementById("reset-button");
let resultText = document.querySelector(".result-text");
let chanceArea = document.getElementById("chance-area");
let chance = 5;
let gameOver = false;
let history = [];

pickRandomNum = () => {
  randomNum = Math.floor(Math.random() * 100 + 1);
  console.log("정답은?", randomNum);
};

play = () => {
  userValue = input.value;

  if (userValue < 1 || userValue > 100) {
    resultText.textContent = "1~100사이의 값을 입력해주세요";
    return;
  }
  if (history.includes(userValue)) {
    resultText.textContent = "이미 입력한 값입니다. 다시 입력해주세요";
    return;
  }

  chance--;
  chanceArea.textContent = `남은 기회는 ${chance}번`;

  if (userValue < randomNum) {
    resultText.textContent = "UP!";
  } else if (userValue > randomNum) {
    resultText.textContent = "Down!";
  } else {
    resultText.textContent = "맞췄습니다!!";
    gameOver = true;
  }

  history.push(userValue);

  if (chance < 1) {
    gameOver = true;
  }
  if (gameOver == true) {
    playButton.disabled = true;
  }
};

reset = () => {
  pickRandomNum();
  gameOver = false;
  playButton.disabled = false;
  input.value = "";
  chance = 5;
  chanceArea.textContent = "남은 기회는 5번";
  resultText.textContent = "죽기 싫으면 맞춰라";
  history = [];
};

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
input.addEventListener("focus", () => {
  input.value = "";
});
pickRandomNum();
