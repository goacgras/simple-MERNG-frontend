import { useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { AuthProvider } from './context/auth';
import AuthRoutes from './util/AuthRoutes';
import MenuBar from './components/MenuBar';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import SinglePost from './Pages/SinglePost';

function App() {
    const pathname = window.location.pathname;
    const path = pathname === '/' ? '/home' : pathname.substr(1);
    const [activeItem, setActiveItem] = useState(path);

    const handleItemClick = (name) => {
        setActiveItem(name);
    };

    return (
        <AuthProvider>
            <BrowserRouter>
                <Container>
                    <MenuBar
                        handleItemClick={handleItemClick}
                        activeItem={activeItem}
                    />
                    <Route exact path="/" component={Home} />
                    <AuthRoutes exact path="/login" component={Login} />
                    <AuthRoutes exact path="/register" component={Register} />
                    <Route exact path="/posts/:postId" component={SinglePost} />
                </Container>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
