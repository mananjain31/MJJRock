window.addEventListener('load', function(){
    let unfilteredAccordions = document.querySelectorAll(`*[accordion]`);
    let accordions = [];
    for(let i=0;i<unfilteredAccordions.length;i++)
    {
        accordions.push([]);
        for(let node of unfilteredAccordions[i].childNodes)
        {
            if(node.nodeName != "#text") accordions[i].push(node);
        }
    }
    console.log(accordions);
    for(let accordion of accordions)
    {
        for(let i=0; i+1<accordion.length;i+=2)
        {
            let curr = accordion[i];
            let next = accordion[i+1];
            next.style.display = "none";
            curr.onmousedown = function(){            
                console.log(next);
                if(next.style.display === "none") next.style.display = "block";
                else next.style.display = "none";
            }
        }
    }
});