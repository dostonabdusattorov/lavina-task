import { useNavigate } from "react-router-dom";
import { useGetAllBooksQuery, useGetUserQuery } from "../store";
import { useEffect } from "react";
import { Books, Header } from "../components";
import { Box, CircularProgress } from "@mui/material";

export function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("key")) {
      navigate("/signup");
    }
  }, []);
  const { data: userData } = useGetUserQuery("");
  const { data: books, isLoading: isBooksLoading } = useGetAllBooksQuery("");

  return (
    <main>
      <Header name={userData?.data?.name}></Header>
      <Box
        sx={{
          marginTop: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}
      >
        {isBooksLoading ? (
          <CircularProgress
            sx={{
              marginTop: 15,
            }}
          />
        ) : (
          <Books books={books?.data} />
        )}
      </Box>
    </main>
  );
}
