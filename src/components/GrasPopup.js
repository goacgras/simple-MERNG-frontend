import { Popup } from 'semantic-ui-react';

const GrasPopup = ({ content, children }) => {
    return <Popup inverted content={content} trigger={children} />;
};

export default GrasPopup;
