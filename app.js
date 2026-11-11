const questions = [
    {
        text:"How do you usually travel to school/college/work ?",
        options : [
            { text: "Car", points: 10, stamp: "PENDING: Carbon Footprint Detected."},
            { text: "Public Transit", points:5, stamp:"PENDING: Moderate Footprint Detected."},
            { text:"Walk / Bicycle", points: 0, stamp:"APPROVED: Green Commuter Stamp Unlocked!!!!"}
        ]
    },
    {
        text:"What does your typical daily meal plan look like ?",
        options: [
            {text:"Heavy on meat / fast food", points:10, stamp: "PENDING: High Food Carbon Tracked."},
            {text:"Mix of meat and vegetables", points:5, stamp: "PENDING: Average Food Carbon Tracked."},
            {text:"Mostly plant-based / vegan", points:1, stamp: "APPROVED: Greeen Eater Stamp Unlocked!!"}
        ]
    }
];


let currentQuestionIndex = 0;
let totalScore = 0;

const questionText = document.getElementById("question-txt");
const optionsBox = document.getElementById("options-box");
const scoreDisply = document.getElementById("score-display");
const stampStatus = document.getElementById("stamp-status");
const quizSection = document.getElementById("quiz-section");
const stampsLogBox = document.getElementById("stamps-log-box")

function loadQuestion() {
    optionsBox.innerHTML = "";

    if (currentQuestion >= questions.length) {
        questionText.textContent = "Passport Clearance Complete!! All the checks processed. "
    }
    let currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.text;

    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.className = "quiz-btn";
        button.textContent = option.text;
        button.addEventListener("click", () => {
            handleAnswer(
                option.points,
                "Stamp-processed",
                "OFFICIAL CLEARANCE",
                option.stamp
            );
        });
        optionsBox.appendChild(button);
    });
}

function handleAnswer(points,questionAsked,answerChosen,stampClass,stampTitle,stampMsg) {
    totalScore += points;
    scoreDisply.textContent = totalScore ;

    const stampWrapper = document.createElement("div");
    stampWrapper.className = `vintage-stamp-card ${stampClass}`;


    stampWrapper.innerHTML = `
        <div class="stamp-ink-circle">
            <div class="stamp-inner-text">
                 <div class="stamp-hdr">${stampTitle}</div>
                 <div class="stamp-val">${points} PTS</div>
                 <div class="stamp-ftr">${stampMsg}</div>
            </div>
        </div>
        <div class="stamp-history-details">
           <strong>Check:</strong>${questionAsked}<br>
           <strong>Declared:</strong><span class="hightlight-text">${answerChosen}</span>
        </div> 
    `;

    stampsLogBox.appendChild(stampWrapper);

    currentQuestionIndex++;
    loadQuestion();

}


loadQuestion();