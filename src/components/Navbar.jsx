import { GoHome, GoSearch } from 'react-icons/go';
import { BiCategory } from 'react-icons/bi';
import { PiUserCircleLight } from 'react-icons/pi';
import { Link,NavLink } from 'react-router-dom';
import "../css/navbar.css";

function Navbar() {
  return (
    <nav className="sidebar">
      <NavLink to="/" className={({ isActive }) => `navItem ${isActive ? "active" : ""}`}>
        <GoHome size={24} />
        <span className="label">Home</span>
      </NavLink>
      
      <NavLink to="/search" className={({ isActive }) => `navItem ${isActive ? "active" : ""}`}>
        <GoSearch size={24} />
        <span className="label">Search</span>
      </NavLink>

      <NavLink to="/categories" className={({ isActive }) => `navItem ${isActive ? "active" : ""}`}>
        <BiCategory size={24} />
        <span className="label">Categories</span>
      </NavLink>

      <NavLink to="/profile" className={({ isActive }) => `navItem ${isActive ? "active" : ""}`}>
        <PiUserCircleLight size={24} />
        <span className="label">Profile</span>
      </NavLink>
    </nav>
  );
}

export default Navbar;
