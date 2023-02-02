import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Typography,
} from '@mui/material'

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const themeMain = createTheme({
  palette: {
    background: {
      default: "cadetblue"
    }
  }
});

export default function RewardsMessage() {
  
  const router = useRouter()
  const [selectedMerchantName, setSelectedMerchantName] = React.useState('')
  const [selectedMerchantImg, setSelectedMerchantImg] = React.useState('')
  const [voucherCode, setVoucherCode] = React.useState('')
  const [referenceNumber, setReferenceNumber] = React.useState('')

  useEffect(() => {
    let accepted = sessionStorage.getItem("accepted")
    let fullName = sessionStorage.getItem("fullName")
    let mobileNumber = sessionStorage.getItem("mobileNumber")
    let emailAddress = sessionStorage.getItem("emailAddress")
    let score = sessionStorage.getItem("score")
    let selectedMerchant = sessionStorage.getItem('selectedMerchant')
    let selectedMerchantName = sessionStorage.getItem('selectedMerchantName')
    let selectedMerchantImg = sessionStorage.getItem('selectedMerchantImg')
    let voucherCode = sessionStorage.getItem('voucherCode')
    let referenceNumber = sessionStorage.getItem('referenceNumber')

    if ((accepted === null) || (fullName === null) || (mobileNumber === null) || (emailAddress === null))
      router.push('/basketball/user-form')
    else if (score === null)
      router.push('/basketball/play')
    else if (selectedMerchant === null)
      router.push('/basketball/rewards-select')
    else {
      var selectedGC = gcs.filter(gc => {
        return gc.id === selectedMerchant
      })
      setSelectedMerchantName(selectedMerchantName ? selectedMerchantName : selectedGC[0].type)
      setSelectedMerchantImg(selectedMerchantImg ? selectedMerchantImg : selectedGC[0].img)
      setVoucherCode(voucherCode ? voucherCode : '')
      setReferenceNumber(referenceNumber ? referenceNumber : '')
    }
  }, [])

  return (
    <ThemeProvider theme={themeMain}>
      <CssBaseline />
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
              padding: 20,
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
            <Typography
              variant="h4"
              gutterBottom
              align="center"
              style={{ marginTop: 40, color: '#003865' }}
            >
              Congratulations!
            </Typography>
            <Typography
              variant="h5"
              gutterBottom
              align="center"
              style={{ color: '#003865' }}
            >
              You won
            </Typography>
            <Card
              raised
              style={{
                height: '100%',
                position: 'relative',
                cursor: 'pointer',
                padding: 10,
              }}
            >
              <Grid container alignItems="center">
                <Grid item xs={6}>
                  <CardContent>
                    <Typography
                      variant="h6"
                      style={{ wordBreak: 'break-word' }}
                    >
                      Php 100 {selectedMerchantName} GC
                    </Typography>
                  </CardContent>
                </Grid>
                <Grid item xs={6}>
                  <CardMedia
                    component="img"
                    height="100"
                    image={selectedMerchantImg}
                    alt={selectedMerchantName}
                    title={selectedMerchantName}
                    style={{ objectFit: 'contain' }}
                  />
                </Grid>
              </Grid>
            </Card>
            <Typography
              variant="h6"
              gutterBottom
              align="left"
              style={{ marginTop: 20, marginLeft: 40, color: '#003865' }}
            >
              Voucher Code: {voucherCode}
            </Typography>
            <Typography
              variant="h6"
              gutterBottom
              align="left"
              style={{ marginLeft: 40, color: '#003865' }}
            >
              Reference No: {referenceNumber}
            </Typography>
            <Typography
              variant="body2"
              gutterBottom
              align="justify"
              style={{ margin: '20px 0 10px', color: '#003865' }}
            >
              We will send you the instructions on how to receive your reward via SMS or you can click <a style={{ color: "blue", textDecoration: "underline" }} href="#">here</a>.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

const gcs = [
  {
    img: '/assets/images/GCash-Logo-700x618.png',
    type: "GCash",
    id: '10',
    code: ''
  },
  {
    img: 'https://1000logos.net/wp-content/uploads/2022/08/Grab-Logo-500x281.png',
    type: "GrabFood",
    id: '11',
    code: ''
  },
  {
    img: 'https://1000logos.net/wp-content/uploads/2017/06/Unilever-Logo-768x582.png',
    type: "Unilever",
    id: '12',
    code: ''
  }
]