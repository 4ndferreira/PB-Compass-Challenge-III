import LinkViewMore from './LinkViewMore'
import classes from './Card.module.css'

const Card = () => {
  return (
    <div className={classes.cardContainer}>
      <img src="/img/image5.png" alt="" />
      <div>
        <h4>TMA-2 HD Wireless</h4>
        <p className={classes.cardContainerText}>USD 350</p>
      </div>
      <div className={classes.cardReview}>
        <LinkViewMore />
      </div>
    </div>
  )
}

export default Card