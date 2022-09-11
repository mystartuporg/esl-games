import React, { Component } from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/router'
import { Button, Grid, Paper, TextField, Typography } from '@mui/material'
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input'
import { SportsBasketball } from '@mui/icons-material'

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
  const router = useRouter()
  const onSubmit: SubmitHandler<IFormInput> = (data) =>
    router.push('/basketball/play')

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="stretch"
      style={{
        height: '100vh',
        background: 'cadetblue',
      }}
    >
      <Grid
        item
        md={8}
        lg={4}
        justifyContent="center"
        textAlign="center"
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <img
          alt="basketball-hoop"
          src="/assets/images/basketball-hoop.png"
          style={{
            display: 'flex',
            maxWidth: 360,
            maxHeight: 341,
            position: 'fixed',
            top: '3%',
            left: '50%',
            marginLeft: -180,
          }}
        />

        <Paper
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '200px 40px 20px',
            height: '80%',
            margin: 'auto 0px 40px',
          }}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: '-webkit-fill-available',
            }}
          >
            <Grid
              item
              justifyContent="center"
              style={{ display: 'flex', marginTop: 40 }}
            >
              <Typography
                textAlign="right"
                style={{ margin: '16px auto auto', minWidth: 120 }}
              >
                Full Name:
              </Typography>
              <Controller
                name="fullName"
                control={control}
                rules={{ required: 'Full Name is required', maxLength: 70 }}
                render={({ field }) => (
                  <TextField
                    placeholder="Juan Dela Cruz"
                    error={errors.fullName ? true : false}
                    helperText={errors.fullName ? errors.fullName.message : ''}
                    style={{ marginLeft: 20, width: '-webkit-fill-available' }}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid
              item
              justifyContent="center"
              style={{ marginTop: 40, display: 'flex' }}
            >
              <Typography
                textAlign="right"
                style={{ margin: '16px auto auto', minWidth: 120 }}
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
                    placeholder="+63 XXX XXX XXXX"
                    helperText={
                      errors.mobileNumber ? 'Invalid Mobile Number' : ''
                    }
                    style={{ marginLeft: 20, width: '-webkit-fill-available' }}
                    defaultCountry="PH"
                    onlyCountries={['PH']}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid
              item
              justifyContent="center"
              style={{ marginTop: 40, display: 'flex' }}
            >
              <Typography
                textAlign="right"
                style={{ margin: '16px auto auto', minWidth: 120 }}
              >
                Email Address:
              </Typography>
              <Controller
                name="emailAddress"
                control={control}
                rules={{
                  required: 'Email Address is required',
                  pattern: {
                    value:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Invalid Email Address',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    error={errors.emailAddress ? true : false}
                    placeholder="juan.delacruz@gmail.com"
                    helperText={
                      errors.emailAddress ? errors.emailAddress.message : ''
                    }
                    style={{ marginLeft: 20, width: '-webkit-fill-available' }}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Button
              variant="outlined"
              style={{ margin: 'auto 0 10px' }}
              onClick={() => router.push('/basketball/terms-conditions')}
            >
              Read Terms and Conditions
            </Button>
            <Button
              variant="contained"
              type="submit"
              startIcon={<SportsBasketball />}
              endIcon={<SportsBasketball />}
              style={{ background: '#EF5B0C' }}
            >
              Submit
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  )
}
