async function searchAnimeScene() {
    const button = document.getElementById('searchButton');

    button.addEventListener('click', async () => {
        const imageUrl = document.getElementById('imageUrl').value;
        const data = await fetch(
            `/api/searchAnime?url=${encodeURIComponent(imageUrl)}`)
            .then((result) => result.json());
        console.log(data);

        document.getElementById('results').style.display = 'block';

        document.getElementById('searchedImage').src = imageUrl;

        const searchResults = document.getElementById('resultsBody');
        searchResults.innerHTML = '';

        data.result.forEach(result => {
            const similarity = (result.similarity * 100).toFixed(2);

            searchResults.innerHTML += `
                <tr>
                    <td>
                        <img src="${result.image}" width="150" alt="imagepreview">
                    </td>

                    <td>${result.filename}</td>
                    <td>${result.episode}</td>
                    <td>${similarity}</td>
                    <td>${result.from.toFixed(2)}s</td>
                    <td>
                        <a href="${result.video}" target="_blank">Watch Preview</a>
                    </td>
                <tr>
            `;
        })

        const topThree = data.result.slice(0,3);
        const searchId = Date.now();

        topThree.forEach(async result => {
            await fetch('/api/saveResult', {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    search_id: searchId,
                    anime_title: result.filename,
                    episode: result.episode,
                    similarity: (result.similarity * 100).toFixed(2),
                    timestamp: result.from.toFixed(2),
                    image: result.image,
                    video: result.video
                })
            });
        });
    });
}
if (document.getElementById('searchButton')) {
    searchAnimeScene();
}

async function loadHistory() {
    const charts = {};
    const data = await fetch('api/history')
        .then((result) => result.json());
    console.log(data);

    const histories = document.getElementById('histories');
    const grouped = {};
    data.forEach(history => {
        if(!grouped[history.search_id]) {
            grouped[history.search_id] = [];
        }
        grouped[history.search_id].push(history);
    });
    Object.keys(grouped).forEach(searchId => {
        const searchResults = grouped[searchId];
        const historyBlock = document.createElement('div');
        historyBlock.classList.add('history-block');
        historyBlock.innerHTML = `
            <h2>Search ${searchId}</h2>
            <canvas id="chart-${searchId}"></canvas>
            <div class="details-box" id="details-${searchId}">
                Click a bar to view more details
            </div>
        `;

        histories.appendChild(historyBlock);
        
        const ctx = document.getElementById(`chart-${searchId}`);
        const similarities = searchResults.map(result => parseFloat(result.similarity));
        charts[searchId] = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [
                    'Result 1',
                    'Result 2',
                    'Result 3'
                ],

                datasets:[{
                    label: 'Similarity Score in %',
                    data: similarities
                }]
            },

            options: {
                onClick: (event, elements) => {
                    if(elements.length > 0) {
                        const index = elements[0].index;
                        const selected = searchResults[index];
                        document.getElementById(`details-${searchId}`).innerHTML = `
                            <h3>${selected.anime_title}</h3>
                            <img src="${selected.image}" width="250">
                            <p>Episode:${selected.episode}</p>
                            <p>Similarity:${selected.similarity}%</p>
                            <p>Timestamp:${selected.timestamp}s</p>
                            <a href="${selected.video}" target="_blank">Watch Preview</a>
                        `;
                    }
                }
            }
        });
    });
}
if(document.getElementById('histories')) {
    loadHistory();
}

function gotoSearch() {
    window.location.href = "search.html";
}


