<?php
include_once "backend.php";
$backend = new backend;
$result ="";
if($_GET['cmd'] == "create_proj"){
    
    $data = $backend->create_proj($_POST['proj_name']);
    print_R($data);
    

}else if($_GET['cmd'] == "get_proj"){
    $data = $backend->getProjects();
    print_R($data);
}else if($_GET['cmd'] == "create_task"){
    $result = $backend->create_task($_POST['task_name'],$_POST['proj_id'],$_POST['startTime'],$_POST['stopTime']);
}else if($_GET['cmd'] == "get_task"){
    $result = $backend->getTasks($_POST['id']);
}else if($_GET['cmd'] == "get_user"){
    $result = $backend->getUser($_POST['task_id']);
}else if($_GET['cmd'] == "get_unused_users"){
    $result = $backend->getUnusedUsers($_POST['task_id']);
}else if($_GET['cmd'] == "add_user"){
    print_R($_POST);
    $result = $backend->addUser($_POST['user_id'],$_POST['task_id']);
}else if($_GET['cmd'] == "delete_user_off_task"){
    $result = $backend->deleteUserOffTask($_POST['user_id'],$_POST['task_id']);
}else if($_GET['cmd'] == "delete_task"){
    $result = $backend->deleteTask($_POST['task_id']);
}else if($_GET['cmd'] == "delete_proj"){
    $result = $backend->deleteProj($_POST['proj_id']);
}else if($_GET['cmd'] == "create_user"){
    $result = $backend->createUser($_POST['username']);
}else if($_GET['cmd'] == "get_all_users"){
    $result = $backend->getAllUsers();
}else if($_GET['cmd'] == "delete_user"){
    $result = $backend->deleteUser($_POST['user_id']);
}else if($_GET['cmd'] == "update_user"){
    $result = $backend->updateUser($_POST['user_id'], $_POST['username']);
}else if($_GET['cmd'] == "show_current_user_tasks"){
    $result = $backend->showCurrentUserTasks($_POST['user_id']);
}else if($_GET['cmd'] == "edit_task"){
    print_R($_POST);
    $result = $backend->editTask($_POST['id'],$_POST['task_name'],$_POST['startTime'],$_POST['stopTime'] );
}





print_r($result);