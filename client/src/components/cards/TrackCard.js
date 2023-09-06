import { useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Grid, Box } from '@mui/material';
import { Button, TextField } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import EditIcon from '@mui/icons-material/Edit';


function TrackCard({ track, order, isEditing, onOrder, onDelete }) {
    const [editInfo, setEditInfo] = useState(false);
    const [trackName, setTrackName] = useState(track.name);
    const [trackArtist, setTrackArtist] = useState(track.artist);
    const [trackBPM, setTrackBPM] = useState(track.bpm);
    const [trackGenre, setTrackGenre] = useState(track.genre);
    const [trackLength, setTrackLength] = useState({ min: Math.floor(track.length / 60), sec: Math.floor(track.length % 60) });

    return (
        <Box className="trackCard">
            <Grid container>
                <Grid item xs={isEditing && !editInfo ? 10 : 12}>
                    <Card sx={{ padding: 0.5, margin: 0.5, height: 80, display: 'flex', bgcolor: 'rgb(50, 50, 50)', color: 'white' }}>
                        <Grid container
                            direction="row"
                            justifyContent="space-evenly"
                            alignItems="center"
                        >
                            <Grid item xs={1} sx={{ paddingLeft: 2 }}>
                                <Typography variant="h8">
                                    {order}
                                </Typography>
                            </Grid>
                            <Grid item xs={isEditing ? 2 : 3}>
                                {isEditing ?
                                    <TextField type="text" id='name' name="name" sx={{ input: { color: 'white' } }} value={trackName} onChange={(e) => setTrackName(e.target.value.trimStart())} />
                                    :
                                    <Typography variant="h7">{trackName}</Typography>
                                }
                            </Grid>
                            <Grid item xs={2}>
                                <CardContent sx={{ display: 'flex', alignContent: 'center' }}>
                                    {isEditing ?
                                        <TextField type="text" id='artist' name="artist" sx={{ input: { color: 'white' } }} value={trackArtist} onChange={(e) => setTrackArtist(e.target.value.trimStart())} />
                                        :
                                        <Typography variant="h7">{trackArtist}</Typography>
                                    }
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
                            <Grid item xs={1}>
                                {isEditing ?
                                    <Button sx={{ color: 'orange' }}><EditIcon /></Button>
                                    :
                                    null
                                }

                            </Grid>
                        </Grid>
                    </Card >
                </Grid>

                {/* Begin JSX for Movement Buttons and Deletion */}

                {isEditing && !editInfo ?
                    <Grid item xs={1}>
                        <Card sx={{ padding: 0.5, margin: 0.5, height: 80, display: 'flex', bgcolor: 'rgb(50, 50, 50)', color: 'white' }}>
                            <Grid container
                                direction="row"
                                justifyContent="space-evenly"
                                alignItems="center"
                            >
                                {isEditing && !editInfo ?
                                    <div>
                                        <Grid item xs={1} sx={{ alignContent: 'center' }}>
                                            <Button sx={{ color: 'orange' }} onClick={() => onOrder(order - 1, order - 2)}><KeyboardArrowUpIcon /></Button>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <Button sx={{ color: 'orange' }} onClick={() => onOrder(order - 1, order)}><KeyboardArrowDownIcon /></Button>
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
                {
                    isEditing ?
                        <Grid item xs={1}>
                            <Card sx={{ padding: 0.5, margin: 0.5, height: 80, display: 'flex', bgcolor: 'rgb(50, 50, 50)', color: 'white' }}>
                                <Grid container alignItems="center">
                                    <Grid item>
                                        <Button sx={{ color: 'orange' }} onClick={() => onDelete(order)}><DeleteForeverIcon /></Button>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                        :
                        <div></div>
                }
            </Grid >
        </Box >
    );
}

export default TrackCard;
