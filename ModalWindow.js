let modalWindow,modalClose;
window.addEventListener('load', function()
{
    modalWindow = document.createElement("div");
    modalWindow.setAttribute("id", "modalWindow");
    modalClose = document.createElement("button");
    modalClose.innerHTML = "X";
    modalClose.setAttribute("id", "modalClose");
    modalClose.setAttribute("name", "modalClose");
    document.body.appendChild(modalWindow);
    modalClose.onclick = function()
    {
        modalWindow.classList.remove("showModal");
        document.body.appendChild(modalWindow.childNodes[0]);
    }
});
function $$$(elementId)
{
    return {
        "modal" : function()
        {
            let modalElement = document.getElementById(elementId);
            modalWindow.appendChild(modalElement);
            if(!modalElement.modalClose) modalElement.appendChild(modalClose); 
            modalWindow.classList.add("showModal");
        }
    }
}