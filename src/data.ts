import { rejects } from "assert";
import config from "./config";
import { Gif } from "./models";

const getRating = (showNsfw: boolean) => {
  return showNsfw ? "" : "&rating=pg";
};

export async function getRandomGif(showNsfw: boolean): Promise<Gif> {
  const endpoint = `https://api.giphy.com/v1/gifs/random?api_key=${
    config.giphyKey
  }${getRating(showNsfw)}`;
  return fetch(endpoint)
    .then((res) => res.json())
    .then(
      (res) => {
        return new Gif(res.data.images.original.mp4, res.data.bitly_gif_url);
      },
      (error) => {
        console.log(error);
        return new Gif();
      }
    );
}

export function getGifs(
  searchTerm: string,
  offset: number,
  showNsfw: boolean
): Promise<Gif[]> {
  const qOffset = `&offset=${offset * 9}`;
  const endpoint = `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${
    config.giphyKey
  }&limit=9${getRating(showNsfw)}${qOffset}`;

  return fetch(endpoint)
    .then((res) => res.json())
    .then(
      (result) => {
        return Promise.resolve(
          result.data.map(
            (r: {
              images: { original: { mp4: string } };
              bitly_gif_url: string;
            }) => {
              return new Gif(r.images.original.mp4, r.bitly_gif_url);
            }
          )
        );
      },
      (error) => {
        Promise.reject(error);
      }
    );
}
