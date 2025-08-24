document.addEventListener("DOMContentLoaded", () => {

    const speakerImages = document.querySelectorAll(".speaker-image");

    speakerImages.forEach(image => {
        image.addEventListener("click", () => {
            const overlay = image.querySelector(".speaker-overlay");
            if (overlay) {
                document.querySelectorAll(".speaker-overlay").forEach(o => {
                    if (o !== overlay) o.style.opacity = "0";
                });

                overlay.style.opacity = (overlay.style.opacity === "1") ? "0" : "1";
            }
        });
    });

    const speakerCards = document.querySelectorAll(".speaker-card");

    speakerCards.forEach(card => {
        card.style.opacity = "0";
        card.style.transform = "translateY(40px)";
        card.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    });

    const revealOnScroll = () => {
        const triggerPoint = window.innerHeight * 0.85; 
        speakerCards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            if (cardTop < triggerPoint) {
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
            }
        });
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();

    document.addEventListener("hover", (e) => {
        if (!e.target.closest(".speaker-image")) {
            document.querySelectorAll(".speaker-overlay").forEach(o => {
                o.style.opacity = "0";
            });
        }
    });

});

