document.getElementById('lyrics-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const artist = document.getElementById('artist').value.trim();
    const song = document.getElementById('song').value.trim();
    const lyricsContainer = document.getElementById('lyrics-container');

    lyricsContainer.textContent = 'Loading...';

    try {
        // Yeni bir proxy sunucusu kullanmak
        const proxyUrl = "https://api.allorigins.win/raw?url=";
        const apiUrl = `https://api.lyrics.ovh/v1/${artist}/${song}`;
        const response = await fetch(proxyUrl + encodeURIComponent(apiUrl));

        // API yanıt kontrolü
        if (!response.ok) {
            throw new Error('Lyrics not found');
        }

        const data = await response.json();

        // Şarkı sözleri bulunursa, ekrana yazdırma
        if (data.lyrics) {
            lyricsContainer.textContent = data.lyrics;
        } else {
            lyricsContainer.textContent = 'Lyrics not available';
        }

    } catch (error) {
        lyricsContainer.textContent = `Error: ${error.message}`;
    }
});



