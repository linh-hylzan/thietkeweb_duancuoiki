// Dữ liệu mặc định ban đầu
const DEFAULT_DATA = {
  student: {
    name: "Nguyễn Minh Anh",
    id: "122001458",
    faculty: "Khoa Công nghệ Thông tin",
    email: "minhanh.122001458@lhu.edu.vn",
    phone: "0908123456",
    dob: "2004-08-15",
    gpa: 3.65,
    autoBHYT: true
  },
  scholarships: [
    { id: 1, name: "Học bổng Xuất sắc (Loại 1)", minGpa: 3.6, discount: 0.50, desc: "Giảm 50% học phí học kỳ (GPA từ 3.60 trở lên)" },
    { id: 2, name: "Học bổng Giỏi (Loại 2)", minGpa: 3.2, discount: 0.30, desc: "Giảm 30% học phí học kỳ (GPA từ 3.20 - 3.59)" },
    { id: 3, name: "Học bổng Khuyến khích (Loại 3)", minGpa: 2.8, discount: 0.15, desc: "Giảm 15% học phí học kỳ (GPA từ 2.80 - 3.19)" }
  ],
  subjects: [
    { code: "IT001", name: "Thiết kế Web nâng cao", credits: 3, semester: "HK1 2026-2027", feePerCredit: 650000, status: "Chưa đóng", selected: true },
    { code: "IT002", name: "Cơ sở dữ liệu phân tán", credits: 3, semester: "HK1 2026-2027", feePerCredit: 650000, status: "Chưa đóng", selected: true },
    { code: "IT003", name: "Lập trình hướng đối tượng", credits: 4, semester: "HK1 2026-2027", feePerCredit: 650000, status: "Đã đóng", selected: false },
    { code: "IT004", name: "Mạng máy tính căn bản", credits: 3, semester: "HK1 2026-2027", feePerCredit: 650000, status: "Chưa đóng", selected: false },
    { code: "EN002", name: "Tiếng Anh chuyên ngành CNTT", credits: 2, semester: "HK1 2026-2027", feePerCredit: 550000, status: "Chưa đóng", selected: true }
  ]
};

// Hàm lấy dữ liệu từ localStorage (nếu chưa có thì dùng mặc định)
function getAppData() {
  const saved = localStorage.getItem("lhu_financial_data");
  if (saved) {
    return JSON.parse(saved);
  }
  localStorage.setItem("lhu_financial_data", JSON.stringify(DEFAULT_DATA));
  return JSON.parse(JSON.stringify(DEFAULT_DATA));
}

// Hàm lưu dữ liệu vào localStorage
function saveAppData(data) {
  localStorage.setItem("lhu_financial_data", JSON.stringify(data));
}

// Hàm định dạng tiền tệ VNĐ
function formatCurrency(amount) {
  return new Intl.NumberFormat('vi-VN').format(Math.round(amount)) + ' đ';
}
