<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="EmployeeReport.aspx.cs" Inherits="dept" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div>

        <table class="non-printable">
             <tr>
                <th>
                    <label for="emp">choose employee</label></th>
                <td>
                    <select id="emp">
                    </select>
                </td>
            </tr>
            <tr>
                <th><label for="from">From</label></th>
                <td> <input type="text" id="from" name="from" /></td>
            </tr>
            <tr>
                <th><label for="to">to</label></th>
                <td><input type="text" id="to" name="to" /></td>
            </tr>
           
            <tr>
                <td colspan="2">
                    <input type="button" id="insert_btn" value="Show Report" style="text-align: center;" class="non-printable"/>
                    <input type="button" id="Excel"  class="xsl_btn non-printable"/>
                    <input type="button" onclick=" window.print();" class="print_btn non-printable" value="print"/>
                </td>
            </tr>
        </table>
        
        <div id="statistic_container">
        </div>
     
    </div>
    <script src="js/empReport.js"></script>
</asp:Content>

