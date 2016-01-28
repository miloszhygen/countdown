/*global $ */
'use strict';

if(localStorage.getItem('header_text')) {
  $('#header_text').val(localStorage.getItem('header_text'));
}
if(localStorage.getItem('body_text')) {
  $('#body_text').val(localStorage.getItem('body_text'));
}
if(localStorage.getItem('time')) {
  if (localStorage.getItem('time') !== 0) {
    calculateTimeDiff(localStorage.getItem('time'));
  }
}

var interval;

$('#datepicker').hide();
$('#datepicker').datetimepicker({
	// controlType: 'select',
	// oneLine: true,
	timeFormat: 'hh:mm tt',
  minDate: 0,
  onClose: function(){
      if ($('#datepicker').val() !== '') {
          clearInterval(interval);
          $('#datepicker').hide();
          calculateTimeDiff( ($('#datepicker').datetimepicker( 'getDate').getTime()));
      }
  }
});

function showTime(sec) {
    var timeReminding = sec;
    var dayText = '';
    var hourTxt = '';
    var minTxt = '';
    var secText = '';
    var days = Math.floor( sec / (3600 * 24));

    sec -= (days * 3600 * 24);
    if (days < 10) {
        dayText = '0';
    }

    var hours = Math.floor((sec / (3600)));
    sec -= (hours * 3600);
    if (hours < 10) {
        hourTxt = '0';
    }

    var min = Math.floor((sec / (60)));
    if (min < 10) {
        minTxt = '0';
    }

    sec = Math.floor((sec - (min * 60)));
    if (sec < 10) {
        secText = '0';
    }

    if (timeReminding !== 0) {
      secText = secText + sec;
      minTxt = minTxt + min;
      hourTxt = hourTxt + hours;
      dayText = dayText + days;

      if (days > 100) {
          $('#timerBox').css({'width': '90%'});
          $('.time_box').css({'width': '23.3%'});
          $('.days').css({'width': '30%'});
      }else {
        $('#timerBox').css({'width': '80%'});
        $('.days').css({'width': '25%'});
        $('.time_box').css({'width': '25%'});
      }



      // TODO: Move project to my github files
      // TODO: Clean the HTML and CSS files


      $('#days').text(dayText);
      $('#hours').text(hourTxt);
      $('#min').text(minTxt);
      $('#sec').text(secText);

    }else{
      $('#days').text('00');
      $('#hours').text('00');
      $('#min').text('00');
      $('#sec').text('00');
      console.log('end');
      localStorage.setItem('time', 0);
      clearInterval(interval);
    }
}

function startCounting(sec) {
    interval = setInterval(function() {
      showTime(sec);
      sec--;
		}, 1000);
}

function calculateTimeDiff(date2){
    localStorage.setItem('time', date2);
    var currentTime = new Date();
    var timeDiff = Math.floor(((Math.abs(date2 - currentTime.getTime())) / 1000));
    startCounting(timeDiff);
}

$('#timerBox').on('click', function(){
  $('#datepicker').show();
  $('#datepicker').datetimepicker();
});

$('#header_text').on('keyup change', function(){
  var headerText = $('#header_text').val();
  localStorage.setItem('header_text', headerText);
});

$('#body_text').on('keyup change', function(){
  var headerText = $('#body_text').val();
  localStorage.setItem('body_text', headerText);
});

/*
LOCAL STORAGE CODE
https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API

*/
