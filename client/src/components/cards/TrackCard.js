import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import { Grid } from '@mui/material';
import { Button } from '@mui/material';

function TrackCard({ track, order, editing, onOrder }) {
    return (
        <Card sx={{ padding: 0.5, margin: 0.5, height: 80, display: 'flex', bgcolor: 'rgb(50, 50, 50)', color: 'white' }}>
            <Grid container>
                <Grid item xs={0.1}>
                    <Typography variant="h8">
                        {order}
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <CardHeader
                        title={`${track.name}`}
                        titleTypographyProps={{ variant: 'h10' }}
                        sx={{ display: 'flex' }}
                    />
                </Grid>
                <Grid item xs={8.5}>
                    <CardContent sx={{ display: 'flex', alignContent: 'center' }}>
                        <ul>{`by ${track.artist}`}</ul>
                        <ul>{`${Math.floor(track.length/60)}m  ${Math.floor(track.length % 60)}s`}</ul>
                        <ul>{`${track.genre}`}</ul>
                        <ul>{`BPM: ${track.bpm}`}</ul>
                        <ul>{`${track.key}`}</ul>
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
