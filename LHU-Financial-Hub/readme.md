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
├── index.html          # Trang 1: Tổng quan tài chính (Dashboard)
├── README.md           # Tài liệu hướng dẫn dự án
├── css/
│   └── style.css       # Giao diện chung, bố cục Grid/Flexbox và Responsive
├── js/
│   └── app.js          # Dữ liệu JSON mẫu và toàn bộ logic xử lý 3 trang
└── pages/
    ├── financial.html  # Trang 2: Xét học bổng, lọc/tìm kiếm và tính học phí
    └── profile.html    # Trang 3: Quản lý hồ sơ sinh viên và kiểm tra Regex