import { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Routes, Link, BrowserRouter } from 'react-router-dom';
import './App.css';
import AddSecretpost from './components/AddSecretpost/AddSecretpost';
import SecretpostList from './components/SecretpostList/SecretpostList';
import Home from './components/Home/Home';
import BrandLogo from './brand-logo.svg';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';
import Register from './components/Register/Register';

function App() {
  const [postList, setPostList] = useState([]);
  const [userLogin, setUserLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [activeTab, setActivetab] = useState('');
  const [messagesLoading, setMessagesLoading] = useState(true);

  useEffect(() => {
    axios.get("https://user-authentication-system-ecc2.vercel.app/message-list").then((response) => {
      setPostList(response.data);
      setMessagesLoading(false);
    });
  }, []);

  return (
    <BrowserRouter>
      <div className="container">
        <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
          <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0 nav-underline align-items-center">
            <li><img src={BrandLogo} className="brand-logo-image" alt="Secret Post Logo"></img></li>
          </ul>
          <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0 nav-underline align-items-center">
            <li><Link className={`nav-link px-2 link-dark ${activeTab === 'home' ? 'active' : ''}`} to="/" onClick={(e) => setActivetab('home')}>Home</Link></li>
            <li><Link className={`nav-link px-2 link-dark ${activeTab === 'secret-posts' ? 'active' : ''}`} to="/secret-posts" onClick={(e) => setActivetab('secret-posts')}>Secret Posts</Link></li>
            <li><Link className={`nav-link px-2 link-dark ${activeTab === 'add-post' ? 'active' : ''}`} to="/add-post" onClick={(e) => setActivetab('add-post')}>Add a Post</Link></li>
          </ul>
          <div className="col-md-3 text-end">
            {!userLogin ? 
              <Link to="/login"><button type="button" className="btn btn-outline-primary me-2" onClick={() => setActivetab('')}>Login</button></Link>
            : <Link to="/logout"><button type="button" className="btn btn-outline-primary me-2" onClick={() => {setUserLogin(false); setActivetab('')}}>Logout</button></Link>
            }
            {(!userLogin) && (<Link to="/register"><button type="button" className="btn btn-primary" onClick={() => setActivetab('')}>Sign-up</button></Link>)}
          </div>
        </header>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/secret-posts" element={<SecretpostList postList={postList} messagesLoading={messagesLoading}/>} />
            <Route path="/add-post" element={<AddSecretpost postList={postList} setPostList={setPostList} userLogin={userLogin} username={username}/>}/>
            <Route path="/login" element={<Login userLogin={userLogin} setUserLogin={setUserLogin} setUsername={setUsername}/>} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
        </Routes>
      </div>
  </BrowserRouter>
  );
}

export default App;
