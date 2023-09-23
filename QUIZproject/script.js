const questions = [
    {
        question: "Which one of the following describes spam?",
        ans : [
            {text: "Gathering information about a person or organisation without their knowledge." ,correct: false},
            {text: "Performing an unauthorised, usually malicious, action such as erasing files." ,correct: false},
            {text: "Putting unnecessary load on the network by making copies of files." ,correct: false},
            {text: "Sending unwanted bulk messages" ,correct: true},
        ] 
    },
    {
        question: "Which one of the following can protect a computer from the risk of unwanted emails?",
        ans : [
            {text: "Anti-spam software" ,correct: false},
            {text: "Anti-virus software" ,correct: true},
            {text: "Anti-spyware software." ,correct: false},
            {text: "PC diagnostic software." ,correct: false},
        ] 
    },
    {
        question: "Which one of the following describes why it is important to update antivirus software regularly?",
        ans : [
            {text: "To protect your computer from all known viruses" ,correct: true},
            {text: "To ensure the software identifies old viruses." ,correct: false},
            {text: "To protect your computer from unwanted bulk messages." ,correct: false},
            {text: "To prevent the spread of malicious programs on the Internet." ,correct: false},
        ] 
    },
    {
        question: "Which one of the following describes why firewalls are used?",
        ans : [
            {text: "To prevent unauthorised access by incoming transmissions." ,correct: false},
            {text: "To prevent destruction of a computer in the event of a fire." ,correct: true},
            {text: "To enable easy downloading of data from web sites." ,correct: false},
            {text: "To detect and disable viruses already on a computer" ,correct: false},
        ] 
    },
];

const questionElement = document.getElementById("question")
const answerbuttons = document.getElementById("ans-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex]
    let diplayquestion = questions[currentQuestionIndex].question
    let questionNo = currentQuestionIndex+1
    questionElement.innerHTML=questionNo+"."+diplayquestion

    currentQuestion.ans.forEach(answer =>{
        const button = document.createElement("button")
        button.innerHTML = answer.text
        button.classList.add("btn")
        answerbuttons.appendChild(button)
        if (answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectedAnser);
    })

} 

function resetState(){
    nextButton.style.display = "none";
    while(answerbuttons.firstChild){
        answerbuttons.removeChild(answerbuttons.firstChild)
    }
}

function selectedAnser(e){
    const selectedbtn = e.target;
    const iscorrect = selectedbtn.dataset.correct === "true" ;
    if (iscorrect){
        selectedbtn.classList.add("correct")
        score++;
    }else{
        selectedbtn.classList.add("incorrect")
    }
    Array.from(answerbuttons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disable = "true";
    });
    nextButton.style.display = "block";
}

function showscore(){
    resetState();
    questionElement.innerHTML = "Your score is " + score;
}

function handelnextbutton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }else{
        showscore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handelnextbutton();
    }else{
        startQuiz();
    }
})

startQuiz();
