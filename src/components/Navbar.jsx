import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { FilterContext } from "../context/FilterProvider";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
      "&:focus": {
        width: "30ch",
      },
    },
  },
}));

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.common.black,
  textDecoration: "none",
  "&:hover": {
    color: theme.palette.common.black,
    textDecoration: "none",
  },
}));

const StyledLinkWhite = styled(Link)(({ theme }) => ({
  color: theme.palette.common.white,
  textDecoration: "none",
  "&:hover": {
    color: theme.palette.common.white,
    textDecoration: "none",
  },
}));

const Navbar = () => {
  const [width, setWidth] = React.useState(window.innerWidth);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { filter, setFilter, user, loginUser, logout } =
    React.useContext(FilterContext);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const minWidth = 740;

  React.useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {width > minWidth ? (
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              <StyledLinkWhite to="/">Marvel Pelis</StyledLinkWhite>

              <StyledLinkWhite className="ml-4" to="/series">
                Marvel Series
              </StyledLinkWhite>
            </Typography>
          ) : (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "botton",
                  horizontal: "left",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <div>
                  <MenuItem className="ml-2">
                    <StyledLink to="/" onClick={() => handleClose()}>
                      Marvel Pelis
                    </StyledLink>
                  </MenuItem>
                </div>

                <div className="ml-2">
                  <MenuItem>
                    <StyledLink to="/series" onClick={() => handleClose()}>
                      Marvel Series
                    </StyledLink>
                  </MenuItem>
                </div>
                {!user.estado ? (
                  <div>
                    <MenuItem className="pr-2">
                      <Button
                        variant="contained"
                        className="ml-2"
                        color="default"
                        onClick={() => loginUser() && handleClose()}
                      >
                        Iniciar sesión
                        <LockOpenIcon size="small" className="ml-2" />
                      </Button>
                    </MenuItem>
                  </div>
                ) : (
                  <div>
                    <MenuItem className="pr-2">
                      <Button
                        variant="contained"
                        className="ml-2"
                        color="secondary"
                        onClick={() => logout() && handleClose()}
                      >
                        Cerrar sesión
                        <LockIcon size="small" className="ml-2" />
                      </Button>
                    </MenuItem>
                  </div>
                )}
              </Menu>
            </div>
          )}

          {width > minWidth ? (
            <div className="row">
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Spider-Man..."
                  inputProps={{ "aria-label": "search" }}
                  search={filter}
                  onChange={(e) => setFilter(e.target.value)}
                />
              </Search>
              {!user.estado ? (
                <Button
                  variant="contained"
                  className="ml-2"
                  color="default"
                  onClick={() => loginUser()}
                >
                  Iniciar sesión
                  <LockOpenIcon size="small" className="ml-2" />
                </Button>
              ) : (
                <Button
                  variant="contained"
                  className="ml-2"
                  color="secondary"
                  onClick={() => logout()}
                >
                  Cerrar sesión
                  <LockIcon size="small" className="ml-2" />
                </Button>
              )}
            </div>
          ) : (
            <div className="row float-end w-100 ml-3">
              <div className="col-12 float-right">
                <Search className="float-right">
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Spider-Man..."
                    inputProps={{ "aria-label": "search" }}
                    search={filter}
                    onChange={(e) => setFilter(e.target.value)}
                  />
                </Search>
              </div>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
