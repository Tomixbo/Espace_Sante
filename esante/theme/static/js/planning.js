// planning.js

// Déclarer le ResizeObserver en dehors de la fonction pour qu'il soit accessible globalement
let resizeObserver;

function initializePlanningContent() {
  // Récupérer les données à partir des attributs de données
  const scheduleContainer = document.getElementById("schedule-container");
  if (!scheduleContainer) return; // Vérifier si l'élément existe

  const isDoctor = scheduleContainer.getAttribute("data-is-doctor") === "true";
  const csrfToken = scheduleContainer.getAttribute("data-csrf-token");
  const userId = scheduleContainer.getAttribute("data-user-id");

  // Écouteurs pour les consultations existantes
  scheduleContainer
    .querySelectorAll("[data-consultation-id]")
    .forEach((element) => {
      element.addEventListener("click", function () {
        const consultationId = this.dataset.consultationId;
        const doctor = this.dataset.consultationDoctor;
        const patient = this.dataset.consultationPatient;
        const facility = this.dataset.consultationFacility;
        const startTime = this.dataset.consultationStart;
        const endTime = this.dataset.consultationEnd;

        // Formater la date et l'heure
        const consultationDate = new Date(startTime).toLocaleDateString(
          "fr-FR",
          {
            timeZone: "Indian/Antananarivo",
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }
        );

        const startHour = new Date(startTime)
          .toLocaleTimeString("fr-FR", {
            timeZone: "Indian/Antananarivo",
            hour: "2-digit",
            minute: "2-digit",
          })
          .replace(":00", "h");

        const endHour = new Date(endTime)
          .toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
          })
          .replace(":00", "h");

        const formattedDateTime = `${consultationDate}, de ${startHour} à ${endHour}`;

        // Afficher les détails dans le modal
        document.getElementById("modal-start-time").textContent =
          formattedDateTime;
        document.getElementById("modal-doctor").textContent = doctor;
        document.getElementById("modal-patient").textContent = patient;
        document.getElementById("modal-facility").textContent = facility;

        document
          .getElementById("consultation-modal")
          .classList.remove("hidden");
      });
    });

  // Écouteurs pour les créneaux disponibles
  scheduleContainer.querySelectorAll("[data-date]").forEach((element) => {
    element.addEventListener("click", function () {
      const date = this.dataset.date;
      const hour = this.dataset.hour;

      document.getElementById("modal-date").textContent = date;
      document.getElementById("modal-hour").textContent = hour;

      let selectionHTML = "";

      if (isDoctor) {
        const patientSelection =
          document.getElementById("patient-selection").innerHTML;
        selectionHTML = patientSelection;
      } else {
        const doctorSelection =
          document.getElementById("doctor-selection").innerHTML;
        selectionHTML = doctorSelection;
      }

      document.getElementById("user-selection").innerHTML = selectionHTML;
      document.getElementById("booking-modal").classList.remove("hidden");
    });
  });

  // Fermer les modals
  const closeModalBtn = document.getElementById("close-modal");
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", function () {
      document.getElementById("consultation-modal").classList.add("hidden");
    });
  }

  const closeBookingModalBtn = document.getElementById("close-modal-booking");
  if (closeBookingModalBtn) {
    closeBookingModalBtn.addEventListener("click", function () {
      document.getElementById("booking-modal").classList.add("hidden");
    });
  }

  // Confirmer la réservation
  const confirmBookingBtn = document.getElementById("confirm-booking");
  if (confirmBookingBtn) {
    confirmBookingBtn.addEventListener("click", function () {
      const date = document.getElementById("modal-date").textContent;
      const hour = document.getElementById("modal-hour").textContent;

      let userSelection = "";

      if (isDoctor) {
        userSelection = document.getElementById("patient").value;
      } else {
        userSelection = document.getElementById("doctor").value;
      }

      // Extraire les heures de début et de fin
      const startHour = hour.split(" - ")[0].replace("h", "");
      const endHour = hour.split(" - ")[1].replace("h", "");

      const startHourPadded = startHour.padStart(2, "0");
      const endHourPadded = endHour.padStart(2, "0");

      const consultation_start_time = `${date}T${startHourPadded}:00:00`;
      const consultation_end_time = `${date}T${endHourPadded}:00:00`;

      // Envoyer les données au serveur
      fetch("/create-consultation/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify({
          doctor: isDoctor ? userId : userSelection,
          patient: isDoctor ? userSelection : userId,
          consultation_start_time: consultation_start_time,
          consultation_end_time: consultation_end_time,
          facility: "Online",
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            document.getElementById("booking-modal").classList.add("hidden");
            location.reload();
          } else {
            alert("Erreur lors de la réservation: " + data.message);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Une erreur s'est produite.");
        });
    });
  }

  // Fonction pour ajuster l'affichage en fonction de la largeur du conteneur parent
  function adjustView() {
    const tableView = document.getElementById("table-view");
    const listView = document.getElementById("list-view");

    if (!tableView || !listView) return;

    // Obtenir la largeur du conteneur parent
    const containerWidth = scheduleContainer.clientWidth;

    if (containerWidth > 768) {
      // Afficher la vue tableau
      tableView.style.display = "block";
      listView.style.display = "none";
    } else {
      // Afficher la vue liste
      tableView.style.display = "none";
      listView.style.display = "block";
    }
  }

  // Appeler la fonction lors du chargement
  adjustView();

  // Observer les changements de taille du conteneur
  if (resizeObserver) {
    resizeObserver.disconnect(); // Déconnecter l'ancien observateur
  }
  resizeObserver = new ResizeObserver((entries) => {
    for (let entry of entries) {
      adjustView();
    }
  });
  resizeObserver.observe(scheduleContainer);

  // Écouteurs pour la navigation des semaines
  const prevWeekBtn = document.getElementById("prev-week");
  const nextWeekBtn = document.getElementById("next-week");

  if (prevWeekBtn) {
    prevWeekBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const weekOffset = this.dataset.weekOffset;
      loadWeek(weekOffset);
    });
  }

  if (nextWeekBtn) {
    nextWeekBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const weekOffset = this.dataset.weekOffset;
      loadWeek(weekOffset);
    });
  }
}

// Fonction pour charger une semaine spécifique via AJAX
function loadWeek(weekOffset) {
  const url = `/planning/?week=${weekOffset}`;

  fetch(url, { headers: { "X-Requested-With": "XMLHttpRequest" } })
    .then((response) => response.text())
    .then((html) => {
      // Créer un élément temporaire pour parser le HTML
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = html;

      const newScheduleContainer = tempDiv.querySelector("#schedule-container");
      const oldScheduleContainer =
        document.getElementById("schedule-container");

      if (newScheduleContainer && oldScheduleContainer) {
        // Déconnecter l'ancien observateur avant de remplacer le conteneur
        if (resizeObserver) {
          resizeObserver.disconnect();
        }

        oldScheduleContainer.parentNode.replaceChild(
          newScheduleContainer,
          oldScheduleContainer
        );

        // Réinitialiser les écouteurs d'événements
        initializePlanningContent();
      }
    })
    .catch((error) => {
      console.error("Erreur lors du chargement de la semaine:", error);
    });
}
