const players = [];

let totalBet = 0;

$(document).ready(() => {

    let countDown = 5;

    totalBet = 0;
    let interval = setInterval(() => {

        $("#d1").text(countDown);
        countDown--;

        let randomNumber = Math.floor(Math.random() * 5) + 1;
        for (let n = 0; n < randomNumber; n++) {
            let bet = generateBet();
            let randomPlayer = generateUsername();
            let isExist = false;
            for (let n = 0; n < players.length; n++) {
                if (players[n].names == randomPlayer) {
                    isExist = true;
                    break;
                }
            }

            if (!isExist) {
                players.push({
                    names: randomPlayer,
                    bets: bet
                });

                totalBet += bet;
                $("#users").append(
                    "<div class='row my-3' id='" + randomPlayer + "'>" +
                    "<div class='col'>@" + randomPlayer + "</div><div class='col text-end fw-bold'>$" + bet + "</div>" +
                    "</div>"
                );
            }



        }

        $("#totalBet").text("$" + totalBet.toFixed(2));

        if (countDown < 0) {
            clearInterval(interval);
            launching();
        }
    }, 1000);



});

function generateUsername() {
    let usernamePool = [
        'gault514', 'andris803', 'reduction490', 'engendurore', 'comermactor', 'Picaresque', 'TommyGun', 'MusicMiss', 'PandoraBox', 'Incandescent',
        'vizard885', 'pucker555', 'attitudinize262', 'fachanan28', 'weis466', 'anisaanise49', 'despoliation347', 'catarina332', 'elisavetpol148', 'magnuson724',
        'folkways636', 'extrapolate914', 'joust507', 'acciaccatura949', 'superable563', 'scolecite610', 'mikaela288', 'prelusive296', 'gord79', 'rive251',
        'pluvial4', 'informed443', 'longhair448', 'prospector105', 'compensation965', 'fourhanded201', 'jelly250', 'disparate174', 'pictograph136', 'thibaut238'
    ];
    let index = Math.floor(Math.random() * 10);
    return usernamePool[index];
}

function generateBet() {
    return parseFloat(((Math.random() * 1000) + 100).toFixed(2));
}

function launching() {
    let altitude = 0.00;
    let stopNumber = (Math.random() * 10) + 1;
    let quitNumber = Math.floor(Math.random() * players.length) + 1;

    let quitPoint = [];
    let quitPlayer = [];

    for (let n = 0; n < quitNumber; n++) {
        let random = Math.floor(Math.random() * players.length) + 1;
        if (!quitPlayer.includes(random)) {
            quitPlayer.push(random);
        }
    }

    for (let n = 0; n < quitPlayer.length; n++) {
        quitPoint.push((Math.random() * stopNumber + 1).toFixed(2));
    }

    function sortFloat(a, b) {
        return a - b;
    }

    quitPoint.sort(sortFloat);
    quitPlayer.sort();

    console.log(quitPoint);

    //$("#explode").text(stopNumber);
    let totalPaysOut = 0.00;
    let interval = setInterval(() => {
        $("#altitude").text(altitude.toFixed(2) + "x");
        altitude += 0.01;

        for (let n = 0; n < quitPoint.length; n++) {
            if (quitPoint.includes(altitude.toFixed(2))) {
                let point = quitPoint.shift();
                let quitIndex = quitPlayer.shift();
                // console.log(`Player ${players[quitIndex].names} quit at ${point}`);
                // console.log("Remaining qpoint: " + quitPoint);
                // console.log("Remaining qplayer: " + quitPlayer);
                let pl = parseFloat(((players[quitIndex].bets) * point).toFixed(2));
                totalPaysOut += pl;
                $("#" + players[quitIndex].names).css("background-color", "yellow");
                $("#" + players[quitIndex].names).append("<div class='col'>x" + point + "= $" + pl + "</div>");
            }
        }


        if (altitude >= stopNumber) {
            clearInterval(interval);
            let pl = parseFloat(totalBet) - parseFloat(totalPaysOut);
            $("#explodeLabel").append("<h1 class='text-danger'>Explode</h1>");
            $("#paysOut").append("<h1 class='text-danger'>Payout: " + totalPaysOut.toFixed(2) + "</h1>");
            $("#paysIn").append("<h1 class='text-primary'>House Receive: " + pl.toFixed(2) + "</h1>");
        }
    }, 10);


}

