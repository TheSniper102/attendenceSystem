<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="DepartmentReport.aspx.cs" Inherits="Absences" %>

<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="Server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">


    <div>
        <table>
            <tr>
                <th>department</th>
                <td colspan="2">
                    <select id="deptid">
                    </select>
                </td>
            </tr>
            <tr>
                <th>Enter date</th>
                <td>
                    <input type="text" id="dttxt" />
                </td>
               
            </tr>
            <tr>

                 <td> 
                    <input type="button" value="Show" id="show2" class="btn"/>
                </td>
            </tr>
        </table>


       
    </div>
    <div id="Data"></div>
     
    <script src="js/deptReport.js"></script>
   
</asp:Content>

