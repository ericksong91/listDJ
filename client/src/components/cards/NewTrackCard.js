import { useState } from 'react';
import { Button, TextField, Card, CardHeader, Grid, Typography } from '@mui/material';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function NewTrackCard({ genres, onSetlist }) {
    const [track, setTrack] = useState("");
    const [trackArtist, setTrackArtist] = useState("");
    const [trackBPM, setTrackBPM] = useState("");
    const [trackGenre, setTrackGenre] = useState("");
    const [trackLength, setTrackLength] = useState({ min: 0, sec: 0 });
    const [error, setError] = useState("");
    const [order, setOrder] = useState(1);

    if (!genres) {
        return <div></div>
    };

    const genresListSelect = genres.map((gen, ind) => <MenuItem key={ind} value={gen}>{gen}</MenuItem>);

    function handleClick() {
        const length = parseInt(trackLength.min * 60) + parseInt(trackLength.sec);
        const newTrack = {
            name: track,
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

            onSetlist(newTrack, order);
            setOrder(order + 1);

            setTrack("");
            setTrackBPM("");
            setTrackArtist("");
            setTrackGenre("");
            setTrackLength({ min: 0, sec: 0 });
            setError("");
        };
    };

    return (
        <Grid item xs={6}>
            <Card sx={{
                color: 'white', input: { color: 'white' }, label: { color: 'grey' }, subheader: { color: 'white' },
                maxheight: 800, padding: 1, margin: 1, paddingBottom: 3, bgcolor: 'rgb(50,50,50)', boxShadow: 10,
            }}>
                <CardHeader
                    title={"Add Track"}
                    subheader={`${track} by ${trackArtist}`}
                    subheaderTypographyProps={{ style: { color: 'white' } }}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="track"
                    name="track"
                    type="text"
                    inputProps={{ maxLength: 100 }}
                    label={`Track Name (${100 - track.length} chars left)`}
                    value={track}
                    onChange={(e) => setTrack(e.target.value.trimStart())}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="trackartist"
                    name="trackartist"
                    type="text"
                    inputProps={{ maxLength: 50 }}
                    label={`Artist Name (${50 - trackArtist.length} chars left)`}
                    value={trackArtist}
                    onChange={(e) => setTrackArtist(e.target.value.trimStart())}
                />
                <Grid container>
                    <Grid item xs={4}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="length"
                            name="length"
                            type="number"
                            inputProps={{ maxLength: 2 }}
                            label={`Length (min)`}
                            value={trackLength.min}
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
                    <Grid item xs={4} sx={{ marginLeft: 0.5 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="length"
                            name="length"
                            type="number"
                            inputProps={{ maxLength: 2 }}
                            label={`Length (sec)`}
                            value={trackLength.sec}
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
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="bpm"
                    name="bpm"
                    type="number"
                    inputProps={{ maxLength: 3 }}
                    label={`Set BPM (Beats Per Minute)`}
                    value={trackBPM}
                    onChange={(e) => {
                        if (e.target.value.toString().length <= 3 && e.target.value > 0) {
                            setTrackBPM(e.target.value);
                        };
                    }} />
                <FormControl fullWidth required margin="normal">
                    <InputLabel>Genre</InputLabel>
                    <Select
                        label="trackgenre"
                        value={trackGenre}
                        id="trackgenre"
                        sx={{ color: 'white' }}
                        onChange={(e) => setTrackGenre(e.target.value)}
                    >
                        {genresListSelect}
                    </Select>
                </FormControl>
                <Typography variant="h7" sx={{ color: 'red' }}>{error ? `*${error}` : null}</Typography>
            </Card>
            <Button variant="contained" sx={{ '&:hover': { bgcolor: 'rgb(194,98,0)' }, bgcolor: 'rgb(245,150,0)' }} fullWidth onClick={() => handleClick()}>Add Track</Button>
        </Grid>
    );
}

export default NewTrackCard;
