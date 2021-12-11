import React from "react";
import FilmCard from "./FilmCard";
import moment from "moment";
import { FilterContext } from "../context/FilterProvider";

const Pelis = () => {
  const { filter, setFilter, user } = React.useContext(FilterContext);
  const [cards, setCards] = React.useState([]);
  const [copy, setCopy] = React.useState([]);

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
        setCopy(films_data);
      });
  }, []);

  // when filter value change, return the cards with the filter text
  // detect the change
  React.useEffect(() => {
    if (filter) {
      let cards_filter = copy.filter((card) => {
        const { title, overview } = card;
        const title_lower = title.toLowerCase();
        // const overview_lower = overview.toLowerCase();
        const filter_lower = filter.toLowerCase();

        if (title_lower.includes(filter_lower)) return card;
      });

      setCards(cards_filter);
    }
  }, [filter]);

  return (
    <div className="container my-5">
      {!user.estado ? (
        <h3 className="text-center">Inicia sesión para ver las pelis🍿</h3>
      ) : (
        <div>
          <h3 className="text-center">Películas de Márvel</h3>
          <hr />

          <div className="row mt-5">
            {cards.map((card) => (
              <div key={card.id} className="col-md-4 col-xs-12 my-3">
                <FilmCard card={card} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Pelis;
