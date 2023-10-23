import { Link, useNavigate, useParams } from 'react-router-dom';
import style from './editUser.module.scss';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import Loader from '../../Components/Loader';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    username: ""
  });

  useEffect(() => {
    async function getUser() {
      try {
        const { data } = await axios.get(`/users/${id}`);

        setValues({
          first_name: data.first_name,
          last_name: data.last_name,
          gender: data.gender,
          username: data.username
        })
        setLoading(false);
      } catch (error) {
        toast(error.response.data.error, { type: "error" });
        navigate("/");
      };
    };

    getUser();
  }, []);

  async function submit(e) {
    e.preventDefault();
    if (values.first_name.length < 1) return toast("Минимальная длина имени 1 символа", { type: "error" })

    if (values.last_name.length < 1) return toast("Минимальная длина фамилии 1 символа", { type: "error" })

    if (values.gender === "") return toast("Выберите пол", { type: "error" })

    if (values.username.length < 3) return toast("Минимальная длина username 3 символа", { type: "error" });

    try {
      setLoading(true);
      await axios.patch(`/users/${id}`, values);

      toast("Успешно отредактирован", { type: "success" });
      navigate(-1);
    } catch (error) {
      toast(error.response.data.error, { type: "error" });
      setLoading(false);
    }
  };

  function handleInputChange(e) {
    setValues(ov => ({ ...ov, [e.target.name]: e.target.value }));
  };

  function back() {
    navigate(-1);
  };

  return (loading
    ? <Loader />
    : <div className={style["editUser"]}>
      <div className="container">
        <div className={style["editUser__content"]}>
          <div className={style["editUser__content-buttons"]}>
            <button onClick={back} className={style["editUser__content-button"]}>Назад</button>
          </div>
          <form onSubmit={submit} className={style["editUser__content-form"]}>

            <h2 className={style["editUser__content-title"]}>
              Редактировать
            </h2>

            <input
              className={style["editUser__content-input"]}
              type="text"
              placeholder='Имя'
              name='first_name'
              value={values.first_name}
              onChange={handleInputChange}
            />

            <input
              className={style["editUser__content-input"]}
              type="text"
              placeholder='Фамилия'
              name='last_name'
              value={values.last_name}
              onChange={handleInputChange}
            />

            <div className={style["editUser__content-gender"]}>
              <div className={style["editUser__content-item"]}>
                <input
                  type="radio"
                  id='male'
                  name='gender'
                  value="male"
                  onChange={handleInputChange}
                />
                <i className="fa-solid fa-person"></i>
              </div>

              <div className={style["editUser__content-item"]}>
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
              className={style["editUser__content-input"]}
              type="text"
              placeholder='Username'
              name='username'
              value={values.username}
              onChange={handleInputChange}
            />

            <button type="submit">
              Редактировать
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUser;