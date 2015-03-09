var obj = {};
var d = new Date();
var saveTime = d.getUTCFullYear() + "_" + (d.getMonth() + 1) + "_" + d.getDate();

$(function () {

    $("#atRec").click(function () {


        FileToCopy = "D://old data//data//m_courses/iti courses/finalProject/finalProject/pro.xml";
        NewCopy = "D://old data//data//m_courses/iti courses/finalProject/finalProject/backup/pro-" + saveTime + ".xml";

        save(FileToCopy, NewCopy);
    });


    $("#emp").click(function () {

        FileToCopy = "D://old data//data//m_courses/iti courses/finalProject/finalProject//test.txt";
        NewCopy = "D://old data//data//m_courses/iti courses/finalProject/finalProject/backup/test-" + saveTime + ".txt";
        save(FileToCopy, NewCopy);

    });

    $("#dept").click(function () {

        FileToCopy = "D://old data//data//m_courses/iti courses/finalProject/finalProject/Dept.txt";
        NewCopy = "D://old data//data//m_courses/iti courses/finalProject/finalProject/backup/Dept-" + saveTime + ".txt";
        save(FileToCopy, NewCopy);
    });


    function save(FileToCopy, NewCopy) {

        obj.FileToCopy = FileToCopy;
        obj.NewCopy = NewCopy;

        $.ajax({
            type: "POST",
            url: "Save.aspx/backup",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(obj),
            dataType: "json",
            cache: false,
            success: function (r) {

                setting.show_Message(false, "#messageHolder", "saved success");
            },
            error: function (status) {
                setting.show_Message(true, "#messageHolder", status.responseText);
            }
        });//end of save
    }

});