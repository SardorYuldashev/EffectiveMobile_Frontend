import { Link, useNavigate } from 'react-router-dom';
import style from './register.module.scss';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import Loader from '../../Components/Loader';

const Register = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    username: "",
    password: ""
  });


  useEffect(() => {
    if (token) return navigate("/");

    setLoading(false);
  }, []);

  async function submit(e) {
    e.preventDefault();
    if(values.first_name.length <1) return toast("Минимальная длина имени 1 символа", { type: "error" })

    if(values.last_name.length <1) return toast("Минимальная длина фамилии 1 символа", { type: "error" })

    if(values.gender === "") return toast("Выберите пол", { type: "error" })

    if (values.username.length < 3) return toast("Минимальная длина username 3 символа", { type: "error" });
    
    if (values.password.length < 3) return toast("Минимальная длина password 4 символа", { type: "error" });

    try {
      setLoading(true);
      await axios.post("/users", values);

      toast("Регистрация прошла успешно. Можете войти в профиль", {type: "success"});
      navigate("/login");
    } catch (error) {
      toast(error.response.data.error, { type: "error" });
      setLoading(false);
    }
  };

  function handleInputChange(e) {
    setValues(ov => ({ ...ov, [e.target.name]: e.target.value }));
  };

  return (loading
    ? <Loader />
    : <div className={style["register"]}>
      <div className="container">
        <div className={style["register__content"]}>
          <form onSubmit={submit} className={style["register__content-form"]}>
            <h2 className={style["register__content-title"]}>
              Регистрация
            </h2>

            <input
              className={style["register__content-input"]}
              type="text"
              placeholder='Имя'
              name='first_name'
              value={values.first_name}
              onChange={handleInputChange}
            />

            <input
              className={style["register__content-input"]}
              type="text"
              placeholder='Фамилия'
              name='last_name'
              value={values.last_name}
              onChange={handleInputChange}
            />

            <div className={style["register__content-gender"]}>
              <div className={style["register__content-item"]}>
                <input
                  type="radio"
                  id='male'
                  name='gender'
                  value="male"
                  onChange={handleInputChange}
                />
                <i className="fa-solid fa-person"></i>
              </div>

              <div className={style["register__content-item"]}>
                <input
                  type="radio"
                  id='female'
                  name='gender'
                  value="female"
                  onChange={handleInputChange}
                />
                <i className="fa-solid fa-person-dress"></i>
              </div>
            </div>

            <input
              className={style["register__content-input"]}
              type="text"
              placeholder='Username'
              name='username'
              value={values.username}
              onChange={handleInputChange}
            />

            <input
              className={style["register__content-input"]}
              type="password"
              placeholder='Password'
              name='password'
              value={values.password}
              onChange={handleInputChange}
            />

            <button type="submit">
              Регистрация
            </button>

            <Link to={"/login"} className={style["register__content-register"]}>
              Войти в профиль
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;