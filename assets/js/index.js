let layer = layui.layer;
// getUserInfo需要是全局的，不然获取不到window对象
function getUserInfo() {
  $.ajax({
    url: "/my/userinfo",

    success: function (res) {
      // console.log(res);

      if (res.status !== 0) {
        // 获取用户信息失败
        return layer.msg("获取用户信息失败");
      }
// console.log(res.data);
      // 通过renderUserInfo函数可以将头像和昵称渲染出来
      renderUserInfo(res.data);
    },

  });
}
getUserInfo();

function renderUserInfo(data) {
  // console.log(data);

  let name = data.nickname || data.username;

  // 把名字中的第一个字符取出来转大写，作为文字头像
  let first = name[0].toUpperCase();
  // console.log(name, first);

  // 显示名字
  $("#welcome").text("欢迎 " + name);

  // 在处理头像
  if (data.user_pic) {
    // 展示用户的图片头像, 隐藏文字头像
    $(".layui-nav-img").attr("src", data.user_pic).show();
    $(".text-avatar").hide();
  } else {
    // 说明没有用户的图片头像，需要隐藏用户的图片头像，显示出文字头像
    $(".layui-nav-img").hide();
    $(".text-avatar").text(first).show();
  }
}

// 实现退出功能
$("#logoutBtn").click(function () {
  layer.confirm("确认退出吗?", { icon: 3, title: "提示" }, function (index) {

    localStorage.removeItem("token");

    location.href = "/home/login.html";

    layer.close(index);
  });
});
