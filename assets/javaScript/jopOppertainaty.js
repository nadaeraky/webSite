const UNIT_EMAIL = "grads@ndeti.edu.eg";
const UNIT_EMAIL_LABEL = "وحدة الخريجين والتوظيف";

const JOBS = [
  {
    id: 1,
    company: "CHEMICAL SEED – الشركة الدولية للصناعات الكيمياوية",
    description:
      "شركة رائدة متخصصة في مجال إنتاج الأسمدة والأحماض والكيماويات ذات الجودة العالية.",
    specialties: ["هندسة كيميائية", "هندسة اتصالات وإلكترونيات"],
    image: "../assets/image/jop2.jfif",

    dateFrom: "2025-03-01",
    dateTo: "2025-04-30",
  },
  {
    id: 2,
    company: "شركة دمياط للزيوت",
    description:
      "شركة وطنية رائدة في مجال استخلاص الزيوت النباتية بأحدث التقنيات في مصر والشرق الأوسط.",
    specialties: ["هندسة كيميائية"],
    image: "../assets/image/jop1.png",
    dateFrom: "2026-03-01",
    dateTo: "2026-06-01",
  },
];

function parseDate(str) {
  const [y, m, d] = str.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function formatDateAr(str) {
  return parseDate(str).toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** Return true if today is within the application period */
function isAvailable(job) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return parseDate(job.dateTo) >= today;
}
// HTML
function buildCard(job) {
  const available = isAvailable(job);
  const statusClass = available ? "available" : "expired";
  const statusLabel = available ? "متاح للتقديم" : "انتهت المدة";
  const statusIcon = available ? "fa-check-circle" : "fa-times-circle";

  // Specialty tags
  const tagsHtml = job.specialties
    .map((t) => `<span class="tag">${t}</span>`)
    .join("");

  // Apply button
  const applyBtn = available
    ? `<a href="mailto:${UNIT_EMAIL}?subject=التقديم على وظيفة ${job.company}" class="apply-btn available">
         <i class="fas fa-paper-plane"></i>تقدم الآن
       </a>`
    : `<button class="apply-btn expired" disabled>
         <i class="fas fa-lock"></i>انتهى التقديم
       </button>`;

  return `
    <div class="job-card ${statusClass}" data-status="${statusClass}" data-id="${job.id}">

      <div class="status-ribbon ${statusClass}">
        <i class="fas ${statusIcon}"></i>
        ${statusLabel}
      </div>

      <div class="card-image-wrap">
        <img
          src="${job.image}"
          alt="إعلان ${job.company}"
          loading="lazy"
          onerror="this.onerror=null;
                   this.src='../assets/image/logo.jpeg';
                   this.style.objectFit='contain';
                   this.style.padding='2rem'"
        />
      </div>

      <div class="card-body">
        <div class="card-company">
          <i class="fas fa-building"></i>
          ${job.company}
        </div>
        <p class="card-title">${job.description}</p>

        <div class="card-tags">${tagsHtml}</div>

        <!-- ملاحظة: لخريجي المعهد فقط -->
        <div class="card-note">
          <i class="fas fa-graduation-cap"></i>
          هذه الوظيفة مخصصة لخريجي المعهد فقط
        </div>

        <div class="card-dates">
          <div class="date-row">
            <i class="fas fa-calendar-plus"></i>
            بداية التقديم: <strong>${formatDateAr(job.dateFrom)}</strong>
          </div>
          <div class="date-row">
            <i class="fas fa-calendar-times"></i>
            نهاية التقديم: <strong>${formatDateAr(job.dateTo)}</strong>
          </div>
        </div>
      </div>

      <div class="card-footer">
        <div class="card-contact">
          <span class="contact-label">التقديم عبر:</span>
          <a href="mailto:${UNIT_EMAIL}">${UNIT_EMAIL_LABEL}</a>
          <a href="mailto:${UNIT_EMAIL}" class="contact-email">${UNIT_EMAIL}</a>
        </div>
        ${applyBtn}
      </div>

    </div>
  `;
}

//  ALL CARDS
function renderAll() {
  const grid = document.getElementById("jobsGrid");
  grid.innerHTML = JOBS.map(buildCard).join("");

  const total = JOBS.length;
  const available = JOBS.filter(isAvailable).length;

  document.getElementById("totalCount").textContent = total;
  document.getElementById("availableCount").textContent = available;
  document.getElementById("expiredCount").textContent = total - available;
}

//  FILTER
function filterJobs(filter, btn) {
  // Toggle active class on buttons
  document.querySelectorAll(".filter-btn").forEach((b) => {
    b.classList.remove("active", "active-available", "active-expired");
  });

  if (filter === "all") btn.classList.add("active");
  if (filter === "available") btn.classList.add("active-available");
  if (filter === "expired") btn.classList.add("active-expired");

  // Show / hide cards
  let visible = 0;
  document.querySelectorAll(".job-card").forEach((card) => {
    const show = filter === "all" || card.dataset.status === filter;
    card.classList.toggle("hidden", !show);
    if (show) visible++;
  });

  // Empty state
  document.getElementById("emptyState").style.display =
    visible === 0 ? "block" : "none";
}

//  INIT
document.addEventListener("DOMContentLoaded", () => {
  renderAll();
  initMobileMenu();
});
