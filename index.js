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
// Style header to be exciting and fun
// Fetch data for jokes and display [X]
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
            console.log(jokeText);
        }
        else {
            throw new Error("Failed to fetch joke");
        }
    }
    catch (error) {
        console.error("Error fetching joke:", error);
    }
});
// Dog image generation API
function fetchDog() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("https://random.dog/woof.json");
            const dogImg = yield response.json();
            console.log(dogImg.url);
        }
        catch (error) {
            console.error("Error fetching dog image:", error);
        }
    });
}
// Dog facts API
function dogFacts() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("https://dogapi.dog/api/v2/facts");
            const dogFact = yield response.json();
            console.log(dogFact.data[0].attributes.body);
        }
        catch (error) {
            console.error("Error fetching dog fact:", error);
        }
    });
}
// Refresh button to recall dog
const dogRefresh = () => {
    fetchDog();
    dogFacts();
};
dogRefreshBtn === null || dogRefreshBtn === void 0 ? void 0 : dogRefreshBtn.addEventListener("click", dogRefresh);
// Cat image generation API
function fetchCat() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("https://api.thecatapi.com/v1/images/search");
            const catImg = yield response.json();
            console.log(catImg[0].url);
        }
        catch (error) {
            console.error("Error fetching cat image:", error);
        }
    });
}
// Cat facts API
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
            console.log(result);
        }
        catch (error) {
            console.error(error);
        }
    });
}
// Refresh button to recall cat
const catRefresh = () => {
    fetchCat();
    catFacts();
};
catRefreshBtn === null || catRefreshBtn === void 0 ? void 0 : catRefreshBtn.addEventListener("click", catRefresh);
// Initial Function Calls
getJoke();
fetchDog();
dogFacts();
fetchCat();
catFacts();
