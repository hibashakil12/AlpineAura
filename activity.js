/* =========================================================
   ALPINE AURA — ACTIVITY DATA
========================================================= */

const activities = {

    hiking: {

        title: "Mountain Hiking",

        icon: "fa-person-hiking",

        description:
            "Follow scenic mountain trails, breathe in fresh alpine air and experience nature at your own pace. Hiking is a perfect way to explore beautiful landscapes while enjoying a peaceful outdoor adventure.",

        location: "Mountain Trails",

        duration: "2 - 5 Hours",

        difficulty: "Easy to Moderate",

        equipment:
            "Comfortable hiking shoes, water, backpack and snacks."
    },


    camping: {

        title: "Mountain Camping",

        icon: "fa-campground",

        description:
            "Escape into the wilderness and experience unforgettable nights surrounded by nature. Enjoy peaceful landscapes, fresh mountain air and beautiful skies far away from city life.",

        location: "Mountain Campsites",

        duration: "1 - 3 Days",

        difficulty: "Easy",

        equipment:
            "Tent, sleeping bag, flashlight, water and warm clothing."
    },


    climbing: {

        title: "Rock Climbing",

        icon: "fa-mountain",

        description:
            "Challenge yourself on dramatic rock faces while developing strength, balance and concentration. Always use proper climbing equipment and qualified guidance.",

        location: "Rock Climbing Areas",

        duration: "2 - 4 Hours",

        difficulty: "Hard",

        equipment:
            "Helmet, climbing harness, ropes and climbing shoes."
    },


    trekking: {

        title: "Mountain Trekking",

        icon: "fa-route",

        description:
            "Journey deeper into the mountains through long-distance trails, remote landscapes and breathtaking high-altitude scenery. Trekking is ideal for those looking for a longer adventure.",

        location: "Mountain Trekking Routes",

        duration: "1 - 7 Days",

        difficulty: "Moderate to Hard",

        equipment:
            "Hiking shoes, backpack, water, food and first-aid kit."
    },


    photography: {

        title: "Mountain Photography",

        icon: "fa-camera",

        description:
            "Capture dramatic peaks, golden skies, forests and unforgettable mountain moments. Photography lets you preserve the unique beauty of every adventure.",

        location: "Scenic Mountain Points",

        duration: "1 - 4 Hours",

        difficulty: "Easy",

        equipment:
            "Camera or phone, extra battery and tripod."
    },


    skiing: {

        title: "Mountain Skiing",

        icon: "fa-person-skiing",

        description:
            "Glide across snowy slopes and experience the excitement of winter in the alpine world. Beginners should always learn with appropriate supervision.",

        location: "Snowy Mountain Slopes",

        duration: "2 - 5 Hours",

        difficulty: "Moderate to Hard",

        equipment:
            "Skis, helmet, gloves, warm clothes and supervision."
    },


    cycling: {

        title: "Mountain Cycling",

        icon: "fa-person-biking",

        description:
            "Explore rugged mountain trails on two wheels and discover spectacular scenery from an entirely different perspective.",

        location: "Mountain Cycling Trails",

        duration: "2 - 5 Hours",

        difficulty: "Moderate",

        equipment:
            "Mountain bike, helmet, water and repair kit."
    },


    stargazing: {

        title: "Mountain Stargazing",

        icon: "fa-star",

        description:
            "Leave city lights behind and enjoy a peaceful night beneath a sky filled with stars. Mountain viewpoints can provide an unforgettable view of the night sky.",

        location: "Mountain Viewpoints",

        duration: "2 - 4 Hours",

        difficulty: "Easy",

        equipment:
            "Warm clothes, flashlight and telescope if available."
    },


    paragliding: {

        title: "Paragliding",

        icon: "fa-parachute-box",

        description:
            "Soar above valleys and mountain landscapes while enjoying an incredible aerial perspective. Paragliding should only be performed with qualified instructors and approved safety equipment.",

        location: "Approved Mountain Launch Sites",

        duration: "1 - 2 Hours",

        difficulty: "Advanced",

        equipment:
            "Certified paragliding equipment and qualified instructor."
    },


    naturewalk: {

        title: "Mountain Nature Walk",

        icon: "fa-tree",

        description:
            "Slow down and reconnect with nature through peaceful forests, streams, plants and quiet mountain paths. A perfect choice for a relaxing outdoor experience.",

        location: "Mountain Forest Trails",

        duration: "1 - 3 Hours",

        difficulty: "Easy",

        equipment:
            "Comfortable shoes, water and a light backpack."
    }

};


/* =========================================================
   OPEN ACTIVITY MODAL
========================================================= */

function openActivity(activityName) {

    const activity = activities[activityName];

    if (!activity) {
        return;
    }


    /* Main activity icon */

    const iconElement =
        document.getElementById("detail-icon");

    iconElement.innerHTML =
        `<i class="fa-solid ${activity.icon}"></i>`;


    /* Title */

    document.getElementById("detail-title")
        .textContent = activity.title;


    /* Description */

    document.getElementById("detail-description")
        .textContent = activity.description;


    /* Location */

    document.getElementById("detail-location")
        .textContent = activity.location;


    /* Duration */

    document.getElementById("detail-duration")
        .textContent = activity.duration;


    /* Difficulty */

    document.getElementById("detail-difficulty")
        .textContent = activity.difficulty;


    /* Equipment */

    document.getElementById("detail-equipment")
        .textContent = activity.equipment;


    /* Open */

    document
        .getElementById("activityModal")
        .classList.add("active");


    /* Prevent background scrolling */

    document.body.style.overflow = "hidden";
}


/* =========================================================
   CLOSE MODAL
========================================================= */

function closeActivity() {

    document
        .getElementById("activityModal")
        .classList.remove("active");


    document.body.style.overflow = "";
}


/* =========================================================
   ESC KEY
========================================================= */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        closeActivity();

    }

});