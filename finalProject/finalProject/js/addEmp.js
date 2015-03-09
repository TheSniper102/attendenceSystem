var obj = {};
var people = [];
var dialog;
var new_data = '';

$(function () {
    //populate department select
    setting.dropDownPoplute("Dept.txt", "#dept", "select department");
    function getData() {
        $.getJSON("test.txt", function (r) {
            if (r.length > 0) {
                people = r;
                var $table = $("#all_data");
                $table.empty();
                $.each(r, function (index, item) {
                    new_data += "<tr id='" + item.id + "'><td>" + item.id + "</td><td>" + item.name + "</td><td>" + item.dept + "</td><td><input type='button'  class='del ui-button ui-widget ui-state-default ui-corner-all ui-button-text non-printable' id='" + item.id + "' /></td></tr>";
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

    function emp(id, name, dept) {
        this.id = id;
        this.name = name;
        this.dept = dept;
    }

    function addUser(){
    //$("#saveBtn").click(function (e) {
    //    e.preventDefault();
        //var empId   = uniqId();
        var empId = Number($("#empId").val());
        var empName = $("#empName").val();
        var deptId = $("#dept").val();
    
        if (findRepeated(empId)) {
            setting.show_Message(true, "#mssage", "sorry another employee with that id already found in system ");
            return;
        }
        if (deptId == "0") {
            setting.show_Message(true, "#mssage", "Please select department");
            return;
        }
        if (empId && empName && deptId) {

            people.push(new emp(empId, empName, deptId));
            obj.jsonStr = JSON.stringify(people);
            obj.path = "D://old data//data//m_courses/iti courses/finalProject/finalProject/test.txt";
            //obj.path = "D://iti/finalProject/finalProject/test.txt";
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
                   
                    parent.location.hash = empId;
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

        buttons: {
            Cancel: function () {
                dialog.dialog("close");
            },
            "create new Employee": addUser
        },
        close: function () {
            dialog.dialog("close");
        }
    });
    form = dialog.find("form").on("submit", function (event) {
        event.preventDefault();
        addUser();
    });
    $("#create-user").button().on("click", function () {
        dialog.dialog("open");
    });
    //delete user
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
        obj.path = "D://old data//data//m_courses/iti courses/finalProject/finalProject/test.txt";
        // obj.path = "D://iti/test.txt";

        //obj.path = "D://iti/finalProject/finalProject/test.txt";
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


   /* end jquery ui */
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