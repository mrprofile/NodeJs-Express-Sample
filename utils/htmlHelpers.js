var vash = require('vash');
var moment = require('moment');
//TODO: move this to its own file
vash.helpers.RenderResizeImageUrl = function (imageUrl, width, height, useProd) {
    var urlPattern = /^(https?:\/\/[^\/]+)?\/images\//i;
    var urlPattern2 = /^(https?:\/\/[^\/]+)?\//i;
    var baseUrl = "http://tv.esquire.com/images/";    
    var slug = imageUrl.replace(urlPattern, "");
    slug = slug.replace(urlPattern2, "");

    var resizedImageUrl = baseUrl + "cimg_" + width + "x" + height + "/" + slug;

    if(useProd){

    } 

    this.buffer.push('<img class="lazy" src="http://tv.esquire.com/images/static/global/blank.gif" data-original="'+ resizedImageUrl +'" />');


};

vash.helpers.RenderTuneIn = function (tuneIn, size) {
    var pattern = /\[(time|badge|text)([^\]]+)\]/g;    
    var strTuneIn = '';   
    var matches = pattern.exec(tuneIn);// = tuneIn.match(pattern);   

    while(matches != null) {        
        switch(matches[1]){
            case "time":
                strTuneIn += '<div class="time-tag">';
                strTuneIn += '<span class="time pacific ' + size + '">' + matches[2].trim() + "</span>";
                strTuneIn += '</div>';
            break;
            case "badge":
                strTuneIn += '<div class="show-info-day"><span class="day ';
                strTuneIn += size;
                strTuneIn += '">';
                strTuneIn += matches[2].trim();
                strTuneIn += "</span></div>";
            break;
            case "text":
                strTuneIn += '<div class="show-info-text"><span class="';
                strTuneIn += size;
                strTuneIn += '">';
                strTuneIn += matches[2].trim();
                strTuneIn += "</span></div>";
            break;
        }

        matches = pattern.exec(tuneIn);
    }

    this.buffer.push(strTuneIn);
};

vash.helpers.RenderScheduleTimes = function (timeArray, returnSliderList) {

    var _d = moment();

    var strTimeList = '';
    var strSliderHighlight = '';
    var currHr = _d.hour();
    var currMin = _d.minute();

    timeArray.forEach(function(time) {

       
       var _t = moment(time);
        if(_t.minutes() == 15 || _t.minutes() == 45){
            return;
        }
        if(_t.hours() == currHr && _t.minutes() < currMin){
            strTimeList += '<li class="current"><p>';
        } else {
            strTimeList += '<li><p>';
        }

        strTimeList += _t.format('hh:mm A');
        strTimeList += '</p></li>';
        strSliderHighlight += '<div class="high-div" id="highdiv-'+ _t.format('H_mm') +'"></div>';
    });

    (returnSliderList) ? this.buffer.push(strSliderHighlight) : this.buffer.push(strTimeList);
    
};

vash.helpers.RenderScheduleHtml = function (schedules, timePosition) {

    var i = 0, j = 0, schedulesLength = schedules.Schedules.length, 
    _id = '', _dayLength, _daySlots, _showDate, width, left;
    
//style="width:@((_daySlots[j].Duration / 30 * 207) - 1)px;left: @(timePosition[_showDate] * 207)px;position:absolute;"
    while ( i < schedulesLength - 1) {
        _id = (i == 0) ? "today" : "day" + i;
        _daySlots = schedules.Schedules[i].TimeSlots;
        _dayLength = _daySlots.length;
        j = 0;
        this.buffer.push('<ul id="' + _id + '">');

        while(j < _dayLength) {
            _showDate = moment(_daySlots[j].TimeStart);
            width = (_daySlots[j].Duration / 30 * 207) - 1;
            left = timePosition[_showDate.format("HH:mm")] * 207;
            this.buffer.push('<li id="' + _id + "-" + _showDate.format('H_mm') +'" class="' + _daySlots[j].Show_Key +'" style="position:absolute;width:' + width +'px;left:'+ left +'px;">');
            this.buffer.push('<div class="showRow">');
            if (_daySlots[j].IsPremiere)
            {
                this.buffer.push('<p class="premiere">New</p>');
            }else{
                this.buffer.push('<p class="empty">&nbsp;</p>');
            }
            this.buffer.push('<p class="show_title">' + schedules.Shows.Shows[_daySlots[j].Show_Key] +'</p>');
            this.buffer.push('<p class="ep_title">' + _daySlots[j].Episode_Title + '</p>');
            this.buffer.push('</div>');
            this.buffer.push('</li>');
            j++;
        }

        this.buffer.push('</ul>');
        i++;
    }



    
};