document.addEventListener("DOMContentLoaded", function () {
    const currentLocation = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll(".inner-links-pill .nav-link");
    navLinks.forEach(link => {
        const linkPath = link.getAttribute("href");
        if (linkPath === currentLocation || (currentLocation === "" && linkPath === "index.html")) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
    const navbarCollapse = document.getElementById("floatingNavContent");
    const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (window.innerWidth < 992 && navbarCollapse.classList.contains("show")) {
                bsCollapse.hide();
            }
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };
    const observerCallback = (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-me');
            } else {
            }
        });
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const targets = document.querySelectorAll('.slide-left, .slide-right');
    targets.forEach((target) => {
        observer.observe(target);
    });
});
document.querySelectorAll('.faq-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        const content = this.nextElementSibling;
        const icon = this.querySelector('.faq-icon');
        if (content.style.display === 'block') {
            content.style.display = 'none';
            icon.style.transform = 'rotate(0deg)';
            icon.style.color = 'var(--accent-purple)';
        } else {
            content.style.display = 'block';
            icon.style.transform = 'rotate(180deg)';
            icon.style.color = 'var(--accent-pink)';
        }
    });
});
function toggleFaq(card) {
    const content = card.querySelector('.faq-body-content');
    const icon = card.querySelector('.faq-arrow-icon');
    if (content.style.display === "block") {
        content.style.display = "none";
        icon.style.transform = "rotate(0deg)";
    } else {
        content.style.display = "block";
        icon.style.transform = "rotate(180deg)";
    }
}
const points = document.querySelectorAll(".history-point");
const cards = document.querySelectorAll(".small-card");
points.forEach((point, index) => {
    point.addEventListener("click", () => {
        points.forEach(p => {
            p.classList.remove("active");
        });
        point.classList.add("active");
        cards.forEach(card => {
            card.style.transform = "translateY(20px)";
            card.style.opacity = "0";
        });
        setTimeout(() => {
            cards[index].style.transform = "translateY(0)";
            cards[index].style.opacity = "1";
        }, 200);
    });
});
const mountains = [
    {
        number: "01",
        title: "Ladakh Mountains",
        country: "India",
        image: "./img/ladakh.png",
        description:
            "A dramatic, arid high-altitude mountain landscape in the Himalayas known for safeguarding ancient trans-Himalayan trade routes and sheltering historic Tibetan Buddhist monasteries."
    },
    {
        number: "02",
        title: "Hunza Valley",
        country: "Pakistan",
        image: "./img/hunza valley.png",
        description:
            "A breathtaking, high-altitude valley nestled in the Karakoram range, celebrated for its dramatic mountain peaks, lush green terraces, and rich cultural history as a former princely state."
    },
    {
        number: "03",
        title: "Swiss Alps",
        country: "Switzerland",
        image: "./img/swiss alps.png",
        description:
            "A magnificent, snow-capped mountain range in Europe featuring lush alpine meadows, charming wooden chalets, and a rich history of mountaineering and alpine culture."
    },
    {
        number: "04",
        title: "Himalayas",
        country: "Asia",
        image: "./img/himaliya.jfif",
        description:
            "The world's highest and most iconic mountain range, known for its massive, snow-capped peaks including Mount Everest, deeply influential cultures, and unparalleled spiritual significance."
    }
];
let currentIndex = 0;
let autoSlide;
const mountainImage =
    document.getElementById("mountainImage");
const mountainTitle =
    document.getElementById("mountainTitle");
const mountainDescription =
    document.getElementById("mountainDescription");
const contentNumber =
    document.getElementById("contentNumber");
const bigNumber =
    document.getElementById("bigNumber");
const timelineNumbers =
    document.querySelectorAll(".timeline-number");
function changeSlide(index) {
    if (index === currentIndex) {
        return;
    }
    const data = mountains[index];
    mountainImage.classList.add("fade-out");
    mountainTitle.classList.add("fade-out");
    mountainDescription.classList.add("fade-out");
    contentNumber.classList.add("fade-out");
    bigNumber.classList.add("fade-out");
    setTimeout(() => {
        mountainImage.src =
            data.image;
        mountainTitle.innerHTML =
            `${data.title}<br>${data.country}`;
        mountainDescription.innerText =
            data.description;
        contentNumber.innerText =
            data.number;
        bigNumber.innerText =
            data.number;
        timelineNumbers.forEach(number => {
            number.classList.remove("active");
        });
        timelineNumbers[index]
            .classList.add("active");
        currentIndex = index;
        mountainImage.classList.remove("fade-out");
        mountainTitle.classList.remove("fade-out");
        mountainDescription.classList.remove("fade-out");
        contentNumber.classList.remove("fade-out");
        bigNumber.classList.remove("fade-out");
        mountainImage.classList.add("zoom");
    }, 450);
}
function nextSlide() {
    let nextIndex =
        currentIndex + 1;
    if (nextIndex >= mountains.length) {
        nextIndex = 0;
    }
    changeSlide(nextIndex);
}
function startAutoSlide() {
    clearInterval(autoSlide);
    autoSlide = setInterval(() => {
        nextSlide();
    }, 5000);
}
startAutoSlide();
timelineNumbers.forEach((number, index) => {
    number.addEventListener("click", () => {
        changeSlide(index);
        startAutoSlide();
    });
});
setTimeout(() => {
    mountainImage.classList.add("zoom");
}, 100);
mountains.forEach(item => {
    const img = new Image();
    img.src = item.image;
});
let visitors =
    localStorage.getItem("alpineAuraVisitors");
if (!visitors) {
    visitors = 12847;
} else {
    visitors = Number(visitors) + 1;
}
localStorage.setItem(
    "alpineAuraVisitors",
    visitors
);
document.getElementById(
    "visitorCount"
).textContent =
    visitors.toLocaleString();
/* =====================================
FILTERS FUNCTIONALITY
===================================== */
const filters = document.querySelectorAll(".filter-btn");
const filterItems = document.querySelectorAll(".filter-item");
filters.forEach(button => {
    button.addEventListener("click", () => {
        // Remove active class from all buttons
        filters.forEach(btn => btn.classList.remove("active"));
        // Add active class to clicked button
        button.classList.add("active");
        const filterValue = button.getAttribute("data-filter");
        filterItems.forEach(item => {
            const itemCategory = item.getAttribute("data-category");
            if (filterValue === "all" || itemCategory === filterValue) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    });
});
/* =====================================
   MODAL FUNCTIONALITY
===================================== */
const modal = document.getElementById("shelterModal");
const closeBtn = document.getElementById("modalClose");
const modalOverlay = document.querySelector(".modal-overlay");
function openModal(title, location, altitude, description, bestFor, features, imageSrc, badgeName, badgeIcon) {
    document.getElementById("modalImage").src = imageSrc;
    document.getElementById("modalImage").alt = title;
    document.getElementById("modalBadge").innerHTML = `<i class="${badgeIcon}"></i> ${badgeName}`;
    document.getElementById("modalTitle").textContent = title;
    document.getElementById("modalLocation").textContent = location;
    document.getElementById("modalAltitude").textContent = altitude;
    document.getElementById("modalDescription").textContent = description;
    document.getElementById("modalBestFor").textContent = bestFor;
    document.getElementById("modalFeatures").innerHTML = features
        .map(feature => `<span>${feature}</span>`)
        .join("");
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
}
function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
}
if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
}
if (modalOverlay) {
    modalOverlay.addEventListener("click", closeModal);
}
document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeModal();
    }
});
/* =====================================
   REAL SHELTER MAP
===================================== */
const shelterMap = L.map("shelterMap", {
    scrollWheelZoom: false
}).setView([35.8, 74.5], 4);
/* OPENSTREETMAP */
L.tileLayer(
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        maxZoom: 18,
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }
).addTo(shelterMap);
/* =====================================
   CUSTOM MARKER
===================================== */
function createMapIcon(type) {
    let iconClass = "fa-solid fa-house";
    if (type === "portable") {
        iconClass = "fa-solid fa-tent";
    }
    if (type === "emergency") {
        iconClass = "fa-solid fa-triangle-exclamation";
    }
    return L.divIcon({
        className: "",
        html: `
            <div class="shelter-marker ${type}-marker">
                <i class="${iconClass}"></i>
            </div>
        `,
        iconSize: [38, 38],
        iconAnchor: [19, 38],
        popupAnchor: [0, -35]
    });
}
/* =====================================
   REAL LOCATIONS
===================================== */
const mapShelters = [
    {
        name: "Alpine Mountain Hut",
        location: "Swiss Alps",
        altitude: "3,800 m",
        type: "permanent",
        coordinates: [46.5774, 8.0227]
    },
    {
        name: "Ladakh Mountain Lodge",
        location: "Ladakh, India",
        altitude: "4,500 m",
        type: "permanent",
        coordinates: [34.1526, 77.5771]
    },
    {
        name: "Karakoram Lodge",
        location: "Gilgit-Baltistan",
        altitude: "3,900 m",
        type: "permanent",
        coordinates: [36.3167, 74.6500]
    },
    {
        name: "Storm Safety Shelter",
        location: "Karakoram",
        altitude: "4,600 m",
        type: "emergency",
        coordinates: [35.8800, 74.7300]
    },
    {
        name: "Summit Base Tent",
        location: "Nepal Himalayas",
        altitude: "5,000 m",
        type: "portable",
        coordinates: [28.0025, 86.8528]
    },
    {
        name: "Mountain View Lodge",
        location: "Manali, India",
        altitude: "3,300 m",
        type: "permanent",
        coordinates: [32.2432, 77.1892]
    },
    {
        name: "Avalanche Refuge",
        location: "Swiss Alps",
        altitude: "3,900 m",
        type: "emergency",
        coordinates: [46.5500, 7.9800]
    },
    {
        name: "Glacier Expedition Camp",
        location: "Patagonia",
        altitude: "3,200 m",
        type: "portable",
        coordinates: [-50.9423, -73.4068]
    }
];
/* =====================================
   ADD MARKERS
===================================== */
mapShelters.forEach(shelter => {
    const marker = L.marker(
        shelter.coordinates,
        {
            icon: createMapIcon(
                shelter.type
            )
        }
    ).addTo(shelterMap);
    marker.bindPopup(`
        <div class="map-popup">
            <h3>
                ${shelter.name}
            </h3>
            <p>
                <i class="fa-solid fa-location-dot"></i>
                ${shelter.location}
            </p>
            <p>
                <i class="fa-solid fa-mountain"></i>
                ${shelter.altitude}
            </p>
            <span class="popup-type">
                ${shelter.type.toUpperCase()}
            </span>
        </div>
    `);
});
