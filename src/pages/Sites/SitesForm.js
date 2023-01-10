import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import * as employeeService from "../../services/employeeService";


const genderItems = [
    { id: 'male', title: 'Male' },
    { id: 'female', title: 'Female' },
    { id: 'other', title: 'Other' },
]

const initialFValues = {
    id: 0,
    siteName: '',
    image: '',
    audioTitle: '',
    barcode: '',
    gender: 'male',
    departmentId: '',
    hireDate: new Date(),
    isPermanent: false,
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
        <Form onSubmit={handleSubmit}>
            <Grid container>
            <Grid item xs={6}>
                <Controls.Input
                    name="siteName"
                    label="Site Name"
                    value={values.siteName}
                    onChange={handleInputChange}
                    error={errors.siteName}
                />
                <Controls.Input
                    label="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    value={values.image}
                    onChange={handleInputChange}
                    error={errors.image}
                />
                <Controls.Input
                    label="audioTitle"
                    name="audioTitle"
                    type="file"
                    accept="audio/*"
                    value={values.audioTitle}
                    onChange={handleInputChange}
                    error={errors.audioTitle}
                />
                <Controls.Input
                    label="barcode"
                    name="barcode"
                    type="file"
                    accept="image/*"
                    value={values.barcode}
                    onChange={handleInputChange}
                />
                </Grid>

            
            </Grid>
        </Form>
    )
}
