import React, { Component } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Button, Grid, MenuItem, Select, TextField } from '@mui/material';
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";

interface IFormInput {
    fullName?: String
    mobileNumber?: String
    emailAddress?: String
    gender?: 'male' | 'female' | 'other'
}

export default function UserForm() {
    const { register, formState: { errors }, handleSubmit, control } = useForm({
        defaultValues: {
        fullName: '',
        mobileNumber: '',
        emailAddress: '',
        gender: 'male'
      }
    });
    const onSubmit: SubmitHandler<IFormInput> = data => console.log(data);

    return(
        <Grid container direction="row" justifyContent="center" alignItems="stretch">
            <Grid item md={12} lg={4}>
                <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column" }}>
                    <Controller
                        name="fullName"
                        control={control}
                        rules={{ required: "Full Name is required", maxLength: 70 }}
                        render={({ field }) => <TextField
                            label="Full Name"
                            error={errors.fullName ? true : false}
                            helperText={errors.fullName ? errors.fullName.message : ""}
                            style={{ marginTop: 10 }}
                            {...field}
                        />}
                    />
                    <Controller
                        name="mobileNumber"
                        control={control}
                        rules={{ /*required: "Mobile Number is required",*/ validate: matchIsValidTel }}
                        render={({ field }) => <MuiTelInput
                            error={errors.mobileNumber ? true : false}
                            label="Mobile Number"
                            helperText={errors.mobileNumber ? /*errors.mobileNumber.message*/"Invalid Mobile Number" : ""}
                            style={{ marginTop: 10 }}
                            defaultCountry="PH"
                            disableDropdown
                            {...field}
                        />}
                    />
                    <Controller
                        name="emailAddress"
                        control={control}
                        rules={{ required: "Email Address is required", pattern: {value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ , message: "Invalid Email Address"} }}
                        render={({ field }) => <TextField
                            error={errors.emailAddress ? true : false}
                            label="Email Address"
                            helperText={errors.emailAddress ? errors.emailAddress.message : ""}
                            style={{ marginTop: 10 }}
                            {...field}
                        />}
                    />
                    <Controller
                        name="gender"
                        control={control}
                        render={({ field }) => <Select
                        style={{ marginTop: 10 }}
                            {...field} 
                        >
                            <MenuItem value="male">Male</MenuItem>
                            <MenuItem value="female">Female</MenuItem>
                            <MenuItem value="other">Other</MenuItem>
                        </Select>
                        }
                    />
                    <Button variant="contained" type="submit" style={{ marginTop: 10 }}>Submit</Button>       
                </form>
            </Grid>
        </Grid>
    );
}