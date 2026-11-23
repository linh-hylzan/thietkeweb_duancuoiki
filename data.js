// Dữ liệu JSON phục vụ toàn hệ thống
const financialData = {
  student: {
    id: "123001456",
    name: "Nguyễn Văn An",
    faculty: "Công nghệ Thông tin",
    gpa: 3.65,
    email: "an.nv@lhu.edu.vn",
    phone: "0912345678",
    dob: "2005-08-15",
    notifyEmail: true
  },
  deadline: "15/12/2026",
  scholarships: [
    {
      id: "HB01",
      name: "Học bổng Khuyến khích học tập (Loại Xuất sắc)",
      minGpa: 3.6,
      discountPercent: 50,
      description: "Dành cho sinh viên có GPA từ 3.60 trở lên."
    },
    {
      id: "HB02",
      name: "Học bổng Khuyến khích học tập (Loại Giỏi)",
      minGpa: 3.2,
      discountPercent: 25,
      description: "Dành cho sinh viên có GPA từ 3.20 đến 3.59."
    },
    {
      id: "HB03",
      name: "Học bổng Tân sinh viên / Chuyên cần",
      minGpa: 2.5,
      discountPercent: 10,
      description: "Dành cho sinh viên đạt chuẩn rèn luyện và GPA >= 2.50."
    }
  ],
  courses: [
    { code: "IT001", name: "Thiết kế Web & Ứng dụng AI", credits: 3, fee: 2400000, status: "unpaid", semester: "HK1 2026-2027" },
    { code: "IT002", name: "Cấu trúc dữ liệu và Giải thuật", credits: 4, fee: 3200000, status: "unpaid", semester: "HK1 2026-2027" },
    { code: "IT003", name: "Cơ sở dữ liệu nâng cao", credits: 3, fee: 2400000, status: "unpaid", semester: "HK1 2026-2027" },
    { code: "EN001", name: "Tiếng Anh chuyên ngành CNTT", credits: 2, fee: 1600000, status: "paid", semester: "HK1 2026-2027" },
    { code: "PE002", name: "Giáo dục thể chất 2", credits: 1, fee: 800000, status: "paid", semester: "HK2 2025-2026" }
  ]
};

// Hàm định dạng tiền tệ VNĐ
function formatCurrency(amount) {
  return amount.toLocaleString('vi-VN') + ' đ';
}