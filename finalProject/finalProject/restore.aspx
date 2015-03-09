<%@ Page Title="" Language="C#" MasterPageFile="~/admin.master" AutoEventWireup="true" CodeFile="restore.aspx.cs" Inherits="finalProject_restore" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div class="admin-container container-size">
        <asp:Label ID="message" runat="server"></asp:Label>
        <form id="form1" runat="server">

            <div>
                <h3>File Upload:</h3>
                <br />
                <asp:FileUpload ID="FileUpload1" runat="server" />
                <br />
                <br />
                <asp:Button ID="btnsave" runat="server" OnClick="btnsave_Click" Text="Save" Style="width: 85px" />
                <br />
                <br />
                <asp:Label ID="lblmessage" runat="server" />
            </div>

        </form>
    </div>
</asp:Content>

