$(document).ready(function () {
    $("#rec_not_found").hide()
    /*let text = 'ABCDskdjfskd \n' +
    'Hello world'
    console.log(text)*/

    $("#book_names_id").on("change", function () {
        book_name = $(this).val()
        $("#spinner_outer").show()
        console.log(book_name)
        ajax_data = {
            "book_name": book_name
        }
        $.ajax({
            data: JSON.stringify(ajax_data),
            type: "POST",
            url : "/recommend",
            contentType: 'application/json',
            dataType: 'json',
            success: function (response) {
                if (response.result == false) {
                    $("#rec_not_found").show()
                    $("#rec_not_found").html("&#128531; No Recommendations Found")
                    $("#rec_books").hide()
                    $("#spinner_outer").hide()
                } else {
                    $("#rec_not_found").hide()
                    $("#rec_books").show()
                    $("#spinner_outer").hide()
                    arr = []
                    for (var i = 0; i < response.result.length; i++) {
                        arr.push(response.result[i])
                    }
                    $("#rec_books").html("")
                    for (var i = 0; i < arr.length; i++) {
                        /*html = '<div class="col-sm-3"><div style="color:white;font-size: 20px;">'+arr[i][0]+'</div><div style="color:white;font-size: 20px;">'+arr[i][1]+'</div><div style="color:white;font-size: 20px;">'+arr[i][2]+'<div>-----------------------------------------------------------------</div>'*/

                        html = '<div class="col-sm-3">' +
                            '<div class="outer_1" style="height: 393px;">' +
                            '<div class="img">' +
                            '<img src="' + arr[i][2] + '" alt="books" width="100%" height="200px">' +
                            '</div>' +
                            '<div class="inner_1">' +
                            '<div class="inner_text" title="">' +
                            '<b style="font-size:15px;">Title: </b>' +
                            '<p style="font-size:14px;">' + arr[i][0] + '</p>' +
                            '</div>' +
                            '<div class="inner_text">' +
                            '<b style="font-size:15px;">Author:</b>' +
                            '<p style="font-size:14px;">' + arr[i][1] + '</p>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div>'

                        $("#rec_books").append(html)
                        //console.log(arr[i][2])
                    }
                    $("#rec_books").css({ "margin-top": "220px" })
                }
            }
        })
    })

})