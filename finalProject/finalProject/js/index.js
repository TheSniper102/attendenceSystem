$(function() {

   // alert(setting.countAbcence(2, "2015-01-17"));
    //setting.countAbcence(2, "2015-01-17");
    var depts = setting.getDepartments();
    var deptsData = [];

    function dept(value, color, highlight, label) {
        this.value = value;
        this.color = color;
        this.highlight = highlight;
        this.label = label;
    }
    function getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    for (var i = 0; i < depts.length;i++) {
        deptsData.push(new dept(
           setting.countEmps( depts[i].id),
           getRandomColor(),
           getRandomColor(),
           depts[i].name

            ));
    }
    //for (var i = 0; i < depts.length; i++) {
    //    deptsData.push(new dept(
    //       setting.countEmps(depts[i].id),
    //       getRandomColor(),
    //       getRandomColor(),
    //       depts[i].name

    //        ));
    //}

    pieData = deptsData;


   

    window.onload = function () {
        var ctx = document.getElementById("chart-area").getContext("2d");
        window.myPie = new Chart(ctx).Pie(deptsData);
         ctx = document.getElementById("chart-area2").getContext("2d");
         window.myPie = new Chart(ctx).Pie(pieData);
         ctx = document.getElementById("chart-area3").getContext("2d");
         window.myPie = new Chart(ctx).Pie(pieData);
         
    };
});