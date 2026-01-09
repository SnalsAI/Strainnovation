/**
 * STRAINnovation S.r.l. - Three.js 3D Background
 * Particle Network Animation for Hero Section
 */

(function() {
    'use strict';

    // Wait for Three.js to load
    if (typeof THREE === 'undefined') {
        console.warn('Three.js not loaded. Skipping 3D background.');
        return;
    }

    // Configuration
    const config = {
        particleCount: 100,
        particleSize: 2,
        connectionDistance: 150,
        mouseInfluence: 0.5,
        rotationSpeed: 0.0002,
        colors: {
            particles: 0x1E88E5,
            connections: 0x00C853
        }
    };

    // Scene setup
    let scene, camera, renderer;
    let particles, particleGeometry, particleMaterial;
    let lines, lineGeometry, lineMaterial;
    let mouseX = 0, mouseY = 0;
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;

    // Initialize
    function init() {
        const canvas = document.getElementById('threeBg');
        if (!canvas) return;

        // Scene
        scene = new THREE.Scene();

        // Camera
        camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            1,
            1000
        );
        camera.position.z = 400;

        // Renderer
        renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Create particles
        createParticles();

        // Create connections
        createConnections();

        // Event listeners
        document.addEventListener('mousemove', onMouseMove, false);
        window.addEventListener('resize', onWindowResize, false);

        // Check theme and adjust colors
        updateThemeColors();
        observeThemeChanges();

        // Start animation
        animate();
    }

    // Create particle system
    function createParticles() {
        particleGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(config.particleCount * 3);
        const velocities = [];

        for (let i = 0; i < config.particleCount; i++) {
            const x = Math.random() * 800 - 400;
            const y = Math.random() * 800 - 400;
            const z = Math.random() * 800 - 400;

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            velocities.push({
                x: (Math.random() - 0.5) * 0.5,
                y: (Math.random() - 0.5) * 0.5,
                z: (Math.random() - 0.5) * 0.5
            });
        }

        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particleGeometry.velocities = velocities;

        particleMaterial = new THREE.PointsMaterial({
            color: config.colors.particles,
            size: config.particleSize,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true
        });

        particles = new THREE.Points(particleGeometry, particleMaterial);
        scene.add(particles);
    }

    // Create connections between particles
    function createConnections() {
        lineGeometry = new THREE.BufferGeometry();
        lineMaterial = new THREE.LineBasicMaterial({
            color: config.colors.connections,
            transparent: true,
            opacity: 0.3,
            blending: THREE.AdditiveBlending
        });

        lines = new THREE.LineSegments(lineGeometry, lineMaterial);
        scene.add(lines);
    }

    // Update connections
    function updateConnections() {
        const positions = particleGeometry.attributes.position.array;
        const linePositions = [];

        for (let i = 0; i < config.particleCount; i++) {
            const x1 = positions[i * 3];
            const y1 = positions[i * 3 + 1];
            const z1 = positions[i * 3 + 2];

            for (let j = i + 1; j < config.particleCount; j++) {
                const x2 = positions[j * 3];
                const y2 = positions[j * 3 + 1];
                const z2 = positions[j * 3 + 2];

                const distance = Math.sqrt(
                    Math.pow(x2 - x1, 2) +
                    Math.pow(y2 - y1, 2) +
                    Math.pow(z2 - z1, 2)
                );

                if (distance < config.connectionDistance) {
                    linePositions.push(x1, y1, z1);
                    linePositions.push(x2, y2, z2);
                }
            }
        }

        lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    }

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        // Update particle positions
        const positions = particleGeometry.attributes.position.array;
        const velocities = particleGeometry.velocities;

        for (let i = 0; i < config.particleCount; i++) {
            // Update positions based on velocities
            positions[i * 3] += velocities[i].x;
            positions[i * 3 + 1] += velocities[i].y;
            positions[i * 3 + 2] += velocities[i].z;

            // Boundary check and bounce
            const boundary = 400;
            if (Math.abs(positions[i * 3]) > boundary) {
                velocities[i].x *= -1;
            }
            if (Math.abs(positions[i * 3 + 1]) > boundary) {
                velocities[i].y *= -1;
            }
            if (Math.abs(positions[i * 3 + 2]) > boundary) {
                velocities[i].z *= -1;
            }
        }

        particleGeometry.attributes.position.needsUpdate = true;

        // Update connections
        updateConnections();

        // Rotate scene slightly
        particles.rotation.y += config.rotationSpeed;
        lines.rotation.y += config.rotationSpeed;

        // Mouse parallax effect
        camera.position.x += (mouseX * config.mouseInfluence - camera.position.x) * 0.05;
        camera.position.y += (-mouseY * config.mouseInfluence - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        // Render
        renderer.render(scene, camera);
    }

    // Mouse move handler
    function onMouseMove(event) {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
    }

    // Window resize handler
    function onWindowResize() {
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    // Update colors based on theme
    function updateThemeColors() {
        const theme = document.body.getAttribute('data-theme');

        if (theme === 'light') {
            particleMaterial.color.setHex(0x0A1F44);
            particleMaterial.opacity = 0.6;
            lineMaterial.color.setHex(0x1E88E5);
            lineMaterial.opacity = 0.2;
        } else {
            particleMaterial.color.setHex(config.colors.particles);
            particleMaterial.opacity = 0.8;
            lineMaterial.color.setHex(config.colors.connections);
            lineMaterial.opacity = 0.3;
        }
    }

    // Observe theme changes
    function observeThemeChanges() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                    updateThemeColors();
                }
            });
        });

        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ['data-theme']
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
