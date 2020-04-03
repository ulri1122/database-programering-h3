

function deleteTask(task_id) {
    console.log(task_id);
    $.post( "handler.php?cmd=delete_task",{"task_id" : task_id}, function( data ) {
        $('#task'+task_id).parent().parent().remove();
    })
}

function deleteProj(proj_id) {
    console.log(proj_id);
    $.post( "handler.php?cmd=delete_proj",{"proj_id" : proj_id}, function( data ) {
        $('#deleteProj_'+proj_id).remove();
    })
}
function openProj(proj_id){
    
    $('#dd_task').html("");
    $('#dd_user').html("");
    $('.user_dd').empty();
    
    $.post( "handler.php?cmd=get_task",{"id" : proj_id}, function( data ) {
        var data = JSON.parse(data);
        var dataset =[]; 
        var value =[];
        $.each(data, function(val, text) {
            $('#dd_task').append(
                '<tr><th><input type ="button" class = "btn btn-primary task_btn " onclick = "openTask('+text.id+')" id ="task'+text.id+'" value ='+text.task_name+'></th><th>'+text.fromm+ ' - '+text.too+'</th><th><input type="button" onclick = "deleteTask('+text.id+')" value ="X" class ="btn btn-warning"/></th> </tr>'
            );
            value.push({
                from: text.fromm,
                to: text.too,
                label: text.task_name,
                customClass: "ganttRed"
            })

            dataset.push ({
                name: text.task_name,
                desc: " ",
                values:value
            })
         
            value = [];

        })

       

        console.log(dataset);
        gantt_diagram(dataset)
        $('.create_task').attr('id', proj_id)
    });
    
}


function gantt_diagram(dataset){

    $(".gantt").gantt({
        source: dataset,
        scale: "days",
        minScale: "days",
        navigate: "scroll"
    });

}


function openTask(task_id){
    console.log(task_id); 
    $('#dd_user').html("");
    $('.user_dd').empty();
    $.post( "handler.php?cmd=get_user",{"task_id" : task_id}, function( data ) {
        console.log(data);
        var data = JSON.parse(data);
        console.log(data);
        $.each(data, function(val, text) {
            $('#dd_user').append(
                '<tr><th><input type ="button" class = "btn btn-primary task_btn " id ="user'+text.id+'" value ='+text.name+'></th><th><input type="button"  id ="'+text.id+'" value ="X" class =" user_delete btn btn-warning"/></th></tr>'
            );
        })
        $(".user_delete").click(function(){
            $("#user"+$(this).attr("id")).parent().remove();
            console.log($(this).attr("id"));
            console.log(task_id)
            $.post( "handler.php?cmd=delete_user_off_task",{"task_id" : task_id ,'user_id': $(this).attr("id")}, function( data ) {
            })
        })
    });

    $.post( "handler.php?cmd=get_unused_users",{"task_id" :task_id }, function( data ) {
        var data = JSON.parse(data);
        console.log(data);
        $.each(data, function(val, text) {
            $('.user_dd').append( 
                "<option value ="+text.id+" >"+text.name+"</option>"
            )
        }) 
        
        $('.create_task').attr('id', task_id)
    });
}

$(function(){


    var mySelect = $('#dd_project');
    $.post( "handler.php?cmd=get_proj", function( data ) {

        var data = JSON.parse(data);
        
        console.log(data);
        $.each(data, function(val, text) {
            mySelect.append(
                '<tr id = deleteProj_'+text.id+'><th><input type ="button"  class = "btn btn-primary" onclick = openProj('+text.id+') value ='+text['proj_name']+' ></th><th><input type="button" onclick = "deleteProj('+text.id+')" value ="X" class ="btn btn-warning"/></th></tr>'
            );
        });
    });
    $("#create_proj").click(function(){
        text = $("#proj_name").val();
        
        $.post( "handler.php?cmd=create_proj",{"proj_name" : text}, function( data ) {
            console.log(data);
            var data = JSON.parse(data);
            $('#dd_project').append(
                '<tr deleteProj_'+text.id+' ><th><input type ="button" class = "btn btn-primary " value ='+text+' onclick = openProj('+data[0]+') ></th><th><input type="button" onclick = "deleteProj('+data+')" value ="X" class ="btn btn-warning"/></th></tr>'
            );
        });
    });

    var dd_task = $('#dd_task');

    


    $(".create_task").click(function(){
        text = $("#task_name").val();
        startTime = $(this).prev().prev().val()
        stopTime = $(this).prev().val()
        console.log(startTime+stopTime);
        $.post( "handler.php?cmd=create_task",{"proj_id":this.id,"task_name" : text,"startTime":startTime,"stopTime":stopTime}, function( data ) {
            var data = JSON.parse(data);
            console.log(data);

            $('#dd_task').append(
                '<tr><th><input type ="button" class = "btn btn-primary " onclick = "openTask('+data+')" id ='+data+' value ='+text+' ></th><th><input type="button" onclick = "deleteTask('+data+')" value ="X" class ="btn btn-warning"/><th><th><p>'+startTime+ '</p></th> <th> <p>'+stopTime+'</p></th></tr>'
            );
        });
    });

    $(".add_user").click(function(){

        task_id = $('.create_task').attr('id');
        user_id =$(".user_dd").val();
        console.log(user_id);
        console.log(task_id);
   
        $.post( "handler.php?cmd=add_user",{"task_id" : task_id, "user_id" :user_id}, function( data ) {
          openTask(task_id);
        
        });
    })
    $("#createUser").click(function () {
        $.post( "handler.php?cmd=create_user",{"username" : $("#new_user").val()}, function( data ) {
            window.location.reload()
        });
        
    })
    $('#user_btn').click(function(){
        // $('#myModal').modal('toggle');
        $.post( "handler.php?cmd=get_all_users", function( data ) {
            console.log(data);
            $('#user_modal').modal('show');
            showallusers(data);
        });
    })
    $('#task_modal_btn').click(function(){ 
        var mySelect = $('#task_list');
        task_id = $(this).prev().attr("id");
        $.post( "handler.php?cmd=get_task", {"id" : task_id}, function( data ) {
            var data = JSON.parse(data);
            console.log(data);
            $('#task_modal').modal('show');
            $.each(data, function(val, text) {
                mySelect.append(
                    '<tr> <th><input type ="text" id = task_'+text.id+' value ="'+text.task_name+'"></th><th><input type="date" value ="'+text.fromm.substring(0,10)+ '"> </th><th><input type="date"value ="'+text.too.substring(0,10) +'"></th><th><button class ="task_edit">edit</button></th></tr>'
                );
            });
            
            $('.task_edit').click(function () {
                task_name = $(this).prev().prev().prev().val()
                task_id = $(this).prev().prev().prev().attr('id').substring(5)
                startTime =$(this).prev().prev().val()
                stopTime = $(this).prev().val()
                $.post( "handler.php?cmd=edit_task", {"id" : task_id, "task_name" : task_name , "startTime":startTime,"stopTime":stopTime }, function( data ) {
                console.log(data)    
                })
            })
        });
    })
    
    

})
function showallusers(data) {


    var data = JSON.parse(data);
    $.each(data, function(val, text) {
        $('#edit_users').append(
            '<li><th><input type ="text" value ='+text.name+' class ="user_id_'+text.id+'"></th><th><button class = "update_user btn btn-warning ">update</button></th><th><button class = "delete_user btn btn-danger">X</button></th><th><button class = "btn btn-primery current_tasks">current taskes</button></th></li>'
        );
    })
    $('.delete_user').click(function(){
        userid = $(this).prev().prev().attr("class").substring(8)
        $.post( "handler.php?cmd=delete_user",{"user_id" : userid }, function( data ) {
        });
        $(this).parent().toggle();

    })
    $('.update_user').click(function(){
        username = $(this).prev().val()
        userid = $(this).prev().attr("class").substring(8)
        $.post( "handler.php?cmd=update_user",{"username" : username, "user_id": userid}, function( data ) {
            console.log(data);
        });

    })
    $('.update_user').click(function(){
        username = $(this).prev().val()
        userid = $(this).prev().attr("class").substring(8)
        $.post( "handler.php?cmd=update_user",{"username" : username, "user_id": userid}, function( data ) {
            console.log(data);
        });

    })
    $('.current_tasks').click(function(){
        userid = $(this).prev().prev().prev().attr("class").substring(8)
     
        $.post( "handler.php?cmd=show_current_user_tasks",{"user_id": userid}, function( data ) {
            var data = JSON.parse(data);
            tasks="";
            $.each(data, function(val, text) {
                tasks += text.task_name + " \n"
            })
            alert(tasks);
        });

    })

}