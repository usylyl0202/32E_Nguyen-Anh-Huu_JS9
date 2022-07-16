/**
 * Hàm nhận vào 2 tham số và trả về kết quả true hoặc false. True khi hợp lệ và false khi không hợp lệ.
 * @param {*} value Gía trị đầu vào
 * @param {*} selectorError Nơi in ra lỗi
 * @param {*} name là text hiển thị ra tên trường bị lỗi
 * @returns 
 */

function kiemTraRong(value, selectorError, name) {
    //.trim(): Loại bỏ khoảng trống đầu và cuối của chuỗi
    //     abc    => abc
    if (value.trim() !== '') {
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    document.querySelector(selectorError).innerHTML = name + ' không được bỏ trống!';
    return false;
}

function kiemTraTatCaKyTu(value, selectorError, name) {
    var regexLetter = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/;
    if (regexLetter.test(value)) {
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    document.querySelector(selectorError).innerHTML = name + ' tất cả là chữ !';
    return false;
}
//search google : regex ... javascript

function kiemTraTatCaSo(value, selectorError, name) {
    var regexNumber = /^[0-9]+$/;
    if (regexNumber.test(value)) {
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    document.querySelector(selectorError).innerHTML = name + ' phải là số !';
    return false;
}

function kiemTraEmail(value, selectorError, name) {
    var regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\ [[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regexEmail.test(value)) {
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    document.querySelector(selectorError).innerHTML = name + ' không đúng định dạng !';
    return false;
}

function kiemTraDate(value, selectorError, name) {
    var regexDate = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
    if (regexDate.test(value)) {
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    document.querySelector(selectorError).innerHTML = name + ' không đúng định dạng ngày !';
    return false;
}

function kiemTraDoDai(value, selectorError, name, minLength, maxLength) {
    var lengthValue = value.length;
    if (lengthValue > maxLength || lengthValue < minLength) {
        document.querySelector(selectorError).innerHTML = name + ' từ ' + minLength + ' đến ' + maxLength + ' ký tự';
        return false;
    }
    document.querySelector(selectorError).innerHTML = '';
    return true;
}

function kiemTraGiaTri(value, selectorError, name, minValue, maxValue) {
    value = Number(value);
    if (value > maxValue || value < minValue) {
        document.querySelector(selectorError).innerHTML = name + ' từ ' + minValue + ' đến ' + maxValue;
        return false;
    }
    document.querySelector(selectorError).innerHTML = '';
    return true;
}

function kiemTraMatKhau(value, selectorError, name) {
    var regexPass = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/

    if (regexPass.test(value)) {
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    document.querySelector(selectorError).innerHTML = name + ' Tối thiểu 6 và tối đa 10 ký tự, ít nhất một chữ cái viết hoa, một số và một ký tự đặc biệt';
    return false;
}

function kiemTraChucVu(idTagSelect, selectorError, name) {
    var cv = document.querySelector(idTagSelect).value;

    if (cv === 'Chọn chức vụ') {
        document.querySelector(selectorError).innerHTML = name + ' phải chọn chức vụ hợp lệ';
        return false;
    }
    document.querySelector(selectorError).innerHTML = '';
    return true;
}

function kiemTraTaiKhoang(idInput,selectorError, name) {
    var mystring = document.querySelector(idInput).value
    var arrayStrig = mystring.split("");
    var kyTuSo = 0;
    for (index = 0; index < arrayStrig.length; index++) {
        var kyTu = arrayStrig[index];
        if (isNaN(kyTu)) {
            // console.log("not Num");
        } else {
            // console.log("is Num");
            kyTuSo++
        }
    }
    if (kyTuSo >= 4 & kyTuSo <= 6) {
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    document.querySelector(selectorError).innerHTML = name + ' tối đa 4-6 ký tự số';
    return false;
}



