/**
 * financial.js
 * Xử lý tính toán học phí, xét duyệt học bổng theo GPA,
 * sự kiện change trên checkbox môn học, lọc theo khoa & tìm kiếm.
 */

// 1. Dữ liệu giả lập (JSON Database)
const financialData = {
    student: {
        name: "Nguyễn Minh Anh",
        mssv: "122001458",
        gpa: 3.65
    },
    settings: {
        creditPrice: 750000,   // 750.000 VNĐ / tín chỉ
        insuranceFee: 680000,  // 680.000 VNĐ BHYT
        includeInsurance: true
    },
    courses: [
        { id: "111101", name: "Thiết kế Web (HTML5, CSS3, JS)", credits: 3, faculty: "CNTT", selected: true },
        { id: "111105", name: "Cấu trúc dữ liệu & Giải thuật", credits: 4, faculty: "CNTT", selected: true },
        { id: "111109", name: "Cơ sở dữ liệu nâng cao", credits: 3, faculty: "CNTT", selected: true },
        { id: "111112", name: "Trí tuệ nhân tạo ứng dụng", credits: 3, faculty: "CNTT", selected: true },
        { id: "210004", name: "Tiếng Anh chuyên ngành 2", credits: 3, faculty: "Ngoại ngữ", selected: true },
        { id: "310008", name: "Quản trị dự án khởi nghiệp", credits: 2, faculty: "Kinh tế", selected: false },
        { id: "111118", name: "Lập trình thiết bị di động", credits: 3, faculty: "CNTT", selected: false },
        { id: "410002", name: "Kỹ năng giao tiếp & Làm việc nhóm", credits: 2, faculty: "Kỹ năng", selected: false }
    ]
};

// Hàm định dạng tiền tệ VNĐ
function formatVND(amount) {
    return new Intl.NumberFormat('vi-VN').format(Math.round(amount)) + ' đ';
}

// 2. Xác định mức học bổng dựa trên điểm GPA
function getScholarshipInfo(gpa) {
    if (gpa >= 3.80) {
        return { percent: 100, tierName: "Học bổng Xuất Sắc (100%)" };
    } else if (gpa >= 3.50) {
        return { percent: 50, tierName: "Học bổng Giỏi (50%)" };
    } else if (gpa >= 3.20) {
        return { percent: 30, tierName: "Học bổng Khuyến Khích (30%)" };
    }
    return { percent: 0, tierName: "Chưa đạt điều kiện học bổng" };
}

// 3. Tính toán tổng hợp học phí và số tiền còn nợ sau học bổng
function calculateTuition() {
    const selectedCourses = financialData.courses.filter(course => course.selected);
    const totalCredits = selectedCourses.reduce((sum, course) => sum + course.credits, 0);
    
    const rawTuition = totalCredits * financialData.settings.creditPrice;
    const insurance = financialData.settings.includeInsurance ? financialData.settings.insuranceFee : 0;

    // Tính mức giảm học bổng (chỉ áp dụng trên học phí tín chỉ, không giảm BHYT)
    const scholarship = getScholarshipInfo(financialData.student.gpa);
    const discountAmount = rawTuition * (scholarship.percent / 100);
    const netPayable = (rawTuition - discountAmount) + insurance;

    return {
        selectedCount: selectedCourses.length,
        totalCredits,
        rawTuition,
        insurance,
        scholarshipPercent: scholarship.percent,
        scholarshipName: scholarship.tierName,
        discountAmount,
        netPayable
    };
}

// 4. Cập nhật giao diện bảng tính & thẻ học bổng
function updateFinancialSummaryUI() {
    const calc = calculateTuition();

    // Cập nhật các thẻ hiển thị số liệu (nếu phần tử tồn tại trên DOM)
    const setVal = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    };

    setVal('calc-total-credits', `${calc.totalCredits} TC (${calc.selectedCount} môn)`);
    setVal('calc-raw-tuition', formatVND(calc.rawTuition));
    setVal('calc-insurance-fee', formatVND(calc.insurance));
    setVal('calc-scholarship-rate', `-${calc.scholarshipPercent}% (${calc.scholarshipName})`);
    setVal('calc-discount-amount', `-${formatVND(calc.discountAmount)}`);
    setVal('calc-net-payable', formatVND(calc.netPayable));

    // Highlight thẻ học bổng tương ứng (30%, 50%, 100%)
    [30, 50, 100].forEach(rate => {
        const card = document.getElementById(`scholarship-card-${rate}`);
        if (!card) return;
        if (calc.scholarshipPercent === rate) {
            card.classList.add('border-blue-600', 'bg-blue-50/40', 'ring-2', 'ring-blue-500/20');
        } else {
            card.classList.remove('border-blue-600', 'bg-blue-50/40', 'ring-2', 'ring-blue-500/20');
        }
    });
}

// 5. Render danh sách môn học kèm bộ lọc & tìm kiếm
function renderCourseTable() {
    const tbody = document.getElementById('courses-table-body');
    if (!tbody) return;

    const searchInput = document.getElementById('course-search-input');
    const facultySelect = document.getElementById('course-faculty-filter');

    const keyword = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const facultyFilter = facultySelect ? facultySelect.value : 'ALL';

    // Lọc danh sách môn học
    const filteredCourses = financialData.courses.filter(course => {
        const matchKeyword = course.name.toLowerCase().includes(keyword) || course.id.includes(keyword);
        const matchFaculty = facultyFilter === 'ALL' || course.faculty === facultyFilter;
        return matchKeyword && matchFaculty;
    });

    if (filteredCourses.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" class="px-4 py-8 text-center text-slate-400">
                    Không tìm thấy học phần nào phù hợp với điều kiện lọc.
                </td>
            </tr>`;
        return;
    }

    tbody.innerHTML = filteredCourses.map(course => {
        const fee = course.credits * financialData.settings.creditPrice;
        return `
            <tr class="hover:bg-slate-50 transition ${course.selected ? 'bg-blue-50/30' : ''}">
                <td class="px-4 py-3.5 text-center">
                    <input type="checkbox" 
                           data-course-id="${course.id}" 
                           ${course.selected ? 'checked' : ''} 
                           class="course-checkbox w-4 h-4 accent-blue-900 rounded cursor-pointer">
                </td>
                <td class="px-4 py-3.5 font-mono text-xs font-semibold text-slate-600">${course.id}</td>
                <td class="px-4 py-3.5">
                    <p class="font-semibold text-slate-800">${course.name}</p>
                    <span class="text-xs text-slate-500">${course.faculty}</span>
                </td>
                <td class="px-4 py-3.5 text-center font-semibold text-slate-700">${course.credits}</td>
                <td class="px-4 py-3.5 text-right font-semibold text-slate-900">${formatVND(fee)}</td>
            </tr>
        `;
    }).join('');

    // Gắn sự kiện 'change' trực tiếp lên từng checkbox môn học
    document.querySelectorAll('.course-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', function (e) {
            const courseId = e.target.getAttribute('data-course-id');
            const targetCourse = financialData.courses.find(c => c.id === courseId);
            if (targetCourse) {
                targetCourse.selected = e.target.checked;
                renderCourseTable();         // Cập nhật lại màu nền hàng
                updateFinancialSummaryUI();  // Cập nhật ngay tổng học phí & nợ còn lại
            }
        });
    });
}

// 6. Khởi tạo các sự kiện khi trang tải xong
document.addEventListener('DOMContentLoaded', () => {
    // Đọc GPA hoặc cài đặt BHYT từ localStorage nếu sinh viên đã chỉnh sửa ở trang Profile
    const savedProfile = localStorage.getItem('lhu_student_profile');
    if (savedProfile) {
        const parsed = JSON.parse(savedProfile);
        financialData.student.gpa = parseFloat(parsed.gpa) || financialData.student.gpa;
        financialData.settings.includeInsurance = Boolean(parsed.includeInsurance);
    }

    // Lắng nghe sự kiện tìm kiếm & lọc khoa
    const searchInput = document.getElementById('course-search-input');
    const facultySelect = document.getElementById('course-faculty-filter');

    if (searchInput) searchInput.addEventListener('input', renderCourseTable);
    if (facultySelect) facultySelect.addEventListener('change', renderCourseTable);

    // Lắng nghe sự kiện checkbox "Chọn tất cả" trên tiêu đề bảng
    const selectAllCheckbox = document.getElementById('select-all-courses');
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', function (e) {
            const isChecked = e.target.checked;
            financialData.courses.forEach(c => c.selected = isChecked);
            renderCourseTable();
            updateFinancialSummaryUI();
        });
    }

    // Khởi chạy lần đầu
    renderCourseTable();
    updateFinancialSummaryUI();
});