import React from 'react';
import { Grid, TextField, Button } from "@material-ui/core";
import useForm from './useForm';
import { makeStyles } from "@material-ui/core/styles";

const initialFieldValues = {
    userName: '',
    password: ''
}
const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth: 230,
        }
    },
    paper: {
        position: "absolute",
        width: 300,
        backgroundColor: theme.palette.background.paper,
        padding: 20
    },
    smMargin: {
        margin: theme.spacing(1)
    }
}));

export default function Login(props) {
    const classes = useStyles();

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('userName' in fieldValues)
            temp.userName = fieldValues.userName ? "" : "This field is required."
        if ('password' in fieldValues)
            temp.password = fieldValues.password ? "" : "This field is required."

        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, validate, () => { })

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            props.setSignin(true);
            props.setLoginModal(false);
        }
    }

    return (
        <div className='loginModal'>
            <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
                <Grid container>
                    <Grid item xs={12}>
                        <TextField
                            name="userName"
                            variant="outlined"
                            label="User Name"
                            value={values.userName}
                            onChange={handleInputChange}
                            autoFocus
                            {...(errors.userName && { error: true, helperText: errors.userName })}
                        />
                        <TextField
                            name="password"
                            type="password"
                            variant="outlined"
                            label="Password"
                            value={values.password}
                            onChange={handleInputChange}
                            {...(errors.password && { error: true, helperText: errors.password })}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className={classes.smMargin}>
                            Login - new
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}