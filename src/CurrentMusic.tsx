import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import "./MediaControlCard.css";

export default function MediaControlCard() {
  const theme = useTheme();
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isRotating, setIsRotating] = React.useState(false); // State for rotation

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
      setIsRotating(!isRotating); // Toggle rotation state
    }
  };

  return (
    <div className="media-control-card">
      <Card sx={{ display: "flex", backgroundColor: "#aa2147" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              Pokemon Theme
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              Meloetta
            </Typography>
          </CardContent>
          <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
            <IconButton aria-label="previous">
              {theme.direction === "rtl" ? <SkipNextIcon /> : <SkipPreviousIcon />}
            </IconButton>
            <IconButton aria-label="play/pause" onClick={handlePlayPause}>
              {isPlaying ? (
                <PauseIcon sx={{ height: 38, width: 38 }} />
              ) : (
                <PlayArrowIcon sx={{ height: 38, width: 38 }} />
              )}
            </IconButton>
            <IconButton aria-label="next">
              {theme.direction === "rtl" ? <SkipPreviousIcon /> : <SkipNextIcon />}
            </IconButton>
          </Box>
        </Box>
        <CardMedia
          component="img"
          sx={{
            width: 151,
            transition: "transform 0.8s ease",
            transform: isRotating ? "rotate(360deg)" : "rotate(0deg)", // Rotate based on state
          }}
          image={require("./Assets/pokeball.png")}
          alt="Live from space album cover"
        />
      </Card>
      <audio ref={audioRef} src={require("./Assets/Pokemon.mp3")} />
    </div>
  );
}
