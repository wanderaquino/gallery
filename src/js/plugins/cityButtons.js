import $ from "jquery";
import {onLoadHtmlSuccess} from "../core/includes";

const duration = 600;


function filterByCity(city) {
    $("[wm-city]").each(function(index,element) {
        const target = $(this).attr("wm-city") === city || city === null;

            target ? $(this).fadeIn(duration, () => $(this).parent().removeClass("d-none")) : 
            $(this).fadeOut(duration, () => $(this).parent().addClass("d-none"));  
    });
};


$.fn.cityButtons = function () {
    const cities = new Set;

    $("[wm-city]").each(function (index, element) {
        cities.add($(element).attr("wm-city"));
    });

    const buttons = Array.from(cities).map(city => {
        const btn = $("<button>").addClass(["btn","btn-info"]).html(city);
        btn.on("click", e => filterByCity(city));
        return btn;
    });

    const allButton = $("<button>")
        .addClass(["btn","btn-info","active"])
        .html("Todas")
        .on("click", e => filterByCity(null));
           

    buttons.push(allButton);

    const buttonGroup = $("<div>").addClass("btn-group");
    buttonGroup.append(buttons);

    $(this).html(buttonGroup);
        
    return $(this);
}

onLoadHtmlSuccess(function() {
    $("[wm-city-buttons]").cityButtons();
});