import React, { useEffect } from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/router'
import { Button, Checkbox, FormControlLabel, FormHelperText, Grid, Paper, TextField, Typography } from '@mui/material'
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input'
import { SportsBasketball } from '@mui/icons-material'

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";

interface IFormInput {
  fullName: string
  mobileNumber: string
  emailAddress?: string
  accepted?: boolean
  brand_newsletter?: boolean
  ulp_newsletter?: boolean
}

const themeMain = createTheme({
  palette: {
    background: {
      default: "cadetblue"
    }
  }
});

export default function UserForm() {
  const [errorMessage, setErrorMessage] = React.useState('')
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
      accepted: false,
      brand_newsletter: false,
      ulp_newsletter: false
    },
  })
  const router = useRouter()

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    
    if (data !== undefined) {
      sessionStorage.setItem("accepted", data.accepted ? "true" : "false")
      sessionStorage.setItem("brand_newsletter", data.brand_newsletter ? "true" : "false")
      sessionStorage.setItem("ulp_newsletter", data.ulp_newsletter ? "true" : "false")
      sessionStorage.setItem("fullName", data.fullName)
      sessionStorage.setItem("mobileNumber", data.mobileNumber)
      sessionStorage.setItem("emailAddress", data.emailAddress !== undefined ? data.emailAddress : "N/A")    
    }
    router.push('/basketball/play')
  }

  useEffect(() => {
    var accepted = sessionStorage.getItem("accepted")
    var fullName = sessionStorage.getItem("fullName")
    var mobileNumber = sessionStorage.getItem("mobileNumber")
    var score = sessionStorage.getItem("score")
    if ((accepted !== null) && (fullName !== null) && (mobileNumber !== null)) {
      router.push('/basketball/play')
    }
    else if (score !== null) {
      router.push('/basketball/rewards-message')
    }
  })

  return (
    <ThemeProvider theme={themeMain}>
      <CssBaseline />
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
      >
        <Grid
          item
          xs={11}
          md={8}
          lg={4}
          justifyContent="center"
          textAlign="center"
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <Paper
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '20px 20px 20px',
              margin: '20px 0px 20px',
            }}
          >
            <img
              alt="basketball-hoop"
              src="/assets/images/basketball-hoop.png"
              style={{
                display: 'flex',
                width: '100%',
              }}
            />
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
                style={{ display: 'flex', marginTop: 20 }}
              >
                <Controller
                  name="fullName"
                  control={control}
                  rules={{ required: 'Full Name is required', maxLength: 70 }}
                  render={({ field }) => (
                    <TextField
                      label="Full Name"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      placeholder="Juan Dela Cruz"
                      error={errors.fullName ? true : false}
                      helperText={errors.fullName ? errors.fullName.message : ''}
                      style={{ width: '-webkit-fill-available' }}
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid
                item
                justifyContent="center"
                style={{ marginTop: 20, display: 'flex' }}
              >
                <Controller
                  name="mobileNumber"
                  control={control}
                  rules={{ validate: matchIsValidTel }}
                  render={({ field }) => (
                    <MuiTelInput
                      label="Mobile Number"
                        InputLabelProps={{
                          shrink: true,
                        }}  
                      error={errors.mobileNumber ? true : false}
                      placeholder="+63 XXX XXX XXXX"
                      helperText={
                        errors.mobileNumber ? 'Invalid Mobile Number' : ''
                      }
                      style={{ width: '-webkit-fill-available' }}
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
                style={{ marginTop: 20, display: 'flex' }}
              >
                <Controller
                  name="emailAddress"
                  control={control}
                  rules={{
                    pattern: {
                      value:
                        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: 'Invalid Email Address',
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      label="Email Address"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      error={errors.emailAddress ? true : false}
                      placeholder="juan.delacruz@gmail.com"
                      helperText={
                        errors.emailAddress ? errors.emailAddress.message : ''
                      }
                      style={{ width: '-webkit-fill-available' }}
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid
                item
                justifyContent="center"
                style={{ marginTop: 10, marginBottom: 10, display: 'flex', flexDirection: 'column' }}
              >
              <Controller
                name="accepted"
                control={control}
                rules={{ validate: (value) => value === true }}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...field}
                        onChange={(e) => {
                          setErrorMessage('')
                          field.onChange(e)
                        }}
                        required
                      />
                    }
                    label="I confirm that I am 18 years old"
                    sx={{
                      '& >span': {
                        textAlign: 'left',
                        fontSize: '0.8rem'
                      }
                    }}
                  />
                  )}
              />
              <Controller
                name="brand_newsletter"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...field}
                        onChange={(e) => {
                          setErrorMessage('')
                          field.onChange(e)
                        }}
                      />
                    }
                    label="Sign me up to receive exciting news and offers from Rexona"
                    sx={{
                      '& >span': {
                        textAlign: 'left',
                        fontSize: '0.8rem'
                      }
                    }}
                  />
                )}
              />
              <Controller
                name="ulp_newsletter"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...field}
                        onChange={(e) => {
                          setErrorMessage('')
                          field.onChange(e)
                        }}
                      />
                    }
                    label="Sign me up to receive exciting news and offers from other Unilever brands"
                    sx={{
                      '& >span': {
                        textAlign: 'left',
                        fontSize: '0.8rem'
                      }
                    }}               
                  />
                )}
              />
              <FormHelperText error={true}>{errorMessage}</FormHelperText>
              <Typography variant="body2" align="justify" sx={{ fontSize: '0.6rem' }}>
                <i>
                  Please read our <a style={{ color: "blue", textDecoration: "underline" }} href="https://www.unilevernotices.com/philippines/english/privacy-notice/notice.html">Privacy Notice</a> to understand how we use your personal data. For any questions or concerns on the use of your personal data, please contact Unilever Philippines, Inc. at privacy.ph@unilever.com, 02-588-8800 or toll free at 1-800-105647258.
                </i>
              </Typography>
              </Grid>
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
    </ThemeProvider>
  )
}
