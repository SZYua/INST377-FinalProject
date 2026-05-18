const express = require('express');
const bodyParser = require('body-parser');
const supabaseClient = require('@supabase/supabase-js');
const dotenv = require('dotenv');

const app = express();
const port = 3000;
dotenv.config();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);

app.get('/api/searchAnime', async (req, res) => {
    console.log('Searching anime scene...');

    const imageUrl = req.query.url;

    if (!imageUrl) {
        res.statusCode = 400;
        res.send('Image URL is required');
        return;
    }

    try {
        const data = await fetch(
            `https://api.trace.moe/search?url=${encodeURIComponent(imageUrl)}`)
            .then((result) => result.json());
        
        console.log('Anime data received');
        res.json(data);
    } catch(error) {
        console.log(`Error: ${error}`);
        res.statusCode = 500;
        res.send(error);
    }
});

app.get('/api/history', async (req, res) => {
    console.log('Attempting to get all histories....');

    const { data, error } = await supabase.from('history').select();

    if (error) {
        console.log(`Error: ${error}`);
        res.statusCode = 500;
        res.send(error);
    } else {
        console.log('Recieved History Data:', data.length);
        res.json(data);
    }
});

app.post('/api/saveResult', async (req, res) => {
    console.log('Saving anime search result...');
    console.log(`Request: ${JSON.stringify(req.body)}`);

    const {
        search_id,
        anime_title,
        episode,
        similarity,
        timestamp,
        image,
        video
    } = req.body;

    const { data, error } = await supabase
        .from('history')
        .insert([
            {
                search_id,
                anime_title,
                episode,
                similarity,
                timestamp,
                image,
                video
            }
        ]);

    if (error) {
        console.log(`Error: ${error}`);
        res.statusCode = 500;
        res.send(error);
    } else {
        res.json(data);
    }
});

app.listen(port, () => {
  console.log(`App is available on port: ${port}`);
});