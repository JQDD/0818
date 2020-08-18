var pagaStart = 0;
$(function () {







  // 数据初始化
  loadData(pagaStart);
  $("#checkall").click(function () {
    $("input[name='id[]']").each(function () {
      if (this.checked) {
        this.checked = false;
      } else {
        this.checked = true;
      }
    });
  })
  $(".pagelist").find("a").click(function () {
    pageStart = $(this).index();
    loadData(pageStart)
  })
  //   删除
  $("#stu_list").on("click", ".del", function () {
    var username = $(this).parent().siblings(".username").text();
    // console.log($(this).parent().siblings(".username").text());
    var sure = confirm("确定要删除吗？")
    if (sure) {
      $.ajax({
        url: "http://localhost:3000/stu_del", //请求地址
        type: "POST", //请求方式  GET POST
        async: true, //是否异步
        data: {
          name: username
        },
        dataType: "json", //预期的服务器响应的数据类型  
        contentType: "application/x-www-form-urlencoded",
        success: function (response) {
          if (response.msg == "success") {
            alert("删除成功");
            loadData(pageStart);
          } else {
            alert("删除失败，请稍后重试");
          }
        },
        error: function (xhr, status, error) {
          //失败后的回调
          console.log(xhr);
          console.log(status);
          console.log(error);
        },
        complete: function () {
          //无论失败还是成功都会执行   请求完成
          console.log("请求已完成");
        }
      })
    }
  })
  // 编辑
  $("#stu_list").on("click", ".edit", function () {
    $(".mb").stop().slideDown(300)
  }
  // , function () {
  //   $(".mb").stop().slideUp()
  // }
  )
  $("#stu_list").on("click", ".edit", function () {
    var age = $(this).parent().siblings(".age").text();
    oldData = {
      age: age
    }
    $("#age").val(age)
  })
  $("#change_sure").click(function () {
    var age = $("#age").val();
    newData = {
      age: age
    }
    var sure = confirm("确定要修改吗？")
    if (sure) {
      $.ajax({
        url: "http://localhost:3000/stu_change", //请求地址
        type: "POST", //请求方式  GET POST
        async: true, //是否异步
        data: [oldData, newData],
        dataType: "json", //预期的服务器响应的数据类型  
        contentType: "application/x-www-form-urlencoded",
        success: function (response) {
          if (response.msg == "success") {
            alert("修改成功");
            loadData(pageStart);
          } else {
            alert("修改失败，请稍后重试");
          }
        },
        error: function (xhr, status, error) {
          //失败后的回调
          console.log(xhr);
          console.log(status);
          console.log(error);
        },
        complete: function () {
          //无论失败还是成功都会执行   请求完成
          console.log("请求已完成");
        }
      })
    }
  })
})

function loadData(n) {
  $.ajax({
    url: "http://localhost:3000/stu_info", //请求地址
    type: "GET", //请求方式  GET POST
    async: true, //是否异步
    dataType: "json", //预期的服务器响应的数据类型  json  jsonp
    // jsonpCallback: "", //在一个jsonp中规定回调函数的名称
    contentType: "application/x-www-form-urlencoded", //发送数据到服务器时所使用的数据类型
    success: function (response) {
      //成功后的回调
      var model;
      if (response.msg == "success") {
        // console.log(response.data)
        var data = response.data;
        // $("#stu_list").find(".moban").empty();
        $("#stu_list .moban").remove();

        for (var i = (5 * n); i < 5 * (n + 1); i++) {
          model = $("#model").html().replace("$id$", i + 1).replace("$name$", data[i].name).replace("$age$", data[i].age).replace("$tel$", data[i].tel).replace("$email$", data[i].email).replace("$address$", data[i].address).replace("$date$", data[i].date)
          $("#stu_list").append(model);
        }
      } else {
        alert("暂时没有学生信息")
      }
    },
    error: function (xhr, status, error) {
      //失败后的回调
      console.log(xhr);
      console.log(status);
      console.log(error);
    },
    complete: function () {
      //无论失败还是成功都会执行   请求完成
      console.log("请求已完成");
    }
  })
}

function del(id) {
  if (confirm("您确定要删除吗?")) {

  }
}

function DelSelect() {
  var Checkbox = false;
  $("input[name='id[]']").each(function () {
    if (this.checked == true) {
      Checkbox = true;
    }
  });
  if (Checkbox) {
    var t = confirm("您确认要删除选中的内容吗？");
    if (t == false) return false;
  } else {
    alert("请选择您要删除的内容!");
    return false;
  }
}