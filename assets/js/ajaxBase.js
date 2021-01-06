$.ajaxPrefilter(function (options) {

  options.url = "http://api-breakingnews-web.itheima.net" + options.url;

  // 再一次优化
  if (options.url.indexOf("/my") !== -1) {
    // 需要带上身份认证字段的信息
    options.headers = {
      Authorization: localStorage.getItem("token"),
    };
  }

  // 控制用户的访问权限
  options.complete = function (xhr) {

    if (
      xhr.responseJSON.status === 1 && xhr.responseJSON.message === "身份认证失败!"
    ) {
      // 跳转回login页面，需要重新登录才能进入到index页面
      location.href = "/home/login.html";
    }
  };
});
