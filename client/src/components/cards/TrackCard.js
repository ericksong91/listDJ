import { useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Grid, Box } from '@mui/material';
import { Button, TextField, FormControl, InputLabel, Select } from '@mui/material';
import { CircularProgress } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';


function TrackCard({ track, genres, order, editInfo, hideButtons, isEditing,
    onOrder, onDelete, onEditTrackDescription, onEditInfo, onHideButtons }) {
    const [error, setError] = useState('');
    const [trackName, setTrackName] = useState(track.name);
    const [trackArtist, setTrackArtist] = useState(track.artist);
    const [trackBPM, setTrackBPM] = useState(track.bpm);
    const [trackGenre, setTrackGenre] = useState(track.genre);
    const [trackLength, setTrackLength] = useState({ min: Math.floor(track.length / 60), sec: Math.floor(track.length % 60) });


    if(track.length === 0) {
        return <CircularProgress />
    };

    function handleClick() {
        const length = parseInt(trackLength.min * 60) + parseInt(trackLength.sec);
        const newTrack = {
            name: trackName,
            artist: trackArtist,
            genre: trackGenre,
            length: length,
            bpm: trackBPM
        };

        if (newTrack.name.length === 0 || newTrack.artist.length === 0
            || newTrack.genre.length < 0 || newTrack.bpm.length === 0
            || newTrack.length === 0) {
            setError("Must fill out every field")
        } else {
            onEditTrackDescription(newTrack, order);
        };
    };

    return (
        <Box className="trackCard">
            <Grid container>
                <Grid item xs={isEditing ? 10 : 12}>
                    <Card sx={{
                        padding: 0.5, margin: 0.5, height: 80, display: 'flex', bgcolor: 'rgb(50, 50, 50)', color: 'white',
                        input: { color: 'white' }, label: { color: 'grey' }, subheader: { color: 'white' }
                    }}>
                        <Grid container
                            direction="row"
                            justifyContent="space-evenly"
                            alignItems="center"
                        >
                            <Grid item xs={1} sx={{ paddingLeft: 2, paddingBottom: 1 }}>
                                <Typography variant="h8">
                                    {order}
                                </Typography>
                            </Grid>
                            <Grid item xs={isEditing ? 2 : 3}>
                                {isEditing && editInfo ?
                                    <TextField
                                        required
                                        fullWidth
                                        id="trackName"
                                        name="name"
                                        type="text"
                                        inputProps={{ maxLength: 100 }}
                                        label={`Track Name`}
                                        sx={{ input: { color: 'white' }, label: { color: 'white' }, paddingBottom: 5 }}
                                        value={trackName}
                                        onChange={(e) => setTrackName(e.target.value.trimStart())} />
                                    :
                                    <Typography variant="h7">{trackName}</Typography>
                                }
                            </Grid>
                            <Grid item xs={2}>
                                <CardContent sx={{ display: 'flex', alignContent: 'center' }}>
                                    {isEditing && editInfo ?
                                        <TextField
                                            type="text"
                                            fullWidth
                                            required
                                            id='artist'
                                            name="artist"
                                            inputProps={{ maxLength: 50 }}
                                            label={`Track Artist`}
                                            sx={{ input: { color: 'white' }, label: { color: 'white' }, paddingBottom: 4 }}
                                            value={trackArtist}
                                            onChange={(e) => setTrackArtist(e.target.value.trimStart())} />
                                        :
                                        <Typography variant="h7">{trackArtist}</Typography>
                                    }
                                </CardContent>
                            </Grid>
                            <Grid item xs={2}>
                                {isEditing && editInfo ?
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="length"
                                                name="length"
                                                type="number"
                                                inputProps={{ maxLength: 2 }}
                                                label={`m`}
                                                value={trackLength.min}
                                                sx={{ input: { color: 'white' }, label: { color: 'white' }, paddingBottom: 6 }}
                                                onChange={(e) => {
                                                    if (60 <= e.target.value || e.target.value < 0 || e.target.value === " " || e.target.value === "") {
                                                        return
                                                    } else {
                                                        if (e.target.value.toString().length <= 2) {
                                                            setTrackLength({ min: e.target.value, sec: trackLength.sec });
                                                        };
                                                    };
                                                }} />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="length"
                                                name="length"
                                                type="number"
                                                inputProps={{ maxLength: 2 }}
                                                label={`s`}
                                                value={trackLength.sec}
                                                sx={{ input: { color: 'white' }, label: { color: 'white' } }}
                                                onChange={(e) => {
                                                    if (60 <= e.target.value || e.target.value < 0 || e.target.value === " " || e.target.value === "") {
                                                        return
                                                    } else {
                                                        if (e.target.value.toString().length <= 2) {
                                                            setTrackLength({ min: trackLength.min, sec: e.target.value });
                                                        };
                                                    };
                                                }} />
                                        </Grid>
                                    </Grid>
                                    :
                                    <CardContent sx={{ display: 'flex', alignContent: 'center' }}>
                                        {`${trackLength.min}m  ${trackLength.sec}s`}
                                    </CardContent>
                                }
                            </Grid>
                            <Grid item xs={2}>
                                {isEditing && editInfo ?
                                    <FormControl required margin="normal">
                                        <InputLabel>Genre</InputLabel>
                                        <Select
                                            label="trackgenre"
                                            value={trackGenre}
                                            id="trackgenre"
                                            inputProps={{ label: { color: "white" } }}
                                            sx={{
                                                input: { color: 'white' }, label: { color: 'white' },
                                                color: 'white', marginBottom: 6, marginLeft: 1, width: 100
                                            }}
                                            onChange={(e) => setTrackGenre(e.target.value)}
                                        >
                                            {genres}
                                        </Select>
                                    </FormControl>
                                    :
                                    <Typography variant="h7">{trackGenre}</Typography>
                                }
                            </Grid>
                            <Grid item xs={2}>
                                <CardContent sx={{ display: 'flex', alignContent: 'center' }}>
                                    {isEditing && editInfo ?
                                        <TextField
                                            required
                                            fullWidth
                                            id="bpm"
                                            name="bpm"
                                            type="number"
                                            inputProps={{ maxLength: 3 }}
                                            label={`BPM`}
                                            value={trackBPM}
                                            sx={{ paddingBottom: 4 }}
                                            onChange={(e) => {
                                                if (e.target.value.toString().length <= 3 && e.target.value > 0) {
                                                    setTrackBPM(e.target.value);
                                                };
                                            }} />
                                        :
                                        <Typography variant="h7">{trackBPM}</Typography>
                                    }
                                </CardContent>
                            </Grid>

                            {isEditing ?
                                editInfo ?
                                    <Grid item xs={1} sx={{ paddingBottom: 5 }}>
                                        <Button sx={{ color: 'orange' }} onClick={() => handleClick()}><SaveIcon /></Button>
                                    </Grid>
                                    :
                                    <Grid item xs={1}   >
                                        <Button sx={{ color: 'orange' }} onClick={() => {
                                            onEditInfo(true);
                                            onHideButtons(true);
                                        }} ><EditIcon /></Button>
                                    </Grid>
                                :
                                null
                            }
                        </Grid>
                    </Card >
                </Grid>

                {/* Begin JSX for Movement Buttons and Deletion */}

                {isEditing ?
                    <Grid item xs={1}>
                        <Card sx={{ padding: 0.5, margin: 0.5, height: 80, display: 'flex', bgcolor: 'rgb(50, 50, 50)', color: 'white' }}>
                            <Grid container
                                direction="row"
                                justifyContent="space-evenly"
                                alignItems="center"
                            >
                                {isEditing && !hideButtons ?
                                    <Box>
                                        <Grid item xs={1} sx={{ alignContent: 'center' }}>
                                            <Button sx={{ color: 'orange' }} onClick={() => onOrder(order - 1, order - 2)}><KeyboardArrowUpIcon /></Button>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <Button sx={{ color: 'orange' }} onClick={() => onOrder(order - 1, order)}><KeyboardArrowDownIcon /></Button>
                                        </Grid>
                                    </Box>
                                    :
                                    <Box>
                                        <Grid item xs={1} sx={{ alignContent: 'center' }}>
                                            <Button sx={{ color: 'grey' }}><KeyboardArrowUpIcon /></Button>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <Button sx={{ color: 'grey' }}><KeyboardArrowDownIcon /></Button>
                                        </Grid>
                                    </Box>
                                }
                            </Grid>
                        </Card>
                    </Grid>
                    :
                    null
                }
                {isEditing ?
                    isEditing && !hideButtons ?
                        <Grid item xs={1}>
                            <Card sx={{ padding: 0.5, margin: 0.5, height: 80, display: 'flex', bgcolor: 'rgb(50, 50, 50)', color: 'white' }}>
                                <Button sx={{ color: 'orange' }} onClick={() => onDelete(order)}><DeleteForeverIcon /></Button>
                            </Card>
                        </Grid>
                        :
                        <Grid item xs={1}>
                            <Card sx={{ padding: 0.5, margin: 0.5, height: 80, display: 'flex', bgcolor: 'rgb(50, 50, 50)', color: 'white' }}>
                                <Button sx={{ color: 'grey' }}><DeleteForeverIcon /></Button>
                            </Card>
                        </Grid>
                    :
                    null
                }
            </Grid >
            <Typography sx={{ color: 'red' }} variant="h7">{error}</Typography>
        </Box >
    );
}

export default TrackCard;
