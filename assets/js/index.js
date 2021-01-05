let layer = layui.layer;

function getUserInfo() {
  $.ajax({
    url: "/my/userinfo",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
    success: function (res) {
        console.log(res);

        if (res.atatus !== 0) {
            return layer.msg("获取用户信息失败");
        }

        renderUserInfo(res.data);
    },
  });
}
getUserInfo();

function renderUserInfo(data) {
    console.log(dec);

    let name = data.nickname || data.username;
  
    let first = name[0].toUpperCase();
    console.log(name, first);
  
    // 显示名字
    $("#welcome").text("欢迎" + name);
  
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
    layer.confirm("确认退出吗？", {icon: 3, title:'提示'}, function (index) {
        // console.log(index); // 弹出层的索引

        localStorage.removeItem("token");

        location.href = "/home/login.html";

        layer.close(index); //按照index索引来关闭对应的弹出层
    });
})