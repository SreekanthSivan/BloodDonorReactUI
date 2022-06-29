import React, { useState, useEffect } from 'react';
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    paper: {
        position: "absolute",
        width: 600,
        backgroundColor: theme.palette.background.paper,
        padding: 20
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 230,
    },
    smMargin: {
        margin: theme.spacing(1)
    }
}));

const FileUploadPage = (props) => {
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const { saveSelectedFile } = props;
    const classes = useStyles();
    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    };

    const uploadFile = () => {
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('fileName', "testName");
        saveSelectedFile(formData);
    };

    return (<div>
        <TextField
            type="file"
            variant="outlined"
            onChange={changeHandler} />
        {isFilePicked && (
            <div className="mrg-left-15">
                <p>Filename: {selectedFile.name}</p>
                <p>Filetype: {selectedFile.type}</p>
                <p>Size in bytes: {selectedFile.size}</p>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.smMargin}
                    onClick={uploadFile}>
                    File Upload
                </Button>
            </div>
        )}
    </div>);
}

export default FileUploadPage;