// Mengatur canvas agar sesuai dengan ukuran window
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Menyimpan posisi mouse
let mouse = {
    x: null,
    y: null,
    radius: 100 // Area interaksi mouse
};

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

// Class untuk membuat partikel
class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
        this.baseX = this.x; // Simpan posisi awal
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 1;
    }

    // Menggambar partikel
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = 'rgba(0, 242, 255, 0.5)';
        ctx.fill();
    }

    // Memperbarui posisi partikel
    update() {
        // Cek jarak partikel dengan mouse
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        // Jika partikel berada dalam radius mouse, dorong menjauh
        if (distance < mouse.radius) {
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            let maxDistance = mouse.radius;
            let force = (maxDistance - distance) / maxDistance;
            let directionX = forceDirectionX * force * this.density;
            let directionY = forceDirectionY * force * this.density;

            this.x -= directionX;
            this.y -= directionY;
        } else {
            // Jika tidak, kembalikan ke posisi semula
            if (this.x !== this.baseX) {
                let dx = this.x - this.baseX;
                this.x -= dx / 10;
            }
            if (this.y !== this.baseY) {
                let dy = this.y - this.baseY;
                this.y -= dy / 10;
            }
        }
        this.draw();
    }
}

// Membuat array partikel
let particlesArray = [];
function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * .2) - .1;
        let directionY = (Math.random() * .2) - .1;
        let color = '#8C5523';
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

// Loop animasi
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
}

// Panggil fungsi
init();
animate();

// Menyesuaikan ulang canvas jika ukuran window berubah
window.addEventListener('resize', function() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    mouse.radius = 100;
    init();
});

// Set mouse position to null when it leaves the screen
window.addEventListener('mouseout', function(){
    mouse.x = undefined;
    mouse.y = undefined;
})
