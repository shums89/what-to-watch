import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';

import type { CommentAuth } from '../../types/film';
import HeaderUserBlock from '../../components/header-user-block/header-user-block';
import Logo from '../../components/logo/logo';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import { AppRoute, MAX_COMMENT_LENGTH, MIN_COMMENT_LENGTH, SubmitStatus } from '../../const';
import Rating from '../../components/rating/rating';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFilmAction, postCommentAction } from '../../store/api-actions';
import { getCommentStatus, getFilm, getIsFilmLoading } from '../../store/film-data/selectors';
import Spinner from '../../components/spinner/spinner';

const ReviewScreen = (): JSX.Element => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const film = useAppSelector(getFilm);
  const isFilmDataLoading = useAppSelector(getIsFilmLoading);
  const submitStatus = useAppSelector(getCommentStatus);
  const [rating, setRating] = useState<CommentAuth['rating']>(0);
  const [comment, setComment] = useState<CommentAuth['comment']>('');
  const [commentLength, setCommentLength] = useState(0);
  const isSubmiting = submitStatus === SubmitStatus.Pending;
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const { id } = params;
    if (id) {
      const parsedId = Number(id);
      dispatch(fetchFilmAction(parsedId));
    }
  }, [params, dispatch]);

  const ratingChangeHandle = ({ target }: ChangeEvent<HTMLInputElement>) => setRating(Number(target.value));
  const commentChangeHandle = ({ target }: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(target.value);
    setCommentLength(target.value.length);
  };

  if (isFilmDataLoading) {
    return <Spinner />;
  }

  if (!film) {
    return <NotFoundScreen />;
  }

  const { id, name, posterImage, backgroundImage, backgroundColor } = film;

  const formSubmitHandle = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    dispatch(postCommentAction({ id, rating, comment }));
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
              <textarea
                className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text"
                onChange={commentChangeHandle}
                disabled={isSubmiting}
                ref={textareaRef}
              >
              </textarea>
              <div className="add-review__submit" style={{ justifyContent: 'space-between' }}>
                <span style={{ color: '#866866', opacity: 0.5 }}>{commentLength}/{MAX_COMMENT_LENGTH}</span>
                <button
                  className="add-review__btn"
                  type="submit"
                  disabled={isSubmiting || !rating || (comment.length < MIN_COMMENT_LENGTH || comment.length > MAX_COMMENT_LENGTH)}
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
