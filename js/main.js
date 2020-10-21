'use strict';

const TITLES = ["заголовок предложения","заголовок предложения1", "заголовок предложения2", "заголовок предложения3"];
const TYPE_PLACES = ["palace", "flat", "house", "bungalow"];
const CHECKIN_TIMES = ["13:00","14:00","15:00"];
const CHECKOUT_TIMES = ["13:00","14:00","15:00"];
const FEATURES = ["wify", "dishwasher", "parking", "washer", "elevator", "conditioner"];
const DESCRIPTIONS = ["Desc1","Desc2", "Desc3", "Desc4"];

const MAP_NODE = document.querySelector('.map');
const MAX_WIDTH_MAP = MAP_NODE.offsetWidth;

const COUNT_PINS = 8;

const getRandomNumberByRange = function (start, end) {
    const rand = start + Math.random() * (end + 1 - start);
    return Math.floor(rand);
};

const getRandomItemFromArray = function (array) {
    const maxValue = array.length - 1;
    const randomIndex = getRandomNumberByRange(0, maxValue);
    return array[randomIndex];
};

const getAppartmentData = function () {
    return {
        "author": {
            "avatar": `img/avatars/user0${getRandomNumberByRange(1, 8)}.png`,
        },
        "offer": {
            "title": getRandomItemFromArray(TITLES),
            "address": `${getRandomNumberByRange(1, MAX_WIDTH_MAP)}, ${getRandomNumberByRange(130, 630)}`,
            "price": getRandomNumberByRange(100, 1500),
            "type": getRandomItemFromArray(TYPE_PLACES),
            "rooms": getRandomNumberByRange(1, 8),
            "guests": getRandomNumberByRange(1, 15),
            "checkin": getRandomItemFromArray(CHECKIN_TIMES),
            "checkout": getRandomItemFromArray(CHECKOUT_TIMES),
            "features": getRandomItemFromArray(FEATURES),
            "description": getRandomItemFromArray(DESCRIPTIONS),
            "photos": `http://o0.github.io/assets/images/tokyo/hotel${getRandomNumberByRange(1, 3)}.jpg`
        },
        "location": {
            "x": getRandomNumberByRange(1, MAX_WIDTH_MAP),
            "y": getRandomNumberByRange(130, 630),
        }
    }
};

const renderPin = function (pinData) {
    const fragment = document.createDocumentFragment();
    const template = document.querySelector('#pin');
    const cloneMark = template.content.cloneNode(true);
    const button = cloneMark.querySelector("button");
    const img = cloneMark.querySelector("img");

    const PIN_HEIGHT = 70;
    const PIN_WIDHT = 50;
    button.style.top = `${pinData.location.y - PIN_HEIGHT}px`;
    button.style.left = `${pinData.location.x - PIN_WIDHT/2}px`;
    img.setAttribute("src", pinData.author.avatar);
    img.setAttribute("alt", pinData.offer.title);
    fragment.appendChild(cloneMark);
    document.querySelector(".map__pins").appendChild(fragment);
};

const getPinsData = function () {
    const pinsDataArray = [];
    for(let i = 0; i < COUNT_PINS; i++) {
        pinsDataArray.push(getAppartmentData());
    };
    return pinsDataArray;
};

MAP_NODE.classList.remove('.map--faded');

const pinsData = getPinsData();

pinsData.forEach(function (pinData) {
    renderPin(pinData);
});
