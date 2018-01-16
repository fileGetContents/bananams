!(function ($, window) {

    /*init*/
    var ArrayProto = Array.prototype,
        ObjProto = Object.prototype,
        FuncProto = Function.prototype;
    var push = ArrayProto.push,
        slice = ArrayProto.slice,
        concat = ArrayProto.concat,
        toString = ObjProto.toString,
        hasOwnProperty = ObjProto.hasOwnProperty;
    var nativeForEach = ArrayProto.forEach,
        nativeMap = ArrayProto.map,
        nativeReduce = ArrayProto.reduce,
        nativeReduceRight = ArrayProto.reduceRight,
        nativeFilter = ArrayProto.filter,
        nativeEvery = ArrayProto.every,
        nativeSome = ArrayProto.some,
        nativeIndexOf = ArrayProto.indexOf,
        nativeLastIndexOf = ArrayProto.lastIndexOf,
        nativeIsArray = Array.isArray,
        nativeKeys = Object.keys,
        nativeBind = FuncProto.bind;
    var breaker = {};

    var yxk = {};
    yxk.plugin = {}; //插件类
    yxk.tools = {}; //工具类

    /*jQuery 扩展类*/
    // metadata
    $.extend({
        metadata: {
            defaults: {
                type: 'data',
                name: 'metadata',
                cre: /({.*})/,
                single: 'metadata'
            },
            setType: function (type, name) {
                this.defaults.type = type;
                this.defaults.name = name;
            },
            get: function (elem, opts) {
                var settings = $.extend({}, this.defaults, opts);
                // check for empty string in single property
                if (!settings.single.length) settings.single = 'metadata';

                var data = $.data(elem, settings.single);
                // returned cached data if it already exists
                if (data) return data;

                data = "{}";

                if (settings.type == "class") {
                    var m = settings.cre.exec(elem.className);
                    if (m)
                        data = m[1];
                } else if (settings.type == "elem") {
                    if (!elem.getElementsByTagName)
                        return undefined;
                    var e = elem.getElementsByTagName(settings.name);
                    if (e.length)
                        data = $.trim(e[0].innerHTML);
                } else if (elem.getAttribute != undefined) {
                    var attr = elem.getAttribute(settings.name);
                    if (attr)
                        data = attr;
                }

                if (data.indexOf('{') < 0)
                    data = "{" + data + "}";

                data = eval("(" + data + ")");

                $.data(elem, settings.single, data);
                return data;
            }
        }
    });

    $.fn.metadata = function (opts) {
        return $.metadata.get(this[0], opts);
    };


    /*tools*/
    // 遍历
    yxk.tools.each = function (obj, iterator, context) {
        if (obj == null) return;
        if (nativeForEach && obj.forEach === nativeForEach) {
            obj.forEach(iterator, context);
        } else if (obj.length === +obj.length) {
            for (var i = 0, l = obj.length; i < l; i++) {
                if (iterator.call(context, obj[i], i, obj) === breaker) return;
            }
        } else {
            for (var key in obj) {
                if (_.has(obj, key)) {
                    if (iterator.call(context, obj[key], key, obj) === breaker) return;
                }
            }
        }
    };
    //合并
    yxk.tools.extend = function (obj) {
        yxk.tools.each(slice.call(arguments, 1), function (source) {
            if (source) {
                for (var prop in source) {
                    obj[prop] = source[prop];
                }
            }
        });
        return obj;
    };

    /*添加cookie*/
    yxk.tools.setCookie = function (name, value, outTime) {
        var expdate = new Date();
        var outms = outTime * 24 * 60 * 60 * 1000; //过期时间，以天为单位‘1’表示一天
        expdate.setTime(expdate.getTime() + outms);
        var cookieStr = name + "=" + escape(value) + ";expires=" + expdate.toGMTString();
        //escape方法的作用是进行编码，主要防治value中有特殊字符
        document.cookie = cookieStr;
    }

    /*删除cookie*/
    yxk.tools.deleteCookie = function (cookiename) {
        var date = new Date();
        var outTime = date.getTime() - 1000; //将cookie的有效期设置为失效
        date.setTime(outTime);
        document.cookie = cookiename + "='';expires=" + date.toGMTString();
    }

    /*读取cookie*/
    yxk.tools.getCookie = function (cookieName) {
        var cookieStr = document.cookie;
        var cookievalue = "";
        if (cookieStr != null && cookieStr != undefined) {
            var arrayCookie = cookieStr.split(';');
            for (var i = 0; i < arrayCookie.length; i++) {
                var arrayDetail = arrayCookie[i].split('=');
                if (i == 0) {
                    cookiMap = '{"' + arrayDetail[0] + '":"' + arrayDetail[1] + '",';
                } else if (i == arrayCookie.length - 1) {
                    cookiMap += '"' + arrayDetail[0] + '":"' + arrayDetail[1] + '"}';
                } else {
                    cookiMap += '"' + arrayDetail[0] + '":"' + arrayDetail[1] + '",';
                }
            }
        }
        var s = cookiMap.replace(/\s/g, ""); //去掉空格
        var cookieObj = JSON.parse(s);
        for (var item in cookieObj) {
            if (item == cookieName) {
                cookievalue = unescape(cookieObj[item]);
            }
        }
        return cookievalue;
    }

    /*身份证分析 return "浙江,1878-01-05,男"*/
    yxk.tools.card = function (sId) {
        var aCity = {
            11: "北京",
            12: "天津",
            13: "河北",
            14: "山西",
            15: "内蒙古",
            21: "辽宁",
            22: "吉林",
            23: "黑龙江",
            31: "上海",
            32: "江苏",
            33: "浙江",
            34: "安徽 ",
            35: "福建 ",
            36: "江西 ",
            37: "山东 ",
            41: "河南 ",
            42: "湖北 ",
            43: "湖南 ",
            44: "广东 ",
            45: "广西 ",
            46: "海南 ",
            50: "重庆 ",
            51: "四川 ",
            52: "贵州 ",
            53: "云南",
            54: "西藏",
            61: "陕西",
            62: "甘肃",
            63: "青海",
            64: "宁夏",
            65: "新疆",
            71: "台湾",
            81: "香港",
            82: "澳门",
            91: "国外"
        }
        var iSum = 0;
        var info = "";
        if (!/^\d{17}(\d|x)$/i.test(sId)) return false;
        sId = sId.replace(/x$/i, "a");
        if (aCity[parseInt(sId.substr(0, 2))] == null) return "Error:非法地区";
        sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2));
        var d = new Date(sBirthday.replace(/-/g, "/"));
        if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) return "Error:非法生日";
        for (var i = 17; i >= 0; i--) iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11)
        if (iSum % 11 != 1) return "Error:非法证号";
        return aCity[parseInt(sId.substr(0, 2))] + "," + sBirthday + "," + (sId.substr(16, 1) % 2 ? "男" : "女")
    };
    /*身份证 验证*/
    yxk.tools.valCard = function (code) {
        var city = {
            11: "北京",
            12: "天津",
            13: "河北",
            14: "山西",
            15: "内蒙古",
            21: "辽宁",
            22: "吉林",
            23: "黑龙江 ",
            31: "上海",
            32: "江苏",
            33: "浙江",
            34: "安徽",
            35: "福建",
            36: "江西",
            37: "山东",
            41: "河南",
            42: "湖北 ",
            43: "湖南",
            44: "广东",
            45: "广西",
            46: "海南",
            50: "重庆",
            51: "四川",
            52: "贵州",
            53: "云南",
            54: "西藏 ",
            61: "陕西",
            62: "甘肃",
            63: "青海",
            64: "宁夏",
            65: "新疆",
            71: "台湾",
            81: "香港",
            82: "澳门",
            91: "国外 "
        };
        var pass = true;

        if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
            pass = false;
        } else if (!city[code.substr(0, 2)]) {
            pass = false;
        } else {
            //18位身份证需要验证最后一位校验位
            if (code.length == 18) {
                code = code.split('');
                //∑(ai×Wi)(mod 11)
                //加权因子
                var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                //校验位
                var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
                var sum = 0;
                var ai = 0;
                var wi = 0;
                for (var i = 0; i < 17; i++) {
                    ai = code[i];
                    wi = factor[i];
                    sum += ai * wi;
                }
                var last = parity[sum % 11];
                if (parity[sum % 11] != code[17]) {
                    pass = false;
                }
            }
        }
        return pass;
    };
    /*字符长度*/
    yxk.tools.len = function (str) {
        var cArr = str.match(/[^\x00-\xff]/ig);
        return str.length + (cArr == null ? 0 : cArr.length);
    };
    /*plugin*/
    //选项卡切换
    // 菜单类 j-tabsNav
    // 内容类 j-tabsCnt
    yxk.plugin.tabs = function (ele, settings) {
        var options = {
            eventType: "mouseover", //click
            imgLoad: false,
            callback: 0
        }
        options = yxk.tools.extend(options, settings);
        $(ele).each(function () {
            var that = $(this),
                eleNav = that.children(".j-tabsNav"),
                eleCnt = that.children(".j-tabsCnt"),
                eleNavChild = eleNav.children(), //tabs切换栏
                eleCntChild = eleCnt.children(); //tabs内容

            // init
            eleNavChild.eq(0).addClass("hover");
            eleCntChild.eq(0).show();
            if (options.imgLoad) {
                yxk.plugin.lazyImg(eleCntChild.eq(0).find("img"));
            }
            eleNavChild.eq(0).data("state", true);
            // 绑定切换按钮事件
            eleNavChild.on(options.eventType, function (event) {
                var that = $(this);
                var index = $(this).index();

                if (!$(this).data("state") && options.imgLoad) {

                    yxk.plugin.lazyImg(eleCntChild.eq(index).find("img"));

                    $(this).data("state", true);
                }

                eleNavChild.removeClass("hover");
                eleNavChild.eq(index).addClass("hover");
                eleCntChild.hide();
                eleCntChild.eq(index).show();

                if (options.callback && typeof options.callback === "function") {
                    options.callback(that);
                }
                event.preventDefault();
            });

        });
    };
    // 图片延迟加载
    yxk.plugin.lazyImg = function (images) {
        images.each(function (index, el) {
            var that = $(this);
            $("<img />").bind("load", function () {
                that.hide().attr("src", that.data("original")).show();
            }).attr("src", that.data("original"));
        });
    };

    // 底部加载
    $.fn.scrollPagination = function (options) {

        var opts = $.extend($.fn.scrollPagination.defaults, options);
        var target = opts.scrollTarget;
        if (target == null) {
            target = obj;
        }
        opts.scrollTarget = target;

        return this.each(function () {
            $.fn.scrollPagination.init($(this), opts);
        });

    };

    $.fn.stopScrollPagination = function () {
        return this.each(function () {
            $(this).attr('scrollPagination', 'disabled');
        });

    };

    $.fn.scrollPagination.loadContent = function (obj, opts) {
        var target = opts.scrollTarget;
        var mayLoadContent = $(target).scrollTop() + opts.heightOffset >= $(document).height() - $(target).height();
        if (mayLoadContent) {
            if (opts.beforeLoad != null) {
                opts.beforeLoad();
            }
            $(obj).children().attr('rel', 'loaded');
            $.ajax({
                type: 'GET',
                url: opts.contentPage,
                data: opts.contentData,
                success: function (data) {
                    $(obj).append(data);
                    var objectsRendered = $(obj).children('[rel!=loaded]');
                    if (opts.afterLoad != null) {
                        opts.afterLoad(objectsRendered);
                    }
                },
                dataType: 'html'
            });
        }

    };

    $.fn.scrollPagination.init = function (obj, opts) {
        var target = opts.scrollTarget;
        $(obj).attr('scrollPagination', 'enabled');

        $(target).scroll(function (event) {
            if ($(obj).attr('scrollPagination') == 'enabled') {
                $.fn.scrollPagination.loadContent(obj, opts);
            } else {
                event.stopPropagation();
            }
        });

        $.fn.scrollPagination.loadContent(obj, opts);

    };

    $.fn.scrollPagination.defaults = {
        'contentPage': null,
        'contentData': {},
        'beforeLoad': null,
        'afterLoad': null,
        'scrollTarget': null,
        'heightOffset': 0
    };

    // 图片延迟加载
    $.fn.scrollLoading = function (options) {
        var defaults = {
            attr: "data-url", //图片存放标签
            container: $(window), //对应容器
            callback: $.noop
        };
        var params = $.extend({}, defaults, options || {});
        params.cache = [];
        $(this).each(function () {
            var node = this.nodeName.toLowerCase(),
                url = $(this).attr(params["attr"]);
            //重组
            var data = {
                obj: $(this),
                tag: node,
                url: url
            };
            params.cache.push(data);
        });

        var callback = function (call) {
            if ($.isFunction(params.callback)) {
                params.callback.call(call.get(0));
            }
        };
        //动态显示数据
        var loading = function () {

            var contHeight = params.container.height();
            if (params.container.get(0) === window) {
                contop = $(window).scrollTop();
            } else {
                contop = params.container.offset().top;
            }

            $.each(params.cache, function (i, data) {
                var o = data.obj,
                    tag = data.tag,
                    url = data.url,
                    post, posb;

                if (o) {
                    post = o.offset().top - contop, posb = post + o.height();
                    if ((post >= 0 && post < contHeight) || (posb > 0 && posb <= contHeight)) {
                        if (url) {
                            //在浏览器窗口内
                            if (tag === "img") {
                                //图片，改变src
                                callback(o.attr("src", url));
                            } else {
                                o.load(url, {}, function () {
                                    callback(o);
                                });
                            }
                        } else {
                            // 无地址，直接触发回调
                            callback(o);
                        }
                        data.obj = null;
                    }
                }
            });
        };

        //事件触发
        //加载完毕即执行
        loading();
        //滚动执行
        params.container.bind("scroll", loading);
    };

    // 日历
    (function ($) {

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
            $.get(dataUrl, {"pid": pid}, function (ajax) {

                console.log(ajax);

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
                                    table += ('<td data-isfull="' + ajax.data[a].status + '" data-adultprice="' + ajax.data[a].adultprice + '" data-childprice="' + ajax.data[a].childprice + '" data-id="' + ajax.data[a].bid + '" data-over="' + ajax.data[a].over + '" data-val="' + ajax.data[a].val + '" data-label="' + ajax.data[a].status_label + '"data-diff="' + ajax.data[a].diff + '" class="current-day current-month day' + (j - firstDay + 1) + '"><i class="current-peopleNum ' + (ajax.data[a].isFull ? "full" : "") + '"></i><span class="day">' + (j - firstDay + 1) + '</span><span class="day-price">¥' + ajax.data[a].price_label + '</span></div></td>');
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
        $.fn.calendarWidget = function (params) {
            var that = this;
            calendarWidget(that, params);
            // 绑定前后月事件
            $("#calendar").on("click", ".nextDate", function () {
                var obj = {
                    month: $(this).data("nextmonth") - 1,
                    year: $(this).data("nextyear")
                };
                var dateText = obj.year + "-" + (obj.month + 1);
                var nextDate = new Date(dateText);
                var minDate = new Date(mDate.minDate);
                if (mDate && (new Date(minDate.setMonth(minDate.getMonth() - 1)) > nextDate)) {
                    alert("没有上一页了");
                    return false;
                }

                if (mDate && (nextDate > new Date(mDate.maxDate))) {
                    alert("没有下一页了");
                    return false;
                }
                $("#scroller li").each(function () {
                    var $that = $(this);
                    if ($that.data("date") == dateText) {
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

    })(jQuery);
    // 注册到window下
    window.yxk = yxk;
})(jQuery, this);