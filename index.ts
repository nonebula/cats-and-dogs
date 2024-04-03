const headline = document.getElementById("header");
const dogRefreshBtn = document.getElementById("dog-refresh");
const catRefreshBtn = document.getElementById("cat-refresh");
const zooRefreshBtn = document.getElementById("zoo-refresh");

// Style header to be exciting and fun

// Fetch data for jokes and display [X]
async function getJoke() {
  try {
    const response = await fetch("https://icanhazdadjoke.com/", {
      headers: {
        Accept: "application/json", // Request JSON response
        "User-Agent": "YourLibraryOrWebsiteName (https://yourwebsite.com)",
      },
    });

    if (response.ok) {
      const jokeData = await response.json(); // Parse response as JSON
      const jokeText = jokeData.joke; // Extract the joke text from the response
      console.log(jokeText); // Output the joke text
    } else {
      throw new Error("Failed to fetch joke");
    }
  } catch (error) {
    console.error("Error fetching joke:", error);
  }
}

// Dog image generation API
async function fetchDog() {
  try {
    const response = await fetch("https://random.dog/woof.json");
    const dogImg = await response.json();
    console.log(dogImg.url);
  } catch (error) {
    console.error("Error fetching dog image:", error);
  }
}

// Dog facts API
async function dogFacts() {
  try {
    const response = await fetch("https://dogapi.dog/api/v2/facts");
    const dogFact = await response.json();
    console.log(dogFact.data[0].attributes.body);
  } catch (error) {
    console.error("Error fetching dog fact:", error);
  }
}

// Refresh button to recall dog
const dogRefresh = () => {
  fetchDog();
  dogFacts();
};

dogRefreshBtn?.addEventListener("click", dogRefresh);

// Cat image generation API
async function fetchCat() {
  try {
    const response = await fetch("https://api.thecatapi.com/v1/images/search");
    const catImg = await response.json();
    console.log(catImg[0].url);
  } catch (error) {
    console.error("Error fetching cat image:", error);
  }
}

// Cat facts API
async function catFacts() {
  const url = "https://random-cat-fact.p.rapidapi.com/";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "aeef6d6de3mshfec18a533464299p1bb9f9jsnba5e698e206b",
      "X-RapidAPI-Host": "random-cat-fact.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

// Refresh button to recall cat
const catRefresh = () => {
  fetchCat();
  catFacts();
};

catRefreshBtn?.addEventListener("click", catRefresh);

// Initial Function Calls

getJoke();

fetchDog();
dogFacts();

fetchCat();
catFacts();
