$.ajaxPrefilter(function (options) {
    options.url = "http://api-breakingnews-web.itheima.net" + options.url;

    // 优化
    // options.headers = {
    //     Authoriztion: localStorage.getItem("token"),
    // }

    // 再次优化
    if (options.url.indexOf("/my/") !== -1) {
        options.headers = {
          Authorization: localStorage.getItem("token"),
        };
    }

    // 控制用户访问权限
    options.complete = function (xhr) {
    if (
      xhr.responseJSON.status === 1 &&
      xhr.responseJSON.message === "身份认证失败！"
    ) {
      localStorage.removeItem("token");
      location.href = "login.html";
    }
  };

});
