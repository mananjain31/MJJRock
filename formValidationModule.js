function createPlaceHolderNode(ele, json)
{
    let placeHolder = json.placeHolder;
    let placeHolderNode;
    if(placeHolder)
    {
        placeHolderNode = document.getElementById(placeHolder);
    }
    else
    {
        placeHolderNode = document.createElement("span");
        let parentNode = ele.parentNode;
        parentNode.insertBefore(placeHolderNode, ele.nextSibling);
    }
    ele.placeHolderNode = placeHolderNode;
}
function $$$(elementId)
{
    return {
        "validateOnSubmit" : function(rules)
        {
            window.addEventListener('load', function()
            {
                let formId = elementId;
                frm = document.getElementById(formId);
                if(!frm) throw "Invalid Form Id : " + formId;
                frm.onsubmit = function()
                {
                    let doSubmit = true;
                    try
                    {
                        if(rules.minLength)
                        {
                            for(minLen of rules.minLength)
                            {
                                if(!minLen.id) throw "Element's Id Not Given for minLength Validation";
                                if(!minLen.length) throw `Element's Length Not Given for minLength Validation with id : ${minLen.id}`;
                                let ele = document.getElementById(minLen.id);
                                if(!ele.placeHolderNode) createPlaceHolderNode(ele, minLen);
                                if(ele.value.length < minLen.length)
                                {
                                    ele.placeHolderNode.innerHTML = minLen.error && minLen.error.length > 0 ? minLen.error : `Minimum Length Should Be ${minLen.length}`;
                                    ele.minLengthError = true;
                                    doSubmit = false;
                                }
                                else
                                {
                                    ele.placeHolderNode.innerHTML = "";
                                    ele.minLengthError = false;
                                }
                            }// for each loop of minLength ends
                        }
                        if(rules.required)
                        {
                            for(let req of rules.required)
                            {
                                if(!minLen.id) throw "Element's Id Not Given for required Validation";
                                let ele = document.getElementById(req.id);
                                if(!ele.placeHolderNode) createPlaceHolderNode(ele, req);
                                if(!ele.value || ele.value.trim().length == 0) 
                                {
                                    doSubmit = false;
                                    ele.placeHolderNode.innerHTML = req.error ? req.error : "Required";
                                    ele.requiredError = true;
                                }
                                else 
                                {
                                    if(!ele.minLengthError) ele.placeHolderNode.innerHTML = "";
                                    ele.requiredError = false;
                                }
                            }// for each loop of required ends
                        }
                        if(rules.maxLength)
                        {
                            for( let maxLen of rules.maxLength)
                            {
                                if(!maxLen.id) throw "Element's Id Not Given for maxLength Validation";
                                if(!maxLen.length) throw `Element's Length Not Given for maxLength Validation with id : ${maxLen.id}`;
                                let ele = document.getElementById(maxLen.id);
                                if(!ele.placeHolderNode) createPlaceHolderNode(ele, maxLen);
                                if(ele.value.length > maxLen.length)
                                {
                                    ele.placeHolderNode.innerHTML = maxLen.error && maxLen.error.length > 0 ? maxLen.error : `Maximum Length Should Be ${maxLen.length}`;
                                    ele.maxLengthError = true;
                                    doSubmit = false;
                                }
                                else
                                {
                                    if(!ele.requiredError && !ele.minLengthError) ele.placeHolderNode.innerHTML = "";
                                    ele.maxLengthError = true;
                                }
                            }// for each loop of maxLen ends
                        }
                        if(rules.custom)
                        {
                            for(let cust of rules.custom)
                            {
                                console.log(cust);
                                if(!cust.id) throw "Element's Id Not Given for Custom Validation";
                                if(!cust.call) throw `Function for custom validation for id : ${cust.id} not specified.`;
                                let ele = document.getElementById(cust.id);
                                if(!ele) throw `Invalid Id : ${cust.id}`;
                                if(!cust.call(ele)) doSubmit = false;
                            }// for each loop of customValidations ends
                        }                        
                    }
                    catch(err){
                        console.error(err);
                        return false;
                    }
                    return doSubmit;
                }
            });
        }
    };
}
