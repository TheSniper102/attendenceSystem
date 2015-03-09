<%@ Page Title="" Language="C#" MasterPageFile="~/admin.master" AutoEventWireup="true" CodeFile="backup.aspx.cs" Inherits="finalProject_backup" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
   
     <div class="admin-container container-size">
     <table>
        <tr>
            <td>Save attendence /leave Records</td>
            <td><input type="button" value="save" id="atRec"/></td>
            
        </tr><!-- export attendence/leave file -->


         <tr>
             <td>Save Emp Records</td>
             <td><input type="button" value="save" id="emp"/></td>
         
         </tr><!-- export emp file -->

        

         <tr>
             <td>Save Dept Records</td>
             <td><input type="button" value="save" id="dept"/></td>
       
         </tr><!-- export dept file -->
      
    </table>
         </div>
    <script src="js/backup.js"></script>
</asp:Content>

