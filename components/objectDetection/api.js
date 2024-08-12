
export async function fetchUnsplashImages(query) {
  const UNSPLASH_API_KEY = "tBM14o9tfvarzQBIaM-NVHHDLG6c_v1jPQL51DM1Euo";
  const UNSPLASH_API_URL = "https://api.unsplash.com/search/photos";

  try {
    const response = await fetch(
      `${UNSPLASH_API_URL}?query=${query}&client_id=${UNSPLASH_API_KEY}`
    );
    const data = await response.json();
    console.log(`Unsplash response for ${query}:`, data);
    return data.results.map((result) => result.urls.small);
  } catch (error) {
    console.error("Error fetching images from Unsplash:", error);
    return [];
  }
}
