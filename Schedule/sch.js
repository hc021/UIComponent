$(document).ready(function () {


    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];


    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth();//max =11

    function calenderFunc(year, month) {
        let dayOfTheWeekFirstOfTheMonth = new Date(currentYear, currentMonth, 1).getDay();
        let dateOfTheMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        $('.years').text(currentYear + " " + monthNames[currentMonth]);
        //insert Date
        for (let index = 0; index < dateOfTheMonth; index++) {
            $('.days').append('<div class="number" id=' + (index + 1) + '>' + (index + 1) + '</div>');
        }
        //insert space blocks before
        for (let index = 0; index < dayOfTheWeekFirstOfTheMonth; index++) {
            $('<div class="space"></div>').insertAfter($('#lastDay'));
        }

    }
    calenderFunc(currentYear, currentMonth);

    $('.next').click(function (e) {
        if (currentMonth == 11) {
            currentMonth = -1;
            currentYear++;
        }
        currentMonth++;
        $('.number, .space').each(function (index, element) {
            $(this).remove()
        });
        calenderFunc(currentYear, currentMonth)
    });

    $('.before').click(function (e) {
        if (currentMonth == 0) {
            currentMonth = 12;
            currentYear--;
        }
        currentMonth--;
        $('.number, .space').each(function (index, element) {
            $(this).remove()
        });
        calenderFunc(currentYear, currentMonth)
    });
    $('#bookingTime').click(function (e) {
        $('.schedule').show();

    });


    var fullDate = '';
    var time='00:00:00';
    $('.days').on('click', '.number', function () {
        $('.number').each(function (index, element) {
            $(this).css({'background': '#fff','color':'black'});          
        });
        $(this).css({'background':'#1572b6', 'color':'#fff'});
        
         
        var date = $(this).attr('id');
        if (date < 10) {
            date = 0 + date;
        }
        var month = currentMonth + 1;
        if (month < 10) {
            month = "" + 0 + month;
        }
        fullDate = currentYear+'-'+ month +'-'+ date;

         $('#showHere').val(fullDate+'T'+time);
        $('.timePicker').show();
    });

    $('#picker').change(function (e) {
        var selectedOption = $('#picker option:selected').val();
        if (selectedOption=='') {
            time='';
        }else{
             time=selectedOption+':00';
        }
       
        $('#showHere').val(fullDate+'T'+time);
    });



    for (let index = 9; index < 21; index++) {
        if (index == 20) {
            $('#picker').append('<option>' + index + ':' + '00' + '</option>');
        }
        else {
            $('#picker').append('<option>' + index + ':' + '00' + '</option>');
            $('#picker').append('<option>' + index + ':' + '15' + '</option>');
            $('#picker').append('<option>' + index + ':' + '30' + '</option>');
        }
    }

    $('#picker').focusout(function (e) { 
        
        $('.timePicker').hide();
    });

    $('#test').click(function (e) {
       var result=  $('#showHere').val();
       var re = new Date(fullDate+'T'+time);
        $.ajax({
            type: "post",
            url: "https://localhost:44304/Employee/CheckUserNameAjax",
            data: { userName: result },
            dataType: "json",
            success: function (response) {
                alert('good');
                
            }
        });

    });

});