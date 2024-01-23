document.addEventListener("DOMContentLoaded", function () {
    const textContainer = document.getElementById("text-container");
    const sentences = [
        "Kimlik Doğrulama İşlemi Başarıyla Gerçekleşmiştir!!",
        "AHHH UZUN ZAMANDIR SENİ BEKLİYORDUM !! Hoş Geldin Esma.",
        "Ben senin için tasarlanmış bir yapay zeka aracıyım.İsmim 4 yapraklı yonca “🍀”",
        "Size özel oluşturduğum sayfaya yönlendirmenizi gerçekleştiriyorum...",
        "Sık sık uğramanız dileklerim ile Hoş Kalın 👋",
        "---"
    ];

    writeAndDelete(sentences, textContainer, 0);
});

function writeAndDelete(sentences, element, index) {
    const currentSentence = sentences[index];
    const displayDuration = currentSentence.length * 50; // Cümle uzunluğuna bağlı olarak ekranda kalma süresi
    const deleteSpeed = 40; // Silme hızı

    // Yazma işlemi
    typeWriter(element, currentSentence, 0, function () {
        // Yazma tamamlandığında silme işlemi
        setTimeout(function () {
            deleteText(element, currentSentence.length, function () {
                // Silme tamamlandığında bir sonraki cümleye geç
                index = (index + 1) % sentences.length;

                // Check if the current sentence is "---" for redirection
                if (currentSentence.trim() === "---") {
                    // Redirect to a different page
                    window.location.href = "dg.html";
                } else {
                    // Continue with the next sentence
                    writeAndDelete(sentences, element, index);
                }
            });
        }, displayDuration); // Cümlenin ekranda kalma süresi
    });
}

function typeWriter(element, text, index, callback) {
    if (index < text.length) {
        element.innerHTML += text.charAt(index);
        index++;
        setTimeout(function () {
            typeWriter(element, text, index, callback);
        }, 40); // Yazı hızını buradan ayarlayabilirsiniz
    } else {
        // Yazı tamamlandığında callback fonksiyonunu çağır
        callback();
    }
}

function deleteText(element, length, callback) {
    setTimeout(function () {
        if (length > 0) {
            element.innerText = element.innerText.slice(0, -1);
            length--;
            deleteText(element, length, callback);
        } else {
            // Silme tamamlandığında callback fonksiyonunu çağır
            callback();
        }
    }, 30); // Silme hızını buradan ayarlayabilirsiniz
}