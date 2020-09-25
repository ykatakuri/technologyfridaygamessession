function playMotLePlusLong() {
    window.location.replace("motlepluslong.html");
}

function goToIndex() {
    window.location.replace("index.html");
}

function changeElementVisibility(element, visibilityState) {
    element.style.visibility = visibilityState;
}

let index = 0;
let indicationQuestion = document.getElementById("indication-question");
indicationQuestion.textContent = "";
let letterDrawerContainer = document.getElementById("letter-drawer");

function displayQuestion(i) {
    i = index;
    fetch('https://mtn-gaming.herokuapp.com/theLongestWord')
        .then(response => response.json())
        .then(data => {
            if (i <= 9) {
                document.getElementById("reference-question").textContent = `Question N°${data[i].id}`;
                indicationQuestion.innerHTML = `${data[i].indice_fr}<br/>(${data[i].indice_en})`;

                letterDrawerContainer.innerHTML = "";

                for (const letter of data[i].draw) {
                    const aLetterContainer = document.createElement("div");
                    aLetterContainer.classList.add("letter-container");
                    aLetterContainer.textContent = letter;
                    letterDrawerContainer.appendChild(aLetterContainer);
                }

                document.getElementById("answer-text").textContent = data[i].response;
            } else if (i === 10) {
                document.getElementById("chrono").innerHTML = "";
                changeElementVisibility(document.getElementById("video"), "visible");
                document.getElementById("reference-question").innerHTML = "";
                document.getElementById("indication-question").style.display = "none";
                document.getElementById("letter-drawer").style.display = "none";
                changeElementVisibility(document.getElementById("answer-button"), "hidden");
                changeElementVisibility(document.getElementById("aside-container"), "hidden");
                changeElementVisibility(document.getElementById("timeover-message"), "hidden");
            } else if (i >= 11 && i <= 20) {
                letterDrawerContainer.innerHTML = "";
                document.getElementById("indication-question").style.display = "block";
                document.getElementById("letter-drawer").style.display = "flex";
                changeElementVisibility(document.getElementById("video"), "hidden");
                document.getElementById("video").src = "";
                document.getElementById("reference-question").textContent = `Question N°${data[i].id}`;
                for (const letter of data[i].draw) {
                    const aLetterContainer = document.createElement("div");
                    aLetterContainer.classList.add("letter-container");
                    aLetterContainer.textContent = letter;
                    letterDrawerContainer.appendChild(aLetterContainer);
                }
                document.getElementById("answer-text").textContent = `La bonne réponse est: ${data[i].response}`;
                changeElementVisibility(document.getElementById("aside-container"), "visible");
            } else {
                document.getElementById("chrono").innerHTML = "";
                changeElementVisibility(document.getElementById("video"), "visible");
                document.getElementById("video").setAttribute("poster", "./assets/images/home-page-bg.jpg");
                document.getElementById("video").src = "./assets/videos/magic-system.webm";
                document.getElementById("reference-question").innerHTML = "";
                document.getElementById("indication-question").style.display = "none";
                document.getElementById("letter-drawer").style.display = "none";
                document.getElementById("button-next").textContent = "Retour";
                document.getElementById("button-next").setAttribute("onclick", "displayMenu()");
            }
        })
        .catch(error => console.log(error));
}

function displayChrono() {
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

    let timeLimit = 30;
    let timePassed = 0;
    let timeLeft = timeLimit;
    let timerInterval = null;
    let remainingPathColor = COLOR_CODES.info.color;

    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;

        if (seconds < 10) {
            seconds = `0${seconds}`;
        }

        return `${minutes}:${seconds}`;
    }

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

    function calculateTimeFraction() {
        let rawTimeFraction = timeLeft / timeLimit;
        return rawTimeFraction - (1 / timeLimit) * (1 - rawTimeFraction);
    }

    function setCircleDasharray() {
        let circleDasharray = `${(
            calculateTimeFraction() * FULL_DASH_ARRAY
        ).toFixed(0)} 283`;
        document.getElementById("base-timer-path-remaining").setAttribute("stroke-dasharray", circleDasharray);
    }

    function onTimesUp() {
        clearInterval(timerInterval);
    }

    function setRemainingPathColor(timeLeft) {
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
    }

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
};

function loadPage() {
    displayQuestion(index);
    if (index === 10 || index > 20) {
        document.getElementById("chrono-sound").src = "";
        changeElementVisibility(document.getElementById("answer-button"), "hidden");
        changeElementVisibility(document.getElementById("aside-container"), "hidden");
        changeElementVisibility(document.getElementById("timeover-message"), "hidden");
    } else {
        setTimeout(() => {
            displayChrono();
            document.getElementById("chrono-sound").src = "./assets/audios/chrono.mp3";
        }, 6000);
    }
    changeElementVisibility(document.getElementById("answer-container"), "hidden");
    changeElementVisibility(document.getElementById("answer-text"), "hidden");
}

loadPage();

function next() {
    index++;
    loadPage();
    changeElementVisibility(document.getElementById("timeover-message"), "hidden");
    changeElementVisibility(document.getElementById('answer-button'), "hidden");
    document.getElementById("chrono").innerHTML = "";
}

function displayMenu() {
    window.location.replace("games.html");
}

function displayAnswer() {
    changeElementVisibility(document.getElementById("answer-container"), "visible");
    changeElementVisibility(document.getElementById("answer-text"), "visible");
}