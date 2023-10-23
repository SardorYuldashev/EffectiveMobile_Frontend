import { Link, useNavigate } from 'react-router-dom';
import style from './login.module.scss';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import Loader from '../../Components/Loader';

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) return navigate("/");

    setLoading(false);
  }, []);

  async function log(e) {
    e.preventDefault();
    if (values.username.length < 3) return toast("Минимальная длина username 3 символа", { type: "error" });

    if (values.password.length < 3) return toast("Минимальная длина password 4 символа", { type: "error" });

    try {
      setLoading(true);
      let { data } = await axios.post("/users/login", values);

      localStorage.setItem("token", data.token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

      let user = await axios.get("/users/me");

      localStorage.setItem("user", `${user.data.first_name} ${user.data.last_name}`);

      toast("Добро пожаловать", { type: "success" });
      navigate("/");
    } catch (error) {
      toast(error.response.data.error, { type: "error" });
      setLoading(false);
    };
  };

  function handleInputChange(e) {
    setValues(ov => ({ ...ov, [e.target.name]: e.target.value }));
  };
  return (loading
    ? <Loader />
    : <div className={style["login"]}>
      <div className="container">
        <div className={style["login__content"]}>
          <form onSubmit={log} className={style["login__content-form"]}>
            <h2 className={style["login__content-title"]}>
              Войти в профиль
            </h2>

            <input
              className={style["login__content-input"]}
              type="text"
              placeholder='Username'
              name='username'
              value={values.username}
              onChange={handleInputChange}
            />

            <input
              className={style["login__content-input"]}
              type="password"
              placeholder='Password'
              name='password'
              value={values.password}
              onChange={handleInputChange}
            />

            <button type="submit">
              Войти
            </button>

            <Link to={"/register"} className={style["login__content-register"]}>
              Регистрация
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;