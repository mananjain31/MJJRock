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
function $$$(elementId)
{
    return {
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
    }
}