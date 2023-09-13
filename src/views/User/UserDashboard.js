import React from "react";
import Page from "../../components/page";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import {
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,Divider,MenuItem,Menu,Toolbar,

} from "@mui/material";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";
import clsx from "clsx";
import { Link, Outlet, useLocation } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocationOnIcon from "@mui/icons-material/LocationOn";
const useStyles = makeStyles((theme) => ({
  selected: {
    background: "#002448",
  },
}));
const UserDashboard = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const theme = useTheme();
  const drawerWidth = 240;
  const ListData = [
    {
      id: 1,
      title: "Dashboard",
      icon: <DashboardIcon />,
      to: "/user/dashboard",
    },
    {
      id: 2,
      title: "Facilities",
      icon: <LocationOnIcon />,
      to: "/user/facilities",
    },
  ];
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const location = useLocation();
  React.useEffect(() => {
    const matchingItem = ListData.find((item) => item.to === location.pathname);
    if (matchingItem) {
      setSelectedIndex(matchingItem.id);
    }
  }, [location.pathname]);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  return (
    <Page title="User">
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
          }}
        >
          <Toolbar>
            <Typography>User Dashboard</Typography>
            <Box
              sx={{
                ml: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Avatar
                src="/assets/images/user.png"
                sx={{ cursor: "pointer" }}
                onClick={handleClick}
              />
              <Typography sx={{ ml: 2 }}> Johh Doe </Typography>
            </Box>
          </Toolbar>
        </AppBar>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            onClick={handleClose}
            sx={{
              "&:hover": {
                background: theme.palette.primary.main,
                color: "#fff",
              },
            }}
          >
            Profile
          </MenuItem>
          <MenuItem
            onClick={handleClose}
            sx={{
              "&:hover": {
                background: theme.palette.primary.main,
                color: "#fff",
              },
            }}
          >
            My account
          </MenuItem>
          <MenuItem
            onClick={handleClose}
            sx={{
              "&:hover": {
                background: theme.palette.primary.main,
                color: "#fff",
              },
            }}
          >
            Logout
          </MenuItem>
        </Menu>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              // background: theme.palette.primary.main
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar />
          <Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Avatar
                sx={{ height: "100px", width: "100px" }}
                src="/assets/images/user.png"
              />
            </Box>
            <Typography textAlign="center" sx={{ mt: 2 }} fontWeight="bold">
              {" "}
              John Doe (User){" "}
            </Typography>
          </Box>
          <Divider />
          <List component="nav" sx={{ mt: 2 }}>
            {ListData.map((val) => {
              return (
                <>
                  <ListItem
                    key={val}
                    disablePadding
                    className={clsx(classes.root, {
                      [classes.selected]: selectedIndex === val.id,
                    })}
                    component={Link}
                    to={val.to}
                  >
                    <ListItemButton
                      selected={selectedIndex === val.id}
                      onClick={(event) => handleListItemClick(event, val.id)}
                    >
                      <ListItemIcon
                        sx={{
                          color:
                            selectedIndex === val.id
                              ? "#fff"
                              : theme.palette.primary.main,
                        }}
                      >
                        {val.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={val.title}
                        sx={{
                          color:
                            selectedIndex === val.id
                              ? "#fff"
                              : theme.palette.primary.main,
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                </>
              );
            })}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        >
          <Toolbar />

          <Outlet />
        </Box>
      </Box>
    </Page>
  );
};

export default UserDashboard;
