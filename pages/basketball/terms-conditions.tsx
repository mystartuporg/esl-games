import React, { useEffect } from 'react'
import {
  Controller,
  SubmitHandler,
  SubmitErrorHandler,
  useForm,
} from 'react-hook-form'
import { useRouter } from 'next/router'
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Grid,
  Paper,
  Typography,
} from '@mui/material'

interface IFormInput {
  accepted?: boolean
  brand_newsletter?: boolean
  ulp_newsletter?: boolean
}

export default function TermsConditions() {
  const [errorMessage, setErrorMessage] = React.useState('')
  const {
    handleSubmit,
    control,
  } = useForm({
    defaultValues: {
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
    }
    router.push('/basketball/user-form')
  }
  const onSubmitError: SubmitErrorHandler<IFormInput> = (errors) => {
    setErrorMessage('Cannot proceed until required field is selected.')
  }

  useEffect(() => {
    var score = sessionStorage.getItem("score")
    if (score !== null)
      router.push('/basketball/rewards-message')
  })

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="stretch"
      style={{ height: '100vh', background: 'cadetblue' }}
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
            padding: '20px',
          }}
        >
          <form
            onSubmit={handleSubmit(onSubmit, onSubmitError)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              margin: 'auto',
            }}
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
            <Button variant="contained" type="submit" style={{ marginTop: 10, background: '#EF5B0C' }}>
              Accept
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  )
}
