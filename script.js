/* =========================================
   КУРСОР
========================================= */

const cursor =
    document.querySelector(".cursor");

const cursorGlow =
    document.querySelector(".cursor-glow");


document.addEventListener("mousemove", (event) => {

    cursor.style.left =
        event.clientX + "px";

    cursor.style.top =
        event.clientY + "px";


    setTimeout(() => {

        cursorGlow.style.left =
            event.clientX + "px";

        cursorGlow.style.top =
            event.clientY + "px";

    }, 50);

});


/* =========================================
   ПЛАВНАЯ ПРОКРУТКА
========================================= */

function scrollToStory() {

    document
        .getElementById("story")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =========================================
   МУЗЫКА
========================================= */

const music =
    document.getElementById("music");

const musicIcon =
    document.getElementById("musicIcon");

let musicPlaying = false;


function toggleMusic() {

    /*
       Если файла music.mp3 нет,
       браузер покажет ошибку.
    */

    if (!music.querySelector("source")) {

        alert(
            "Добавь файл music.mp3 рядом с index.html ❤️"
        );

        return;

    }


    if (musicPlaying) {

        music.pause();

        musicPlaying = false;

        musicIcon.textContent = "♪";

    }

    else {

        music.play()
            .then(() => {

                musicPlaying = true;

                musicIcon.textContent = "Ⅱ";

            })
            .catch(() => {

                alert(
                    "Браузер заблокировал запуск музыки. Нажми кнопку ещё раз."
                );

            });

    }

}


/* =========================================
   СЧЁТЧИК
========================================= */

/*
   ВАЖНО:

   Здесь поставь дату, когда вы познакомились
   или другой важный момент.

   Формат:

   ГОД, МЕСЯЦ - 1, ДЕНЬ

   Например:

   2025, 4, 15

   означает 15 мая 2025.
*/

const startDate =
    new Date(2026, 1, 5);


function updateCounter() {

    const now =
        new Date();

    let difference =
        now - startDate;


    if (difference < 0) {

        difference = 0;

    }


    const seconds =
        Math.floor(
            difference / 1000
        );


    const days =
        Math.floor(
            seconds / 86400
        );


    const hours =
        Math.floor(
            (seconds % 86400) / 3600
        );


    const minutes =
        Math.floor(
            (seconds % 3600) / 60
        );


    const secs =
        seconds % 60;


    document.getElementById("days")
        .textContent =
        String(days).padStart(3, "0");


    document.getElementById("hours")
        .textContent =
        String(hours).padStart(2, "0");


    document.getElementById("minutes")
        .textContent =
        String(minutes).padStart(2, "0");


    document.getElementById("seconds")
        .textContent =
        String(secs).padStart(2, "0");

}


updateCounter();


setInterval(
    updateCounter,
    1000
);


/* =========================================
   КНОПКА "Я ПОДУМАЮ"
========================================= */

const maybeButton =
    document.getElementById("maybeButton");


let runCount = 0;


function runAway() {

    runCount++;


    /*
       После нескольких попыток
       меняем текст.
    */

    if (runCount === 2) {

        maybeButton.textContent =
            "Точно подумаешь? 😏";

    }


    if (runCount === 4) {

        maybeButton.textContent =
            "Ну нажми «Да» ❤️";

    }


    const x =
        Math.random() * 250 - 125;


    const y =
        Math.random() * 150 - 75;


    maybeButton.style.transform =
        `translate(${x}px, ${y}px)`;

}


/* =========================================
   "ДА"
========================================= */

function sayYes() {

    const question =
        document.querySelector(
            ".question-section"
        );


    question.style.display =
        "none";


    const finalScreen =
        document.getElementById(
            "finalScreen"
        );


    finalScreen.classList.add("show");


    createHeartExplosion();

}


/* =========================================
   СЕРДЕЧКИ
========================================= */

function createHeartExplosion() {

    const symbols = [
        "❤️",
        "💕",
        "💗",
        "♥",
        "💖"
    ];


    for (let i = 0; i < 70; i++) {

        setTimeout(() => {

            const heart =
                document.createElement("div");


            heart.textContent =
                symbols[
                    Math.floor(
                        Math.random()
                        * symbols.length
                    )
                ];


            heart.style.position =
                "fixed";


            heart.style.left =
                Math.random() * 100 + "vw";


            heart.style.top =
                Math.random() * 100 + "vh";


            heart.style.fontSize =
                15 +
                Math.random() * 35 +
                "px";


            heart.style.pointerEvents =
                "none";


            heart.style.zIndex =
                "500";


            heart.style.transition =
                "all 2s ease";


            document.body
                .appendChild(heart);


            setTimeout(() => {

                heart.style.transform =
                    `
                    translate(
                        ${(Math.random() - 0.5) * 500}px,
                        ${-300 - Math.random() * 400}px
                    )
                    rotate(
                        ${Math.random() * 720}deg
                    )
                    `;


                heart.style.opacity =
                    "0";

            }, 50);


            setTimeout(() => {

                heart.remove();

            }, 2200);


        }, i * 35);

    }

}


/* =========================================
   АНИМАЦИЯ ПОЯВЛЕНИЯ
========================================= */

const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.classList.add(
                        "visible"
                    );

                }

            });

        },
        {
            threshold: 0.15
        }
    );


document
    .querySelectorAll(
        ".story-content, .photos-header, .gallery, .fact, .confession-inner, .question-inner"
    )
    .forEach(element => {

        observer.observe(element);

    });