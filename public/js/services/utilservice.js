(function (app) {
    //工具类服务
    app.factory("util", function () {
        var obj = {
            trim: function (e) {
                var e = e.replace(/^\s\s*/, ""),
                    t = /\s/,
                    i = e.length;
                while (t.test(e.charAt(--i)));
                return e.slice(0, i + 1)
            },
            rtrim: function (e, t) {
                if (e[e.length - 1] === t) return e.substr(0, e.length - 1);
                return e
            },
            format: function () {
                if (arguments.length == 0) return "";
                if (arguments.length == 1) return arguments[0];
                var e = arguments[0];
                var t = Array.prototype.slice.call(arguments).splice(1);
                return e.replace(/{(\d+)}/g, function () {
                    return t[arguments[1]]
                })
            },
            empty: function (t) {
                if (!t) return true;
                if (Array.isArray(t) && t.length == 0) return true;
                for (var i in t) if (t.hasOwnProperty(i)) return false;
                return false;
            },
            sub: function (e, t, i) {
                i = i || "";
                var o = /[^\x00-\xff]/g;
                if (e.replace(o, "mm").length <= t) return e;
                var n = Math.floor(t / 2);
                for (var a = n; a < e.length; a++) {
                    if (e.substr(0, a).replace(o, "mm").length >= t) return e.substr(0, a) + i
                }
                return e
            },
            test: function (e, t) {
                return new RegExp(e, "i").test(t)
            },
            leftPad: function (e, t, i) {
                return Array(t - String(e).length + 1).join(i || "0") + e
            },
            unixTime: function (e) {
                e = e || new Date;
                return Math.round(+e / 1e3)
            },
            extend: function (e, t) {
                if (!t || typeof t !== "object") return e;
                var i = Object.keys(t);
                var o = i.length;
                while (o--) e[i[o]] = t[i[o]];
                return e
            },
            isString: function (e) {
                return Object.prototype.toString.call(e) === "[object String]"
            },
            isFunction: function (e) {
                return typeof e === "function"
            },
            isObject: function (e) {
                return typeof e === "object"
            },
            isArray: function (e) {
                return Array.isArray(e)
            },
            rand: function (e, t) {
                return Math.floor(Math.random() * (t - e)) + e
            },
            isMobile: function (e) {
                return e.match(/^(^(13\d|14[57]|15[^4,\D]|17[678]|18\d)\d{8}|170[059]\d{7})$/gi)
            }
        };
        return obj;
    });
  
})(angular.module('app.services'));