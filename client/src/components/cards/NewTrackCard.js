import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import { Grid } from '@mui/material';
import { Button } from '@mui/material';

function NewTrackCard({ track, order, editing, onOrder }) {
    return (
        <Card sx={{ padding: 0.5, margin: 0.5, height: 80, display: 'flex', bgcolor: 'rgb(50, 50, 50)', color: 'white' }}>
            <Grid container>
                <Grid item xs={1} sx={{
                    alignContent: "center",
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}>
                    <Typography variant="h6" sx={{
                    }}>
                        {order}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <CardHeader
                        title={`${track.name}`}
                        subheader={`${track.genre}`}
                        titleTypographyProps={{ variant: 'h7' }}
                        sx={{ display: 'flex' }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <CardContent sx={{ display: 'flex', alignContent: 'center' }}>
                        <ul>{`BPM: ${track.bpm}`}</ul>
                        <ul>{`Key: ${track.key}`}</ul>
                    </CardContent>
                </Grid>
                <Grid item xs={1}>
                    {editing ?
                        <div>
                            <Button onClick={() => onOrder(order - 1, order - 2)}>Up</Button>
                            <Button onClick={() => onOrder(order - 1, order)}>Down</Button>
                        </div>
                        :
                        <div>
                        </div>
                    }
                </Grid>
            </Grid>
        </Card >
    );
}

export default NewTrackCard;
