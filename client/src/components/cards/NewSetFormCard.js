import { TextField, Card, CardHeader, Grid } from '@mui/material';

function NewSetFormCard({ onName, onGenre, onDescription, onTrackLength, name, description, genre, trackLength }) {
    return (
        <Grid className="newSetFormCard" item xs={6}>
            <Card sx={{
                color: 'white', input: { color: 'white' }, label: { color: 'grey' }, subheader: { color: 'white' },
                maxheight: 800, padding: 1, margin: 1, paddingBottom: 3, bgcolor: 'rgb(50,50,50)', boxShadow: 10
            }}>
                <CardHeader
                    title={"Details"}
                    subheader={name}
                    subheaderTypographyProps={{ style: { color: 'white' } }}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Setlist Name"
                    name="name"
                    type="text"
                    inputProps={{ maxLength: 30 }}
                    autoFocus
                    value={name}
                    onChange={(e) => onName(e.target.value.trimStart())}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    multiline={true}
                    minRows={4}
                    id="description"
                    name="description"
                    type="text"
                    inputProps={{ style: { color: 'white' }, maxLength: 150 }}
                    label={`Description (${150 - description.length} chars left)`}
                    value={description}
                    onChange={(e) => onDescription(e.target.value.trimStart())}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="genre"
                    name="genre"
                    type="text"
                    inputProps={{ maxLength: 50 }}
                    label={`Genre (${50 - genre.length} chars left)`}
                    value={genre}
                    onChange={(e) => onGenre(e.target.value.trimStart())}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="length"
                    name="length"
                    type="number"
                    inputProps={{ maxLength: 3 }}
                    label={`Approx. Length (min)`}
                    value={trackLength}
                    onChange={(e) => {
                        if (e.target.value.toString().length <= 3 && e.target.value >= 0 && /^[0-9\b]+$/.test(e.target.value)) {
                            onTrackLength(e.target.value.trimStart());
                        };
                    }}
                />
            </Card>
        </Grid>
    );
}

export default NewSetFormCard;
