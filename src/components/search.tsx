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
  CardMedia,
  CardActionArea,
  CardHeader,
  IconButton,
  Snackbar,
} from "@material-ui/core";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { Gif } from "../models";
import { useEffect } from "react";
import { showNsfwProps } from "../commonProps";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { getRandomGif, getGifs } from "../data";

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
    paginationContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: theme.spacing(4),
    },
    stepperButton: {
      margin: theme.spacing(2),
    },
  })
);

const prettyFly = (btnId: string) => {
  const btn = document.getElementById(btnId);
  const originalText = btn!.innerText;
  btn!.innerText = "Uh Huh! Uh Huh!";
  setTimeout(() => {
    btn!.innerText = originalText;
  }, 3000);
};

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export interface SearchProps extends showNsfwProps {}

export default function Search({ showNsfw, setShowNsfw }: SearchProps) {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [gifs, setGifs] = React.useState<Gif[]>([]);
  const [offset, setOffset] = React.useState<number>(0);
  const [showSnack, setShowSnack] = React.useState<boolean>(false);

  async function getRandoms() {
    // giphy random api only returns 1 gif at a time ;(
    const g1 = await getRandomGif(showNsfw);
    const g2 = await getRandomGif(showNsfw);
    const g3 = await getRandomGif(showNsfw);
    setGifs([g1, g2, g3]);
  }

  useEffect(() => {
    getRandoms();
  }, [showNsfw]);

  useEffect(() => {
    if (offset != 0) {
      loadGifs();
      prettyFly("btnGetMore");
    }
  }, [offset]);

  async function loadGifs() {
    await getGifs(searchTerm, offset, showNsfw)
      .then((newGifs) => {
        offset === 0 ? setGifs(newGifs) : setGifs([...gifs, ...newGifs]);
      })
      .then((error) => console.log(error));
  }

  const handleSearchClick = () => {
    if (searchTerm === undefined || searchTerm.trim() === '') 
        return;

    prettyFly("btnSearch");
    setOffset(0);
    loadGifs();
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
                onClick={() => {
                  setOffset(0);
                  handleSearchClick();
                }}
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
                        onClick={() => {
                          navigator.clipboard.writeText(gif.bitlyUrl);
                          setShowSnack(true);
                        }}
                      />
                    </IconButton>
                  }
                />
                <CardActionArea>
                  <CardMedia component="video" src={gif.mp4Url} autoPlay={true} loop={true} />
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <div hidden={gifs.length <= 3}>
        <Container className={classes.paginationContainer}>
          <Button
            variant="outlined"
            color="primary"
            id="btnGetMore"
            className={classes.stepperButton}
            onClick={() => setOffset(offset + 1)}
          >
            Gif me more!
          </Button>
        </Container>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        autoHideDuration={3000}
        open={showSnack}
        onClose={() => setShowSnack(false)}
      >
        <Alert severity="success">Giphy copied to clippy!</Alert>
      </Snackbar>
    </div>
  );
}
