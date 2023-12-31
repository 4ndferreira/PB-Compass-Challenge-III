import IconStarFilled from "../icons/IconStarFilled";
import IconStarOutlined from "../icons/IconStarOutlined";
import classes from './StarRating.module.css'

const StarRating = (props: { rating: number; }) => {
  const rating = props.rating;
  return (
    <div className={classes.wrapper}>
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <span key={index}>
            {index <= rating ? <IconStarFilled /> : <IconStarOutlined />}
          </span>
        );
      })}
    </div>
  );
};

export default StarRating