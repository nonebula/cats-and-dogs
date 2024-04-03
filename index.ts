// Defining Types
type JokeData = {
  joke: string;
};

type DogImage = {
  url: string;
};

type DogFact = {
  data: {
    attributes: {
      body: string;
    };
  }[];
};

type CatImage = {
  url: string;
};

const headline: HTMLElement | null = document.getElementById("header");
const dogRefreshBtn: HTMLElement | null =
  document.getElementById("dog-refresh");
const catRefreshBtn: HTMLElement | null =
  document.getElementById("cat-refresh");

// Style header to be exciting and fun

// Fetch data for jokes and display [X]
const getJoke = async (): Promise<void> => {
  try {
    const response = await fetch("https://icanhazdadjoke.com/", {
      headers: {
        Accept: "application/json",
        "User-Agent": "YourLibraryOrWebsiteName (https://yourwebsite.com)",
      },
    });

    if (response.ok) {
      const jokeData: JokeData = await response.json();
      const jokeText: string = jokeData.joke;
      console.log(jokeText);
    } else {
      throw new Error("Failed to fetch joke");
    }
  } catch (error) {
    console.error("Error fetching joke:", error);
  }
};

// Dog image generation API
async function fetchDog(): Promise<void> {
  try {
    const response = await fetch("https://random.dog/woof.json");
    const dogImg: DogImage = await response.json();
    console.log(dogImg.url);
  } catch (error) {
    console.error("Error fetching dog image:", error);
  }
}

// Dog facts API
async function dogFacts(): Promise<void> {
  try {
    const response = await fetch("https://dogapi.dog/api/v2/facts");
    const dogFact: DogFact = await response.json();
    console.log(dogFact.data[0].attributes.body);
  } catch (error) {
    console.error("Error fetching dog fact:", error);
  }
}

// Refresh button to recall dog
const dogRefresh = (): void => {
  fetchDog();
  dogFacts();
};

dogRefreshBtn?.addEventListener("click", dogRefresh);

// Cat image generation API
async function fetchCat(): Promise<void> {
  try {
    const response = await fetch("https://api.thecatapi.com/v1/images/search");
    const catImg: CatImage[] = await response.json();
    console.log(catImg[0].url);
  } catch (error) {
    console.error("Error fetching cat image:", error);
  }
}

// Cat facts API
async function catFacts(): Promise<void> {
  const url = "https://random-cat-fact.p.rapidapi.com/";
  const options: RequestInit = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "aeef6d6de3mshfec18a533464299p1bb9f9jsnba5e698e206b",
      "X-RapidAPI-Host": "random-cat-fact.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result: string = await response.text();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

// Refresh button to recall cat
const catRefresh = (): void => {
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
