import { Link, useNavigate } from 'react-router-dom';
import style from './header.module.scss';
import { toast } from 'react-toastify';
import axios from 'axios';

const Header = () => {
  const user = localStorage.getItem("user");
  const navigate = useNavigate();

  async function logout() {
    let question = confirm("Вы действительно хотите выйти?");

    if (!question) return;

    try {
      await axios.get(`/users/logout`);
    } catch (error) {
      toast(error.response.data.error, { type: "error" });
    };

    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className={style["header"]}>
      <div className="container">
        <nav className={style["header__content"]}>
          <Link to={"/"} className={style["header__content-title"]}>
            Effective Mobile
          </Link>

          <div className={style["header__content-user"]}>
            <p>
              {user}
            </p>

            <button onClick={logout}>
              Выйти
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;