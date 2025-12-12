import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  type CardProps,
  CardHeader,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomCard = styled(Card)<CardProps>(({ theme }) => ({
  background: theme.palette.background.default,
  "& .MuiCardHeader-root": {
    background: theme.palette.background.paper,
  },
  "& .MuiCardHeader-title": {
    fontSize: "1rem",
    fontWeight: 600,
  },
}));
export default function CardShell() {
  return (
    <>
      <CustomCard sx={{ minWidth: 275 }}>
        <CardHeader title="Header-Test-Title"></CardHeader>
        <CardContent>
          <Typography
            gutterBottom
            sx={{ color: "text.secondary", fontSize: 14 }}
          >
            Word of the Day
          </Typography>
          <Typography variant="h5" component="div">
            TEST-CONTENT
          </Typography>
          <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
            adjective
          </Typography>
          <Typography variant="body2">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary">
            Learn More
          </Button>
          <Button variant="contained" disabled color="primary">
            Learn More
          </Button>
        </CardActions>
      </CustomCard>

      <Card sx={{ minWidth: 275 }}>
        <CardHeader title="Header-Test-Title"></CardHeader>
        <CardContent>
          <Typography
            gutterBottom
            sx={{ color: "text.secondary", fontSize: 14 }}
          >
            Word of the Day
          </Typography>
          <Typography variant="h5" component="div">
            TEST-CONTENT
          </Typography>
          <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
            adjective
          </Typography>
          <Typography variant="body2">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary">
            Learn More
          </Button>
          <Button variant="contained" disabled color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
