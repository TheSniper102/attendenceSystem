<%@ Page Title="" Language="C#" MasterPageFile="~/admin.master" AutoEventWireup="true" CodeFile="index.aspx.cs" Inherits="finalProject_index" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">

    <div class="admin-container">
        <canvas height="200" id="chart-area" width="200" />
        <span>Number of employess in each depratment</span>
    </div>
    <div class="admin-container1">
        <canvas height="200" id="chart-area2" width="200" />
    </div>
     <div class="admin-container1">
        <canvas height="200" id="chart-area3" width="200" />
    </div>
    <%-- <div class="admin-container">
        <canvas height="200" id="chart-area4" width="200" />
    </div>--%>
    <script src="js/jqSource/Chart.min.js"></script>
    <script src="js/index.js"></script>
</asp:Content>

