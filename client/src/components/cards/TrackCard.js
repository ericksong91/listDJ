import { Card, CardContent, Typography } from '@mui/material';
import { Grid, Box } from '@mui/material';
import { Button } from '@mui/material';

function TrackCard({ track, order, editing, onOrder, onDelete }) {
    return (
        <Box className="trackCard">
            <Grid container>
                <Grid item xs={editing ? 9 : 12}>
                    <Card sx={{ padding: 0.5, margin: 0.5, height: 80, display: 'flex', bgcolor: 'rgb(50, 50, 50)', color: 'white' }}>
                        <Grid container
                            direction="row"
                            justifyContent="space-evenly"
                            alignItems="center"
                        >
                            <Grid item xs={1} sx={{paddingLeft: 2}}>
                                <Typography variant="h8">
                                    {order}
                                </Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant="h7">{track.name}</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <CardContent sx={{ display: 'flex', alignContent: 'center' }}>
                                    {`${track.artist}`}
                                </CardContent>
                            </Grid>
                            <Grid item xs={2}>
                                <CardContent sx={{ display: 'flex', alignContent: 'center' }}>
                                    {`${Math.floor(track.length / 60)}m  ${Math.floor(track.length % 60)}s`}
                                </CardContent>
                            </Grid>
                            <Grid item xs={2}>
                                <CardContent sx={{ display: 'flex', alignContent: 'center' }}>
                                    {`${track.genre}`}
                                </CardContent>
                            </Grid>
                            <Grid item xs={2}>
                                <CardContent sx={{ display: 'flex', alignContent: 'center' }}>
                                    {`${track.bpm}`}
                                </CardContent>
                            </Grid>
                        </Grid>
                    </Card >
                </Grid>
                {editing ?
                    <Grid item xs={2}>
                        <Card sx={{ padding: 0.5, margin: 0.5, height: 80, display: 'flex', bgcolor: 'rgb(50, 50, 50)', color: 'white' }}>
                            <Grid container
                                direction="row"
                                justifyContent="space-evenly"
                                alignItems="center"
                            >
                                {editing ?
                                    <div>
                                        <Grid item xs={1} sx={{ alignContent: 'center' }}>
                                            <Button onClick={() => onOrder(order - 1, order - 2)}>Up</Button>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <Button onClick={() => onOrder(order - 1, order)}>Down</Button>
                                        </Grid>
                                    </div>
                                    :
                                    <Grid item xs={1}>
                                    </Grid>
                                }
                            </Grid>
                        </Card>
                    </Grid>
                    :
                    <div></div>
                }
                {editing ?
                    <Grid item xs={1}>
                        <Card sx={{ padding: 0.5, margin: 0.5, height: 80, display: 'flex', bgcolor: 'rgb(50, 50, 50)', color: 'white' }}>
                            <Grid container
                                direction="row"

                                alignItems="center"
                            >
                                <Grid item xs={1}>
                                    <Button onClick={() => onDelete(order)}>X</Button>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                    :
                    <div></div>}
            </Grid>
        </Box>
    );
}

export default TrackCard;
