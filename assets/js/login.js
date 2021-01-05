$(function (){
    // 去注册账号
    $("#gotoRegi").click(function () {
      $(".register").show();  
      $(".login").hide();
    });
  
    // 去登录
    $("#gotoLogin").click(function () {
      $(".register").hide();  
      $(".login").show();
    });
  
  
    // 添加自定义校验规则
    let form = layui.form;
    form.verify({    
      pass: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
  
      repwd: function (value, item) {
      let pwd = $(".register [name=password]").val(); 
        if (value !== pwd) {
          return "密码不一致";
        }
      },
    }); 
  
    // 实现注册功能
    let layer = layui.layer;
  
    $("#regiForm").on("submit", function (e) {
      e.preventDefault();
  
      let data = $(this).serialize();

      $.ajax({
          type: "POST",
          url: "/api/reguser",
          data,
          success: function (res) {  
              if (res.status !== 0) {
                  // 注册失败
                  return layer.msg(res.message);
              }
              layer.msg("注册成功");
  
              // 注册成功之后，需要触发
              $("#gotoLogin").click();
          }
      })
    })
  
    // 实现登录功能
    $("#loginForm").on("submit", function (e) {
  
      e.preventDefault();
  
      let data = $(this).serialize();
  
      $.ajax({
          type: "POST",
          url: "/api/login",
          data,
          success: function (res) {
              console.log(res);
  
              if (res.status !== 0) {
                  // 注册失败
                  return layer.msg("注册失败");
              }

              localStorage.setItem("token", res.token);
  
              // 延时跳转：等弹出框关闭了才去跳转
              layer.msg("注册成功，即将跳转到首页", function(){
                // 跳转页面 
                location.href = "/home//index.html";
              }); 
          },
      });
    });
  
  });