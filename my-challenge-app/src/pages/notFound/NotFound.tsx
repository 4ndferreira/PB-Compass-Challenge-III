import { Link } from 'react-router-dom';
import IconAlert from '../../components/iconAlert/IconAlert';
import classes from './NotFound.module.css'

const NotFound = () => {
  return (
    <div className={classes.notFoundMessage}>
      <IconAlert width={"96"} height={"96"} />
      <h1 className={classes.notFoundText}>404 - Page Not Found</h1>
      <Link to={"/"} className={classes.notFoundLink}>
        Get me out of here!
      </Link>
    </div>
  );
}

export default NotFound