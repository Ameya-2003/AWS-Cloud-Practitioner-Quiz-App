//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

//Questions and Options array

const quizArray = [
    {
        id: "0",
        question: "AWS allows users to manage their resources using a web based user interface. What is the name of this interface?",
        options: ["AWS CLI", "AWS API", "AWS Management Console", "AWS SDk"],
        correct: "AWS Management Console",
    },
    {
        id: "1",
        question: "Which of the following is an example of horizontal scaling in the AWS Cloud?",
        options: ["Replacing an existing EC2 instance with a larger, more powerful one.", "Increasing the compute capacity of a single EC2 instance to address the growing demands of an application.", "Adding more RAM capacity to an EC2 instance.", "Adding more EC2 instances of the same size to handle an increase in traffic."],
        correct: "Adding more EC2 instances of the same size to handle an increase in traffic.",
    },
    {
        id: "2",
        question: "You have noticed that several critical Amazon EC2 instances have been terminated. Which of the following AWS services would help you determine who took this action?",
        options: ["Amazon Inspector.", "AWS CloudTrail.", "AWS Trusted Advisor.", "EC2 Instance Usage Report."],
        correct: "AWS CloudTrail.",
    },
    {
        id: "3",
        question: "Which statement is true regarding the AWS Shared Responsibility Model?",
        options: ["Responsibilities vary depending on the services used.", "Security of the IaaS services is the responsibility of AWS.", "Patching the guest OS is always the responsibility of AWS.", "Security of the managed services is the responsibility of the customer."],
        correct: "Responsibilities vary depending on the services used.",
    },
    {
        id: "4",
        question: "You have set up consolidated billing for several AWS accounts. One of the accounts has purchased a number of reserved instances for 3 years. Which of the following is true regarding this scenario?",
        options: ["The Reserved Instance discounts can only be shared with the master account.", "All accounts can receive the hourly cost benefit of the Reserved Instances.", "The purchased instances will have better performance than On-demand instances.", "There are no cost benefits from using consolidated billing; It is for informational purposes only."],
        correct: "All accounts can receive the hourly cost benefit of the Reserved Instances.",
    },
    {
        id: "5",
        question: "A company has developed an eCommerce web application in AWS. What should they do to ensure that the application has the highest level of availability?",
        options: ["Deploy the application across multiple Availability Zones and Edge locations.", "Deploy the application across multiple Availability Zones and subnets.", "Deploy the application across multiple Regions and Availability Zones.", "Deploy the application across multiple VPC’s and subnets."],
        correct: "Deploy the application across multiple Regions and Availability Zones.",
    }, {
        id: "6",
        question: "A company has an AWS Enterprise Support plan. They want quick and efficient guidance with their billing and account inquiries. Which of the following should the company use?",
        options: ["AWS Health Dashboard.", "AWS Support Concierge.", "AWS Customer Service.", "AWS Operations Support."],
        correct: "AWS Support Concierge.",
    },
    {
        id: "7",
        question: "A Japanese company hosts their applications on Amazon EC2 instances in the Tokyo Region. The company has opened new branches in the United States, and the US users are complaining of high latency. What can the company do to reduce latency for the users in the US while minimizing costs?",
        options: ["Applying the Amazon Connect latency-based routing policy.", "Registering a new US domain name to serve the users in the US.", "Building a new data center in the US and implementing a hybrid model.", "Deploying new Amazon EC2 instances in a Region located in the US."],
        correct: "Deploying new Amazon EC2 instances in a Region located in the US.",
    },
    {
        id: "8",
        question: "An organization has a large number of technical employees who operate their AWS Cloud infrastructure. What does AWS provide to help organize them into teams and then assign the appropriate permissions for each team?",
        options: ["IAM roles.", "IAM users.", "IAM user groups.", "AWS Organizations."],
        correct: "IAM user groups.",
    },
    {
        id: "9",
        question: "A company has decided to migrate its Oracle database to AWS. Which AWS service can help achieve this without negatively impacting the functionality of the source database?",
        options: ["AWS OpsWorks.", "AWS Database Migration Service.", "AWS Server Migration Service.", "AWS Application Discovery Service."],
        correct: "AWS Database Migration Service.",
    },
];

//Restart Quiz
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        //increment questionCount
        questionCount += 1;
        //if last question
        if (questionCount == quizArray.length) {
            //hide question container and display score
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            //user score
            userScore.innerHTML =
                "Your score is " + scoreCount + " out of " + questionCount;
                
        } else {
            //display questionCount
            countOfQuestion.innerHTML =
                questionCount + 1 + " of " + quizArray.length + " Question";
            //display quiz
            quizDisplay(questionCount);
            count = 46;
            clearInterval(countdown);
            timerDisplay();
        }

       
    })
);

//Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    //Hide other cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    //display current question card
    quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
    //randomly sort questions
    quizArray.sort(() => Math.random() - 0.5);
    //generate quiz
    for (let i of quizArray) {
        //randomly sort options
        i.options.sort(() => Math.random() - 0.5);
        //quiz card creation
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        //question number
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        //question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        //options
        div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
        quizContainer.appendChild(div);
    }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    //if user clicked answer == correct option stored in object
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        //For marking the correct option
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }

    //clear interval(stop timer)
    clearInterval(countdown);
    //disable all options
    options.forEach((element) => {
        element.disabled = true;
    });
}

//initial setup
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 46;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

//hide quiz and display start screen
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};
