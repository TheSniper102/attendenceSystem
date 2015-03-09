var xml, emp;
$(function () {
    setting.intilizateCalender("#txt_date");
    $("#Show_Btn").click(function () {
        if ($("#txt_date").val() != "") {


            /* check vaction */
            //check if supplied date >= from and <= to  then vaction

            $.ajax({
                type: 'GET',
                url: 'vactions.txt',
                dataType: 'json',
                async: false,
                success: function (vactions) {
                    var selectedDate = Date.parse($("#txt_date").val());

                    for (var i = 0; i < vactions.length; i++) {

                        fromDate = Date.parse(vactions[i].from);
                        toDate = Date.parse(vactions[i].to);

                        if ((selectedDate <= toDate) && (selectedDate >= fromDate)) {

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
                $("#data").empty();
                return false;
            }


            /////



            $("#messageHolder").empty();
            $.ajax({
                url: "test.txt",
                success: function (r) {
                    emp = $.parseJSON(r);
                    //alert(emp);
                },
                error: function () {
                    alert("error");
                }
            });
            $.ajax({
                url: "pro.xml",
                success: function (r) {
                    xml = $(r).find("Date");

                    $("#datatbl").remove();

                    $("#data").append("<table id='datatbl' class='data-container'><tr><th>ID</th><th>Name</th><th>ATime</th><th>LTime</th><th>Hours</th></tr></table>");
                    $(xml).each(function () {

                        if ($("#txt_date").val() == $(this).attr("today")) {

                            $(this).find("Emp").each(function () {
                                var name;
                                for (var i = 0; i < emp.length; i++) {
                                    if (parseInt($(this).attr("id")) == emp[i].id) {
                                        name = emp[i].name;
                                    }
                                }
                                attend = $(this).find("Attend").text();
                                leave = $(this).find("Leave").text();
                                if ($(this).find("Leave").text() == "null") {
                                    $("#datatbl").append("<tr><td>" + $(this).attr("id") +
                                  "</td><td>" + name + "</td><td>" + $(this).find("Attend").text() +
                                  "</td><td>no leave</td><td> </td></tr>");

                                }
                                else {

                                    //////____________ leave-attend___________________/////
                                    var m = 0;
                                    var h = 0;
                                    var hours_leave = leave.substr(0, leave.indexOf(":"));
                                    var mins_leave = leave.substr(leave.indexOf(":") + 1, leave.length);
                                    var hours_attend = attend.substr(0, attend.indexOf(":"));
                                    var mins_attend = attend.substr(attend.indexOf(":") + 1, attend.length);
                                    var diffm = '00';
                                    var diffh = 0;


                                    if (mins_attend > mins_leave) {
                                        m = (mins_leave) + 60;
                                        h = (hours_leave) - 1;
                                        diffm = (m) - (mins_attend);
                                        diffh = (h) - (hours_attend);
                                    }
                                    else if (mins_attend <= mins_leave) {


                                        diffm = (mins_leave) - (mins_attend);
                                        diffh = (hours_leave) - (hours_attend);
                                    }
                                    $("#datatbl").append("<tr><td>" + $(this).attr("id") +
                                   "</td><td>" + name + "</td><td>" + $(this).find("Attend").text() +
                                   "</td><td>" + $(this).find("Leave").text() + "</td><td>" + diffh + ':' + diffm + "</td></tr>");

                                }

                                if (parseInt(attend.substr(0, attend.indexOf(":"))) == 9)
                                {

                                    if (parseInt(attend.substr(attend.indexOf(":") + 1, attend.length)) > 0) {

                                        //$("#datatbl tr:last td").not("td:eq(2)").addClass("Attenderror");
                                        $("#datatbl tr:last td:eq(2)").addClass("Attendlate");
                                    }
                                }
                                else if (parseInt(attend.substr(0, attend.indexOf(":"))) > 9) {

                                   
                                        //$("#datatbl tr:last td").not("td:eq(2)").addClass("Attenderror");
                                        $("#datatbl tr:last td:eq(2)").addClass("Attendlate");
                                    
                                }

                               


                            });
                        }
                    });
                },
                error: function () {
                    alert("error");
                },
                cache: false
            });

        }
        else {
            setting.show_Message(true, "#messageHolder", "Please enter date");
            $("#txt_date").focus();

        }
    });

});

