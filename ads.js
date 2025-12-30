/**
 * AuraFramer Ad Management System
 * Specialized for high-performance and safe loading in mobile browsers.
 */

const AD_CONFIG = {
    banner: {
        key: '1f337db27a0d5b62ae02902a6ad75bd1',
        format: 'iframe',
        height: 50,
        width: 320
    }
};

/**
 * Safely loads an inline ad into the specified container
 * @param {string} containerId - The ID of the element to inject the ad into
 */
function loadInlineAd(containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.warn(`Ad container not found: ${containerId}`);
        return;
    }

    // Don't reload if already contains content
    if (container.children.length > 0) return;

    try {
        const scriptConfig = document.createElement('script');
        scriptConfig.type = 'text/javascript';
        scriptConfig.text = `
            atOptions = {
                'key' : '${AD_CONFIG.banner.key}',
                'format' : '${AD_CONFIG.banner.format}',
                'height' : ${AD_CONFIG.banner.height},
                'width' : ${AD_CONFIG.banner.width},
                'params' : {}
            };
        `;
        
        const scriptInvoke = document.createElement('script');
        scriptInvoke.type = 'text/javascript';
        scriptInvoke.src = \`https://www.highperformanceformat.com/\${AD_CONFIG.banner.key}/invoke.js\`;
        
        container.appendChild(scriptConfig);
        container.appendChild(scriptInvoke);
        
        console.log(`Injected ad into ${containerId}`);
    } catch (error) {
        console.error(`Failed to load ad in ${containerId}:`, error);
    }
}

// Export for global access if needed
window.loadInlineAd = loadInlineAd;