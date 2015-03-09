var obj = {};
var vactions = [];
var dialog;
var new_data = '';
var newIndex=1;
$(function () {

    /*
     todo
     remove table class for export excel to work  
      
    */
    //populate department select
    setting.dropDownPoplute("Dept.txt", "#dept", "select department");
    setting.dropDownPoplute("test.txt", "#emp", "select employee");
    setting.intilizateCalender("#from, #to");
    $(".emp, .dept").hide();

    function getData() {
        $.getJSON("vactions.txt", function (r) {
            if (r.length > 0) {
                vactions = r;
                var $table = $("#all_data");
                $table.empty();
                
                $.each(r, function (index, item) {
                    new_data += "<tr id='" + item.id + "'><td><input type='text' class='edit' value='" + item.from + "'/></td><td><input type='text' value='" + item.to + "'/></td><td><input type='text' value='" + item.emp + "'/></td><td><input type='text' value='" + item.dept + "'/></td><td><input type='button'  class='del ui-button ui-widget ui-state-default ui-corner-all ui-button-text non-printable' id='" + item.id + "' /></td></tr>";

                    if (index == (r.length - 1)) 
                        newIndex = (newIndex >= 1) ? (item.id + 1) : 1;
                    
                });
                $table.append(new_data);
            }//end if 
        });//end json request
    }
    getData();

  
    
     $("#selemp").click(function () {
         $("#dept").val(0);
         $(".emp").show();
         $(".dept").hide();
     });
     $("#seldept").click(function () {
         $("#emp").val(0);
         $(".dept").show();
         $(".emp").hide();
     });
     

    function findRepeated(searchDate,searchEmp,searchDept) {
        var foundEmpId,foundDept;
        var haveVaction = false;
        
        for (var i = 0; i < vactions.length; i++) {
            
            if (searchEmp != 0) {
                foundEmpId = compareObjects(vactions[i].emp, searchEmp);
            } else {
                foundEmpId = false;
            }
            if (searchDept != 0) {
               
                foundDept = compareObjects(vactions[i].dept, searchDept);
                
            } else {
                
                foundDept=false;
            }
            
            //if found vaction at this day for emps
            if ((vactions[i].from == searchDate) &&
                ( (foundEmpId == true) || (foundDept == true) )  ) {
               
                   haveVaction = true;
                   break;
            }
        }
        return haveVaction;
    }
    
   
    function vaction(id,from, to, emp ,dept) {
        this.id = id;
        this.from = from;
        this.to   = to;
        this.emp  =emp;
        this.dept = dept;
    }

    function compareObjects(obj1,obj2)
    {  
        var arr1 = $.map(obj1, function (el) { return el; })
        var arr2 = $.map(obj2, function (el) { return el; })
        //if true then equal
        return ($(arr1).not(arr2).length === 0 && $(arr2).not(arr1).length === 0);
    }

    function addVaction() {
   
        var from   = $("#from").val(); 
        var to     = $("#to").val(); 
        var empId  = $("#emp").val();
        var deptId = $("#dept").val();

        empId = (empId == null) ? 0 : empId;
        deptId = (deptId == null) ? 0 : deptId;
        //ensure that the Date range is valid
        if (Date.parse(from) > Date.parse(to)) {
            setting.show_Message(true, "#mssage", "to date must be grater than from date");
            $("#from").addClass("inptError").focus();
            return;
        } 

        if (to.length <= 0) {
            setting.show_Message(true, "#mssage", "you must set to date");
            $("#to").addClass("inptError").focus();
            return;
        }

        var d = new Date();
        var strDate = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();

    
        if (Date.parse(strDate) > Date.parse(from)){
            setting.show_Message(true, "#mssage", "invalid from date");
            $("#from").addClass("inptError").focus();
            return;
       }

        $("#to, #from").removeClass("inptError");
        $("#mssage").empty();

       
        if (findRepeated(from, empId, deptId)== true) {
            setting.show_Message(true, "#mssage", "sorry vaction already set for them before ");
            return;
        }
       
        if ((empId != 0) || (deptId != 0)) {

            vactions.push(new vaction(newIndex, from, to, empId, deptId));
            obj.jsonStr = JSON.stringify(vactions);
            obj.path = "D://old data//data//m_courses/iti courses/finalProject/finalProject/vactions.txt";
            //obj.path = "D://iti/finalProject/finalProject/vactions.txt";
            // obj.path = "D://iti/test.txt";
            saveData(2, obj);

        } else {
            setting.show_Message(true, "#mssage", "you must set vaction fpr employee or department");
            return;
        }
    

    }
    /* jquery ui part */

    dialog = $("#dialog-form").dialog({
        autoOpen: false,
        height: 450,
        width: 350,
        modal: true,

        buttons: {
            Cancel: function () {
                dialog.dialog("close");
            },
            "create new Employee": addVaction
        },
        close: function () {
            dialog.dialog("close");
        }
    });
    form = dialog.find("form").on("submit", function (event) {
        event.preventDefault();
        addVaction();
    });
    $("#create-vac").button().on("click", function () {
        dialog.dialog("open");
    });
    //delete user
    $(document).on("click", ".del", function () {

        if (confirm("are u sure") == false)
            return false;

        var vactionId = $(this).attr("id");
        vactionId = Number(vactionId);

        var data = $.grep(vactions, function (e) {
            return e.id != vactionId;
        });
        $(this).hide();

        obj.jsonStr = JSON.stringify(data);
        obj.path = "D://old data//data//m_courses/iti courses/finalProject/finalProject/vactions.txt";
        // obj.path = "D://iti/test.txt";

        //obj.path = "D://iti/finalProject/finalProject/vactions.txt";
        saveData(1,obj);

    });//end click event

    function saveData(type,obj)
    {
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

                if(type== 1)
                    parent.location.hash = vactionId - 1;
                else
                    parent.location.hash = newIndex;
            },
            error: function () {
                setting.show_Message(true, "#mssage", "\t failed to save");
            }
        });//end post
    }
    $("#Excel").click(function (e) {
        setting.WriteExcel("#users-contain");
        e.preventDefault();
    });

   
});