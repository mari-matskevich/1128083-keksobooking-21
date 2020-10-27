'use strict';

const TITLES = ["заголовок предложения","заголовок предложения1", "заголовок предложения2", "заголовок предложения3"];
const TYPE_PLACES = ["palace", "flat", "house", "bungalow"];
const CHECKIN_TIMES = ["13:00","14:00","15:00"];
const CHECKOUT_TIMES = ["13:00","14:00","15:00"];
const FEATURES = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
const DESCRIPTIONS = ["Desc1","Desc2", "Desc3", "Desc4"];

const MAP_NODE = document.querySelector('.map');
const MAX_WIDTH_MAP = MAP_NODE.offsetWidth;

const COUNT_PINS = 8;

const apartmentType = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalow: 'Бунгало'
};

const getRandomNumberByRange = function (start, end) {
    const rand = start + Math.random() * (end + 1 - start);
    return Math.floor(rand);
};

const getRandomItemFromArray = function (array) {
    const maxValue = array.length - 1;
    const randomIndex = getRandomNumberByRange(0, maxValue);
    return array[randomIndex];
};

const getRandomFeatures = function (array) {
    const randomNumOfFeatures = Math.floor(Math.random()*array.length);
    const randomized = array.sort(() => 0.5 - Math.random());

    return randomized.slice(0,randomNumOfFeatures);
}

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
            "features": getRandomFeatures(FEATURES),
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

const featureList = function(features, itemList)
{
    for(let i = 0; i < itemList.length; i++)
    {
        itemList[i].style.display = "none";
    }

   // показать только те элементы, которые доступны
    for(let i = 0; i < features.length; i ++)
    {
        for(let j = 0; j < itemList.length; j++)
        {
            if(itemList[j].classList.contains(`popup__feature--${features[i]}`))
            {

                itemList[j].style.display = "inline-block";
                break;
            }
        }
    }
}

const renderCard = function(cardData)
{
    const cardTemplate = document.querySelector('#card');
    const cloneTemple = cardTemplate.content.cloneNode(true);

    const avatarImage =  cloneTemple.querySelector(".popup__avatar");
    avatarImage.src = cardData.author.avatar;

    cloneTemple.querySelector(".popup__title").innerText = cardData.offer.title;
    cloneTemple.querySelector(".popup__text--address").innerText = cardData.offer.address;
    cloneTemple.querySelector(".popup__text--price").innerText = `${cardData.offer.price}₽/ночь`;
    cloneTemple.querySelector(".popup__type").innerText = apartmentType[cardData.offer.type];
    cloneTemple.querySelector(".popup__text--capacity").innerText = `${cardData.offer.rooms} комнаты для ${cardData.offer.guests} гостей`;
    cloneTemple.querySelector(".popup__text--time").innerText = `Заезд после ${cardData.offer.checkin}, выезд до ${cardData.offer.checkout}`;


   featureList(cardData.offer.features,cloneTemple.querySelector(".popup__features").getElementsByTagName("li"));
    console.log(cardData.offer.features);
    cloneTemple.querySelector(".popup__description").innerText = cardData.offer.description;

    const apartmentImage = cloneTemple.querySelector(".popup__photos");
    apartmentImage.querySelector("img").src = cardData.offer.photos;

    document.querySelector(".map").appendChild(cloneTemple);
}

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

renderCard(pinsData[0]);
