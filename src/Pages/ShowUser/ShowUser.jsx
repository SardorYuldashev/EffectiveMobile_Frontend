import { Link, useNavigate, useParams } from 'react-router-dom';
import style from './showUser.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loader from '../../Components/Loader';
import Actions from '../../Components/Actions';

const ShowUser = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    async function getUser() {
      try {
        const { data } = await axios.get(`/users/${id}`);

        setUser(data);
        setLoading(false);
      } catch (error) {
        toast(error.response.data.error, { type: "error" });
        navigate("/");
      };
    };
    getUser();
  }, []);

  async function deleteUser(arg) {
    let question = confirm("Вы действительно хотите удалить пользователя?");
    if (!question) return;

    setLoading(true);
    try {
      await axios.delete(`/users/${arg}`);
      toast("Пользователь удален", { type: "success" });
      navigate("/");
    } catch (error) {
      toast(error.response.data.error, { type: "error" });
      setLoading(false);
    };
  };

  return (loading
    ? <Loader />
    : <div className={style["showUser"]}>
      <div className="container">
        <div className={style["showUser__content"]}>
          <div className={style["showUser__content-buttons"]}>
            <Link to={"/"} className={style["showUser__content-button"]}>
              Назад
            </Link>

            <Link to={`/user/edit/${id}`} className={style["showUser__content-button"]}>
              <i className="fa-solid fa-pencil"></i>
            </Link>

            <Link to={`/user/password/${id}`} className={style["showUser__content-button"]}>
              <i className="fa-solid fa-key"></i>
            </Link>

            <button
              onClick={() => { deleteUser(id) }}
              className={`${style["showUser__content-button"]} ${style["showUser__content-delete"]}`}
            >
              <i className="fa-regular fa-trash-can"></i>
            </button>
          </div>

          <div className={style["showUser__content-items"]}>
            <div className={style["showUser__content-item"]}>
              <p>
                ID: <span>{user.id}</span>
              </p>

              <p>
                Username: <span>{user.username}</span>
              </p>
            </div>

            <div className={style["showUser__content-item"]}>
              <p>
                Пользователь: <span>{user.first_name} {user.last_name}</span>
              </p>

              <p>
                Пол: <span>{user.gender === "male" ? "Мужчина" : "Женщина"}</span>
              </p>
            </div>
          </div>

          <Actions id={id} />          
        </div>
      </div>
    </div>
  );
};

export default ShowUser;