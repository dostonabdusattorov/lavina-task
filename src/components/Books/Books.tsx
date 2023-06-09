import { Box, Container, Grid, Typography } from "@mui/material";
import { FC } from "react";
import { BookItem } from "./Book";

interface BookData {
  id: number;
  isbn: string;
  title: string;
  cover: string;
  author: string;
  published: number;
  pages: number;
}

export interface Book {
  book: BookData;
  status: number;
}

interface Props {
  books: Book[];
}

export const Books: FC<Props> = ({ books }) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          padding: 10,
        }}
      >
        {books &&
          books?.map((book) => <BookItem key={book.book.id} book={book} />)}
        {!books ||
          (books.length === 0 && (
            <Typography alignItems={"center"} variant="h6" noWrap>
              There is no book
            </Typography>
          ))}
      </Box>
    </>
  );
};
