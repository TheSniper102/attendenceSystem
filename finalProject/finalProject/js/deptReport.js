//   var xids = new Array();
var jids = new Array();
var xids = [];
var dids = new Array();
var diff = [];
var errorHappend = false;
$(function () {
    //populate department select
    setting.dropDownPoplute("Dept.txt", "#deptid", "select department");
    //date picker jquery ui
    setting.intilizateCalender("#dttxt");

    $("#show2").click(function () {
        if ($("#deptid").val() != 0) {

            if ($("#dttxt").val() != "") {

                /* Check vaction By date for that department*/
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
                        var selectedDate = Date.parse($("#dttxt").val());

                        for (var i = 0; i < vactions.length; i++) {

                            fromDate = Date.parse(vactions[i].from);
                            toDate = Date.parse(vactions[i].to);
                            Dept= $("#deptid").val();
                          var  DeptVaction = searchValue(Dept, vactions[i].dept);

                            if ((selectedDate <= toDate) && (selectedDate >= fromDate) && DeptVaction) {

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
                    $("#Data").empty();
                    return false;
                }





                /* end check date */
                $("#messageHolder").empty();
                var today = new Array();
                var xmlfile;
                var s = new Array();
                $("#emp").remove();
                var datvl = $("#dttxt").val();
                var deptvl = $("#deptid").val();
                if (datvl != "") {
                    $("#emp").remove();
                    $.ajax({
                        type: "get",
                        url: "pro.xml",
                        cache: false,
                        success: function (r) {
                            xmlfile = r;
                            $(xmlfile).find("Date").each(function () {
                                if ($(this).attr("today") == datvl) {
                                    var em = $(this).find("Emp");
                                    $(em).each(function () {
                                        $emId = $(this).attr("id");

                                        xids.push(Number($emId));
                                    });
                                }
                            });


                            //inner ajax
                            $.ajax({
                                type: "get",
                                url: "test.txt",
                                cash: false,
                                success: function (r) {
                                    $("#emp").remove();
                                    $("#Data").append("<table id='emp' class='data-container'><tr><th>Emp_Id</th><th>Emp_Name</th></tr></tbale>");
                                    s = $.parseJSON(r);
                                    $.each(s, function (j, k) {
                                        jids.push(k.id);
                                    });
                                    $.each(s, function (i, l) {
                                        dids.push(l.dept);
                                    });
                                    // alert(dids);
                                    //ensure that array values are unique
                                    function onlyUnique(value, index, self) {
                                        return self.indexOf(value) === index;
                                    }
                                    //diff = $(jids).not(xids).get();
                                    xids = xids.filter(onlyUnique);

                                    //alert(xids);
                                    var tblrow = '';
                                    $.each(xids, function (i, item) {
                                        for (var i = 0; i < s.length; i++) {
                                            if (item == s[i].id && s[i].dept == deptvl) {
                                                tblrow += "<tr>" + "<td>" + item + "</td><td>" + s[i].name + "</td></tr>";
                                            }
                                        }
                                    });
                                    $(tblrow).appendTo("#emp");

                                },//end of success

                                error: function () { alert("Error") }

                            });//end of ajax
                            //end inner ajax

                        },
                        error: function () { alert("error") }

                    });

                }
                else {

                    setting.show_Message(true, "#messageHolder", "Please enter date");
                    //alert("Please enter date");
                }


            }
            else {
                setting.show_Message(true, "#messageHolder", "Please enter date");
                //alert("Please enter date");
            }
        }
        else {

            setting.show_Message(true, "#messageHolder", "Please select department");

        }



    });//end of clik

});//end of function