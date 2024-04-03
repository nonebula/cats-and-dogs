"use strict";
// Style header to be exciting and fun
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Fetch data for jokes and display [X]
function getJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("https://icanhazdadjoke.com/", {
                headers: {
                    Accept: "application/json", // Request JSON response
                    "User-Agent": "YourLibraryOrWebsiteName (https://yourwebsite.com)",
                },
            });
            if (response.ok) {
                const jokeData = yield response.json(); // Parse response as JSON
                const jokeText = jokeData.joke; // Extract the joke text from the response
                console.log(jokeText); // Output the joke text
            }
            else {
                throw new Error("Failed to fetch joke");
            }
        }
        catch (error) {
            console.error("Error fetching joke:", error);
        }
    });
}
// Dog image generation API
function fetchDog() {
    return __awaiter(this, void 0, void 0, function* () {
        document.getElementById("dog-section");
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
        document.getElementById("dog-section");
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
// Refresh button to recall both
// Cat image generation API
function fetchCat() {
    return __awaiter(this, void 0, void 0, function* () {
        document.getElementById("cat-section");
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
// Refresh button to recall both
// Zoo animal image generation API
// Zoo animal facts API
// Refresh button to recall both
// Initial Function Calls
getJoke();
fetchDog();
fetchCat();
dogFacts();
