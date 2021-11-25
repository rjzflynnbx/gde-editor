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

    let lastUrl = location.href;
    new MutationObserver(() => {
        const url = location.href;
        if (url !== lastUrl) {
            lastUrl = url;
            onUrlChange();
        }
    }).observe(document, { subtree: true, childList: true });

    function onUrlChange() {
        console.log('URL changed!', location.href);
        if (window.location.href.includes("section=debug")) {
            setTimeout(function () {
                console.log("augment UI...");

                const clientKeyMap = {
                    wjtc2eog1lvueo72kts3mn1ean0nentz: 'BoxeverLabs (SpinAir)',
                    psfu6uh05hsr9c34rptlr06dn864cqrx: 'PartnerSandbox',
                    pqsGAMEJ9jsRlJMQPTrnpk0cGxD4ab70: "SpinGaming",
                    pqsDATA3lw12v5a9rrHPW1c4hET73GxQ: "SpinAir - DC",
                    pqsFinGP4nW3iqC4JzgRMGZMgODLuDVM: "SpinFinance",
                    pqsMedIa6PvIs50quSIOAPHcL0TJTQpk: "SpinMedia (SpinCom)",
                    pqsSIOPAxhMC9zJLJSZNFURPNqALIFwd: "SpinShop"
                }

                
                var currClientKey = localStorage.getItem('bxDataExtensionEditorClientKey');

                $("<li class=\"list-group-item\"><a id=\"addDataExtBtn\"  href=\"\"> <i aria-hidden=\"true\" class=\"fas fa-cog\"></i> Add GDE <i aria-hidden=\"true\" class=\"fas fa-info-circle icon-size-18 pull-right\"><\/i><\/a><\/li> <li class=\"list-group-item\"><a id=\"removeDataExtBtn\"  href=\"\"> <i aria-hidden=\"true\" class=\"fas fa-cog\"></i> Remove GDE <i aria-hidden=\"true\" class=\"fas fa-info-circle icon-size-18 pull-right\"><\/i><\/a><\/li><li class=\"list-group-item\"><a id=\"setClientKey\"  href=\"\"> <i aria-hidden=\"true\" class=\"fas fa-cog\"></i> Client Key <span id=\"_currentClientKey\"> = " + clientKeyMap[currClientKey] + "</span> <i aria-hidden=\"true\" class=\"fas fa-info-circle icon-size-18 pull-right\"><\/i><\/a><\/li>")
                    .insertAfter($(".list-group-item")[0]);



                $("#addDataExtBtn").click(async function (event) {
                    event.preventDefault();
                    Swal.fire({
                        title: 'Add Data Extension',
                        html: `<input type="text" id="dataExtName" class="swal2-input" placeholder="Data Extension Name">
                                    <input type="text" id="dataExtKey" class="swal2-input" placeholder="Data extension key">
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
                            const kv5values = kv5.split(",");

                            const kv6 = Swal.getPopup().querySelector('#_kv6').value.trim();
                            const kv6values = kv6.split(",");

                            const kv7 = Swal.getPopup().querySelector('#_kv7').value.trim();
                            const kv7values = kv7.split(",");

                            var guestRef = window.location.href.split("/")[6].split("?")[0];

                            var dataObj = {};
                            if (kv1 != null && kv1 != undefined && kv1 != "undefeined") {
                                dataObj[kv1_values[0]] = kv1_values[1];
                            }
                            if (kv2 != null && kv2 != undefined && kv2 != "undefeined") {
                                dataObj[kv2_values[0]] = kv2_values[1];
                            }
                            if (kv3 != null && kv3 != undefined && kv3 != "undefeined") {
                                dataObj[kv3_values[0]] = kv3_values[1];
                            }
                            if (kv4 != null && kv4 != undefined && kv4 != "undefeined") {
                                dataObj[kv4_values[0]] = kv4_values[1];
                            }
                            if (kv5 != null && kv5 != undefined && kv5 != "undefeined") {
                                dataObj[kv5_values[0]] = kv5_values[1];
                            }
                            if (kv6 != null && kv6 != undefined && kv6 != "undefeined") {
                                dataObj[kv6_values[0]] = kv6_values[1];
                            }
                            if (kv7 != null && kv7 != undefined && kv7 != "undefeined") {
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
                                            '',
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
                                <input type="text" id="dataExtRef" class="swal2-input" placeholder="Data extension Ref">
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
                            var guestRef = window.location.href.split("/")[6].split("?")[0];
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
                                            '',
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
                        inputOptions: {
                            wjtc2eog1lvueo72kts3mn1ean0nentz: 'BoxeverLabs (SpinAir)',
                            psfu6uh05hsr9c34rptlr06dn864cqrx: 'PartnerSandbox',
                            pqsGAMEJ9jsRlJMQPTrnpk0cGxD4ab70: "SpinGaming",
                            pqsDATA3lw12v5a9rrHPW1c4hET73GxQ: "SpinAir - DC",
                            pqsFinGP4nW3iqC4JzgRMGZMgODLuDVM: "SpinFinance",
                            pqsMedIa6PvIs50quSIOAPHcL0TJTQpk: "SpinMedia (SpinCom)",
                            pqsSIOPAxhMC9zJLJSZNFURPNqALIFwd: "SpinShop"
                        },
                        inputPlaceholder: 'Select a client key',
                        showCancelButton: true,
                    })

                    if (clientKey) {
                        Swal.fire(`You selected: ${clientKey}`);
                        localStorage.setItem('bxDataExtensionEditorClientKey', clientKey);
                        $("#_currentClientKey").html(" = " + clientKeyMap[clientKey] + "");
                    }

                });

            }, 1000);
        }
    }


})();