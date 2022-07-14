function NhanVien() {
    this.taiKhoang = '';
    this.hoTen = '';
    this.email = '';
    this.matKhau = '';
    this.ngayLam = '';
    this.luongCoBan = 0;
    this.chucVu = '';
    this.gioLam = 0;
    this.tongLuong = 0;
    this.loaiNhanVien = '';
    this.tinhLuong = function () {
        var tongLuong = 0;
        if(this.chucVu === 'Sếp') {
            tongLuong = Number(this.luongCoBan) * 3;
        } else if(this.chucVu === 'Trưởng phòng') {
            tongLuong = Number(this.luongCoBan) * 2;
        } else if(this.chucVu === 'Nhân viên') {
            tongLuong = Number(this.luongCoBan);
        }
        return tongLuong;
    }
    this.xepLoaiNhanVien = function () {
        var xeploai = '';
        if(this.gioLam >= 192) {
            xeploai = 'xuất sắc';
        } else if(this.gioLam >= 176) {
            xeploai = 'giỏi';
        } else if(this.gioLam >= 160) {
            xeploai = 'khá';
        } else {
            xeploai = 'trung bình'
        }
        return xeploai
    }
}