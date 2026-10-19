/* =========================================================
   ALPINE AURA — HISTORY PAGE JAVASCRIPT
========================================================= */

"use strict";


/* =========================================================
   HISTORY DATA
========================================================= */

const historyData = {

    everest: {

        title: "Mount Everest",

        icon: "fa-solid fa-mountain",

        description:
            "Mount Everest is the highest mountain above sea level. Its history is filled with exploration, scientific surveys and legendary climbing expeditions.",

        period:
            "19th Century to Present",

        location:
            "Nepal and Tibet",

        famous:
            "World's Highest Mountain",

        importance:
            "A global symbol of exploration and mountaineering.",

        about:
            "Mount Everest was surveyed during the nineteenth century and later identified as the world's highest known mountain. It became one of the most important destinations in mountaineering history, with the first confirmed successful ascent achieved in 1953 by Edmund Hillary and Tenzing Norgay."

    },


    k2: {

        title: "K2",

        icon: "fa-solid fa-mountain",

        description:
            "K2 is the second-highest mountain in the world and is renowned for its difficult terrain and remarkable climbing history.",

        period:
            "19th Century to Present",

        location:
            "Pakistan and China",

        famous:
            "Second-Highest Mountain",

        importance:
            "A defining landmark of the Karakoram.",

        about:
            "K2 was surveyed during the nineteenth century as part of the Great Trigonometrical Survey. The mountain was designated K2 within the surveying system. Its steep terrain and severe weather have made it one of the most respected peaks in climbing history."

    },


    himalayas: {

        title: "The Himalayas",

        icon: "fa-solid fa-layer-group",

        description:
            "The Himalayas are one of the world's greatest mountain systems and have shaped the geography, cultures and history of Asia.",

        period:
            "Ancient to Present",

        location:
            "South and Central Asia",

        famous:
            "Home of the Highest Peaks",

        importance:
            "A major geographical and cultural region.",

        about:
            "The Himalayas formed millions of years ago through tectonic activity. For thousands of years, communities have lived around these mountains. The region has influenced trade routes, traditions, religions, exploration and settlement."

    },


    karakoram: {

        title: "Karakoram Range",

        icon: "fa-solid fa-mountain-sun",

        description:
            "The Karakoram is a spectacular mountain range known for some of the world's highest peaks, glaciers and dramatic landscapes.",

        period:
            "Ancient to Present",

        location:
            "Pakistan, India and China",

        famous:
            "K2 and High Peaks",

        importance:
            "A major mountain system of High Asia.",

        about:
            "The Karakoram has been an important geographical region for centuries. Ancient routes connected communities across the mountains, while modern exploration expanded knowledge of its peaks, glaciers and valleys."

    },


    alps: {

        title: "The Alps",

        icon: "fa-solid fa-mountain",

        description:
            "The Alps are one of Europe's most famous mountain ranges and have influenced European travel, culture, exploration and tourism.",

        period:
            "Ancient to Present",

        location:
            "Central Europe",

        famous:
            "European Mountain Range",

        importance:
            "Important to European geography and tourism.",

        about:
            "The Alps have been home to mountain communities for centuries. Their valleys and passes were used for travel and trade. During the modern period, the Alps became an important center for mountaineering, skiing and tourism."

    },


    andes: {

        title: "Andes Mountains",

        icon: "fa-solid fa-earth-americas",

        description:
            "The Andes form the longest continental mountain range and have a rich history connected to ancient civilizations.",

        period:
            "Ancient to Present",

        location:
            "South America",

        famous:
            "Longest Continental Range",

        importance:
            "Central to the history of Andean civilizations.",

        about:
            "The Andes were home to several ancient cultures, most famously the Inca civilization. Mountain environments influenced agriculture, architecture, transportation and settlement patterns throughout the region."

    },


    rockies: {

        title: "Rocky Mountains",

        icon: "fa-solid fa-mountain",

        description:
            "The Rocky Mountains have a long history of Indigenous communities, exploration and settlement across western North America.",

        period:
            "Ancient to Present",

        location:
            "Canada and United States",

        famous:
            "Western North America",

        importance:
            "A major geographical and cultural landmark.",

        about:
            "Indigenous peoples have lived in and around the Rocky Mountains for thousands of years. Later explorers and scientists travelled through the region, expanding knowledge of its geography and natural environment."

    },


    kilimanjaro: {

        title: "Mount Kilimanjaro",

        icon: "fa-solid fa-volcano",

        description:
            "Mount Kilimanjaro is Africa's highest mountain and has a fascinating history of exploration and climbing.",

        period:
            "19th Century to Present",

        location:
            "Tanzania, Africa",

        famous:
            "Highest Mountain in Africa",

        importance:
            "An iconic African natural landmark.",

        about:
            "European explorers documented Mount Kilimanjaro during the nineteenth century. The first recorded successful ascent reached the summit in 1889. Today, the mountain remains an important destination for climbers and visitors."

    },


    fuji: {

        title: "Mount Fuji",

        icon: "fa-solid fa-torii-gate",

        description:
            "Mount Fuji is Japan's highest mountain and has been an important symbol of Japanese culture and art for centuries.",

        period:
            "Ancient to Present",

        location:
            "Japan",

        famous:
            "Symbol of Japan",

        importance:
            "Deep cultural and artistic significance.",

        about:
            "Mount Fuji has been admired and represented in Japanese art for centuries. It has also been an important spiritual site. Its distinctive shape has made it one of Japan's most recognizable natural landmarks."

    },


    mountaineering: {

        title: "History of Mountaineering",

        icon: "fa-solid fa-person-hiking",

        description:
            "Mountaineering developed from exploration into an organized sport, scientific activity and worldwide adventure.",

        period:
            "18th Century to Present",

        location:
            "Mountains Around the World",

        famous:
            "Modern Mountain Climbing",

        importance:
            "Changed how people explore and understand mountains.",

        about:
            "Modern mountaineering developed strongly in Europe during the eighteenth and nineteenth centuries. Climbers began exploring major peaks using specialized equipment and organized expeditions. Over time, mountaineering became a worldwide activity."

    }

};


/* =========================================================
   ELEMENTS
========================================================= */

const modal =
    document.getElementById("historyModal");

const modalBackdrop =
    document.getElementById("modalBackdrop");

const modalClose =
    document.getElementById("modalClose");

const modalIcon =
    document.getElementById("modalIcon");

const modalKicker =
    document.getElementById("modalKicker");

const modalTitle =
    document.getElementById("modalTitle");

const modalDescription =
    document.getElementById("modalDescription");

const modalPeriod =
    document.getElementById("modalPeriod");

const modalLocation =
    document.getElementById("modalLocation");

const modalFamous =
    document.getElementById("modalFamous");

const modalImportance =
    document.getElementById("modalImportance");

const modalAbout =
    document.getElementById("modalAbout");


/* =====================================================
   PREMIUM HISTORY MODAL
===================================================== */

function openHistory(historyName) {

    const history = historyData[historyName];

    if (!history) {
        console.error("History not found:", historyName);
        return;
    }

    const modal = document.getElementById("historyModal");

    if (!modal) {
        console.error("historyModal not found in HTML");
        return;
    }


    /* ---------------------------------------------
       TITLE
    --------------------------------------------- */

    document.getElementById("modalTitle").textContent =
        history.title;


    /* ---------------------------------------------
       DESCRIPTION
    --------------------------------------------- */

    document.getElementById("modalDescription").textContent =
        history.description;


    /* ---------------------------------------------
       INFORMATION
    --------------------------------------------- */

    document.getElementById("modalPeriod").textContent =
        history.period;

    document.getElementById("modalLocation").textContent =
        history.location;

    document.getElementById("modalFamous").textContent =
        history.famous;

    document.getElementById("modalImportance").textContent =
        history.importance;


    /* ---------------------------------------------
       ABOUT
    --------------------------------------------- */

    document.getElementById("modalAbout").textContent =
        history.about;


    /* ---------------------------------------------
       ICON
    --------------------------------------------- */

    const iconBox =
        document.getElementById("modalIcon");

    iconBox.innerHTML =
        getHistoryIcon(historyName);


    /* ---------------------------------------------
       OPEN MODAL
    --------------------------------------------- */

    modal.classList.add("show");

    document.body.classList.add("modal-open-custom");

}


/* =====================================================
   FONT AWESOME ICONS
===================================================== */

function getHistoryIcon(historyName) {

    const icons = {

        everest:
            '<i class="fa-solid fa-mountain"></i>',

        k2:
            '<i class="fa-solid fa-mountain-sun"></i>',

        himalayas:
            '<i class="fa-solid fa-mountain"></i>',

        karakoram:
            '<i class="fa-solid fa-mountain-sun"></i>',

        alps:
            '<i class="fa-solid fa-mountain"></i>',

        andes:
            '<i class="fa-solid fa-earth-americas"></i>',

        rockies:
            '<i class="fa-solid fa-mountain"></i>',

        kilimanjaro:
            '<i class="fa-solid fa-volcano"></i>',

        fuji:
            '<i class="fa-solid fa-mountain-sun"></i>',

        mountaineering:
            '<i class="fa-solid fa-person-hiking"></i>'

    };


    return (
        icons[historyName] ||
        '<i class="fa-solid fa-mountain"></i>'
    );

}


/* =====================================================
   CLOSE MODAL
===================================================== */

function closeHistoryModal() {

    const modal =
        document.getElementById("historyModal");

    if (!modal) {
        return;
    }

    modal.classList.remove("show");

    document.body.classList.remove(
        "modal-open-custom"
    );

}


/* =====================================================
   ESC KEY
===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeHistoryModal();

        }

    }
);


/* =====================================================
   PREVENT CARD BUTTON CLICK FROM DOING SOMETHING ELSE
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const modal =
            document.getElementById("historyModal");

        if (!modal) {
            return;
        }


        /*
         * Clicking inside modal box should NOT
         * close the modal.
         */

        const modalBox =
            modal.querySelector(".history-modal-box");

        if (modalBox) {

            modalBox.addEventListener(
                "click",
                function (event) {

                    event.stopPropagation();

                }
            );

        }

    }
);

/* =========================================================
   FOOTER / PAGE READY
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "Alpine Aura History loaded successfully."
        );

    }
);