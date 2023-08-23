import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import { Grid } from '@mui/material';
import { Button } from '@mui/material';

function TrackCard({ track, order, editing, onOrder }) {

    return (
        <Card sx={{ padding: 0.1, margin: 0.1, height: 70, display: 'flex' }}>
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
                        titleTypographyProps={{ variant: 'h6' }}
                        sx={{ display: 'flex' }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <CardContent sx={{ display: 'flex', alignContent: 'center' }}>
                        <ul>{`Average BPM: ${track.bpm}`}</ul>
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

export default TrackCard;
