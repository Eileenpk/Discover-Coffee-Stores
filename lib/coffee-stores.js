import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
});

const getUrlForCoffeeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}=${limit}`;
};

const getListOfCoffeeStorePhoto = async () => {
  const photos = await unsplash.search.getPhotos({
    query: "coffee shop",
    perPage: 30,
  });
  const unsplashResults = photos.response.results;
  return unsplashResults.map((result) => result.urls["regular"]);
};

export const fetchCoffeeStores = async () => {
  const photos = await getListOfCoffeeStorePhoto();
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.FOURSQUARE_API_KEY,
    },
  };

  const response = await fetch(
    getUrlForCoffeeStores(
      "40.827066881391445%2C-75.07435870807116&limit",
      "coffee",
      "6"
    ),
    options
  );
  const data = await response.json();
  return data.results.map((result, index) => {
    return {
      id: result.fsq_id,
      address: result.location.formatted_address,
      locality: result.location.locality,
      name: result.name,
      imgUrl: photos.length > 0 ? photos[index] : null,
    };
  });
  // .catch((err) => console.error(err));
};
