import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const NewPost= ({username, handleSubmitPost}) => {
    const [post, setPost] = useState('');
    const styles = {
        mainContainer: {
            display: 'grid',
            alignItems: 'center'
        }
    }

    function handleSubmit() {
        if(post) {
            handleSubmitPost(post)
        }
    }

    return (
        <div style={styles.mainContainer}>
            <TextField
                label="What's on your mind?"
                variant="outlined"
                onChange={event => setPost(event.target.value)}
            />
            <Button onClick={() => handleSubmit()} variant="outlined" color="primary">
                Submit
            </Button>
        </div>
    )
}

export default NewPost;