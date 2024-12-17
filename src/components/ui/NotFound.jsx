import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="not-found">
    <h2>Lo sentimos, esta página no existe.</h2>
    <Link to="/">Volver al inicio</Link>
  </div>
);

export default NotFound;
