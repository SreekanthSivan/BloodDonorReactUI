import React, { useState, useEffect } from "react";
import { Paper, Grid, TextField, withStyles, FormControl, InputLabel, Select, MenuItem, Button, FormHelperText } from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/dCandidate";
import AddNewModal from "./AddNewModal";

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth: 230,
        }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 230,
    },
    smMargin: {
        margin: theme.spacing(1)
    }
})

const initialFieldValues = {
    bloodGroup: '',
    address: ''
}

const SearchForm = ({ classes, ...props }) => {
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, null, props.setCurrentId)

    //material-ui select
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);


    const handleSubmit = e => {
        e.preventDefault()

    }

    return (
        <div className="mrg-left-15 mrg-right-15">
            <Paper className={classes.paper} elevation={3}>
                <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
                    <Grid container>
                        <Grid item xs={7}>
                            <FormControl variant="outlined"
                                className={classes.formControl}
                                {...(errors.bloodGroup && { error: true })}
                            >
                                <InputLabel ref={inputLabel}>Blood Group</InputLabel>
                                <Select
                                    name="bloodGroup"
                                    value={values.bloodGroup}
                                    labelWidth={labelWidth}
                                >
                                    <MenuItem value="">Select Blood Group</MenuItem>
                                    <MenuItem value="A+">A +ve</MenuItem>
                                    <MenuItem value="A-">A -ve</MenuItem>
                                    <MenuItem value="B+">B +ve</MenuItem>
                                    <MenuItem value="B-">B -ve</MenuItem>
                                    <MenuItem value="AB+">AB +ve</MenuItem>
                                    <MenuItem value="AB-">AB -ve</MenuItem>
                                    <MenuItem value="O+">O +ve</MenuItem>
                                    <MenuItem value="O-">O -ve</MenuItem>
                                </Select>
                            </FormControl>

                            <TextField
                                name="address"
                                variant="outlined"
                                label="Location / Address"
                                value={values.address}
                            />
                            <div className="floatRight mrg-top-5">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    className={classes.smMargin}
                                >
                                    Search
                                </Button>
                                <Button
                                    variant="contained"
                                    className={classes.smMargin}
                                >
                                    Clear
                                </Button>
                            </div>
                        </Grid>
                        <Grid item xs={5}>
                            <AddNewModal
                                openModal={props.openModal}
                                setOpenModal={props.setOpenModal}
                                currentId={props.currentId}
                                setCurrentId={props.setCurrentId} />
                        </Grid>
                    </Grid>
                </form>
            </Paper >
        </div>
    );

}


const mapStateToProps = state => ({
    dCandidateList: state.dCandidate.list
})

const mapActionToProps = {
    createDCandidate: actions.create,
    updateDCandidate: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(SearchForm));