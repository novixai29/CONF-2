"use strict";


/* =========================================================
   CONF-002 — CAPITAL COMPASS

   CHANGE CLIENT / CONFERENCE INFORMATION HERE ONLY
========================================================= */

const CONFERENCE = {

  name: "Global Investment Forum 2027",

  shortName: "GIF 2027",

  tagline: "Capital in Motion",

  organizer: "Horizon Capital Institute",


  startAt: "2027-03-24T09:00:00+03:00",

  endAt: "2027-03-24T17:00:00+03:00",

  timeZone: "Asia/Baghdad",


  venue: "Baghdad International Convention Centre",

  city: "Baghdad",

  country: "Iraq",


  /*
    Leave empty to generate Google Maps search
    automatically from venue + city + country.
  */
  mapsUrl: "",


  registrationUrl:
    "https://example.com/register",


  websiteUrl:
    "https://example.com",


  /*
    Leave empty to use current invitation URL.
  */
  shareUrl: "",


  openingAddress: {

    name:
      "Dr. Kareem Al-Hadidi",

    role:
      "Chairman, Horizon Capital Institute",

    topic:
      "Capital Beyond Borders"

  },


  axes: [

    {
      label: "Markets",
      time: "10:00 AM",
      title: "Regional Markets",
      description:
        "A focused conversation on capital movement and emerging regional opportunities."
    },

    {
      label: "Capital",
      time: "12:30 PM",
      title: "The New Capital Map",
      description:
        "How investment priorities are shifting across sectors, borders and generations."
    },

    {
      label: "Growth",
      time: "3:00 PM",
      title: "Building Sustainable Growth",
      description:
        "A practical discussion on long-term value, resilient businesses and responsible expansion."
    }

  ]

};



/* =========================================================
   ELEMENTS
========================================================= */

const elements = {

  heroDestination:
    document.getElementById(
      "heroDestination"
    ),

  heroDate:
    document.getElementById(
      "heroDate"
    ),

  fullEventDate:
    document.getElementById(
      "fullEventDate"
    ),

  eventTime:
    document.getElementById(
      "eventTime"
    ),

  coordinateCity:
    document.getElementById(
      "coordinateCity"
    ),


  days:
    document.getElementById(
      "days"
    ),

  hours:
    document.getElementById(
      "hours"
    ),

  minutes:
    document.getElementById(
      "minutes"
    ),

  seconds:
    document.getElementById(
      "seconds"
    ),

  countdownMessage:
    document.getElementById(
      "countdownMessage"
    ),

  timeProgress:
    document.getElementById(
      "timeProgress"
    ),


  addressName:
    document.getElementById(
      "addressName"
    ),

  addressRole:
    document.getElementById(
      "addressRole"
    ),

  addressTopic:
    document.getElementById(
      "addressTopic"
    ),


  venueCity:
    document.getElementById(
      "venueCity"
    ),

  venueCountry:
    document.getElementById(
      "venueCountry"
    ),

  venueCompassCity:
    document.getElementById(
      "venueCompassCity"
    ),


  mapButton:
    document.getElementById(
      "mapButton"
    ),

  secondaryMapButton:
    document.getElementById(
      "secondaryMapButton"
    ),

  registerButton:
    document.getElementById(
      "registerButton"
    ),

  websiteButton:
    document.getElementById(
      "websiteButton"
    ),


  calendarButton:
    document.getElementById(
      "calendarButton"
    ),

  shareButton:
    document.getElementById(
      "shareButton"
    ),

  topShareButton:
    document.getElementById(
      "topShareButton"
    ),


  axisDisplay:
    document.getElementById(
      "axisDisplay"
    ),

  axisTime:
    document.getElementById(
      "axisTime"
    ),

  axisTitle:
    document.getElementById(
      "axisTitle"
    ),

  axisDescription:
    document.getElementById(
      "axisDescription"
    ),


  footerYear:
    document.getElementById(
      "footerYear"
    ),

  statusMessage:
    document.getElementById(
      "statusMessage"
    ),

  compassStage:
    document.getElementById(
      "compassStage"
    )

};



/* =========================================================
   DATES
========================================================= */

const START_DATE =
  new Date(
    CONFERENCE.startAt
  );


const END_DATE =
  new Date(
    CONFERENCE.endAt
  );


let countdownTimer = null;


/* =========================================================
   POPULATE PAGE
========================================================= */

function populatePage() {

  document
    .querySelectorAll(
      "[data-field]"
    )
    .forEach((element) => {

      const field =
        element.dataset.field;


      if (
        Object.prototype.hasOwnProperty.call(
          CONFERENCE,
          field
        )
      ) {

        element.textContent =
          CONFERENCE[field];

      }

    });


  elements.heroDestination.textContent =
    `${CONFERENCE.city}, ${CONFERENCE.country}`;


  elements.heroDate.textContent =
    formatDate(
      START_DATE,
      {
        month: "long",
        day: "numeric",
        year: "numeric"
      }
    );


  elements.fullEventDate.textContent =
    formatDate(
      START_DATE,
      {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
      }
    );


  elements.eventTime.textContent =
    `${formatTime(START_DATE)} — ${formatTime(END_DATE)}`;


  elements.coordinateCity.textContent =
    CONFERENCE.city;


  elements.addressName.textContent =
    CONFERENCE.openingAddress.name;


  elements.addressRole.textContent =
    CONFERENCE.openingAddress.role;


  elements.addressTopic.textContent =
    CONFERENCE.openingAddress.topic;


  elements.venueCity.textContent =
    CONFERENCE.city;


  elements.venueCountry.textContent =
    CONFERENCE.country;


  elements.venueCompassCity.textContent =
    CONFERENCE.city.toUpperCase();


  elements.footerYear.textContent =
    START_DATE.getFullYear();


  configureLinks();

  updateMetadata();

  addStructuredData();

}



/* =========================================================
   DATE FORMAT
========================================================= */

function formatDate(
  date,
  options
) {

  return new Intl.DateTimeFormat(
    "en-US",
    {
      timeZone:
        CONFERENCE.timeZone,

      ...options
    }
  ).format(date);

}



function formatTime(date) {

  return new Intl.DateTimeFormat(
    "en-US",
    {
      timeZone:
        CONFERENCE.timeZone,

      hour:
        "numeric",

      minute:
        "2-digit",

      hour12:
        true
    }
  ).format(date);

}



/* =========================================================
   MAP
========================================================= */

function getMapUrl() {

  const custom =
    CONFERENCE.mapsUrl?.trim();


  if (custom) {
    return custom;
  }


  const query =
    [
      CONFERENCE.venue,
      CONFERENCE.city,
      CONFERENCE.country
    ]
      .filter(Boolean)
      .join(", ");


  return (
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(query)
  );

}



/* =========================================================
   LINKS
========================================================= */

function configureLinks() {

  const mapUrl =
    getMapUrl();


  elements.mapButton.href =
    mapUrl;


  elements.secondaryMapButton.href =
    mapUrl;


  const registrationUrl =
    CONFERENCE.registrationUrl?.trim();


  if (registrationUrl) {

    elements.registerButton.href =
      registrationUrl;

  } else {

    elements.registerButton.hidden =
      true;

  }


  const websiteUrl =
    CONFERENCE.websiteUrl?.trim();


  if (websiteUrl) {

    elements.websiteButton.href =
      websiteUrl;

  } else {

    elements.websiteButton.hidden =
      true;

  }

}



/* =========================================================
   COUNTDOWN
========================================================= */

function startCountdown() {

  updateCountdown();


  countdownTimer =
    window.setInterval(
      updateCountdown,
      1000
    );

}



function updateCountdown() {

  const now =
    new Date();


  const difference =
    START_DATE.getTime() -
    now.getTime();


  if (difference <= 0) {

    handleStartedEvent(
      now
    );

    return;

  }


  const totalSeconds =
    Math.floor(
      difference / 1000
    );


  const days =
    Math.floor(
      totalSeconds / 86400
    );


  const hours =
    Math.floor(
      (totalSeconds % 86400) /
      3600
    );


  const minutes =
    Math.floor(
      (totalSeconds % 3600) /
      60
    );


  const seconds =
    totalSeconds % 60;


  elements.days.textContent =
    pad(days);


  elements.hours.textContent =
    pad(hours);


  elements.minutes.textContent =
    pad(minutes);


  elements.seconds.textContent =
    pad(seconds);


  updateTimeProgress(
    now
  );

}



function updateTimeProgress(now) {

  /*
    Visual progress begins 365 days before event.
    If further away, the line starts at zero.
  */

  const yearBefore =
    START_DATE.getTime() -
    365 * 24 * 60 * 60 * 1000;


  const total =
    START_DATE.getTime() -
    yearBefore;


  const elapsed =
    now.getTime() -
    yearBefore;


  const percentage =
    Math.max(
      0,
      Math.min(
        100,
        (elapsed / total) * 100
      )
    );


  elements.timeProgress.style.width =
    `${percentage}%`;

}



function handleStartedEvent(now) {

  if (countdownTimer) {

    clearInterval(
      countdownTimer
    );

    countdownTimer =
      null;

  }


  elements.days.textContent =
    "00";

  elements.hours.textContent =
    "00";

  elements.minutes.textContent =
    "00";

  elements.seconds.textContent =
    "00";


  elements.timeProgress.style.width =
    "100%";


  if (
    now.getTime() <=
    END_DATE.getTime()
  ) {

    elements.countdownMessage.textContent =
      "The forum is now in session.";

  } else {

    elements.countdownMessage.textContent =
      "This forum has concluded.";

  }

}



/* =========================================================
   AXES INTERACTION
========================================================= */

function setupAxes() {

  const buttons =
    Array.from(
      document.querySelectorAll(
        ".axis-button"
      )
    );


  buttons.forEach(
    (button) => {

      button.addEventListener(
        "click",
        () => {

          const index =
            Number(
              button.dataset.axis
            );


          selectAxis(
            index,
            buttons
          );

        }
      );

    }
  );


  /*
    Keyboard navigation for tabs.
  */

  buttons.forEach(
    (button, index) => {

      button.addEventListener(
        "keydown",
        (event) => {

          if (
            event.key !==
              "ArrowRight" &&
            event.key !==
              "ArrowLeft"
          ) {
            return;
          }


          event.preventDefault();


          const direction =
            event.key ===
            "ArrowRight"
              ? 1
              : -1;


          const nextIndex =
            (
              index +
              direction +
              buttons.length
            ) %
            buttons.length;


          buttons[
            nextIndex
          ].focus();


          selectAxis(
            nextIndex,
            buttons
          );

        }
      );

    }
  );

}



function selectAxis(
  index,
  buttons
) {

  const item =
    CONFERENCE.axes[index];


  if (!item) {
    return;
  }


  buttons.forEach(
    (button, buttonIndex) => {

      const active =
        buttonIndex === index;


      button.classList.toggle(
        "is-active",
        active
      );


      button.setAttribute(
        "aria-selected",
        String(active)
      );

    }
  );


  elements.axisDisplay
    .querySelector(
      ".axis-display__number"
    )
    .textContent =
      pad(index + 1);


  elements.axisTime.textContent =
    item.time;


  elements.axisTitle.textContent =
    item.title;


  elements.axisDescription.textContent =
    item.description;


  /*
    Small content refresh animation.
  */

  if (
    !prefersReducedMotion()
  ) {

    elements.axisDisplay.animate(
      [
        {
          opacity: 0.55,
          transform:
            "translateY(7px)"
        },

        {
          opacity: 1,
          transform:
            "translateY(0)"
        }
      ],
      {
        duration: 260,
        easing: "ease-out"
      }
    );

  }

}



/* =========================================================
   COMPASS POINTER INTERACTION
========================================================= */

function setupCompassInteraction() {

  if (
    prefersReducedMotion()
  ) {
    return;
  }


  const updatePosition =
    (clientX, clientY) => {

      const viewportCenterX =
        window.innerWidth / 2;


      const viewportCenterY =
        window.innerHeight / 2;


      const normalizedX =
        (
          clientX -
          viewportCenterX
        ) /
        viewportCenterX;


      const normalizedY =
        (
          clientY -
          viewportCenterY
        ) /
        viewportCenterY;


      const moveX =
        normalizedX * 12;


      const moveY =
        normalizedY * 12;


      document.documentElement
        .style
        .setProperty(
          "--pointer-x",
          `${moveX}px`
        );


      document.documentElement
        .style
        .setProperty(
          "--pointer-y",
          `${moveY}px`
        );

    };


  window.addEventListener(
    "pointermove",
    (event) => {

      updatePosition(
        event.clientX,
        event.clientY
      );

    },
    {
      passive: true
    }
  );


  /*
    Mobile touch interaction.
  */

  window.addEventListener(
    "touchmove",
    (event) => {

      const touch =
        event.touches[0];


      if (!touch) {
        return;
      }


      updatePosition(
        touch.clientX,
        touch.clientY
      );

    },
    {
      passive: true
    }
  );

}



/* =========================================================
   SCROLL REVEAL
========================================================= */

function setupReveal() {

  const items =
    document.querySelectorAll(
      ".reveal"
    );


  if (
    prefersReducedMotion()
  ) {

    items.forEach(
      (item) =>
        item.classList.add(
          "is-visible"
        )
    );

    return;

  }


  const observer =
    new IntersectionObserver(
      (entries) => {

        entries.forEach(
          (entry) => {

            if (
              !entry.isIntersecting
            ) {
              return;
            }


            entry.target.classList.add(
              "is-visible"
            );


            observer.unobserve(
              entry.target
            );

          }
        );

      },
      {
        threshold: 0.13,

        rootMargin:
          "0px 0px -7% 0px"
      }
    );


  items.forEach(
    (item) => {

      observer.observe(
        item
      );

    }
  );

}



/* =========================================================
   ICS CALENDAR
========================================================= */

function downloadCalendar() {

  const location =
    [
      CONFERENCE.venue,
      CONFERENCE.city,
      CONFERENCE.country
    ]
      .filter(Boolean)
      .join(", ");


  const invitationUrl =
    getShareUrl();


  const description =
    [
      CONFERENCE.tagline,

      CONFERENCE.websiteUrl
        ? `Website: ${CONFERENCE.websiteUrl}`
        : "",

      invitationUrl
        ? `Invitation: ${invitationUrl}`
        : ""
    ]
      .filter(Boolean)
      .join("\\n");


  const content =
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Capital Compass Invitation//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:${createUID()}
DTSTAMP:${formatICSDate(new Date())}
DTSTART:${formatICSDate(START_DATE)}
DTEND:${formatICSDate(END_DATE)}
SUMMARY:${escapeICS(CONFERENCE.name)}
DESCRIPTION:${escapeICS(description)}
LOCATION:${escapeICS(location)}
URL:${escapeICS(CONFERENCE.websiteUrl || invitationUrl)}
END:VEVENT
END:VCALENDAR`;


  const blob =
    new Blob(
      [content],
      {
        type:
          "text/calendar;charset=utf-8"
      }
    );


  const url =
    URL.createObjectURL(
      blob
    );


  const link =
    document.createElement(
      "a"
    );


  link.href =
    url;


  link.download =
    `${slugify(CONFERENCE.shortName)}.ics`;


  document.body.appendChild(
    link
  );


  link.click();

  link.remove();


  URL.revokeObjectURL(
    url
  );


  announce(
    "Calendar file downloaded."
  );

}



function formatICSDate(date) {

  return date
    .toISOString()
    .replace(
      /[-:]/g,
      ""
    )
    .replace(
      /\.\d{3}Z$/,
      "Z"
    );

}



function createUID() {

  return (
    `${slugify(CONFERENCE.shortName)}` +
    `-${START_DATE.getTime()}` +
    "@capital-compass"
  );

}



function escapeICS(value = "") {

  return String(value)

    .replace(
      /\\/g,
      "\\\\"
    )

    .replace(
      /\n/g,
      "\\n"
    )

    .replace(
      /,/g,
      "\\,"
    )

    .replace(
      /;/g,
      "\\;"
    );

}



/* =========================================================
   SHARE
========================================================= */

async function shareInvitation() {

  const data = {

    title:
      CONFERENCE.name,

    text:
      `${CONFERENCE.name} — ${CONFERENCE.tagline}`,

    url:
      getShareUrl()

  };


  if (
    navigator.share
  ) {

    try {

      await navigator.share(
        data
      );


      announce(
        "Invitation shared."
      );


      return;

    } catch (error) {

      if (
        error.name ===
        "AbortError"
      ) {

        return;

      }

    }

  }


  await copyLink();

}



async function copyLink() {

  const url =
    getShareUrl();


  try {

    await navigator.clipboard.writeText(
      url
    );


    announce(
      "Invitation link copied."
    );

  } catch (error) {

    legacyCopy(
      url
    );

  }

}



function legacyCopy(text) {

  const field =
    document.createElement(
      "textarea"
    );


  field.value =
    text;


  field.setAttribute(
    "readonly",
    ""
  );


  field.style.position =
    "fixed";

  field.style.opacity =
    "0";


  document.body.appendChild(
    field
  );


  field.select();


  try {

    document.execCommand(
      "copy"
    );


    announce(
      "Invitation link copied."
    );

  } catch (error) {

    announce(
      "Unable to copy the invitation link."
    );

  }


  field.remove();

}



function getShareUrl() {

  const custom =
    CONFERENCE.shareUrl?.trim();


  if (custom) {
    return custom;
  }


  return window.location.href;

}



/* =========================================================
   BUTTON EVENTS
========================================================= */

function setupActions() {

  elements.calendarButton.addEventListener(
    "click",
    downloadCalendar
  );


  elements.shareButton.addEventListener(
    "click",
    shareInvitation
  );


  elements.topShareButton.addEventListener(
    "click",
    shareInvitation
  );

}



/* =========================================================
   METADATA
========================================================= */

function updateMetadata() {

  document.title =
    CONFERENCE.name;


  const description =
    `${CONFERENCE.name} — ${CONFERENCE.tagline}`;


  setMeta(
    'meta[name="description"]',
    description
  );


  setMeta(
    'meta[property="og:title"]',
    CONFERENCE.name
  );


  setMeta(
    'meta[property="og:description"]',
    CONFERENCE.tagline
  );


  setMeta(
    'meta[property="og:url"]',
    getShareUrl()
  );


  setMeta(
    'meta[name="twitter:title"]',
    CONFERENCE.name
  );


  setMeta(
    'meta[name="twitter:description"]',
    CONFERENCE.tagline
  );

}



function setMeta(
  selector,
  content
) {

  const meta =
    document.querySelector(
      selector
    );


  if (!meta) {
    return;
  }


  meta.setAttribute(
    "content",
    content
  );

}



/* =========================================================
   STRUCTURED DATA
========================================================= */

function addStructuredData() {

  const data = {

    "@context":
      "https://schema.org",

    "@type":
      "Event",

    name:
      CONFERENCE.name,

    description:
      CONFERENCE.tagline,

    startDate:
      CONFERENCE.startAt,

    endDate:
      CONFERENCE.endAt,

    eventStatus:
      "https://schema.org/EventScheduled",

    eventAttendanceMode:
      "https://schema.org/OfflineEventAttendanceMode",

    location: {

      "@type":
        "Place",

      name:
        CONFERENCE.venue,

      address: {

        "@type":
          "PostalAddress",

        addressLocality:
          CONFERENCE.city,

        addressCountry:
          CONFERENCE.country

      }

    },

    organizer: {

      "@type":
        "Organization",

      name:
        CONFERENCE.organizer,

      url:
        CONFERENCE.websiteUrl ||
        undefined

    },

    url:
      getShareUrl()

  };


  const script =
    document.createElement(
      "script"
    );


  script.type =
    "application/ld+json";


  script.textContent =
    JSON.stringify(
      data
    );


  document.head.appendChild(
    script
  );

}



/* =========================================================
   UTILITIES
========================================================= */

function pad(number) {

  return String(number)
    .padStart(
      2,
      "0"
    );

}



function slugify(value = "") {

  return value
    .toLowerCase()
    .trim()
    .replace(
      /[^a-z0-9]+/g,
      "-"
    )
    .replace(
      /^-+|-+$/g,
      ""
    );

}



function prefersReducedMotion() {

  return window
    .matchMedia(
      "(prefers-reduced-motion: reduce)"
    )
    .matches;

}



function announce(message) {

  elements.statusMessage.textContent =
    "";


  window.setTimeout(
    () => {

      elements.statusMessage.textContent =
        message;

    },
    30
  );

}



/* =========================================================
   INITIALIZE
========================================================= */

function init() {

  populatePage();

  startCountdown();

  setupAxes();

  setupCompassInteraction();

  setupReveal();

  setupActions();

}



document.addEventListener(
  "DOMContentLoaded",
  init
);
