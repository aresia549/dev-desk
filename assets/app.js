(() => {
  const KEY = "deliveryDeskDemoRequests";
  const getRequests = () => { try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; } };
  const saveRequests = rows => localStorage.setItem(KEY, JSON.stringify(rows));

  const form = document.getElementById("deliveryForm");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      if (!form.reportValidity()) return;
      const data = Object.fromEntries(new FormData(form).entries());
      data.id = "DD-" + String(Date.now()).slice(-6);
      data.createdAt = new Date().toISOString();
      data.status = "Pending";
      const rows = getRequests(); rows.unshift(data); saveRequests(rows);
      form.classList.add("hidden");
      document.getElementById("successPanel").classList.remove("hidden");
    });
  }

  const login = document.getElementById("loginForm");
  if (login) login.addEventListener("submit", e => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    if (!email.endsWith("@demo.test")) { alert("For this front-end preview, use owner@demo.test or employee@demo.test."); return; }
    const role = email.startsWith("employee") ? "employee" : "owner";
    sessionStorage.setItem("deliveryDeskDemoRole", role);
    sessionStorage.setItem("deliveryDeskDemoEmail", email);
    location.href = "dashboard.html";
  });

  const rowsEl = document.getElementById("deliveryRows");
  if (rowsEl) {
    const role = sessionStorage.getItem("deliveryDeskDemoRole") || "owner";
    const email = sessionStorage.getItem("deliveryDeskDemoEmail") || "owner@demo.test";
    const rows = getRequests();
    document.getElementById("sideUser").textContent = role === "owner" ? "Demo owner" : "Demo employee";
    document.getElementById("sideRole").textContent = role === "owner" ? "Owner account" : "Employee account";
    document.getElementById("roleStat").textContent = role === "owner" ? "Owner" : "Employee";
    document.getElementById("welcomeTitle").textContent = role === "owner" ? "Good morning, owner" : "Your delivery workspace";
    if (role === "employee") {
      document.getElementById("teamNav").classList.add("hidden");
      document.getElementById("settingsNav").classList.add("hidden");
      document.getElementById("team").classList.add("hidden");
      document.getElementById("settings").classList.add("hidden");
    }
    document.getElementById("totalCount").textContent = rows.length;
    document.getElementById("pendingCount").textContent = rows.filter(r => r.status === "Pending").length;
    document.getElementById("tableCount").textContent = rows.length + (rows.length === 1 ? " request" : " requests");
    if (rows.length) rowsEl.innerHTML = rows.map(r => `<tr><td><b>${esc(r.id)}</b><small>${new Date(r.createdAt).toLocaleDateString()}</small></td><td>${esc(r.firstName)} ${esc(r.lastName)}<small>${esc(r.phone)}</small></td><td>${esc(r.city)}, ${esc(r.country)}<small>${esc(r.address)}</small></td><td>${esc(r.paymentMethod)}</td><td><span class="pill pill-amber">Pending</span></td></tr>`).join("");
    document.getElementById("logoutBtn").addEventListener("click", () => { sessionStorage.clear(); location.href = "login.html"; });
  }
  function esc(value) { return String(value || "").replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c])); }
})();