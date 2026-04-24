document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize tsParticles (Star Background)
    tsParticles.load("tsparticles", {
        background: {
            color: {
                value: "transparent",
            },
        },
        fpsLimit: 60,
        interactivity: {
            events: {
                onHover: {
                    enable: true,
                    mode: "bubble",
                },
                resize: true,
            },
            modes: {
                bubble: {
                    distance: 200,
                    size: 6,
                    duration: 2,
                    opacity: 0.8,
                },
            },
        },
        particles: {
            color: {
                value: ["#ffffff", "#60A5FA", "#FBBF24"],
            },
            links: {
                enable: false,
            },
            move: {
                direction: "none",
                enable: true,
                outModes: {
                    default: "bounce",
                },
                random: true,
                speed: 0.5,
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                    area: 800,
                },
                value: 100, // Number of stars
            },
            opacity: {
                value: { min: 0.1, max: 0.7 },
                animation: {
                    enable: true,
                    speed: 1,
                    minimumValue: 0.1,
                    sync: false
                }
            },
            shape: {
                type: "circle",
            },
            size: {
                value: { min: 1, max: 3 },
            },
        },
        detectRetina: true,
    });

    // 2. Initialize jQuery Water Ripples on the background container
    try {
        $('.water-ripple-container').ripples({
            resolution: 512,
            dropRadius: 20,
            perturbance: 0.04,
            interactive: true
        });

        // Optional: Automate random drops to make it feel alive even without clicking
        setInterval(function() {
            var $el = $('.water-ripple-container');
            var x = Math.random() * $el.outerWidth();
            var y = Math.random() * $el.outerHeight();
            var dropRadius = 20;
            var strength = 0.04 + Math.random() * 0.04;

            $el.ripples('drop', x, y, dropRadius, strength);
        }, 3000); // Random drop every 3 seconds

    } catch (e) {
        console.error("jQuery Ripples failed to load. Make sure WebGL is enabled.", e);
    }

    // 3. Simple Navbar scroll effect
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.glass-nav');
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(15, 23, 42, 0.95)';
            nav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4)';
        } else {
            nav.style.background = 'rgba(15, 23, 42, 0.8)';
            nav.style.boxShadow = 'none';
        }
    });
    // 4. Furina Bonk Mini-game
    const bonkImg = document.getElementById('furina-bonk-img');
    const hitCountDisplay = document.getElementById('hit-count');
    let hitCount = 0;
    let bonkTimeout;

    if (bonkImg && hitCountDisplay) {
        bonkImg.addEventListener('mousedown', () => {
            // Increment score
            hitCount++;
            hitCountDisplay.innerText = hitCount;

            // Change image to bonk and add shake effect
            bonkImg.src = 'assets/2d/bonk.png';
            bonkImg.classList.add('shake-effect');

            // Optional: trigger water ripple where clicked
            try {
                var $el = $('.water-ripple-container');
                var offset = $(bonkImg).offset();
                var x = offset.left + $(bonkImg).width() / 2;
                var y = offset.top + $(bonkImg).height() / 2;
                $el.ripples('drop', x, y, 30, 0.08);
            } catch(e) {}

            // Reset image and animation after short delay
            clearTimeout(bonkTimeout);
            bonkTimeout = setTimeout(() => {
                bonkImg.src = 'assets/2d/laugh.png';
                bonkImg.classList.remove('shake-effect');
            }, 200); // 200ms delay for the bonk effect
        });
        
        // Prevent default dragging behavior
        bonkImg.addEventListener('dragstart', (e) => e.preventDefault());
    }
});
