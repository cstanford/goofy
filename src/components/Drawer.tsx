import React from "react";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Switch,
  Drawer,
  Button,
  List,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import { showNsfwProps } from "../commonProps";

export interface DrawerProps extends showNsfwProps {};

export default function TemporaryDrawer({ showNsfw, setShowNsfw }: DrawerProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const list = () => (
    <>
      <List>
        <ListItem component="switch" key={"sfw toggle"}>
          <ListItemIcon>
              <Switch
                size="small"
                checked={showNsfw}
                onChange={() => setShowNsfw(!showNsfw)}
              />
          </ListItemIcon>
          <ListItemText primary={'Show NSFW Results'} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          component="a"
          key={"source"}
          href="https://github.com/cstanford/goofy"
          target="_blank"
        >
          <ListItemIcon>
            <GitHubIcon />
          </ListItemIcon>
          <ListItemText primary={"Source Code"} />
        </ListItem>
        <ListItem
          component="a"
          key={"linkedin"}
          href="https://www.linkedin.com/in/cstanfordit/"
          target="_blank"
        >
          <ListItemIcon>
            <LinkedInIcon />
          </ListItemIcon>
          <ListItemText primary={"LinkedIn"} />
        </ListItem>
      </List>
    </>
  );

  return (
    <div>
      <React.Fragment>
        <Button onClick={() => setIsOpen(!isOpen)}>
          <MenuIcon style={{ color: "antiquewhite" }} />
        </Button>
        <Drawer anchor="left" open={isOpen} onClose={() => setIsOpen(false)}>
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
