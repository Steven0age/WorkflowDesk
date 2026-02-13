import { useState, type FormEvent, type ChangeEvent } from "react";
import { supabase } from "../supabase-client";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";

export const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSignUp) {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });
      if (signUpError) {
        console.error("Error signing up:", signUpError.message);
        return;
      }
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) {
        console.error("Error signing up:", signInError.message);
        return;
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: 400, maxWidth: "90%" }}>
        <Typography variant="h5" mb={2}>
          {isSignUp ? "Registrieren" : "Einloggen"}
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              type="email"
              label="Email"
              value={email}
              required
              fullWidth
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />

            <TextField
              type="password"
              label="Password"
              value={password}
              required
              fullWidth
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />

            <Button type="submit" variant="contained" size="large">
              {isSignUp ? "Jetzt registrieren" : "Log in"}
            </Button>

            <Button variant="text" onClick={() => setIsSignUp(!isSignUp)}>
              {isSignUp ? "zu Login wechseln" : "zur Registration wechseln"}
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
};
