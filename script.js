/* =========================================
   KIRAN ACADEMY
   MAIN JAVASCRIPT
========================================= */


/* =========================================
   PAGE LOADER
========================================= */

window.addEventListener("load", function () {

    const loader =
        document.getElementById("loader");

    if (loader) {

        setTimeout(function () {

            loader.classList.add("hide");

        }, 700);

    }

});



/* =========================================
   NAVBAR
========================================= */

const navbar =
    document.querySelector(".navbar");


window.addEventListener("scroll", function () {

    if (!navbar) return;


    if (window.scrollY > 60) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});



/* =========================================
   MOBILE MENU
========================================= */

const mobileMenu =
    document.getElementById("mobileMenu");

const navigation =
    document.getElementById("navigation");


if (mobileMenu && navigation) {


    mobileMenu.addEventListener("click", function () {

        navigation.classList.toggle("active");


        if (
            navigation.classList.contains("active")
        ) {

            mobileMenu.innerHTML = "✕";

        } else {

            mobileMenu.innerHTML = "☰";

        }

    });


}


/* Close menu after clicking */

document
    .querySelectorAll("#navigation a")
    .forEach(function (link) {

        link.addEventListener("click", function () {

            if (navigation) {

                navigation.classList.remove("active");

            }

            if (mobileMenu) {

                mobileMenu.innerHTML = "☰";

            }

        });

    });



/* =========================================
   BACK TO TOP
========================================= */

const backTop =
    document.getElementById("backTop");


window.addEventListener("scroll", function () {

    if (!backTop) return;


    if (window.scrollY > 500) {

        backTop.classList.add("show");

    } else {

        backTop.classList.remove("show");

    }

});


if (backTop) {

    backTop.addEventListener("click", function () {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}



/* =========================================
   SMOOTH INTERNAL SCROLL
========================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(function (anchor) {


        anchor.addEventListener("click", function (event) {


            const targetId =
                this.getAttribute("href");


            if (
                !targetId ||
                targetId === "#"
            ) {

                return;

            }


            const target =
                document.querySelector(targetId);


            if (!target) {

                return;

            }


            event.preventDefault();


            const navbarHeight = 80;


            const position =
                target.getBoundingClientRect().top +
                window.pageYOffset -
                navbarHeight;


            window.scrollTo({

                top: position,

                behavior: "smooth"

            });


        });

    });



/* =========================================
   COUNTERS
========================================= */

const counters =
    document.querySelectorAll("[data-count]");

let countersStarted = false;


function startCounters() {


    if (countersStarted) {

        return;

    }


    countersStarted = true;


    counters.forEach(function (counter) {


        const target =
            parseInt(
                counter.getAttribute("data-count")
            );


        let current = 0;


        const duration = 1600;


        const increment =
            target /
            (duration / 16);


        function updateCounter() {


            current += increment;


            if (current < target) {


                counter.innerText =
                    Math.floor(current)
                        .toLocaleString();


                requestAnimationFrame(
                    updateCounter
                );


            } else {


                counter.innerText =
                    target.toLocaleString();

            }

        }


        updateCounter();


    });

}



const statsSection =
    document.querySelector(".stats-section");


if (statsSection) {


    const statsObserver =
        new IntersectionObserver(
            function (entries) {


                entries.forEach(function (entry) {


                    if (
                        entry.isIntersecting
                    ) {

                        startCounters();

                        statsObserver.disconnect();

                    }


                });


            },
            {
                threshold: .3
            }
        );


    statsObserver.observe(
        statsSection
    );

}



/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
    document.querySelectorAll(
        ".program-card, " +
        ".journey-step, " +
        ".story-card, " +
        ".why-content, " +
        ".section-heading"
    );


revealElements.forEach(function (element) {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(25px)";

    element.style.transition =
        "opacity .7s ease, transform .7s ease";

});


const revealObserver =
    new IntersectionObserver(
        function (entries) {


            entries.forEach(function (entry) {


                if (
                    entry.isIntersecting
                ) {


                    entry.target.style.opacity =
                        "1";


                    entry.target.style.transform =
                        "translateY(0)";


                    revealObserver.unobserve(
                        entry.target
                    );


                }

            });


        },
        {
            threshold: .12
        }
    );


revealElements.forEach(function (element) {

    revealObserver.observe(element);

});



/* =========================================
   STORY SLIDER
========================================= */

const storyTrack =
    document.getElementById(
        "storiesTrack"
    );


const previousStory =
    document.getElementById(
        "previousStory"
    );


const nextStory =
    document.getElementById(
        "nextStory"
    );


let storyIndex = 0;



function getVisibleStories() {


    if (window.innerWidth <= 800) {

        return 1;

    }


    if (window.innerWidth <= 1000) {

        return 2;

    }


    return 3;

}



function updateStorySlider() {


    if (!storyTrack) {

        return;

    }


    const cards =
        storyTrack.querySelectorAll(
            ".story-card"
        );


    if (!cards.length) {

        return;

    }


    const visible =
        getVisibleStories();


    const maxIndex =
        Math.max(
            0,
            cards.length - visible
        );


    if (storyIndex > maxIndex) {

        storyIndex = maxIndex;

    }


    const cardWidth =
        cards[0].getBoundingClientRect().width;


    const gap = 20;


    const movement =
        storyIndex *
        (cardWidth + gap);


    storyTrack.style.transform =
        `translateX(-${movement}px)`;

}



if (nextStory) {


    nextStory.addEventListener(
        "click",
        function () {


            if (!storyTrack) return;


            const cards =
                storyTrack.querySelectorAll(
                    ".story-card"
                );


            const visible =
                getVisibleStories();


            const maxIndex =
                Math.max(
                    0,
                    cards.length - visible
                );


            if (
                storyIndex <
                maxIndex
            ) {

                storyIndex++;

            } else {

                storyIndex = 0;

            }


            updateStorySlider();


        }
    );

}



if (previousStory) {


    previousStory.addEventListener(
        "click",
        function () {


            if (!storyTrack) return;


            const cards =
                storyTrack.querySelectorAll(
                    ".story-card"
                );


            const visible =
                getVisibleStories();


            const maxIndex =
                Math.max(
                    0,
                    cards.length - visible
                );


            if (storyIndex > 0) {

                storyIndex--;

            } else {

                storyIndex = maxIndex;

            }


            updateStorySlider();


        }
    );

}



window.addEventListener(
    "resize",
    function () {

        updateStorySlider();

    }
);



/* =========================================
   HERO PARALLAX
========================================= */

const heroVisual =
    document.querySelector(
        ".hero-visual"
    );


if (heroVisual) {


    heroVisual.addEventListener(
        "mousemove",
        function (event) {


            if (window.innerWidth < 900) {

                return;

            }


            const rect =
                heroVisual.getBoundingClientRect();


            const x =
                (
                    event.clientX -
                    rect.left
                ) /
                rect.width -
                .5;


            const y =
                (
                    event.clientY -
                    rect.top
                ) /
                rect.height -
                .5;


            const careerCard =
                document.querySelector(
                    ".career-card"
                );


            if (careerCard) {


                careerCard.style.transform =
                    `translate(
                        ${x * 8}px,
                        ${y * 8}px
                    )`;

            }


        }
    );


    heroVisual.addEventListener(
        "mouseleave",
        function () {


            const careerCard =
                document.querySelector(
                    ".career-card"
                );


            if (careerCard) {

                careerCard.style.transform =
                    "";

            }


        }
    );

}



/* =========================================
   PROGRAM CARD TILT
========================================= */

const programCards =
    document.querySelectorAll(
        ".program-card"
    );


programCards.forEach(function (card) {


    card.addEventListener(
        "mousemove",
        function (event) {


            if (window.innerWidth < 900) {

                return;

            }


            const rect =
                card.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            const centerX =
                rect.width / 2;


            const centerY =
                rect.height / 2;


            const rotateX =
                (
                    (y - centerY) /
                    centerY
                ) * -3;


            const rotateY =
                (
                    (x - centerX) /
                    centerX
                ) * 3;


            card.style.transform =
                `perspective(700px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-8px)`;

        }
    );


    card.addEventListener(
        "mouseleave",
        function () {

            card.style.transform = "";

        }
    );


});



/* =========================================
   KEYBOARD ESCAPE
========================================= */

document.addEventListener(
    "keydown",
    function (event) {


        if (
            event.key === "Escape" &&
            navigation
        ) {


            navigation.classList.remove(
                "active"
            );


            if (mobileMenu) {

                mobileMenu.innerHTML =
                    "☰";

            }

        }

    }
);



/* =========================================
   PAGE READY MESSAGE
========================================= */

console.log(
    "Kiran Academy website loaded successfully."
);