import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/dCandidate";
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";



const styles = theme => ({
    root: {
        "& .MuiTableCell-head": {
            fontSize: "1.25rem"
        }
    },
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
})

const DCandidates = ({ classes, ...props }) => {

    useEffect(() => {
        props.fetchAllDCandidates()
    }, [])//componentDidMount
    
    //toast msg.
    const { addToast } = useToasts()

    const onDelete = id => {
        if (window.confirm('Are you sure to delete this record?'))
            props.deleteDCandidate(id,()=>addToast("Deleted successfully", { appearance: 'info' }))
    }

    const onEdit = id => {
        props.setOpenModal(true);
        props.setCurrentId(id);
    }
    return (
        <Paper className={classes.paper} elevation={3}>
            <Grid container>
                {/* <Grid item xs={6}>
                    <DCandidateForm {...({ currentId, setCurrentId })} />
                </Grid> */}
                <Grid item xs={12}>
                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root}>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Mobile</TableCell>
                                    <TableCell>Blood Group</TableCell>
                                    <TableCell>Age</TableCell>
                                    <TableCell>Location</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Address</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.dCandidateList.map((record, index) => {
                                        return (<TableRow key={index} hover>
                                            <TableCell>{record.fullName}</TableCell>
                                            <TableCell>{record.mobile}</TableCell>
                                            <TableCell>{record.bloodGroup}</TableCell>
                                            <TableCell>{record.age}</TableCell>
                                            <TableCell>{record.location}</TableCell>
                                            <TableCell>{record.email}</TableCell>
                                            <TableCell>{record.address}</TableCell>
                                            <TableCell>
                                               {props.isLoggedIn &&  <ButtonGroup variant="text">
                                                    <Button><EditIcon color="primary"
                                                        onClick={() => { onEdit(record.id) }} /></Button>
                                                    <Button><DeleteIcon color="secondary"
                                                        onClick={() => onDelete(record.id)} /></Button>
                                                </ButtonGroup>}
                                            </TableCell>
                                        </TableRow>)
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Paper>
    );
}

const mapStateToProps = state => ({
    dCandidateList: state.dCandidate.list
})

const mapActionToProps = {
    fetchAllDCandidates: actions.fetchAll,
    deleteDCandidate: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(DCandidates));