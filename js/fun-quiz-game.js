const playFunQuizGame = () => {
    window.location.replace("funquizgame.html");
};

const goToIndex = () => {
    window.location.replace("index.html");
};

const changeElementVisibility = (element, visibilityState) => { // Changer l'état de visibilité d'un élement
    element.style.visibility = visibilityState;
};

let index = 0; // index pour récupérer la premiere question de l'api

// Afficher la question suivant l'indice courant
const displayQuestion = (i) => {
    i = index; // Assignation de la variable index au parametre i de la fonction
    // Récuperation des données de l'api
    fetch('https://mtn-gaming.herokuapp.com/funquizgamequestionlist')
        .then(response => response.json())
        .then(data => {
            if (i <= data.length - 1) {
                document.getElementById("reference-question").textContent = `Question N°${data[i].id}`;
                document.getElementById("question").innerHTML = `${data[i].question_fr}<br>
                ${data[i].question_en}`;

                document.getElementById("option1").innerHTML = `<span style='width: 50px; height: 30px; border-radius: 8px; font-size: 24px; float: left; background-color: white; color: black'>A</span> ${data[i].options[0]}`;
                document.getElementById("option2").innerHTML = `<span style='width: 50px; height: 30px; border-radius: 8px; font-size: 24px; float: left; background-color: white; color: black'>B</span> ${data[i].options[1]}`;
                document.getElementById("option3").innerHTML = `<span style='width: 50px; height: 30px; border-radius: 8px; font-size: 24px; float: left; background-color: white; color: black'>C</span> ${data[i].options[2]}`;
                document.getElementById("option4").innerHTML = `<span style='width: 50px; height: 30px; border-radius: 8px; font-size: 24px; float: left; background-color: white; color: black'>D</span> ${data[i].options[3]}`;
                document.getElementById("answer-text").textContent = `La bonne réponse est: ${data[i].response}`;
            } else {
                document.getElementById("aside-container").style.visibility = "hidden";
                document.getElementById("reference-question").textContent = "A la prochaine session !";
                document.getElementById("question").textContent = `FUN BRAIN GAMES est terminé pour la session d'aujourd'hui...!<br>
                A la semaine prochaine pour de nouvelles questions !!!`;
                document.getElementById("list-of-options").style.visibility = "hidden";
                document.getElementById("next").textContent = "Retour";
                document.getElementById("next").setAttribute("onclick", "displayMenu()");
            }
        })
        .catch(error => console.log(error));
};

const displayChrono = () => {
    const FULL_DASH_ARRAY = 283;
    const WARNING_THRESHOLD = 15;
    const ALERT_THRESHOLD = 5;
    const COLOR_CODES = {
        info: {
            color: "green"
        },
        warning: {
            color: "orange",
            threshold: WARNING_THRESHOLD
        },
        alert: {
            color: "red",
            threshold: ALERT_THRESHOLD
        }
    };

    let timeLimit = 20;
    let timePassed = 0;
    let timeLeft = timeLimit;
    let timerInterval = null;
    let remainingPathColor = COLOR_CODES.info.color;

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;

        if (seconds < 10) {
            seconds = `0${seconds}`;
        }

        return `${minutes}:${seconds}`;
    };

    document.getElementById("chrono").innerHTML = `<div class="base-timer">
                            <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                <g class="base-timer__circle">
                                    <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
                                    <path
                                        id="base-timer-path-remaining"
                                        stroke-dasharray="283"
                                        class="base-timer__path-remaining ${remainingPathColor}"
                                        d="
                                        M 50, 50
                                        m -45, 0
                                        a 45,45 0 1,0 90,0
                                        a 45,45 0 1,0 -90,0
                                        "
                                    ></path>
                                </g>
                            </svg>
                            <span id="base-timer-label" class="base-timer__label">${formatTime(timeLeft)}</span>
                        </div>`;

    const calculateTimeFraction = () => {
        const rawTimeFraction = timeLeft / timeLimit;
        return rawTimeFraction - (1 / timeLimit) * (1 - rawTimeFraction);
    };

    const setCircleDasharray = () => {
        const circleDasharray = `${(
            calculateTimeFraction() * FULL_DASH_ARRAY
        ).toFixed(0)} 283`;
        document.getElementById("base-timer-path-remaining").setAttribute("stroke-dasharray", circleDasharray);
    };

    const onTimesUp = () => {
        clearInterval(timerInterval);
    };

    const setRemainingPathColor = (timeLeft) => {
        const { alert, warning, info } = COLOR_CODES;
        if (timeLeft <= alert.threshold) {
            document
                .getElementById("base-timer-path-remaining")
                .classList.remove(warning.color);
            document
                .getElementById("base-timer-path-remaining")
                .classList.add(alert.color);
        } else if (timeLeft <= warning.threshold) {
            document
                .getElementById("base-timer-path-remaining")
                .classList.remove(info.color);
            document
                .getElementById("base-timer-path-remaining")
                .classList.add(warning.color);
        }
    };

    timerInterval = setInterval(() => {
        timePassed = timePassed += 1;
        timeLeft = timeLimit - timePassed;
        document.getElementById("base-timer-label").innerHTML = formatTime(timeLeft);
        setCircleDasharray();
        setRemainingPathColor(timeLeft);

        if (timeLeft === 0) {
            document.getElementById("chrono-sound").src = "";
            onTimesUp();
            changeElementVisibility(document.getElementById("timeover-message"), "visible");
            changeElementVisibility(document.getElementById("answer-button"), "visible");
        }
    }, 1000);

    document.getElementById("chrono-sound").src = "../assets/audios/chrono.mp3";
};

const loadPage = () => {
    displayQuestion(index);
    setTimeout(() => {
        displayChrono();
    }, 4000);
    changeElementVisibility(document.getElementById("answer-container"), "hidden");
    changeElementVisibility(document.getElementById("answer-text"), "hidden");
};

window.addEventListener("load", () => { // Déclencher un évenement à la fin du chargement de la page
    loadPage();
});

function choose(element) {
    checkAnswer(element);
    notClickAble();
}

function checkAnswer(element) {
    let textElement = element.textContent;
    if (textElement.substring(1) === data[i].response) {
        //applauseAudio.play();
        //this.score += questionList[this.index].nombreDePoint;
        element.className = "correct";
        element.innerHTML = "Bonne réponse !";
        //this.scoreCard();
    }
    else {
        //wrongAudio.play();
        element.className = "wrong";
        element.innerHTML = "Mauvaise réponse !";
        changeElementVisibility(document.getElementById("#answer-button"), "visible");
    }
}

function notClickAble() {
    for (let i = 0; i < ul.children.length; i++) {
        ul.children[i].style.pointerEvents = "none";
    }
}

function clickAble() {
    for (let i = 0; i < ul.children.length; i++) {
        ul.children[i].style.pointerEvents = "auto";
        ul.children[i].className = '';
    }
}

const next = () => { // Action a effectué au clique sur le bouton Suivant
    index++; // on incremente la variable pour afficher la question suivante
    loadPage();
    changeElementVisibility(document.getElementById('answer-button'), "hidden");
    changeElementVisibility(document.getElementById("timeover-message"), "hidden");
    document.getElementById("chrono").innerHTML = "";
};

const displayMenu = () => { // Retourner au menu d'accueil
    window.location.replace("games.html");
};

const displayAnswer = () => {
    changeElementVisibility(document.getElementById("answer-container"), "visible");
    changeElementVisibility(document.getElementById("answer-text"), "visible");
};