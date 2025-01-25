import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {logoutUser} from '../features/authSlice';
const Header = () => {
  const dispatch = useDispatch();
  const {isAuthenticated, user} = useSelector((state)=> ({
    isAuthenticated: !!state.auth.token,
    user: state.auth.user,
  }))
  const handleLogout = ()=>{
    dispatch(logoutUser());
  }
  return (
    <header className="bg-white shadow">
      {/* Title */}
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          Ecommerce
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-gray-600 hover:text-gray-800">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="text-gray-600 hover:text-gray-800">
                Products
              </Link>
            </li>
            {!isAuthenticated ? (
              <>
              <li>
              <Link to="/login" className="text-gray-600 hover:text-gray-800">
                Login
              </Link>
              </li>
              <li>
              <Link to="/register" className="text-gray-600 hover:text-gray-800">
                Register
              </Link>
              </li>
              </>
            ): (
              <>
              <li>
                <span className="text-gray-600">Welcome, {user?.name || 'User'}</span>
              </li>
              <li>
                <button onClick={handleLogout} className="text-gray-600 hover:text-red-600">Logout</button>
              </li>
              </>
            )}
          </ul>
        </nav>
      </div>
      {/* links */}
    </header>
  );
};

export default Header;
