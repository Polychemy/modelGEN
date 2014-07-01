modelGEN
========

Polychemy's Model Generator API. <br>
Use this API to create and customize any of the available Polychemy Jewelry.
This API Also provides tools to place and ship orders to a location you specify.

This API Is restricted access only, permission is granted to selected sites. 
If you are intrested in implimenting our apps on your site. Do contact us at contact@polychemy.com.


<center>
For an Example of these apps in action, check out our main site here:<br>
http://www.polychemy.com
</center>

How Does it Work?
=================
Use our API to send a request to Polychemy's customization server. <br>
Polychemy's Servers will then process your request and genrate the relevant custom Jewelry design based on your specification. A link to download a Low Res 3D Model File for display will be returned to you.<br>
You can then proceed to download the 3D model file or display it on a web browser with WEBGL.<br>

User can then place an order on our order system and have your jwelry manufactured and drop shipped to a location you specify. Payment must be made before hand.

The Basics
===========
Let's create a <a href="http://www.polychemy.com/RomanRing.php">Polychemy Roman Ring</a> in Sterling Silver with the name "Charles".<br>

<b>1) An Example request to the Polychemy Model Gen Server.</b><br>
Send a GET Request to our modelGEN server : http://54.191.4.213/modelGEN.php<br>
<code>
http://54.191.4.213/modelGEN.php?PASS=3846283&script=NameNecklace.py&arg0=2&arg1=grace&arg2=grace
</code>

PASS - Your Uniqie acess token.<br>
script - The jwelry design type. <br>
arg0 - unique variables required for this jewelry design. See below refrence Guid for more info.<br>
arg2 - unique variables required for this jewelry design. See below refrence Guid for more info.<br>
arg3 - unique variables required for this jewelry design. See below refrence Guid for more info.<br>

The JSNOP Response:<br>

<blockquote>
JSNOP Response:<br>
create3DModel(<br>
<br>
{<br>
"Output": "SUCESS",<br>
"file": "DONE", <br>
"material": "DONE", <br>
"StillRender": "http://54.191.4.213/ModelDATABASE.php?getfile=PNG&ID=584351", <br>
"FolderNumber": "584351", <br>
"AppCallID": "108523", <br>
"boundingX": "19.795589447021484",<br>
"boundingY": "7.932041168212891",<br>
"boundingZ": "19.830873489379883",<br>
"volume": "0.3737025921655804",<br>
"GoldPlateWholesale": "83",<br>
"GoldPlateRetail": "109.99",<br>
"SilverWholesale": "99",<br>
"SilverRetail": "129.99"<br>
}<br>
<br>
);<br>
</blockquote>
