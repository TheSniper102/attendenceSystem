﻿var emp;
var xml;
var dates = new Array();
var flag = false;
var obj = {};
var xmlstr = "";
obj.xmlStr = "";
obj.path = "";
var found = "";
var errorHappend = false;

$(function () {

    //============fill ddl===================
    //populate employee select
    setting.dropDownPoplute("test.txt", "#sel_name", "select employee");
    //=============select name ==> fill id===============

    $("#sel_name").change(function () {

        $("#txt_id").val(($(this).val() == 0) ? "" : $(this).val());
    });

    $("#txt_id").change(function () {
        if ($(this).val() == "")
            setting.show_Message(true, "#messafeHolder", "you left employee id blanck");
        $("#sel_name").val($(this).val());
    });

    $.get("pro.xml", function (r) { xml = r; });

    //========click==============
    $("#btn_save").click(function () {
        if ($("#sel_name").val() != "0" && $("#sel_name").val()) {
            flag = false;
            var de = $("#txt_ctdate").val().substr(0, 10);
            var CurrTime = $("#txt_ctdate").val().substr(11, ($("#txt_ctdate").val()).length);
            var TimeArr = CurrTime.split(":");
            var date = de.split("-", 3);
            var today = date[0] + "-" + date[1] + "-" + date[2];

            
           
            state = $("#sel_state").val();
            //work off after 14:00 
            //if (TimeArr[0] > 14 || (TimeArr[0] == 14 && TimeArr[1] != "00"))
            //{
            //    setting.show_Message(true, "#messageHolder", "it is "+TimeArr[0]+":"+TimeArr[1]+"\t sorry the work is off");
            //    return false;

            //}
            
        
            /* search to check if dept have  vacation or empId*/
            $.ajax({
                type: 'GET',
                url: 'vactions.txt',
                dataType: 'json',
                async: false,
                success: function (vactions) {
                    var emp = $("#sel_name").val();
                    for (var i = 0; i < vactions.length; i++) {
                       
                        var empDept = setting.getEmpDept(Number(emp));

                        DeptVaction = searchValue(empDept, vactions[i].dept);
                        EmpVaction  = searchValue(emp, vactions[i].emp);

                        if ((today == vactions[i].from) && (DeptVaction || EmpVaction)) {
                            errorHappend = true;
                            break;
                        } else {
                            errorHappend = false;
                        }

                    }
                }
            });

           
            function searchValue(SearchKey,SearchArray)
            {
               
                var arr1 = $.map(SearchArray, function (el) { return el; })
                if (jQuery.inArray(SearchKey, arr1) !== -1)
                    return true;
                return false;
            }
            if (errorHappend === true)
            {
                setting.show_Message(true, "#messageHolder", "this Employee have vaction today");
                return false;
            }

            $(xml).find("Date").each(function () {

                dates.push($(this).attr("today"));
            });
            for (var i = 0; i < dates.length; i++) {
                if (dates[i] == today) {
                    flag = true;
                    break;
                }
            }
            if (flag)//========today found
            {


                $(xml).find("Attendance").find("Date").each(function () {
                    if ($(this).attr("today") == today) {
                        var tdy = $(this);
                        var seleVal = $("#sel_name").val();

                        var employees = $(tdy).find("Emp[id=" + seleVal + "]");

                        if (employees.length > 0)//employee found
                        {

                            if (state == "1")//attendance
                            {
                                setting.show_Message(true, "#messageHolder", $("#sel_name option:selected").text() + " already attended");
                                

                            }
                            else if (state == "2")//leaving
                            {
                                if (employees.find("Leave").text() == "null") {
                                    $(this).find("Emp[id=" + seleVal + "] Leave").text(TimeArr[0] + ":" + TimeArr[1]);
                                    saveEmp();
                                    setting.show_Message(false, "#messageHolder", $("#sel_name option:selected").text() + " left at " + TimeArr[0] + ":" + TimeArr[1]);

                                } else
                                    setting.show_Message(true, "#messageHolder", $("#sel_name option:selected").text() + " already left");
                            }
                        }
                        else //===employee not found
                        {
                            if (state == "1") {
                                xmlstr = "<Emp id=\"" + $("#txt_id").val() + "\"><Attend>" + TimeArr[0] + ":" + TimeArr[1] + "</Attend><Leave>null</Leave></Emp>";
                                $(this).append(xmlstr);
                                saveEmp();
                                setting.show_Message(false, "#messageHolder", $("#sel_name option:selected").text() + " attended at " + TimeArr[0] + ":" + TimeArr[1]);
                               
                            } else
                                setting.show_Message(true, "#messageHolder", $("#sel_name option:selected").text() + "  not found here attend first");

                        }

                    }//if today

                });

            }
            else//============today not found
            {

                if (state == "1") {

                    xmlstr = "<Date today=\"" + today + "\"><Emp id=\"" + $("#txt_id").val() + "\"><Attend>" + TimeArr[0] + ":" + TimeArr[1] + "</Attend><Leave>null</Leave></Emp></Date>";
                    $(xml).find("Attendance").append(xmlstr);
                    saveEmp();
                    setting.show_Message(false, "#messageHolder", $("#sel_name option:selected").text() + " attended at " + TimeArr[0] + ":" + TimeArr[1]);
                }
                else
                    setting.show_Message(true, "#messageHolder", "Please change state to attendance");
                $("#sel_state").focus();
               
            }
        }
        else {
            setting.show_Message(true, "#messageHolder", "Please select employee name");
            $("#sel_name").focus();
        }

    });//===end of click
    function saveEmp() {
        obj.xmlStr = "<Attendance>" + $(xml).find("Attendance").html() + "</Attendance>";
        obj.path = "D://old data//data//m_courses/iti courses/finalProject/finalProject/pro.xml";
        //obj.path = "D://iti/finalProject/finalProject/pro.xml";

        $.ajax({
            type: "POST",
            url: "Save.aspx/WriteXML",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(obj),
            dataType: "json",
            cache: false,
            success: function (r) {
                //alert("success in saving xml");

            },
            error: function () {
                setting.show_Message(true, "#messageHolder", "Error in saving xml");
            }
        });//end of save
    }
});

function datefn() {
    d = new Date();
    $("#txt_ctdate").val(d.toISOString());

}
setInterval("datefn();", 1000);