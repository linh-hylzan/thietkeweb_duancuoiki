document.addEventListener("DOMContentLoaded", () => {
  const appData = getAppData();

  // Hiển thị tên và MSSV trên banner chào mừng
  const nameEl = document.getElementById("dash-student-name");
  const idEl = document.getElementById("dash-student-id");
  if (nameEl) nameEl.textContent = appData.student.name;
  if (idEl) idEl.textContent = appData.student.id;

  // Tính toán các thẻ thống kê
  const widgetsContainer = document.getElementById("dashboard-widgets");
  if (widgetsContainer) {
    const unpaidSubs = appData.subjects.filter(s => s.status === "Chưa đóng");
    const totalDebt = unpaidSubs.reduce((sum, s) => sum + (s.credits * s.feePerCredit), 0);
    const totalCredits = unpaidSubs.reduce((sum, s) => sum + s.credits, 0);

    widgetsContainer.innerHTML = `
      <div class="card">
        <div style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 0.5rem;">Điểm GPA Tích Lũy</div>
        <div style="font-size: 1.75rem; font-weight: 700; color: var(--primary);">${Number(appData.student.gpa).toFixed(2)} / 4.00</div>
        <div style="font-size: 0.85rem; color: var(--accent); margin-top: 0.5rem;">Đủ điều kiện xét học bổng</div>
      </div>

      <div class="card">
        <div style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 0.5rem;">Công nợ Học phí Chưa đóng</div>
        <div style="font-size: 1.75rem; font-weight: 700; color: #dc2626;">${formatCurrency(totalDebt)}</div>
        <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.5rem;">Gồm ${unpaidSubs.length} môn (${totalCredits} tín chỉ)</div>
      </div>

      <div class="card">
        <div style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 0.5rem;">Trạng thái Hồ sơ</div>
        <div style="font-size: 1.35rem; font-weight: 700; color: var(--accent); margin-top: 0.3rem;">Đã xác thực</div>
        <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.6rem;">${appData.student.faculty}</div>
      </div>
    `;
  }
});
