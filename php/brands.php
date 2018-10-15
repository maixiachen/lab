<?php
  include 'conn.php';
  $result=mysql_query("select * from brands");

  $arraylist=array();
   for ($i=0; $i < mysql_num_rows($result); $i++) { 
     $arraylist[$i]=mysql_fetch_array($result,MYSQL_ASSOC);
   }
 
   echo json_encode($arraylist);
?>