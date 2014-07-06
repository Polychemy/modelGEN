modelGEN
========

Polychemy's Model Generator API. <br>
The modelGEN API allows anyone to create and customize any of the available Polychemy Jewelry.

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

User can then place an order on our order system and once payment has been cleared.<br>
We will begin manufacturing and drop ship to your specified Location.

*Please note that you can only make 1 request per session. Only after the request is completed, will you be abel to make more requests

A Basic Example
===========
Let's create a <a href="http://www.polychemy.com/RomanRing.php">Polychemy Roman Ring</a> in Sterling Silver with the name "Charles".<br>

<b>1) An Example request to the Polychemy Model Gen Server.</b><br>
Send a GET Request to our modelGEN server : http://54.191.4.213/modelGEN.php<br>
<code>
http://54.191.4.213/modelGEN.php?PASS=3846283&script=NameNecklace.py&arg0=2&arg1=grace&arg2=grace
</code>

PASS - <em>Your Uniqie acess token.</em><br>
script - <em>The jwelry design type.</em> <br>
arg0 - <em>unique variables required for this jewelry design. See below refrence Guid for more info.</em><br>
arg2 - <em>unique variables required for this jewelry design. See below refrence Guid for more info.</em><br>
arg3 - <em>unique variables required for this jewelry design. See below refrence Guid for more info.</em><br>

The JSNOP Response:<br>

<blockquote>
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

<br>
Important Variables:<br>
file - <em>The URL to download the 3d OBJ file.<br>
material - <em>the material file assosiatd with this OBJ.<br>
StillRender - <em>A single still render of the genrated design in PNG with alpha.<br>
Bounding X,Y,Z - <em>The width, height and depth of the jwelry in mm.<br>
Volume - <em>The total volume ammount of this design.<br>
WholeSalePrice - <em>The wholesale price for this design.<br>
Recommened Retail Price. - <em>The recommened retail price for this design.<br>

<b>2)Downloading 3D Model File.</b><br>
In the next step, we would want to download the 3d model file or stream it to a webGL viewer.<br>

To Download the obj file send GET Request too:<br>
<code>http://54.191.4.213/ModelDATABASE.php?PASS=321323&getfile=PNG&ID=584351</code>
<br>
PASS - <em>Your Uniqie acess token.</em><br>
getfile - <em>File type.</em> <br>
ID - <em> The Modle id. </em>

This will return the OBJ file for download.
And now you're done! All you need to do now is build a WEBGL viewer to view the 3D file, and a simple interface to customizae tthe jwelry<br>

Placing Orders
=============
Coming Soon..
