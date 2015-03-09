<%@ Page Title="" Language="C#" MasterPageFile="~/admin.master" AutoEventWireup="true" CodeFile="AddnewEmp.aspx.cs" Inherits="AddnewEmp" %>



<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">

    <div id="dialog-form" title="Create new user">
        <div class="ui-widget" id="mssage">
        </div>
        <!--end message -->
        <form>
            <div class="form-group">
                <label for="empId">EmpID</label>
                <input type="text" id="empId" class="form-control" />
            </div>
            <div class="form-group">
                <label for="empName">EmpName</label>
                <input type="text" id="empName" class="form-control"/>
            </div>
            <div class="form-group">
                <label for="dept">EmpDept</label>
                <select id="dept" class="ui-selectmenu-button ui-widget ui-state-default ui-corner-all">
                </select>
            </div>
        </form>
    </div>
    <!-- end dailog form -->


    <!-- add employee section -->
    <div class="container-first container-size">

        <div id="users-contain" class="ui-widget CSSTableGenerator">
            <input placeholder="Search by name" id="box" type="text" />
            <table>
                <thead>
                    <tr class="ui-widget-header ">
                        <th>Employee id</th>
                        <th>Name </th>
                        <th>Department Number </th>
                        <th class="non-printable">Actions</th>
                    </tr>
                </thead>
                <tbody id="all_data">
                </tbody>
            </table>
        </div>
        <!-- end users-contain -->
        <button id="create-user" class="non-printable addBtn"></button>
        <input type="button" id="Excel" class="xsl_btn non-printable" />
        <input type="button" onclick=" window.print();" class="print_btn non-printable"  />
    </div>
    <!-- end add employee section -->
    <script src="js/addEmp.js"></script>

</asp:Content>

