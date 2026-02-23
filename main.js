// AI Device Scanner Logic for Click Conversions
document.addEventListener('DOMContentLoaded', () => {
    const scanButton = document.getElementById('scanButton');
    const deviceInput = document.getElementById('deviceInput');
    const aiResult = document.getElementById('aiResult');

    if(scanButton) {
        scanButton.addEventListener('click', () => {
            const device = deviceInput.value.trim();
            if (!device) {
                alert("Please enter your phone model first!");
                return;
            }

            // 1. Show fake scanning animation
            aiResult.style.display = 'block';
            aiResult.style.color = '#00d4ff';
            aiResult.style.background = 'rgba(0, 212, 255, 0.1)';
            aiResult.innerHTML = `Analyzing GPU capabilities for ${device}... <span class="spinner">⏳</span>`;
            scanButton.disabled = true;
            scanButton.style.opacity = '0.5';

            // 2. Simulated AI delay (Creates suspense)
            setTimeout(() => {
                // The psychological hook
                aiResult.style.color = '#00ff88';
                aiResult.style.background = 'rgba(0, 255, 136, 0.1)';
                aiResult.innerHTML = `✅ <b>SUCCESS:</b> The ${device} has enough processing power to handle the 4K Ultra-Realistic Engine. Maximum framerate unlocked.`;
                
                // 3. Reveal the scroll button
                scanButton.innerHTML = '👇 SELECT YOUR GAME BELOW 👇';
                scanButton.style.background = '#00ff00';
                scanButton.style.color = '#000';
                scanButton.style.cursor = 'pointer';
                scanButton.style.opacity = '1';
                scanButton.disabled = false;
                
                scanButton.onclick = function() {
                    const gamesSection = document.getElementById('gamesGrid');
                    if (gamesSection) {
                        gamesSection.scrollIntoView({ behavior: 'smooth' });
                    }
                };
            }, 3000); // 3 seconds of suspense
        });
    }
});
function showGameDetail(gameId) {
    const game = games.find(g => g.id === gameId);
    if (!game) return;

    // TRIGGER THE HIGH-CPM VIGNETTE AD HERE ON CARD CLICK
    (function(s){
        s.dataset.zone='10512785'; // Your specific Monetag Vignette Zone
        s.src='https://gizokraijaw.net/vignette.min.js';
        document.body.appendChild(s);
    })(document.createElement('script'));

    document.getElementById('detailTitle').textContent = `${game.name} - Full Review`;
    document.getElementById('detailSubtitle').textContent = game.description.substring(0, 100) + '...';
    document.getElementById('detailImage').src = game.image;
    document.getElementById('detailDescription').textContent = game.description;
    document.getElementById('detailFeatures').innerHTML = game.features.map(f => `<li>${f}</li>`).join('');

    // Attach the 5-second delay ONLY to the buttons on this details page
    document.getElementById('mainDownloadBtn').onclick = function() { triggerSecureLink(game.playStoreUrl); };
    document.getElementById('altDownloadBtn').onclick = function() { triggerSecureLink(game.playStoreUrl); };

    navigateTo('detail');
}