[THIS API HAS BEEN temporarly DISCONTINUED.]
[Please see Polychemy Embed App API for more information.]

<h1>modelGEN 2.01</h1>


Polychemy's Model Generator API. <br>
The modelGEN API allows anyone to create and customize any of the available Polychemy Jewelry.

This API requires your IP to be white listed, for access.
If you are intrested in implimenting our apps on your site. Do contact us at contact@polychemy.com.


<center>
For an Example of this app in action:<br>
http://www.polychemy.com/AppExample1/index.php

<p>

For the full API Refrnece guide, see here:<br>
http://www.polychemy.com/php/PolychemyAPI.php
</center>

<h1>How Does it Work?</h1>

1)Authenticate your self with your [USER KEY]<br>
2)Send a request to customize Polychemy Jewerly. (material, size, custom text, Jewlery type etc)<br>
3)Our system will create a 3D Model of the Jewlery you requested. A link to download a low res OBJ file will be returned to you. (alternatively you can request a turntable render instead)<br>
5)Display your custom 3D Jewelry Design on a browser with WEBGL, or just show still images.<br>
4)Place order on our Orde Que.<br>
5)After payment has been cleared, we will manufacture and drop ship your Item.<br>


<h1>A Basic Example</h1>

Let's create a <a href="http://www.polychemy.com/Jewelry.php?name=ROMANRING">Polychemy Roman Ring</a> in Sterling Silver with the name "Charles".<br>

<b>1) An Example request to the Polychemy Model Gen Server.</b><br>
Next step is to customize the jewelry<br>
Send a GET Request to our modelGEN server :<br>
<code>
http://polychemy3d.com/modelGEN2.php?TOKEN=3846283&script=RomanRing.py&turntable=false&material=Sterling_Silver&arg0=2&arg1=grace&arg2=grace
</code>
<p>
TOKEN- <em>Your Uniqie access token. (See previous step)</em><br>
script - <em>The jwelry design type.</em> <br>
turnatble - <em>option to render turntable.</em> <br>
Material <em>Jewelry Material.</em> <br>
arg0 - <em>unique variables required for this jewelry design. See API refrence Guide: <a href="http://www.polychemy.com/php/PolychemyAPI.php">here</a>.</em><br>
arg2 - <em>unique variables required for this jewelry design.  See API refrence Guide: <a href="http://www.polychemy.com/php/PolychemyAPI.php">here</a>.</em><br>
arg3 - <em>unique variables required for this jewelry design.  See API refrence Guide: <a href="http://www.polychemy.com/php/PolychemyAPI.php">here</a>.</em><br>

The JSNOP Response:<br>

<blockquote>
create3DModel(<br>
<br>
	{<br>
create3DModel({"Output": "3D Generated.",
"file": "http://polychemy3d.com/ModelDATABASE.php?getfile=OBJ&ID=397025", 
"material": "http://polychemy3d.com/ModelDATABASE.php?getfile=MTL&ID=397025", 
"StillRender": "http://polychemy3d.com/ModelDATABASE.php?getfile=JPG&ID=397025", 
"GIFRender": "http://polychemy3d.com/ModelDATABASE.php?getfile=GIF&ID=397025", 
"FolderNumber": "397025", 
"AppCallID": "1000", 
"boundingX": "19.14330291748047",
"boundingY": "19.143306732177734",
"boundingZ": "7.820871353149414",
"volume": "0.3152120162768044",

"MetalWholesale": {"Sterling_Silver":86,"Solid_Gold_14k":201,"Solid_Gold_18k":201,"White_Gold_18k":201,"Rose_Gold_18k":201,"Palladium900":289,"Platinium999":622}, 

"MetalRetail": {"Sterling_Silver":119.99,"Solid_Gold_14k":279.99,"Solid_Gold_18k":279.99,"White_Gold_18k":279.99,"Rose_Gold_18k":279.99,"Palladium900":399.99,"Platinium999":839.99}, 

	}<br>
<br>
);<br>
</blockquote>

<br>
Important Variables:<br>
file - <em>The URL to download the 3d OBJ file.</em><br>
material - <em>the material file assosiatd with this OBJ.</em><br>
StillRender - <em>A single still render of the genrated design in PNG with alpha.</em><br>
GifRender - <em>A rendered GIF turntable with a white BG.</em><br>
Bounding X,Y,Z - <em>The width, height and depth of the jwelry in mm.</em><br>
Volume - <em>The total volume ammount of this design.</em><br>
MetalWholesale - <em>The wholesale prices for the different aviable metals.</em><br>
MetalRetail. - <em>The recommened retail price for the different aviable prices.</em><br>
FolderNumber - <em>Used to identify the model. Also known as the Model ID.</em><p>

<b>2)Downloading 3D Model File.</b><br>
In the next step, we would want to download the 3d model file or stream it to a webGL viewer.<br>

To Download the obj file send GET Request too:<p>
<code>http://54.191.4.213/ModelDATABASE.php?getfile=PNG&ID=584351</code>
<p>
getfile - <em>File type.</em> <br>
ID - <em> The FolderNumber you recieve from the JSNOP response. </em>
<p>
This will return the OBJ file for download.
And now you're done! All you need to do now is build a WEBGL viewer to view the 3D file, and a simple interface to customizae tthe jwelry<br>
<p>
<b>2b)Rendering a Turntable.</b><br>

Rendering a still image turntable is especially useful if the user does not support WebGL.<br>
set turntable variable too "True" (Case Sensitive) and our system will render 1 full revolution (looping) GIF turntable.<br>

http://polychemy3d.com/ModelDATABASE.php?getfile=GIF&ID=397025

Where "ID" Is the FolderNumber you recive from the JSNOP response. You can also get this adress from the GIFRender variable from teh Json response.

