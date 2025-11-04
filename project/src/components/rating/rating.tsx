import { ChangeEvent, Fragment } from 'react';

type RatingProps = {
  onChange: ({ target }: ChangeEvent<HTMLInputElement>) => void;
}

const Rating = ({ onChange }: RatingProps): JSX.Element => (
  <div className="rating" data-testid="rating">
    <div className="rating__stars" onChange={onChange} data-testid="rating-stars">
      {Array.from({ length: 10 }, (_, i) => i + 1)
        .sort((a, b) => b - a)
        .map((i) => (
          <Fragment key={i}>
            <input className="rating__input" id={`star-${i}`} type="radio" name="rating" value={i} />
            <label className="rating__label" htmlFor={`star-${i}`}>Rating {i}</label>
          </Fragment>
        ))}
    </div>
  </div>
);

export default Rating;
