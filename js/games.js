function goToIndex() {
    window.location.replace("index.html");
}

function going() { // Action effectuer quand l'utilisateur clique sur le bouton continuer
    document.getElementById("intro-text").innerHTML = `<strong>Débuter une partie.</strong><br /><br />
    Cliquez sur la catégorie de votre choix pour débuter la partie. 
    Vous disposerai de <em><strong>20 secondes</strong></em> ou de <em><strong>30 secondes</strong></em> pour répondre à chacune des questions selon la catégorie choisie.`;

    let divMenusElt = document.createElement("div");
    divMenusElt.id = "list";
    divMenusElt.classList.add("option-container");
    document.getElementById("main-container").insertBefore(divMenusElt, document.getElementById("button-container")); // Ajout du div avant le conteneur des boutons

    let ulElt = document.createElement("ul");
    ulElt.id = "options";
    ulElt.innerHTML = ` <li id="funbraindesertgame" onclick="playFunBrainDesertGame()">FUN BRAIN TEASER GAME</li>
                        <li id="funquizgame" onclick="playFunQuizGame()">FUN QUIZ GAME</li>
                        <li id="funpicturegame" onclick="playFunPictureGame()">FUN PICTURE GAME</li>
                        <li id="funpicturegame" onclick="play4Images1Mot()">4 IMAGES 1 MOT</li>
                        <li id="enigmes" onclick="playEnigmes()">ENIGMES</li>
                        <li id="thelargestword" onclick="playMotLePlusLong()">MOT LE PLUS LONG</li>
                        <li id="guessthesong" onclick="playGuessTheSong()">GUESS THE SONG</li>
                        <li id="whoisit" onclick="playWhoIsIt()">WHO IS IT</li>
                    `;
    divMenusElt.appendChild(ulElt);

    document.getElementById("button-container").style.visibility = "hidden";
}

function playFunBrainDesertGame() {
    window.location.replace("funbraindesertgame.html");
}

function playFunQuizGame() {
    window.location.replace("funquizgame.html");
}

function playFunPictureGame() {
    window.location.replace("funpicturegame.html");
}

function play4Images1Mot() {
    window.location.replace("quatreimagesunmot.html");
}

function playEnigmes() {
    window.location.replace("enigmes.html");
}

function playMotLePlusLong() {
    window.location.replace("instructions.html");
}

function playGuessTheSong() {
    window.location.replace("guessthesong.html");
}

function playWhoIsIt() {
    window.location.replace("whoisit.html");
}