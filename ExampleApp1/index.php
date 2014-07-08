<?php
//Your Iser Key:
$UserKey = "POLYCHEMY";
// Get cURL resource
$curl = curl_init();
// Send UserKey
curl_setopt_array($curl, array(
    CURLOPT_RETURNTRANSFER => 1,
    CURLOPT_URL => 'http://polychemy3d.com/ModelDATABASE.php?getaccessKey='.$UserKey,
    CURLOPT_USERAGENT => 'Access Token Request'
));
// Send the request & save response to $resp
$resp = curl_exec($curl);
// Close request to clear up some resources
curl_close($curl);

//If Authentication is not scessuful, we will terminate the script
If($resp!="AUTHENTICATION FAILURE"){
	$accessToken = $resp;
}else{
	exit("Authentication Failure");
	
}

?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Polychemy - Roman Ring</title>

<script type="text/javascript">
//We pass the Access token from the PHP cURL script too our jaavscript.
var ACCESSTOKEN = "<?php echo $accessToken ?>";
</script>


<script src="js/jquery-1.9.0.min.js" type="text/javascript"></script> 
<!--This script helps to detect of WebGl Is enabled.-->
<script src="js/Detector.js"></script>

</head>

<body>


<h1>Polychemy Roman Ring</h1>

<em>Polychemy's Roman rings are for the Royal at heart. <br />
Customized with 3D printing, and casted in a variety of precious metals, and polished to a mirror finish. Each ring custom made just for you.<br />
Personalise this Roman ring and have your name made into our ring’s Design.<br />
Polychemy Roman Rings are made just for you and personalised to you taste.<br /></em>

<p>
<div id="3DDisplay" style="width:500px; height:300px;background-repeat:no-repeat;background-position:center;"  onmousedown="MouseDown3DDisplay(event)"></div>
<p>

<p>
<h2><div id="status">Loading..</div></h2>
</p>
Custom Text : <input name="CustomText" id="CustomText" type="text" value="Love" size="20" maxlength="8" style=" width:250px;" /><br />
Material : 
  <select name="Material" id="Material" style=" width:250px;" id="ChosenMaterial" >
      <option selected value="Gold_Plated_Brass" >Gold Plated</option>
      <option value="Sterling_Silver" >Sterling Silver</option>
  </select><br />


 Ring Size : 
 <select name="RingSize" id="RingSize"  style="width:250px;">
           <option value="3"> 3</option>
          <option value="3.5"> 3.5</option>
          <option value="4"> 4</option>
          <option value="4.5"> 4.5</option>
          <option value="5"> 5</option>
          <option value="5.5"> 5.5</option>
          <option selected value="6"> 6</option>
          <option value="6.5"> 6.5</option>
           <option value="7"> 7</option>
           <option value="7.5"> 7.5</option>
           <option value="8"> 8</option>
           <option value="8.5"> 8.5</option>
           <option value="9"> 9</option>
           <option value="9.5"> 9.5</option>
           <option value="10"> 10</option>
           <option value="10.5"> 10.5</option>
           <option value="11"> 11</option>
           <option value="11.5"> 11.5</option>
           <option value="12"> 12</option>
           <option value="12.5"> 12.5</option>
           <option value="13"> 13</option>
          </select>

<br /><p>
<input name="Refresh" type="button" value="Refresh"  style="width:350px;" onmouseup="createJewelry();"/>


	<script src="js/three.js"></script>
	<script src="js/MTLLoader.js"></script>
    <script src="js/OBJMTLLoader.js"></script>
    <script src="3DDisplay.js"></script>

</body>
</html>
