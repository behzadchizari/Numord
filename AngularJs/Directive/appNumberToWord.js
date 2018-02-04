
app.directive("appNumberToWord", function (appUtilityService, BaseInfoDataService) {
    return {
        restrict: 'E',
        scope: {

            label: "@ngLabel",
            ngModel: "=ngModel",
            ngTypeValue: "=ngTypeModel",
            CallBack: "&ngCallback"

        },

        controller: function ($scope) {
            var OneDigit = ["یک", "دو", "سه", "چهار", "پنج", "شش", "هفت", "هشت", "نه"];
            var Dec = ["ده", "بیست", "سی", "چهل", "پنجاه", "شصت", "هفتاد", "هشتاد", "نود"];
            var Teen = ["یازده", "دوازده", "سیزده", "چهارده", "پانزده", "شانزده", "هفده", "هجده", "نوزده"];
            var Hunder = ["صد", "دویست", "سیصد", "چهارصد", "پانصد", "ششصد", "هفصد", "هشتصد", "نهصد"];
            var Megi = ["هزار", "میلیون", "میلیارد", "بیلیون", "بیلیارد", "تریلیون"];

            $scope.ngModel = '';
            var FirstTreeDigitReader = function (num) {
                var numArr = num.toString().split('');
                numArr = numArr.reverse();
                var str = [];

                switch (num.toString().length) {
                    case 1:
                        if (num == 0) {
                            str[0] = "";
                        }
                        else
                            str[0] = OneDigit[numArr[0] - 1];
                        break;
                    case 2:
                        if (numArr[1] == '1') {
                            if (numArr[0] == '0') {
                                str[0] = Dec[0];
                            }
                            else
                                str[0] = Teen[numArr[0].toString() - 1];
                        }
                        else {
                            if (numArr[0] == '0' && numArr[1] != '0') {
                                str[1] = Dec[numArr[1] - 1];
                            }
                            else if (numArr[0] != '0' && numArr[1] != '0') {
                                str[0] = Dec[numArr[1] - 1];
                                str[1] = OneDigit[numArr[0] - 1];
                            }
                            else if (numArr[0] != '0') {

                                str[2] = OneDigit[numArr[0] - 1];
                            }
                        }
                        break;
                    case 3:

                        str[0] = Hunder[numArr[2] - 1];
                        if (numArr[1] == '1') {
                            if (numArr[0] == '0') {
                                str[1] = Dec[0];
                            }
                            else
                                str[1] = Teen[numArr[0] - 1];
                        }
                        else {
                            if (numArr[0] == '0' && numArr[1] != '0') {
                                str[1] = Dec[numArr[1] - 1];
                            }
                            else if (numArr[0] != '0' && numArr[1] != '0') {
                                str[1] = Dec[numArr[1] - 1];
                                str[2] = OneDigit[numArr[0] - 1];
                            }
                            else if (numArr[0] != '0') {

                                str[2] = OneDigit[numArr[0] - 1];
                            }
                        }
                        break;
                }
                var final = "";
                for (var i = 0; i < str.length; i++) {
                    if (!str[i]) {
                        continue;
                    }
                    if (i == str.length - 1)
                        final += str[i];
                    else
                        final += str[i] + " و ";
                }
                return final.trim();
            };
            var RemoveIndices = function (indicesArray, removeAt) {
                var newIndicesArray = [];

                var i = 0;
                var j = 0;
                while (i < indicesArray.length) {
                    if (i != removeAt) {
                        newIndicesArray[j] = indicesArray[i];
                        j++;
                    }

                    i++;
                }

                return newIndicesArray;
            };

            var ConvertNumord = function (number, errorLongMessage) {
                debugger
                var isPositive = false;
                if (number == "0") return "صفر";
                var numString = '';
                var isNegative = number.substring(0, 1) == "-";
                while (number.indexOf(',') > -1) {
                                    number = number.replace(",", "")
                }
              
                numString = number;

                if (numString.indexOf('+') > -1) {
                    numString = numString.replace("+", "");
                    isPositive = true;
                }

                if (numString.indexOf('-') > -1)
                    numString = numString.replace("-", "");
                else
                    numString;
                var num = (numString);
                if (!Number(num))
                    return "";
                if (!num) return errorLongMessage;
                var size = num.toString().length;
                var strFinal = "";
                var strArr = [];
                for (var i = 0; i < size / 3; i++) {
                    var x = size % 3;
                    if (size - ((i + 1) * 3) >= 0) {
                        strArr[i] = FirstTreeDigitReader(num.toString().substring(size - ((i + 1) * 3), size - ((i + 1) * 3) + 3));
                    }
                    else {
                        strArr[i] = FirstTreeDigitReader(num.toString().substring(size - ((i) * 3) - x, size - ((i) * 3)));
                    }
                }
                for (var i = strArr.length - 1; i >= 0; i--) {
                    if (strArr[i] != "") {
                        if (i != 0 && i < 7)
                            strArr[i] += " " + Megi[i - 1];
                    }
                    else {
                        strArr = RemoveIndices(strArr, i);
                    }
                }
                for (var i = strArr.length - 1; i >= 0; i--) {
                    if (i != 0) {
                        strFinal += strArr[i] + " و ";
                    }
                    else {
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
            };
            var errorLongMessage = "";
           
            $scope.changeValue = function (val) {
                debugger
                $scope.WordValue = ConvertNumord(val, errorLongMessage);
            };
        },


        template: function (elem, attr) {
            return '<span ng-mouseover="tooltipshow=false" ng-mouseleave="tooltipshow=false" style="width:300px !important;position:relative">' +
                '<lx-text-field ' +
                'lx-label="{{label}}"  ' +
                'lx-allow-clear="true" ' +
                'lx-fixed-label="false" ng-required="true" > ' +
                '<input type="text" maxlength="20" ' +
                'ng-model="ngModel" ' +
                'ng-change="changeValue(ngModel)"> ' +
                '</lx-text-field>' +

                '<span>' +
                ' به حروف: ' +
                '   {{ WordValue }} ' +

                '</span>' +
                '</span>';

        },

    }
});

