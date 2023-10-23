import style from './dashboard.module.scss';
import Loader from './../../Components/Loader';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link } from 'react-router-dom';
import male from '../../assets/images/male.webp'
import female from '../../assets/images/female.webp'

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState({});
  const [pageArr, setPageArr] = useState(null);
  const [offset, setOffset] = useState(10);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    async function getUsers() {
      try {
        const { data } = await axios.get("/users");
        setUsers(data);

        const pageList = [];
        for (let i = 0; i < Math.ceil(data.pageInfo.total / offset); i++) {
          pageList.push(i + 1);
        };
        setPageArr(pageList);
        setLoading(false);
      } catch (error) {
        toast(error.response.data.error, { type: "error" });
      };
    };
    getUsers();
  }, [refresh]);

  function handleButton(e) {
    setOffset((e.target.value - 1) * 10);
  };

  async function submitForm(e) {
    e.preventDefault(e);
    setLoading(true);

    try {
      const { data } = await axios.get(`/users?page[offset]=${offset}&page[limit]=10`);
      setUsers(data);
    } catch (error) {
      toast(error.response.data.error, { type: "error" });
    };
    setLoading(false);
  };

  async function deleteUser(arg) {
    let question = confirm("Вы действительно хотите удалить пользователя?");
    if (!question) return;
    
    setLoading(true);
    try {
      await axios.delete(`/users/${arg}`);
      setRefresh(!refresh);
      toast("Пользователь удален", { type: "success" });
    } catch (error) {
      toast(error.response.data.error, { type: "error" });
    };
    setLoading(false);
  };

  return (
    <div className={style["dashboard"]}>
      <div className="container">
        <div className={style["dashboard__content"]}>
          <h1 className={style["dashboard__content-title"]}>
            Список пользователей
          </h1>

          {loading
            ? <Loader />
            : <div>

              <div className={style["dashboard__content-top"]}>
                <form onSubmit={submitForm} className={style["dashboard__content-pageList"]}>
                  {
                    pageArr.map(item => (
                      <button
                        type='submit'
                        key={item}
                        value={item}
                        name='offset'
                        onClick={handleButton}
                        className={style["dashboard__content-button"]}>
                        {item}
                      </button>
                    ))
                  }
                </form>

                <Link to={"/user/add"} className={style["dashboard__content-button"]}>
                  Добавит пользователя
                </Link>
              </div>

              <ul className={style["dashboard__content-list"]}>

                <li className={style["dashboard__content-li"]}>
                  <h2>ID</h2>
                  <h2>Имя</h2>
                  <h2>Фамилия</h2>
                  <h2>Пол</h2>
                  <h2>Username</h2>
                  <h2></h2>
                </li>

                {users.data.map((item) => (
                  <li key={item.id}>
                    <div className={style["dashboard__content-link"]}>
                      <p className={style["dashboard__content-id"]}>{item.id}</p>

                      <p>{item.first_name}</p>

                      <p>{item.last_name}</p>

                      <div className={style["dashboard__content-gender"]}>
                        {item.gender === "male"
                          ? <img src={male} alt="male" />
                          : <img src={female} alt="female" />
                        }
                      </div>

                      <p className={style["dashboard__content-username"]}>{item.username}</p>

                      <div className={style["dashboard__content-tools"]}>
                        <Link to={`/user/${item.id}`} className={style["dashboard__content-btn"]}>
                          <i className="fa-solid fa-eye"></i>
                        </Link>

                        <Link to={`/user/edit/${item.id}`} className={style["dashboard__content-btn"]}>
                          <i className="fa-solid fa-pencil"></i>
                        </Link>

                        <button onClick={() => { deleteUser(item.id) }} className={style["dashboard__content-btn"]}>
                          <i className="fa-regular fa-trash-can"></i>
                        </button>
                      </div>
                    </div>

                  </li>
                ))}
              </ul>

            </div>
          }
        </div>
      </div>

    </div>
  );
};

export default Dashboard;