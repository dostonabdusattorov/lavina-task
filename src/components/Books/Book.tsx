import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Input,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import { Book } from "./Books";
import { useDeleteBookMutation, useEditBookMutation } from "../../store";
const bookImage = require("../../assets/_.jpeg");

interface Props {
  book: Book;
}

export const BookItem: FC<Props> = ({ book }) => {
  const [isEditing, setIsEditing] = useState(false);

  const [status, setStatus] = useState(book.status);

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(+event.target.value);
  };

  const [deleteBook, { isLoading: isBookDeleting }] = useDeleteBookMutation();
  const [editBook, { isLoading: isBookEditing }] = useEditBookMutation();

  const submitEdit = () => {
    editBook({ id: book.book.id, body: { status } });
    setIsEditing(false);
  };
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia
        component="div"
        sx={{
          // 16:9
          pt: "56.25%",
        }}
        image={bookImage}
      />
      <CardContent sx={{ width: 400 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {book.book.title.length === 0 && "Raspberry Pi User Guide"}
        </Typography>
        <Box sx={{ width: 400, display: "flex", gap: 2 }}>
          Author:{" "}
          <Typography sx={{ fontWeight: 700 }}>
            {book.book.author.length === 0 && "Eben Upton"}
          </Typography>
        </Box>
        <Box sx={{ width: 400, display: "flex", gap: 2 }}>
          Published:{" "}
          <Typography sx={{ fontWeight: 700 }}>
            {book.book.published === 0 && 2012}
          </Typography>
        </Box>
        <Box sx={{ width: 400, display: "flex", gap: 2 }}>
          Pages:{" "}
          <Typography sx={{ fontWeight: 700 }}>
            {book.book.pages === 0 && 221}
          </Typography>
        </Box>
        <Box sx={{ width: 400, display: "flex", gap: 2 }}>
          Cover:{" "}
          <Typography sx={{ fontWeight: 700 }}>
            {book.book.cover.length === 0 && "http://url.to.book.cover"}
          </Typography>
        </Box>
        <Box sx={{ width: 400, display: "flex", gap: 2 }}>
          Status:{" "}
          <Typography sx={{ fontWeight: 700 }}>
            {book.status === 0
              ? "New"
              : book.status === 1
              ? "Reading"
              : "Finished"}
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ display: "flex", gap: 1 }}>
        {!isEditing && (
          <Button
            onClick={() => setIsEditing(true)}
            variant="contained"
            color="success"
            size="small"
          >
            Edit
          </Button>
        )}
        {isEditing && (
          <Box sx={{ display: "flex", gap: 1 }}>
            <Select
              labelId={`${status}`}
              id="demo-simple-select"
              value={`${status}`}
              label={`${status}`}
              onChange={handleChange}
            >
              <MenuItem value={0}>New</MenuItem>
              <MenuItem value={1}>Reading</MenuItem>
              <MenuItem value={3}>Finished</MenuItem>
            </Select>
            <Button
              onClick={submitEdit}
              variant="contained"
              color="success"
              size="small"
              disabled={isBookEditing}
            >
              {isBookEditing ? <CircularProgress /> : "Submit"}
            </Button>
          </Box>
        )}
        <Button
          onClick={() => {
            deleteBook(book.book.id);
          }}
          disabled={isBookDeleting}
          variant="contained"
          color="error"
          size="small"
        >
          {isBookDeleting ? <CircularProgress /> : "Delete"}
        </Button>
      </CardActions>
    </Card>
  );
};
