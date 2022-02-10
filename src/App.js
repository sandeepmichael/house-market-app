import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Navbar from './components/Navbar'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Forgotpassword from './routes/Forgotpassword'
import PrivateRoute from './components/PrivateRoute';
import Home from './routes/Home'
import Offers from './routes/Offers'
import Category from './routes/Category';
import Profile from './routes/Profile'
import Signin from './routes/Signin'
import Signup from './routes/Signup'
import CreateListing from './routes/CreateListing';
import SingleListing from './routes/SingleListing';
import EditListing from './routes/EditListing'

function App() {
  return (
    <div>
        <Router>
         
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/offers' element={<Offers />} />
            <Route path='/category/:categoryName' element={<Category />}/>
            <Route path='/profile' element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
            </Route>
            <Route path='sign-in' element={<Signin />}/>
            <Route path='/sign-up' element={<Signup/>} />
            <Route path='/create-listing' element={<CreateListing />} />
            <Route  path='/edit-listing/:listingId' element={<EditListing />} />
            <Route path='/forgot-password' element={<Forgotpassword />} />
            <Route path='/category/:categoryName/:listingId' element={<SingleListing />}/>
          </Routes>
          <Navbar />
        </Router>
        <ToastContainer />
    </div>
  );
}

export default App;
