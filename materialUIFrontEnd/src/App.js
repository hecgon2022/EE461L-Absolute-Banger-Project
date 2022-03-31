import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import Home from './Pages/Home';
import Projects from './Pages/Projects';
import Datasets from './Pages/Datasets';
import Profile from './Pages/Profile';
import Login from './Pages/Login';
import Layout from './Components/Layout';
import Signup from './Pages/Signup';

const theme = createTheme({



})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/Projects" element={<Projects />} />
            <Route exact path="/Datasets" element={<Datasets />} />
            <Route exact path="/Profile" element={<Profile />} />
            <Route exact path="/Login" element={<Login />} />
            <Route exact path="/Signup" element={<Signup />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
