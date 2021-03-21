import React from "react";
import clsx from 'clsx';
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Dashboard from '@material-ui/icons/Dashboard';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Switch, Route, Link, BrowserRouter } from "react-router-dom";
import ViewTransactionComponent from "../TransactionComponents/ViewTransactionComponent";

//icons
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import PeopleAltTwoTone from '@material-ui/icons/PeopleAltTwoTone';
import AssessmentTwoTone from '@material-ui/icons/AssessmentTwoTone';
import PermIdentityTwoTone from '@material-ui/icons/PermIdentityTwoTone';
import AddTransactionComponent from "../TransactionComponents/AddTransactionComponent";
import ViewEntityComponent from "../EntityComponents/ViewEntityComponent";


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  hide: {
    display: 'none',
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: theme.mixins.toolbar,
  
}));

function ResponsiveDrawer(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const iconSwitch = (element) => {
    switch (element) {
      case "dashboard":
        return <Dashboard />;
      case "transactions":
        return <CompareArrowsIcon />;
      case "entity":
        return <PeopleAltTwoTone />;
      case "reports":
        return <AssessmentTwoTone />;
      case "profile":
        return <PermIdentityTwoTone />;
    }
  }

  const drawer = (
    <div>
      {/* <div className={classes.toolbar} /> */}
      <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerToggle}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
      <Divider />
      <List>
        {["Dashboard", "Transactions", "Entity", "Reports", "Profile"].map((text, index) => (
          <ListItem button key={text} component={Link} to={"/" + text.toLowerCase()} className={classes.link}>
            <ListItemIcon>
              {iconSwitch(text.toLowerCase())}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar  position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: !open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            open={open}
            onClick={handleDrawerToggle}
            className={clsx(classes.menuButton, !open )}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            <b>CASHFLOW</b>
          </Typography>
        </Toolbar>
      </AppBar>
      <BrowserRouter>
        <nav className={classes.drawer} aria-label="mailbox folders">
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={!open}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
              
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>

        <main className={clsx(classes.content, {
          [classes.contentShift]: !open,
        })}>
          <div className={classes.toolbar} />

          <Switch>
            <Route exact path="/" render={() => <div>Home Page</div>} />
            <Route path="/transactions" component={ViewTransactionComponent} />
            <Route path="/add-transaction" component={AddTransactionComponent} />
            <Route path="/entity" component={ViewEntityComponent} />
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
}

ResponsiveDrawer.propTypes = {

  container: PropTypes.instanceOf(
    typeof Element === "undefined" ? Object : Element
  )
};

export default ResponsiveDrawer;