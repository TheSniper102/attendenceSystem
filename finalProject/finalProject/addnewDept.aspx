<%@ Page Title="" Language="C#" MasterPageFile="~/admin.master" AutoEventWireup="true" CodeFile="addnewDept.aspx.cs" Inherits="addnewDept" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">


    <div id="dialog-form" title="Create new Department">
        <div class="ui-widget" id="mssage">
        </div>
        <!--end message -->
        <form>
            <div class="form-group">
                <label for="deptId">DeptID</label>
                <input type="text" id="deptId" class="form-control"/>
            </div>
            <div class="form-group">
                <label for="deptName">name</label>
                <input type="text" id="deptName" class="form-control"/>
            </div>

        </form>
    </div>
    <!-- end dailog form -->


    <!-- add department section -->
    <div class="container-first container-size">
        <div id="users-contain" class="ui-widget CSSTableGenerator">
            <input placeholder="Search by name" id="box" type="text" class="non-printable"/>
            <table>
                <thead>
                    <tr class="ui-widget-header ">
                        <th>Department id</th>
                        <th>Name </th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="all_data">
                </tbody>
            </table>
        </div>
        <!-- end users-contain -->
        <button id="create-user" class="non-printable addBtn"></button>
        <input type="button" id="Excel" class="xsl_btn non-printable" />
        <input type="button" onclick=" window.print();" class="print_btn non-printable" />
    </div>
    <!-- end add employee section -->

    <script src="js/addDept.js"></script>

</asp:Content>


