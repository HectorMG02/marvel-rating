import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventIcon from "@mui/icons-material/Event";
import { FilterContext } from "../context/FilterProvider";
import { db } from "../firebase";

const MarvelCard = (props) => {
  const { card, type } = props;
  const { user } = React.useContext(FilterContext);
  const [rating, setRating] = React.useState(0);

  React.useEffect(async () => {
    const { uid } = user;
    const { id } = card;

    const snapshot = await db
      .collection("marvel-rating")
      .where("uid", "==", uid)
      .where(`${type}_id`, "==", id)
      .get();

    if (snapshot.empty) {
      if (type == "film") {
        db.collection("marvel-rating").add({
          uid: uid,
          film_id: id,
          rating: 0,
        });
      } else if (type == "serie") {
        db.collection("marvel-rating").add({
          uid: uid,
          serie_id: id,
          rating: 0,
        });
      }
    } else {
      const doc = snapshot.docs[0];
      const data = doc.data();

      setRating(data.rating);
    }
  }, []);

  const addRating = async (value) => {
    const { uid } = user;
    const { id } = card;

    await db
      .collection("marvel-rating")
      .where("uid", "==", uid)
      .where(`${type}_id`, "==", id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          db.collection("marvel-rating").doc(doc.id).update({
            rating: value,
          });
        });
      });
  };

  const changeRating = (val) => {
    setRating(val);
    addRating(val);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" image={card.cover_url} alt={card.title} />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {card.title}
        </Typography>

        <div className="text-muted">
          {type == "film" ? (
            <span>
              Duración: ({card.duration} min)
              <AccessTimeIcon size="small" />
              <br />
            </span>
          ) : null}
          Fecha de estreno: {card.release_date} <EventIcon fontSize="small" />
          <br />
          Fase: {card.phase}
          <br />
          {type === "film"
            ? `Escenas postcréditos: ${card.post_credit_scenes}`
            : null}
        </div>
        <hr />
        <Typography variant="body2" color="text.secondary">
          {card.overview}
        </Typography>
      </CardContent>
      <CardActions className="float-right">
        <Rating
          name="simple-controlled"
          value={rating}
          onChange={(event, newValue) => {
            changeRating(newValue);
          }}
        />
      </CardActions>
    </Card>
  );
};

export default MarvelCard;
