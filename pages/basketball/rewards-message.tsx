import React from "react";
import { Controller, SubmitHandler, SubmitErrorHandler, useForm } from "react-hook-form";
import {useRouter} from 'next/router';
import { Box, Button, FormControlLabel, FormHelperText, Grid, Paper, Switch, Typography } from "@mui/material";
import { SportsBasketball } from "@mui/icons-material"

interface IFormInput {
    accepted?: Boolean
}

export default function TermsConditions() {
    const [errorMessage, setErrorMessage] = React.useState('');
    const { register, formState: { isValid }, handleSubmit, control } = useForm();
    const router = useRouter();
    const onSubmit: SubmitHandler<IFormInput> = () => router.push("/basketball/user-form");
    const onSubmitError: SubmitErrorHandler<IFormInput> = errors => {
        setErrorMessage('Cannot proceed until terms and conditions are accepted.');
    }

    return (
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        style={{
          height: "100vh",
          background: "cadetblue"
        }}
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
              display: "flex", flexDirection: "column",
              padding: "200px 40px 20px",
              height: "80%",
              margin: "auto 0px 40px"
            }}
          >
            <Typography variant="h2" gutterBottom align="center" style={{  marginTop: 40, color: '#003865' }}>
                Congratulations
            </Typography>

            <Typography variant="h4" gutterBottom align="center" style={{ color: '#003865' }}>
                You won
            </Typography>


            <img alt="congratulations" src="https://media.karousell.com/media/photos/products/2021/12/5/giftaway_universal_plus_p1000__1638701916_a3892524_progressive.jpg"
              style={{
                display: "flex",
                maxWidth: 200,
                maxHeight: 200,
                alignSelf: "center"
              }}
            />

            <Button
              variant="contained"
              onClick={ () => router.push("/basketball/terms-conditions") }
              startIcon={<SportsBasketball  />}
              endIcon={<SportsBasketball  />}
              style={{ margin: "auto 0 10px", background: "#3CCF4E" }}
            >
              Thank you for playing!
            </Button>
          </Paper>
        </Grid>
      </Grid>
    );

}