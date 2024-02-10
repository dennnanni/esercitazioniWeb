window.onload = function() {

    let lists = document.querySelectorAll("ul");

    for (let i = 0; i < lists.length; i++) {
        if (lists[i].parentElement.tagName.toLowerCase() === "li") {
            lists[i].style.display = "none";
        }
    }

    let links = document.querySelectorAll("a").forEach(function(link) {
        link.addEventListener("click", function(e) {
            let target = e.target;
            let subElement = link.nextElementSibling;
            if (subElement == null) {
                let text = "";
                let parent = target.parentElement;
                while (parent.tagName.toLowerCase() != "main") {
                    if (parent.tagName.toLowerCase() == "li") {
                        text = parent.children[0].innerHTML + (text == "" ? "" : " - " + text);
                    }
                    parent = parent.parentElement;
                }
                document.querySelector("span").innerHTML = text;
            } else if (target.nextElementSibling.tagName.toLowerCase() == "ul") {

                if (target.nextElementSibling.style.display == "none") {
                    target.nextElementSibling.style.display = "block";
                } else {
                    target.nextElementSibling.style.display = target.nextElementSibling.style.display == "none" ? "block" : "none";
                }
            }
        })
    });
}