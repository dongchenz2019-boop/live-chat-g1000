import express, { json } from 'express';
import { findPackageJSON } from 'module';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const filename = fileURLToPath(import.meta.url);
console.log(filename);
const dirname = path.dirname(filename);
console.log('dirname:', dirname);

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
    console.log(req.body.nickname);
    chat.history.push({
        nickname: 'System',
        message: `Welcome ${req.body.nickname}`,
        datetime: new Date()
    });
    res.render('chat', { nickname: req.body.nickname });
});

app.get('/poll', (req, res) => {
    res.status(200).json(chat);
});

app.post('/send', (req, res) => {
    chat.history.push({
        nickname: req.body.nickname,
        message: req.body.messageContent,
        datetime: new Date()
    });
    res.status(200);
})

app.listen(3000, () => {
    console.log('server started');
});