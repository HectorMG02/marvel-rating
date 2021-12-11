import React from "react";
import MarvelCard from "./MarvelCard";
import moment from "moment";
import { FilterContext } from "../context/FilterProvider";

const Series = () => {
  const { filter, setFilter, user } = React.useContext(FilterContext);
  const [cards, setCards] = React.useState([]);
  const [copy, setCopy] = React.useState([]);

  React.useEffect(async () => {
    const url =
      "https://mcuapi.herokuapp.com/api/v1/tvshows?order=release_date%2CDESC";

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let series_data = data.data.sort((a, b) => {
          return moment(b.release_date).diff(moment(a.release_date));
        });

        series_data = series_data.filter((film) => {
          let film_date = film.release_date;
          if (!film_date) return false;

          let today = moment().format("YYYY-MM-DD");
          let serieIsAfterToday = moment(film_date).isAfter(today);

          if (!serieIsAfterToday) return film;
        });

        setCards(series_data);
        setCopy(series_data);
      });
  }, []);

  React.useEffect(() => {
    let cards_filter = copy.filter((card) => {
      const { title, overview } = card;
      const title_lower = title.toLowerCase();
      const filter_lower = filter.toLowerCase();

      if (title_lower.includes(filter_lower)) return card;
    });

    setCards(cards_filter);
  }, [filter]);

  return (
    <div className="container my-5">
      {!user.estado ? (
        <h3 className="text-center">Inicia sesión para ver las series🍿</h3>
      ) : (
        <div>
          <h3 className="text-center">Series de Márvel</h3>
          <hr />

          <div className="row mt-5">
            {cards.map((card) => (
              <div key={card.id} className="col-md-4 col-xs-12 my-3">
                <MarvelCard card={card} type="serie" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Series;
