import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import DCandidateForm from "./DCandidateForm";

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
        width: 600,
        backgroundColor: theme.palette.background.paper,
        padding: 20
    }
}));

const AddNewModal = ({ classess, ...props }) => {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);

    const handleOpen = () => {
        props.setOpenModal(true);
    };

    const handleClose = () => {
        props.setCurrentId(0);
        props.setOpenModal(false);
    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h2>Add new donor</h2>
            <div className="addNewCandidate">
                <DCandidateForm {...({ currentId: props.currentId, setCurrentId: props.setCurrentId, setOpenModal: props.setOpenModal })} />
            </div>
        </div>
    );

    return (
        <div className="floatRight mrg-top-15 mrg-right-15">
            <Button
                variant="contained"
                color="primary"
                onClick={handleOpen}>
                Add new
            </Button>
            <Modal open={props.openModal} onClose={handleClose}>
                {body}
            </Modal>
        </div>
    );
}

export default AddNewModal;