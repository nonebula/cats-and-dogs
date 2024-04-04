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
// Getting elements by ID
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
            // console.log(jokeText);
            const container = document.getElementById("banner");
            container === null || container === void 0 ? void 0 : container.textContent = "";
            container === null || container === void 0 ? void 0 : container.append(jokeText);
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
// Dog image generation API
function fetchDog() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let dogImageUrl;
            // Fetch dog URL until it's an image
            do {
                const response = yield fetch("https://random.dog/woof.json");
                const dogImg = yield response.json();
                console.log(dogImg.url);
                dogImageUrl = dogImg.url;
            } while (!dogImageUrl.endsWith(".jpg") && !dogImageUrl.endsWith(".jpeg"));
            // Get the existing image element with the ID "dog-image"
            const dogImgElement = document.getElementById("dog-image");
            // Set the source of the image to the retrieved URL
            dogImgElement.src = dogImageUrl;
            // Style the image element
            dogImgElement.style.maxWidth = "500px";
            dogImgElement.style.maxHeight = "500px";
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
            // console.log(dogFact.data[0].attributes.body);
            const container = document.getElementById("dog-fact-container");
            container.textContent = "";
            const dogFactText = JSON.stringify(dogFact.data[0].attributes.body);
            container === null || container === void 0 ? void 0 : container.append(dogFactText);
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
            // console.log(catImg[0].url);
            const catImageUrl = catImg[0].url;
            const catImgElement = document.getElementById("cat-image");
            catImgElement.src = catImageUrl;
            catImgElement.style.maxWidth = "500px";
            catImgElement.style.maxHeight = "500px";
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
            // console.log(result);
            const container = document.getElementById("cat-fact-container");
            container === null || container === void 0 ? void 0 : container.textContent = "";
            const catFact = JSON.stringify(result);
            container === null || container === void 0 ? void 0 : container.append(catFact);
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
