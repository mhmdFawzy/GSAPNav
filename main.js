window.onload = () => {
    let carouselContainer = document.getElementsByClassName(
        "home--carousel--container"
    )[0];
    let carouselContainerItems = document.getElementsByClassName(
        "home--carousel--container--list--item"
    );
    let slideNum = [...carouselContainerItems].length - 1;
    console.log(slideNum);
    let getSiblings = function (e) {
        // for collecting siblings
        let siblings = [];
        // if no parent, return no sibling
        if (!e.parentNode) {
            return siblings;
        }
        // first child of the parent node
        let sibling = e.parentNode.firstChild;
        // collecting siblings
        while (sibling) {
            if (sibling.nodeType === 1 && sibling !== e) {
                siblings.push(sibling);
            }
            sibling = sibling.nextSibling;
        }
        return siblings;
    };
    [...carouselContainerItems].map((image, i) => {
        image.style.left = `${i}00vw`;
    });
    setInterval(() => {
        let currentSlide = document.getElementsByClassName("current-slide")[0];
        currentSlide.style.left = `-${slideNum}00vw`;
        currentSlide.classList.remove("current-slide");
        if (currentSlide.nextElementSibling) {
            currentSlide.nextElementSibling.classList.add("current-slide");
            let trail = getSiblings(currentSlide);
        } else {
            [...carouselContainerItems][0].classList.add("current-slide");
        }

    }, 5000);
};

let navLink = document.querySelectorAll(".nav-fixed--list--item");
let navopen = document.querySelector(".navopen");
let targetId;
let dataShown;
let getSiblings = function (e) {
    // for collecting siblings
    let siblings = [];
    // if no parent, return no sibling
    if (!e.parentNode) {
        return siblings;
    }
    // first child of the parent node
    let sibling = e.parentNode.firstChild;
    // collecting siblings
    while (sibling) {
        if (sibling.nodeType === 1 && sibling !== e) {
            siblings.push(sibling);
        }
        sibling = sibling.nextSibling;
    }
    return siblings;
};
let firstGSAP = gsap.timeline({
    paused: true,
});
firstGSAP
    .to(".home", {
        duration: 1,
        marginLeft: "auto",
        width: "60%",
        ease: Power2.easeOut,
    })
    .to(
        " .navopen", {
            duration: 1,
            top: "8rem",
            ease: Power2.easeOut,
        },
        "-=0.5"
    );
[...navLink].map((link) => {
    link.addEventListener("click", (e) => {
        targetId = e.target.getAttribute("href");
        if (firstGSAP.isActive()) {
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }
        if (link.classList.contains("open")) {
            firstGSAP.reverse();
            link.classList.remove("open");

        } else {
            firstGSAP.play();
            link.classList.add("open");
            let navopensibs = getSiblings(link);
            navopensibs.map((sib) => {
                sib.classList.remove("open");
            })
            dataShown = document.querySelector(`${targetId}`);
            dataShown.style.top = "0";
            dataShown.style.opacity = "1"
            let dataShownSib = getSiblings(dataShown);
            dataShownSib.map((sib) => {
                sib.style.top = "-100vh";
                sib.style.opacity = "0"
            })

        }
    });
});