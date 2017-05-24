﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.String;

namespace Numord
{
   public class Numord
    {
        private static readonly string[] OneDigit = { "یک", "دو", "سه", "چهار", "پنج", "شش", "هفت", "هشت", "نه" };
        private static readonly string[] Dec = { "ده", "بیست", "سی", "چهل", "پنجاه", "شصت", "هفتاد", "هشتاد", "نود" };
        private static readonly string[] Teen = { "یازده", "دوازده", "سیزده", "چهارده", "پانزده", "شانزده", "هفده", "هجده", "نوزده" };
        private static readonly string[] Hunder = { "صد", "دویست", "سیصد", "چهارصد", "پانصد", "ششصد", "هفصد", "هشصد", "نهصد" };
        private static readonly string[] Megi = { "هزار", "میلیون", "میلیارد", "هزارمیلیارد", "بیلیارد", "تریلیون" };

        private static string FirstTreeDigitReader(int num)
        {
            var numArr = num.ToString().ToCharArray();
            Array.Reverse(numArr);
            var str = new string[numArr.Length];

            switch (num.ToString().Length)
            {
                case 1:
                    if (num == 0)
                    {
                        str[0] = "";
                    }
                    else
                        str[0] = OneDigit[Convert.ToInt32(numArr[0].ToString()) - 1];
                    break;
                case 2:
                    if (numArr[1] == '1')
                    {
                        if (numArr[0] == '0')
                        {
                            str[0] = Dec[0];
                        }
                        else
                            str[0] = Teen[Convert.ToInt32(numArr[0].ToString()) - 1];
                    }
                    else
                    {
                        if (numArr[0] == '0' && numArr[1] != '0')
                        {
                            str[1] = Dec[Convert.ToInt32(numArr[1].ToString()) - 1];
                        }
                        else if (numArr[0] != '0' && numArr[1] != '0')
                        {
                            str[0] = Dec[Convert.ToInt32(numArr[1].ToString()) - 1];
                            str[1] = OneDigit[Convert.ToInt32(numArr[0].ToString()) - 1];
                        }
                        else if (numArr[0] != '0')
                        {

                            str[2] = OneDigit[Convert.ToInt32(numArr[0].ToString()) - 1];
                        }
                    }
                    break;
                case 3:

                    str[0] = Hunder[Convert.ToInt32(numArr[2].ToString()) - 1];
                    if (numArr[1] == '1')
                    {
                        if (numArr[0] == '0')
                        {
                            str[1] = Dec[0];
                        }
                        else
                            str[1] = Teen[Convert.ToInt32(numArr[0].ToString()) - 1];
                    }
                    else
                    {
                        if (numArr[0] == '0' && numArr[1] != '0')
                        {
                            str[1] = Dec[Convert.ToInt32(numArr[1].ToString()) - 1];
                        }
                        else if (numArr[0] != '0' && numArr[1] != '0')
                        {
                            str[1] = Dec[Convert.ToInt32(numArr[1].ToString()) - 1];
                            str[2] = OneDigit[Convert.ToInt32(numArr[0].ToString()) - 1];
                        }
                        else if (numArr[0] != '0')
                        {

                            str[2] = OneDigit[Convert.ToInt32(numArr[0].ToString()) - 1];
                        }
                    }
                    break;
            }
            var j = 0;
            var final = str.Where(t => t != null).Aggregate("", (current, t) => current + (t + " و "));
            return final.Remove(final.Length - 2, 1).Trim();
        }

        public static string ConvertNumord(string number)
        {
            if (number == "0") return "صفر";
            var numString = (number.Contains(',')) ? number.Replace(",", Empty) : number;
            long num;
            if (!long.TryParse(numString, out num)) return "the inpute is not in correct format or the Length is too large";
            var size = num.ToString().Length;
            var strFinal = "";
            var strArr = new string[(int)Math.Ceiling((float)size / 3)];
            for (int i = 0; i < strArr.Length; i++)
            {
                var x = size % 3;
                try
                {
                    strArr[i] = FirstTreeDigitReader(Convert.ToInt32(num.ToString().Substring(size - ((i + 1) * 3), 3)));
                }
                catch (Exception)
                {
                    strArr[i] = FirstTreeDigitReader(Convert.ToInt32(num.ToString().Substring(size - ((i) * 3) - x, x)));
                }
            }
            for (var i = strArr.Length - 1; i > 0; i--)
            {
                if (!string.IsNullOrWhiteSpace(strArr[i]))
                    strArr[i] += !(i == 1 && string.IsNullOrWhiteSpace(strArr[i - 1])) ? " " + Megi[i - 1] + " و " : " " + Megi[i - 1];
            }
            for (var i = strArr.Length - 1; i >= 0; i--)
            {
                strFinal += strArr[i] + " ";
            }
            return strFinal;
        }
    }
}