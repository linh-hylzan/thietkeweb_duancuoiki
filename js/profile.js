/**
 * profile.js
 * Xử lý kiểm tra dữ liệu đầu vào bằng Regex (Email, SĐT Việt Nam, MSSV, GPA)
 * và cập nhật hiển thị thẻ hồ sơ + lưu vào localStorage.
 */

// Dữ liệu mặc định của sinh viên
const defaultStudentProfile = {
    fullName: "Nguyễn Minh Anh",
    mssv: "122001458",
    major: "Khoa Công nghệ Thông tin",
    email: "minhanh.122001458@lhu.edu.vn",
    phone: "0908123456",
    dob: "2004-08-15",
    gpa: 3.65,
    includeInsurance: true
};

// Biểu thức chính quy (Regex) kiểm tra định dạng
const REGEX_PATTERNS = {
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    phoneVN: /^(0[3|5|7|8|9])+([0-9]{8})$/,
    mssv: /^\d{9}$/
};

// Hàm hiển thị hoặc ẩn thông báo lỗi cho từng trường input
function setFieldError(inputEl, errorEl, isValid) {
    if (!inputEl || !errorEl) return;
    if (!isValid) {
        errorEl.classList.remove('hidden');
        inputEl.classList.add('border-rose-500', 'focus:ring-rose-500');
        inputEl.classList.remove('border-slate-200', 'focus:ring-blue-500');
    } else {
        errorEl.classList.add('hidden');
        inputEl.classList.remove('border-rose-500', 'focus:ring-rose-500');
        inputEl.classList.add('border-slate-200', 'focus:ring-blue-500');
    }
}

// Hàm kiểm tra toàn bộ Form bằng Regex
function validateProfileForm() {
    let isFormValid = true;

    const nameInput = document.getElementById('input-fullname');
    const mssvInput = document.getElementById('input-mssv');
    const emailInput = document.getElementById('input-email');
    const phoneInput = document.getElementById('input-phone');
    const gpaInput = document.getElementById('input-gpa');

    // 1. Kiểm tra Họ tên (>= 3 ký tự)
    const isNameValid = nameInput.value.trim().length >= 3;
    setFieldError(nameInput, document.getElementById('err-fullname'), isNameValid);
    if (!isNameValid) isFormValid = false;

    // 2. Kiểm tra MSSV (đúng 9 chữ số)
    const isMssvValid = REGEX_PATTERNS.mssv.test(mssvInput.value.trim());
    setFieldError(mssvInput, document.getElementById('err-mssv'), isMssvValid);
    if (!isMssvValid) isFormValid = false;

    // 3. Kiểm tra Email bằng Regex
    const isEmailValid = REGEX_PATTERNS.email.test(emailInput.value.trim());
    setFieldError(emailInput, document.getElementById('err-email'), isEmailValid);
    if (!isEmailValid) isFormValid = false;

    // 4. Kiểm tra Số điện thoại Việt Nam bằng Regex
    const isPhoneValid = REGEX_PATTERNS.phoneVN.test(phoneInput.value.trim());
    setFieldError(phoneInput, document.getElementById('err-phone'), isPhoneValid);
    if (!isPhoneValid) isFormValid = false;

    // 5. Kiểm tra điểm GPA (0.00 -> 4.00)
    const gpaVal = parseFloat(gpaInput.value);
    const isGpaValid = !isNaN(gpaVal) && gpaVal >= 0 && gpaVal <= 4.0;
    setFieldError(gpaInput, document.getElementById('err-gpa'), isGpaValid);
    if (!isGpaValid) isFormValid = false;

    return isFormValid;
}

// Hàm cập nhật giao diện thẻ Hồ sơ bên trái
function renderProfileCard(profileData) {
    document.getElementById('display-profile-name').textContent = profileData.fullName;
    document.getElementById('display-profile-mssv').textContent = `MSSV: ${profileData.mssv}`;
    document.getElementById('display-profile-email').textContent = profileData.email;
    document.getElementById('display-profile-phone').textContent = profileData.phone;
    document.getElementById('display-profile-gpa').textContent = `${Number(profileData.gpa).toFixed(2)} / 4.00`;

    // Định dạng ngày sinh YYYY-MM-DD sang DD/MM/YYYY
    if (profileData.dob) {
        const [year, month, day] = profileData.dob.split('-');
        document.getElementById('display-profile-dob').textContent = `${day}/${month}/${year}`;
    }

    // Tạo Avatar chữ cái đầu (VD: Nguyễn Minh Anh -> MA)
    const nameParts = profileData.fullName.trim().split(' ');
    const initials = nameParts.length >= 2
        ? (nameParts[nameParts.length - 2][0] + nameParts[nameParts.length - 1][0]).toUpperCase()
        : profileData.fullName.substring(0, 2).toUpperCase();
    document.getElementById('profile-avatar-initials').textContent = initials;
}

// Đổ dữ liệu vào các ô Input của Form
function populateFormFields(profileData) {
    document.getElementById('input-fullname').value = profileData.fullName;
    document.getElementById('input-mssv').value = profileData.mssv;
    document.getElementById('input-email').value = profileData.email;
    document.getElementById('input-phone').value = profileData.phone;
    document.getElementById('input-dob').value = profileData.dob;
    document.getElementById('input-gpa').value = profileData.gpa;
    document.getElementById('setting-bhyt').checked = profileData.includeInsurance;
}

// Khởi chạy khi tải trang
document.addEventListener('DOMContentLoaded', () => {
    const profileForm = document.getElementById('profile-form');
    const resetBtn = document.getElementById('btn-reset-profile');
    const saveAlert = document.getElementById('profile-save-alert');

    // Tải dữ liệu từ localStorage nếu có, ngược lại dùng dữ liệu mặc định
    const savedData = localStorage.getItem('lhu_student_profile');
    let currentProfile = savedData ? JSON.parse(savedData) : { ...defaultStudentProfile };

    populateFormFields(currentProfile);
    renderProfileCard(currentProfile);

    // Kiểm tra Regex ngay khi người dùng gõ (Real-time validation)
    ['input-fullname', 'input-mssv', 'input-email', 'input-phone', 'input-gpa'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', validateProfileForm);
        }
    });

    // Xử lý sự kiện Submit Form ("Lưu thay đổi")
    if (profileForm) {
        profileForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Dừng lại nếu dữ liệu không vượt qua kiểm tra Regex
            if (!validateProfileForm()) {
                saveAlert.classList.add('hidden');
                return;
            }

            // Thu thập dữ liệu mới
            currentProfile = {
                ...currentProfile,
                fullName: document.getElementById('input-fullname').value.trim(),
                mssv: document.getElementById('input-mssv').value.trim(),
                email: document.getElementById('input-email').value.trim(),
                phone: document.getElementById('input-phone').value.trim(),
                dob: document.getElementById('input-dob').value,
                gpa: parseFloat(document.getElementById('input-gpa').value),
                includeInsurance: document.getElementById('setting-bhyt').checked
            };

            // Lưu vào localStorage để đồng bộ với trang Dashboard và trang Học phí
            localStorage.setItem('lhu_student_profile', JSON.stringify(currentProfile));

            // Cập nhật thẻ hiển thị ngay lập tức
            renderProfileCard(currentProfile);

            // Hiển thị thông báo thành công trong 3.5 giây
            saveAlert.classList.remove('hidden');
            setTimeout(() => {
                saveAlert.classList.add('hidden');
            }, 3500);
        });
    }

    // Xử lý nút Khôi phục mặc định
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            currentProfile = { ...defaultStudentProfile };
            localStorage.setItem('lhu_student_profile', JSON.stringify(currentProfile));
            populateFormFields(currentProfile);
            renderProfileCard(currentProfile);
            validateProfileForm();
        });
    }
});
