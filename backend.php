<?php
include_once "sqldb.php";

class backend extends DbConn{

    function getTasks($id){

        $statement = $this->conn->prepare('SELECT * FROM task where project_id = :id');
        $statement->execute(array(":id"=> $id));
        $results = $statement->fetchAll(PDO::FETCH_ASSOC);
        return json_encode($results,true);
    }

    function getProjects(){
        $statement = $this->conn->prepare('SELECT * FROM project');
        $statement->execute();
        
        $results = $statement->fetchAll(PDO::FETCH_ASSOC);
        return json_encode($results,true);
    }
    function create_proj($proj_name){
        $statement = $this->conn->prepare('INSERT INTO project (proj_name) VALUE (:data)');
        $statement->execute(array(":data"=> $proj_name));
        $data = $this->conn->lastInsertId();
        return json_encode($data,true);
    }
    function create_task($task_name,$proj_id){


        $statement = $this->conn->prepare("INSERT INTO task set task_name =:task_name, project_id = :proj_id");
        $statement->execute(array(":task_name"=> $task_name, ":proj_id"=> $proj_id));
        $data = $this->conn->lastInsertId();
        return json_encode($data,true);
    }
    function getUser($task_id){

        $statement = $this->conn->prepare("SELECT * FROM task INNER JOIN project_to_user
        ON task.id = project_to_user.task_id 
        INNER JOIN user
        ON user.id = project_to_user.user_id
        WHERE task.id = :task_id");
        $statement->execute(array(":task_id"=> $task_id));

        $results = $statement->fetchAll(PDO::FETCH_ASSOC);
        return json_encode($results,true);
    }
    function getUnusedUsers($task_id){

        $statement = $this->conn->prepare("SELECT * FROM user WHERE id NOT IN 
        (SELECT user_id FROM project_to_user WHERE task_id = :task_id)");

        $statement->execute(array(":task_id"=> $task_id));

        $results = $statement->fetchAll(PDO::FETCH_ASSOC);
        return json_encode($results,true);
        
    }
    function addUser($user_id,$task_id){
        $statement = $this->conn->prepare("INSERT into project_to_user set user_id = :user_id, task_id = :task_id");

        $statement->execute(array(":user_id"=> $user_id, ":task_id"=> $task_id ));
    }
    function deleteUserOffTask($user_id,$task_id)
    {

        $statement = $this->conn->prepare("DELETE FROM project_to_user where user_id = :user_id and task_id = :task_id");

        $statement->execute(array(":user_id"=> $user_id, ":task_id"=> $task_id ));
    }

    function deleteTask($task_id)
    {
        $statement = $this->conn->prepare("DELETE FROM task where  id = :task_id");

        $statement->execute(array(":task_id"=> $task_id ));
    }
    function deleteProj($proj_id)
    {
        $statement = $this->conn->prepare("DELETE FROM project where  id = :proj_id");

        $statement->execute(array(":proj_id"=> $proj_id ));
    }
    function createUser($username){ 
        $statement = $this->conn->prepare("INSERT INTO user set NAME = :username");
        $statement->execute(array(":username"=> $username ));
    } 
    function getAllUsers(){
        $statement = $this->conn->prepare("SELECT * FROM user");
        $statement->execute();
        
        $results = $statement->fetchAll(PDO::FETCH_ASSOC);
        return json_encode($results,true);
    } 
    function updateUser($user_id,$username){
        $statement = $this->conn->prepare("UPDATE user set NAME = :navn where id = :user_id");
        $statement->execute(array(":navn" => $username, ":user_id" => $user_id));
    } 
    function deleteUser($user_id){
        $statement = $this->conn->prepare("DELETE FROM user where  id = :user_id");
        $statement->execute(array( ":user_id" => $user_id));
    } 
    function showCurrentUserTasks($user_id){
        $statement = $this->conn->prepare("SELECT task.task_name FROM user 
        INNER JOIN project_to_user
        ON user.id = project_to_user.user_id
        INNER JOIN task
        ON task.id = project_to_user.task_id
        WHERE user.id = :user_id");
        $statement->execute(array( ":user_id" => $user_id));
        $results = $statement->fetchAll(PDO::FETCH_ASSOC);
        return json_encode($results,true);
    } 
    function editTask($task_id, $task_name) {
        print_R($task_id.$task_name);
        $statement = $this->conn->prepare("UPDATE task set task_name = :task_name where id = :task_id");
        $statement->execute(array( ":task_name" => $task_name, ":task_id" => $task_id));
    } 
}
