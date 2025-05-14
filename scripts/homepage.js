
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM Loaded");

  const menuButton = document.querySelector(".menu-toggle");
  const navList = document.querySelector("nav ul");
  if (menuButton & navList) {
    menuButton.addEventListener("click", () => {
      navList.classList.toggle("open");
      menuButton.classList.toggle("open");
    });
  }

  const courses = [
    { code: "CSE 110", name: "CSE 110", credits: 3, type: "CSE", completed: true },
    { code: "WDD 130", name: "CSE 130", credits: 3, type: "WDD", completed: true },
    { code: "CSE 111", name: "CSE 111", credits: 3, type: "CSE", completed: false },
    { code: "CSE 210", name: "CSE 210", credits: 3, type: "CSE", completed: false },
    { code: "WDD 131", name: "WDD 131", credits: 3, type: "WDD", completed: true },
    { code: "WDD 231", name: "WDD 231", credits: 3, type: "WDD", completed: false }
  ];

  function renderCourses(filterType = "All") {
    console.log("Rendering courses:", filterType);
    const container = document.querySelector(".course-grid");
    if (!container) {
      console.error("Missing .course-grid element on HTML.");
      return;
    }
    container.innerHTML = "  ";
    let filtered = courses;
    if (filterType === "WDD") {
      filtered = courses.filter(course => course.type === "WDD");
    } else if (filterType === "CSE") {
      filtered = courses.filter(course => course.type === "CSE");
    }
    let totalCredits = 0;
    filtered.forEach(course => {
      totalCredits += course.credits;
      const div = document.createElement("div");
      div.classList.add("course");
      if (course.completed) {
        div.classList.add("completed");
      }
      div.innerHTML = `
      <h3>${course.code}</h3>
        <p>${course.name}</p>
        <p>${course.credits} credits</p>
      `;
      console.log("Adding course:", course.code);
      container.appendChild(div);
    });
    const creditDisplay = document.querySelector("#credit-total");
    if (creditDisplay) {
      creditDisplay.textContent = 'Total Credits: ${totalCredits}';
    }
  }

  document.querySelector("#filter-all")?.addEventListener("click", () => renderCourses("All"));
  document.querySelector("#filter-cse")?.addEventListener("click", () => renderCourses("CSE"));
  document.querySelector("#filter-wdd")?.addEventListener("click", () => renderCourses("WDD"));
  renderCourses();
});
