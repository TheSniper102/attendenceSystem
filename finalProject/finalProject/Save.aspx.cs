﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Xml;
[System.Web.Script.Services.ScriptService]
public partial class Save : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    [System.Web.Services.WebMethod]
    public static string GetCurrentTime(string name)
    {
        return "Hello " + name + Environment.NewLine + "The Current Time is: "
            + DateTime.Now.ToString();
    }
    [System.Web.Services.WebMethod]
    //[ScriptMethod(ResponseFormat = ResponseFormat.Xml)]
    public static string WriteXML(string xmlStr, string path)
    {
        //FileStream file = new FileStream(path, FileMode.OpenOrCreate, FileAccess.Write);
        //file.SetLength(0);
        XmlDocument doc = new XmlDocument();
        doc.LoadXml(xmlStr);
        //doc.Save(file);
        //file.Close();
        doc.Save(path);   //Simple Way To Save
        return "ok";
    }
    [System.Web.Services.WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public static string WriteJSON(string jsonStr, string path)
    {
        FileStream file = new FileStream(path, FileMode.OpenOrCreate, FileAccess.Write);
        file.SetLength(0);
        //file = new FileStream("D:\\Json.txt",
        // Create a new stream to read from a file
        StreamWriter sr = new StreamWriter(file);
        // Read contents of file into a string
        sr.Write(jsonStr);
        // Close StreamReader
        sr.Close();
        // Close file
        file.Close();
        return "ok";
    }
    [System.Web.Services.WebMethod]
  
    public static string backup(string FileToCopy, string NewCopy)
    {

        File.Copy(FileToCopy, NewCopy,true);
        return "ok";
    }
    protected void Button1_Click(object sender, EventArgs e)
    {
        //string s = Save.WriteXML("<Badr><Data>Mohamed Badr</Data></Badr>", "D://t.xml");
    }
}