import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../../Components/Header';
import { useEffect, useState } from 'react';
import Loader from '../../Components/Loader';

const Layout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return navigate("/login");

    setLoading(false);
  }, []);

  return (loading
    ? <Loader />
    : <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;