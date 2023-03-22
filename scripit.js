const questions =[
  {
    question:" which framework most used all over the world ?",
    answers:[
      {text:"Ruby on Rails.",correct: true},
      {text:"Vue.js",correct: false},
      {text:"jQuery",correct: false},
      {text:"Flask",correct: false},
  ]
  },
  {question:" which language most used all over the world ?",
  answers:[
    {text:"C++",correct: false},
    {text:"JavaScript",correct: true},
    {text:"Python",correct: false},
    {text:"C",correct: false},
  ]
  }
  ,
  {question:" which language is new latest in the world ?",
  answers:[
    {text:"C++",correct: false},
    {text:"F#",correct: true},
    {text:"Python",correct: false},
    {text:"PureScript",correct: false},
  ]
  }
  ,
  {question:" Are you feel good ?",
  answers:[
    {text:"No",correct: false},
    {text:"Yes",correct: true},
    {text:"😁",correct: true},
    {text:"Why are you asking?",correct: false},
  ]
  }
  ,
  {question:" Please give ne feedback ?",
  answers:[
    {text:"Good",correct: true},
    {text:"Bad",correct: true},
    {text:"Nice",correct: true},
    {text:"modrate",correct: true},
  ]
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score=0;

function startQuiz(){
  currentQuestionIndex =0;
  score =0;
  nextButton.innerHTML = "Next";
  showQuestion(); 
}
function showQuestion(){
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML =questionNo + "." + currentQuestion.question;

  currentQuestion.answers.forEach(answer =>{
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if(answer.correct){
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click",selectAnswer);
  });
}

function resetState(){
  nextButton.style.display ="none";
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
  }
}
function selectAnswer(e){
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if(isCorrect){
    selectedBtn.classList.add("correct");
    score++;
  }
  else{
    selectedBtn.classList.add("incorrect");
  }
Array.from(answerButtons.children).forEach(button =>{
  if(button.dataset.correct === "true"){
    button.classList.add("correct");
  }
  button.disabled = true;

});
nextButton.style.display ="block";
}

function showScrore(){
  resetState();
  questionElement.innerHTML =`You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display ="block";
}

function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion();
  }else{
    showScrore();
  }
}


nextButton.addEventListener("click", () =>{
  if(currentQuestionIndex < questions.length){
    handleNextButton();
  }else{
    startQuiz();
  }
});
startQuiz();