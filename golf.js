
document.addEventListener("DOMContentLoaded", function () {
    const main = document.querySelector("main");
    const crsr = document.querySelector("#cursor");
    const blur = document.querySelector("#cursor-blur");
    const circles = document.querySelectorAll(".circle");
    const nav = document.querySelector("#nav");
    const navHeadings = document.querySelectorAll("#nav h4, .btn");
    const downArrow = document.querySelector("#page1 #arrow");


    function updateNavTextColor() {
        // Check if nav has a black or solid background
        const hasBackground = nav.style.backgroundColor && nav.style.backgroundColor !== "transparent";

        navHeadings.forEach(h4 => {
            if (hasBackground) {
                // When nav has a solid background
                h4.style.color = "#fff";  // Default white
                h4.onmouseover = () => h4.style.color = "#a3d715"; // Green on hover
                h4.onmouseout = () => h4.style.color = "#fff"; // Back to white
            } else {
                // When nav has no background or transparent background
                h4.style.color = "#fff";  // Default white
                h4.onmouseover = () => h4.style.color = "#000"; // Black on hover
                h4.onmouseout = () => h4.style.color = "#fff"; // Back to white
            }
        });
    }
    // Initial color update on page load
    updateNavTextColor();

    // Observe and update nav text color when background changes
    const observer = new MutationObserver(updateNavTextColor);
    observer.observe(nav, { attributes: true, attributeFilter: ["style", "class"] });


    // ----------------------------------------------------------------
    // Custom cursor movement tracking
    document.addEventListener("mousemove", function (dets) {
        crsr.style.left = `${dets.x}px`;
        crsr.style.top = `${dets.y}px`;
        blur.style.left = `${dets.x - 250}px`;
        blur.style.top = `${dets.y - 250}px`;
    });

    // Down Arrow Hover Effects
    downArrow.addEventListener("mouseenter", function () {
        // Expand cursor on hover
        crsr.style.transition = "height 0.3s ease-in-out, width 0.3s ease-in-out";
        crsr.style.height = "80px";
        crsr.style.width = "80px";
        crsr.style.border = "1px solid #fff";
        crsr.style.backgroundColor = "transparent";
        crsr.style.zIndex = "99";

        // Add inner glow effect
        crsr.style.boxShadow = "inset 0 0 20px rgba(149, 193, 30, 0.6), inset 0 0 30px rgba(255, 255, 255, 0.4)";

        // Hide cursor trail circles
        circles.forEach(circle => {
            circle.style.transition = "opacity 0.3s ease-in-out, transform 0.3s ease-in-out";
            circle.style.opacity = "0";
            circle.style.transform = "scale(0)";
        });

        // Remove glow effect after a short delay
        setTimeout(() => {
            crsr.style.boxShadow = "none";
        }, 300);
    });

    downArrow.addEventListener("mouseleave", function () {
        // Reset cursor to default state
        crsr.style.transition = "height 0.3s ease-in-out, width 0.3s ease-in-out";
        crsr.style.height = "20px";
        crsr.style.width = "20px";
        crsr.style.border = "0px solid #95C11E";
        crsr.style.backgroundColor = "#95C11E";

        // Restore cursor trail circles
        circles.forEach(circle => {
            circle.style.transition = "opacity 0.3s ease-in-out, transform 0.3s ease-in-out";
            circle.style.opacity = "1";
            circle.style.transform = "scale(1)";
        });

        crsr.style.boxShadow = "none";
    });


    // Navigation Headings Hover Effects
    navHeadings.forEach((heading) => {
        heading.addEventListener("mouseenter", function () {
            // Similar to down arrow, expand and style cursor
            crsr.style.transition = "height 0.3s ease-in-out, width 0.3s ease-in-out";
            crsr.style.height = "80px";
            crsr.style.width = "80px";
            crsr.style.border = "1px solid #fff";
            crsr.style.backgroundColor = "transparent";
            crsr.style.zIndex = "999";
            // crsr.style.transition = "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
            crsr.style.border = "1px solid rgb(255, 255, 255)";


            // Add inner glow effect
            crsr.style.boxShadow = "inset 0 0 20px rgba(149, 193, 30, 0.6), inset 0 0 30px rgba(255, 255, 255, 0.4)";

            // Change heading color
            heading.style.transition = "color 0.3s ease-in-out";
            heading.style.color = "#a7da19";

            // Hide cursor trail circles
            circles.forEach(circle => {
                circle.style.transition = "opacity 0.3s ease-in-out, transform 0.3s ease-in-out";
                circle.style.opacity = "0";
                circle.style.transform = "scale(0)";
            });

            // Remove glow effect after a short delay
            setTimeout(() => {
                crsr.style.boxShadow = "none";
            }, 300);
        });

        heading.addEventListener("mouseleave", function () {
            // Reset cursor and heading styles
            crsr.style.transition = "height 0.3s ease-in-out, width 0.3s ease-in-out";
            crsr.style.height = "20px";
            crsr.style.width = "20px";
            crsr.style.border = "0px solid #95C11E";
            crsr.style.backgroundColor = "#95C11E";

            // Restore heading color
            heading.style.transition = "color 0.5s ease-in-out";
            heading.style.color = "#fff";

            // Restore cursor trail circles
            circles.forEach(circle => {
                circle.style.transition = "opacity 0.3s ease-in-out, transform 0.3s ease-in-out";
                circle.style.opacity = "1";
                circle.style.transform = "scale(1)";
            });

            crsr.style.boxShadow = "none";
        });
    });

    // Smooth scroll functionality for down arrow
    downArrow.addEventListener("click", function () {
        // Find the next page element 
        // Assumes pages are sequential and have an ID pattern like page1, page2, etc.
        const currentPageNumber = parseInt(downArrow.closest("[id^='page']").id.replace('page', ''));
        const nextPageId = `#page${currentPageNumber + 1}`;
        const nextPage = document.querySelector(nextPageId);

        if (nextPage) {
            // Smooth scroll to the next page
            nextPage.scrollIntoView({
                behavior: 'smooth',  // Animate the scroll
                block: 'start'       // Align to the top of the page
            });
        }
    });




    // GSAP Scroll-Triggered Animations
    // GSAP Scroll-Triggered Animations
    gsap.to("#nav", {
        backgroundColor: "#000",
        duration: 0.5,
        height: "110px",
        scrollTrigger: {
            trigger: "#nav",
            scroller: "body",
            start: "top -10%",
            end: "top -11%",
            scrub: 1,
        },
    });

    gsap.to("#main", {
        backgroundColor: "#000",
        scrollTrigger: {
            trigger: "#main",
            scroller: "body",
            start: "top -25%",
            end: "top -70%",
            scrub: 2,
        },
    });

    gsap.from("#about-us img, #about-us-in", {
        y: 90,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: "#about-us",
            scroller: "body",
            start: "top 70%",
            end: "top 65%",
            scrub: 1,
        },
    });

    gsap.from(".card", {
        scale: 0.8,     // Start slightly smaller
        duration: 1,
        stagger: 0.1,   // Staggered animation between cards
        scrollTrigger: {
            trigger: ".card",
            scroller: "body",
            start: "top 70%",
            end: "top 65%",
            scrub: 1,
        },
    });

    gsap.from("#colon1", {
        y: -70,
        x: -70,
        scrollTrigger: {
            trigger: "#colon1",
            scroller: "body",
            start: "top 55%",
            end: "top 45%",
            scrub: 4,
        },
    });

    gsap.from("#colon2", {
        y: 70,
        x: 70,
        scrollTrigger: {
            trigger: "#colon1",
            scroller: "body",
            start: "top 55%",
            end: "top 45%",
            scrub: 4,
        },
    });

    gsap.from("#page4 h1", {
        y: 60,
        scrollTrigger: {
            trigger: "#page4 h1",
            scroller: "body",
            start: "top 80%",
            end: "top 70%",
            // markers: true,
            scrub: 2,
        },
    });


    // Cursor Trail Effect
    const coords = { x: 0, y: 0 };
    const trailCircles = document.querySelectorAll(".circle");

    const colors = [
        "#95c11e", "#8eac1b", "#87a416", "#7f9f11", "#799a0e",
        "#73950b", "#6c8f06", "#668a03", "#608501", "#5a8000",
        "#537a00", "#4c7400", "#467000", "#406b00", "#396500",
        "#316400", "#2a5f00", "#225c00", "#1a5900", "#125400",
        "#0c5000", "#044000", "#003900", "#002c00", "#002100",
        "#001400", "#000900", "#000000"];

    trailCircles.forEach(function (circle, index) {
        circle.x = 0;
        circle.y = 0;
        circle.style.backgroundColor = colors[index % colors.length];
    });

    window.addEventListener("mousemove", function (e) {
        coords.x = e.clientX;
        coords.y = e.clientY;
    });

    function animateCircles() {
        let x = coords.x;
        let y = coords.y;

        trailCircles.forEach(function (circle, index) {
            circle.style.left = `${x - 12}px`;
            circle.style.top = `${y - 12}px`;

            circle.style.scale = (trailCircles.length - index) / trailCircles.length;

            circle.x = x;
            circle.y = y;

            const nextCircle = trailCircles[index + 1] || trailCircles[0];
            x += (nextCircle.x - x) * 0.3;
            y += (nextCircle.y - y) * 0.3;
        });

        requestAnimationFrame(animateCircles);
    }

    animateCircles();
});
