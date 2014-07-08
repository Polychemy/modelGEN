modelGEN
========

Polychemy's Model Generator API. <br>
The modelGEN API allows anyone to create and customize any of the available Polychemy Jewelry.

This API requires an USER KEY, for access.
If you are intrested in implimenting our apps on your site. Do contact us at contact@polychemy.com.


<center>
For an Example of these apps in action, check out our main site here:<br>
http://www.polychemy.com
</center>

How Does it Work?
=================
1)Authenticate your self with your [USER KEY]<br>
2)Send request to polychemy servers with type of jewlery, material and other customization settings.<br>
3)A link to download a low res OBJ file for display will be returned to you. (alternatively you can request a turntable render instead)<br>
4)Place order on our Orde Que.<br>
5)After payment has been cleared, we will manufacture and drop ship your Item.<br>


A Basic Example
===========
Let's create a <a href="http://www.polychemy.com/RomanRing.php">Polychemy Roman Ring</a> in Sterling Silver with the name "Charles".<br>

<b>1) Authenticate your self.</b><br>
Use your USER KEY to genrate a acess token that you can use on our apps.<br>
Send a GET request to the following URL to recieve a 2 hour acess token:<br>
<p>
<code>
http://polychemy3d.com/ModelDATABASE.php?getaccessKey=[USER KEY]
</code>
<p>
<br>
Where [USER KEY] is your user key.<br>
*Keep your user key safe! It's best to request for Access tokens only on serverside scripts like PHP. DO NOT expose your USER KEY to the world wide web!.*
<p>
If Authentication is sucessful, you will recieve a numerical ACCESS TOKEN.
<p>
<code>
434234365
</code>
<p>

<b>1) An Example request to the Polychemy Model Gen Server.</b><br>
Send a GET Request to our modelGEN server :<br>
<code>
http://polychemy3d.com/modelGEN.php?TOKEN=3846283&script=NameNecklace.py&turntable=false&material=Sterling_Silver&arg0=2&arg1=grace&arg2=grace
</code>
<p>
TOKEN- <em>Your Uniqie access token. (See previous step)</em><br>
script - <em>The jwelry design type.</em> <br>
turnatble - <em>option to render turntable.</em> <br>
Material <em>Jewelry Material.</em> <br>
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
FolderNumber - Used to identify the model. Also known as the Model ID.

<b>2)Downloading 3D Model File.</b><br>
In the next step, we would want to download the 3d model file or stream it to a webGL viewer.<br>

To Download the obj file send GET Request too:<br>
<code>http://54.191.4.213/ModelDATABASE.php?PASS=321323&getfile=PNG&ID=584351</code>
<br>
PASS - <em>Your Uniqie acess token.</em><br>
getfile - <em>File type.</em> <br>
ID - <em> The FolderNumber you recieve from the JSNOP response. </em>

This will return the OBJ file for download.
And now you're done! All you need to do now is build a WEBGL viewer to view the 3D file, and a simple interface to customizae tthe jwelry<br>

<b>2b)Rendering a Turntable.</b><br>

Rendering a still image turntable is especially useful if the user does not support WebGL.<br>
set turntable variable too "True" (Case Sensitive) and our system will render 6 images of the jewelry design in different rotations (1 full revolution).<br>

You can then download these PNG images (with alpha) and display it on your borwser if nessary.<br>
Here's an example GET request that will trigger a turntable render:<br>
<p>
<code>
http://polychemy3d.com/modelGEN.php?PASS=3846283&script=NameNecklace.py&turntable=True&material=Sterling_Silver&arg0=2&arg1=grace&arg2=grace
</code>
</p>
Download these images like these:<br>
http://polychemy3d.com/ModelDATABASE.php?getfile=PNG&ID=700695&num=0<br>
http://polychemy3d.com/ModelDATABASE.php?getfile=PNG&ID=700695&num=1<br>
http://polychemy3d.com/ModelDATABASE.php?getfile=PNG&ID=700695&num=2<br>
http://polychemy3d.com/ModelDATABASE.php?getfile=PNG&ID=700695&num=3<br>
http://polychemy3d.com/ModelDATABASE.php?getfile=PNG&ID=700695&num=4<br>
http://polychemy3d.com/ModelDATABASE.php?getfile=PNG&ID=700695&num=5<br>

Where "ID" Is the FolderNumber you recive from the JSNOP response and "num" is the image number.

Placing Orders
=============
Coming Soon..
