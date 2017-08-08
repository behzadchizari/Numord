
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class Numord {
    private static String[] OneDigit = {"یک", "دو", "سه", "چهار", "پنج", "شش", "هفت", "هشت", "نه"};
    private static String[] Dec = {"ده", "بیست", "سی", "چهل", "پنجاه", "شصت", "هفتاد", "هشتاد", "نود"};
    private static String[] Teen = {"یازده", "دوازده", "سیزده", "چهارده", "پانزده", "شانزده", "هفده", "هجده", "نوزده"};
    private static String[] Hunder = {"صد", "دویست", "سیصد", "چهارصد", "پانصد", "ششصد", "هفصد", "هشتصد", "نهصد"};
    private static String[] Megi = {"هزار", "میلیون", "میلیارد", "تیلیارد", "بیلیارد", "تریلیون"};

    private static String FirstTreeDigitReader(long num) {
        char[] numArr = String.valueOf(num).toCharArray();
        Collections.reverse(Arrays.asList(numArr));
        String[] str = new String[numArr.length];

        switch (String.valueOf(num).length()) {
            case 1:
                if (num == 0) {
                    str[0] = "";
                } else
                    str[0] = OneDigit[(int) (Long.parseLong(String.valueOf(numArr[0])) - 1)];
                break;
            case 2:
                if (numArr[0] == '1') {
                    if (numArr[1] == '0') {
                        str[0] = Dec[0];
                    } else
                        str[0] = Teen[(int) (Long.parseLong(String.valueOf(numArr[1])) - 1)];
                } else {
                    if (numArr[1] == '0' && numArr[0] != '0') {
                        str[1] = Dec[(int) (Long.parseLong(String.valueOf(numArr[0])) - 1)];
                    } else if (numArr[1] != '0' && numArr[0] != '0') {
                        str[0] = Dec[(int) (Long.parseLong(String.valueOf(numArr[0])) - 1)];
                        str[1] = OneDigit[(int) (Long.parseLong(String.valueOf(numArr[1])) - 1)];
                    } else if (numArr[1] != '0') {

                        str[2] = OneDigit[(int) (Long.parseLong(String.valueOf(numArr[1])) - 1)];
                    }
                }
                break;
            case 3:

                str[0] = Hunder[(int) (Long.parseLong(String.valueOf(numArr[0])) - 1)];
                if (numArr[1] == '1') {
                    if (numArr[0] == '0') {
                        str[1] = Dec[0];
                    } else
                        str[1] = Teen[(int) (Long.parseLong(String.valueOf(numArr[0])) - 1)];
                } else {
                    if (numArr[2] == '0' && numArr[1] != '0') {
                        str[1] = Dec[(int) (Long.parseLong(String.valueOf(numArr[1])) - 1)];
                    } else if (numArr[2] != '0' && numArr[1] != '0') {
                        str[1] = Dec[(int) (Long.parseLong(String.valueOf(numArr[1])) - 1)];
                        str[2] = OneDigit[(int) (Long.parseLong(String.valueOf(numArr[2])) - 1)];
                    } else if (numArr[2] != '0') {

                        str[2] = OneDigit[(int) (Long.parseLong(String.valueOf(numArr[2])) - 1)];
                    }
                }
                break;
        }
        List<String> numList = Arrays.asList(str);
        String finalized = "";
        for (String item : numList) {
            if (item != null) {
                finalized += item + " و ";
            }
        }
        return finalized.substring(0, finalized.length() - 2);
    }

    private static String[] RemoveIndices(String[] indicesArray, int removeAt) {
        String[] newIndicesArray = new String[indicesArray.length - 1];

        int i = 0;
        int j = 0;
        while (i < indicesArray.length) {
            if (i != removeAt) {
                newIndicesArray[j] = indicesArray[i];
                j++;
            }

            i++;
        }

        return newIndicesArray;
    }

    public static String ConvertNumord(String number) {
        boolean isPositive = false;
        if (number == "0") return "صفر";
        String numString = (number.indexOf(",") != -1) ? number.replaceAll(",", "") : number;
        if (number.indexOf("+") != -1) {
            numString = number.replaceAll("+", "");
            isPositive = true;
        }
        boolean isNegative = number.substring(0, 1) == "-";
        if (number.indexOf("-") != -1)
            numString = number.replaceAll("-", "");
        long num = 0;
        try {
            num = Long.parseLong(numString);
        } catch (Exception e) {
            return "the inpute is not in correct format or the Length is too large";
        }
        int size = String.valueOf(num).length();
        String strFinal = "";
        String[] strArr = new String[(int) Math.ceil((float) size / 3)];
        for (int i = 0; i < strArr.length; i++) {
            int x = size % 3;
            try {
                int x4 = (i + 1) * 3;
                int x3 = size - (x4);
                String x2 = String.valueOf(num).substring(x3, x3 + 3);
                long x1 = Long.parseLong(x2);
                strArr[i] = FirstTreeDigitReader(x1);
            } catch (Exception e) {
                strArr[i] = FirstTreeDigitReader(Long.parseLong(String.valueOf(num).substring(size - ((i) * 3) - x, x)));
            }
        }
        for (int i = strArr.length - 1; i >= 0; i--) {
            if (!(strArr[i] == null || strArr[i] == "" || strArr[i] == " ")) {
                if (i != 0)
                    strArr[i] += Megi[i - 1];
            } else {
                strArr = RemoveIndices(strArr, i);
            }
        }
        for (int i = strArr.length - 1; i >= 0; i--) {
            if (i != 0 && !strArr[i - 1].equals(" ")) {
                strFinal += strArr[i] + " و ";
            } else {
                strFinal += strArr[i];
            }
        }
        if (isNegative && num != 0) {
            strFinal = "منفی " + strFinal;
        }
        if (isPositive && num != 0) {
            strFinal = "مثبت " + strFinal;
        }
        return strFinal;
    }
}
