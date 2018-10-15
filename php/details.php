<?php
  include 'conn.php';

   
   if(isset($_GET['sid'])){
     $sid=$_GET['sid'];
   }

   $result=mysql_query("select * from product where sid='$sid'");
   $picarr=array();
   for($i=0;$i<mysql_num_rows($result);$i++){
     $picarr[$i]=mysql_fetch_array($result,MYSQLI_ASSOC);
   }
   echo json_encode($picarr);

?>