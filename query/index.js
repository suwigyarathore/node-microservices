const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const post = {};

app.get('/post', (req, res) => {
   res.send(post);
});

app.post('/events', (req, res) => {
    const {type, data} = req.body;
    if(type === 'PostCreated') {
        const { id, title  } = data;
        post[id] = {id, title, comments: []};
    }
    if(type === 'CommentCreated') {
        const { id, content, postId  } = data;
        post[postId].comments.push({id, content});
    }

    console.log(post);
    res.send({ status: 'OK'});
})

app.listen(4002, () => {
    console.log('Listening on port 4002')
})