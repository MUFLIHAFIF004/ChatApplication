// script.js

// Mengambil elemen-elemen yang dibutuhkan
const chatBox = document.getElementById("chat-box");
const userMessageInput = document.getElementById("user-message");
const sendButton = document.getElementById("send-button");
const notificationIcon = document.getElementById("notification-icon");
const notificationHistory = document.getElementById("notification-history");
const notificationList = document.getElementById("notification-list");

// Menyimpan histori notifikasi
let notifications = [];

// Fungsi untuk menambahkan pesan ke chat box
function addMessage(message, sender) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender);
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Men-scroll ke bawah agar pesan terbaru terlihat
}

// Fungsi untuk menampilkan histori notifikasi
function showNotificationHistory() {
    // Mengosongkan daftar notifikasi yang ada
    notificationList.innerHTML = '';

    // Menampilkan setiap notifikasi dalam histori
    notifications.forEach(notification => {
        const li = document.createElement('li');
        li.textContent = notification;
        notificationList.appendChild(li);
    });
}

// Fungsi untuk menampilkan notifikasi
function showNotification(message) {
    notifications.push(message); // Menambahkan notifikasi ke histori
    notificationIcon.classList.add("new-notification"); // Menambahkan efek baru pada ikon

    // Tampilkan notifikasi dalam histori
    showNotificationHistory();
    
    // Menambahkan notifikasi ke halaman (opsional)
    alert(message); // Opsional, bisa diganti dengan menampilkan elemen UI
}

// Fungsi untuk toggle histori notifikasi
function toggleNotificationHistory() {
    if (notificationHistory.style.display === 'none' || notificationHistory.style.display === '') {
        notificationHistory.style.display = 'block'; // Tampilkan histori
    } else {
        notificationHistory.style.display = 'none'; // Sembunyikan histori
    }
}

// Fungsi untuk mengirim pesan pengguna dan menampilkan pesan bot
function sendMessage() {
    const userMessage = userMessageInput.value.trim();

    if (userMessage) {
        // Menambahkan pesan pengguna ke chat
        addMessage(userMessage, "user");

        // Kosongkan input
        userMessageInput.value = "";

        // Menambahkan pesan bot setelah sedikit jeda
        setTimeout(() => {
            const botMessage = "Thank you for your message! I will get back to you shortly.";
            addMessage(botMessage, "bot");

            // Menampilkan notifikasi setelah bot membalas
            showNotification("New Message from Chat Bot!");
        }, 1000); // Bot akan menjawab setelah 1 detik
    }
}

// Menangani klik tombol "Send"
sendButton.addEventListener("click", sendMessage);

// Menangani tekan tombol "Enter" di input
userMessageInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});
