import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import Home from './Pages/Home';
import Projects from './Pages/Projects';
import Datasets from './Pages/Datasets';
import Login from './Pages/Login';
import Layout from './Components/Layout';
import Signup from './Pages/Signup';

const theme = createTheme({



})

function App() {

  const [currGlobalUser, setGlobalUser] = useState("Guest");
  const [loginStatus, setLoginStatus] = useState('Log In')

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout user={currGlobalUser} setUser={setGlobalUser} loginStatus={loginStatus} setLoginStatus={setLoginStatus}>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/Projects" element={<Projects />} />
            <Route exact path="/Datasets" element={<Datasets />} />
            <Route exact path="/Login" element={<Login setGlobalUser={setGlobalUser} setLoginStatus={setLoginStatus} />} />
            <Route exact path="/Signup" element={<Signup setGlobalUser={setGlobalUser} setLoginStatus={setLoginStatus} />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider >
  );
}

export default App;
