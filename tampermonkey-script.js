// ==UserScript==
// @name         Data Extension Editor UI
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://app.boxever.com/*
// @icon         https://www.google.com/s2/favicons?domain=boxever.com
// @grant        none
// @require      https://cdn.jsdelivr.net/npm/sweetalert2@11
// ==/UserScript==

(function () {
    'use strict';

    const clientKeyMap = {
        wjtc2eog1lvueo72kts3mn1ean0nentz: 'Boxever Labs (Spinair)',
        psfu6uh05hsr9c34rptlr06dn864cqrx: 'Partner Sandbox',
        pqsGAMEJ9jsRlJMQPTrnpk0cGxD4ab70: "Spin Gaming",
        pqsDATA3lw12v5a9rrHPW1c4hET73GxQ: "Spinair - DC",
        pqsFinGP4nW3iqC4JzgRMGZMgODLuDVM: "SpinFinance",
        pqsMedIa6PvIs50quSIOAPHcL0TJTQpk: "SpinMedia",
        pqsSIOPAxhMC9zJLJSZNFURPNqALIFwd: "SpinShop",
        // dpsbx91fh7b0ve3qbfuoa0f7brme513i: "Sitecore Demo PLAY! Summit",
        pqsHoMeZqwc3fXgLCQs1p21ImhAr6tPL: "SpinHome",
        dpsbx91fh7b0ve3qbfuoa0f7brme513i: "PLAY! Summit"
    }


    let lastUrl = location.href;
    new MutationObserver(() => {
        const url = location.href;
        if (url !== lastUrl) {
            lastUrl = url;
            //           console.log("MutationObserver 1");
            onUrlChange();
        }
    }).observe(document, { subtree: true, childList: true });

    function onUrlChange() {
        //      console.log("onUrlChange 1");
        if (window.location.href.includes("section=properties")) {
            setTimeout(function () {
                console.log("onUrlChange 2");
                augmentUIwithAddAndRmvButtons();
                addClickListnerForExtDefaultExtension();
            }, 1000);
        }
    }


    function addClickListnerForExtDefaultExtension() {
        if (true) {
            var isExtUIAugmented = false;

            //TODO: proper selector for ext default details btn
            $("#profile-properties > div > div:nth-child(28) > button").click(function () {
                setTimeout(function () {
                    if (isExtUIAugmented === false) {
                       makeTableFieldsEditable();
                       
                        //insert add ad save buttons
                        var addAttributeBtnHTML = "<button id=\"addAttributeBtn\" style= \"margin-top:12px\" _ngcontent-nvk-c221=\"\" data-test=\"calculate-audience-button\" bx-save-and-stay-button=\"\" class=\"btn\" _nghost-nvk-c117=\"\"><st-inline-loader _ngcontent-nvk-c117=\"\" class=\"d-flex justify-content-center ng-tns-c116-6 ng-star-inserted\" _nghost-nvk-c116=\"\"><div _ngcontent-nvk-c116=\"\" class=\"ng-tns-c116-6 ng-trigger ng-trigger-loaderAnimation\"><div _ngcontent-nvk-c116=\"\" class=\"d-inline ng-tns-c116-6 ng-star-inserted\" style=\"\"> Add Attribute<\/div><\/st-inline-loader><\/button>";
                        var saveBtnHTML = "<button id=\"saveExtBtn\" disabled style= \"margin-top:12px\" _ngcontent-nvk-c221=\"\" data-test=\"calculate-audience-button\" bx-save-and-stay-button=\"\" class=\"btn\" _nghost-nvk-c117=\"\"><st-inline-loader _ngcontent-nvk-c117=\"\" class=\"d-flex justify-content-center ng-tns-c116-6 ng-star-inserted\" _nghost-nvk-c116=\"\"><div _ngcontent-nvk-c116=\"\" class=\"ng-tns-c116-6 ng-trigger ng-trigger-loaderAnimation\"><div _ngcontent-nvk-c116=\"\" class=\"d-inline ng-tns-c116-6 ng-star-inserted\" style=\"\"> Save Changes<\/div><\/st-inline-loader><\/button>";
                        var jsonTableSelector = "body > ngb-modal-window > div > div > div > div.modal-body > div > div > st-json-as-table";
                        $(saveBtnHTML).insertAfter(jsonTableSelector);
                        $(addAttributeBtnHTML).insertAfter(jsonTableSelector);

                        //add delete buttons
                        var deleteBtnHTML = "<i style = \"float:right\" _ngcontent-nvk-c236=\"\" aria-hidden=\"true\" class=\"deleteExtAttrBtn far fa-trash ms-4 text-brand-danger\"><\/i>";
                        $(".bx-json-as-table-data .ng-star-inserted").append(deleteBtnHTML);


                        //click listners
                        $("#addAttributeBtn").click(function (event) {
                            event.preventDefault();
                            // alert("addAttributeBtn");;
                            var newRowHTML = "<div style=\"border-bottom: 1px solid var(--border-color-light); padding: 5px 20px;\" class=\"bx-json-as-table-key text-truncate ellipsis d-flex align-items-center justify-content-start level-0 ng-star-inserted\"><span _ngcontent-bvx-c176=\"\">key<\/span><\/div>\r\n<div style=\"border-bottom: 1px solid var(--border-color-light); padding: 5px 20px;\" class=\"bx-json-as-table-data ng-star-inserted\"><span _ngcontent-oxc-c176=\"\" class=\"text-break ng-star-inserted\">value<i  style=\"float:right\" _ngcontent-nvk-c236=\"\" aria-hidden=\"true\" class=\"deleteExtAttrBtn far fa-trash ms-4 text-brand-danger\"><\/i><\/span><\/div>";
                            $(".bx-json-as-table").append(newRowHTML);
                            enableSaveButton();
                            makeTableFieldsEditable();
                            addClickListnerToDeleteAttrBtn();
                        });
                        $("#saveExtBtn").click(async function (event) {
                            event.preventDefault();
                            alert("saveExtBtn");;
                        });
                        addClickListnerToDeleteAttrBtn();
                        $(".bx-json-as-table-data .ng-star-inserted").click(function (event) {
                            enableSaveButton();
                        });
                    }
                    isExtUIAugmented = true;
                }, 1000);

            });

            function addClickListnerToDeleteAttrBtn(){
                $(".deleteExtAttrBtn").click(function (event) {
                    event.preventDefault();
                    //alert("deleteExtAttrBtn");;
                    console.log($(this).parent().parent().prev());
                    $(this).parent().parent().prev().remove();
                    $(this).closest('div').remove();
                    enableSaveButton();
                });
            }

            function enableSaveButton(){
                $('#saveExtBtn').prop("disabled", false); 
            }

            function makeTableFieldsEditable(){
                $(".bx-json-as-table-data .ng-star-inserted").attr("contentEditable",true);
                $(".bx-json-as-table-key").attr("contentEditable",true);
            }

        }
    }

    function augmentUIwithAddAndRmvButtons() {
        console.log("augmentUIwithAddAndRmvButtons");
        var reverseClientKeyMap = reverseObject(clientKeyMap);

        //try and set the correct client key
        var clientKeyNameFromUI = document.querySelector("#user-account-dropdown-toggle > span").innerHTML;
        var currClientKey = localStorage.getItem('bxDataExtensionEditorClientKey');

        if (reverseClientKeyMap[clientKeyNameFromUI] == undefined) {
            console.log("GDE Editor CLient Key Not Supported")
        } else {
            //try and set client key
            if (reverseClientKeyMap[clientKeyNameFromUI] != currClientKey) {
                Swal.fire({
                    title: 'Change GDE Editor Client Key to ' + clientKeyNameFromUI,
                    text: "",
                    icon: 'question',
                    confirmButtonText: 'Yes, change it!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        var newClientKey = reverseClientKeyMap[clientKeyNameFromUI][0];
                        localStorage.setItem('bxDataExtensionEditorClientKey', newClientKey);
                        $("#_currentClientKey").html(" = " + clientKeyMap[newClientKey] + "");
                        Swal.fire(
                            'Done!',
                            'GDE Editor Client Key Updated',
                            'success'
                        )
                    }
                })
            }

            $("<li class=\"list-group-item\"><a id=\"addDataExtBtn\"  href=\"\"> <i aria-hidden=\"true\" class=\"fas fa-user-plus\"></i> Add GDE <i aria-hidden=\"true\" class=\"fas fa-info-circle icon-size-18 pull-right\"><\/i><\/a><\/li> <li class=\"list-group-item\"><a id=\"removeDataExtBtn\"  href=\"\"> <i aria-hidden=\"true\" class=\"fas fa-user-minus\"></i> Remove GDE <i aria-hidden=\"true\" class=\"fas fa-info-circle icon-size-18 pull-right\"><\/i><\/a><\/li><li class=\"list-group-item\"><a id=\"setClientKey\"  href=\"\"> <i aria-hidden=\"true\" class=\"fas fa-cog\"></i> Client Key <span id=\"_currentClientKey\"> = " + clientKeyMap[currClientKey] + "</span> <i aria-hidden=\"true\" class=\"fas fa-info-circle icon-size-18 pull-right\"><\/i><\/a><\/li>")
                .insertAfter($("#profile-properties"));

            $("#addDataExtBtn").click(async function (event) {
                event.preventDefault();
                Swal.fire({
                    title: 'Add Data Extension',
                    html: `<input type="text" id="dataExtName" class="swal2-input" placeholder="Data Extension Name">
                            <input type="text" id="dataExtKey" class="swal2-input" placeholder="Data Extension Key">
                            <input type="text" id="_kv1" class="swal2-input" placeholder="key,value">
                            <input type="text" id="_kv2" class="swal2-input" placeholder="key,value">
                            <input type="text" id="_kv3" class="swal2-input" placeholder="key,value">
                            <input type="text" id="_kv4" class="swal2-input" placeholder="key,value">
                            <input type="text" id="_kv5" class="swal2-input" placeholder="key,value">
                            <input type="text" id="_kv6" class="swal2-input" placeholder="key,value">
                            <input type="text" id="_kv7" class="swal2-input" placeholder="key,value">
                            `,
                    confirmButtonText: 'Add Data Extension',
                    focusConfirm: false,
                    showCancelButton: true,
                    showLoaderOnConfirm: true,
                    preConfirm: () => {
                        Swal.showLoading()
                    }
                }).then((result) => {

                    if (result.isConfirmed) {
                        var dataExtName = Swal.getPopup().querySelector('#dataExtName').value;
                        var dataExtKey = Swal.getPopup().querySelector('#dataExtKey').value;

                        const kv1 = Swal.getPopup().querySelector('#_kv1').value.trim();
                        const kv1_values = kv1.split(",");

                        const kv2 = Swal.getPopup().querySelector('#_kv2').value.trim();
                        const kv2_values = kv2.split(",");

                        const kv3 = Swal.getPopup().querySelector('#_kv3').value.trim();
                        const kv3_values = kv3.split(",");

                        const kv4 = Swal.getPopup().querySelector('#_kv4').value.trim();
                        const kv4_values = kv4.split(",");

                        const kv5 = Swal.getPopup().querySelector('#_kv5').value.trim();
                        const kv5_values = kv5.split(",");

                        const kv6 = Swal.getPopup().querySelector('#_kv6').value.trim();
                        const kv6_values = kv6.split(",");

                        const kv7 = Swal.getPopup().querySelector('#_kv7').value.trim();
                        const kv7_values = kv7.split(",");

                        var guestRef = window.location.href.split("/")[5].split("?")[0];

                        var dataObj = {};
                        if (kv1 != null && kv1 != undefined && kv1 != "undefined") {
                            dataObj[kv1_values[0]] = kv1_values[1];
                        }
                        if (kv2 != null && kv2 != undefined && kv2 != "undefined") {
                            dataObj[kv2_values[0]] = kv2_values[1];
                        }
                        if (kv3 != null && kv3 != undefined && kv3 != "undefined") {
                            dataObj[kv3_values[0]] = kv3_values[1];
                        }
                        if (kv4 != null && kv4 != undefined && kv4 != "undefined") {
                            dataObj[kv4_values[0]] = kv4_values[1];
                        }
                        if (kv5 != null && kv5 != undefined && kv5 != "undefined") {
                            dataObj[kv5_values[0]] = kv5_values[1];
                        }
                        if (kv6 != null && kv6 != undefined && kv6 != "undefined") {
                            dataObj[kv6_values[0]] = kv6_values[1];
                        }
                        if (kv7 != null && kv7 != undefined && kv7 != "undefined") {
                            dataObj[kv7_values[0]] = kv7_values[1];
                        }

                        var currClientKey = localStorage.getItem('bxDataExtensionEditorClientKey');

                        fetch('https://w1x491x7ik.execute-api.eu-west-1.amazonaws.com/default/createDataExtension', {
                            method: 'post',
                            headers: {
                                'Accept': 'application/json, text/plain, */*',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(
                                {
                                    "guestRef": guestRef,
                                    "dataExtensionName": dataExtName,
                                    "dataExtensionKey": dataExtKey,
                                    "clientKey": currClientKey,
                                    "data": dataObj
                                }
                            )
                        }).then(res => res.json())
                            .then(res => {
                                console.log("welllll " + res.success);
                                if (res.success == true) {
                                    Swal.fire(
                                        'Data Extension Created',
                                        'refresh the page to see...',
                                        'success'
                                    )
                                } else {
                                    Swal.fire(
                                        'Error Creating Data Extension ask Richard Flynn why...',
                                        '',
                                        'error'
                                    )
                                }
                            });
                    }



                })

            });

            $("#removeDataExtBtn").click(async function (event) {
                event.preventDefault();
                Swal.fire({
                    title: 'Remove Data Extension',
                    html: `<input type="text" id="dataExtName" class="swal2-input" placeholder="Data Extension Name">
                        <input type="text" id="dataExtRef" class="swal2-input" placeholder="Data Extension Ref">
                        `,
                    confirmButtonText: 'Remove Data Extension',
                    focusConfirm: false,
                    showCancelButton: true,
                    showLoaderOnConfirm: true,
                    preConfirm: () => {

                    }
                }).then((result) => {
                    Swal.showLoading()
                    if (result.isConfirmed) {
                        var dataExtName = Swal.getPopup().querySelector('#dataExtName').value;
                        var dataExtRef = Swal.getPopup().querySelector('#dataExtRef').value;
                        var guestRef = window.location.href.split("/")[5].split("?")[0];
                        var currClientKey = localStorage.getItem('bxDataExtensionEditorClientKey');

                        fetch('https://w1x491x7ik.execute-api.eu-west-1.amazonaws.com/default/createDataExtension', {
                            method: 'delete',
                            headers: {
                                'Accept': 'application/json, text/plain, */*',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(
                                {
                                    "guestRef": guestRef,
                                    "dataExtensionName": dataExtName,
                                    "dataExtensionRef": dataExtRef,
                                    "clientKey": currClientKey
                                }
                            )
                        }).then(res => res.json())
                            .then(res => {
                                console.log("welllll " + res.success);
                                if (res.success == true) {
                                    Swal.fire(
                                        'Data Extension Removed',
                                        'refresh page to see...',
                                        'success'
                                    )
                                } else {
                                    Swal.fire(
                                        'Error Removing Data Extension ask Richard Flynn why...',
                                        '',
                                        'error'
                                    )
                                }
                            });
                    }




                })

            });

            $("#setClientKey").click(async function (event) {
                event.preventDefault();

                const { value: clientKey } = await Swal.fire({
                    title: 'Select client key',
                    input: 'select',
                    inputOptions: clientKeyMap,
                    inputPlaceholder: 'Select a client key',
                    confirmButtonText: "Change Client Key",
                    showCancelButton: true,
                })

                if (clientKey) {
                    Swal.fire(`You selected: ${clientKey}`);
                    localStorage.setItem('bxDataExtensionEditorClientKey', clientKey);
                    $("#_currentClientKey").html(" = " + clientKeyMap[clientKey] + "");
                }

            });
        }
    }


    const reverseObject = (obj) => {
        const newObj = {};
        Object.keys(obj).forEach(key => {
            if (newObj[obj[key]]) {
                newObj[obj[key]].push(key);
            } else {
                newObj[obj[key]] = [key];
            }
        });
        return newObj;
    };

})();