var obj = {};
var people = [];
var dialog;
var new_data = '';

$(function () {

    //Load department data
    function getData() {
        $.getJSON("Dept.txt", function (r) {
            if (r.length > 0) {
                people = r;
                var $table = $("#all_data");
                $table.empty();
                $.each(r, function (index, item) {
                    new_data += "<tr id='" + item.id + "'><td>" + item.id + "</td><td>" + item.name + "</td><td><input type='button'  class='del ui-button ui-widget ui-state-default ui-corner-all ui-button-text non-printable' id='" + item.id + "'/></td></tr>";
                });
                $table.append(new_data);
            }//end if 
        });//end json request
    }

    getData();

    function findRepeated(searchKey) {
        var founded = false;
        for (var i = 0; i < people.length; i++) {
            if (people[i].id == searchKey) {
                founded = true;
                break;
            }
        }
        return founded;
    }

    function dept(id, name) {
        this.id = id;
        this.name = name;

    }
    function addDept(){
    //$("#saveBtn").click(function (e) {
    //    e.preventDefault();
    //var empId   = uniqId();
    var deptId = Number($("#deptId").val());
    var deptName = $("#deptName").val();

    //var emp1 = new emp(empId, empName, deptId);
    if (findRepeated(deptId)) {
        setting.show_Message(true, "#mssage", "sorry another department with that id already found in system ");
        return;
    }
    if ( deptId && deptName) {

        people.push(new dept(deptId, deptName));
        obj.jsonStr = JSON.stringify(people);
        obj.path = "D://old data//data//m_courses/iti courses/finalProject/finalProject/Dept.txt";
        //obj.path = "D://iti/finalProject/finalProject/Dept.txt";
        $.ajax({
            type: "POST",
            url: "Save.aspx/WriteJSON",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(obj),
            dataType: "json",
            success: function () {
                new_data = '';
                var $table = $("#all_data");
                $table.empty();
                setTimeout(getData, 1000);
                setting.show_Message(false, "#mssage", "\t saved successfully");

                parent.location.hash = deptId;
            },
            error: function () {
                setting.show_Message(true, "#mssage", "\t failed to save");
            }
        });//end post
    } else {
        setting.show_Message(true, "#mssage", "\t all fields are required and should be valid");
           
    }
    //});//end click 
}


    /* jquery ui part */

    dialog = $("#dialog-form").dialog({
        autoOpen: false,
        height: 400,
        width: 350,
        modal: true,
        //
        buttons: {
            Cancel: function () {
                dialog.dialog("close");
            },
            "create new Department": addDept
        },
        close: function () {
            dialog.dialog("close");
        }
     });
    form = dialog.find("form").on("submit", function (event) {
        event.preventDefault();
        addDept();
    });

    $("#create-user").button().on("click", function () {
        dialog.dialog("open");
    });

    $(document).on("click", ".del", function () {

        if (confirm("are u sure") == false)
            return false;

        var empId = $(this).attr("id");
        empId = Number(empId);

        var data = $.grep(people, function (e) {
            return e.id != empId;
        });
        $(this).hide();

        obj.jsonStr = JSON.stringify(data);
        obj.path = "D://old data//data//m_courses/iti courses/finalProject/finalProject/Dept.txt";
        //obj.path = "D://iti/finalProject/finalProject/Dept.txt";
        // obj.path = "D://iti/test.txt";
        $.ajax({
            type: "POST",
            url: "Save.aspx/WriteJSON",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(obj),
            dataType: "json",
            success: function () {
                new_data = '';
                var $table = $("#all_data");
                $table.empty();
                setTimeout(getData, 1000);
                setting.show_Message(false, "#mssage", "\t saved successfully");

                parent.location.hash = empId-1;
            },
            error: function () {
                setting.show_Message(true, "#mssage", "\t failed to save");
            }
        });//end post




    });//end click event

    $("#Excel").click(function (e) {
        setting.WriteExcel("#users-contain");
        e.preventDefault();
    });


    $("#box").on("keyup", function () {
        var value = $.trim($(this).val().toLowerCase());

        $("table tr").each(function (index) {
            if (index !== 0) {

                $row = $(this);

                var id = $row.find("td:eq(1)").text().toLowerCase();

                if (id.indexOf(value) !== 0) {
                    $row.hide();
                }
                else {
                    $row.show();
                }
            }
        });
    });
});