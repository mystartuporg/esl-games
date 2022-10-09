import { CheckCircleOutline } from '@mui/icons-material'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  Grid,
  Paper,
  Typography,
} from '@mui/material'
import router from 'next/router'
import React, { useEffect } from 'react'

export default function RewardsSelect() {
  const [selectedMerchant, setSelectedMerchant] = React.useState('')

  const handleSubmit = () => {
    if (selectedMerchant) {
      sessionStorage.setItem('selectedMerchant', selectedMerchant)
      router.push('/basketball/rewards-message')
    }
  }

  useEffect(() => {
    let accepted = sessionStorage.getItem('accepted')
    let fullName = sessionStorage.getItem('fullName')
    let mobileNumber = sessionStorage.getItem('mobileNumber')
    let emailAddress = sessionStorage.getItem('emailAddress')
    let score = sessionStorage.getItem('score')
    let selectedMerchant = sessionStorage.getItem('selectedMerchant')

    if (accepted === null) router.push('/basketball/terms-conditions')
    else if (
      fullName === null ||
      mobileNumber === null ||
      emailAddress === null
    )
      router.push('/basketball/user-form')
    else if (score === null) router.push('/basketball/play')
    else if (selectedMerchant !== null) router.push('/basketball/rewards-message')
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
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            style={{ marginTop: 10, color: '#003865' }}
          >
            Select Your Reward
          </Typography>
          <Box style={{ overflowY: 'auto', height: '40vh', padding: 10 }}>
            <Grid container spacing={1} alignItems="stretch">
              {gcs.map((gc) => (
                <Grid item xs={12} key={gc.id}>
                  <Card
                    raised={selectedMerchant === gc.id}
                    style={{
                      height: '100%',
                      position: 'relative',
                      cursor: 'pointer',
                      padding: 10,
                    }}
                    onClick={() => setSelectedMerchant(gc.id)}
                  >
                    <Grid container alignItems="center">
                      <Grid item xs={6}>
                        <CardContent>
                          <Typography
                            variant="h6"
                            style={{ wordBreak: 'break-word' }}
                          >
                            {gc.name}
                          </Typography>
                          {selectedMerchant === gc.id && (
                            <CheckCircleOutline
                              color="primary"
                              style={{
                                position: 'absolute',
                                right: '0px',
                                top: '0px',
                                margin: 10,
                              }}
                            />
                          )}
                        </CardContent>
                      </Grid>
                      <Grid item xs={6}>
                        <CardMedia
                          component="img"
                          height="100"
                          image={gc.img}
                          alt={gc.name}
                          title={gc.name}
                          style={{ objectFit: 'contain' }}
                        />
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
          <Button
            variant="contained"
            style={{ marginTop: 10 }}
            disabled={!selectedMerchant}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Paper>
      </Grid>
    </Grid>
  )
}

const gcs = [
  {
    img: 'https://1000logos.net/wp-content/uploads/2021/05/Jollibee-logo-500x281.png',
    name: 'Jollibee',
    id: '1',
  },
  {
    img: 'https://1000logos.net/wp-content/uploads/2017/03/McDonalds-logo-500x281.png',
    name: 'McDonalds',
    id: '2',
  },
  {
    img: 'https://1000logos.net/wp-content/uploads/2016/12/Starbucks-Logo-500x417.png',
    name: 'Starbucks',
    id: '3',
  },
  {
    img: 'https://1000logos.net/wp-content/uploads/2017/03/Kfc_logo-500x281.png',
    name: 'KFC',
    id: '4',
  },
  {
    img: 'https://1000logos.net/wp-content/uploads/2017/08/Dunkin-Donuts-Logo-500x209.png',
    name: "Dunkin'",
    id: '5',
  },
]
