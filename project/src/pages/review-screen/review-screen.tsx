import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ChangeEvent, FormEvent, useState } from 'react';

import type { CommentAuth } from '../../types/film';
import HeaderUserBlock from '../../components/header-user-block/header-user-block';
import Logo from '../../components/logo/logo';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import { AppRoute, MAX_COMMENT_LENGTH, MIN_COMMENT_LENGTH } from '../../const';
import Rating from '../../components/rating/rating';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postCommentAction } from '../../store/api-actions';
import { getFilm } from '../../store/film-data/selectors';

type formData = Omit<CommentAuth, 'id'>

const ReviewScreen = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const film = useAppSelector(getFilm);
  const [formData, setFormData] = useState<formData>({
    rating: 0,
    comment: '',
  });

  const ratingChangeHandle =
    ({ target }: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, rating: +target.value });
  const commentChangeHandle =
    ({ target }: ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, comment: target.value });


  if (!film) {
    return <NotFoundScreen />;
  }

  const { id, name, posterImage, backgroundImage, backgroundColor } = film;

  const formSubmitHandle = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    dispatch(postCommentAction({ id, ...formData }));
  };

  return (
    <>
      <Helmet>
        <title>WTW. Review</title>
      </Helmet>

      <section className="film-card film-card--full" style={{ backgroundColor: backgroundColor }} data-testid="review-screen">
        <div className="film-card__header">
          <div className="film-card__bg">
            <img src={backgroundImage} alt={name} data-testid="background-image" />
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
            <img src={posterImage} alt={`${name} poster`} width="218" height="327" data-testid="poster" />
          </div>
        </div>

        <div className="add-review">
          <form
            action="#" className="add-review__form"
            onSubmit={formSubmitHandle}
          >
            <Rating onChange={ratingChangeHandle} />
            <div className="add-review__text">
              <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text"
                onChange={commentChangeHandle}
              >
              </textarea>
              <div className="add-review__submit">
                <button
                  className="add-review__btn"
                  type="submit"
                  disabled={!formData.rating || (formData.comment.length < MIN_COMMENT_LENGTH || formData.comment.length > MAX_COMMENT_LENGTH)}
                >
                  Post
                </button>
              </div>
            </div>
          </form>
        </div>

      </section>
    </>
  );
};

export default ReviewScreen;
