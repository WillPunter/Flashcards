// get card div
var card = document.getElementById("card");
var cards = [];
var cardIndex = 0;
var cardSide = 0;

// get query string values
function getQSValues() {
    // get query string, removing the = sign
    let qs = window.location.search.substring(1);

    // split qs on all & signs
    let assignments = qs.split("&");

    for (let i = 0; i < assignments.length; i++) {
        assignments[i] = assignments[i].split("=");
    }

    return assignments;
}

// prev card
function prevCard() {
    if (cardIndex > 0) {
        cardIndex = cardIndex - 1;
        cardSide = 0;
        displayCard();
    }
}

// flip card
function flipCard() {
    cardSide = (cardSide + 1) % 2;
    displayCard();
}

// next card
function nextCard() {
    if (cardIndex < cards.cards.length - 1) {
        cardIndex = cardIndex + 1;
        cardSide = 0;
        displayCard();
    }
}

// display card
function displayCard() {
    let cardsHTML = "";
    
    if (!cards) {
        cardsHTML = "<h1 style=\"color: red\">Error - could not load cards.</h1>";
    } else {
        cardsHTML += "<h2>" + cards.title + " (" + (cardIndex + 1) + " / " + cards.cards.length + ")" + "</h2>";

        if (cardSide == 0) {
            // front
            cardsHTML += "<h3>" + cards.cards[cardIndex].title + " - Front</h3>";

            cardsHTML += "<p>" + cards.cards[cardIndex].frontText + "</p>";
        
            if (cards.cards[cardIndex].frontImg != "") {
              cardsHTML += "<img src=\"" + cards.cards[cardIndex].frontImg + "\">";
            }
        } else {
            //back
            cardsHTML += "<h3>" + cards.cards[cardIndex].title + " - Back</h3>";

            cardsHTML += "<p>" + cards.cards[cardIndex].backText + "</p>";
        
            if (cards.cards[cardIndex].backImg != "") {
              cardsHTML += "<img src=\"" + cards.cards[cardIndex].backImg + "\">";
            }
        }

        cardsHTML += "<button onclick=\"prevCard()\">Previous card</button>";
        cardsHTML += "<button onclick=\"flipCard()\">Flip card</button>";
        cardsHTML += "<button onclick=\"nextCard()\">Next card</button>";
    }

    card.innerHTML = cardsHTML;

    // reset mathjax
    window.setTimeOut(MathJax.typeset, 1000);
}

// load cards
function loadCards() {
    let qsValues = getQSValues();

    let qsSrc = "";

    for (let i = 0; i < qsValues.length; i++) {
        if (qsValues[i][0] == "src") {
            qsSrc = qsValues[i][1];
        }
    }

    // attempt to read data
    fetch("./cards/" + qsSrc + ".json").then(response => {
        if (!response.ok) {
            alert("Failed to read card set: " + qsSrc);
        } else {
            return response.json();
        }
    }).then(data => {
        cards = data;
        displayCard();
    })
}

loadCards();