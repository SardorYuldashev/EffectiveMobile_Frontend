import { Routes, Route } from 'react-router-dom';
import Layout from './Pages/Layout';
import Dashboard from './Pages/Dashboard';
import NotFound from './Pages/NotFound';
import Login from './Pages/Login';
import Register from './Pages/Register';
import AddUser from './Pages/AddUser';
import ShowUser from './Pages/ShowUser';
import EditUser from './Pages/EditUser';
import EditPassword from './Pages/EditPassword';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Dashboard />} />
          <Route path='/user/add' element={<AddUser />} />
          <Route path='/user/password/:id' element={<EditPassword />} />
          <Route path='/user/edit/:id' element={<EditUser />} />
          <Route path='/user/:id' element={<ShowUser />} />
        </Route>

        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;