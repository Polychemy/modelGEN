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

2)Send a request to customize Polychemy Jewerly. (material, size, custom text, Jewlery type etc)<br>
3)Our system will create a 3D Model of the Jewlery you requested. A link to download a low res OBJ file will be returned to you. (alternatively you can request a turntable GIF render instead)<br>
5)Display your custom 3D Jewelry Design on a browser with your WEBGL or any other display system of your choice.<br>
4)Place order on our Order API. (Send us the Model ID as well)<br>
5)After payment has been cleared, we will manufacture and drop ship your Item.<br>


<h1>A Basic Example</h1>

Let's create a <a href="http://www.polychemy.com/Personalised-Jewellery/Roman_Name_Ring/">Polychemy Roman Ring</a> in Sterling Silver with the name "Charles".<br>

<b>1) An Example request to the Polychemy Model Gen Server.</b><br>
Next step is to customize the jewelry<br>
Send a POST Request with variable "command", to our modelGEN server :<br>

```json
{
	"script":"RomanRing.py",
	"turntable":"false",
	"arguments":["Hellow","Sterling_Silver","6"]
}

```
And Example POST request in Javascript.
```javascript
	//phase variables for post request.
				var Jewelry=new Object();
				Jewelry.script = "RomanRing.py";
				Jewelry.turntable = "false";
				Jewelry.arguments = ["Hello","Sterling_Silver","6"];
				
				//stringify jewelry object
				stringify = JSON.stringify(Jewelry);
				console.log(stringify);
				//this fucnction send a jsnop request to server. 
				//We will recieve the URL of the genrated model.
				
				  $.ajax({
						type:"POST",
						url: "http://polychemy3d.com/modelGEN3.php",
						dataType: "json",
						data:{command:stringify},
						success: function (response){
							//reponse is a JSON object with required information to download OBJ file.
							create3DModel(response)
							
						}
					});

```

<p>
script - <em>The jwelry design type. See API refrence Guide: <a href="http://www.polychemy.com/php/PolychemyAPI.php">here</a>.</em></em> <br>

turnatble - <em>option to render turntable. "True" to render GIF animated turntable.</em> <br>
arguments[0] - <em>unique variables required for this jewelry design. See API refrence Guide: <a href="http://www.polychemy.com/php/PolychemyAPI.php">here</a>.</em><br>
arguments[1] - <em>unique variables required for this jewelry design.  See API refrence Guide: <a href="http://www.polychemy.com/php/PolychemyAPI.php">here</a>.</em><br>
arguments[2] - <em>unique variables required for this jewelry design.  See API refrence Guide: <a href="http://www.polychemy.com/php/PolychemyAPI.php">here</a>.</em><br>

The JSNO Response:<br>

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

With this information you should be abelto download the OBJ file to your display system.</br>
During checkout, be sure to pass the FolderNumber to us, for mnaufacture.

