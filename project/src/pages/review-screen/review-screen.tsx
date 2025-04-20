import { Helmet } from 'react-helmet-async';
import HeaderUserBlock from '../../components/header-user-block/header-user-block';
import Logo from '../../components/logo/logo';
import { Link, useParams } from 'react-router-dom';
import { Film } from '../../types/film';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import { AppRoute } from '../../const';
import { ChangeEvent, MouseEvent, useState } from 'react';
import RatingElement from '../../components/rating-element/rating-element';

type ReviewScreenProps = {
  films: Film[];
};

type formData = {
  rating: number | null;
  review: string | null;
}

const ReviewScreen = ({ films }: ReviewScreenProps): JSX.Element => {
  const [formData, setFormData] = useState<formData>({
    rating: null,
    review: null,
  });

  const ratingChangeHandle = ({ target }: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, rating: +target.value });
  const reviewChangeHandle = ({ target }: ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, review: target.value });

  const formSubmitHandle = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
  };

  const params = useParams();
  const paramsId = params.id || 0;
  const id: number = Number.isInteger(+paramsId) ? +paramsId : 0;
  const film: Film = films.filter((el) => el.id === +id)[0];

  if (!film) {
    return <NotFoundScreen />;
  }

  const { name, posterImage, backgroundImage, backgroundColor } = film;

  return (
    <section className="film-card film-card--full" style={{ backgroundColor: backgroundColor }}>
      <Helmet>
        <title>WTW. Review</title>
      </Helmet>
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={backgroundImage} alt={name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo />

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`${AppRoute.Films}/${id}`} className="breadcrumbs__link">{name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <span className="breadcrumbs__link">Add review</span>
              </li>
            </ul>
          </nav>

          <HeaderUserBlock />
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={posterImage} alt={`${name} poster`} width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        <form action="#" className="add-review__form">
          <div className="rating">
            <div className="rating__stars" onChange={ratingChangeHandle}>
              {Array.from({ length: 10 }, (_, i) => i + 1)
                .sort((a, b) => b - a)
                .map((i) => (
                  <RatingElement key={i} rating={i} />
                ))}
            </div>
          </div>

          <div className="add-review__text">
            <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text"
              onChange={reviewChangeHandle}
            >
            </textarea>
            <div className="add-review__submit">
              <button className="add-review__btn" type="submit" onClick={formSubmitHandle}>Post</button>
            </div>
          </div>
        </form>
      </div>

    </section>
  );
};

export default ReviewScreen;
