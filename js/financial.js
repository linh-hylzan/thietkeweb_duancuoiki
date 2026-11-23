const filtered = appData.subjects.filter(sub => {
      const matchKeyword = sub.name.toLowerCase().includes(keyword) || sub.code.toLowerCase().includes(keyword);
      const matchStatus = statusFilter === "all" || sub.status === statusFilter;
      return matchKeyword && matchStatus;
    });

    if (filtered.length === 0) {
      tableContainer.innerHTML = `<p style="text-align: center; color: var(--text-muted); padding: 1.5rem;">Không tìm thấy môn học nào phù hợp với từ khóa tra cứu.</p>`;
      return;
    }

    let rows = filtered.map(sub => {
      const fee = sub.credits * sub.feePerCredit;
      const badgeStyle = sub.status === "Đã đóng"
        ? "background: #dcfce7; color: #166534;"
        : "background: #fef3c7; color: #92400e;";

      return `
        <tr>
          <td style="text-align: center;">
            <input type="checkbox" class="sub-checkbox" data-code="${sub.code}" ${sub.selected ? "checked" : ""} ${sub.status === "Đã đóng" ? "disabled" : ""}>
          </td>
          <td><strong>${sub.code}</strong></td>
          <td>${sub.name}</td>
          <td style="text-align: center;">${sub.credits}</td>
          <td>${sub.semester}</td>
          <td><strong>${formatCurrency(fee)}</strong></td>
          <td><span style="${badgeStyle} padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.8rem; font-weight: 600;">${sub.status}</span></td>
        </tr>
      `;
    }).join("");

    tableContainer.innerHTML = `
      <table>
        <thead>
          <tr>
            <th style="text-align: center; width: 60px;">Chọn</th>
            <th>Mã môn</th>
            <th>Tên môn học</th>
            <th style="text-align: center;">Tín chỉ</th>
            <th>Học kỳ</th>
            <th>Học phí</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    `;

    // Gắn sự kiện tick chọn môn học và lưu lại ngay
    document.querySelectorAll(".sub-checkbox").forEach(cb => {
      cb.addEventListener("change", (e) => {
        const code = e.target.getAttribute("data-code");
        const targetSub = appData.subjects.find(s => s.code === code);
        if (targetSub) {
          targetSub.selected = e.target.checked;
          saveAppData(appData);
          calculateSummary();
        }
      });
    });
  }

  // 5. Tính toán tổng tiền thực tế cần đóng
  function calculateSummary() {
    const selectedSubs = appData.subjects.filter(s => s.selected && s.status !== "Đã đóng");
    const tuitionTotal = selectedSubs.reduce((sum, s) => sum + (s.credits * s.feePerCredit), 0);
    const otherFee = Number(otherFeesInput?.value || 0);

    const eligible = getEligibleScholarship(Number(appData.student.gpa));
    const discountRate = eligible ? eligible.discount : 0;
    const discountAmount = tuitionTotal * discountRate;
    document.addEventListener("DOMContentLoaded", () => {
  let appData = getAppData();

  const scholarshipContainer = document.getElementById("scholarship-list");
  const tableContainer = document.getElementById("subjects-table-container");
  const searchInput = document.getElementById("search-subject");
  const filterSelect = document.getElementById("filter-status");
  const otherFeesInput = document.getElementById("other-fees-input");

  // 1. Khởi tạo bộ lọc trạng thái
  if (filterSelect) {
    filterSelect.innerHTML = `
      <option value="all">Tất cả trạng thái</option>
      <option value="Chưa đóng">Chưa đóng</option>
      <option value="Đã đóng">Đã đóng</option>
    `;
  }

  // Thiết lập phí BHYT mặc định từ hồ sơ
  if (otherFeesInput && appData.student.autoBHYT && Number(otherFeesInput.value) === 0) {
    otherFeesInput.value = 768000;
  }

  // 2. Xác định mức học bổng dựa trên GPA của sinh viên
  function getEligibleScholarship(gpa) {
    const sorted = [...appData.scholarships].sort((a, b) => b.minGpa - a.minGpa);
    return sorted.find(s => gpa >= s.minGpa) || null;
  }

  // 3. Render danh mục học bổng
  function renderScholarships() {
    if (!scholarshipContainer) return;
    const gpa = Number(appData.student.gpa);
    const eligible = getEligibleScholarship(gpa);

    let html = `<p style="margin-bottom: 1rem;">GPA tích lũy hiện tại của bạn: <strong style="color: var(--primary); font-size: 1.1rem;">${gpa.toFixed(2)} / 4.00</strong> `;
    if (eligible) {
      html += `<span style="background: #dcfce7; color: #166534; padding: 0.25rem 0.6rem; border-radius: 6px; font-size: 0.85rem; font-weight: 600; margin-left: 0.5rem;">Đạt: ${eligible.name}</span></p>`;
    } else {
      html += `<span style="background: #f1f5f9; color: #64748b; padding: 0.25rem 0.6rem; border-radius: 6px; font-size: 0.85rem; margin-left: 0.5rem;">Chưa đủ điều kiện xét học bổng</span></p>`;
    }

    html += `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem;">`;
    appData.scholarships.forEach(item => {
      const isAchieved = eligible && eligible.id === item.id;
      html += `
        <div style="padding: 1rem; border-radius: 8px; border: 2px solid ${isAchieved ? 'var(--accent)' : '#e2e8f0'}; background: ${isAchieved ? '#f0fdf4' : '#ffffff'};">
          <div style="font-weight: 600; color: var(--primary); margin-bottom: 0.25rem;">${item.name}</div>
          <div style="font-size: 0.85rem; color: var(--text-muted);">${item.desc}</div>
        </div>
      `;
    });
    html += `</div>`;
    scholarshipContainer.innerHTML = html;
  }

  // 4. Render bảng môn học & lọc dữ liệu
  function renderSubjectsTable() {
    if (!tableContainer) return;
    const keyword = (searchInput?.value || "").toLowerCase().trim();
    const statusFilter = filterSelect?.value || "all";
    const finalTotal = Math.max(0, tuitionTotal + otherFee - discountAmount);

    document.getElementById("sum-tuition").textContent = formatCurrency(tuitionTotal);
    document.getElementById("sum-other").textContent = formatCurrency(otherFee);
    document.getElementById("sum-discount").textContent = `-${formatCurrency(discountAmount)} (${discountRate * 100}%)`;
    document.getElementById("sum-total").textContent = formatCurrency(finalTotal);
  }

  // Sự kiện tìm kiếm & thay đổi phí
  searchInput?.addEventListener("input", renderSubjectsTable);
  filterSelect?.addEventListener("change", renderSubjectsTable);
  otherFeesInput?.addEventListener("input", calculateSummary);

  // Chạy khởi tạo
  renderScholarships();
  renderSubjectsTable();
  calculateSummary();
});
