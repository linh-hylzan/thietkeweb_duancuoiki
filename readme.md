# LHU FINANCIAL HUB — HỆ THỐNG TRA CỨU HỌC PHÍ & HỌC BỔNG

Website hỗ trợ sinh viên Đại học Lạc Hồng (LHU) theo dõi tổng quan tài chính, tra cứu điều kiện học bổng theo GPA, tính toán công nợ môn học và quản lý thông tin hồ sơ cá nhân.

## 1. Thông tin đồ án
- **Môn học / Học phần:** Đồ án thực hành / Lập trình Web & Ứng dụng AI
- **Trường:** Đại học Lạc Hồng (LHU)
- **Phân hệ thực hiện:** 2.1.5 — Tra cứu Học phí & Học bổng (Financial Hub)
- **Công nghệ sử dụng:** HTML5, CSS3 (Grid, Flexbox, Responsive), JavaScript (ES6+, DOM, `localStorage`, Regex), dữ liệu JSON mẫu.

## 2. Cấu trúc thư mục dự án

```text
LHU-Financial-Hub/
├── index.html          # Trang chủ (Dashboard)
├── financial.html      # Trang Tra cứu Học phí & Học bổng
├── profile.html        # Trang Quản lý Hồ sơ & Cài đặt
├── css/
│   └── style.css       # File CSS chung (Grid/Flexbox, Responsive)
├── js/
│   ├── data.js         # Dữ liệu giả lập (JSON chứa danh sách môn học, học bổng, lịch sử)
│   ├── dashboard.js    # Logic đổ dữ liệu ra trang chủ
│   ├── financial.js    # Logic tính tiền, checkbox change, lọc & tìm kiếm
│   └── profile.js      # Logic kiểm tra Regex và lưu thông tin
└── README.md           # Mô tả dự án và thành viên nhóm
