import $ from "jquery";

const loadHtmlCallbacks = [];

export function onLoadHtmlSuccess(callback) {
    if(!loadHtmlCallbacks.includes(callback)) {
        loadHtmlCallbacks.push(callback);
    };
};

function loadIncludes(parent) {
    if(!parent) {
        parent = "body";
    }
    $(parent).find("[wm-include]").each(function (index,element) {
        const url = $(element).attr("wm-include");
        $.ajax({
            url,
            success (data) {
                $(element).html(data);
                $(element).removeAttr("wm-include");
                loadIncludes(element);
                loadHtmlCallbacks.forEach(callback => callback(data));
            }
        })
    });
}

loadIncludes();