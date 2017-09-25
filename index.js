const STATE = {
  questions: [
  {
  scenario: "A Bad Guy is mounted and grabs your neck with one or both hands",
  choices: ['Trap & Roll Escape', 'Take the Back', 'Americana Armlock', 'Elbow Escape'],
  correct: 0,
  },
  { 
  scenario: "An aggressive Bad Guy runs at you with a haymaker",
  choices: ['Trap & Roll Escape', 'Haymaker Punch Defense', 'Haymaker', 'Bodyfold Takedown'],
  correct: 2,
  },
  {
    scenario: "A Bad Guy walks towards you aggressively without throwing a punch",
    choices: ['Twisting Arm Control', 'Take the Back', 'Standing Armlock', 'Clinch'],
    correct: 3,
  },
    {
    scenario: "The Bad Guy is in your guard and tries to punch you",
    choices: ['Hook Sweep', 'Straight Armlock', 'Punch Block Series 1-4', 'Kimura Armlock'],
    correct: 2,
  },
    {
    scenario: "The Bad Guy was taken down via bodyfold and wants to get up",
    choices: ['Trap & Roll Escape', 'Mount Control', 'Punch Bad Guy', 'Take the Back'],
    correct: 1,
  },
    {
    scenario: "The Bad Guy puts in you a guillitone choke",
    choices: ['Leg Hook Takedown', 'Bodyfold Takedown', 'Guillitone Choke Defense', 'Rear Takedown'],
    correct: 2,
  },
    {
    scenario: "You are in mount position and the Bad Guy pushes you up several times to try to get you off",
    choices: ['Low & High Swim', 'Collar Choke', 'Elevator Sweep', 'Americana Armlock'],
    correct: 0,
  },
    {
    scenario: "The Bad Guy is in your guard and you're able to establish stage 1.5",
    choices: ['Straight Armlock', 'Kick in the Face', 'Punch Block Series Stage 5', 'Triangle Choke'],
    correct: 3,
  },
    {
    scenario: "The Bad Guy is walking towards and pushing you with one arm",
    choices: ['Flying Triangle', 'Double-leg Takedown', 'Standing Armlock', 'Run Away'],
    correct: 2,
  },
    {
    scenario: "The Bad Guy is sidemounted by you and tries to get up on their knees/elbows",
    choices: ['Guard Prevention', 'Take the Back', 'Mount Transition', 'Shrimp Escape'],
    correct: 1,
  },
],
currentQuestionIndex: 0,
lastAnswerCorrect: false,
userScore: 0,
}


const START_PAGE = $(".start-page");
const QUESTION_PAGE = $(".question-page");
const FEEDBACK_PAGE = $(".feedback-page");
const SUMMARY_PAGE = $(".summary-page");


function startQuiz() {
  $(".start-button").on('click', function (e) {
    $(START_PAGE).attr("hidden", true);
   if ($(QUESTION_PAGE).attr("hidden")) {
     $(QUESTION_PAGE).removeAttr("hidden");
   }
   renderQuestions(STATE, ".question-page");
  })
}

function renderQuestions(state, questionPageSelector) {
  const currentQuestion = state.questions[state.currentQuestionIndex];
  const questionNum = state.currentQuestionIndex+1
  const scenario = currentQuestion.scenario; 
  const choices = currentQuestion.choices; 
  
  // const newQuestion = $(questionPageSelector).clone(true); 
  // instead of destroying what exists, clone to add it 
  
  let choicesHTML = "";  //need to define this since 88 was calling to it
  
  for (let i = 0; i < choices.length; i +=1) {
    choicesHTML += (
      `<input type="radio" name="technique" value="${i}" id="technique-${i}" checked>
      <label for="technique-${i}">${choices[i]}</label>
      <br>`
      )
    }
  $(".progress").text(questionNum + '/' + state.questions.length);
  $(".scenario").text(scenario);
  $(".choice-list").html(choicesHTML);
}


function handleAnswerSubmit () {
  $("#question-form").on('submit', function (e) {
    e.preventDefault();
    //this turns the input into a value
    const userChoice =  Number($('input:checked').val()); 
    //evalutes the answer submitted 
    evaluateAnswerSubmit(STATE, userChoice);
  })
}

//how to increment score? 
//need to evaluate submission with correct choice

function evaluateAnswerSubmit (state, userChoice) {
  let currentQuestion = state.questions[state.currentQuestionIndex] 
  let correctChoice = currentQuestion.correct;
  if (userChoice === correctChoice) {
  state.lastAnswerCorrect = true;
  state.userScore++;
  } else {
    state.lastAnswerCorrect = false;
  }
  
  renderFeedbackPage(STATE, ".feedback-page", currentQuestion);
  STATE.currentQuestionIndex++;  //for testing, add = 9 to go to last ?  // to restore, make ++ 
  
}

function renderFeedbackPage (state, feedbackPageSelector, currentQuestion) {
  const correctChoice = currentQuestion.choices[currentQuestion.correct].toLowerCase();
  const scenario = currentQuestion.scenario.charAt(0).toLowerCase() + currentQuestion.scenario.substr(1); 
  
  $("[class$=page]").attr("hidden", true);
  $(feedbackPageSelector).removeAttr("hidden");
  let feedbackCorrectness = state.lastAnswerCorrect ? "You got it!" : "Think again!"; 
  
  // let feedbackCorrectness = ""; 
  //   if (state.lastAnswerCorrect) {
  //     feedbackCorrectness = "You got it!"; 
  //     } else if (state.lastAnswerCorrect === false) {
  //     feedbackCorrectness = "Think again!";
   // }
     
  let feedbackText =  'Use ' + correctChoice + ' when ' + scenario + '.';
  $(".feedback-correctness").text(feedbackCorrectness);
  $(".feedback-info").text(feedbackText);
}

function clickOk() {
  $(".ok-button").on('click', function (e) {
    $("[class$=page]").attr("hidden", true); 
    if (STATE.currentQuestionIndex === STATE.questions.length-1) {
        displaySummary(STATE); 
       $(SUMMARY_PAGE).removeAttr("hidden");
    } else {
      renderQuestions(STATE, ".question-page");
     $(QUESTION_PAGE).removeAttr("hidden");
    }
  }) 
}

function displaySummary(state) {
  let finalScore = state.userScore; 
  let numQuestions = state.questions.length; 
  $(".total-correct").text(finalScore);
  $(".number-questions").text(numQuestions);
}

function retakeQuiz () {
  $(".retake-button").on('click', function (e) {
    $(SUMMARY_PAGE).attr("hidden", true);
    if ($(START_PAGE).attr("hidden")) {
      $(START_PAGE).removeAttr("hidden");
      }
    })
  }
  
startQuiz(); 
handleAnswerSubmit();
clickOk();
retakeQuiz();