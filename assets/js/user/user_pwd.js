$(function () {

  let form = layui.form;
  let layer = layui.layer;

  form.verify({

    pass: [/^\S{6,12}$/, "密码必须6到12位，且不能出现空格"],

    newpass: function (value) {

      // 获取到原密码的值
      let oldPwd = $("[name=oldPwd]").val();
      console.log(value);
      console.log(oldPwd);
      if (value === oldPwd) {
          return "新密码不能和原密码一样";
      }
    },

    repass: function (value) {
    
      let newPwd = $("[name=newPwd]").val();
      console.log(value);
      console.log(newPwd);
      
      if (value !== newPwd) {
          return "再次输入的密码不一致";
      }
    },
  });

  // 实现密码的修改
  $("#form").on("submit", function (e) {
    e.preventDefault();

    let data = $(this).serialize();

    $.ajax({
      type: "POST",
      url: "/my/updatepwd",
      data,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        };

        layer.msg("更新密码成功");

        // 重置表单
        $("#form")[0].reset();

      },
    });
  });
});
