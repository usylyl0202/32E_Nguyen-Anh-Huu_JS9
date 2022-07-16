
var mangNhanVien = []; // [{},{},{}];
document.querySelector('#btnThemNV').onclick = function () {
    //input: thông tin nhân viên
    //tạo đối tượng
    var nv = new NhanVien();
    //lấy thông tin input từ người dùng
    nv.taiKhoang = document.querySelector('#tknv').value;
    nv.hoTen = document.querySelector('#name').value;
    nv.email = document.querySelector('#email').value;
    nv.matKhau = document.querySelector('#password').value;
    nv.ngayLam = document.querySelector('#datepicker').value;
    nv.luongCoBan = document.querySelector('#luongCB').value;
    nv.chucVu = document.querySelector('#chucvu').value;
    nv.gioLam = document.querySelector('#gioLam').value;

    //validate
    var valid = true;
    //---------- Kiểm Tra Rỗng --------------
    valid &= kiemTraRong(nv.taiKhoang, '#error_required_tknv', 'Tài Khoảng') & kiemTraRong(nv.hoTen, '#error_required_name', 'Họ Tên') & kiemTraRong(nv.email, '#error_required_email', 'Email') & kiemTraRong(nv.matKhau, '#error_required_pass', 'Mật Khẩu') & kiemTraRong(nv.ngayLam, '#error_required_date', 'Ngày Làm') & kiemTraRong(nv.luongCoBan, '#error_required_luongCB', 'Lương cơ bản') & kiemTraRong(nv.gioLam, '#error_required_gioLam', 'Giờ làm');

    //--------- Kiểm tra giá trị ------------
    valid &= kiemTraGiaTri(nv.gioLam, '#error_checkGioLam', 'Giờ làm', 80, 200);

    //kiểm tra chức vụ
    valid &= kiemTraChucVu('#chucvu', '#error_checkCV', 'Chức Vụ');

    // ----------- kiểm tra định dạng ----------- 
    valid &= kiemTraTatCaKyTu(nv.hoTen, '#error_checkName', 'Họ Tên') & kiemTraEmail(nv.email, '#error_checkEmail', 'Email') & kiemTraMatKhau(nv.matKhau, '#error_checkPass1', 'Mật Khẩu')

    valid &= kiemTraTaiKhoang('#tknv', '#error_checkTKNV', 'Tài Khoảng');

    if (!valid) {
        return;
    }
    //Mỗi lần bấm thêm nhân viên sẽ đưa object nhân viên vào mangNhanVien
    mangNhanVien.push(nv);
    //Gọi hàm từ mảng nhân viên tạo ra html cho table
    renderTableNhanVien(mangNhanVien);
    //Gọi hàm lưu mảng sinh viên vào localstrage
    luuLocalStorage();
}

function renderTableNhanVien(arrNhanVien) { // [{maNhanVien:1,...}, {maNhanVien:2,...}, {maNhanVien:3,...},...]
    var html = '';
    for (var index = 0; index < arrNhanVien.length; index++) {
        //Mỗi lần duyệt lấy ra 1 nhân viên
        var nv = arrNhanVien[index];
        //Bổ sung phương thức tính lương cho object nv dựa vào chức vụ người dùng nhập vào
        nv.tinhLuong = function () {
            var tongLuong = 0;
            if (this.chucVu === 'Sếp') {
                tongLuong = Number(this.luongCoBan) * 3;
            } else if (this.chucVu === 'Trưởng phòng') {
                tongLuong = Number(this.luongCoBan) * 2;
            } else if (this.chucVu === 'Nhân viên') {
                tongLuong = Number(this.luongCoBan);
            }
            return tongLuong;
        }
        //Bổ sung phương thức xếp loại cho object nv dựa vào số giờ làm người dùng nhập vào
        nv.xepLoaiNhanVien = function () {
            var xeploai = '';
            if (this.gioLam >= 192) {
                xeploai = 'xuất sắc';
            } else if (this.gioLam >= 176) {
                xeploai = 'giỏi';
            } else if (this.gioLam >= 160) {
                xeploai = 'khá';
            } else {
                xeploai = 'trung bình'
            }
            return xeploai
        }
        //Tạo ra 1 chuỗi html tr và đưa vào output
        html += `
            <tr>
                <td>${nv.taiKhoang}</td>
                <td>${nv.hoTen}</td>
                <td>${nv.email}</td>
                <td>${nv.ngayLam}</td>
                <td>${nv.chucVu}</td>
                <td>${nv.tinhLuong()}</td>
                <td>${nv.xepLoaiNhanVien()}</td>
                <td>
                    <button class="btn btn-danger" onclick="xoaNhanVien('${nv.taiKhoang}')">Xoá</button>
                    <button data-toggle="modal"
                    data-target="#myModal" class="btn btn-success mt-2"  onclick="chinhSua('${nv.taiKhoang}')">Chỉnh sửa</button>
                </td>
            </tr>
        `; //Dưới phím esc `
    }
    document.querySelector('#tableDanhSach').innerHTML = html;
    return html;
}

function xoaNhanVien(taiKhoangClick) {
    var indexDel = mangNhanVien.findIndex(NhanVien => NhanVien.taiKhoang === taiKhoangClick);
    if (indexDel !== -1) {
        mangNhanVien.splice(indexDel, 1);
    }
    //Gọi hàm tạo lại table sau khi xoá
    renderTableNhanVien(mangNhanVien);
    luuLocalStorage();
}

function chinhSua(taiKhoangClick) {
    //tìm ra vị trí củA nhân viên được click trong mảng
    var indexEdit = mangNhanVien.findIndex(nv => nv.taiKhoang === taiKhoangClick);
    //Lấy ra thông tin nhân viên tại vị trí đó
    var nvEdit = mangNhanVien[indexEdit];
    // console.log('nvEdit', nvEdit);

    // //Khoá lại tài khoảng nhân viên
    document.querySelector('#tknv').disabled = true;
    // document.querySelector('#tknv').disabled = true;
    //Gán các giá trị lên giao diện
    document.querySelector('#tknv').value = nvEdit.taiKhoang;
    document.querySelector('#name').value = nvEdit.hoTen;
    document.querySelector('#email').value = nvEdit.email;
    document.querySelector('#password').value = nvEdit.matKhau
    document.querySelector('#datepicker').value = nvEdit.ngayLam;
    document.querySelector('#luongCB').value = nvEdit.luongCoBan;
    document.querySelector('#chucvu').value = nvEdit.chucVu;
    document.querySelector('#gioLam').value = nvEdit.gioLam;
}

document.querySelector('#btnCapNhat').onclick = function () {
    //Lấy dữ liệu người dùng thay đổi trên giao diện
    var nv = new NhanVien();
    //Lấy thông tin input từ người dùng
    nv.taiKhoang = document.querySelector('#tknv').value;
    nv.hoTen = document.querySelector('#name').value;
    nv.email = document.querySelector('#email').value;
    nv.matKhau = document.querySelector('#password').value;
    nv.ngayLam = document.querySelector('#datepicker').value;
    nv.luongCoBan = document.querySelector('#luongCB').value;
    nv.chucVu = document.querySelector('#chucvu').value;
    nv.gioLam = document.querySelector('#gioLam').value;

    //validate
    var valid = true;
    //---------- Kiểm Tra Rỗng --------------
    valid &= kiemTraRong(nv.taiKhoang, '#error_required_tknv', 'Tài Khoảng') & kiemTraRong(nv.hoTen, '#error_required_name', 'Họ Tên') & kiemTraRong(nv.email, '#error_required_email', 'Email') & kiemTraRong(nv.matKhau, '#error_required_pass', 'Mật Khẩu') & kiemTraRong(nv.ngayLam, '#error_required_date', 'Ngày Làm') & kiemTraRong(nv.luongCoBan, '#error_required_luongCB', 'Lương cơ bản') & kiemTraRong(nv.gioLam, '#error_required_gioLam', 'Giờ làm');

    //--------- Kiểm tra giá trị ------------
    valid &= kiemTraGiaTri(nv.gioLam, '#error_checkGioLam', 'Giờ làm', 80, 200);

    //kiểm tra chức vụ
    valid &= kiemTraChucVu('#chucvu', '#error_checkCV', 'Chức Vụ');

    // ----------- kiểm tra định dạng ----------- 
    valid &= kiemTraTatCaKyTu(nv.hoTen, '#error_checkName', 'Họ Tên') & kiemTraEmail(nv.email, '#error_checkEmail', 'Email') & kiemTraMatKhau(nv.matKhau, '#error_checkPass1', 'Mật Khẩu');
    // ------- kiểm tra tài khoảng --------
    valid &= kiemTraTaiKhoang('#tknv', '#error_checkTKNV', 'Tài Khoảng');

    if (!valid) {
        return;
    }

    //Tìm ra thằng trong mảng cần chỉnh sửa
    var indexEdit = mangNhanVien.findIndex(NhanVien => NhanVien.taiKhoang === nv.taiKhoang);
    //Lấy nhân viên trong mảng thay đổi thành thông tin trên giao diện mà người edit
    mangNhanVien[indexEdit].hoTen = nv.hoTen;
    mangNhanVien[indexEdit].email = nv.email;
    mangNhanVien[indexEdit].matKhau = nv.matKhau;
    mangNhanVien[indexEdit].ngayLam = nv.ngayLam;
    mangNhanVien[indexEdit].luongCoBan = nv.luongCoBan;
    mangNhanVien[indexEdit].chucVu = nv.chucVu;
    mangNhanVien[indexEdit].gioLam = nv.gioLam;
    //Tạo lại bảng nhân viên mới sau khi thay đổi
    renderTableNhanVien(mangNhanVien);
    //Mở lại nút mã nhân viên
    document.querySelector('#tknv').disabled = false;
    //Lưu localstorage sau khi sửa
    luuLocalStorage();
}

function luuLocalStorage() {
    //Biến đổi mảng thành => string
    var sMangNhanVien = JSON.stringify(mangNhanVien);
    //Sau đó dùng string lưu vào localstorage
    localStorage.setItem('mangNhanVien', sMangNhanVien);
}


function layLocalStorage() {
    //check xem storage có dữ liệu đó hay không
    if (localStorage.getItem('mangNhanVien')) {
        //Lấy ra
        var sMangNhanVien = localStorage.getItem('mangNhanVien');
        //Lấy mangNhanVien gán = chuỗi được lấy từ localstorage ra (phải dùng hàm JSON.parse để chuyển về mảng lại)
        mangNhanVien = JSON.parse(sMangNhanVien);
        //tạo ra table nhân viên từ mảng
        renderTableNhanVien(mangNhanVien);
    }
}

//Gọi hàm lấy localstorage khi trang vừa load
window.onload = function () {
    //Browser vừa load lên làm gì thì sẽ code ở đây
    layLocalStorage();
    // renderTableNhanVien(mangNhanVien);
    // alert('in ra dữ liệu cũ');
}

document.querySelector('#btnThem').onclick = function () {
    document.querySelector('#tknv').disabled = false;

}

function searchName(val) {
    var newvalue = val;
    if (newvalue === 'xuất sắc') {
        hienThiNhanVien(mangNhanVien, newvalue);
    } else if (newvalue === 'giỏi') {
        hienThiNhanVien(mangNhanVien, newvalue);
    } else if (newvalue === 'khá') {
        hienThiNhanVien(mangNhanVien, newvalue);
    } else if (newvalue === 'trung bình') {
        hienThiNhanVien(mangNhanVien, newvalue);
    } else {
        renderTableNhanVien(mangNhanVien);
    }
}
function hienThiNhanVien(arrNhanVien, valOfSearch) {
    var newNhanVien = [];
    var newArr = arrNhanVien;
    var valOfSearch = document.querySelector('#searchName').value;
    for (var index = 0; index < newArr.length; index++) {
        var object = arrNhanVien[index];
        var xepLoai = object.xepLoaiNhanVien();
        if (xepLoai === valOfSearch) {
            newNhanVien.push(newArr[index])
        }
    }
    renderTableNhanVien(newNhanVien);
}