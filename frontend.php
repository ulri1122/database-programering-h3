<?php


?>

<!DOCTYPE html>
<html>
    <head>
        <!-- Latest compiled and minified CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">

        <!-- jQuery library -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

        <!-- Latest compiled JavaScript -->
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
        <meta charset="UTF-8">
        <title>title</title>
        <style> 
            pre { 
                overflow-x: auto;
                white-space: pre-wrap;
                white-space: -moz-pre-wrap;
                white-space: -pre-wrap;
                white-space: -o-pre-wrap;
                word-wrap: break-word;
            }  
        </style> 

        <script type="text/javascript" src="js.js"></script>

    </head>
    
    <body>
    <div>
        <span style ="width:300px; float:left;">    
            <h1>projects</h1>
            <input style ="display:inline;" id="proj_name"/>
            <input type="button" value ="opret" id ="create_proj">
            <ul id ="dd_project">
            </ul>
        </span>
        <span style ="width:600px; float:left;">


        <h1>tasks</h1>
        <input style ="display:inline;" id="task_name"/>
        <input id ="start-date" type = "date">
        <input id = "stop-date" type = "date">  
        <input type="button" value ="opret" class ="create_task">
        <button type="button" class="btn btn-primary" id ="task_modal_btn" >tilføj bruger</button>
        <ul id ="dd_task">
        </ul>
      
        </span>
        <span style ="width:600px; float:left;">
            <input type="hidden" class ="task_id_hidden">
            

            <h1>users</h1>
            <select class ="dropdown user_dd">
            </select>
            <input type="button" value ="tilføj" class ="add_user">
            <ul id ="dd_user">
            </ul>
          
            </span>

<!-- Button trigger modal -->
<button type="button" class="btn btn-primary" id ="user_btn" >
    tilføj bruger
  </button>
  
  <!-- Modal -->
  <div class="modal fade" id="user_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">add user</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
           <h3>bruger navn</h3>
          <input id ="new_user" type="text" value="">
          <input type="button" id="createUser" value="submit">

            <hr> 
            <h5>delete/edit user</h5>
            <ul id ="edit_users">
            </ul>
               

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="task_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">add user</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
            <h5>tasks</h5>
            <ul id ="task_list">
            </ul>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
    </body>
</html>
