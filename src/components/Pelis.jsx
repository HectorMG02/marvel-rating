import React from "react";
import FilmCard from "./FilmCard";
import moment from "moment";

const Pelis = () => {
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    const url =
      "https://mcuapi.herokuapp.com/api/v1/movies?page=1&order=chronology%2CDESC";

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let films_data = data.data;

        films_data = films_data.filter((film) => {
          let film_date = film.release_date;
          if (!film_date) return false;

          let today = moment().format("YYYY-MM-DD");
          let filmIsAfterToday = moment(film_date).isAfter(today);

          if (!filmIsAfterToday) return film;
        });

        setCards(films_data);
      });
  }, []);

  return (
    <div className="container my-5">
      <h3 className="text-center">Películas de Márvel</h3>
      <hr />

      <div className="row mt-5">
        {cards.map((card) => (
          <div className="col-md-4 col-xs-12 my-3">
            <FilmCard card={card} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pelis;
