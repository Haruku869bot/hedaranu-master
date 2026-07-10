// =====================================
// treeRenderer.js Ver3
// =====================================

const SVG_NS = "http://www.w3.org/2000/svg";

const TREE_SCALE = 1.5;

function drawTree(){

    const treeArea=document.getElementById("treeArea");

    if(!treeArea) return;

    treeArea.innerHTML="";

    const svg=document.createElementNS(
        SVG_NS,
        "svg"
    );

    svg.id="treeSvg";

    svg.setAttribute(
        "viewBox",
        "0 0 1500 2000"
    );

    svg.setAttribute(
        "width",
        "100%"
    );

    svg.setAttribute(
        "height",
        "100%"
    );

    svg.style.transform=
        `scale(${TREE_SCALE})`;

    svg.style.transformOrigin=
        "center center";

    treeArea.appendChild(svg);

    drawLines(svg);

    drawNodes(svg);

}

function drawLines(svg){

    TREE_NODES.forEach(node=>{

        if(node.id==="") return;

        const parent=TREE_NODES.find(

            n=>n.id===node.id.slice(0,-1)

        );

        if(!parent) return;

        const line=document.createElementNS(
            SVG_NS,
            "line"
        );

        line.setAttribute("x1",parent.x);
        line.setAttribute("y1",parent.y);

        line.setAttribute("x2",node.x);
        line.setAttribute("y2",node.y);

        line.setAttribute(
            "stroke",
            "#39d98a"
        );

        line.setAttribute(
            "stroke-width",
            "5"
        );

        svg.appendChild(line);

    });

}

function drawNodes(svg){

    TREE_NODES.forEach(node=>{

        if(node.id==="") return;

        const g=document.createElementNS(
            SVG_NS,
            "g"
        );

        g.classList.add("treeNode");

        g.dataset.code=node.id;

        const circle=document.createElementNS(
            SVG_NS,
            "circle"
        );

        circle.classList.add("treeCircle");

        circle.setAttribute(
            "cx",
            node.x
        );

        circle.setAttribute(
            "cy",
            node.y
        );

        circle.setAttribute(
            "r",
            "18"
        );

        circle.setAttribute(
            "fill",
            "#222"
        );

        circle.setAttribute(
            "stroke",
            "#39d98a"
        );

        circle.setAttribute(
            "stroke-width",
            "3"
        );

        const text=document.createElementNS(
            SVG_NS,
            "text"
        );

        text.classList.add(
            "treeLabel"
        );

        text.setAttribute(
            "x",
            node.x
        );

        text.setAttribute(
            "y",
            node.y+7
        );

        text.setAttribute(
            "text-anchor",
            "middle"
        );

        text.setAttribute(
    "fill",
    "#d8fff1"
);

        text.setAttribute(
            "font-size",
            "20"
        );

        text.textContent=node.kana;

        g.appendChild(circle);

        g.appendChild(text);

        svg.appendChild(g);

    });

}

function updateTree(code){

    drawTree();

}

async function animatePath(code){

}

drawTree();

function highlightPath(code){

    updateTree(code);

}