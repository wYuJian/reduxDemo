
const Cookies = {
    // set: (name, value, time) => {

    // },
    // get: (name) => {

    // },
    // clear: (name) => {

    // }
    /** 设置一条完整的cookie
       *   param name : 表示cookie的名称，必填
       *   param subCookies : 表示cookie的值，为一个对象，必填
       *   param expires : 表示cookie的过期时间，可以不填
       *   param domain : 表示cookie的域名，可以不填
       *   param path : 表示cookie的路径，可以不填
       *   param secure : 表示cookie的安全标志，可以不填
       *   eg : SubCookieUtil.setAll("info", { name : "zhang", age : 23});
       **/
    setAll: function (name, subCookies, expires, domain, path, secure) {
        console.log(expires)
        var cookieText = "", subName, cookieParts = [];
        cookieText += encodeURIComponent(name) + "=";
        for (subName in subCookies) {
            cookieParts.push(encodeURIComponent(subName) + "=" + encodeURIComponent(subCookies[subName]));
        }
        if (cookieParts.length > 0) {
            cookieText += cookieParts.join("&");
            if (expires instanceof Date) {
                cookieText += "; expires=" + expires.toGMTString();
                console.log(cookieText)
            }
            if (path) {
                cookieText += "; path=" + path;
            }
            if (domain) {
                cookieText += "; domain=" + domain;
            }
            if (secure) {
                cookieText += "; secure";
            }
        } else {
            cookieText += "; expires=" + Date(0).toGMTString();
        }
        document.cookie = cookieText;
    },
    /** 设置一条子cookie
    *   param name : 表示cookie的名称，必填
    *   param subName : 表示子cookie的名称，必填
    *   param value : 表示子cookie的值，必填
    *   param expires : 表示cookie的过期时间，可以不填
    *   param domain : 表示cookie的域名，可以不填
    *   param path : 表示cookie的路径，可以不填
    *   param secure : 表示cookie的安全标志，可以不填
    *   eg : SubCookieUtil.set("info", "sex", "boy");
    **/
    set: function (name, subName, value, expires, domain, path, secure) {
        var cookies = this.getAll(name) || {};
        cookies[subName] = value;
        this.setAll(name, cookies, expires, domain, path, secure);
    },
    /** 读取一条完整cookie
    *   param name : 表示cookie的名称，必填
    *   return : 一个cookie对象
    *   eg : SubCookieUtil.getAll("info");
    **/
    getAll: function (name) {
        var cookieName = encodeURIComponent(name) + "=",
            cookieStart = document.cookie.indexOf(cookieName),
            cookieValue = "", i, len, subCookies, parts, result = {};
        if (cookieStart > -1) {
            var cookieEnd = document.cookie.indexOf(";", cookieStart);
            if (cookieEnd == -1) {
                cookieEnd = document.cookie.length;
            }
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
            if (cookieValue.length > 0) {
                subCookies = cookieValue.split("&");
                for (i = 0, len = subCookies.length; i < len; i++) {
                    parts = subCookies[i].split("=");
                    result[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
                }
                return result;
            }
        }
        return null;
    },
    /** 获取一条子cookie的值
    *   param name : 表示cookie的名称，必填
    *   param subName : 表示子cookie的名称
    *   return : 一个子cookie的值
    *   eg : SubCookieUtil.get("info", "name");
    **/
    get: function (name, subName) {
        var cookies = this.getAll(name);
        if (cookies) {
            return cookies[subName];
        } else {
            return null;
        }
    },
    /** 删除一条完整cookie
    *   param name : 表示cookie的名称，必填
    *   param domain : 表示cookie的域名，可以不填
    *   param path : 表示cookie的路径，可以不填
    *   param secure : 表示cookie的安全标志，可以不填
    *   eg : SubCookieUtil.unsetAll("info");
    **/
    unsetAll: function (name, domain, path, secure) {
        this.setAll(name, "", Date(0).toGMTString(), domain, path, secure);
    },
    /** 删除一条子cookie
    *   param name : 表示cookie的名称，必填
    *   param subName : 表示子cookie的名称，必填
    *   param domain : 表示cookie的域名，可以不填
    *   param path : 表示cookie的路径，可以不填
    *   param secure : 表示cookie的安全标志，可以不填
    *   eg : SubCookieUtil.unset("info", "name");
    **/
    unset: function (name, subName, domain, path, secure) {
        var cookies = this.getAll(name);
        if (cookies) {
            delete cookies[subName];
            this.setAll(name, cookies, null, domain, path, secure);
        }
    }
}

const _g = {
    Cookies
}
export default _g;