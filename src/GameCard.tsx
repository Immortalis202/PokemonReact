import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Box } from "@mui/material";
import whosThatPokemon from './Assets/whosThatPokemon.png'; // Import the image

export default function GameCard() {
  return (
    <Card sx={{ maxWidth: 345, mx: 'auto' }}> {/* Center the card */}
      <CardActionArea>
        <CardMedia
          component="img"
          height="160"
          image={whosThatPokemon} // Use imported image
          alt="game img"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Who's that Pokemon?
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Relive the thrill of the classic TV show segment, 'Who's That
            Pokémon?' right from your browser!
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Box sx={{ mx: 'auto' }}> {/* Center the button */}
          <Button 
            size="small" 
            sx={{ backgroundColor: '#ff2147', color: 'black' }} // Change button background color
          >
            Play
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
}
