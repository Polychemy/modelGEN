// JavaScript Document
//check if wbgl exists if not, print error then 
var webglenabled = true;
if ( ! Detector.webgl ){
	var webglenabled = false;
}else{
	var webglenabled = true;

}



	//Set the 3D Diplsay's width and height.
	
	var canvaswidth = 500;
	var canvasheight = 300;
	
	//posiiton the 3D Model.
	var JewelryScale = 3;
	var JewelryX = 0;
	var JewelryY = 0;
	var JewelryZ = 0;
	var JewelryRX = 0;
	var JewelryRY = 0;
	var JewelryRZ = 0;

//Check if user has webgl, if not, we will request a turntable render instead.
var renderTurntable = "False";
  if ( Detector.webgl == false ){
	  renderTurntable = "True";
  }else{
	  renderTurntable = "False";
  }

//Variables required for 3D Display. Leave these alone unless you know what you're doing.

			var container, stats, permalink, hex, color, cubemap;
			
			var helpBoxTimer, TotalCost, bgScene, bgCam, bg, loaderinterval;
			
			var texture, material, plane;

			var camera, cameraTarget, scene, renderer;

			var effectFXAA;

			var group, material, material2,loadedmodel;
			
			var materials = new Array();

			var MaterialType = 1;


			var defaultShader = "true";


		
			var targetRotation = 0;
			var targetRotationOnMouseDown = 0;

			var mouseX = 0;
			var mouseXOnMouseDown = 0;
			

			var windowHalfX = canvaswidth / 2;
			var windowHalfY = canvasheight / 2;

			var postprocessing = { enabled : true };
			var glow = 0.9;
			
		
			
			//The server adress 
			var server = "http://polychemy3d.com/";
			var timerstart;
			var execTime;
			var stillFrameNumber = 0;
			var stillInterval;
			
			
			var uniqueID;
			var sessionID = Math.floor((Math.random()*10000)+1);
			var AppCallID = 0;
			var xhr;
			var spinner;
			var StillRender;

			init();
			animate();
			
			
			

			//Create 3D Context
		function init() {
				
				//set canvas width
				var displaywidth = $("#3DDisplay").css('width');
				var n = displaywidth.split("px");
				var canvaswidth = n[0];
				
				
				container = document.createElement( 'div' );
				container.style.textAlign = 'center';
				container.style.color = '#f00';
				container.style.backgroundColor = 'transparent';
				container.style.zIndex = '1000';

				/*container.innerHTML = 'Polychemy Jewelry';*/
				
				var threedisplay = document.getElementById("3DDisplay");
				
				threedisplay.appendChild( container );
				permalink = document.getElementById( "permalink" );
				
				//set drop shadow
				//dropshadow = document.getElementById("DropShadow");

				// CAMERA

				camera = new THREE.PerspectiveCamera( 10, canvaswidth / canvasheight, 1, 1500 );
				camera.position.set( 0, 150, 500 );
				cameraTarget = new THREE.Vector3( 0, 150, 0 );
				camera.lookAt( cameraTarget );

				// SCENE
				scene = new THREE.Scene();
				
				//material
				material =  new THREE.MeshLambertMaterial({color: 'blue'  });


			//create lights
			hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
				hemiLight.color.setHSL( 1, 1, 1 );
				hemiLight.groundColor.setHSL( 1, 1, 1 );
				hemiLight.position.set( 0, 500, 0 );
				scene.add( hemiLight );


				var directionalLight = new THREE.DirectionalLight( 0xFFFFFF ,0.6);
				directionalLight.position.set( 0, 1, 1 ).normalize();
				scene.add( directionalLight );


		
                //Create a master group. This group is the one taht spin during mouse down events.
				group = new THREE.Object3D();
                //Add group to scene. we will craete the etxt geometry after we import OBJ assories.
				scene.add( group );
				
				//spinner group
				spinner = new THREE.Object3D();
				spinner.position.y = 160;
				spinner.add(group)
				scene.add( spinner );
				
				
				//Create BG
				var texture2 = THREE.ImageUtils.loadTexture( "" );
				bg = new THREE.Mesh(
				  new THREE.PlaneGeometry(2, 2),
				  new THREE.MeshBasicMaterial({map: texture2})
				);
				
				// The bg plane shouldn't care about the z-buffer.
				bg.material.depthTest = false;
				bg.material.depthWrite = false;
				
				bgScene = new THREE.Scene();
				bgCam = new THREE.Camera();
				//bgScene.add(bgCam);
				//bgScene.add(bg);
				group.add(plane);

                //load and display the default text.
				execScript2();

				// RENDERER

				renderer = new THREE.WebGLRenderer( { antialias: true, preserveDrawingBuffer: false  } );
				renderer.setSize( canvaswidth, canvasheight );

				container.appendChild( renderer.domElement );

        		// POSTPROCESSING
				renderer.autoClear = false;
				window.addEventListener( 'resize', onWindowResize, false );
				
				// EVENTS



			}
			
			
			
			//Send request to polychemy Servers.
			function execScript2(){
				updateStatus("Laoding..")

				//remove loaded model if it alredy exists
				group.remove( loadedmodel );
				//create group for assesories.
				loadedmodel = new THREE.Mesh();
				
				//get values from input boxes.
				var material = document.getElementById("Material");
				var RingSize = document.getElementById("RingSize");
				var Text = document.getElementById("CustomText");
				
				//phase variables for post request.
				var Jewelry=new Object();
				Jewelry.script = "RomanRing.py";
				Jewelry.turntable = renderTurntable;
				Jewelry.arguments = [Text.value,material.value,RingSize.value];
				
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
							//create the 3d model
							create3DModel(response)
							
						}
					});
				
				
			}
			
			//this function will be automatically triggred once we recieve the JSNOP response from the server.
				function create3DModel(obj){
					//remove loaded model if it alredy exists
					group.remove( loadedmodel );
					//create group for assesories.
					loadedmodel = new THREE.Mesh();
					//create loader.
					var manager = new THREE.LoadingManager();
					manager.onProgress = function ( item, loaded, total ) {
						console.log( item, loaded, total );
	
					};
					var loader = new THREE.OBJMTLLoader( manager);
					//If no still frames are rendered then display 3D model.
					console.log(obj.Output);
					//set the jewlery image adress and also set the folder adress.
					//set uniqe ID just incase it changed by the server. sometimes this happens if the model is alredy cached.
					var uniqueID = obj.FolderNumber;
					updateStatus("Done");
					
					if(renderTurntable=="False"){
						///////////////////LOAD MDOEL////////////////////
						console.log(uniqueID);
						var objaddress = server+"ModelDATABASE.php?timtest="+Math.floor((Math.random()*100)+1)+"&getfile=OBJ&ID="+uniqueID;
						var stladdress = server+"ModelDATABASE.php?timtest="+Math.floor((Math.random()*100)+1)+"&getfile=MTL&ID="+uniqueID;
						console.log(objaddress);
					  loader.load( objaddress, stladdress, function ( object ) {											   

					  //object is object3D
					  object.traverse( function ( child ) {
	
						  if ( child instanceof THREE.Mesh ) {
							   //child is mesh
								//if there is a image texture, we replace it with the correct address  
									material4 = new THREE.MeshLambertMaterial();
									child.material = material4;

						  }
	
					  } );
					  
					  //Add the Assosry to its own group. So that we can control the position later.
					  loadedmodel.add(object);
					  
				  } );
				  loadedmodel.scale = new THREE.Vector3( JewelryScale, JewelryScale, JewelryScale );
				  loadedmodel.position.x = JewelryX;
				  loadedmodel.position.y = JewelryY;
				  loadedmodel.position.z = JewelryZ;
				  loadedmodel.rotation.x = JewelryRX;
				  loadedmodel.rotation.y = JewelryRY;
				  loadedmodel.rotation.z = JewelryRZ;
				  group.add( loadedmodel );
				  
						/////////////////////////////////////////////////////////////////////////
					}else if(renderTurntable=="True"){
					
						//reset the still image counter to 0
						stillFrameNumber = 0;
						//if still frame are rendered then we will display still frame instead.
						stillImage(obj.GIFRender);
						StillRender = obj.GIFRender;
						
					}
				}
				
			
			  function stillImage(StillRender){
				  
						
					//if still frame are rendered then we will display still frame instead.
					console.log("url('"+StillRender+"')");
					var display = document.getElementById("3DDisplay");
					display.style.backgroundImage="url('"+StillRender+"')";
					display.style.backgroundSize="350px 350px";
					display.style.opacity = 1;
			  }
				  
				  
			
	
				  
			
				function onDocumentMouseMove( event ) {

				  mouseX = event.clientX - windowHalfX;

  
				  targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.02;
				  
				   //if the webgl is not working and we are displaying still renders.
				
				
			}
			
			function MouseDown3DDisplay(event){
				var y=event.clientY;
				
				
					document.body.style.cursor = "move";
					  event.preventDefault();
					document.addEventListener( 'mousemove', onDocumentMouseMove, false );
					document.addEventListener( 'mouseup', onDocumentMouseUp, false );
					document.addEventListener( 'mouseout', onDocumentMouseOut, false );
	
					mouseXOnMouseDown = event.clientX - windowHalfX;
					targetRotationOnMouseDown = targetRotation;
					
					
				
			}
			
			

			function onDocumentMouseUp( event ) {
                document.body.style.cursor = "auto";
				document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
				document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
				document.removeEventListener( 'mouseout', onDocumentMouseOut, false );

			}

			function onDocumentMouseOut( event ) {
document.body.style.cursor = "auto";
				document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
				document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
				document.removeEventListener( 'mouseout', onDocumentMouseOut, false );

			}

	

			//

			function animate() {

				requestAnimationFrame( animate );

				render();
				//stats.update();

			}

			function render() {

				group.rotation.y += ( targetRotation - group.rotation.y ) * 0.03;
				//dropshadow.style.transform="rotateY("+((group.rotation.y)*10)+")";
				//dropshadow.style.webkitTransform="rotateX(80deg) rotateZ("+rad2deg(group.rotation.y)*-1+"deg)";
				//console.log((group.rotation.y)*10);
				spinner.rotation.y += 0.01;
				
				
				//group.position.y = (window.innerHeight+370)/8;
				//30 - 190



				renderer.clear();
				renderer.render(bgScene, bgCam);
				renderer.render( scene, camera );
				

			

			}
			
		function updateStatus(text){
			console.log("--"+text)
		}
		
		function onWindowResize() {
			
			//set canvas width
				var displaywidth = $("#3DDisplay").css('width');
				var n = displaywidth.split("px");
				
				var canvaswidth = n[0];

				windowHalfX = canvaswidth / 2;
				windowHalfY = canvasheight / 2;

				camera.aspect = canvaswidth / canvasheight;
				camera.updateProjectionMatrix();

				renderer.setSize( canvaswidth, canvasheight );


			}
			
				assignUVs = function( geometry ){

			  geometry.computeBoundingBox();
		  
			  var max     = geometry.boundingBox.max;
			  var min     = geometry.boundingBox.min;
		  
			  var offset  = new THREE.Vector2(0 - min.x, 0 - min.y);
			  var range   = new THREE.Vector2(max.x - min.x, max.y - min.y);
		  
			  geometry.faceVertexUvs[0] = [];
			  var faces = geometry.faces;
		  
			  for (i = 0; i < geometry.faces.length ; i++) {
		  
				var v1 = geometry.vertices[faces[i].a];
				var v2 = geometry.vertices[faces[i].b];
				var v3 = geometry.vertices[faces[i].c];
		  
				geometry.faceVertexUvs[0].push([
				  new THREE.Vector2( ( v1.x + offset.x ) / range.x , ( v1.y + offset.y ) / range.y ),
				  new THREE.Vector2( ( v2.x + offset.x ) / range.x , ( v2.y + offset.y ) / range.y ),
				  new THREE.Vector2( ( v3.x + offset.x ) / range.x , ( v3.y + offset.y ) / range.y )
				]);
		  
			  }
		  
			  geometry.uvsNeedUpdate = true;
		  
		  }
		  
		  	
			function createShader(name, matcap){
						  var material5 = new THREE.ShaderMaterial({
						uniforms: {
							tNormal: {
								type: 't',
								value: THREE.ImageUtils.loadTexture('http://www.polychemy.com/matcap/normal/243-normal.jpg')
							},
							tMatCap: {
								type: 't',
								value: THREE.ImageUtils.loadTexture('http://www.polychemy.com/matcap/'+matcap+'.jpg')
							},
							time: {
								type: 'f',
								value: 0
							},
							bump: {
								type: 'f',
								value: 0
							},
							noise: {
								type: 'f',
								value: .04
							},
							repeat: {
								type: 'v2',
								value: new THREE.Vector2(1, 1)
							},
							useNormal: {
								type: 'f',
								value: 0
							},
							useRim: {
								type: 'f',
								value: 0
							},
							rimPower: {
								type: 'f',
								value: 2
							},
							useScreen: {
								type: 'f',
								value: 0
							},
							normalScale: {
								type: 'f',
								value: .5
							},
							normalRepeat: {
								type: 'f',
								value: 1
							}
						},
						vertexShader: document.getElementById('vertexShader').textContent,
						fragmentShader: document.getElementById('fragmentShader').textContent,
						wrapping: THREE.ClampToEdgeWrapping,
						shading: THREE.SmoothShading,
						side: THREE.DoubleSide
					});
					material5.uniforms.tMatCap.value.wrapS = material5.uniforms.tMatCap.value.wrapT = THREE.ClampToEdgeWrapping;
					material5.uniforms.tNormal.value.wrapS = material5.uniforms.tNormal.value.wrapT = THREE.RepeatWrapping;
					material5.name = name;
					return material5;
			}
		function deg2rad(degree)   { return degree*(Math.PI/180); }
