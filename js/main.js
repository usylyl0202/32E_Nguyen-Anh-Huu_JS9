document.querySelector('#btnThemNV').onclick = function () {
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
    // console.log(nv);
    //tạo thẻ tr
    var trNhanVien = document.createElement('tr');
    //DOM đến thẻ tbody trên giao diện, nhúng thẻ tr vào
    document.querySelector('#tableDanhSach').appendChild(trNhanVien);
    //tạo các thẻ td
    var tdTaiKhoang = document.createElement('td');
    tdTaiKhoang.innerHTML = nv.taiKhoang;
    var tdHoTen = document.createElement('td');
    tdHoTen.innerHTML = nv.hoTen;
    var tdEmail = document.createElement('td');
    tdEmail.innerHTML = nv.email;
    var tdNgayLam = document.createElement('td');
    tdNgayLam.innerHTML = nv.ngayLam;
    var tdChucVu = document.createElement('td');
    tdChucVu.innerHTML = nv.chucVu;
    var tdTongLuong = document.createElement('td');
    tdTongLuong.innerHTML = nv.tinhLuong() + 'vnđ';
    var tdXepLoai = document.createElement('td');
    tdXepLoai.innerHTML = nv.xepLoaiNhanVien();
    //Td chức năng
    var tdChucNang = document.createElement('td');

    var btnXoa = document.createElement('button');
    btnXoa.innerHTML = 'Xoá';
    btnXoa.className = 'btn btn-danger';
    btnXoa.onclick = function () {
        var trSV = btnXoa.closest('tr');
        trSV.remove();
    }

    tdChucNang.append(btnXoa);
    //nhúng các thẻ td vào thẻ tr
    trNhanVien.appendChild(tdTaiKhoang);
    trNhanVien.appendChild(tdHoTen);
    trNhanVien.appendChild(tdEmail);
    trNhanVien.appendChild(tdNgayLam);
    trNhanVien.appendChild(tdChucVu);
    trNhanVien.appendChild(tdTongLuong);
    trNhanVien.appendChild(tdXepLoai);
    trNhanVien.appendChild(tdChucNang);
}