<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="ShowAttendance.aspx.cs" Inherits="ShowAttendance" %>

<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="Server">
    <style>
        .Attenderror {
            background-color: yellow;
        }

        .Attendlate {
            background-color: red;
        }
    </style>
    
    
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <table>
        <tr>
            <td>
                <label>Enter Date</label>
            </td>
            <td>
                <input type="text" id="txt_date" />
            </td>
            
        </tr>
        <tr>
            <td colspan="2">
                <input type="button" value="Show" id="Show_Btn" class="btn"/>
            </td>
        </tr>
    </table>
    <div id="data">
        <table id="datatbl"></table>
    </div>
     
    <script src="js/attendance.js"></script>
  <script>
      $(function () {
          var date = new Date();
          date = date.toISOString();
          var currdate = date.substr(0, date.indexOf("T"));
          $("#txt_date").val(currdate);
          $("#Show_Btn").click();
      });
  </script>
    
</asp:Content>





