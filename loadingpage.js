document.addEventListener("DOMContentLoaded", function () {
    const textContainer = document.getElementById("text-container");
    const sentences = [
        "Tekrardan gelmene sevindimm !! Hoş Geldin Esma.",
        "Ben senin yapay zekan  4 yapraklı yonca “🍀”",
        "Sevdiklerinden mesajlar ve fotoğraflar var.",
        "Size özel oluşturduğum sayfaya yönlendirmenizi gerçekleştiriyorum...",
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
        // Yazma tamamlandığında sesi durdur
        document.getElementById("typeSound").pause();

        // Yazma işlemi tamamlandığında silme işlemine başla
        setTimeout(function () {
            document.getElementById("deleteSound").play(); // Silme sesini çal
            deleteText(element, currentSentence.length, function () {
                // Silme tamamlandığında sesi durdur
                document.getElementById("deleteSound").pause();

                // Bir sonraki cümleye geç veya yönlendirme yap
                index = (index + 1) % sentences.length;
                if (currentSentence.trim() === "---") {
                    window.location.href = "dg.html"; // Yönlendirme yap
                } else {
                    // Devam et
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

        // Yazma işlemi sırasında sesi çal
        document.getElementById("typeSound").play();

        setTimeout(function () {
            typeWriter(element, text, index, callback);
        }, 40); // Yazı hızını buradan ayarlayabilirsiniz
    } else {
        // Yazı tamamlandığında sesi durdur
        document.getElementById("typeSound").pause();
        callback();
    }
}

function deleteText(element, length, callback) {
    setTimeout(function () {
        if (length > 0) {
            element.innerText = element.innerText.slice(0, -1);
            length--;

            // Silme işlemi sırasında sesi çal
            document.getElementById("deleteSound").play();

            deleteText(element, length, callback);
        } else {
            // Silme tamamlandığında sesi durdur
            document.getElementById("deleteSound").pause();
            callback();
        }
    }, 30); // Silme hızını buradan ayarlayabilirsiniz
}
