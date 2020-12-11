// import { useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth';

const MenuBar = ({ activeItem, handleItemClick }) => {
    // const [activeItem, setActiveItem] = useState('');

    // const handleItemClick = (e, { name }) => {
    //     setActiveItem(name);
    // };

    // console.log('[FROM MENUBAR]');
    // console.log(activeItem);

    return (
        <AuthContext.Consumer>
            {(context) =>
                context.user ? (
                    <Menu pointing secondary size="massive" color="grey">
                        <Menu.Item
                            name={context.user.username}
                            active
                            as={Link}
                            to="/"
                        />

                        <Menu.Menu position="right">
                            <Menu.Item name="logout" onClick={context.logout} />
                        </Menu.Menu>
                    </Menu>
                ) : (
                    <Menu pointing secondary size="massive" color="grey">
                        <Menu.Item
                            name="home"
                            active={activeItem === 'home'}
                            onClick={handleItemClick.bind(this, 'home')}
                            as={Link}
                            to="/"
                        />

                        <Menu.Menu position="right">
                            <Menu.Item
                                name="login"
                                active={activeItem === 'login'}
                                onClick={handleItemClick.bind(this, 'login')}
                                as={Link}
                                to="/login"
                            />
                            <Menu.Item
                                name="register"
                                active={activeItem === 'register'}
                                onClick={handleItemClick.bind(this, 'register')}
                                as={Link}
                                to="/register"
                            />
                        </Menu.Menu>
                    </Menu>
                )
            }
        </AuthContext.Consumer>
    );
};

export default MenuBar;
