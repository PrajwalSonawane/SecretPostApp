import { useState } from 'react';
import './App.css';
import AddSecretpost from './components/AddSecretpost/AddSecretpost';
import SecretpostList from './components/SecretpostList/SecretpostList';

function App() {
  const [postList, setPostList] = useState([{message: "2028 is a leap year"}, {message: "cats are better than dogs"}]);
  const [currentTab, setCurrentTab] = useState('secret-posts');

  const handleTabChange = (e, currentTab) => {
    e.preventDefault();
    setCurrentTab(currentTab);
  };

  return (
    <div className="container">
    <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
      <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0 nav-underline">
        <li><a href="#" className={`nav-link px-2 ${currentTab === 'secret-posts' ? 'link-secondary' : 'link-dark'}`} onClick={(e) => handleTabChange(e, 'secret-posts')}>Secret Posts</a></li>
        <li><a href="#" className={`nav-link px-2 ${currentTab === 'add-post' ? 'link-secondary' : 'link-dark'}`}  onClick={(e) => handleTabChange(e, 'add-post')}>Add a Post</a></li>
      </ul>
      <div className="col-md-3 text-end">
        <button type="button" className="btn btn-outline-primary me-2">Login</button>
        <button type="button" className="btn btn-primary">Sign-up</button>
      </div>
    </header>
    <div className="container">
      {currentTab ==='secret-posts' ? <SecretpostList postList={postList}></SecretpostList> : null}
      {currentTab === 'add-post' ? <AddSecretpost postList={postList}></AddSecretpost> : null}
    </div>
  </div>
  );
}

export default App;
