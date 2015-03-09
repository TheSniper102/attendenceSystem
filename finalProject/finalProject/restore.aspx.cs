using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class finalProject_restore : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    protected void btnsave_Click(object sender, EventArgs e)
    {
        StringBuilder sb = new StringBuilder();
        string fName;
        if (FileUpload1.HasFile)
        {
            try
            {
                string ext = System.IO.Path.GetExtension(FileUpload1.FileName);

                if (ext == ".txt" || ext == ".xml")
                {
                    if (FileUpload1.FileName.IndexOf('-') != -1)
                    {

                        string[] splitedName = FileUpload1.FileName.Split('-');
                        fName = splitedName[0] + ext;
                    }
                    else
                    {
                        fName = FileUpload1.FileName;
                    }



                    //saving the file
                    FileUpload1.SaveAs(Server.MapPath("~") + "/finalProject/" + fName);

                    //Showing the file information

                    sb.AppendFormat("<br/> File type: {0}", FileUpload1.PostedFile.ContentType);
                    sb.AppendFormat("<br/> File name: {0}", FileUpload1.PostedFile.FileName);
                    message.Text = sb.ToString();
                    message.ForeColor = System.Drawing.Color.Green;
                }
                else
                {
                    message.Text = "invalid file type";
                    message.ForeColor = System.Drawing.Color.Red;
                }

            }
            catch (Exception ex)
            {
                sb.Append("<br/> Error <br/>");
                sb.AppendFormat("Unable to save file <br/> {0}", ex.Message);
                message.Text = sb.ToString();
                message.ForeColor = System.Drawing.Color.Red;
            }
        }
        else
        {
            message.Text = sb.ToString();
            message.ForeColor = System.Drawing.Color.Red;
        }
    }
}