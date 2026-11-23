document.addEventListener("DOMContentLoaded", () => {
  // Lấy thông tin sinh viên từ localStorage (nếu đã chỉnh sửa ở trang Profile) hoặc từ JSON gốc
  const savedStudent = JSON.parse(localStorage.getItem("lhu_student")) || financialData.student;

  document.getElementById("dash-student-name").textContent = savedStudent.name;
  document.getElementById("dash-student-id").textContent = savedStudent.id;

  // Tính toán tổng quan từ dữ liệu JSON
  const unpaidCourses = financialData.courses.filter(c => c.status === "unpaid");
  const totalUnpaid = unpaidCourses.reduce((sum, item) => sum + item.fee, 0);

  // Xác định học bổng cao nhất đạt được dựa trên GPA
  const eligibleScholarship = financialData.scholarships.find(s => savedStudent.gpa >= s.minGpa);
  const scholarshipText = eligibleScholarship 
    ? `Giảm ${eligibleScholarship.discountPercent}% (${eligibleScholarship.name})` 
    : "Chưa đủ điều kiện";

  // Render các thẻ Widget bằng CSS Grid
  const widgetsContainer = document.getElementById("dashboard-widgets");
  const widgets = [
    { title: "GPA Tích lũy hiện tại", value: savedStudent.gpa.toFixed(2), highlight: false },
    { title: "Học phí chưa thanh toán", value: formatCurrency(totalUnpaid), highlight: true },
    { title: "Mức học bổng đủ điều kiện", value: eligibleScholarship ? `${eligibleScholarship.discountPercent}%` : "0%", highlight: false },
    { title: "Hạn đóng học phí gần nhất", value: financialData.deadline, highlight: true }
  ];

  widgetsContainer.innerHTML = widgets.map(w => `
    <div class="card ${w.highlight ? 'highlight' : ''}">
      <h3>${w.title}</h3>
      <div class="value">${w.value}</div>
    </div>
  `).join("");
});
