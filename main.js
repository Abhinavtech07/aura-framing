// AI Device Scanner Logic for Click Conversions
document.addEventListener('DOMContentLoaded', () => {
    const scanButton = document.getElementById('scanButton');
    const deviceInput = document.getElementById('deviceInput');
    const aiResult = document.getElementById('aiResult');
    const monetagBtn = document.getElementById('monetagDownloadBtn');

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
            monetagBtn.style.display = 'none';
            scanButton.disabled = true;
            scanButton.style.opacity = '0.5';

            // 2. Simulated AI delay (Creates suspense)
            setTimeout(() => {
                // The psychological hook
                aiResult.style.color = '#00ff88';
                aiResult.style.background = 'rgba(0, 255, 136, 0.1)';
                aiResult.innerHTML = `✅ <b>SUCCESS:</b> The ${device} has enough processing power to handle the 4K Ultra-Realistic Engine. Maximum framerate unlocked.`;
                
                // 3. Reveal the scroll button instead of Monetag link directly
                scanButton.innerHTML = '👇 SELECT YOUR GAME BELOW 👇';
                scanButton.style.background = '#00ff00';
                scanButton.style.color = '#000';
                scanButton.style.cursor = 'pointer';
                scanButton.style.opacity = '1';
                scanButton.disabled = false;
                
                scanButton.onclick = function() {
                    const gamesSection = document.getElementById('games-section');
                    if (gamesSection) {
                        gamesSection.scrollIntoView({ behavior: 'smooth' });
                    }
                };
            }, 3000); // 3 seconds of suspense
        });
    }
});