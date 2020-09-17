import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import {
  Grid,
  Button,
  createStyles,
  makeStyles,
  Theme,
  TextField,
  Card,
  CardActions,
  CardMedia,
  CardActionArea,
  CardHeader,
  IconButton,
} from "@material-ui/core";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import config from "../config";
import { Gif } from "../models";
import { useEffect } from "react";
import { showNsfwProps } from "../commonProps";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    goofyFont: {
      fontFamily: "Rancho",
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    card: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
    },
    cardButton: {
      marginTop: "auto",
    },
  })
);

const prettyFly = () => {
  const btn = document.getElementById("btnSearch");
  btn!.innerText = "Uh Huh! Uh Huh!";
  setTimeout(() => {
    btn!.innerText = "gif it to me baby";
  }, 2500);
};

export interface SearchProps extends showNsfwProps {}

export default function Search({ showNsfw, setShowNsfw }: SearchProps) {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
  const [error, setError] = React.useState(null);
  const [gifs, setGifs] = React.useState<Gif[]>([]);

  useEffect(() => {
    (async function doWork() {
      const g1 = await getRandomGif();
      const g2 = await getRandomGif();
      const g3 = await getRandomGif();
      setGifs([g1, g2, g3]);
      setIsLoaded(true);
    })();
  }, [showNsfw]);

  const getRating = () => {
    return showNsfw ? "" : "&rating=pg";
  };

  // giphy random api only returns 1 gif at a time ;(
  async function getRandomGif(): Promise<Gif> {
    const endpoint = `https://api.giphy.com/v1/gifs/random?api_key=${
      config.giphyKey
    }${getRating()}`;
    return fetch(endpoint)
      .then((res) => res.json())
      .then(
        (res) => {
          return new Gif(res.data.images.original.mp4, res.data.bitly_gif_url);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
          console.log(error);
          return new Gif();
        }
      );
  }

  const getGifs = () => {
    if (searchTerm === undefined) return;

    const endpoint = `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${
      config.giphyKey
    }&limit=9${getRating()}`;

    fetch(endpoint)
      .then((res) => res.json())
      .then(
        (result) => {
          setGifs(
            result.data.map(
              (r: {
                images: { original: { mp4: string } };
                bitly_gif_url: string;
              }) => {
                return new Gif(r.images.original.mp4, r.bitly_gif_url);
              }
            )
          );
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
          console.log(error);
        }
      );
  };

  const handleSearchClick = () => {
    prettyFly();
    getGifs();
  };

  return (
    <div>
      <Container maxWidth="md">
        <Typography
          className={classes.goofyFont}
          style={{ marginBottom: "1em" }}
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          GoOfY SeArCh
        </Typography>
        <div>
          <Grid container spacing={5} justify="center">
            <Grid item>
              <TextField
                id="search-input"
                placeholder="search for a gif"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              ></TextField>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                id="btnSearch"
                onClick={handleSearchClick}
              >
                gif it to me baby
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {gifs.map((gif, i) => (
            <Grid item key={i} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardHeader
                  action={
                    <IconButton aria-label="settings">
                      <FileCopyIcon
                        onClick={() =>
                          navigator.clipboard.writeText(gif.bitlyUrl)
                        }
                      />
                    </IconButton>
                  }
                />
                <CardActionArea>
                  <CardMedia component="video" src={gif.mp4Url} autoPlay loop />
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}