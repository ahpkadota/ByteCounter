let a = window.location.href;
if (a.toString().includes("https://rock-va.bytedance.net/appeal_center/")) { // Select the node that will be observed for mutations
    const targetNode = document.body;

    // Options for the observer (which mutations to observe)
    const config = {
        attributes: true,
        childList: true,
        subtree: true
    };

    // Callback function to execute when mutations are observed "Feedback Success"
    const callback = (mutationList, observer) => {
        for (const mutation of mutationList) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                if (mutation.addedNodes[0].className == "semi-toast semi-toast-success") {
                    switch (a[a.indexOf("roleCode=") + 9]) {
                        case "1":
                            chrome.storage.local.get(['appeals'], function (result) {
                                if (result.appeals === undefined) {
                                    result.appeals = {}
                                }
                                let obj = result.appeals;
                                if (result.appeals["Respondent"]) {
                                    obj["Respondent"] = Number(result.appeals["Respondent"]) + 1
                                } else {
                                    obj["Respondent"] = 1
                                }
                                chrome.storage.local.set({
                                    appeals: obj
                                })
                            });
                            break;
                        case "2":
                            if (mutation.addedNodes[0].innerText == "Success") {
                                chrome.storage.local.get(['appeals'], function (result) {
                                    if (result.appeals === undefined) {
                                        result.appeals = {}
                                    }
                                    let obj = result.appeals;
                                    if (result.appeals["Arbitrator / Notify Respondent"]) {
                                        obj["Arbitrator / Notify Respondent"] = Number(result.appeals["Arbitrator / Notify Respondent"]) + 1
                                    } else {
                                        obj["Arbitrator / Notify Respondent"] = 1
                                    }
                                    chrome.storage.local.set({
                                        appeals: obj
                                    })
                                });
                            } else if (mutation.addedNodes[0].innerText == "Operation Success" || mutation.addedNodes[0].innerText == "Case has been transferred to final arbitrator") {
                                chrome.storage.local.get(['appeals'], function (result) {
                                    if (result.appeals === undefined) {
                                        result.appeals = {}
                                    }
                                    let obj = result.appeals;
                                    if (result.appeals["Arbitrator"]) {
                                        obj["Arbitrator"] = Number(result.appeals["Arbitrator"]) + 1
                                    } else {
                                        obj["Arbitrator"] = 1
                                    }
                                    chrome.storage.local.set({
                                        appeals: obj
                                    })
                                });
                            }

                            break;
                        case "5":
                            chrome.storage.local.get(['appeals'], function (result) {
                                if (result.appeals === undefined) {
                                    result.appeals = {}
                                }
                                let obj = result.appeals;
                                if (result.appeals["Agent for Respondent"]) {
                                    obj["Agent for Respondent"] = Number(result.appeals["Agent for Respondent"]) + 1
                                } else {
                                    obj["Agent for Respondent"] = 1
                                }
                                chrome.storage.local.set({
                                    appeals: obj
                                })
                            });
                            break;
                    }
                }
            }
        }
    }

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);


} else if (a.toString().includes("https://tcs-sg.bytedance.net/workprocess/")) { // Select the node that will be observed for mutations
    const targetNode = document.body;

    // Options for the observer (which mutations to observe)
    const config = {
        attributes: true,
        childList: true,
        subtree: true
    };

    // Callback function to execute when mutations are observed
    const callback = (mutationList, observer) => {
        for (const mutation of mutationList) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                if (mutation.addedNodes[0].innerText == "Submit and Leave" && mutation.addedNodes[0].localName == "span") {
                    let numberTasks = document.getElementsByClassName("ivu-layout task-item").length;
                    let queueName = document.getElementById("tcs-workprocess-header-warpper").firstChild.firstChild.children[1].innerText;
                    chrome.storage.local.get(["keys"], function (result) {
                        if (result.keys === undefined) {
                            result.keys = {}
                        }
                        let obj = result.keys;
                        if (result.keys[queueName]) {
                            obj[queueName] = Number(result.keys[queueName]) + numberTasks
                        } else {
                            obj[queueName] = numberTasks
                        }
                        chrome.storage.local.set({keys: obj})
                    });
                }
            }
        }
    }

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);

}
