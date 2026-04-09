import { useState, type FormEvent, type ChangeEvent } from "react";
import { supabase } from "../supabase-client";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Link,
  Divider,
  Card,
  CardContent,
} from "@mui/material";

export const Auth = () => {
  const [isSignUp] = useState(false);
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

  const handleDemoLogin = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
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
      <Paper elevation={3} sx={{ p: 4, width: 420, maxWidth: "95%" }}>
        <Typography variant="h5" mb={1}>
          Login
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={2}>
          Testen Sie die Anwendung direkt mit Demo-Zugängen – ohne
          Registrierung.
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              type="email"
              label="E-Mail"
              value={email}
              required
              fullWidth
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />

            <TextField
              type="password"
              label="Passwort"
              value={password}
              required
              fullWidth
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />

            <Button type="submit" variant="contained" size="large">
              Login
            </Button>
          </Stack>
        </Box>

        {/* DEMO SECTION */}
        <Divider sx={{ my: 3 }} />

        <Typography variant="subtitle1" fontWeight="bold" mb={1}>
          Demo-Zugänge testen
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={2}>
          Nutzen Sie die folgenden Accounts, um die Anwendung aus verschiedenen
          Perspektiven (Admin / Mitarbeiter) zu testen.
        </Typography>

        <Stack spacing={2}>
          {/* ADMIN */}
          <Card variant="outlined">
            <CardContent>
              <Typography fontWeight="bold">Admin (Chef)</Typography>
              <Typography variant="body2" color="text.secondary">
                Vollzugriff auf alle Funktionen
              </Typography>

              <Box mt={1}>
                <Typography variant="body2">admin@stephan-haak.com</Typography>
                <Typography variant="body2">1234Test</Typography>
              </Box>

              <Button
                fullWidth
                sx={{ mt: 2 }}
                variant="outlined"
                onClick={() =>
                  handleDemoLogin("admin@stephan-haak.com", "1234Test")
                }
              >
                Als Admin einloggen
              </Button>
            </CardContent>
          </Card>

          {/* MEMBER */}
          <Card variant="outlined">
            <CardContent>
              <Typography fontWeight="bold">Mitarbeiter (Member)</Typography>
              <Typography variant="body2" color="text.secondary">
                Eingeschränkter Zugriff
              </Typography>

              <Box mt={1}>
                <Typography variant="body2">member@stephan-haak.com</Typography>
                <Typography variant="body2">1234Test</Typography>
              </Box>

              <Button
                fullWidth
                sx={{ mt: 2 }}
                variant="outlined"
                onClick={() =>
                  handleDemoLogin("member@stephan-haak.com", "1234Test")
                }
              >
                Als Mitarbeiter einloggen
              </Button>
            </CardContent>
          </Card>
        </Stack>

        <Divider sx={{ my: 3 }} />

        <Typography variant="body2">
          Kein Zugang?{" "}
          <Link href="mailto:info@stephan-haak.com">Kontakt aufnehmen</Link>
        </Typography>
      </Paper>
    </Box>
  );
};

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         bgcolor: "background.default",
//       }}
//     >
//       <Paper elevation={3} sx={{ p: 4, width: 400, maxWidth: "90%" }}>
//         <Typography variant="h5" mb={2}>
//           {isSignUp ? "Registrieren" : "Einloggen"}
//         </Typography>

//         <Box component="form" onSubmit={handleSubmit}>
//           <Stack spacing={2}>
//             <TextField
//               type="email"
//               label="Email"
//               value={email}
//               required
//               fullWidth
//               onChange={(e: ChangeEvent<HTMLInputElement>) =>
//                 setEmail(e.target.value)
//               }
//             />

//             <TextField
//               type="password"
//               label="Password"
//               value={password}
//               required
//               fullWidth
//               onChange={(e: ChangeEvent<HTMLInputElement>) =>
//                 setPassword(e.target.value)
//               }
//             />

//             <Button
//               type="submit"
//               variant="contained"
//               size="large"
//               disabled={isSignUp}
//             >
//               {isSignUp ? "Jetzt registrieren" : "Log in"}
//             </Button>

//             {isSignUp && (
//               <Box>
//                 <Typography fontWeight="bold">
//                   Registrieren nicht möglich!
//                 </Typography>
//                 <Typography>
//                   Um einen Zugang zu erhalten, schreiben Sie eine E-Mail an{" "}
//                   <Link href="mailto:info@stephan-haak.com">
//                     info@stephan-haak.com
//                   </Link>
//                 </Typography>
//               </Box>
//             )}

//             <Button variant="text" onClick={() => setIsSignUp(!isSignUp)}>
//               {isSignUp ? "zu Login wechseln" : "zur Registration wechseln"}
//             </Button>
//           </Stack>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };
