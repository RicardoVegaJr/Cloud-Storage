import "../../blocks/Main.css";
import MainWallpaper from "../assets/HomeWallpaper.jpg";
import Login from "./Login";

function Main({ onLogin
}) {
  return (
    <main className="main-page">
      <div className="main-page__image-wrapper">
        <img
          src={MainWallpaper}
          className="main-page__image"
          alt="Main Wallpaper"
        />
      </div>
       <h1 className="main_title">Cloud File Storage</h1>
       <Login onLogin={onLogin} />
    </main>
  );
}

export default Main;