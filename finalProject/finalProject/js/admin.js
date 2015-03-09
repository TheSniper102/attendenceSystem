$(function () {
    $(".subMenu").hide();
    $(".toogle").click(function () {
        $(".navbar").toggle(1000);
    });
    $(".TreeMenu").click(function () {
        $(".subMenu").toggle();
        return false;
    });
  




});