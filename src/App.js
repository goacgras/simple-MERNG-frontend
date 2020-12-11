import { useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import MenuBar from './components/MenuBar';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';

function App() {
    const pathname = window.location.pathname;
    const path = pathname === '/' ? '/home' : pathname.substr(1);
    const [activeItem, setActiveItem] = useState(path);

    const handleItemClick = (name) => {
        setActiveItem(name);
    };

    // console.log(activeItem);
    return (
        <BrowserRouter>
            <Container>
                <MenuBar
                    handleItemClick={handleItemClick}
                    activeItem={activeItem}
                />
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
            </Container>
        </BrowserRouter>
    );
}

export default App;
