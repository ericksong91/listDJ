import { TextField, Card, CardHeader, Grid } from '@mui/material';

function NewSetFormCard({ onName, onGenre, onDescription, name, description, genre }) {

    return (
        <Grid className="newSetFormCard" item xs={6}>
            <Card sx={{
                color: 'white', input: { color: 'white' }, label: { color: 'white' }, subheader: { color: 'white' },
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
                    inputProps={{ style: { color: 'white' }, maxLength: 150 }}
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
