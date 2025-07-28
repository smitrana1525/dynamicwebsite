using System;

namespace MoneyCareBackend.Models
{
    public class mstUser
    {
        public string strGUID { get; set; } // Primary Key (UUID, length 50)
        public string strName { get; set; }
        public string strEmailId { get; set; }
        public bool bolsActive { get; set; }
        public string strPassword { get; set; }
        public DateTime createDate { get; set; }
        public DateTime ModifyDate { get; set; }
        public DateTime OtpExpiretIme { get; set; }
        public string strOTP { get; set; }
    }
}
