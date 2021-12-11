import React from "react";
import FilmCard from "./FilmCard";
import moment from "moment";
import { FilterContext } from "../context/FilterProvider";

const Pelis = () => {
  const { filter, setFilter, user } = React.useContext(FilterContext);
  const [cards, setCards] = React.useState([]);
  const [copy, setCopy] = React.useState([]);
  const [orderBy, setOrderBy] = React.useState(0);

  const options = ["Fecha de salida", "Ordenar por fase"];

  React.useEffect(() => {
    const url =
      "https://mcuapi.herokuapp.com/api/v1/movies?page=1&order=chronology%2CDESC";

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let films_data = data.data.sort((a, b) => {
          return moment(b.release_date).diff(moment(a.release_date));
        });

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

  React.useEffect(() => {
    if (filter) {
      let cards_filter = copy.filter((card) => {
        const { title, overview } = card;
        const title_lower = title.toLowerCase();
        const filter_lower = filter.toLowerCase();

        if (title_lower.includes(filter_lower)) return card;
      });

      setCards(cards_filter);
    }
  }, [filter]);

  const changeOrderBy = (val) => {
    setOrderBy(Number(val));
    let cards_order = cards.sort((a, b) => {
      if (val == 0) {
        return moment(b.release_date).diff(moment(a.release_date));
      } else if (val == 1) {
        return a.phase - b.phase;
      }
    });

    setCards(cards_order);
  };

  return (
    <div className="container my-5">
      {!user.estado ? (
        <h3 className="text-center">Inicia sesión para ver las pelis🍿</h3>
      ) : (
        <div>
          <h3 className="text-center">Películas de Márvel 🍿</h3>
          <hr />

          <div className="row">
            <div className="col">
              <div className="float-right">
                <label className="text-muted">Ordenar por</label>
                <select
                  className="form-select form-control"
                  aria-label="Default select example"
                  value={orderBy}
                  onChange={(e) => changeOrderBy(e.target.value)}
                >
                  {options.map((option, index) => {
                    return (
                      <option key={index} value={index}>
                        {option}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>

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
