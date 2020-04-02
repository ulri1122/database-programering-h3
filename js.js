

function deleteTask(task_id) {
    console.log(task_id);
    $.post( "handler.php?cmd=delete_task",{"task_id" : task_id}, function( data ) {
        $('#task'+task_id).parent().toggle();
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
        $.each(data, function(val, text) {
            $('#dd_task').append(
                '<li><input type ="button" class = "btn btn-primary task_btn " onclick = "openTask('+text.id+')" id ="task'+text.id+'" value ='+text.task_name+'><input type="button" onclick = "deleteTask('+text.id+')" value ="X" class ="btn btn-warning"/></li>'
            );
        })
        $('.create_task').attr('id', proj_id)
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
                '<li><input type ="button" class = "btn btn-primary task_btn " id ="user'+text.id+'" value ='+text.name+'><input type="button"  id ="'+text.id+'" value ="X" class =" user_delete btn btn-warning"/></li>'
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
                '<li id = deleteProj_'+text.id+'><input type ="button"  class = "btn btn-primary" onclick = openProj('+text.id+') value ='+text['proj_name']+' ><input type="button" onclick = "deleteProj('+text.id+')" value ="X" class ="btn btn-warning"/></li>'
            );
        });
    });
    $("#create_proj").click(function(){
        text = $("#proj_name").val();
        
        $.post( "handler.php?cmd=create_proj",{"proj_name" : text}, function( data ) {
            console.log(data);
            var data = JSON.parse(data);
            $('#dd_project').append(
                '<li deleteProj_'+text.id+' ><input type ="button" class = "btn btn-primary " value ='+text+' onclick = openProj('+data[0]+') ><input type="button" onclick = "deleteProj('+data+')" value ="X" class ="btn btn-warning"/></li>'
            );
        });
    });

    var dd_task = $('#dd_task');

    


    $(".create_task").click(function(){
        text = $("#task_name").val();
  
        $.post( "handler.php?cmd=create_task",{"proj_id":this.id,"task_name" : text}, function( data ) {
            var data = JSON.parse(data);
            console.log(data);

            $('#dd_task').append(
                '<li><input type ="button" class = "btn btn-primary " onclick = "openTask('+data+')" id ='+data+' value ='+text+' ><input type="button" onclick = "deleteTask('+data+')" value ="X" class ="btn btn-warning"/></li>'
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
                    '<li> <input type ="text" id = task_'+text.id+' value ="'+text.task_name+'"><button class ="task_edit">edit</button></li>'
                );
            });
            
            $('.task_edit').click(function () {
                task_name = $(this).prev().val()
                task_id = $(this).prev().attr('id').substring(5)
                $.post( "handler.php?cmd=edit_task", {"id" : task_id, "task_name" : task_name }, function( data ) {
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
            '<li><input type ="text" value ='+text.name+' class ="user_id_'+text.id+'"><button class = "update_user btn btn-warning ">update</button><button class = "delete_user btn btn-danger">X</button><button class = "btn btn-primery current_tasks">current taskes</button></li>'
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