!(function ($, window) {
    // 公共执行方法
    yxk.G = function () {
        var body = $("body");
        // 绑定表单提交方法
        $(".j-submit").click(function () {
            $(this).parents("form").eq(0).submit();
            return false;
        });
        var state = false;
        var headerState = false;
        // 置顶事件
        $(window).load(function () {
            var top = $(window).scrollTop();
            $(window).scroll(function (event) {
                top = $(window).scrollTop();
                if (top > 300) {
                    if (!state) {
                        var html = '<a href="#top" class="g-top"><span class="iconfont">&#xe605;</span><span class="g-bg"></span></a>';
                        $("body").append(html);
                        state = true;
                    } else {
                        $(".g-top").show();
                    }
                } else {
                    $(".g-top").hide();
                }
            });
        });
        $("#j-showMenu").data("state", false).click(function () {
            if (!$(this).data("state")) {
                $("#j-header").css("position", "fixed").removeClass("headerAbsolute");
                $(this).data("state", true);
            } else {
                $("#j-header").css("position", "static").addClass("headerAbsolute");
                $(this).data("state", false);
            }
            $("#j-menu").slideToggle(300);
            return false;
        });
        yxk.plugin.tabs($("#j-tabs"), {
            eventType: "click"
        });
        $("#searchText").focus(function (event) {
            $("#searchBox").addClass("focus");
        }).blur(function (event) {
            $("#searchBox").removeClass("focus");
        });
        $("#clearText").on('mousedown', function (event) {
            $("#searchText").val("");
            $("#searchText").focus();
            event.preventDefault();
        });
        $("#searchBtn").click(function () {
            if ($.trim($("#searchText").val()).length == 0) {
                return false;
            }
            $(this).parent().submit();
            return false;
        });
    };
    yxk.G();
    // 表单公共方法
    yxk.G.form = function () {
        $.validator.setDefaults({
            debug: false, //启动测试
            ignore: ".ignore", //对指定元素不验证
            onkeyup: false, //是否在敲击键盘时验证
            errorPlacement: function (error, element) { //错误时执行方法
                var errorBox = $(element).parents("li").find(".f-otherContent"),
                    errorText = error[0].innerText;
                if (errorBox.length > 0) {
                    errorBox.show().find(".errorFont").text(errorText);
                } else {
                    error = '<div class="f-otherContent"><span class="iconfont">&#xe61b;</span><span class="errorFont"></span></div>';
                    $(error).appendTo($(element).parents("li")).find(".errorFont").text(errorText);
                }
            },
            success: function (s, element) { //成功时执行方法
                $(element).parents("li").find(".f-otherContent").hide();
            }
        });
        $.extend($.validator.messages, {
            required: "不能为空",
            remote: "请重新输入",
            email: "请输入正确的电子邮件",
            url: "请输入合法的网址",
            date: "请输入合法的日期",
            dateISO: "请输入合法的日期 (ISO).",
            number: "请输入正确的数字",
            digits: "只能输入整数",
            creditcard: "请输入合法的信用卡号",
            equalTo: "请再次输入相同的值",
            accept: "请输入拥有合法后缀名的字符串",
            maxlength: $.validator.format("请输入一个长度最多是 {0} 的字符串"),
            minlength: $.validator.format("请输入一个长度最少是 {0} 的字符串"),
            rangelength: $.validator.format("请输入一个长度介于 {0} 和 {1} 之间的字符串"),
            range: $.validator.format("请输入一个介于 {0} 和 {1} 之间的值"),
            max: $.validator.format("请输入一个最大为 {0} 的值"),
            min: $.validator.format("请输入一个最小为 {0} 的值"),
            valCard: $.validator.format("身份证格式错误"),
            phone: $.validator.format("请输入正确的手机号码"),
        });
        // 错误展示
        $("form").on('click', '.f-otherContent', function (event) {
            var $that = $(this);
            $that.addClass("hover");
            timeId = window.setTimeout(function () {
                $that.removeClass("hover");
            }, 2000);
            event.preventDefault();
        });
        $.validator.addMethod("valCard", function (value, element, params) {
            return yxk.tools.len($.trim(value)) == 18;
        });
        $.validator.addMethod("phone", function (value, element, params) {
            if (value.length === 11) {
                return true;
            } else {
                return false;
            }
        });
    };
    // 下载事件
    yxk.G.download = function () {
        // 下载链接
        var html = '<a id="j-download" class="downloadBox" href="http://www.youxiake.com/app">' + '<img src="./images/app.png">' + '<div class="downloadFont">' + '<p>点击下载APP</p>' + '<p>游侠客,真正的旅行!</p>' + '</div>' + '<span id="downloadClose" class="downloadClose"></span>' + '</a>';
        $("body").prepend(html);
        $("body").on('click', '#downloadClose', function (event) {
            $(this).parent().remove();
            event.preventDefault();
            event.stopPropagation();
        });
        // $("body").on('click', '#j-download', function(event) {
        //  window.location.href = $(this).attr("href");
        //  return false;
        // });
    };
    // 幻灯片
    yxk.G.slider = function () {
        // 启动幻灯片
        var slider = Swipe(document.getElementById('slider'), {
            auto: 3000,
            continuous: true,
            callback: function (pos) {
                var i = bullets.length;
                while (i--) {
                    bullets[i].className = ' ';
                }
                bullets[pos].className = 'hover';
            }
        });
        var bullets = document.getElementById('position').getElementsByTagName('li');
    };
    // 延迟加载
    yxk.G.loading = function () {
        $(".j-scrollLoading").find("img").scrollLoading();
    };
    yxk.G.scrollLoading = function () {
        var currentData = {};

        function initMore() {
            if (currentData.totalPage == "1") {
                return false;
            }
            var moreEle = $('<div id="j-loadMore" class="loadMore">正在加载..</div>').appendTo("#dataList");
            moreEle.data("state", true);
            $(window).scroll(function (event) {
                if (moreEle.data("state") && (moreEle.offset().top < ($(window).scrollTop() + $(window).height()))) {
                    var nextPage = window.parseInt(currentData.currentPage) + 1;
                    var totalPage = window.parseInt(currentData.totalPage);
                    if (nextPage > totalPage && totalPage != "NaN") {
                        $("#j-loadMore").text("没有更多了");
                        return false;
                    } else {
                        $("#j-loadMore").text("正在加载..");
                    }
                    var ajaxVal = {};
                    ajaxVal[currentData.argument] = currentData.id;
                    ajaxVal.page = nextPage;
                    $.post(currentData.href, ajaxVal, function (json, textStatus, xhr) {
                        // json.html,json.noMore,json.state
                        if (json.state == "0") {
                            return false;
                        }
                        currentData.totalPage = json.totalpage;
                        $("#dataContent").append(json.html);
                        currentData.currentPage = nextPage;
                        yxk.G.loading();
                    }, "json");
                    moreEle.data("state", false);
                } else if (!moreEle.data("state") && moreEle.offset().top > ($(window).scrollTop() + $(window).height())) {
                    moreEle.data("state", true);
                }
            });
        }

        function initData() {
            var obj = eval($("#dataList").data("val"));
            /*当前数据*/
            currentData = {
                currentPage: 1,
                totalPage: obj.totalPage,
                href: obj.href,
                argument: obj.argument,
                id: obj.id
            }
            initMore(); //初始化正在加载..
        }

        initData();
    }
    yxk.G.filterData = function (type, val) {
        switch (type) {
            case "type":
                switch (val) {
                    case 1:
                        return "成人";
                        break;
                    case 2:
                        return "儿童";
                        break;
                }
                break;
            case "sex":
                switch (val) {
                    case 1:
                        return "男";
                        break;
                    case 2:
                        return "女";
                        break;
                }
                break;
            case "card":
                switch (val) {
                    case 1:
                        return "二代身份证";
                        break;
                    case 2:
                        return "护照";
                        break;
                    case 3:
                        return "港澳通行证";
                        break;
                    case 4:
                        return "台胞证";
                        break;
                    case 5:
                        return "军官证";
                        break;
                    case 6:
                        return "回乡证";
                        break;
                    case 7:
                        return "其他";
                        break;
                }
                break;
        }
    };
    yxk.G.kufu = function () {
        $('<div id="kefu_phone"><div class="kefu_wrapper"><div class="kefu_tip"><i class="close"></i><a class="item1" href="tel:4006706300">拨打电话400-670-6300</a><a href="https://youxiake.qiyukf.com/client?k=24af6f703937e7744a8f888e63a35f0e&wp=1" class="item2">在线客服</a></div></div></div>').appendTo('body').click(function (event) {
            if ($("#kefu_phone").length > 0) {
                $(this).children().show();
            }
        });
        $("#kefu_phone").find(".close").click(function (event) {
            $(this).parents(".kefu_wrapper").hide();
            return false;
        });
    }
    // 首页
    yxk.index = function () {
        yxk.G.kufu() //显示在线客服
        yxk.G.download(); //显示下载
        yxk.G.slider(); //幻灯片滑动
        yxk.G.loading(); //延迟加载
        var date = new Date();
        $(".monthList").find("li").eq(date.getMonth()).addClass("hover");
        /*广告滚动*/
        function AutoScroll(obj) {
            $(obj).find("ul:first").animate({
                marginTop: "-40px"
            }, 500, function () {
                $(this).css({
                    marginTop: "0px"
                }).find("li:first").appendTo(this);
            });
        }

        if ($("#AutoScroll").find("li").length !== 1) {
            window.setInterval(function () {
                AutoScroll("#AutoScroll");
            }, 3000);
        }
        // $(document).on("click", "#j-bourn li", function(event) {
        //  window.location.href = $(this).attr("href");
        //  event.preventDefault();
        // });
        var myScroll = new IScroll('#j-wrapper', {
            eventPassthrough: true,
            scrollX: true,
            scrollY: false,
            preventDefault: false
        });
        $("#j-wrapper").on('touchmove', function (e) {
            e.preventDefault();
        });
        var showBourn = function () {
            /*当前数据*/
            var currentData = {
                ele: "",
                eleParent: ""
            };

            function init() {
                initPage();
                addBournTitle();
                addBournTitleChild();
                initMore();
                $("#j-bournTitle").find("li").eq(0).click();
                // test();
            }

            function addBournTitleChild() {
                $("#j-bournBox").on("click", '#j-bournTitleChild li', function (event) {
                    var $that = $(this);
                    initPage();
                    if ($that.data("more")) {
                    } else {
                        currentData.ele = $that;
                        $("#j-bournTitleChild li").removeClass("hover");
                        $that.addClass("hover");
                        ajaxRequest(1);
                        $(window).scrollTop($("#j-bourn").offset().top);
                        return false;
                    }
                });
            }

            var one = false;
            /*添加加载地点事件*/
            function addBournTitle() {
                $("#j-bournBox").on("click", "#j-bournTitle li", function (event) {
                    var $that = $(this);
                    initPage();
                    var box = $("#j-bournTitleChild ul").eq($that.index());
                    $("#j-bournTitleChild ul").hide();
                    box.show().children().removeClass("hover");
                    box.children().eq(0).addClass("hover");
                    $("#j-bournTitle").find("li").removeClass("hover");
                    $that.addClass("hover");
                    var firstChild = $("#j-bournTitleChild").children().eq($that.index()).children().eq(0).addClass("hover");
                    currentData.eleParent = $that;
                    currentData.ele = firstChild;
                    ajaxRequest(1);
                    if (!one) {
                        one = true;
                    } else {
                        $(window).scrollTop($("#j-bourn").offset().top);
                    }
                    event.preventDefault();
                });
            }

            /*正在加载..链接和事件*/
            function initMore() {
                var $that = $(this);
                var moreEle = $("#j-loadMore");
                moreEle.data("state", true);
                $(window).scroll(function (event) {
                    if (moreEle.data("state") && (moreEle.offset().top < ($(window).scrollTop() + $(window).height()))) {
                        ajaxRequest(2);
                        moreEle.data("state", false);
                    } else if (!moreEle.data("state") && moreEle.offset().top > ($(window).scrollTop() + $(window).height())) {
                        moreEle.data("state", true);
                    }
                });
            }

            /*组装数据,接收html, type:1 重新添加数据, type:2 正在加载..*/
            function addData(html, type) {
                var jBourn = $("#j-bourn");
                if (type == "1") {
                    jBourn.empty().append(html);
                } else if (type == "2") {
                    jBourn.append(html);
                }
                yxk.G.loading();
            };
            var status = false;

            function ajaxRequest(type) {
                var nextPage = window.parseInt(currentData.ele.data("currentPage")) + 1;
                var totalPage = window.parseInt(currentData.ele.data("totalPage"));
                if (nextPage > totalPage && totalPage != "NaN") {
                    $("#j-loadMore").text("没有更多了");
                    return false;
                } else {
                    $("#j-loadMore").text("正在加载..");
                }
                var url = currentData.ele.data("href");
                var val = {
                    id: currentData.ele.data("id"),
                    cateId: currentData.eleParent.data("id"),
                    page: nextPage
                };
                if (type != "2") {
                    var loadingHTML = '<li id="loading"></li>';
                    $("#j-bourn").empty().append(loadingHTML);
                }
                if (status) {
                    return false;
                }
                status = true;
                $.getJSON(url, val, function (json, textStatus) {
                    // json.html,json.noMore,json.state
                    if (json.state == "0") {
                        return false;
                    }
                    currentData.ele.data("totalPage", json.totalpage);
                    if (type != "2") {
                        addData(json.html, 1);
                    } else {
                        addData(json.html, 2);
                    }
                    status = false;
                    currentData.ele.data("currentPage", nextPage);
                });
            }

            /*初始化页码*/
            function initPage() {
                $("#j-bournTitleChild li").data("currentPage", 0); //初始化页码数
            }

            function test() {
                if ($(".testBox").length > 0) {
                    return false;
                } else {
                    var box = $('<div class="testBox"></div>').appendTo("body");
                    box.css({
                        "position": "fixed",
                        "top": "50px",
                        "right": "0px",
                        "width": "140px",
                        "height": "200px",
                        "color": "#fff",
                        "background-color": "#000",
                        "z-index": "10000"
                    });
                }
                var html, val;
                var more = $("#j-loadMore");
                var w = $(window);
                $(window).load(function () {
                    window.setInterval(function () {
                        html = "";
                        html += '<p>当前元素:' + currentData.ele.text() + '</p>';
                        html += '<p>父元素:' + currentData.eleParent.text() + '</p>';
                        html += '<p>父ID:' + currentData.eleParent.data("id") + '</p>';
                        html += '<p>当前ID:' + currentData.ele.data("id") + '</p>';
                        html += '<p>当前URL:' + currentData.ele.data("href") + '</p>';
                        html += '<p>当前页数:' + currentData.ele.data("currentPage") + '</p>';
                        html += '<p>总页数:' + currentData.ele.data("totalPage") + '</p>';
                        html += '<p>滚动坐标:' + w.scrollTop() + '</p>';
                        box.html(html);
                    }, 1000 / 10);
                });
            }

            init();
        };
        showBourn();
        $(window).load(function () {
            var jBourn = $("#bournFixed");
            var jBournBox = $("#j-bournBox");
            var top = $(window).scrollTop();
            var bournTop = jBournBox.position().top;
            $(window).resize(function (event) {
                top = $(window).scrollTop();
                bournTop = jBournBox.position().top;
            });
            $(window).scroll(function () {
                top = $(window).scrollTop();
                if (top > bournTop) {
                    if (!jBourn.data("state")) {
                        jBourn.addClass("bournFixed");
                        $("#j-bourn").css("padding-top", jBourn.height());
                        jBourn.data("state", true);
                    }
                } else if (top < bournTop) {
                    jBourn.removeClass("bournFixed");
                    $("#j-bourn").css("padding-top", 0);
                    jBourn.data("state", false);
                }
            })
        })
    };
    // 子页面
    yxk.childPage = function () {
        if (typeof Swipe !== "undefined") {
            yxk.G.slider();
        }
        yxk.G.loading(); //延迟加载
        yxk.G.kufu();
        yxk.getLines();
    };
    yxk.searchPage = function () {
        yxk.G.loading();
        yxk.G.scrollLoading();
    };
    // 得到线路数据
    yxk.getLines = function () {
        var options = {
            pager: argName,
            id: $("#m2_scroller").find("li").eq(0).data("id"),
            page: 1,
            mdd: "-1", //目的地
            price: 0, //排序
            days: 0, //出行天数
            theme: 0 //出行类型
        };

        function test() {
            if ($(".testBox").length > 0) {
                return false;
            } else {
                var box = $('<div class="testBox"></div>').appendTo("body");
                box.css({
                    "position": "fixed",
                    "top": "50px",
                    "right": "0px",
                    "width": "140px",
                    "height": "200px",
                    "color": "#fff",
                    "background-color": "#000",
                    "z-index": "10000"
                });
            }
            var html, val;
            var more = $("#j-loadMore");
            var w = $(window);
            $(window).load(function () {
                window.setInterval(function () {
                    html = "";
                    html += '<p>pager:' + options.pager + '</p>';
                    html += '<p>id:' + options.id + '</p>';
                    html += '<p>page:' + options.page + '</p>';
                    html += '<p>mdd:' + options.mdd + '</p>';
                    html += '<p>price:' + options.price + '</p>';
                    html += '<p>theme:' + options.theme + '</p>';
                    html += '<p>days:' + options.days + '</p>';
                    html += '<p>bottomLoaderState:' + bottomLoaderState + '</p>';
                    box.html(html);
                }, 1000 / 10);
            });
        }

        // test();
        var myScroll = new IScroll('#m2_wrapper', {
            eventPassthrough: true,
            scrollX: true,
            scrollY: false,
            preventDefault: false
        });
        $("#j_bottomNav").on("click", "li", function (event) {
            options[$(this).parent().data("type")] = $(this).data("val");
            options.page = 0;
            $(this).parent().children().removeClass("hover");
            $(this).parents("#j_tipContent").find("li").removeClass("hover");
            $(this).addClass("hover");
            closeBottomNav();
            setData();
            return false;
        });

        function closeBottomNav() {
            $(".m2_bottomNav").removeClass("open");
            $("#j_bottomNav").hide();
            $("#j_bottomNavTitle").find("li").removeClass("hover");
        }

        $(".m2_bottomNav").click(function (event) {
            closeBottomNav();
            return false;
        });
        $("#j_bottomNavTitle").find("li").click(function (event) {
            $("#j_tipChild").children().removeClass("hover").eq(0).addClass("hover");
            $("#j_tipContent").children().hide().eq(0).show();
            $("#j_bottomNav").children().hide();
            $("#j_bottomNav").children().eq($(this).index()).show();
            $("#j_bottomNavTitle").find("li").removeClass("hover");
            $(this).addClass("hover");
            $(".m2_bottomNav").addClass("open");
            $("#j_bottomNav").show();
            return false;
        });
        $("#m2_wrapper").on('touchmove', function (e) {
            e.preventDefault();
        });
        $("#m2_scroller").find("li").on("click", function () {
            $("#m2_scroller").find("li").removeClass("active");
            $(this).addClass("active");
            myScroll.scrollToElement(document.querySelector('#m2_scroller li[class="active"]'), 1000);
            init($(this).index());
            goToTop();
            return false;
        });
        $("#j_tipChild").on("click", "span", function (event) {
            $("#j_tipChild").find("span").removeClass("hover");
            $(this).addClass("hover");
            $("#j_tipContent").children().hide().eq($(this).index()).show();
            return false;
        });
        // 初始化属性
        function initData(el) {
            options = {
                id: $("#m2_scroller").find("li").eq(el).data("id"),
                pager: argName,
                page: 1,
                //mdd: "-1", //目的地
                price: 0, //排序
                days: 0, //出行天数
                theme: 0 //出行类型
            };
            $("#j_bottomNav li").removeClass("hover")
        }

        // 遍历数据
        function setData() {
            $.get(AJAX_getLineList, options, function (data) {
                console.log("请求..");
                if (data.state == "1") {
                    var html = data.html;
                    if (options.page > 1) {
                        if (html) {
                            $("#m2_j-bourn").append(html)
                        } else {
                            if ($(".m2_nodata").length == 0) {
                                $("#m2_j-bourn").append('<li class="m2_nodata">没有线路了</li>')
                            }
                        }
                        bottomLoaderState = false;
                    } else {
                        if (html) {
                            $("#m2_j-bourn").empty().html(html)
                        } else {
                            $("#m2_j-bourn").empty().html('<li class="m2_nodata">没有线路了</li>')
                        }
                    }
                    yxk.G.loading();
                    $bH = $("#m2_j-bourn").height() + $("#m2_j-bourn").position().top;
                }
            });
        }

        // 置顶
        var $mW = $("#m2_wrapper");
        var $W = $(window);
        var $WH = $(window).height();
        var $fTop = $("#fixWrapper").position().top;
        var $bH = 0;
        var bottomLoaderState = false;
        $W.scroll(function (event) {
            if ($W.scrollTop() >= $fTop) {
                toTop();
            } else {
                resetTop();
            }
            if ($bH < ($WH + $W.scrollTop() + 150)) {
                if (!bottomLoaderState) {
                    bottomLoaderState = true;
                    console.log("触发加载更多");
                    options.page++;
                    setData();
                }
            }
        });

        function goToTop() {
            toTop();
            $(window).scrollTop($fTop)
        }

        function toTop() {
            $mW.addClass("fixed");
        }

        function resetTop() {
            $mW.removeClass("fixed");
        }

        //导航栏定位
        function titleHover(num) {
            $("#m2_scroller").find("li").eq(num).addClass("active");
            myScroll.scrollToElement(document.querySelector('#m2_scroller li[class="active"]'), 1000);
        }

        function initMdd() {
            var html1 = '';
            var html2 = '';
            if (typeof mddList != "undefined") {
                $.each(mddList, function (index, val) {
                    var alias = val.alias ? val.alias : 'mdd';
                    html1 += '<span>' + val.name + '</span>';
                    html2 += '<ul class="tipBoxChildContentitem" data-type="' + alias + '">';
                    $.each(val.list, function (index, val) {
                        html2 += '<li data-val="' + val.split("^")[1] + '">' + val.split("^")[0] + '</li>'
                    });
                    html2 += '</ul>';
                });
                $("#j_tipChild").html(html1);
                $("#j_tipContent").html(html2);
            }
        }

        //初始化
        function init(el) {
            initMdd();
            initData(el);
            titleHover(el);
            setData();
        }

        init(0);
    };
    // 注册页面
    yxk.register = function () {
        yxk.G.form();
        jQuery.validator.addMethod("isMax", function (value, element) {
            var length = yxk.tools.len(value);
            return length >= 6 && length <= 20;
        }, "长度为6-20个字符");
        // 表单验证
        $("form").validate({
            rules: {
                username: {
                    required: true,
                    isMax: true
                },
                password: {
                    required: true,
                    minlength: 6
                },
                repassword: {
                    required: true,
                    minlength: 6,
                    equalTo: "#password"
                },
                city_id: {
                    required: true
                },
                phone: {
                    required: true
                },
                verify_code: {
                    required: true
                }
            }
        });
        // 发送验证码
        $("#j-send").click(function () {
            var $that = $(this);
            var obj = {};
            obj.tel = $that.parents(".f-content").find(".f-text").val();
            obj.random = Math.random();
            $.getJSON('http://wap.youxiake.com/iservices-sendmobileauthcode.html', obj, function (json, textStatus) {
                if (json.status == "y") {
                    $that.parent().addClass("hover");
                    var time = 60,
                        timeId;
                    timeId = window.setInterval(function () {
                        if (time < 1) {
                            window.clearInterval(timeId);
                            $that.parent().removeClass("hover");
                            $("#j-time").text(60);
                        } else {
                            $("#j-time").text(--time);
                        }
                    }, 1000);
                } else {
                    alert(json.info);
                }
            });
        });
        $("#j-select-p").change(function (event) {
            var obj = {};
            obj.province_id = $(this).val();
            obj.random = Math.random();
            $.post('http://wap.youxiake.com/iservices-getcity.html', obj, function (data, textStatus, xhr) {
                var html = '<option value="">请选择城市</option>';
                for (var i = data.length - 1; i >= 0; i--) {
                    html += '<option value="' + data[i].ID + '">' + data[i].City + '</option>'
                }
                ;
                $("#j-select-c").html(html);
            }, "json");
            return false;
        });
    };
    //选择时间
    yxk.dataPage = function () {
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
                    $("#batchType").empty();
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
        //$("#scroller").find("li").click(function () {
        //    $("#scroller li").removeClass("active");
        //    $(this).addClass("active");
        //    myScroll.scrollToElement(document.querySelector('#scroller li[class="active"]'), 300);
        //    var obj = {};
        //    obj.month = window.parseInt($(this).data("date").split("-")[1]) - 1;
        //    obj.year = $(this).data("date").split("-")[0];
        //    window.setCalendarWidget($("#calendar"), obj);
        //});
        $("#scroller").on('click', 'li', function () {
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
    yxk.content = function () {
        // 幻灯片
        yxk.G.slider();
        var fixedBox = $("#tabNav");
        var fixedBoxChild = $("#tabNav").children();
        var fixedTop = fixedBox.position().top;
        var oNav = $('#tabNav'); //导航壳
        var aNav = oNav.find('li'); //导航
        var aDiv = $('#tabContent').children(); //楼层
        $(window).scroll(function (event) {
            var top = $(this).scrollTop();
            if (fixedTop < top) {
                fixedBox.addClass("fixed");
                $("#tabBox").css({
                    "padding-top": 41
                })
            } else {
                fixedBox.removeClass("fixed");
                $("#tabBox").css({
                    "padding-top": 0
                })
            }
            var winH = $(window).height(); //可视窗口高度
            var iTop = $(window).scrollTop(); //鼠标滚动的距离
            //鼠标滑动式改变
            aDiv.each(function () {
                if (winH + iTop - $(this).offset().top > winH / 2) {
                    aNav.removeClass('active');
                    aNav.eq($(this).index()).addClass('active');
                }
            })
        });
        $("#tabNav").find("li").on("click", function () {
            $("#tabNav").find("li").removeClass("active");
            $(this).addClass("active");
            $(window).scrollTop($("#tabBox").position().top);
            $(window).scrollTop($("#tabContent").children().eq($(this).index()).position().top);
        });
        $.fn.scrollLoading = function (options) {
            var defaults = {
                attr: "img-url",
                container: $(window),
                callback: $.noop
            };
            var params = $.extend({}, defaults, options || {});
            params.cache = [];
            $(this).each(function () {
                var node = this.nodeName.toLowerCase(),
                    url = $(this).attr(params["attr"]);
                var data = {
                    obj: $(this),
                    tag: node,
                    url: url
                };
                params.cache.push(data)
            });
            var callback = function (call) {
                if ($.isFunction(params.callback)) {
                    params.callback.call(call.get(0))
                }
            };
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
                                if (tag === "img") {
                                    callback(o.attr("src", url))
                                } else {
                                    o.load(url, {}, function () {
                                        callback(o)
                                    })
                                }
                            } else {
                                callback(o)
                            }
                            data.obj = null
                        }
                    }
                })
            };
            loading();
            params.container.bind("scroll", loading)
        };
        $(".imgLoading").scrollLoading();
        $(".app_content_day").each(function () {
            var curText = $(this).text();
            var array = curText.match(/\[([\s\S]*?)\]/g);
            if (!array) {
                array = []
            }


            $.each(array, function (index, str) {
                switch (str) {
                    case "[飞机]":
                        curText = curText.replace(str, '<i class="icon-plane" title="飞机"></i>');
                        break;
                    case "[骑行]":
                        curText = curText.replace(str, '<i class="icon-bike" title="骑行"></i>');
                        break;
                    case "[火车]":
                        curText = curText.replace(str, '<i class="icon-train" title="火车"></i>');
                        break;
                    case "[大巴]":
                        curText = curText.replace(str, '<i class="icon-bus" title="大巴"></i>');
                        break;
                    case "[徒步]":
                        curText = curText.replace(str, '<i class="icon-walk" title="徒步"></i>');
                        break;
                    case "[轮船]":
                        curText = curText.replace(str, '<i class="icon-ship" title="轮船"></i>');
                        break;
                    case "[越野车]":
                        curText = curText.replace(str, '<i class="icon-vehicle" title="越野车"></i>');
                        break;
                    default:
                        curText = curText
                }
            });
            console.log(curText);
            $(this).html(curText)
        });
        // 滚动事件
        var myScroll;
        myScroll = new IScroll("#wrapper", {
            scrollX: true,
            scrollY: false,
            preventDefault: false
        });
        myScroll.scrollToElement(document.querySelector('#scroller li'), 0);
        Array.prototype.forEach.call(document.querySelectorAll("#scroller li"), function (el, i) {
            el.addEventListener("click", function () {
                Array.prototype.forEach.call(document.querySelectorAll("#scroller li"), function (el) {
                    el.setAttribute("class", "")
                });
                this.setAttribute("class", "active");
                myScroll.scrollToElement(document.querySelector('#scroller li[class="active"]'), 1000)
            })
        });
        document.querySelector("#scroller").addEventListener('touchmove', function (e) {
            e.preventDefault();
        }, false);
        yxk.G.loading();
    };
    // 登录页
    yxk.login = function () {
        yxk.G.form();
        $("form").validate({
            rules: {
                username: {
                    required: true,
                    minlength: 6
                },
                password: {
                    required: true,
                    minlength: 6
                }
            }
        });
    };
    // 订单确认页
    yxk.orders = function () {
        $(".m2_open").click(function (event) {
            $("#m2_xuzhi").show();
            return false;
        });
        $(".xuzhi_btn").click(function (event) {
            $("#m2_xuzhi").hide();
            return false;
        });
        // //证件切换
        // function cardTab(state) {
        //     var parentEle = $(this).parents(".f-list");
        //     if (state) { //选择身份证
        //         parentEle.find(".j-hide").show().find(".f-text").removeClass("ignore");
        //         parentEle.find(".j-show").hide().find("input").addClass("ignore");
        //     } else { //选择其他证件
        //         parentEle.find(".j-hide").hide().find(".f-text").addClass("ignore");
        //         parentEle.find(".j-show").css({
        //             "display": "-webkit-box"
        //         }).find("input").removeClass("ignore");
        //     }
        // }
        // // 成人,儿童切换
        // function typeTab(state) {
        //     var parentEle = $(this).parents(".f-list");
        //     if (state) { //选择成人
        //         parentEle.find(".j-typeActiveOn").hide().find("input").addClass("ignore")
        //         parentEle.find(".j-typeActive").css({
        //             "display": "-webkit-box"
        //         }).find("input").removeClass("ignore");
        //         parentEle.find(".childCard").hide();
        //     } else { //选择儿童
        //         parentEle.find(".j-typeActiveOn").css({
        //             "display": "-webkit-box"
        //         }).show().find("input").removeClass("ignore");
        //         parentEle.find(".j-typeActive").hide().find("input").addClass("ignore");
        //         parentEle.find(".childCard").css({
        //             "display": "-webkit-box"
        //         });
        //     }
        // }
        //证件切换
        $(document).on("change", ".j-select", function (event) {
            var $that = $(this);
            $that.parents('ul').find('.childCard').css({
                display: 'none'
            });

            if ($that.val() == "1") {
                $('.j-birth').hide().find('input').addClass('ignore');
                validateForm(false, false, false);
            } else if ($that.val() == "2") {
                $('.j-birth').show().find('input').removeClass('ignore');
                validateForm(false, false, true);
                $that.parents('ul').find('.childCard').css({
                    display: '-webkit-box'
                }).removeClass('ignore');
            } else {
                $('.j-birth').show().find('input').removeClass('ignore');
                validateForm(false, false, true);
            }
        });
        // // 类型选择
        // $(document).on("click", ".j-type input", function() {
        //     var $that = $(this);
        //     if ($that.prop("checked")) { //选中
        //         //if ($that.val() == "1") { //选中成人
        //         typeTab.call($that, true);
        //         cardTab.call($that, true);
        //         // } else {
        //         //typeTab.call($that, false);
        //         // }
        //         changePrice();
        //         validateForm();
        //     }
        // });
        // 修改价格
        yxk.G.form();

        function validateForm(state, ajax, cardState) {
            if (state) {
                if (ajax) {
                    $("#j-from").validate({
                        submitHandler: function (form) {
                            var obj = {};
                            $.each($(form).serializeArray(), function (index, val) {
                                obj[val.name] = val.value;
                            });
                            $.post($(form).attr("action"), obj, function (data, textStatus, xhr) {
                                if (data.status == "1") {
                                    var html = '<li>' + '<label><input type="checkbox" data-cardno="' + data.data.cardno + '" data-val="' + data.data.mid + '" data-sex="' + data.data.sex + '" data-name="' + data.data.name + '" data-type="' + data.data.type + '" class="j-checkBox">' + '<div class="m2_userInfo">' + '<p><span>' + data.data.name + '</span><span>' + yxk.G.filterData("sex", data.data.sex) + '</span><span>' + yxk.G.filterData("type", data.data.type) + '</span></p>' + '<p>' + yxk.G.filterData("card", data.data.cardtype) + ':' + data.data.cardno + '</p>' + '</div></label>' + '</li>';
                                    $(form).find("#j-user2").removeClass("open").empty();
                                    $(form).parent().find(".m2_userList").append(html);
                                } else {
                                    alert(data.data)
                                }
                            });
                        }
                    });
                } else {
                    $("#j-from").validate();
                }
            } else {
                $("#bookForm").validate();
            }
            if (cardState) {
                $(".j-val-card").each(function (index, el) {
                    $(this).rules("remove", "valCard");
                });
            } else {
                $(".j-val-card").each(function (index, el) {
                    $(this).rules("add", {
                        required: true,
                        valCard: true
                    });
                });
            }
            $(".j-val-name").each(function (index, el) {
                $(this).rules("add", {
                    required: true
                });
            });
            $(".j-val-phone").each(function (index, el) {
                $(this).rules("add", {
                    required: true,
                    phone: 11
                });
            });
        }

        yxk.orders.validateForm = validateForm;
        validateForm();
    };
    // 修改密码页
    yxk.password = function () {
        yxk.G.form();
        // 表单验证
        $("form").validate({
            rules: {
                old_password: {
                    required: true
                },
                new_password: {
                    required: true,
                    minlength: 6
                },
                renew_password: {
                    required: true,
                    minlength: 6,
                    equalTo: "#password"
                }
            }
        });
    };
    yxk.orderList = function () {
        /*取消*/
        $(".j-cancel").click(function () {
            if (window.confirm("是否删除?")) {
                var $that = $(this);
                $.getJSON('/path/to/file', {
                    param1: $that.data("id")
                }, function (json, textStatus) {
                    $that.parents("li").remove();
                });
            }
            return false;
        });
        yxk.G.loading();
        yxk.G.scrollLoading();
    };
    yxk.ordersView = function () {
        var p = {
            dNum: 0,
            sNum: 0,
            state: true,
            sAdultNum: 0, //成人人数
            sChildNum: 0 //儿童人数
        }
        var num = 0;
        //新增的联系人数
        // function changeNewNum() {
        //     $("#j-newNum").val($(".re-newUser").length);
        // }
        //添加新联系人
        function addPerson(type, obj) {
            var index = $("#j-user").children().length + 1; //下一位序列号
            var typeHtml = Number($("#j-moneyBox").data("child")) > 0 ? "" : "disabled";
            var typeHidden = Number($("#j-moneyBox").data("child")) > 0 ? "" : '<input  value="1" type="hidden" name="type_' + num + '">';
            var html = '<ul class="f-list newUser j-userDelete">' + '<li class="f-topTitle">' + '<span class="text">' + index + '</span>' + '<div class="userActive">' + '<a href="javascript:;" class="u-cancel u-btn j-cancel">移除</a>' + '</div>' + '</li>' + '<li>' + '<span class="f-title">姓名*</span>' + '<input type="text" class="f-text j-val-name" placeholder="必填" name="name_' + num + '">' + '</li>' + '<li class="j-type">' + '<span class="f-title">类别*</span>' + '<input type="radio" ' + typeHtml + ' name="type_' + num + '" checked="" value="1"> 成人' + '<input type="radio" ' + typeHtml + ' name="type_' + num + '" value="2"> 儿童' + typeHidden + '</li>' + '<li>' + '<span class="f-title">性别*</span>' + '<input type="radio" value="1" name="sex_' + num + '" checked=""> 男' + '<input type="radio" value="2" name="sex_' + num + '"> 女' + '</li>' + '<li class="j-typeActive">' + '<span class="f-title">手机*</span>' + '<input type="text" class="f-text j-val-phone" placeholder="必填,用于接收订单信息" name="phone_' + num + '">' + '</li>' + '<li class="j-typeActive">' + '<span class="f-title">证件类型*</span>' + '<select class="f-select j-select" name="cardtype_' + num + '">' + '<option selected="" value="1">二代身份证</option>' + '<option value="2">护照</option>' + '<option value="3">港澳通行证</option>' + '<option value="4">台胞证</option>' + '<option value="5">军官证</option>' + ' <option value="6">回乡证</option>' + '<option value="7">其他</option>' + '</select>' + '</li>' + '<li class="j-hide j-typeActive">' + '<span class="f-title">证件号*</span>' + '<input type="text" class="f-text j-val-card" placeholder="必填" name="cardno_' + num + '">' + '</li>' + '<li class="j-show j-typeActive">' + '<span class="f-title">证件号*</span>' + '<input type="text" class="f-text ignore" placeholder="必填" name="cardno2_' + num + '" required="">' + '</li>' + '<li class="childCard">' + '<span class="f-title">护照有效期</span>' + '<input type="date" class="f-text ignore" name="cardexp' + num + '" required="">' + '</li>' + '<li class="j-show j-typeActiveOn">' + '<span class="f-title">生日*</span>' + '<input type="date" class="f-date ignore" name="birthday_' + num + '" required="">' + '</li>' + '</ul>';
            if (type == "1") {
                html = '<ul class="f-list re-newUser j-userDelete singleUser" data-type="' + yxk.G.filterData("type", obj.type) + '" data-checkid="' + obj.checkid + '" id="' + obj.id + '">' + '<li class="f-topTitle">' + '<span class="textInfo">' + obj.name + '<i>' + yxk.G.filterData("type", obj.type) + ' ' + obj.sex + ' ' + obj.cardno + '</i>' + '</span>' + '<input type="hidden" name="mid[]" value="' + obj.val + '" data-type="' + obj.type + '"></input>' + '<div class="userActive">' + '<a href="javascript:;" class="u-cancel u-btn j-cancel">移除</a>' + '</div>' + '</li>' + '</ul>';
            } else {
                num++;
            }
            $(html).appendTo("#j-user").hide(0, function () {
                var $that = $(this);
                $that.show();
                yxk.orders.validateForm();
                // yxk.orders.changePrice();
                // changeNewNum();
            });
        }

        // // 添加一位
        // $("#j-add").click(function(event) {
        //     if (!window.confirm("确定添加一名吗?")) {
        //         return false;
        //     }
        //     addPerson();
        //     return false;
        // });
        // // 删除
        // $("#j-user").on("click", ".j-delete", function(event) {
        //     if (window.confirm("是否要删除?")) {
        //         $(this).parents(".f-list").hide(0, function() {
        //             $(this).remove();
        //             yxk.orders.changePrice();
        //             changeNum();
        //         });
        //     }
        //     event.preventDefault();
        // });
        $.fn.setPeople = function (callback) {
            //绑定选择人数
            function setNum() {
                var inputNum = $('[name="num"]');
                var sNum = $("#j-pNum"); //剩余
                var num = 0;
                $(".j-numF").each(function () {
                    num += window.parseInt($(this).val());
                });
                sNum.text(num - $("#j-user").children().length);
                inputNum.val(num)
                p.dNum = num;
                updatePeopleNum();
                if (typeof callback == "function") {
                    callback();
                }
            }

            $(this).each(function () {
                var num = 0;
                var defNum = 100;
                var that = $(this);
                var minNum = window.parseInt(that.data("minnum"));
                var defaultNum = window.parseInt(that.data("default"));
                if (minNum) {
                    num = minNum;
                }
                if (defaultNum) {
                    num = defaultNum;
                }

                function initNum(val) {
                    if (num == minNum) {
                        that.find(".j-numJ").addClass("hover");
                        that.find(".j-numP").removeClass("hover");
                    } else if (num == defNum) {
                        that.find(".j-numJ").removeClass("hover");
                        that.find(".j-numP").addClass("hover");
                    } else if (num > defNum) {
                        num = defNum;
                        that.find(".j-numJ").removeClass("hover");
                        that.find(".j-numP").addClass("hover");
                    } else {
                        that.find(".j-numJ").removeClass("hover");
                        that.find(".j-numP").removeClass("hover");
                    }
                    // that.find(".j-numP").removeClass("hover");
                    that.find(".j-numF").val(num);
                    setNum();
                }

                initNum(minNum);

                function numP() {
                    if (num == defNum) {
                        return false;
                    }
                    ++num;
                    initNum();
                }

                function numJ() {
                    if (num == minNum) {
                        return false;
                    }
                    --num;
                    initNum();
                }

                that.find(".j-numJ").click(function () {
                    numJ();
                    return false;
                });
                that.find(".j-numF").blur(function () {
                    var t = /^\+?[1-9][0-9]*/g;
                    if (t.test(Number($(this).val()))) {
                        num = $(this).val();
                    } else {
                        num = minNum;
                        $(this).val(minNum);
                    }
                    initNum();
                    return false;
                });
                that.find(".j-numP").click(function () {
                    numP();
                    return false;
                });
            });
        };
        $("#m2_j_otherPrice").on("click", ".j-otherPriceCheckbox", function (event) {
            if ($(this).prop("checked")) {
                $(this).parents(".j-otherPrice").find(".j-otherPriceNumber").val(1).prop("disabled", false);
            } else {
                $(this).parents(".j-otherPrice").find(".j-otherPriceNumber").val(0).prop("disabled", true);
            }
            changePrice();
        });
        $("#m2_j_otherPrice").on("change", ".j-otherPriceNumber", function (event) {
            var s = /^[0-9]*$/g;
            var val = $(this).val();
            var length = val.length;
            if (!(s.test(val) && length > 0)) {
                $(this).val(0);
            }
            changePrice();
        });

        function changePrice() {
            /**
             *     免费:   m_adult =0 && m_child =0
             *   核算中:   m_adult <0 && m_child <0
             * 只有成人:   m_adult >0 && m_child =0
             * 只有小孩:   m_adult =0 && m_child >0
             *     全有:   m_adult >0 && m_child >0
             * @type {[type]}
             */
            var m_adult = Number($("#j-moneyBox").data("adult")); //成人价格
            var m_child = Number($("#j-moneyBox").data("child")); //儿童价格
            var priceState = true; //设置价格
            if (m_adult == 0 && m_child == 0) {
                $("#j-money").text("免费");
                priceState = false;
            }
            if (m_adult < 0 && m_child < 0) {
                $("#j-money").text("核算中");
                priceState = false;
            }
            if (!priceState) {
                return false;
            }
            var m = 0;
            if ($("#j-people").length > 0) {
                m = m + window.parseInt($("#j-people").find(".j-numF").val()) * m_adult; //计算成人价格
            }
            if ($("#j-children").length > 0) {
                m = m + window.parseInt($("#j-children").find(".j-numF").val()) * m_child; //计算儿童价格
            }
            // 主要价格计算
            // $(".j-type").find("input").each(function() {
            //     if ($(this).prop("checked")) {
            //         if ($(this).val() == "1") {
            //             m = m + m_adult;
            //         } else {
            //             m = m + m_child;
            //         }
            //     }
            // });
            // $(".f-topTitle").find("input").each(function() {
            //     if ($(this).data('type') == '1') {
            //         m = m + m_adult;
            //     } else {
            //         m = m + m_child;
            //     }
            // });
            // // 其他价格计算
            if ($(".j-otherPrice").length > 0) {
                $(".j-otherPriceNumber").each(function (index, el) {
                    var num = Number($(this).val());
                    var p = Number($(this).parents(".j-otherPrice").data("price"));
                    m = m + num * p;
                });
            }
            // 修改价格重新计算
            // if ($("#j-user").length > 0) {
            //     $("#j-user").find(".f-list").each(function(index, el) {
            //         var p = Number($(this).data("price"));
            //         if (p) {
            //             m = m + p;
            //         }
            //     });
            // }
            $("#j-money").text(m);
            $("#j-price").val(m);
            return m;
        }

        yxk.orders.changePrice = changePrice;
        changePrice();
        // 取消添加
        $("#j-user").on("click", ".j-cancel", function (event) {
            if (window.confirm("是否移除?")) {
                $(this).parents(".j-userDelete").hide(0, function () {
                    if ($(this).attr("class").indexOf("singleUser") < 0) {
                        num--;
                    } else {
                        $("#" + $(this).data("checkid")).prop("checked", false);
                    }
                    $(this).remove();
                    changeNum();
                    updatePeopleNum();
                });
            }
            event.preventDefault();
        });
        $("#j-people,#j-children").setPeople(changePrice);
        //重新排序联系人
        function changeNum() {
            var num = $("#j-user").children().length;
            // 重置联系人
            $("#j-user").find(".f-topTitle").each(function (index) {
                index++;
                $(this).find(".text").text(index);
            });
        }

        // 常用联系人添加
        $("#j-sideBar").on("click", ".j-checkBox", function () {
            //todo 添加常用联系人修改价格
            var $that = $(this);
            var time = Date.now();
            var checkID = "checkBox" + time;
            var userID = "user" + time;
            if ($that.prop("checked")) {
                addPerson("1", {
                    name: $that.data("name"),
                    val: $that.data("val"),
                    type: $that.data("type"),
                    cardno: $that.data("cardno"),
                    sex: $that.data("sex"),
                    id: userID,
                    checkid: checkID
                });
                updatePeopleNum();
                $that.attr("id", checkID);
                $that.data("userid", userID);
                $that.prop("checked", true);
            } else {
                if (window.confirm("是否移除?")) {
                    $("#" + $that.data("userid")).hide(0, function () {
                        $(this).remove();
                        // yxk.orders.changePrice();
                        changeNum();
                        // changeNewNum();
                        $("#" + $(this).data("checkid")).prop("checked", false);
                        updatePeopleNum();
                    });
                } else {
                    return false;
                }
            }
        });
        // 编辑时初始化
        function editUpdateInit() {
            if ($("#j-user").children().length > 0) {
                $("#j-user").children().each(function (index, el) {
                    var id = Math.random().toString().split(".")[1];
                    $(el).data("checkid", "checkBox" + id);
                    $(el).attr("id", "user" + id);
                    $("#j-sideBar").find('[data-val="' + $(el).data("id") + '"]').prop("checked", true).attr("id", "checkBox" + id).data("userid", "user" + id);
                });
                updatePeopleNum();
            }
            var initId = $("#m2-j-select").val();
            $("#m2-j-select").on('change', function (event) {
                var p = $(this).find("option:selected").data("price").split("^");
                $("#j-moneyBox").data("adult", p[0]).data("child", p[1]);
                $.getJSON($(this).data("url"), {
                    bid: $(this).val(),
                    pid: $(this).data("pid"),
                    oid: $('[name="oid"]').val()
                }, function (json, textStatus) {
                    var html = '';
                    if (json.status > 0) {
                        if (json.data.batch_fees.length == 0) {
                            $("#m2_j_otherPrice").hide();
                            $("#m2_j_otherPrice_content").empty();
                        } else {
                            $.each(json.data.batch_fees, function (index, val) {
                                html += '<div class="item j-otherPrice" data-price="' + val.fee_price + '">' + '<div class="otherPay-checkbox">' + '<input type="checkbox" name="fee_check_' + val.fid + '" value="1" class="j-otherPriceCheckbox">' + '</div>' + '<div class="otherPay-des">' + val.fee_name + '</div>' + '<div class="otherPay-price">' + val.fee_price + '</div>' + '<div class="otherPay-num"><input class="j-otherPriceNumber" name="fee_num_' + val.fid + '" disabled type="number" min="0" value="0"></div>' + '</div>'
                            });
                            $("#m2_j_otherPrice").show();
                            $("#m2_j_otherPrice_content").empty().append(html);
                        }
                    } else {
                        $("#m2-j-select").val(initId).trigger("change");
                        alert(json.msg);
                        return false;
                    }
                    yxk.orders.changePrice();
                });
                event.preventDefault();
            });
        }

        editUpdateInit();

        function updatePeopleNum() {
            p.sNum = p.dNum - $("#j-user").children().length;
            if (p.sNum < 0) {
                $("#j-addByList").addClass("open");
            } else {
                $("#j-addByList").removeClass("open");
                $("#j-pNum").text(p.sNum);
            }
            p.sAdultNum = $('[name="adult_num"]').val() || 0;
            p.sChildNum = $('[name="child_num"]').val() || 0;
        }

        $(".j-submit").unbind().click(function () {
            var isOver = ($("#j-user").children('[data-type="成人"]').length <= p.sAdultNum) && ($("#j-user").children('[data-type="儿童"]').length <= p.sChildNum);
            if ((p.sNum > 0)) {
                if (requirePassenger != 2) {
                    if (window.confirm('您还需要添加' + p.sNum + '位人员,出行人不完善无法付款,确定先提交订单吗?')) {
                        $("#bookForm").submit();
                    }
                } else {
                    $("#bookForm").submit();

                }
            } else if (p.sNum == 0 && isOver) {
                $("#bookForm").submit();
            } else {
                if ($("#j-user").children('[data-type="儿童"]').length > p.sChildNum) {
                    alert("儿童人数添加错误,请检查儿童人数.")
                } else if ($("#j-user").children('[data-type="成人"]').length > p.sAdultNum) {
                    alert("成人人数添加错误,请检查成人人数.")
                } else {
                    alert("出行人数错误");
                }
            }
            return false;
        });
        // 常用列表
        $("#j-addByList").click(function () {
            boxOpen();
            return false;
        });
        // 点击阴影关闭常用列表
        $("#j-shadow").click(function () {
            boxClose();
            return false;
        });
        // 点击取消关闭常用列表
        $("#j-cancel").click(function () {
            boxClose();
            return false;
        });
        // 常用人员列表打开
        function boxOpen() {
            $("#j-sideBar").css("right", "0");
            $("#j-shadow").show(0);
        }

        // 常用人员列表关闭
        function boxClose() {
            $("#j-sideBar").css("right", "-100%");
            $("#j-shadow").hide(0);
        }

        $("#j-adduser").click(function (event) {
            if ($(".j-userOk").length > 0) {
                removeFrom();
                return false;
            }
            $("#j-from").attr("action", AJAX.Updatemember);
            addPersonFrom();
            $("#j-user2").addClass("open");
            return false;
        });

        function removeFrom() {
            $("#j-user2").removeClass("open").empty();
        }

        function addPersonFrom() {
            var html = '';
            html = '<ul class="f-list j-userOk">' + '<li class="f-topTitle">' + '<span class="text">添加常用旅客</span>' + '<div class="userActive">' + '<a href="javascript:;" class="u-ok u-btn j-ok">确定</a>' + '<a href="javascript:;" class="u-cancel u-btn j-cancel">取消</a>' + '</div>' + '</li>' + '<li>' + '<span class="f-title">姓名*</span>' + '<input type="text" class="f-text j-val-name" placeholder="必填" name="name">' + '</li>' + '<li class="j-type">' + '<span class="f-title">类别*</span>' + '<input type="radio" name="type" checked="" value="1"> 成人' + '<input type="radio"  name="type" value="2"> 儿童</li>' + '<li>' + '<span class="f-title">性别*</span>' + '<input type="radio" value="1" name="sex" checked=""> 男' + '<input type="radio" value="2" name="sex"> 女' + '</li>' + '<li class="j-typeActive">' + '<span class="f-title">手机*</span>' + '<input type="text" class="f-text j-val-phone" placeholder="必填,用于接收订单信息" name="phone">' + '</li>' + '<li class="j-typeActive">' + '<span class="f-title">证件类型*</span>' + '<select class="f-select j-select" name="cardtype">' + '<option selected="" value="1">二代身份证</option>' + '<option value="2">护照</option>' + '<option value="3">港澳通行证</option>' + '<option value="4">台胞证</option>' + '<option value="5">军官证</option>' + ' <option value="6">回乡证</option>' + '<option value="7">其他</option>' + '</select>' + '</li>' + '<li class="j-hide j-typeActive">' + '<span class="f-title">证件号*</span>' + '<input type="text" class="f-text j-val-card" placeholder="必填" name="cardno">' + '</li>' + '<li class="j-birth" style="display:none;">' + '<span class="f-title">出生日期</span>' + '<input type="date" class="f-text ignore"  name="birth" required="" value="">' + '</li>' + '<li class="j-show j-typeActive">' + '<span class="f-title">证件号*</span>' + '<input type="text" class="f-text ignore" placeholder="必填" name="cardno2" required="">' + '</li>' + '<li class="childCard">' + '<span class="f-title">护照有效期</span>' + '<input type="date" class="f-text ignore" name="cardexp" required="">' + '</li>' + '</ul>';
            $(html).appendTo("#j-user2").hide(0, function () {
                $(this).show();
                yxk.orders.validateForm(true, true);
            });
        }

        $("#j-user2").on("click", ".j-ok", function () {
            $("#j-from").submit();
            return false;
        });
        $("#j-user2").on("click", ".j-cancel", function () {
            removeFrom();
            return false;
        });
    };
    // 常用联系人
    yxk.users = function () {
        yxk.orders();
        //添加新联系人
        function addPerson(obj) {
            var html = '';
            if (obj) {
                html = '<ul class="f-list j-userOk">' + '<li class="f-topTitle">' + '<span class="text">编辑常用旅客</span>' + '<div class="userActive">' + '<a href="javascript:;" class="u-ok u-btn j-ok">确定</a>' + '<a href="javascript:;" class="u-cancel u-btn j-cancel">取消</a>' + '</div>' + '</li>' + '<li>' + '<span class="f-title">姓名*</span>' + '<input type="text" class="f-text j-val-name" placeholder="必填" name="name" value="' + obj.name + '">' + '</li>' + '<li class="j-type">' + '<span class="f-title">类别*</span>' + '<input type="radio" name="type" ' + (obj.type == "1" ? "checked" : "") + ' value="1"> 成人' + '<input type="radio"  name="type" value="2" ' + (obj.type == "1" ? "" : "checked") + '> 儿童</li>' + '<li>' + '<span class="f-title">性别*</span>' + '<input type="radio" value="1" name="sex" ' + (obj.sex == "1" ? "checked" : "") + '> 男' + '<input type="radio" value="2" name="sex" ' + (obj.sex == "2" ? "checked" : "") + '> 女' + '</li>' + '<li class="j-typeActive">' + '<span class="f-title">手机*</span>' + '<input type="text" class="f-text j-val-phone" placeholder="必填,用于接收订单信息" name="phone" value="' + obj.phone + '">' + '</li>' +
                    '<li class="j-typeActive">' + '<span class="f-title">证件类型*</span>' + '<select class="f-select j-select" name="cardtype">' + '<option value="1">二代身份证</option>' + '<option value="2">护照</option>' + '<option value="3">港澳通行证</option>' + '<option value="4">台胞证</option>' + '<option value="5">军官证</option>' + ' <option value="6">回乡证</option>' + '<option value="7">其他</option>' + '</select>' + '</li>' + '<li class="j-hide j-typeActive">' + '<span class="f-title">证件号*</span>' + '<input type="text" class="f-text j-val-card" placeholder="必填" name="cardno" value="' + obj.cardno + '">' + '</li>' + '<li class="j-birth" style="display:none;">' + '<span class="f-title">出生日期</span>' + '<input type="date" class="f-text ignore"  name="birth" required="" value="' + obj.birthday + '">' + '</li>' +
                    '<li class="j-show j-typeActive">' + '<span class="f-title">证件号*</span>' + '<input type="text" class="f-text ignore" placeholder="必填" name="cardno2" required="">' + '</li>' + '<li class="childCard">' + '<span class="f-title">护照有效期</span>' + '<input type="date" class="f-text ignore"  name="cardexp" required="" value="' + obj.cardexp + '">' + '</li>' + '</ul>';
                html += '<input type="hidden" name="mid" value="' + obj.id + '">'
            } else {
                html = '<ul class="f-list j-userOk">' + '<li class="f-topTitle">' + '<span class="text">添加常用旅客</span>' + '<div class="userActive">' + '<a href="javascript:;" class="u-ok u-btn j-ok">确定</a>' + '<a href="javascript:;" class="u-cancel u-btn j-cancel">取消</a>' + '</div>' + '</li>' + '<li>' + '<span class="f-title">姓名*</span>' + '<input type="text" class="f-text j-val-name" placeholder="必填" name="name">' + '</li>' + '<li class="j-type">' + '<span class="f-title">类别*</span>' + '<input type="radio" name="type" checked="" value="1"> 成人' + '<input type="radio"  name="type" value="2"> 儿童</li>' + '<li>' + '<span class="f-title">性别*</span>' + '<input type="radio" value="1" name="sex" checked=""> 男' + '<input type="radio" value="2" name="sex"> 女' + '</li>' + '<li class="j-typeActive">' + '<span class="f-title">手机*</span>' + '<input type="text" class="f-text j-val-phone" placeholder="必填,用于接收订单信息" name="phone">' + '</li>' +
                    '<li class="j-typeActive">' + '<span class="f-title">证件类型*</span>' + '<select class="f-select j-select" name="cardtype">' + '<option selected="" value="1">二代身份证</option>' + '<option value="2">护照</option>' + '<option value="3">港澳通行证</option>' + '<option value="4">台胞证</option>' + '<option value="5">军官证</option>' + ' <option value="6">回乡证</option>' + '<option value="7">其他</option>' + '</select>' + '</li>' + '<li class="j-hide j-typeActive">' + '<span class="f-title">证件号*</span>' + '<input type="text" class="f-text j-val-card" placeholder="必填" name="cardno">' + '</li>' + '<li class="j-birth" style="display:none;">' + '<span class="f-title">出生日期</span>' + '<input type="date" class="f-text ignore"  name="birth" required="" value="">' + '</li>' +
                    '<li class="j-show j-typeActive">' + '<span class="f-title">证件号*</span>' + '<input type="text" class="f-text ignore" placeholder="必填" name="cardno2" required="">' + '</li>' + '<li class="childCard">' + '<span class="f-title">护照有效期</span>' + '<input type="date" class="f-text ignore"  name="cardexp" required="">' + '</li>' + '</ul>';
            }
            $(html).appendTo("#j-user").hide(0, function () {
                $(this).show();
                if (obj) {
                    $(".j-select").find("option[value=" + obj.cardtype + "]").attr("selected", true);
                }
                yxk.orders.validateForm(true);
            });
            $('.j-select').trigger('change');
        }

        function removeFrom() {
            $("#j-user").removeClass("open").empty();
        }

        $("#j-user").click(function (e) {
            if (e.target.id == "j-user") {
                removeFrom()
            }
        });
        $("#j-adduser").click(function (event) {
            if ($(".j-userOk").length > 0) {
                removeFrom();
                return false;
            }
            $("#j-from").attr("action", AJAX.Updatemember);
            addPerson();
            $("#j-user").addClass("open");
            return false;
        });
        $("#j-user").on("click", ".j-ok", function () {
            $("#j-from").submit();
            return false;
        });
        $("#j-user").on("click", ".j-cancel", function () {
            removeFrom();
            return false;
        });
        $(".j-useredit").click(function (event) {
            var obj = {
                id: $(this).parent().data("id"),
                name: $(this).data("name"),
                sex: $(this).data("sex"),
                type: $(this).data("type"),
                cardtype: $(this).data("cardtype"),
                cardno: $(this).data("cardno"),
                phone: $(this).data("phone"),
                cardexp: $(this).data("cardexp") || '',
                birthday: $(this).data("birthday")
            }
            addPerson(obj);
            $("#j-user").addClass("open");
            $("#j-from").attr("action", AJAX.Updatemember);
            return false;
        });
        $(".j-userdelete").click(function (event) {
            var box = $(this).parent();
            if (window.confirm("是否删除?")) {
                $.getJSON(AJAX.Delmember, {
                    mid: box.data("id")
                }, function (json, textStatus) {
                    if (json.data.status) {
                        box.remove();
                    }
                    console.log(json.msg)
                });
            }
            return false;
        });
    };
})(jQuery, this);