$(function () {

    let form = layui.form;
    let layer = layui.layer;
  
    form.verify({
      // 昵称
      nickname: (value) => {
        console.log(value);
  
        if (value.length > 6) {
          return "昵称的长度需要在1-6字符之间";
        }
      },
    });
    
  getInfo();
  function getInfo() {
    // 发送ajax请求， 获取用户的基本信息
    $.ajax({
      url: "/my/userinfo",
      success: function (res) {
        // console.log(res);

        if (res.status !== 0) {
          return layer.msg("修改用户信息失败！");
        }
        // console.log(res.data);
        // 给表单赋值
        form.val("form", res.data);
      },
    });
  };

    // 重置功能
    $("#resetBtn").click(function (e) {
      e.preventDefault();

      getInfo();
    });

    $("#form").on("submit", function (e) {
      e.preventDefault();

      let data = $(this).serialize();

      $.ajax({
        url: "/my/userinfo",
        type: "POST",
        data,
        success: function (res) {
          if (res.status !== 0) {
            return layer.msg("修改用户信息失败！");
          }

          // 子页面user_info 无法直接来获取到父页面index的元素
          // window.parent 可以找到父页面的window对象
          // 调用父页面的getUserInfo函数
          window.parent.getUserInfo();

          layer.msg("修改用户信息成功！");
        }
      });
    });
});
