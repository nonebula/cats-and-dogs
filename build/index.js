"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const headline = document.getElementById("header");
const dogRefreshBtn = document.getElementById("dog-refresh");
const catRefreshBtn = document.getElementById("cat-refresh");
const getJoke = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch("https://icanhazdadjoke.com/", {
            headers: {
                Accept: "application/json",
                "User-Agent": "YourLibraryOrWebsiteName (https://yourwebsite.com)",
            },
        });
        if (response.ok) {
            const jokeData = yield response.json();
            const jokeText = jokeData.joke;
            const container = document.getElementById("banner");
            if (!container) {
                console.error("Container not found.");
                return;
            }
            container.textContent = "";
            container.append(jokeText);
        }
        else {
            throw new Error("Failed to fetch joke");
        }
    }
    catch (error) {
        console.error("Error fetching joke:", error);
    }
});
function fetchDog() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let dogImageUrl;
            do {
                const response = yield fetch("https://random.dog/woof.json");
                const dogImg = yield response.json();
                console.log(dogImg.url);
                dogImageUrl = dogImg.url;
            } while (!dogImageUrl.endsWith(".jpg") && !dogImageUrl.endsWith(".jpeg"));
            const dogImgElement = document.getElementById("dog-image");
            dogImgElement.src = dogImageUrl;
            dogImgElement.style.maxWidth = "500px";
            dogImgElement.style.maxHeight = "500px";
            dogImgElement.style.minWidth = "300px";
            dogImgElement.style.minHeight = "300px";
        }
        catch (error) {
            console.error("Error fetching dog image:", error);
        }
    });
}
function dogFacts() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("https://dogapi.dog/api/v2/facts");
            const dogFact = yield response.json();
            const container = document.getElementById("dog-fact-container");
            if (!container) {
                console.error("Container not found.");
                return;
            }
            container.textContent = "";
            const dogFactText = JSON.stringify(dogFact.data[0].attributes.body);
            container === null || container === void 0 ? void 0 : container.append(dogFactText);
        }
        catch (error) {
            console.error("Error fetching dog fact:", error);
        }
    });
}
const dogRefresh = () => {
    fetchDog();
    dogFacts();
};
dogRefreshBtn === null || dogRefreshBtn === void 0 ? void 0 : dogRefreshBtn.addEventListener("click", dogRefresh);
function fetchCat() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("https://api.thecatapi.com/v1/images/search");
            const catImg = yield response.json();
            const catImageUrl = catImg[0].url;
            const catImgElement = document.getElementById("cat-image");
            catImgElement.src = catImageUrl;
            catImgElement.style.maxWidth = "500px";
            catImgElement.style.maxHeight = "500px";
            catImgElement.style.minWidth = "300px";
            catImgElement.style.minHeight = "300px";
        }
        catch (error) {
            console.error("Error fetching cat image:", error);
        }
    });
}
function catFacts() {
    return __awaiter(this, void 0, void 0, function* () {
        const url = "https://random-cat-fact.p.rapidapi.com/";
        const options = {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": "aeef6d6de3mshfec18a533464299p1bb9f9jsnba5e698e206b",
                "X-RapidAPI-Host": "random-cat-fact.p.rapidapi.com",
            },
        };
        try {
            const response = yield fetch(url, options);
            const result = yield response.text();
            const container = document.getElementById("cat-fact-container");
            if (!container) {
                console.error("Container not found");
                return;
            }
            container.textContent = "";
            const parsedResult = JSON.parse(result);
            container.textContent = parsedResult.message;
            if (parsedResult.message ===
                "You have exceeded the rate limit per hour for your plan, BASIC, by the API provider") {
                container.textContent =
                    "The API has reached it's limit :(. Here's a fun fact! The phrase raining cats and dogs originated in 17th century England when it is believed that many cats and dogs drowned during heavy periods of rain.";
            }
            else {
                container.textContent = parsedResult.message;
            }
        }
        catch (error) {
            console.error(error);
        }
    });
}
const catRefresh = () => {
    fetchCat();
    catFacts();
};
catRefreshBtn === null || catRefreshBtn === void 0 ? void 0 : catRefreshBtn.addEventListener("click", catRefresh);
getJoke();
fetchDog();
dogFacts();
fetchCat();
catFacts();
