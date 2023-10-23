import { useEffect, useState } from 'react';
import style from './actions.module.scss';
import { toast } from 'react-toastify';
import axios from 'axios';
import Loader from '../Loader';

const Actions = ({ id }) => {
  const [actionsArr, setActionsArr] = useState({});
  const [loading, setLoading] = useState(true);
  const [pageArr, setPageArr] = useState(null);
  const [offset, setOffset] = useState(10);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    async function getActions() {
      try {
        const { data } = await axios.get(`/activity/${id}`);
        setActionsArr(data);

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

    getActions();
  }, [refresh]);

  function handleButton(e) {
    setOffset((e.target.value - 1) * 10);
  };

  async function submitForm(e) {
    e.preventDefault(e);
    setLoading(true);

    try {
      const { data } = await axios.get(`/activity/${id}?page[offset]=${offset}&page[limit]=10`);
      setActionsArr(data);
    } catch (error) {
      toast(error.response.data.error, { type: "error" });
    };
    setLoading(false);
  };

  function timeStr(arg) {
    const time = new Date(arg);
    let hour = time.getHours();
    let minutes = time.getMinutes().toString();
    let seconds = time.getSeconds().toString();

    if (minutes.length === 1) {
      minutes = 0 + minutes;
    };

    if (seconds.length === 1) {
      seconds = 0 + seconds;
    };

    return `${hour}:${minutes}:${seconds}`;
  };

  return (loading
    ? <Loader />
    : <div className={style["actions"]}>
      <div className="container">
        <div className={style["actions__content"]}>
          <div className={style["actions__content-activity"]}>

            <h2 className={style["actions__content-title"]}>
              История действий пользователя
            </h2>

            <div className={style["actions__content-top"]}>
              <form onSubmit={submitForm} className={style["actions__content-pageList"]}>
                {
                  pageArr.map(item => (
                    <button
                      type='submit'
                      key={item}
                      value={item}
                      name='offset'
                      onClick={handleButton}
                      className={style["actions__content-button"]}>
                      {item}
                    </button>
                  ))
                }
              </form>
            </div>

            <ul className={style["actions__content-history"]}>
              <li className={style["actions__content-historyHead"]}>
                <p>Действия</p>
                <p>|</p>
                <p>Время</p>
                <p>|</p>
                <p>Дата</p>
              </li>

              {
                actionsArr.data.map((item) => (
                  <li key={item.id} className={style["actions__content-historyItem"]}>
                    <p>
                      {item.action === "register"
                        ? "Регистрация"
                        : item.action === "login"
                          ? "Вход"
                          : item.action === "logout"
                            ? "Выход"
                            : "Редактирование"}
                    </p>
                    <p>|</p>
                    <p>{timeStr(item.time)}</p>
                    <p>|</p>
                    <p>{item.time.split("T")[0]}</p>
                  </li>
                ))
              }

            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Actions;