document.addEventListener('DOMContentLoaded', function() {
    const logoTextElement = document.getElementById('logo-text');
    const logoContainer = document.querySelector('.logo-container');
    const mainContainer = document.querySelector('.container');
    const text = "NAMA ANDA"; // Ganti dengan nama atau logo Anda
    let index = 0;

    // Fungsi untuk menampilkan logo dengan animasi
    function showLogo() {
        setTimeout(() => {
            const loaderContainer = document.querySelector('.loader-container');
            if (loaderContainer) {
                loaderContainer.remove(); // Hapus loader
            }
            logoContainer.classList.add('loaded');
            setTimeout(() => {
                logoContainer.classList.add('rounded');
                // Setelah logo muncul dan jadi bulat, tampilkan konten utama dan teks nama
                mainContainer.classList.add('visible');
                type();
            }, 500); // Delay sebelum jadi bulat
        }, 1500); // Delay setelah "loading" selesai (simulasi)
    }

    // Efek mengetik untuk nama
    function type() {
        if (index < text.length) {
            logoTextElement.innerHTML += text.charAt(index);
            index++;
            setTimeout(type, 100); // Kecepatan mengetik (ms)
        }
    }

    // Mulai animasi logo
    showLogo();
});
