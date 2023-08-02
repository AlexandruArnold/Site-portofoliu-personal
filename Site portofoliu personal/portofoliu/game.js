var dealerSum = 0;
var yourSum = 0;

var dealerAceCount = 0;
var yourAceCount = 0; 

var hidden;
var deck;

var canHit = true; // perminte player-ului sa mai traga o carte <= 21

window.onload = function() {   //evenimentul deschiderii aplicatiei avand 3 functii definite mai jos
    buildDeck();
    shuffleDeck();
    startGame();
}

function buildDeck() {          //creaza perechile de carti
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"];
    deck = [];

    for (let i = 0; i < types.length; i++) {   //incepem cu Cupa si se iau toate de la A la K etc
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + "-" + types[i]); //A-C -> K-C, A-D -> K-D    PUSH e metoda prin care adauga un element la array(DECK)
        }
    }
    // console.log(deck);
}

function shuffleDeck() {                //prin metoda random, se 'amesteca' valorile din deck
    for (let i = 0; i < deck.length; i++) {   //trece prin fiecare element din pachet prin FOR
        let j = Math.floor(Math.random() * deck.length); // (0-1) * 52 => (0-51.9999)
        let temp = deck[i];
        deck[i] = deck[j];               
        deck[j] = temp;
    }
    console.log(deck);
}

function startGame() {          //metoda pop() elimina ultimul element dintr-un array si adauga valoarea apelantului
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);     //aici formam cartile dealer ului
    // console.log(hidden);
    // console.log(dealerSum);
    while (dealerSum < 17) {     // am adaugat aceasta conditie ca dealerul sa nu aiba valoarea mai mica decat 17
        //<img src="./cards/4-C.png">
        let cardImg = document.createElement("img");
        let card = deck.pop();     // variabila card ia valoarea extrasa din deck
        cardImg.src = "./imagini/" + card + ".png";
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);
    }
    console.log(dealerSum);

    for (let i = 0; i < 2; i++) {           //aici cream cartile jucatorului, valoarea fiind stocata in variabila CARD
        let cardImg = document.createElement("img");
        let card = deck.pop(); 
        cardImg.src = "./imagini/" + card + ".png";
        yourSum += getValue(card);
        yourAceCount += checkAce(card);
        document.getElementById("your-cards").append(cardImg);
    }

    console.log(yourSum);
    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);

}

function hit() {
    if (!canHit) {
        return;
    }

    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./imagini/" + card + ".png";    // aici formam cartea din extragerea valorii CARD
    yourSum += getValue(card);
    yourAceCount += checkAce(card);
    document.getElementById("your-cards").append(cardImg);

    if (reduceAce(yourSum, yourAceCount) > 21) { //A, J, 8 -> 1 + 10 + 8
        canHit = false;
    }

}

function stay() {
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    yourSum = reduceAce(yourSum, yourAceCount);

    canHit = false;
    document.getElementById("hidden").src = "./imagini/" + hidden + ".png";  //cartea ascunsa se va afisa

    let message = "";
    if (yourSum > 21) {
        message = "You Lose!";
    }
    else if (dealerSum > 21) {
        message = "You win!";
    }
    //both you and dealer <= 21
    else if (yourSum == dealerSum) {
        message = "Egalitate!";
    }
    else if (yourSum > dealerSum) {
        message = "You Win!";
    }
    else if (yourSum < dealerSum) {
        message = "You Lose!";
    }

    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("your-sum").innerText = yourSum;
    document.getElementById("results").innerText = message;
}

function getValue(card) {
    let data = card.split("-"); // "4-C" -> ["4", "C"]
    let value = data[0];

    if (isNaN(value)) { //A J Q K  daca valoarea nu e numar. daca e as returneaza 11, la celelalte returneaza 10
        if (value == "A") {
            return 11;
        }
        return 10;
    }
    return parseInt(value);   // parseInt e o functie care converteste stringul in integer
}

function checkAce(card) {     // verifica daca primul caracter incepe cu A, atunci e true
    if (card[0] == "A") {
        return 1;
    }
    return 0;
}

function reduceAce(playerSum, playerAceCount) {       
    while (playerSum > 21 && playerAceCount > 0) {
        playerSum -= 10;
        playerAceCount -= 1;
    }
    return playerSum;
}