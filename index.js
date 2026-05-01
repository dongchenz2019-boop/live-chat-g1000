import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const filename = fileURLToPath(import.meta.url);
console.log(filename);
const dirname = path.dirname(filename);
console.log('dirname:', dirname);

app.use(express.static(path.join(dirname, 'public')));
app.use(express.urlencoded({ extended: true }));


app.post('/join', (req, res) => {
    console.log(req.body.nickname);
    res.send('Welcome');
});

app.listen(3000, () => {
    console.log('server started');
});