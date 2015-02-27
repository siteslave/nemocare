App.filter('toThaiDate', function () {

    return function (t) {
        if (!t || !moment(t).isValid()) {
            return '-';
        } else {
            var year = moment(t).get('year'),
                month = moment(t).get('month') + 1,
                day = moment(t).get('date'),

                newYear = year + 543,
                thaiYear = [day, month, newYear].join('/');

            return thaiYear;
        }
    };

});

App.filter('sexName', function () {

    return function (sex) {
      return sex == '1' ? 'ชาย' : sex == '2' ? 'หญิง' : 'ไม่ทราบ';
    };

});