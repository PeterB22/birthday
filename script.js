let descriptionElement = null;
let additionElement = null;
let description = null;
let addition = null;

const makeConfetti = () => {
    var duration = 15 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function() {
    var timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
        return clearInterval(interval);
    }

    var particleCount = 30 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
};

const setupNotification = () => {
    window.alert(`Amely bárhol felhasználható, amíg a keret engedi. S nem kötelező egy összegben felhasználni ^^  

Ui: Itt mindig viszont láthatod a kupont, ha esetleg megfeledkeznél róla :)`);
}

const resetContent = () => {
    description = null;
    addition = null;
}

const updateCardWrappers = () => {
    const cardWrappers = document.querySelectorAll('.card-wrapper');
    cardWrappers.forEach(wrapperElement => {
        if (wrapperElement.classList.contains('default')) {
            wrapperElement.classList.add('read');
        } else {
            wrapperElement.classList.remove('surprise');
            wrapperElement.classList.add('gift');
            setTimeout(() => {
                setupNotification();
            }, 10000)
            makeConfetti();
        }
    })
}

const onNext = () => {
    if (getTextRead() === '0') {
        localStorage.setItem('textRead', 1);
        resetContent();
        updateCardWrappers();
    } else {
        updateCardWrappers();
    }
}

const getTextRead = () => {
    return localStorage.getItem('textRead');
}

const setup = () => {
    if (getTextRead() !== '1') {
        localStorage.setItem('textRead', 0);
        description = `<p>Ez a nap olyan, mint egy délutáni Mónika Show 2004-ből:</p>
                <p>még nincs okostelefon, csak csörgős Nokia.
                Az MSN fel-le jelentkezik,
                és mindenki tudja,hogy "most ő beszél.”</p>
                <p>Kívánom, hogy az új évedben: </p>
                <ul>
                <li>a problémák olyan gyorsan oldódjanak meg,
                mint amikor Mónika azt mondja: „jó, akkor menjünk tovább.”, vagy "ülj egy székkel arrébb!"</li>
                
                <li>a rosszindulat lepattanjon rólad,
                mint egy startlapos pop-up hirdetés</li>

                <li>és a jó dolgok maradjanak meg,
                mint a péntek délutáni TV2-s blokk a suliból hazafelé</li>
                </ul>`;
        addition = `<p>Maradj ilyen vidám, önazonos, kedves és szerethető,
mert „látszik, hogy egyértelműen jó ember vagy.” ❤️</p>
<p>Ha bármi vita lenne az életben, csak mosolyogj,
és mondd: „szeretném, ha kulturált körülmények között beszélnénk.”</p>
                <p>Ma nincs dráma, nincs reklamáció,
csak torta, nevetés és egy közös döntés:
„EZ ÍGY VAN JÓL.” 🎉🥂 </p>`;

        descriptionElement = document.querySelector('.description');
        additionElement = document.querySelector('.addition');
        descriptionElement.innerHTML = description;
        additionElement.innerHTML = addition;
        
    } else {
        resetContent();
    }
}

setup();
// https://raw.githubusercontent.com/<USER>/<REPO>/<BRANCH>/<PATH_TO_FILE>
const url = `https://raw.githubusercontent.com/peterb22/birthday/master/config.json?ts=${Date.now()}`;
fetch(`${url}`, {
    cache: 'no-store',
}).then(response => response.json()).then(config => {
    let priceElement = document.querySelector('.price');
    priceElement.textContent = `${config.price} Ft`;
}); 