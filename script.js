let descriptionElement = null;
let additionElement = null;
let description = null;
let addition = null;

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
        description = `Ma hivatalosan is közelebb kerültél ahhoz, hogy a torta gyertyáit már ne csak elfújd, hanem kiszámold, mennyi oxigént égetsz el vele. 😄
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











fetch('config.json').then(response => response.json()).then(config => {
    let priceElement = document.querySelector('.price');
    priceElement.textContent = `${config.price} Ft értékben`;
}); 