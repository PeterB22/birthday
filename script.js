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

    var particleCount = 50 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
};

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
            makeConfetti();
        }
    })
}

const onNext = () => {
    if (getTextRead() === '0') {
        localStorage.setItem('textRead', 1);
        resetContent();
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
        description = `Már hivatalosan is közelebb kerültél ahhoz, hogy a torta gyertyáit már ne csak elfújd, hanem kiszámold, mennyi oxigént égetsz el vele. 😄
                Remélem, hogy az év minden napján annyi nevetésed lesz, hogy az izmaid is edzésben maradjanak – végre van értelme a konditeremnek!`;
        addition = `Ne feledd: az élet túl rövid ahhoz, hogy komoly legyél… szóval egyél sokat, nevess még többet, és ha lehet, ne vedd túl komolyan a korodat – a számok csak a statisztikának kellenek, a bulinak nem.
                Legyen ez az év tele meglepetésekkel, amiket utólag is jó poénként mesélhetsz, és emlékezz: az igazi szülinapi ajándék az, ha mások nevetnek a történeteiden – szóval gyakorolj bőven! 🥳`;

        descriptionElement = document.querySelector('.description');
        additionElement = document.querySelector('.addition');
        descriptionElement.textContent = description;
        additionElement.textContent = addition;
        
    } else {
        resetContent();
    }
}

setup();


fetch(`config.json?ts=${Date.now()}`, {
    cache: 'no-cache',
    headers: {
        'Cache-Control': 'no-cache'
    }
}).then(response => response.json()).then(config => {
    let priceElement = document.querySelector('.price');
    priceElement.textContent = `${config.price} Ft`;
}); 