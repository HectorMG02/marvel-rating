import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Button } from "@material-ui/core";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventIcon from "@mui/icons-material/Event";

const FilmCard = (props) => {
  const { card } = props;
  const [rating, setRating] = React.useState(0);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" image={card.cover_url} alt={card.title} />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {card.title}
        </Typography>

        <div className="text-muted">
          Duración: ({card.duration} min)
          <AccessTimeIcon fontSize="small" />
          <br />
          Fecha de estreno: {card.release_date} <EventIcon fontSize="small" />
          <br />
          Fase: {card.phase}
          <br />
          Escenas postcréditos: {card.post_credit_scenes}
        </div>
        <hr />
        <Typography variant="body2" color="text.secondary">
          {card.overview}
        </Typography>
      </CardContent>
      <CardActions className="justify-content-between">
        <Rating
          name="simple-controlled"
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
        />
        <Button size="small">Editar</Button>
      </CardActions>
    </Card>
  );
};

export default FilmCard;
