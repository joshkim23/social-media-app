import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';


const NewPost= ({username, handleSubmitPost}) => {
    const [post, setPost] = useState('');
    const styles = {
        mainContainer: {
            display: 'grid',
            alignItems: 'center',
            backgroundColor: '#fff',
            padding: '15px',
            borderRadius: '10px'
        }
    }

    function handleSubmit() {
        if(post) {
            handleSubmitPost(post)
        }
    }

    return (
        <Box style={styles.mainContainer} boxShadow={4}>
            <Typography variant="h5" style={{justifySelf: 'center', paddingBottom: '5px'}}>
                Create Post
            </Typography>
            <TextField
                label="What's on your mind?"
                variant="outlined"
                onChange={event => setPost(event.target.value)}
                style={{paddingBottom: '20px'}}
            />
            <Button onClick={() => handleSubmit()} fullWidth={false} variant="outlined" color="primary">
                Post
            </Button>
        </Box>
    )
}

export default NewPost;