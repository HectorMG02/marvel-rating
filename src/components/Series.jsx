import React from "react";
import FilmCard from "./FilmCard";

const Series = () => {
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    setCards([
      {
        id: 1,
        title: "The Shawshank Redemption",
      },
      {
        id: 2,
        title: "The Godfather",
      },
      {
        id: 3,
        title: "The Godfather: Part II",
      },
      {
        id: 4,
        title: "The Dark Knight",
      },
    ]);
  }, []);

  return (
    <div className="container my-5">
      <h3 className="text-center">Series de Márvel</h3>
      <hr />

      <div className="row mt-5">
        {cards.map((card) => (
          <FilmCard />
        ))}
      </div>
    </div>
  );
};

export default Series;
