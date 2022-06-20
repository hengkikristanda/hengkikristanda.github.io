$(document).ready(function () {

    $(".card-body a").on("click", function () {
        let cardTitle = $(this).parent().find(".card-title").text();
        $("#landingPageModalModalLabel").text(cardTitle + " Link");
    });

    $("#inputFilterTableData").on("keyup", function () {

        let target = "#" + $("tbody").attr('id') + " tr";
        var value = $(this).val().toLowerCase();

        $(target).filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });

    });

})
