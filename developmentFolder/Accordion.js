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
                console.log(next);
                if(next.style.display === "none") next.style.display = "block";
                else next.style.display = "none";
            }
        }
    }
});