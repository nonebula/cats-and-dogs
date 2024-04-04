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

// Getting elements by ID
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
      // console.log(jokeText);

      const container = document.getElementById("banner");
      container?.textContent = "";
      container?.append(jokeText);
    } else {
      throw new Error("Failed to fetch joke");
    }
  } catch (error) {
    console.error("Error fetching joke:", error);
  }
};

// Dog image generation API
// Dog image generation API
async function fetchDog(): Promise<void> {
  try {
    let dogImageUrl: string;

    // Fetch dog URL until it's an image
    do {
      const response = await fetch("https://random.dog/woof.json");
      const dogImg: DogImage = await response.json();
      console.log(dogImg.url);
      dogImageUrl = dogImg.url;
    } while (!dogImageUrl.endsWith(".jpg") && !dogImageUrl.endsWith(".jpeg"));

    // Get the existing image element with the ID "dog-image"
    const dogImgElement = document.getElementById(
      "dog-image"
    ) as HTMLImageElement;

    // Set the source of the image to the retrieved URL
    dogImgElement.src = dogImageUrl;

    // Style the image element
    dogImgElement.style.maxWidth = "500px";
    dogImgElement.style.maxHeight = "500px";
  } catch (error) {
    console.error("Error fetching dog image:", error);
  }
}

// Dog facts API
async function dogFacts(): Promise<void> {
  try {
    const response = await fetch("https://dogapi.dog/api/v2/facts");
    const dogFact: DogFact = await response.json();
    // console.log(dogFact.data[0].attributes.body);

    const container = document.getElementById("dog-fact-container");
    container.textContent = "";
    const dogFactText = JSON.stringify(dogFact.data[0].attributes.body);
    container?.append(dogFactText);
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
    // console.log(catImg[0].url);
    const catImageUrl = catImg[0].url;

    const catImgElement = document.getElementById(
      "cat-image"
    ) as HTMLImageElement;
    catImgElement.src = catImageUrl;

    catImgElement.style.maxWidth = "500px";
    catImgElement.style.maxHeight = "500px";
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
    // console.log(result);

    const container = document.getElementById("cat-fact-container");
    container?.textContent = "";
    const catFact = JSON.stringify(result);
    container?.append(catFact);
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
