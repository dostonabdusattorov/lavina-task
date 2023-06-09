import {
  Button,
  Typography,
  Modal,
  Box,
  TextField,
  CircularProgress,
} from "@mui/material";
import { FC } from "react";
import { createPortal } from "react-dom";
import { useCreateBookMutation } from "../store";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

interface Props {
  open: boolean;
  handleClose: () => void;
}

export const CreateBookModal: FC<Props> = ({ open, handleClose }) => {
  const [createBook, { isLoading }] = useCreateBookMutation();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (data.get("isbn") === "") {
      return;
    }

    createBook({
      isbn: data.get("isbn"),
    });

    handleClose();
  };

  return createPortal(
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create book
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <TextField
              name="isbn"
              required
              type="number"
              minRows={13}
              fullWidth
              id="isbn"
              label="International Standard Book Number"
              autoFocus
            />
            <Button
              disabled={isLoading}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {isLoading ? <CircularProgress /> : "Register"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>,
    document.querySelector("#create-book-modal") as HTMLHtmlElement
  );
};
