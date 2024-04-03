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
  document.getElementById("dog-section");
  try {
    const response = await fetch("https://random.dog/woof.json");
    const dogImg = await response.json();
    console.log(dogImg.url);
  } catch (error) {
    console.error("Error fetching dog image:", error);
  }
}

// Dog facts API

// Refresh button to recall both

// Cat image generation API

// Cat facts API

// Refresh button to recall both

// Zoo animal image generation API

// Zoo animal facts API

// Refresh button to recall both

// Initial Function Calls

getJoke();
fetchDog();
