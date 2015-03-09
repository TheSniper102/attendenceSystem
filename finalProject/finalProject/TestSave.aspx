<%@ Page Language="C#" AutoEventWireup="true" CodeFile="TestSave.aspx.cs" Inherits="TestSave" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="JQuery%20Source/jquery-1.11.2.js"></script>
    <script>
        var obj = {};
        $(function () {
            $("#b1").click(function () {
                obj.xmlStr = "<KOKO>III</KOKO>";
                obj.path = "D://koko.xml";
                $.ajax({
                    type: "POST",
                    //url: "WriteWebService.asmx/WriteXML",
                    url: "Save.aspx/WriteXML",
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(obj),
                    dataType: "json",
                    success: function (r) {
                        alert(r.d)
                    },
                    error: function () {
                        alert("Error")
                    }
                });
            });
            $("#b2").click(function () {
                obj.jsonStr = "III";
                //obj.path = "D://JQueryProject35/cdcatalog.xml"
                obj.path = "D://koko.txt";
                $.ajax({
                    type: "POST",
                    //url: "WriteWebService.asmx/WriteXML",
                    url: "Save.aspx/WriteJSON",
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(obj),
                    dataType: "json",
                    success: function (r) {
                        alert(r.d)
                    },
                    error: function () {
                        alert("Error")
                    }
                });
            })
        });
    </script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <input id="b1" type="button" value="Save XML" />
        <input id="b2" type="button" value="Save JSON" />
    
    </div>
    </form>
</body>
</html>
