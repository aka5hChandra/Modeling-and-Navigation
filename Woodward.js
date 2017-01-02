
var canvas;
var gl;
var  floor = 2;
var NumVertices ;
var program ;
//Buffer Variables
var objVert = [];
var objNor = [];
var objFace = [];

//Uniform Locations
var perLoc;
var viewLoc;
var modelLoc;
var floorLoc;
var renderTypeLoc;
var modelLoc2;
var viewLoc2;
var perLoc2;
//Matrix Variables
var per;
var view;

//Camera Parameters
var eye = vec3(0.0, 0.0 , 1.9) ;
var at = vec3(0.0, 0.0, -1.0);
var up = vec3(0.0, 1.0, 0.0);


//Projection Parameters
var near = 0.1;
var far = 1000.0;
var  fovy = 90.0;  
var  aspect;
var program2;
//quad data for cubemap
var texCoord2 = [
/*
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0,*/
	  

      0.0, 1.0,
      0.0, 0.0,
	  	1.0, 0.0,
      1.0, 1.0,

];
	var indices = [
1, 0, 3,
3, 2, 1,

];

var boxs = 1;
var verticesC = [
vec4( -0.5, -0.5,  0.5, 1.0 ),
    vec4( -0.5,  0.5,  0.5, 1.0 ),
    vec4( 0.5,  0.5,  0.5, 1.0 ),
    vec4( 0.5, -0.5,  0.5, 1.0 ),
    
];

var img1 ;
var img2 ;
var img3 ;
var img4;
var img5;
var img6;
var img7;
var texture1, texture2 , texture3 , texture4 , texture5 , texture6 ,texture7 , texture8 , texture9 , texture10 , texture11 , texture12 , texture13 , texture14 , texture15 , texture16 , texture17 , texture18 , texture19;
function isPowerOf2(value) {
  return (value & (value - 1)) == 0;
}

function setupTextureFilteringAndMips(width, height) {
  if (isPowerOf2(width) && isPowerOf2(height) ){
    // the dimensions are power of 2 so generate mips and turn on 
    // tri-linear filtering.
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
  } else {
    // at least one of the dimensions is not a power of 2 so set the filtering
    // so WebGL will render it.
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  }
}

//load cubemap
function configureTexture() {

	
    texture1 = gl.createTexture();   
	
	gl.bindTexture( gl.TEXTURE_2D, texture1 );
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,new Uint8Array([0, 0, 255, 255]));
	img1 = new Image()
	img1.src = "1.jpg";//"checkered.jpg";
	img1.addEventListener('load', function() {
		gl.bindTexture(gl.TEXTURE_2D, texture1);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, img1);
		setupTextureFilteringAndMips(img1.width, img1.height);
	});
	
	texture2 = gl.createTexture();   
	
	gl.bindTexture( gl.TEXTURE_2D, texture2);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,new Uint8Array([0, 0, 255, 255]));
	img2 = new Image()
	img2.src = "2.jpg";//"checkered.jpg";
	img2.addEventListener('load', function() {
		gl.bindTexture(gl.TEXTURE_2D, texture2);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, img2);
		setupTextureFilteringAndMips(img2.width, img2.height);
	});
	
	texture3 = gl.createTexture();   
	
	gl.bindTexture( gl.TEXTURE_2D, texture3 );
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,new Uint8Array([0, 0, 255, 255]));
	img3 = new Image()
	img3.src = "3.jpg";//"checkered.jpg";
	img3.addEventListener('load', function() {
		gl.bindTexture(gl.TEXTURE_2D, texture3);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, img3);
		setupTextureFilteringAndMips(img3.width, img3.height);
	});
	    
	texture4 = gl.createTexture();   
	
	gl.bindTexture( gl.TEXTURE_2D, texture4 );
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,new Uint8Array([0, 0, 255, 255]));
		
	img4 = new Image()
	img4.src = "4.jpg";//"checkered.jpg";
	img4.addEventListener('load', function() {
		gl.bindTexture(gl.TEXTURE_2D, texture4);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, img4);
		setupTextureFilteringAndMips(img4.width, img4.height);
	});
	    
	texture5 = gl.createTexture();   
	
	gl.bindTexture( gl.TEXTURE_2D, texture5 );
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,new Uint8Array([0, 0, 255, 255]));
		
	img5 = new Image()
	img5.src = "5.jpg";//"checkered.jpg";
	img5.addEventListener('load', function() {
		gl.bindTexture(gl.TEXTURE_2D, texture5);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, img5);
		setupTextureFilteringAndMips(img5.width, img5.height);
	});
	    texture6 = gl.createTexture();   
	
	gl.bindTexture( gl.TEXTURE_2D, texture6 );
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,new Uint8Array([0, 0, 255, 255]));
		
	img6 = new Image()
	img6.src = "6.jpg";//"checkered.jpg";
	img6.addEventListener('load', function() {
		gl.bindTexture(gl.TEXTURE_2D, texture6);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, img6);
		setupTextureFilteringAndMips(img6.width, img6.height);
	});
	
	texture7 = gl.createTexture();  
	img7 = new Image()
	img7.src = "vending1.jpg";//"checkered.jpg";
	img7.addEventListener('load', function() {
		gl.bindTexture(gl.TEXTURE_2D, texture7);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, img7);
		setupTextureFilteringAndMips(img7.width, img7.height);
	});
	
	texture8 = gl.createTexture();  
	img8 = new Image()
	img8.src = "cvending1.jpg";//"checkered.jpg";
	img8.addEventListener('load', function() {
		gl.bindTexture(gl.TEXTURE_2D, texture8);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, img8);
		setupTextureFilteringAndMips(img8.width, img8.height);
	});
	
	
	texture9 = gl.createTexture();  
	img9 = new Image()
	img9.src = "couch.png";//"checkered.jpg";
	img9.addEventListener('load', function() {
		gl.bindTexture(gl.TEXTURE_2D, texture9);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, img9);
		setupTextureFilteringAndMips(img9.width, img9.height);
	});
	
	
	texture10 = gl.createTexture();  
	img10 = new Image()
	img10.src = "temp1.jpg";//"checkered.jpg";
	img10.addEventListener('load', function() {
		gl.bindTexture(gl.TEXTURE_2D, texture10);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, img10);
		setupTextureFilteringAndMips(img10.width, img10.height);
	});
	
	
	texture11 = gl.createTexture();  
	img11 = new Image()
	img11.src = "temp2.jpg";//"checkered.jpg";
	img11.addEventListener('load', function() {
		gl.bindTexture(gl.TEXTURE_2D, texture11);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, img11);
		setupTextureFilteringAndMips(img11.width, img11.height);
	});
	
		texture12 = gl.createTexture();  
	img12 = new Image()
	img12.src = "temp3.jpg";//"checkered.jpg";
	img12.addEventListener('load', function() {
		gl.bindTexture(gl.TEXTURE_2D, texture12);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, img12);
		setupTextureFilteringAndMips(img12.width, img12.height);
	});
	
		
		texture13 = gl.createTexture();  
	img13 = new Image()
	img13.src = "temp4.jpg";//"checkered.jpg";
	img13.addEventListener('load', function() {
		gl.bindTexture(gl.TEXTURE_2D, texture13);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, img13);
		setupTextureFilteringAndMips(img13.width, img13.height);
	});
	
		texture14 = gl.createTexture();  
	img14 = new Image()
	img14.src = "wb.png";//"checkered.jpg";
	img14.addEventListener('load', function() {
		gl.bindTexture(gl.TEXTURE_2D, texture14);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, img14);
		setupTextureFilteringAndMips(img14.width, img14.height);
	});
	
		texture15 = gl.createTexture();  
	img15 = new Image()
	img15.src = "JHW.JPG";//"checkered.jpg";
	img15.addEventListener('load', function() {
		gl.bindTexture(gl.TEXTURE_2D, texture15);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, img15);
		setupTextureFilteringAndMips(img15.width, img15.height);
	});
	
		texture16 = gl.createTexture();  
	img16 = new Image()
	img16.src = "UNCC.png";//"checkered.jpg";
	img16.addEventListener('load', function() {
		gl.bindTexture(gl.TEXTURE_2D, texture16);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, img16);
		setupTextureFilteringAndMips(img16.width, img16.height);
	});
	
	
	
		texture17 = gl.createTexture();  
	img17 = new Image()
	img17.src = "wf.jpg";//"checkered.jpg";
	img17.addEventListener('load', function() {
		gl.bindTexture(gl.TEXTURE_2D, texture17);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, img17);
		setupTextureFilteringAndMips(img17.width, img17.height);
	});
	
	
	
		texture18 = gl.createTexture();  
	img18 = new Image()
	img18.src = "door.jpg";//"checkered.jpg";
	img18.addEventListener('load', function() {
		gl.bindTexture(gl.TEXTURE_2D, texture18);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, img18);
		setupTextureFilteringAndMips(img18.width, img18.height);
	});
	
		texture19 = gl.createTexture();  
	img19 = new Image()
	img19.src = "ed.png";//"checkered.jpg";
	img19.addEventListener('load', function() {
		gl.bindTexture(gl.TEXTURE_2D, texture19);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, img19);
		setupTextureFilteringAndMips(img19.width, img19.height);
	});
}

 var vNormal;
 var vPosition;
 var  cIBuffer ;
 var nBuffer ;
 var vBuffer;
 var vTexCoordC;
 
  var vBufferC;
  var nBufferC;
  var tBufferC;
  var indexBufferIDC ;

//Utility function to load object
function loadMeshDataFromHTML() {
	var obj = document.getElementById( "obj" );
	string = obj.text 
  var lines = string.split("\n");
  var positions = [];
  var normals = [];
  var vertices = [];
 
  for ( var i = 0 ; i < lines.length ; i++ ) {
    var parts = lines[i].trimRight().split(' ');
    if ( parts.length > 0 ) {
      switch(parts[0]) {
        case 'v': //Vertices
		  objVert.push(vec3(parseFloat( parts[1]) , parseFloat( parts[2] ) , parseFloat( parts[3])));
          break;
        case 'vn'://Normals
			objNor.push(vec3(parseFloat( parts[1]) , parseFloat( parts[2] ) , parseFloat( parts[3])));
          break;
        case 'f': { //faces
          var f1 = parts[1].split('/');
          var f2 = parts[2].split('/');
          var f3 = parts[3].split('/');
			objFace.push(parseInt( f1[0] - 1));
			objFace.push(parseInt( f2[0]  - 1));
			objFace.push(parseInt( f3[0]  - 1));
          break;
        }
      }
    }
  }
	while(objVert.length > objNor.length){
		
		objNor.push(vec3(0.0, 1, 0));
	}
	/**/
	
	//create buffers and load data
	 gl.useProgram( program );
   nBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(objNor), gl.STATIC_DRAW );

     vNormal = gl.getAttribLocation( program, "vNormal" );
    gl.vertexAttribPointer( vNormal, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray(vNormal);
	
	
     vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(objVert), gl.STATIC_DRAW );

	
    vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
	
	  cIBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, cIBuffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(objFace), gl.STATIC_DRAW );
	
	 	
	//cube map data
	gl.useProgram( program2 );
    vBufferC = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBufferC);
	gl.bufferData( gl.ARRAY_BUFFER, flatten(verticesC), gl.STATIC_DRAW );
    
	
    vPositionC = gl.getAttribLocation( program2, "vPosition" );
    gl.vertexAttribPointer( vPositionC, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPositionC );

	/*
		 nBufferC = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, nBufferC);
   gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );
    
	
       vNormal = gl.getAttribLocation( program, "vNormal" );
      gl.vertexAttribPointer( vNormal, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vNormal );
    
	*/
     tBufferC = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, tBufferC);
    gl.bufferData( gl.ARRAY_BUFFER, flatten(texCoord2), gl.STATIC_DRAW );
    
    vTexCoordC = gl.getAttribLocation( program2, "vTexCoord" );
    gl.vertexAttribPointer( vTexCoordC, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vTexCoordC );
    
    indexBufferIDC = gl.createBuffer();
	gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, indexBufferIDC );
	gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices), gl.STATIC_DRAW );


   
    configureTexture();
    
    gl.activeTexture( gl.TEXTURE0 );
    gl.bindTexture( gl.TEXTURE_2D, texture1 );
    gl.uniform1i(gl.getUniformLocation( program, "Tex0"), 0);
        
/**/
	
}

function load(){
	//Utility function to setup shader and accquire uniform locations
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
	program2 = initShaders( gl, "vertex-shader_2", "fragment-shader_2" );
   
	floorLoc = gl.getUniformLocation(program, "floorF"); 
  
	aspect = canvas.width / canvas.height;
	per = perspective2(fovy, aspect, near, far);
	
	perLoc  = gl.getUniformLocation(program, "p");
	viewLoc  = gl.getUniformLocation(program, "v");
	modelLoc = gl.getUniformLocation(program, "m");
	modelLoc2 = gl.getUniformLocation(program2, "model");
	viewLoc2 = gl.getUniformLocation(program2, "v");
	perLoc2  = gl.getUniformLocation(program2, "p");
   renderTypeLoc = gl.getUniformLocation(program, "renderType");
}


var doorAngle = 90;
var doorTrans = 0;
var eo = 0;
var feo = 0;
window.addEventListener("keydown" , function(){
	
	//keyboard event to simulate walk
	console.log(event.keyCode);
	console.log(at[2]);
	right = normalize(cross(at , up));
	look = normalize(subtract(at , eye));
	
	dx = .2;
	dy = .2;
	X = vec3();
	Y = vec3();
	X[0] = right[0]*dx;
	X[1] = right[1]*dx;
	X[2] = right[2]*dx;
	Y[0] = look[0]*dy;
	Y[1] = look[1]*dy;
	Y[2] = look[2]*dy;
	
	if (event.keyCode == '87') {
        // w arrow
		eye = add (eye , Y);
		at = add (at , Y);
    }
    else if (event.keyCode == '83') {
        // s arrow
		eye = subtract (eye , Y);
		at = subtract (at , Y);
    }
    else if (event.keyCode == '68') {
       // d arrow
	  eye = add (eye , X);
		at = add (at , X);
    }
    else if (event.keyCode == '65') {
       // a arrow
	   eye = subtract (eye , X);
		at = subtract (at , X);
    }
	 else if (event.keyCode == '39') {
       // left 
	      at =  add(at , X);
	 
    }
	else if (event.keyCode == '37') {
       // rght 
	
	     at = subtract (at , X);
    }

	else if (event.keyCode == '86') {
       // v -- door 
	   if(doorAngle > -1){
	   doorAngle = doorAngle - 1;
		
	   }
	     if(doorAngle < 20)
	   doorTrans = doorTrans + 0.01;
    }
	else if (event.keyCode == '66') {
       // b -- door 
	   if(doorAngle < 91)
	   doorAngle = doorAngle + 1;
	  
    }
	else if (event.keyCode == '69') {
       // e -- elevator open 
	  // if(doorAngle < 91)
		//  if(eo < .17)
	   //eo = eo + .01;
		feo = 1;
	  
    }
	else if (event.keyCode == '82') {
       // r -- elevator open 
	  // if(doorAngle < 91)
		  
		 // if(eo >= 0)
	  // eo = eo - .01;
		feo = 0; 
	   
	   
	  
    }
	else if (event.keyCode == '84') {
	//t
	elevator();
	}
	//console.log(event.keycode);
});

window.onload = function init()
{
	//init function
    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

	
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    gl.clearDepth(1);

	load();
	loadMeshDataFromHTML() ;
	gl.disable(gl.BLEND);
    gl.enable(gl.DEPTH_TEST);
    render();
}

vType = 7;
fWal = 1;
function toggleView(){
	//utility function to toggle between views
	vType += 1 ;
	if(vType >= 6 && fWal != 1)
		vType = 0;
}
 function   freeWalk(){
	 camReset();
	 fWal *= -1.0;
	 if(fWal == 1.0)
	vType = 7;
	else 
	vType = 0;
 }
  
function perspective2( fovy, aspect, near, far )
{
	//Utility function to compute perspective projection matrix
    var f = 1.0 / Math.tan( radians(fovy) / 2 );
    var d = far - near;

    var result = mat4();
    result[0][0] = f / aspect;
    result[1][1] = f;
    result[2][2] = -(near + far) / d;
    result[2][3] = -2 * near * far / d;
    result[3][2] = -1;
    result[3][3] = 0.0;

    return result;
}
 function setView( type){
	 //Utility function to switch between views
	  x = 6;
	  y = 6;
	  z = 8;
	 if(type == 0){
		view = lookAt( vec3(0 ,  y ,  z), at , up);
	}
	else if(type == 1){
		view = lookAt( vec3(x,  y ,  z), at , up);
	}
	else if(type == 2){
		view = lookAt( vec3(-x,  y ,  z), at , up);
	}
	else if(type == 3){
		view = lookAt( vec3(x,  y ,  -z), at , up);
	}
	else if(type == 4){
		view = lookAt( vec3(-x,  y ,  -z), at , up);
	}
	else if(type == 5){
		view = lookAt( vec3(-x,  y ,  -z), at , up);
	}
	else{
		
		
	 view = lookAt( eye, at , up);
	}
 }
 secondFloorY = .6;

  function elevator(){
	  //Utility function to simulate elevator
	 if(floor == 1){
	// eye = vec3(0.0, 0.0 , 1.9) ;
	//at = vec3(0.0, 0.0, -1.0); 
   //up = vec3(0.0, 1.0, 0.0);
   eye[1] = 0;
   at[1] = 0;
    view = lookAt( eye, at , up); 
	floor = 2;
	 }else{
		 floor = 1
		//  eye = vec3(0.0, secondFloorY , 1.9) ;
		//at = vec3(0.0, secondFloorY, -1.0); 
		//up = vec3(0.0, 1.0, 0.0);
		   eye[1] = secondFloorY;
		   at[1] = secondFloorY;
		view = lookAt( eye, at , up); 
		 
	 }
	 
 }

 
 function camReset(){
	 //Utility function to reset camera to original position
	eye = vec3(0.0, 0.0 , 1.9) ;
	at = vec3(0.0, 0.0, -1.0); 
	up = vec3(0.0, 1.0, 0.0);
    view = lookAt( eye, at , up); 
	
	 floor = 2;
	 
 }

 function draw(tex , num ,model)
{
	//	model = mult(translate(0 , 14.5 , 0) , model);
	gl.uniformMatrix4fv(modelLoc2, false , flatten(model)  );
	gl.activeTexture( gl.TEXTURE0 );
    gl.bindTexture( gl.TEXTURE_2D, tex );
    gl.uniform1i(gl.getUniformLocation( program, "Tex0"), 0);
	gl.drawElements( gl.TRIANGLES,  6	 , gl.UNSIGNED_BYTE , num);
}


function drawWoodward(){
		 gl.useProgram( program );
	

   

	gl.uniform1f(floorLoc, floor);
	
	var s = 1;
	var model = scale( s, s, s );

	gl.uniformMatrix4fv(perLoc, false, flatten(per));
	gl.uniformMatrix4fv(viewLoc, false, flatten(view));
	gl.uniformMatrix4fv(modelLoc, false, flatten(model));

	gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer );
	 vNormal = gl.getAttribLocation( program, "vNormal" );
    gl.vertexAttribPointer( vNormal, 3, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray(vNormal);
	
	gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
	vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );
	gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, cIBuffer );
	
	//gl.uniform1i(renderTypeLoc , 0);

	if(objFace.length > 0  ){
	
	gl.drawElements(gl.TRIANGLES , objFace.length, gl.UNSIGNED_SHORT , 0 );
	model =  mult(model , translate(0	 , secondFloorY , 0));
	gl.uniformMatrix4fv(modelLoc, false, flatten(model));
	
	
	gl.drawElements(gl.TRIANGLES , objFace.length, gl.UNSIGNED_SHORT , 0 );
	}
}

function drawTextures(){
	 gl.useProgram( program2 );
	
	gl.bindBuffer( gl.ARRAY_BUFFER, vBufferC );
	 vPositionC = gl.getAttribLocation( program2, "vPosition" );
    gl.vertexAttribPointer( vPositionC, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPositionC );
	
	gl.bindBuffer( gl.ARRAY_BUFFER, tBufferC );
	  vTexCoordC = gl.getAttribLocation( program2, "vTexCoord" );
    gl.vertexAttribPointer( vTexCoordC, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vTexCoordC );
	
	//gl.enableVertexAttribArray( vPosition );
	gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, indexBufferIDC );
	
	gl.uniformMatrix4fv(perLoc2, false, flatten(per));
	gl.uniformMatrix4fv(viewLoc2, false, flatten(view));
	v = .2;
	s =  new scale(v,v,v);
		
		//notice boards
		model = s ;
		model = mult(rotate(-90  , [ 0, 1 , 0]) , s);
		model = mult(translate(1 , 0 , -1.7) , model);
		draw(texture10 , 0, model);
		
		model = s ;
		model = mult(rotate(-90  , [ 0, 1 , 0]) , s);
		model = mult(translate(1 , 0 , -2.0) , model);
		draw(texture11 , 0, model);
		
		model = s ;
		model = mult(rotate(-90  , [ 0, 1 , 0]) , s);
		model = mult(translate(1 , 0 , -2.3) , model);
		draw(texture12 , 0, model);
		
		model = s ;
		model = mult(rotate(-90  , [ 0, 1 , 0]) , s);
		model = mult(translate(1 , 0 , -2.6) , model);
		draw(texture13 , 0, model);
		
		//uncc
		model =  new scale(.6, .1,v)  ;
		model = mult(rotate(51  , [ 0, 1 , 0]) , model);
		model = mult(translate(0	 , 0 , -2.7) , model);
		draw(texture16 , 0, model);
		
		
		//floor plan
		model =  new scale(.2, .2,v) ;
		model = mult(rotate(180  , [ 0, 1, 0]) , model);
		model = mult(translate(.1 , .0 , -1.35) , model);
		draw(texture17 , 0, model)
		
		
		
		//jhw
		model = s ;
		model = mult(rotate(55  , [ 0, 1 , 0]) , s);
		model = mult(translate(-1	 , 0 , -3.3) , model);
		draw(texture15 , 0, model);
		
		//white board
		model =  new scale(.5,v,v) ;
		model = mult(rotate(-90  , [ 0, 1 , 0]) , model);
		model = mult(translate(.8 , 0 , -.7) , model);
		draw(texture14 , 0, model);
		
		model =  new scale(.5,v,v) ;
		model = mult(rotate(90  , [ 0, 1 , 0]) , model);
		model = mult(translate(-1.4 , 0 , -.7) , model);
		draw(texture14 , 0, model);
		
		model =  new scale(.5,v,v) ;
		model = mult(rotate(-90  , [ 0, 1 , 0]) , model);
		model = mult(translate(.8 , 0 , .3) , model);
		draw(texture14 , 0, model);
		
		
		model =  new scale(.5,v,v) ;
		model = mult(rotate(90  , [ 0, 1 , 0]) , model);
		model = mult(translate(-1.4 , 0 , .3) , model);
		draw(texture14 , 0, model);
		
		//vending machine
		model =  new scale(.3, .4,v) ;
		//model = mult(rotate(90  , [ 0, 0 , 0]) , model);
		model = mult(translate(.65 , -0.06 , .8) , model);
		draw(texture7 , 0, model)
		
		//COKE VENDING
		model =  new scale(.2, .4,v) ;
		//model = mult(rotate(90  , [ 0, 0 , 0]) , model);
		model = mult(translate(.35 , -0.06 , .8) , model);
		draw(texture8 , 0, model)
	
		model =  new scale(.2, .4,v) ;
		//model = mult(rotate(90  , [ 0, 0 , 0]) , model);
		model = mult(translate(.1 , -0.06 , .8) , model);
		draw(texture7, 0, model)
	
		//COUCH
		model =  new scale(.22, .6,v) ;
		model = mult(rotate(90  , [ 0, 0 , 1]) , model);
		model = mult(translate(-.8 , -0.15 , .85) , model);
		draw(texture9 , 0, model)
		
		model =  new scale(.2,.2,v) ;
		model = mult(rotate(90  , [ 0, 1 , 0]) , model);
		model = mult(rotate(90  , [ 1, 0 , 0]) , model);
		model = mult(translate(-1.3 ,  -0.16 , 1.2) , model);
		draw(texture9 , 0, model);
		
		//notice
		model =  new scale(.15,.25,v) ;
		model = mult(rotate(-90  , [ 0, 1 , 0]) , model);
		model = mult(translate(.8 , 0 , 1.52	) , model);
		//model = mult(translate(-1.4 , 0 , 1.2) , model);
		draw(texture10 , 0, model);
		
	
		//door
		var sh = .1;
		dc = 0 ;
		model =  new scale(.2, .5,v) ;
		//model = mult(translate(0, 0, sh) , model);
		model = mult(rotate(doorAngle  , [ 0, 1 , 0]) , model );
		//model = mult( translate(0 , 0, -sh) ,model );
		model = mult(translate(-.1  , -0.01 , .73) , model);
		draw(texture18, 0, model)
	
	
	//elevator
	if(feo == 1)
	{
	if(eo < .17)
	   eo = eo + .01;
	}
   else
   {
		  if(eo >= 0)
	   eo = eo - .01;
   }
	ey =  -0.06;
	  if(floor == 1){ey = .54;}
	 
	
		model =  new scale(.2, .4,v) ;
		model = mult(rotate(-90  , [ 0, 1 , 0]) , model);
		model = mult(translate(.69 , ey , 3.62 + eo) , model);
		draw(texture19 , 0, model)
	
	
	
		model =  new scale(.2, .4,v) ;
		model = mult(rotate(-90  , [ 0, 1 , 0]) , model);
		model = mult(translate(.69 , ey , 3.42 - eo) , model);
		draw(texture19 , 0, model)
	
}
 function drawCube(){
		
	
	//gl.uniform1i(renderTypeLoc , 0);
 gl.useProgram( program2 );
	
	gl.bindBuffer( gl.ARRAY_BUFFER, vBufferC );
	 vPositionC = gl.getAttribLocation( program2, "vPosition" );
    gl.vertexAttribPointer( vPositionC, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPositionC );
	
	gl.bindBuffer( gl.ARRAY_BUFFER, tBufferC );
	  vTexCoordC = gl.getAttribLocation( program2, "vTexCoord" );
    gl.vertexAttribPointer( vTexCoordC, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vTexCoordC );
	
	//gl.enableVertexAttribArray( vPosition );
	gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, indexBufferIDC );
	
	gl.uniformMatrix4fv(perLoc2, false, flatten(per));
	gl.uniformMatrix4fv(viewLoc2, false, flatten(view));
	v = 30;
	s =  new scale(v,v,v);
	model = s ;
		model = mult(rotate(180  , [ 0, 1 , 0]) , s);
		model = mult(translate(0 , 0 , v) , model);
		draw(texture3 , 0, model);
		
		 model = mult( s , translate(0 , 0 , -1) );
		
		draw(texture6 , 0 , model);
		
		
		
	//model = mult(s , rotate(180 , [ 0, 1 , 0]) );
		model = mult(s,rotate(-90  , [ 0, 1 , 0]) );
			 model = mult(translate(v , 0 , 0) , model);
		 draw(texture4 , 0 , model);
		
		model = mult(s , rotate(90  , [ 0, 1 , 0]));
		 model = mult(translate(-v , 0 , 0) , model);
		draw(texture1 , 0 ,model);
		
		model = mult(s, rotate(90  , [ 1, 0 , 0]));
		draw(texture2 , 0,model);
		
		model = mult(s,rotate(90  , [ 1, 0 , 0]));
		 model = mult(translate(0 , v , 0) , model);
		draw(texture5, 0,model);
		/**/
/**/
}

 
 
function render()
{
	//Render function
	
	//drawWoodward();
	 gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	setView(vType);
	drawCube();
	drawWoodward();
	drawTextures();

    requestAnimFrame( render );
}

