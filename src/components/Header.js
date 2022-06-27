import React from 'react';
import Login from './Login';
import { Button } from '@material-ui/core';
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
        position: "absolute",
        width: 300,
        backgroundColor: theme.palette.background.paper,
        padding: 20
    }
}));

const Header = ({ classess, ...props }) => {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [loginModal, setLoginModal] = React.useState(false);
    const handleOpen = () => {
        setLoginModal(true);
    };

    const handleClose = () => {
        setLoginModal(false);
    };
    const signOff = () => {
        props.setSignin(false);
    }
    if (props.isLoggedIn) {
        return (<div className="floatRight mrg-top-15 mrg-right-15">
            <Button
                variant="contained"
                color="primary"
                onClick={signOff}>
                Sign out
            </Button>
        </div>);
    }
    return (
        <div className="floatRight mrg-top-15 mrg-right-15">
            <Button
                variant="contained"
                color="primary"
                onClick={handleOpen}>
                Sign-in
            </Button>
            <Modal open={loginModal} onClose={handleClose}>
                <div style={modalStyle} className={classes.paper}>
                    <Login setSignin={props.setSignin} setLoginModal={setLoginModal} />
                </div>
            </Modal>
        </div>
    );
}
export default Header;