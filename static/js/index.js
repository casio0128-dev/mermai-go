const config = {
    downloadImgInfo: {
        type: "png",
        fileName: "graph"
    },
    isLivePreview: false
}

function setEventHandlers() {
    const input = document.getElementById("mermaid-input");
    const downloadImgTypePNG = document.getElementById("img-type-png");
    const downloadImgTypeSVG = document.getElementById("img-type-svg");
    const downloadImgFilename = document.getElementById("img-file-name");

    input.addEventListener("keyup", function (e) {
        if (config.isLivePreview) {
            render();
        }
    })
    downloadImgTypePNG.addEventListener("change", function (e) {
        config.downloadImgInfo.type = "png";
        downloadImgFilename.placeholder = "graph.png";
    });
    downloadImgTypeSVG.addEventListener("change", function (e) {
        config.downloadImgInfo.type = "svg";
        downloadImgFilename.placeholder = "graph.svg";
    });
    downloadImgFilename.addEventListener("change", function (e) {
        const filename = e.target.value.replaceAll(" ", "_");
        if (filename == null) {
            config.downloadImgInfo.fileName = "graph";
        } else {
            let name = "";
            switch (config.downloadImgInfo.type) {
                case "png":
                    name = filename.split(".png")[0];
                    break;
                case "svg":
                    name = filename.split(".svg")[0];
                    break;
                default:
            }
            config.downloadImgInfo.fileName = name;
        }
    });
}

function svg2imageData(svgElement, successCallback, errorCallback) {
    const canvas = document.createElement('canvas');
    canvas.width = svgElement.width.baseVal.value;
    canvas.height = svgElement.height.baseVal.value;
    const ctx = canvas.getContext('2d');
    const image = new Image();
    image.onload = () => {
        ctx.drawImage(image, 0, 0, image.width, image.height);
        successCallback(canvas.toDataURL());
    };
    image.onerror = (e) => {
        errorCallback(e);
    };
    const svgData = new XMLSerializer().serializeToString(svgElement);
    image.src = 'data:image/svg+xml;charset=utf-8;base64,' + btoa(svgData);
}

function download() {
    const successFunc = function (b) {
        const svg = document.createElement("img")
        svg.src = b

        let link = document.createElement('a');
        switch (config.downloadImgInfo.type) {
            case "png":
                link.download = config.downloadImgInfo.fileName + ".png"
                link.href = b;
                break;
            case "svg":
                link.download = config.downloadImgInfo.fileName + ".svg"
                const b64 = b.split("data:image/png;base64,")[1];
                link.href = 'data:image/svg+xml;charset=utf-8;base64,' + b64;
                break;
        }
        link.click();
        URL.revokeObjectURL(link.href);
    }
    const failedFunc = function (e) {
        console.log("failed")
    }
    svg2imageData(document.querySelector("#mermaid-output svg"), successFunc, failedFunc)
}

function copy() {
    const svgData = new XMLSerializer().serializeToString(document.querySelector("#mermaid-output svg"));
    navigator.clipboard.writeText(svgData);
}

function save() {
    localStorage.setItem("config", JSON.stringify(config))
}

function livePreviewOn() {
    config.isLivePreview = true;
}
function livePreviewOff() {
    config.isLivePreview = false;
}