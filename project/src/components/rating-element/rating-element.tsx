type RatingElementProps = {
  rating: number;
}

const RatingElement = ({ rating }: RatingElementProps): JSX.Element => (
  <>
    <input
      className="rating__input" id={`star-${rating}`} type="radio" name="rating" value={rating}
    />
    <label className="rating__label" htmlFor={`star-${rating}`}>Rating {rating}</label>
  </>
);

export default RatingElement;
