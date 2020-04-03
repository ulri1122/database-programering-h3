<?php


?>

<!DOCTYPE html>
<html>
    <head>
        <!-- Latest compiled and minified CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
        <!-- jQuery library -->
        

        
        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

        <!-- Latest compiled JavaScript -->
        <script type="text/javascript" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>

        <link href="style.css" type="text/css" rel="stylesheet">
        <script src="jquery.fn.gantt.min.js"></script>
        <script src="http://cdnjs.cloudflare.com/ajax/libs/moment.js/2.8.4/moment.min.js"></script>
      
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
    <div class ="container">
      <div  class = "col-sm" >
        <button type="button" class="btn btn-primary" id ="user_btn" >
            tilføj bruger
          </button>
          </div>
        <div class ="col-sm" >    
            <h1>projects</h1>
            <input style ="display:inline;" id="proj_name"/>
            <input type="button" value ="opret" id ="create_proj">
            <table id ="dd_project">
            </table>
        </div>

        


        <div class = "col-sm" >


        <h1>tasks</h1>
        <input style ="display:inline;" id="task_name"/>
        <input id ="start-date" type = "date">
        <input id = "stop-date" type = "date">  
        <input type="button" value ="opret" class ="create_task">
        <button type="button" class="btn btn-primary" id ="task_modal_btn" >tilføj bruger</button>
        <table id ="dd_task">
        </table>
        </div>
        <div class ="col-sm" >
            <input type="hidden" class ="task_id_hidden">
            

            <h1>users</h1>
            <select class ="dropdown user_dd">
            </select>
            <input type="button" value ="tilføj" class ="add_user">
            <ul id ="dd_user">
            </ul>
          
      </div>

<!-- Button trigger modal -->


</div>
<div class="gantt"></div>
</body>
</html>

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
            <table id ="edit_users">
            </table>
               

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
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
            <table id ="task_list">
            </table>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
