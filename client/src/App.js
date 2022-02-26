import './App.css';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';

//- Notes:
//- For <Route>: path='/' exact component={Home}, means that we want to set
//-   the home entry '/' of our webpage to exactly one route. That route is the
//-   the path to the Home page.
//-
//- For component prop in <Route>: In V6, you can't use the component prop
//-   anymore. It was replaced in favor of element.
//-
//- For Switch from react-router-dom: In react-router-dom v6, "Switch" is
//-   replaced by "Routes".

function App() {
  return (
    <div className='App'>
      <Router>
        <div className='navbar'>
          <Link to="/">Home Page</Link>
          <Link to="/createpost">Create A Post</Link>
        </div>
        <Routes>
          {/* <Route path='/' exact component={Home} /> */}
          <Route path='/' exact element={<Home />} />
          <Route path='/createpost' exact element={<CreatePost />} />
          <Route path='/post/:id' exact element={<Post/ >} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
