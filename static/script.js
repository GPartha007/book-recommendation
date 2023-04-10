// Apply on keypress event with ajax
// document.getElementById("myText").placeholder = "Type name here..";


$(document).ready(function(){
    // $("#types").on("change", function(){
    //     type_val = $("#types").val()
    //     if (type_val == 'book'){
    //         document.getElementById("search_inp").placeholder = "Search From Top 50 Books"
    //     } else{
    //         document.getElementById("search_inp").placeholder = "Search From Top 50 Authors"
    //     }
    // })

    $("#search_inp").on("keyup", function(){
        inp_val = $('#search_inp').val()
        type_val = $("#types").val()
        // $(".test").html(inp_val)
        ajax_data = {
            "type"        : type_val,
            "search_text" : inp_val
        }

        $.ajax({
            data        : JSON.stringify(ajax_data),
            type        : "POST",
            url         : window.location.href+"/search",
            contentType : 'application/json',
            dataType    : 'json',
            success     : function (response) {
                // alert(response.type)
                // console.log(response.data)
                // alert(response.data.length)
                arr = []
                for (let i = 0; i < response.data.length; i++) {
                    // console.log(i+","+response.data[i][3])
                    arr.push(response.data[i])
                }
                img = []
                $(".row").html("")
                for (var i = 0; i < arr.length; i++) {
                    title = (arr[i][0].length <= 16) ? arr[i][0] : (arr[i][0].slice(0,13) + '...')
                    ratings = ''
                    if (Math.round(arr[i][2]) == 1){
                        ratings = '<i class="fa fa-star"></i>'
                    } else if(Math.round(arr[i][2]) == 2){
                        ratings = '<i class="fa fa-star"></i><i class="fa fa-star"></i>'
                    } else if(Math.round(arr[i][2]) == 3){
                        ratings = '<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>'
                    } else if(Math.round(arr[i][2]) == 4){
                        ratings = '<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>'
                    } else if(Math.round(arr[i][2]) == 5){
                        ratings = '<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>'
                    }

                    html = '<div class="col-sm-2 mt-3 mb-3"><div class="outer_1" style="height: 470px;"><div class="img"><img src="' + arr[i][3] +'" alt="books" width="100%" height="200px"></div><div class="inner_1"><div class="inner_text" title="'+ arr[i][0] +'"><b>Title: </b><p> '+ title +'</p></div><div class="inner_text"><b>Author:</b><p>'+ arr[i][1] +'</p></div><span class="inner_text"><b>Votes: </b><span>'+Math.round(arr[i][2])+'.0 '+'</span>'+ratings+'<div class="explore"><button class="btn btn-warning exp_btn">Explore</button></div></div></div>'
                    img.push(html)
                }
                if (img.length != 0){

                    $(".row").html(img)
                    $(".not_found").html("")
                } 
                else{
                    $(".not_found").html("&#128531; No Items Found")
                }
                
            }
        })
    })
})