var selectedEmp;
var errorHappend = false;
$(function () {
    //date picker jquery ui
    setting.intilizateCalender("#from, #to");
    //populate student select
    setting.dropDownPoplute("test.txt", "#emp", "select employee");
  

  
    $("#emp").change(function () {

        if ($(this).val() != "0") {
            $(this).removeClass("inptError");
            $("#messageHolder").empty();
        }
        else {
            $(this).addClass("inptError");
            setting.show_Message(true, "#messageHolder", "\t please select employee");
        }
    });
    $("#to, #from").change(function () {

        if($(this).val().length > 0)
            $("#to, #from").removeClass("inptError");
    });
    $("#emp").change(function () {
        selectedEmp = $(this).val();
        if (selectedEmp == 0) {
            $(this).removeClass("inptError");
            $("#from, #to").val('');
            allEmployess();
        }
    });
    allEmployess();
    function allEmployess() {
        $.get('pro.xml', function (xml) {
            $("#messageHolder").empty();
            var tbl = "<table ><tr><th>Employee Id</th><th>Date</th>\
                        <th>ATime</th><th>LTime</th></th><th>Total Houres</th></tr>";

            $(xml).find("Attendance").each(function () {

                $(this).find("Date").each(function () {
                    var emp_date = $(this).attr("today");
                    $(this).each(function () {
                        $(this).find("Emp").each(function () {
                            var $empAttend = $(this).find("Attend").text();
                            var $empLeave = $(this).find("Leave").text();
                            $empLeave = ($empLeave == "null") ? "16:00" : $empLeave
                            var arrival_calc = cde("09:00", $empAttend);
                            var totalHoures = cde($empAttend, $empLeave);

                            var isLate = (arrival_calc.h >= 0 && arrival_calc.m != 0) ? true : false;
                            var appedCclass = (isLate == true) ? 'class=\'late\'' : '';
                            tbl += "<tr><td>" + ($(this).attr("id")) + "</td><td>" + emp_date + "</td><td " + appedCclass + ">" + $empAttend +
                               "</td><td>" + $empLeave + "</td><td>" + Math.abs(totalHoures.h) + ":" + Math.abs(totalHoures.m) + "</td></tr>";
                        });
                    })
                });
            });
            tbl += "</table>";
            $("#statistic_container").html(tbl);
            
        });
    }
   

    function fromDatefun()
    {
        $.get('pro.xml', function (xml) {
            $("#messageHolder").empty();
            var tbl = "<table class='data-container'><tr><th>Employee Id</th><th>Date</th>\
                        <th>ATime</th><th>LTime</th></th><th>Total Houres</th></tr>";
            var from = $("#from").val();
            var to = $("#to").val();
            $(xml).find("Attendance Date").each(function () {

                var currentDay = $(this).attr("today");
                var CDS = $(this);//current Date selector
                if (Date.parse(currentDay) >= Date.parse(from)) {
                    var foundemp = $(CDS).find("Emp[id=" + selectedEmp + "]");

                    if (foundemp.length > 0) {
                        
                        $empAttend = $(foundemp).find("Attend").text();
                        $empLeave = $(foundemp).find("Leave").text();

                        $empLeave = ($empLeave == "null") ? "16:00" : $empLeave
                        var arrival_calc = cde("09:00", $empAttend);
                        var totalHoures = cde($empAttend, $empLeave);

                        var isLate = (arrival_calc.h >= 0 && arrival_calc.m != 0) ? true : false;
                        var appedCclass = (isLate == true) ? 'class=\'late\'' : '';
                        tbl += "<tr><td>" + selectedEmp + "</td><td>" + currentDay + "</td><td " + appedCclass + ">" + $empAttend +
                               "</td><td>" + $empLeave + "</td><td>" + Math.abs(totalHoures.h) + ":" + Math.abs(totalHoures.m) + "</td></tr>";
                       
                    }

                }//if from
            });//end date
            tbl += "</table>";
            $("#statistic_container").empty().html(tbl);
        });//end loading json
    }
    function toDatefun()
    {
        $.get('pro.xml', function (xml) {
            $("#messageHolder").empty();
            var tbl = "<table class='data-container'><tr><th>Employee Id</th><th>Date</th>\
                        <th>ATime</th><th>LTime</th></th><th>Total Houres</th></tr>";
            
            var to = $("#to").val();
            $(xml).find("Attendance Date").each(function () {

                var currentDay = $(this).attr("today");
                var CDS = $(this);//current Date selector
                if (Date.parse(currentDay) <= Date.parse(to)) {
                    var foundemp = $(CDS).find("Emp[id=" + selectedEmp + "]");

                    if (foundemp.length > 0) {

                        $empAttend = $(foundemp).find("Attend").text();
                        $empLeave = $(foundemp).find("Leave").text();

                        $empLeave = ($empLeave == "null") ? "16:00" : $empLeave
                        var arrival_calc = cde("09:00", $empAttend);
                        var totalHoures = cde($empAttend, $empLeave);

                        var isLate = (arrival_calc.h >= 0 && arrival_calc.m != 0) ? true : false;
                        var appedCclass = (isLate == true) ? 'class=\'late\'' : '';
                        tbl += "<tr><td>" + selectedEmp + "</td><td>" + currentDay + "</td><td " + appedCclass + ">" + $empAttend +
                               "</td><td>" + $empLeave + "</td><td>" + Math.abs(totalHoures.h) + ":" + Math.abs(totalHoures.m) + "</td></tr>";

                    }

                }//if from
            });//end date
            tbl += "</table>";
            $("#statistic_container").empty().html(tbl);
        });//end loading json
    }
    function showRange() {

        $("#messageHolder").empty();
        var fromDate = $("#from").val();
        var toDate = $("#to").val();
        var tbl = "<table class='data-container'><tr><th>Employee Id</th><th>Date</th>\
                        <th>ATime</th><th>LTime</th></th><th>Total Houres</th></tr>";

        $.get('pro.xml', function (d) {
            $(d).find('Date').each(function () {
                var $Emp_date = $(this);
                var emp_date = $Emp_date.attr("today");
                if (Date.parse(emp_date) >= Date.parse(fromDate)
                     && Date.parse(emp_date) <= Date.parse(toDate)) {

                    $Emp_date.find("Emp").each(function () {

                        var $employee = $(this);
                        var $emp_id = $employee.attr("id");
                        if ($emp_id == selectedEmp) {
                            $empAttend = $employee.find("Attend").text();
                            $empLeave = $employee.find("Leave").text();
                            $empLeave = ($empLeave == "null") ? "16:00" : $empLeave
                            var arrival_calc = cde("09:00", $empAttend);
                            var totalHoures = cde($empAttend, $empLeave);

                            var isLate = (arrival_calc.h >= 0 && arrival_calc.m != 0) ? true : false;
                            var appedCclass = (isLate == true) ? 'class=\'late\'' : '';
                            tbl += "<tr><td>" + selectedEmp + "</td><td>" + emp_date + "</td><td " + appedCclass + ">" + $empAttend +
                                   "</td><td>" + $empLeave + "</td><td>" + Math.abs(totalHoures.h) + ":" + Math.abs(totalHoures.m) + "</td></tr>";

                        }//end if found employee
                    });//end loop employess
                }//end check date range
            });//loop date
            tbl += "</table>";
            $("#statistic_container").html(tbl);
            $(".late").effect("highlight");
        });//get request
    }
    $("#insert_btn").click(function (e) {
        e.preventDefault();
        var fromDate = $("#from").val();
        var toDate = $("#to").val();

        if (Date.parse(fromDate) > Date.parse(toDate)) {
            $("#to").focus();
            setting.show_Message(true, "#messageHolder", "\t toDate must be grater than from Date");
            return;
        }
      /* check vaction */

        $.ajax({
            type: 'GET',
            url: 'vactions.txt',
            dataType: 'json',
            async: false,
            success: function (vactions) {
                var selectedFrom = Date.parse( fromDate);
                var selectedTo = Date.parse( toDate);

                for (var i = 0; i < vactions.length; i++) {

                    vacFrom = Date.parse(vactions[i].from);
                    vacTo = Date.parse(vactions[i].to);


                    var firstDate = ((selectedFrom == vacFrom) && (selectedFrom <= vacTo));
                    var SeconDate = ((selectedTo >= vacFrom) && (selectedTo == vacTo));


                    if (firstDate || SeconDate) {

                        errorHappend = true;
                        break;
                    } else {
                        errorHappend = false;
                    }

                }
            }
        });

        if (errorHappend == true) {
            setting.show_Message(true, "#messageHolder", "this day is vaction");
            $("#statistic_container").empty();
            return false;
        }


        $("#messageHolder").empty();




        //inptError
        if ($("#emp").val() == 0)
        {
            $("#emp").addClass("inptError");
            setting.show_Message(true, "#messageHolder", "\t please select employee");
            return;
        }
        if ($("#from").val().length <= 0  && $("#to").val().length<=0)
        {
            $("#from").focus();
            $("#from, #to").addClass("inptError");
            setting.show_Message(true, "#messageHolder", "\t insert at least one date");
            return;
        } else if ($("#from").val().length >0 && $("#to").val().length <= 0)
        {
            $("#from, #to, #emp").removeClass("inptError");
            fromDatefun();
        } else if ($("#from").val().length <= 0 && $("#to").val().length > 0)
        {
            $("#from, #to, #emp").removeClass("inptError");
            toDatefun();
        } else {
            $("#from, #to, #emp").removeClass("inptError");
            showRange();
        }
        $("#from, #to, #emp").removeClass("inptError");
     
        
      
       
    });//btn click
 
    //calculate difference between times
    function cde(dat1, date2) {

        date2 = (date2 == "null") ? "16:00" : date2;
        var dat1 = dat1.split(":");
        var date2 = date2.split(":");
        var dat1M = Number(dat1[1]);
        var dat2M = Number(date2[1]);
        var dat1H = Number(dat1[0]);
        var dat2H = Number(date2[0]);

        var Md = dat2M - dat1M;
        while (Md < 0) {
            dat2H -= 1;
            dat2M += 60;
            Md = dat2M - dat1M;
        }
        var Hd = dat2H - dat1H;
        return { h: Hd, m: Md };
    }
    $("#Excel").click(function (e) {
        setting.WriteExcel("#statistic_container");
        e.preventDefault();
    });
});//end loading main document

