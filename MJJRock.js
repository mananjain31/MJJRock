function $$$(elementId)
{
    /******************************************/
    /* Form Validation Helper Function Starts */
    /******************************************/
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
        ele.mjjrock_placeHolderNode = placeHolderNode;
    }// createPlaceHolderNode ends
    /****************************************/
    /* Form Validation Helper Function Ends */
    /****************************************/

return {
    /*********************************/
    /* Form Validation Module Starts */
    /*********************************/
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
                            if(!minLen.id) throw "Element's Id Not Given for 'minLength' Validation\n"+"Element: "+JSON.stringify(minLen);
                            if(!minLen.length) throw `Element's Length Not Given for 'minLength' Validation with id : ${minLen.id}`;
                            let ele = document.getElementById(minLen.id);
                            if(!ele.mjjrock_placeHolderNode) createPlaceHolderNode(ele, minLen);
                            if(ele.value.length < minLen.length)
                            {
                                ele.mjjrock_placeHolderNode.innerHTML = minLen.error && minLen.error.length > 0 ? minLen.error : `Minimum Length Should Be ${minLen.length}`;
                                ele.minLengthError = true;
                                doSubmit = false;
                            }
                            else
                            {
                                ele.mjjrock_placeHolderNode.innerHTML = "";
                                ele.minLengthError = false;
                            }
                        }// for each loop of minLength ends
                    }
                    if(rules.required)
                    {
                        for(let req of rules.required)
                        {
                            if(!req.id) throw "Element's Id Not Given for required Validation\n"+"Element : "+JSON.stringify(req);
                            let ele = document.getElementById(req.id);
                            if(!ele.mjjrock_placeHolderNode) createPlaceHolderNode(ele, req);
                            if(!ele.value || ele.value.trim().length == 0) 
                            {
                                doSubmit = false;
                                ele.mjjrock_placeHolderNode.innerHTML = req.error ? req.error : "Required";
                                ele.requiredError = true;
                            }
                            else 
                            {
                                if(!ele.minLengthError) ele.mjjrock_placeHolderNode.innerHTML = "";
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
                            if(!ele.mjjrock_placeHolderNode) createPlaceHolderNode(ele, maxLen);
                            if(ele.value.length > maxLen.length)
                            {
                                ele.mjjrock_placeHolderNode.innerHTML = maxLen.error && maxLen.error.length > 0 ? maxLen.error : `Maximum Length Should Be ${maxLen.length}`;
                                ele.maxLengthError = true;
                                doSubmit = false;
                            }
                            else
                            {
                                if(!ele.requiredError && !ele.minLengthError) ele.mjjrock_placeHolderNode.innerHTML = "";
                                ele.maxLengthError = true;
                            }
                        }// for each loop of maxLen ends
                    }
                    if(rules.custom)
                    {
                        for(let cust of rules.custom)
                        {
                            if(!cust.id) throw "Element's Id Not Given for Custom Validation\n"+"Element : "+JSON.stringify(cust);
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
    },
    /*******************************/
    /* Form Validation Module Ends */
    /*******************************/
        
    /******************************/
    /* Modal Window Module Starts */
    /******************************/
    "modal" : function()
    {
        let modalElement = document.getElementById(elementId);
        let onModalLoad = modalElement.getAttribute("on_modal_load");
        if(onModalLoad) window[onModalLoad]();
        modalWindow.appendChild(modalElement);
        if(!modalElement.modalClose) modalElement.appendChild(modalClose); 
        modalWindow.classList.add("mjjrock_showModal");
    },
    "closeModal" : function()
    {
        modalClose.click();
    }
};//return of function $$$(elementId) ends
}
let modalWindow,modalClose;
window.addEventListener('load', function()
{
    modalWindow = document.createElement("div");
    modalWindow.setAttribute("id", "mjjrock_modalWindow");
    modalClose = document.createElement("button");
    modalClose.innerHTML = "X";
    modalClose.setAttribute("id", "mjjrock_modalClose");
    modalClose.setAttribute("name", "mjjrock_modalClose");
    document.body.appendChild(modalWindow);
    modalClose.onclick = function()
    {
        let onModalClose = modalWindow.childNodes[0].getAttribute("on_modal_close");
        if(onModalClose) window[onModalClose]();
        modalWindow.classList.remove("mjjrock_showModal");
        document.body.appendChild(modalWindow.childNodes[0]);
    }
});
/****************************/
/* Modal Window Module Ends */
/****************************/

/*******************************/
/* ModelObserver Module Starts */
/*******************************/
$$$.boundComponents = [];
$$$.startObserving = function(){
    $$$.boundComponents.forEach(function(dsElement){
        let newModelValue =  $$$.dataModel[dsElement.modelAttribute];
        dsElement["model-state"]["new-value"] = newModelValue;
        if(dsElement["model-state"]["new-value"] != dsElement["model-state"]["old-value"])
        {
            dsElement.component[dsElement.componentAttribute] = newModelValue;
            dsElement["model-state"]["old-value"] = newModelValue;
            dsElement["component-state"]["old-value"] = newModelValue;
            dsElement["component-state"]["new-value"] = newModelValue;
        }
        let newComponentValue = dsElement.component[dsElement.componentAttribute];
        // alert(newComponentValue);
        dsElement["component-state"]["new-value"] = newComponentValue;
        if(dsElement["component-state"]["new-value"] != dsElement["component-state"]["old-value"])
        {
            // alert(newComponentValue);
            $$$.dataModel[dsElement.modelAttribute] = newComponentValue;
            dsElement["component-state"]["old-value"] = newComponentValue;
            dsElement["model-state"]["old-value"] = newComponentValue;
            dsElement["model-state"]["new-value"] = newComponentValue;
        }
    });
    setTimeout($$$.startObserving, 100);
}// startObserving ends
window.addEventListener("load", function(){
    if(!$$$.dataModel) return;
    let componentsWithBindTo = document.querySelectorAll("[bind-to]");
    componentsWithBindTo.forEach(function(node){
        let modelAttribute = node.getAttribute("bind-to");
        if(!$$$.dataModel[modelAttribute]) return;
        node.setAttribute("value", $$$.dataModel[modelAttribute]);
        let dsElement = {
            "component" : node,
            "componentAttribute" : "value",
            "modelAttribute" : modelAttribute,
            "component-state" :{
                "old-value" : node["value"],
                "new-value" : node["value"]
            },
            "model-state" :{
                "old-value" : $$$.dataModel[modelAttribute],
                "new-value" : $$$.dataModel[modelAttribute]
            },
        }
        // alert(JSON.stringify(dsElement));
        $$$.boundComponents.push(dsElement);
    });//componentsWithBindTo.forEach ends
    setTimeout($$$.startObserving, 100);
});//window.addEventListener ends
/*****************************/
/* ModelObserver Module Ends */
/*****************************/

/***************************/
/* Accordion Module starts */
/***************************/
window.addEventListener('load', function(){
    let accordionContainer = document.querySelectorAll(`*[accordion]`);
    let accordions = [];
    for(let i=0;i<accordionContainer.length;i++)
    {
        accordions.push([]);
        for(let node of accordionContainer[i].children)
        {
            accordions[i].push(node);
        }
    }
    for(let accordion of accordions)
    {
        for(let i=0; i+1<accordion.length;i+=2)
        {
            let curr = accordion[i];
            let next = accordion[i+1];
            next.style.display = "none";
            curr.onmousedown = function(){            
                if(next.style.display === "none") next.style.display = "block";
                else next.style.display = "none";
            }
        }
    }
});
/**************************/
/* Accordion Module ends  */
/**************************/