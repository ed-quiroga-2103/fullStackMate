import React from 'react';
import { Box } from '@chakra-ui/react';
import '@fontsource/alata';
import '@fontsource/roboto';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './views/Home';
import Login from './views/Login';
import About from './views/About';
import Profile from './views/Profile';
import Contact from './views/Contact';
import Video from './views/Video';
import Test from './views/Test';

function App() {
    return (
        <> 
        <title>Math App</title>
        <Router>
            <Navbar />
            <Box w="100%" p={4}>
                <Switch>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/profile">
                        <Profile />
                    </Route>
                    <Route path="/about">
                        <About />
                    </Route>
                    <Route path="/contact">
                        <Contact />
                    </Route>
                    <Route path="/video">
                        <Video />
                    </Route>
                    <Route path="/test">
                        <Test />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </Box>
        </Router>
        </>
    );
}



export default App;