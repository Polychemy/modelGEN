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

2)Send a request to customize Polychemy Jewelry. (material, size, custom text, Jewlery type etc)<br>
3)Our system will create a 3D Model of the Jewelry you requested. A link to download a low res OBJ file will be returned to you. (alternatively you can request a turntable GIF render instead)<br>
5)Display your custom 3D Jewelry Design on a browser with your WEBGL or any other display system of your choice.<br>
4)Place order on our Order API. (Send us the Model ID as well)<br>
5)After payment has been cleared, we will manufacture and drop ship your Item.<br>


<h1>A Basic Example</h1>

Let's create a <a href="http://www.polychemy.com/Personalised-Jewellery/Roman_Name_Ring/">Polychemy Roman Ring</a> in Sterling Silver with the name "Charles".<br>

<b>1) An Example request to the Polychemy Model Gen Server.</b><br>
Next step is to customize the jewelry<br>
Send a POST Request with variable "command", to our modelGEN server (http://polychemy3d.com/modelGEN3.php):<br>

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

The JSON Response:<br>

```json

{

	"Output":"3D CHACHED OUTPUT",
	"file":"http:\/\/polychemy3d.com\/ModelDATABASE.php?getfile=OBJ&ID=6055587423034013000",
	"material":"http:\/\/polychemy3d.com\/ModelDATABASE.php?getfile=MTL&ID=6055587423034013000",
	"StillRender":"http:\/\/polychemy3d.com\/ModelDATABASE.php?getfile=JPG&ID=6055587423034013000",
	"FolderNumber":"6055587423034013000",
	"GIFRender":"http:\/\/polychemy3d.com\/ModelDATABASE.php?getfile=GIF&ID=6055587423034013000",
	"AppCallID":1000,
	"MetalWholesale":{"Sterling_Silver":92,"Solid_Gold_14k":170,"Solid_Gold_18k":374,"White_Gold_18k":374,"Rose_Gold_18k":374,"Palladium900":227,"Platinium999":419},
	"MetalRetail":{"Sterling_Silver":119.99,"Solid_Gold_14k":229.99,"Solid_Gold_18k":489.99,"White_Gold_18k":489.99,"Rose_Gold_18k":489.99,"Palladium900":299.99,"Platinium999":549.99},
	"JemWholesale":{"Diamond":76.5,"Black_Diamond":30.6,"Ruby":30.6,"Blue_Sapphire":25.5,"Yellow_Sapphire":51,"Pink_Sapphire":51,"Emerald":71.4,"Aquamarine":15.3,"Peridot":2.04,"Amethyst":2.04,"Fire_Opal":10.2},
	"JemRetail":{"Diamond":78.03,"Black_Diamond":31.212,"Ruby":31.212,"Blue_Sapphire":26.01,"Yellow_Sapphire":52.02,"Pink_Sapphire":52.02,"Emerald":72.828,"Aquamarine":15.606,"Peridot":2.0808,"Amethyst":2.0808,"Fire_Opal":10.404}

}


```

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

