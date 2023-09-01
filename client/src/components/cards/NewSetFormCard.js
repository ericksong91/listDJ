import {
    TextField, Card, CardHeader, Grid
} from '@mui/material';

function NewSetFormCard({ onName, onGenre, onDescription, name, description, genre }) {

    return (
        <Grid item xs={6}>
            <Card sx={{ maxheight: 800, padding: 1, margin: 1, paddingBottom: 3 }} >
                <CardHeader
                    title={"Details"}
                    subheader={name}
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
                    onChange={(e) => onName(e.target.value)}
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
                    inputProps={{ maxLength: 150 }}
                    label={`Description (${150 - description.length} chars left)`}
                    value={description}
                    onChange={(e) => onDescription(e.target.value)}
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
                    onChange={(e) => onGenre(e.target.value)}
                />
            </Card>
        </Grid>
    );
}

export default NewSetFormCard;
