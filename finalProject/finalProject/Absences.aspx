<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="Absences.aspx.cs" Inherits="Absences" %>

<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="Server">
    
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">


    <div>
        <table>
            <tr>
                <td>Enter date</td>
                <td><input type="text" id="dttxt" /></td>
            </tr>
            <tr>
                <td colspan="2" style="text-align:center;"><input type="button" value="Show" id="show2" class="btn" /></td>
            </tr>
        </table>
        
        
    </div>
    <div id="Data"></div>
    <script src="js/absenceReport.js"></script>
    <script>
        $(function () {
            var date = new Date();
            date = date.toISOString();
            var currdate = date.substr(0, date.indexOf("T"));
            $("#dttxt").val(currdate);
            $("#show2").click();
        });
       
   </script>
</asp:Content>

