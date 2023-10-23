import style from './editPasswor.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import Loader from '../../Components/Loader';

const EditPassword = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState({
    password: "",
    confirm: ""
  });


  useEffect(() => {
    setLoading(false);
  }, []);

  async function submit(e) {
    e.preventDefault();

    if (values.password.length < 4 || values.confirm.length < 4) return toast("Минимальная длина password и confirm 4 символа", { type: "error" });

    if (values.password !== values.confirm) return toast("Пароли не сходятся", { type: "error" });

    try {
      setLoading(true);
      await axios.patch(`/users/${id}`, { password: values.password });

      toast("Пароль изменён", { type: "success" });
      navigate(-1);
    } catch (error) {
      toast(error.response.data.error, { type: "error" });
      setLoading(false);
    };
  };

  function handleInputChange(e) {
    setValues(ov => ({ ...ov, [e.target.name]: e.target.value }));
  };

  function back() {
    navigate(-1);
  };

  return (loading
    ? <Loader />
    : <div className={style["editPassword"]}>
      <div className="container">
        <div className={style["editPassword__content"]}>
          <div className={style["editPassword__content-buttons"]}>
            <button onClick={back} className={style["editPassword__content-button"]}>Назад</button>
          </div>

          <form onSubmit={submit} className={style["editPassword__content-form"]}>
            <h2 className={style["editPassword__content-title"]}>
              Сменить пароль
            </h2>

            <input
              className={style["editPassword__content-input"]}
              type="password"
              placeholder='Password'
              name='password'
              value={values.password}
              onChange={handleInputChange}
            />

            <input
              className={style["editPassword__content-input"]}
              type="password"
              placeholder='Confirm password'
              name='confirm'
              value={values.confirm}
              onChange={handleInputChange}
            />

            <button type="submit">
              Сменить пароль
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPassword;