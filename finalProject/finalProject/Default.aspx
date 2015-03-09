<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <form>
        <table>
            <tr>
                <td>
                    <label>Current Date</label></td>
                <td>
                    <input type="text" value="" id="txt_ctdate"  readonly="readonly"/></td>
            </tr>
            <tr>
                <td>
                    <label>Employee number</label></td>
                <td>
                    <input type="text" id="txt_id"  /></td>
            </tr>
            <tr>
                <td>
                    <label>Employee name</label></td>
                <td>
                    <select id="sel_name">
                    </select>

                </td>
            </tr>
           
            <tr>
                <td>
                    <label>State</label></td>
                <td>
                    <select id="sel_state">
                        <option value="1">Attendance
                        </option>
                        <option value="2">Leaving
                        </option>
                    </select></td>
            </tr>
            <tr>
                <td></td>
                <td>
                    <input type="button" id="btn_save" value="Save" class="btn"/>
                </td>
            </tr>
            <tr>
                <td>&nbsp;</td>
                <td>
                    <label id="lbl_res"></label>
                </td>
            </tr>
        </table>
    </form>
    <label id="dd"></label>
    <script src="js/default.js"></script>
    <script>
        $(function () {
            $("#txt_id").keydown(function (e) {
             
                if (e.which >= 65)
                    e.preventDefault();
                $("#messageHolder").empty();

            });
            $("#txt_id").keyup(function () {
                if ($("#sel_name").html().indexOf($("#txt_id").val()) == -1)
                {
                    setting.show_Message(true, "#messageHolder", "Invalid employee id");
                    $("#txt_id").focus();
               
                    $("#sel_name option[value='0']").attr("selected", "selected");
                 }else
                $("#sel_name option[value='" + $("#txt_id").val() + "']").attr("selected", "selected");
            });
        });
    </script>
</asp:Content>

