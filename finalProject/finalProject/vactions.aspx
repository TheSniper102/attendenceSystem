<%@ Page Title="" Language="C#" MasterPageFile="~/admin.master" AutoEventWireup="true" CodeFile="vactions.aspx.cs" Inherits="finalProject_vactions" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">

    <div id="dialog-form" title="add vaction">
        <div class="ui-widget" id="mssage">
        </div>
        <!--end message -->
        <form>
            <div class="form-group">
                <label for="from">from</label>
                <input type="text" id="from" class="form-control"/>
            </div>
            <div class="form-group">
                <label for="to">to</label>
                <input type="text" id="to" class="form-control"/>
            </div>
            <div class="form-group">
                <label for="selemp">Employes</label>
                <input type="radio"  id="selemp" name="sel[]"/>
                <label for="seldept">department</label>
                <input type="radio"  id="seldept" name="sel[]"/>
            </div>
            <div class="form-group dept">
                <label for="dept">EmpDept</label>
                <select id="dept" class="ui-selectmenu-button ui-widget ui-state-default ui-corner-all form-control" multiple="multiple">
                </select>
            </div>
            <div class="form-group emp">
                <label for="emp">employee</label>
                <select id="emp" class="ui-selectmenu-button ui-widget ui-state-default ui-corner-all form-control" multiple="multiple">
                </select>
            </div>
        </form>
    </div>
    <!-- end dailog form -->


    <!-- add employee section -->
    <div class="container-first container-size">
   
        <div id="users-contain" class="ui-widget CSSTableGenerator">
            
            <table id="editParamValues">
                <thead>
                    <tr class="ui-widget-header ">
                        <th>from</th>
                        <th>to </th>
                        <th>Employess</th>
                        <th>Departments</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="all_data">
                </tbody>
            </table>
        </div>
        <!-- end users-contain -->
        <button id="create-vac" class="non-printable addBtn"></button>
        
    <input type="button" id="Excel" class="xsl_btn non-printable" />
    <input type="button" onclick=" window.print();" class="print_btn non-printable"  />
    </div>
    <script src="js/vactions.js"></script>
</asp:Content>

