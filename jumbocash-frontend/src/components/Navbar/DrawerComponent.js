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
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu'
import { makeStyles, useTheme } from "@material-ui/core/styles";

import { Switch, Route, Link, BrowserRouter, useHistory } from "react-router-dom";
import ViewTransactionComponent from "../TransactionComponents/ViewTransactionComponent";
import DashboardComponent from "../DashboardComponents/DashboardComponent";
import { Redirect } from 'react-router-dom'


//icons
import Avatar from '@material-ui/core/Avatar';
import PostAddTwoToneIcon from '@material-ui/icons/PostAddTwoTone';
import CalendarViewDayTwoToneIcon from '@material-ui/icons/CalendarViewDayTwoTone';
import SupervisedUserCircleTwoToneIcon from '@material-ui/icons/SupervisedUserCircleTwoTone';
import GroupAddTwoToneIcon from '@material-ui/icons/GroupAddTwoTone';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import PeopleAltTwoTone from '@material-ui/icons/PeopleAltTwoTone';
import AssessmentTwoTone from '@material-ui/icons/AssessmentTwoTone';
import PermIdentityTwoTone from '@material-ui/icons/PermIdentityTwoTone';
import AddTransactionComponent from "../TransactionComponents/AddTransactionComponent";
import ViewEntityComponent from "../EntityComponents/ViewEntityComponent";
import AddToQueueTwoToneIcon from '@material-ui/icons/AddToQueueTwoTone';
import AddEntityComponent from "../EntityComponents/AddEntityComponent";
import ProtectedRoute from "../LoginLogoutComponents/ProtectedRoute";
import { CalendarViewDayTwoTone, PostAddTwoTone } from "@material-ui/icons";
import LoginButton from "../LoginLogoutComponents/LoginButton";
import LogoutButton from "../LoginLogoutComponents/LogoutButton";
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';

import { useGoogleLogout } from 'react-google-login';


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexGrow: 1
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
  title: {
    flexGrow: 1,
  },
  toolbar: theme.mixins.toolbar,

}));

function ResponsiveDrawer(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openTransactionCollapse, setOpenTransactionCollapse] = React.useState(false);
  const [openEntityCollapse, setOpenEntityCollapse] = React.useState(false);
  const openMenu = Boolean(anchorEl);
  const userId = props.userId;
  const userName = props.userName;
  console.log("DRAWER USER ID " + userId);
  console.log("DRAWER USER Name " + userName);

  let isLoggendIn = true;


  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleTransactionCollapse = () => {
    setOpenTransactionCollapse(!openTransactionCollapse);
  };

  const handleEntitiesCollapse = () => {
    setOpenEntityCollapse(!openEntityCollapse);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //logout
  const history = useHistory();

  const onLogoutSuccess = (res) => {
    console.log('Logged out Success');
    sessionStorage.removeItem('JUMBO_USER_ID');
    sessionStorage.removeItem('JUMBO_USER_NAME');
    sessionStorage.removeItem('JUMBO_LOGIN_STATUS');
    history.push("/");
  };

  const onFailure = () => {
    console.log('Handle failure cases');
  };

  const clientId = '193599941937-401iftc6u6hb3b92l27fvc80fomasg22.apps.googleusercontent.com';

  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess,
    onFailure,
  });

  const iconSwitch = (element) => {
    switch (element) {
      case "dashboard":
        return <Dashboard className="blue-color" />;
      case "transaction":
        return <CompareArrowsIcon className="purple-color" />;
      case "entity":
        return <PeopleAltTwoTone className="magenta-color" />;
      case "reports":
        return <AssessmentTwoTone className="pink-color" />;
      case "profile":
        return <PermIdentityTwoTone className="coral-color" />;
      case "logout":
        return <ExitToAppTwoToneIcon className="purple-color" />;
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
        <ListItem button key="Dashboard" component={Link} to={"/" + "dashboard".toLowerCase()} className={classes.link}>
          <ListItemIcon>
            {iconSwitch("Dashboard".toLowerCase())}
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        <ListItem button onClick={handleTransactionCollapse}>
          <ListItemIcon>
            {iconSwitch("Transaction".toLowerCase())}
          </ListItemIcon>
          <ListItemText primary="Transaction" />
          {openTransactionCollapse ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openTransactionCollapse} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested} component={Link} to={"/" + "add-transaction".toLowerCase()}>
              <ListItemIcon>
                <PostAddTwoTone className="purple-color" />
              </ListItemIcon>
              <ListItemText primary="Add Transaction" />
            </ListItem>
          </List>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested} component={Link} to={"/" + "transactions".toLowerCase()}>
              <ListItemIcon>
                <CalendarViewDayTwoTone className="purple-color" />
              </ListItemIcon>
              <ListItemText primary="View Transactions" />
            </ListItem>
          </List>
        </Collapse>

        <ListItem button onClick={handleEntitiesCollapse}>
          <ListItemIcon>
            {iconSwitch("Entity".toLowerCase())}
          </ListItemIcon>
          <ListItemText primary="Entity" />
          {openEntityCollapse ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openEntityCollapse} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested} component={Link} to={"/" + "add-entity".toLowerCase()}>
              <ListItemIcon>
                <GroupAddTwoToneIcon className="magenta-color" />
              </ListItemIcon>
              <ListItemText primary="Add Entity" />
            </ListItem>
          </List>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested} component={Link} to={"/" + "entities".toLowerCase()}>
              <ListItemIcon>
                <SupervisedUserCircleTwoToneIcon className="magenta-color" />
              </ListItemIcon>
              <ListItemText primary="View Entities" />
            </ListItem>
          </List>
        </Collapse>

        <ListItem button key="Reports" component={Link} to={"/" + "reports".toLowerCase()} className={classes.link}>
          <ListItemIcon>
            {iconSwitch("Reports".toLowerCase())}
          </ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItem>

        <ListItem button key="Profile" component={Link} to={"/" + "profile".toLowerCase()} className={classes.link}>
          <ListItemIcon>
            {iconSwitch("Profile".toLowerCase())}
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
        <Divider />
        <ListItem button key="Logout" onClick={signOut} className={classes.link}>
          <ListItemIcon>
            {iconSwitch("Logout".toLowerCase())}
          </ListItemIcon>
          <ListItemText primary="Logout" />
          {/* <LogoutButton /> */}
        </ListItem>
        <Divider />
      </List>

    </div>
  );

  if (!sessionStorage.getItem('JUMBO_LOGIN_STATUS')) {
    console.log("dashboard redirect")
    return (<Redirect to={'/'} />)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: !open,
        })}
      >
        <Toolbar className="toolbar">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            open={open}
            onClick={handleDrawerToggle}
            className={clsx(classes.menuButton, !open)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h7" className={classes.title} noWrap>
            <b>JUMBOTAIL CASHFLOW</b>
          </Typography>
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            {/* <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={openMenu}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu> */}
          </div>
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

          {/* <Switch>
            <Route exact path="/dashboard" render={(props) => <DashboardComponent userId={userId} userName={userName} {...props} />} />
            <Route path="/transactions" render={(props) => <ViewTransactionComponent userId={userId} {...props} />} />
            <Route path="/add-transaction" render={(props) => <AddTransactionComponent userId={userId} {...props} />} />
            <Route path="/entities" render={(props) => <ViewEntityComponent userId={userId} {...props} />} />
            <Route path="/add-entity" render={(props) => <AddEntityComponent userId={userId} {...props} />} />
          </Switch> */}

          <Switch>
            <ProtectedRoute exact path="/dashboard" component={ViewTransactionComponent} />
            <ProtectedRoute path="/transactions" component={ViewTransactionComponent} />
            <ProtectedRoute path="/add-transaction" component={AddTransactionComponent} />
            <ProtectedRoute path="/entities" component={ViewEntityComponent} />
            <ProtectedRoute path="/add-entity" component={AddEntityComponent} />
            <ProtectedRoute path="/logout" component={LogoutButton} />
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  )
}

ResponsiveDrawer.propTypes = {

  container: PropTypes.instanceOf(
    typeof Element === "undefined" ? Object : Element
  )
};

export default ResponsiveDrawer;