import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Toolbar,
  Typography,
} from "@mui/material";
import { Person } from "@mui/icons-material";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateBookModal } from "./CreateBookModal";

interface Props {
  name: string;
}

export const Header: FC<Props> = ({ name }) => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSignOut = (): void => {
    localStorage.removeItem("key");
    localStorage.removeItem("secret");

    navigate("/signup");
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            variant="h6"
            color="inherit"
            noWrap
          >
            <Person sx={{ mr: 2 }} />
            {name ? name : ""}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <Button onClick={handleOpen} variant="contained" color="success">
              Create Book
            </Button>
            <Button onClick={handleSignOut} variant="contained" color="error">
              Sign out
            </Button>
            <CreateBookModal open={open} handleClose={handleClose} />
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};
