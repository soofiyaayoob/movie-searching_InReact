
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, logout, setSelectedMovies } from "../redux/actions";
import ViewAll from "../components/ViewAll/Viewall";

function Profile() {
  const user = useSelector((state) => state.user);
  const watchlist = useSelector((state) => state.watchlist);
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  // ⬇️ useEffect to set selected movies when watchlist changes
  useEffect(() => {
    if (watchlist.length > 0) {
      dispatch(setSelectedMovies(watchlist, "watchlist"));
    }
  }, [watchlist, dispatch]);

  const handleLogin = () => {
    if (name.trim() !== "") {
      dispatch(login({ name }));
      setName("");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="profile">
      {!user ? (
        <div className="login-box">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="login-input"
          />
          <button className="login-button" onClick={handleLogin}>
            Login
          </button>
        </div>
      ) : (
        <div className="profile-info">
          <div className="container">
            <div className="profile-icon">{`👤 ${user.name}`}</div>
            <div>
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>

          <div className="watchlist">
            
          {watchlist.length === 0 ? (
  <>
    <h2>Watchlist</h2>
    <p className="NoWatchList">No movies added.</p>
  </>
) : (
  <ViewAll />
)}

          </div>
        </div>
      )}
      {/* ... your styles ... */
      <style>{`
        .profile {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2rem;
          width: 100%;
          box-sizing: border-box;
        }
      
        .login-box {
          display: flex;
          flex-direction: row;
          gap: 1rem;
          align-items: center;
        }
      
        .login-input {
          padding: 0.5rem 1rem;
          font-size: 1rem;
          border-radius: 8px;
          border: 1px solid #ccc;
          outline: none;
        }
      
       .login-button {
      padding: 0.5rem 1.5rem;
      font-size: 1rem;
      background-color: rgba(208, 194, 194, 0.71);
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      }
      
      .login-button:hover {
      border:2px solid white;
      }
      
        .profile-info {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          width: 100%;
        }
      
        .container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          padding: 1rem 1rem;
          box-sizing: border-box;
        }
      
        .profile-icon {
          font-size: 1.5rem;
          font-weight: bold;
        }
      
        .logout-button {
          padding: 0.5rem 1rem;
          background-color: red;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
        }
      
        .watchlist {
          width: 100%;
          position:relative;
        }
      
        .watchlist h2 {
          text-align: center;
        }
         .NoWatchList {
      background-color: rgba(128, 128, 128, 0.1); /* light gray with transparency */
      padding: 1rem;
      border-radius: 8px;
      text-align: center;
      color: #333;
      font-style: italic;
      }
      `}</style>}
    </div>
  );
}

export default Profile;


