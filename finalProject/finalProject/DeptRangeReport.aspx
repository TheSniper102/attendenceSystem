<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="DeptRangeReport.aspx.cs" Inherits="DeptRangeReport" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <style>
        .Attenderror {
            background-color: yellow;
        }

        .Attendlate {
            background-color: red;
        }
    </style>



</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <table>
        <tr>
            <td>Choose Department</td>
            <td>
                <select id="sel_dept">
                </select></td>

        </tr>
        <tr>
            <td>From Date</td>
            <td>
                <input type="text" id="from_txt" value="2015-03-01"/></td>

        </tr>
        <tr>
            <td>To Date</td>
            <td>
                <input type="text" id="to_txt" /></td>

        </tr>
        <tr>
            <td colspan="2">
                <input type="button" id="show_btn" class="btn" value="Show" /></td>
        </tr>
    </table>
    <div id="data_div">
        <table id="data_tbl" class="data-container">
        </table>
    </div>
    
    <script src="js/deptRange.js"></script>
</asp:Content>

