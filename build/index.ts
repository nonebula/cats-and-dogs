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

      const container = document.getElementById("banner");
      if (!container) {
        console.error("Container not found.");
        return;
      }
      container.textContent = "";
      container.append(jokeText);
    } else {
      throw new Error("Failed to fetch joke");
    }
  } catch (error) {
    console.error("Error fetching joke:", error);
  }
};

async function fetchDog(): Promise<void> {
  try {
    let dogImageUrl: string;

    do {
      const response = await fetch("https://random.dog/woof.json");
      const dogImg: DogImage = await response.json();
      console.log(dogImg.url);
      dogImageUrl = dogImg.url;
    } while (!dogImageUrl.endsWith(".jpg") && !dogImageUrl.endsWith(".jpeg"));

    const dogImgElement = document.getElementById(
      "dog-image"
    ) as HTMLImageElement;

    dogImgElement.src = dogImageUrl;

    dogImgElement.style.maxWidth = "500px";
    dogImgElement.style.maxHeight = "500px";
    dogImgElement.style.minWidth = "300px";
    dogImgElement.style.minHeight = "300px";
  } catch (error) {
    console.error("Error fetching dog image:", error);
  }
}

async function dogFacts(): Promise<void> {
  try {
    const response = await fetch("https://dogapi.dog/api/v2/facts");
    const dogFact: DogFact = await response.json();

    const container = document.getElementById("dog-fact-container");

    if (!container) {
      console.error("Container not found.");
      return;
    }

    container.textContent = "";
    const dogFactText = JSON.stringify(dogFact.data[0].attributes.body);
    container?.append(dogFactText);
  } catch (error) {
    console.error("Error fetching dog fact:", error);
  }
}

const dogRefresh = (): void => {
  fetchDog();
  dogFacts();
};

dogRefreshBtn?.addEventListener("click", dogRefresh);

async function fetchCat(): Promise<void> {
  try {
    const response = await fetch("https://api.thecatapi.com/v1/images/search");
    const catImg: CatImage[] = await response.json();
    const catImageUrl = catImg[0].url;

    const catImgElement = document.getElementById(
      "cat-image"
    ) as HTMLImageElement;
    catImgElement.src = catImageUrl;

    catImgElement.style.maxWidth = "500px";
    catImgElement.style.maxHeight = "500px";
    catImgElement.style.minWidth = "300px";
    catImgElement.style.minHeight = "300px";
  } catch (error) {
    console.error("Error fetching cat image:", error);
  }
}

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
    const result = await response.text();

    const container = document.getElementById("cat-fact-container");
    if (!container) {
      console.error("Container not found");
      return;
    }

    container.textContent = "";

    const parsedResult = JSON.parse(result);

    container.textContent = parsedResult.message;

    if (
      parsedResult.message ===
      "You have exceeded the rate limit per hour for your plan, BASIC, by the API provider"
    ) {
      container.textContent =
        "The API has reached it's limit :(. Here's a fun fact! The phrase raining cats and dogs originated in 17th century England when it is believed that many cats and dogs drowned during heavy periods of rain.";
    } else {
      container.textContent = parsedResult.message;
    }
  } catch (error) {
    console.error(error);
  }
}

const catRefresh = (): void => {
  fetchCat();
  catFacts();
};

catRefreshBtn?.addEventListener("click", catRefresh);

getJoke();
fetchDog();
dogFacts();
fetchCat();
catFacts();
