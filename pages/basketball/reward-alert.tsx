import {Grid, Typography} from "@mui/material";

export default function RewardAlert() {
  return (
    <Grid container xs={12} direction={"column"} alignItems={"center"}>
      <Grid item>
        <Typography>
          Congratulations
        </Typography>
      </Grid>
      <Grid item>
        <Typography>
          You scored
        </Typography>
      </Grid>
      <Grid item>
        <Typography>
          69
        </Typography>
      </Grid>
      <Grid item>
        <Typography>
          Here's your reward
        </Typography>
      </Grid>
      <Grid item>
        <img src="https://media.karousell.com/media/photos/products/2021/12/5/giftaway_universal_plus_p1000__1638701916_a3892524_progressive.jpg" alt="Prize Image" />
      </Grid>
      <Grid item>
        <Typography>
          Thanks for playing
        </Typography>
      </Grid>
    </Grid>
  )
}