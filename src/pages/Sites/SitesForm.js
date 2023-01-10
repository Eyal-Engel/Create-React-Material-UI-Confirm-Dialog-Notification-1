import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import * as employeeService from "../../services/employeeService";
import FileUploader from "../../components/FileUploader";

const genderItems = [
    { id: 'male', title: 'Male' },
    { id: 'female', title: 'Female' },
    { id: 'other', title: 'Other' },
]

const initialFValues = {
    id: 0,
    siteName: '',
    image: 'null',
    audioTitle: 'null',
    barcode: 'null',
}

export default function EmployeeForm(props) {
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('siteName' in fieldValues)
            temp.siteName = fieldValues.siteName ? "" : "This field is required."
        if ('image' in fieldValues)
            temp.image = (/$^|.+@.+..+/).test(fieldValues.image) ? "" : "image is not valid."
        if ('audioTitle' in fieldValues)
            temp.audioTitle = fieldValues.audioTitle.length > 9 ? "" : "Minimum 10 numbers required."
        if ('departmentId' in fieldValues)
            temp.departmentId = fieldValues.departmentId.length != 0 ? "" : "This field is required."
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
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            addOrEdit(values, resetForm);
        }
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    return (
        <Form onSubmit={handleSubmit} >
            <Grid container>
                <Grid item md={6} style={{ marginBottom: 40}}>
                    <Controls.Input
                        name="siteName"
                        label="Site Name"
                        value={values.siteName}
                        onChange={handleInputChange}
                        error={errors.siteName}
                    />
                </Grid>
            </Grid>
            <Grid container>
                <Grid item md={4} style={{ marginRight: 10}}>
                    <h3>Image</h3>
                    <FileUploader></FileUploader>
                </Grid>
                <Grid item md={4} style={{ marginRight: 10}}>
                    <h3>Audio</h3>
                    <FileUploader></FileUploader>
                </Grid>
                <Grid item md={4}>
                <h3>QR Barcode</h3>
                    <FileUploader></FileUploader>
                </Grid>
            </Grid>
            <Grid container justify="center">
                <Controls.Button
                    type="submit"
                    text="Submit" />
                <Controls.Button
                    text="Reset"
                    color="default"
                    onClick={resetForm} />
            </Grid>
        </Form>
    )
}
