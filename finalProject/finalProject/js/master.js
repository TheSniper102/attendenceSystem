var setting
$(document).ready(function () {

    setting = {
        dropDownPoplute: function (file_name, selector, firstItemText) {
            $.getJSON(file_name, function (r) {

                var new_option = '<option value="0">' + firstItemText + '</option>';
                $.each(r, function (key, item) {
                    new_option += "<option value=" + item.id + ">" + item.name + "</option>";
                });

                $(selector).append(new_option);
            });

        },
        show_Message: function (error, selector, Message) {
            if (error)
                var Msg = '<div class="ui-state-error ui-corner-all" style="padding: 0 .7em;">\
		                              <p><span class="ui-icon ui-icon-alert" style="float: left; margin-right: .3em;"></span>\
		                              <strong>Alert:</strong> \t'+ Message + '</p>\
	                               </div>';
            else
                var Msg = '<div class="ui-state-highlight ui-corner-all" style="margin-top: 20px; padding: 0 .7em;">\
		                              <p><span class="ui-icon ui-icon-info" style="float: left; margin-right: .3em;"></span>\
		                              <strong>success</strong>\t' + Message + '</p>\
	                               </div>';
            $(selector).empty().append(Msg);
        },
        ajaxSetting: function () {
            $.ajaxSetup({ cache: false, });
            $(document).ajaxStart(function () { $("#wait").css("display", "block"); });
            $(document).ajaxComplete(function () { $("#wait").css("display", "none"); });
        },
        intilizateCalender: function (selector) {

            $(selector).datepicker({
                defaultDate: null,
                changeMonth: true,
                changeYear: true,
                numberOfMonths: 1,
                dateFormat: "yy-mm-dd",
                yearRange: "2015:2017",
                showAnim: "fold",

            });
        },
        WriteExcel: function (tableSelector) {
            //table must have no classes or Id
           
            window.open('data:application/vnd.ms-excel,' + $(tableSelector).html());
           
        },
        compareObjects: function (obj1, obj2) {
            //convert object to array then compare them
                    var arr1 = $.map(obj1, function (el) { return el; })
                var arr2 = $.map(obj2, function (el) { return el; })
                //if true then equal
                return ($(arr1).not(arr2).length === 0 && $(arr2).not(arr1).length === 0);
        },
        getEmpDept: function (empid) {
            var empDept=0;
            $.ajax({
                type: 'GET',
                url: 'test.txt',
                dataType: 'json',
                async: false,
                success: function (employess) {
                    for (var i = 0; i < employess.length; i++) {
                        
                        if((Number(employess[i].id)) == (Number(empid)))
                        {
                            empDept = employess[i].dept;
                            break;
                        }
                    }
                }
            });

            return empDept;
        },
        getDeptEmps:function(did) {
            var curreEmps = [];
            $.ajax({
                type: 'GET',
                url: 'test.txt',
                dataType: 'json',
                async: false,
                success: function (employess) {
                    for (var i = 0; i < employess.length; i++) {

                        if ((Number(employess[i].dept)) == (Number(did))) {
                            curreEmps.push (employess[i]);
                            
                        }
                    }
                }
            });

            return curreEmps;
        },
        countEmps:function(did) {
            var empsCount = 0;
            $.ajax({
                type: 'GET',
                url: 'test.txt',
                dataType: 'json',
                async: false,
                success: function (employess) {
                    for (var i = 0; i < employess.length; i++) {

                        if ((Number(employess[i].dept)) == (Number(did))) {
                            empsCount++;
                        }
                    }
                }
            });
            return empsCount;
        },
        getDepartments:function() {
            var depratments = [];
            $.ajax({
                type: 'GET',
                url: 'Dept.txt',
                dataType: 'json',
                async: false,
                success: function (totalDept) {
                    depratments = totalDept;
                }
            });
            return depratments;
        },
        countAbcence:function(did,cDate) {
            var absenceCount = 0;
            var arrofEmps = setting.getDeptEmps(did);
            var foundEmps = [];
            var arrofEmpIds = [];
            var emcount = 0;
            for (var i = 0; i < arrofEmps.length; i++) {
                arrofEmpIds.push(arrofEmps[i].id);
            }
            var all = [];
            $.ajax({
                type: 'GET',
                url: 'pro.xml',
                dataType: 'xml',
                async: false,
                success: function (employess) {
                    
                
                    
                    $(employess).find("Date[today=" + cDate + "]").each(function () {
                        
                        //var curreDate = $(this).attr("today");
                        emcount = 0;
                        $(this).find("Emp").each(function () {
                            var emps = Number($(this).attr("id"));
                            if (jQuery.inArray(emps, arrofEmpIds) != -1) {
                                       
                                        emcount++;
                                    }
                        });
                        
                    });
                     emcount = (arrofEmpIds.length) - emcount;
                }//end success
            });
            
            return (emcount);
        }
  
    };//end setting

    setting.ajaxSetting();
    $("#messageHolder").click(function () {
        $(this).hide();
    });

});