import React, { Component } from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { Button, Grid, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input';

interface IFormInput {
  fullName?: String
  mobileNumber?: String
  emailAddress?: String
}

export default function UserForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({
    defaultValues: {
      fullName: '',
      mobileNumber: '',
      emailAddress: '',
    },
  })
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data)

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="stretch"
      style={{ height: "100vh" }}
    >
      <Grid item md={8} lg={4}
        justifyContent="center"
        textAlign="center"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <img alt="basketball-hoop" src="/assets/images/basketball-hoop.png"
          style={{
            display: "flex",
            maxWidth: 360, maxHeight: 341,
            position: "fixed",
            top: "3%", left: "50%",
            marginLeft: -180
          }}
        />

        <Paper
          style={{
            padding: "200px 40px 40px",
            height: "80%",
            margin: "auto 0px 40px"
          }}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <Grid item
              justifyContent="center"
              style={{ display: "flex", marginTop: 40 }}
            >
              <Typography
                textAlign="right"
                style={{ margin: "auto", minWidth: 120 }}                
              >
                Full Name:
              </Typography>
              <Controller
                name="fullName"
                control={control}
                rules={{ required: 'Full Name is required', maxLength: 70 }}
                render={({ field }) => (
                  <TextField
                    label="Full Name"
                    error={errors.fullName ? true : false}
                    helperText={errors.fullName ? errors.fullName.message : ''}
                    style={{ marginLeft: 20, width: "-webkit-fill-available" }}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item
              justifyContent="center"
              style={{ marginTop: 40, display: "flex" }}
            >
              <Typography
                textAlign="right"
                style={{ margin: "auto", minWidth: 120 }}
              >
                Mobile Number:
              </Typography>
              <Controller
                name="mobileNumber"
                control={control}
                rules={{ validate: matchIsValidTel }}
                render={({ field }) => (
                  <MuiTelInput
                    error={errors.mobileNumber ? true : false}
                    label="Mobile Number"
                    helperText={errors.mobileNumber ? 'Invalid Mobile Number' : ''}
                    style={{ marginLeft: 20, width: "-webkit-fill-available" }}
                    defaultCountry="PH"
                    onlyCountries={["PH"]}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item
              justifyContent="center"
              style={{ marginTop: 40, display: "flex" }}
            >
              <Typography
                textAlign="right"
                style={{ margin: "auto", minWidth: 120 }}
              >
                Email Address:
              </Typography>
              <Controller
                name="emailAddress"
                control={control}
                rules={{ required: 'Email Address is required' }}
                rules={{
                  required: 'Email Address is required',
                  pattern: {
                    value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ,
                    message: 'Invalid Email Address'
                  }
                }}
                render={({ field }) => (
                  <TextField
                    error={errors.emailAddress ? true : false}
                    placeholder="juan.delacruz@gmail.com"
                    helperText={
                      errors.emailAddress ? errors.emailAddress.message : ''
                    }
                    style={{ marginLeft: 20, width: "-webkit-fill-available" }}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <Select style={{ marginTop: 10 }} {...field}>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              )}
            />
            <Button variant="contained" type="submit" style={{ marginTop: 40 }}>
              Submit
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  )
}