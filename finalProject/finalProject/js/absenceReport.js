//   var xids = new Array();
var jids = new Array();
var diff = [];
var errorHappend = false;
$(function () {
    $("#show2").click(function () {

        /* check vaction */
        //check if supplied date >= from and <= to  then vaction
        
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

                    if ((selectedDate <= toDate) && (selectedDate >= fromDate)) {
                       
                        errorHappend = true;
                        break;
                    } else {
                        errorHappend = false;
                    }

                }
            }
        });

        if (errorHappend == true)
        {
            setting.show_Message(true, "#messageHolder", "this day is vaction");
            $("#Data").empty();
            return false;
        }


        $("#messageHolder").empty();
        /////
        var xids = new Array();
        var today = new Array();
        var xmlfile;
        var s = new Array();
        $("#emp").remove();
        var datvl = $("#dttxt").val();
        if (datvl != "") {
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
                        cache: false,
                        success: function (r) {
                            $("#emp").remove();
                            $("#Data").append("<table id='emp' class='data-container'><tr><th>Emp_Id</th><th>Emp_Name</th><th>Emp_Dept</th></tr></tbale>");
                            s = $.parseJSON(r);
                            $.each(s, function (j, k) {
                                jids.push(k.id);
                            });
                            //ensure that array values are unique
                            function onlyUnique(value, index, self) {
                                return self.indexOf(value) === index;
                            }
                            diff = $(jids).not(xids).get();
                            diff = diff.filter(onlyUnique);
                            var tblrow = '';
                            $.each(diff, function (i, item) {
                                for (var i = 0; i < s.length; i++) {
                                    if (item == s[i].id) {
                                        tblrow += "<tr>" + "<td>" + item + "</td><td>" + s[i].name + "</td><td>" + s[i].dept + "</td></tr>";
                                    }
                                }
                            });
                            $(tblrow).appendTo("#emp");
                            //$.each(s, function (i, item) {
                            //    if(jQuery.inArray(item.id,diff) != -1)
                            //    {
                            //        tblrow += "<tr>" + "<td>" + item.id + "</td><td>" + item.name + "</td><td>" + item.dept + "</td></tr>";
                            //    }
                            //}); 
                        },//end of success

                        error: function () { alert("Error") }

                    });//end of ajax
                    //end inner ajax

                },
                error: function () { alert("error") }

            });

        }
        else {
            $("#dttxt").focus();
            setting.show_Message(true, "#messageHolder", "Please Enter date");
        }
    });//end of clik
    setting.intilizateCalender("#dttxt");
});//end of function



       
