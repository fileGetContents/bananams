

    //选择时间
    $.dataPage = function () {
        var nowDate = {};
        if (now == "") {
            nowDate.month = new Date().getMonth();
            nowDate.year = new Date().getFullYear();
        } else {
            nowDate.month = window.parseInt(now.split("-")[1]) - 1;
            nowDate.year = window.parseInt(now.split("-")[0]);
        }
        var nowText = nowDate.year + "-" + (((nowDate.month + 1) < 10) ? ("0" + (nowDate.month + 1)) : (nowDate.month + 1));
        $("#scroller li").each(function () {
            if ($(this).data("date") == nowText) {
                $("#scroller li").removeClass("active");
                $(this).addClass("active");
                return false;
            }
        });
        var myScroll;
        myScroll = new IScroll("#wrapper", {
            scrollX: true,
            scrollY: false,
            preventDefault: false
        });
        $("#wrapper").on('touchmove', function (e) {
            e.preventDefault();
        });
        //加载日历
        $("#calendar").calendarWidget({
            month: nowDate.month,
            year: nowDate.year,
            callback: function () {
                // 绑定出行日期
                $("#calendar").on("click", ".current-day", function () {
                    if ($(this).data("over") == "1") {
                        alert("时间已过期!");
                        return false;
                    }
                    var date = $(this).data("val"); //当前日期 2016-01-03
                    var dateId = $(this).data("id"); //ID
                    $("#batchType").empty()
                    if ($(this).data("diff") != "") {
				
                        $.get(typeUrl, {
                            "pid": pid,
                            "date": date
                        }, function (ajax) {
                            if (ajax.status) {
								
                                var html = '<div class="d-title hover">行程类型</div>';
                                html += '<div class="wrapper batchType">';
                                html += '<ul id="j-batchType">';
                                for (var i = 0; i < ajax.data.length; i++) {
                                    html += '<li class="batchTypeItem" data-bid="' + ajax.data[i].bid + '" data-status="' + ajax.data[i].status + '">';
                                    html += '<span class="item1">' + ajax.data[i].diff_num + '</span>';
                                    html += '<span class="item2">成人 ¥ ' + ajax.data[i].adultprice + '</span>';
                                    html += '<span class="item3"><i></i>' + ajax.data[i].status_label + ' ' + ajax.data[i].diff_desc + '</span>';
                                    html += '</li>';
                                }
                                html += '</ul></div>';
                                $("#batchType").html(html);
                                $("#batchType li").each(function (index, el) {
                                    if ($(this).data("bid") == bid) {
                                        $(this).click();
                                        return false;
                                    }
                                });
                            }
                        }, "json");
                    }				
                    $("#calendar .current-day").removeClass("active");
                    $(this).addClass("active");
                    $("#j-step1").removeClass("hover");
                    $("#j-people").find(".d-numInfo").remove();
                    $("#j-people").append('<div class="d-numInfo">成人价: <span>¥' + $(this).data("adultprice") + '</span></div>');
                    $("#j-children").find(".d-numInfo").remove();
                    $("#j-children").append('<div class="d-numInfo">儿童价: <span>¥' + $(this).data("childprice") + '</span></div>');
                    if ($(this).data("childprice") == -1) {
                        $("#j-children").hide();
                    }
                    $("#j-peopleNum").show().find(".current-peopleText").text($(this).data("label"));
                    switch ($(this).data("isfull")) {
                        case 1:
                            $("#j-peopleNum").find(".current-peopleNum").removeClass("full");
                            break;
                        case 2:
                            $("#j-peopleNum").find(".current-peopleNum").removeClass("full");
                            break;
                        case 3:
                            $("#j-peopleNum").find(".current-peopleNum").addClass("full");
                            break;
                    }
                    $("#j-data").val(dateId);
                    $("#j-dateOk").text(date);
                    return false;
                });
                $(".current-day").each(function () {
                    if (now == $(this).data("val")) {
                        $(this).click();
                        return false;
                    }
                });
            }
        });
        $(".j-submit").unbind().click(function () {
            if (!$("#j-data").val()) {
                alert("请先选择时间");
                return false;
            }
            if ($('.j-numF').eq(0).val() == 0 && $('.j-numF').eq(1).val() == 0) {
                alert('请选择出行人数');
                return false;
            }
            if ($("#j-batchType").length > 0) {
                var have_type = false;
                $('#j-batchType').find('li').each(function () {
                    if ($(this).hasClass("hover")) have_type = true;
                })
                if (!have_type) {
                    alert('请先选择类型');
                    return false;
                }
            }
            $(this).parents("form").eq(0).submit();
        });
        $(document).on("touchend", ".batchTypeItem", function () {
            // if ($(this).data('status') != 1) {
            //     alert('名额暂满 ');
            //     return false;
            // }
            $("#j-batchType li").removeClass("hover");
            $(this).addClass("hover");
            $("#j-bid").val($(this).data("bid"));
            $("#j-data").val($(this).data("bid"));
            return false;
        });
        myScroll.scrollToElement(document.querySelector('#scroller li[class="active"]'), 300);
        $("#scroller").find("li").click(function () {
            $("#scroller li").removeClass("active");
            $(this).addClass("active");
            myScroll.scrollToElement(document.querySelector('#scroller li[class="active"]'), 300);
            var obj = {};
            obj.month = window.parseInt($(this).data("date").split("-")[1]) - 1;
            obj.year = $(this).data("date").split("-")[0];
            window.setCalendarWidget($("#calendar"), obj);
        });
    };
    // 内容页
   
   
     
 
        var mDate = {};

        function calendarWidget(el, params) {
            var that = this;
            var now = new Date();
            var thismonth = now.getMonth();
            var thisyear = now.getYear() + 1900;

            var opts = {
                month: thismonth,
                year: thisyear
            };

            $.extend(opts, params);

            var monthNames = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
            var dayNames = ['日', '一', '二', '三', '四', '五', '六'];
            month = i = parseInt(opts.month);
            year = parseInt(opts.year);
            var m = 0;
            var table = '';

            // next month
            if (month == 11) {
                var next_month = '<span class="nextDate nextMonth" data-nextMonth="' + 1 + '" data-nextYear="' + (year + 1) + '"></span>';
            } else {
                var next_month = '<span class="nextDate nextMonth" data-nextMonth="' + (month + 2) + '" data-nextYear="' + (year) + '"></span>';
            }

            // previous month
            if (month == 0) {
                var prev_month = '<span class="nextDate prevMonth" data-nextMonth="' + 12 + '" data-nextYear="' + (year - 1) + '"></span>';
            } else {
                var prev_month = '<span class="nextDate prevMonth" data-nextMonth="' + (month) + '" data-nextYear="' + (year) + '"></span>';
            }

            table += ('<h3 id="current-month">' + monthNames[month] + ' ' + year + '</h3>');
            // uncomment the following lines if you'd like to display calendar month based on 'month' and 'view' paramaters from the URL
            table += prev_month;
            table += next_month;
            table += ('<table class="calendar-month " ' + 'id="calendar-month' + i + ' " cellspacing="0">');

            table += '<tr>';

            for (d = 0; d < 7; d++) {
                table += '<th class="weekday">' + dayNames[d] + '</th>';
            }

            table += '</tr>';

            var days = getDaysInMonth(month, year);
            var prev_days = getDaysInMonth(month, year);
            var firstDayDate = new Date(year, month, 1);
            var firstDay = firstDayDate.getDay();

            var prev_m = month == 0 ? 11 : month - 1;
            var prev_y = prev_m == 11 ? year - 1 : year;
            var prev_days = getDaysInMonth(prev_m, prev_y);
            firstDay = (firstDay == 0 && firstDayDate) ? 7 : firstDay;
            var nowYearMonth = year.toString() + '-' + (month + 1).toString() + '-';
            var nowDay;

            var i = 0;
            var open = false;
            $.get(dataUrl, { "pid": pid }, function(ajax) {
                if (ajax.status) {
                    mDate.minDate = ajax.data[0].val;
                    mDate.maxDate = ajax.data[ajax.data.length - 1].val;
                    for (j = 0; j < 42; j++) {
                        if ((j < firstDay)) {
                            table += ('<td class="other-month"></td>');
                        } else if ((j >= firstDay + getDaysInMonth(month, year))) {
                            i = i + 1;
                            table += ('<td class="other-month"></td>');
                        } else {
                            nowDay = nowYearMonth + (j - firstDay + 1);

                            for (var a = 0; a < ajax.data.length; a++) {
                                if (nowDay === ajax.data[a].val) {
                                    table += ('<td data-isfull="' + ajax.data[a].status + '" data-adultprice="' + ajax.data[a].adultprice + '" data-childprice="' + ajax.data[a].childprice + '" data-id="' + ajax.data[a].bid + '" data-over="' + ajax.data[a].over + '" data-val="' + ajax.data[a].val + '" data-label="'+ajax.data[a].status_label+'"data-diff="'+ajax.data[a].diff+'" class="current-day current-month day' + (j - firstDay + 1) + '"><i class="current-peopleNum ' + (ajax.data[a].isFull ? "full" : "") + '"></i><span class="day">' + (j - firstDay + 1) + '</span><span class="day-price">¥' + ajax.data[a].price_label + '</span></div></td>');
                                    open = true;
                                    break;
                                }
                            }
                            if (!open) {
                                table += ('<td class="current-month day' + (j - firstDay + 1) + '"><span class="day">' + (j - firstDay + 1) + '</span><span></span></td>');

                            }
                            open = false;
                        }
                        if (j % 7 == 6) table += ('</tr>');
                    }

                    table += ('</table>');

                    el.html(table);

                    if (typeof opts.callback === "function") {
                        opts.callback.call(that);
                    }
                }
            }, "json");


        }

        function getDaysInMonth(month, year) {
            var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            if ((month == 1) && (year % 4 == 0) && ((year % 100 != 0) || (year % 400 == 0))) {
                return 29;
            } else {
                return daysInMonth[month];
            }
        }


        window.setCalendarWidget = calendarWidget;
        // jQuery plugin initialisation
        $.fn.calendarWidget = function(params) {
            var that = this;
            calendarWidget(that, params);
            // 绑定前后月事件
            $("#calendar").on("click", ".nextDate", function() {
                var obj = {
                    month: $(this).data("nextmonth") - 1,
                    year: $(this).data("nextyear")
                };
                var dateText = obj.year + "-" + (obj.month + 1);
                var nextDate = new Date(dateText);
                var minDate = new Date(mDate.minDate);
                if (mDate && (new Date(minDate.setMonth(minDate.getMonth() - 1)) > nextDate)) {
                    alert("没有上一页了")
                    return false;
                }

                if (mDate && (nextDate > new Date(mDate.maxDate))) {
                    alert("没有下一页了")
                    return false;
                }
                $("#scroller li").each(function() {
                    var $that = $(this);
               alert('sadsa');
                    if($that.data("date") == dateText) {
                        $("#scroller li").removeClass("active");
                        $that.addClass("active");
                        window.myScroll.scrollToElement(document.querySelector('#scroller li[class="active"]'), 300);
                        return false;
                    }
                });
                $.extend(params, obj);
                calendarWidget(that, obj);
                return false;
            });
            return this;
        };




