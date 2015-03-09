var errorHappend = false;
$(function () {

    setting.intilizateCalender("#from_txt, #to_txt");
    var date = new Date();
    date = date.toISOString();
    var currdate = date.substr(0, date.indexOf("T"));
    $("#to_txt").val(currdate);

   
});
//====fill department drop down list========================= 
var dept;
var emp;
var xml;
$.ajax({
    url: "test.txt",
    success: function (r) { emp = $.parseJSON(r); },
    error: function () { alert("Error in loading employee json file"); },

    cache: false
});
$.ajax({
    url: "pro.xml",
    success: function (r) {
        xml = $(r).find("Date");


    },
    error: function () { alert("Error in loading xml file"); },

    cache: false
});
$(function () {
    $.ajax({
        url: "Dept.txt",
        success: function (r) {
            dept = $.parseJSON(r);
            for (var i = 0; i < dept.length; i++) {
                $("#sel_dept").append("<option value=" + dept[i].id + ">" + dept[i].name + "</option>");
            }
        },
        error: function () {
            alert("error in loading json file.")
        },
        cashe: false
    });

});
$(function () {
    $("#show_btn").click(function () {
        $("#messageHolder").empty();
        if ($("#from_txt").val() != "") {
            if ($("#to_txt").val() != "") {
                /* vactions */
                function searchValue(SearchKey, SearchArray) {

                    var arr1 = $.map(SearchArray, function (el) { return el; })
                    if (jQuery.inArray(SearchKey, arr1) !== -1)
                        return true;
                    return false;
                }

                $.ajax({
                    type: 'GET',
                    url: 'vactions.txt',
                    dataType: 'json',
                    async: false,
                    success: function (vactions) {
                        var selectedFrom = Date.parse($("#from_txt").val());
                        var selectedTo = Date.parse($("#to_txt").val());
                        Dept = $("#sel_dept").val();
                      
                        for (var i = 0; i < vactions.length; i++) {

                            vacFrom = Date.parse(vactions[i].from);
                            vacTo = Date.parse(vactions[i].to);


                            var firstDate = ((selectedFrom == vacFrom) && (selectedFrom <= vacTo));




                            var SeconDate = ((selectedTo >= vacFrom) && (selectedTo == vacTo));
                            
                            var DeptVaction = searchValue(Dept, vactions[i].dept);

                      
                            if (DeptVaction && (firstDate || SeconDate)) {
                               
                                errorHappend = true;
                                break;
                            } else {
                                errorHappend = false;
                            }

                        }
                    }
                });

                if (errorHappend == true) {
                    setting.show_Message(true, "#messageHolder", " work off in these days");
                    $("#data_div").empty();
                    return false;
                }


                $("#messageHolder").empty();

                /* end vaction */
                //====get values=================================
                var from = $("#from_txt").val();
                var to = $("#to_txt").val();
                var dept_id = $("#sel_dept").val();
                //===============================================
                var id, name, attend, leave;
                var diffh, diffm;
                var did;
                var dd = "";
                if (Date.parse(from) < Date.parse(to)) {
                    $("#data_tbl").remove();
                    $("#data_div").append("<table id='data_tbl' class='data-container'><tr><th>Date</th><th>ID</th><th>Name</th><th>ATime</th><th>LTime</th><th>Hours</th></tr></table>");

                    $(xml).each(function () {

                        if (Date.parse($(this).attr("today")) >= Date.parse(from) && Date.parse($(this).attr("today")) <= Date.parse(to)) {
                            dd = $(this).attr("today");

                            $(this).find("Emp").each(function () {
                                id = $(this).attr("id");
                                attend = $(this).find("Attend").text();
                                leave = $(this).find("Leave").text();
                                for (var i = 0; i < emp.length; i++) {
                                    if (parseInt(id) == emp[i].id) {
                                        name = emp[i].name;
                                        did = emp[i].dept;
                                    }
                                }
                                if (leave == "null") {
                                    leave = "No Leave";
                                    diffh = diffm = "";
                                }
                                else {
                                    var m = 0;
                                    var h = 0;
                                    var hours_leave = leave.substr(0, leave.indexOf(":"));
                                    var mins_leave = leave.substr(leave.indexOf(":") + 1, leave.length);
                                    var hours_attend = attend.substr(0, attend.indexOf(":"));
                                    var mins_attend = attend.substr(attend.indexOf(":") + 1, attend.length);
                                    diffm = '00';
                                    diffh = 0;


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
                                }
                                if (dept_id == did) {
                                    $("#data_tbl").append("<tr><td>" + dd + "</td><td>" + id + "</td><td>" + name + "</td><td>" + attend + "</td><td>" + leave + "</td><td>" + diffh + ':' + diffm + "</td></tr>");
                                    if (parseInt(attend.substr(0, attend.indexOf(":"))) > 9) {

                                        //$("#datatbl tr:last td").not("td:eq(2)").addClass("Attenderror");
                                        $("#data_tbl tr:last td:eq(3)").addClass("Attendlate");


                                    }
                                    else if (parseInt(attend.substr(0, attend.indexOf(":"))) == 9) {

                                        if (parseInt(attend.substr(attend.indexOf(":") + 1), attend.length) > 0) {
                                            //$("#datatbl tr:last td").not("td:eq(2)").addClass("Attenderror");
                                            $("#data_tbl tr:last td:eq(3)").addClass("Attendlate");
                                        }
                                    }
                                }
                            });



                        }

                    });
                }
                else {
                    setting.show_Message(true, "#messageHolder", "[To] date must be before [From] date");
                    return false;
                }
                //===========flags===============




            }
            else {
                setting.show_Message(true, "#messageHolder", "Please Enter [To] date");
                $("#to_txt").focus();
            }
        }
        else {
            setting.show_Message(true, "#messageHolder", "Please Enter [From] date");
            $("#from_txt").focus();
        }

    });

});




