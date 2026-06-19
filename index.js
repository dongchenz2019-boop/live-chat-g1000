import express, { json } from 'express';
import { findPackageJSON } from 'module';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

let messageId = 1;

app.use(express.static(path.join(dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(dirname, 'views'));

const chat = {
    users: [],
    history: []
};

app.post('/join', (req, res) => {
    const id = messageId++;
    chat.history.push({
        id: messageId++,
        nickname: 'System',
        message: `Welcome ${req.body.nickname}`,
        datetime: new Date()
    });
    res.render('chat', { nickname: req.body.nickname, lastMessageId: id-1 });
});

app.get('/poll', (req, res) => {
    res.status(200).json({users: chat.users, history: chat.history.filter(his => his.id>Number(req.query.lastMessageId))});
});

app.post('/send', (req, res) => {
    chat.history.push({
        id: messageId++,
        nickname: req.body.nickname,
        message: req.body.messageContent,
        datetime: new Date()
    });
    res.status(200).send('OK');
})

app.listen(3000, () => {
    console.log('server started');
});