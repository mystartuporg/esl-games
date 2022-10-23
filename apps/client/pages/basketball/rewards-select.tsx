import React, { useEffect } from 'react'
import router from 'next/router'
import axios from 'axios'
import { forEach } from 'lodash'
import { CheckCircleOutline, RoomPreferences, Rowing } from '@mui/icons-material'
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

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const themeMain = createTheme({
  palette: {
    background: {
      default: "cadetblue"
    }
  }
});

interface MerchantType {
  id: string
  type: string
  code: string
  img?: string
}

export default function RewardsSelect() {
  const [selectedMerchant, setSelectedMerchant] = React.useState('')
  const [merchantsList, setMerchantsList] = React.useState<MerchantType[]>(gcs)

  const handleSubmit = () => {
    let userId = sessionStorage.getItem('userId')

    if (selectedMerchant) {
      let matchResult = merchantsList.filter((merchant) => {
        return merchant.id == selectedMerchant
      })
      
      try {
        axios({
          method: 'post',
          url: process.env.NEXT_PUBLIC_RECORD_TRANSACTION_API_URL,
          data: {
            reward_id: selectedMerchant,
            user_id: userId
          }
        }).then( result => {          
          sessionStorage.setItem('selectedMerchant', selectedMerchant)
          sessionStorage.setItem('selectedMerchantName', matchResult[0].type)
          sessionStorage.setItem('selectedMerchantImg', matchResult[0].img ? matchResult[0].img : '/assets/images/GCash-Logo-700x618.png' )
          sessionStorage.setItem('referenceNumber', result.data.referenceNumber)
          sessionStorage.setItem('voucherCode', matchResult[0].code)
          
          router.push('/basketball/rewards-message')
        });

      }
      catch (e) {
        console.log(e);
      }
    }
  }

  useEffect(() => {
    let accepted = sessionStorage.getItem('accepted')
    let fullName = sessionStorage.getItem('fullName')
    let mobileNumber = sessionStorage.getItem('mobileNumber')
    let emailAddress = sessionStorage.getItem('emailAddress')
    let score = sessionStorage.getItem('score')
    let selectedMerchant = sessionStorage.getItem('selectedMerchant')
    if(
      accepted === null ||
      fullName === null ||
      mobileNumber === null ||
      emailAddress === null
    )
      router.push('/basketball/user-form')
    else if (score === null) router.push('/basketball/play')
    else if (selectedMerchant !== null) router.push('/basketball/rewards-message')

    try {
      axios({
        method: 'get',
        url: process.env.NEXT_PUBLIC_GET_REWARDS_API_URL
      }).then( result => {
        return forEach(result.data.result, (row: MerchantType) => {
          let matchResult = gcs.filter((gc) => {
            return gc.type == row.type
          })
          row.img = matchResult[0].img
        })
      }).then( result => {
        console.log(result)
        setMerchantsList(result)
      });
    }
    catch (e) {
      console.log(e);
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
            <Typography
              variant="h5"
              gutterBottom
              align="center"
              style={{ marginTop: 10, color: '#003865' }}
            >
              Select Your Reward
            </Typography>
            <Box style={{ overflowY: 'auto', height: '40vh', padding: 10 }}>
              <Grid container spacing={1} alignItems="stretch">
                {merchantsList.map((merchant: MerchantType) => (
                  <Grid item xs={12} key={merchant.id}>
                    <Card
                      raised={selectedMerchant === merchant.id}
                      style={{
                        height: '100%',
                        position: 'relative',
                        cursor: 'pointer',
                        padding: 10,
                      }}
                      onClick={() => setSelectedMerchant(merchant.id)}
                    >
                      <Grid container alignItems="center">
                        <Grid item xs={6}>
                          <CardMedia
                            component="img"
                            height="100"
                            image={merchant.img}
                            alt={merchant.type}
                            title={merchant.type}
                            style={{ objectFit: 'contain' }}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <CardContent>
                            <Typography
                              variant="h6"
                              style={{ wordBreak: 'break-word' }}
                            >
                              {merchant.type}
                            </Typography>
                            {selectedMerchant === merchant.id && (
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
              CONFIRM
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

const gcs = [
  {
    img: 'https://1000logos.net/wp-content/uploads/2021/05/Jollibee-logo-500x281.png',
    type: 'Jollibee',
    id: '1',
    code: ''
  },
  {
    img: 'https://1000logos.net/wp-content/uploads/2017/03/McDonalds-logo-500x281.png',
    type: 'McDonalds',
    id: '2',
    code: ''
  },
  {
    img: 'https://1000logos.net/wp-content/uploads/2016/12/Starbucks-Logo-500x417.png',
    type: 'Starbucks',
    id: '3',
    code: ''
  },
  {
    img: 'https://1000logos.net/wp-content/uploads/2017/03/Kfc_logo-500x281.png',
    type: 'KFC',
    id: '4',
    code: ''
  },
  {
    img: 'https://1000logos.net/wp-content/uploads/2017/08/Dunkin-Donuts-Logo-500x209.png',
    type: "Dunkin'",
    id: '5',
    code: ''
  },
  {
    img: 'https://1000logos.net/wp-content/uploads/2022/08/Grab-Logo-500x281.png',
    type: "Grab",
    id: '6',
    code: ''
  },
  {
    img: 'https://1000logos.net/wp-content/uploads/2022/01/Lazada-Logo-500x281.jpg',
    type: "Lazada",
    id: '7',
    code: ''
  },
  {
    img: 'https://1000logos.net/wp-content/uploads/2021/02/Shopee-logo-500x328.jpg',
    type: "Shopee",
    id: '8',
    code: ''
  },
  {
    img: '/assets/images/Maya-Logo-1280x372.png',
    type: "Maya",
    id: '9',
    code: ''
  },
  {
    img: '/assets/images/GCash-Logo-700x618.png',
    type: "GCash",
    id: '10',
    code: ''
  }
]
