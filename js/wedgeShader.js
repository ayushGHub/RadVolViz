function init() {

	var rotateVarN = 0.0;
		//Parameters that can be modified.
				guiControls = new function() {
					this.model = 'Default';
					this.steps = 256.0;
					this.alphaCorrection = 0.8;
					this.minR = 0.3;
					this.maxR = 0.7;
					this.minG = 0.3;
					this.maxG = 0.7;
					this.minB = 0.3;
					this.maxB = 0.7;
					this.rotateVar3D =0.0;
					this.modeGBC = 1.0;
					this.r_fe = 1.0;
          this.r_mass = 0.0;
          this.r_pd = 0.0;
          this.r_pt = 0.0;
          this.g_fe = 0.0;
          this.g_mass = 1.0;
          this.g_pd = 0.0;
          this.g_pt = 0.0;
          this.b_fe = 0.0;
          this.b_mass = 0.0;
          this.b_pd = 1.0;
          this.b_pt = 0.0;
          this.radialValue = 0.0;
					this.binValue = 1.0;
					this.testValue=0.0;
					this.radiusR = 155.1;
					this.xValue = 0.0;
					this.yValue = 0.0;
					this.arcWidth = 2.1;
					this.modeARC = 0.0;
					this.startAng = 0.1;
          this.aa= 0.0;
					this.points = 15000;

				};

				container = document.getElementById( 'container' );

				camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.01, 3000.0 );
				camera.position.z = 1.0;

        camera.target = new THREE.Vector3(0, 0, 0);
        camera.lookAt(camera.target);


        controls = new THREE.OrbitControls( camera, container );
        controls.center.set( 0.0, 0.0, 0.0 );

	      var gui = new dat.GUI();


			//	var modelSelected = gui.add(guiControls, 'model', [ 'Default'] );
			  var f2 = gui.addFolder("3D-2D-COLORMAP")
				var colorS = f2.add(guiControls, 'steps', 0.0, 512.0).name('STEPS');
				f2.add(guiControls, 'alphaCorrection', 0.00, 1.0).step(0.01).name('ALPHA');
				var ColorMap = gui.addFolder("2D-COLORMAP");
				gui.add(guiControls, 'points', 0.0, 65000.0).step(10.0).name('POINTS');
				gui.add(guiControls, 'rotateVar3D', 0.0, 6.3).step(0.1).name('ROTATE');
        gui.add(guiControls, 'radialValue', 0.0, 200).step(2).name('RADIAL');
				gui.add(guiControls, 'binValue', 0.0, 100).step(2).name('BIN');
				gui.add(guiControls,'modeGBC',{NORMAL:0.0,GBC:1.0}).name('MODE');
				gui.add(guiControls,'modeARC',{WEDGE:0.0,LENS:1.0}).name('WEDGE / LENS');
				var LENS = gui.addFolder("LENS");

				LENS.add(guiControls,'radiusR',0.0,156.0).step(1.0).name('LENS RADIUS');
				LENS.add(guiControls,'xValue',-140.0,140.0).step(1.0).name('MOVE-X');
				LENS.add(guiControls,'yValue',-140.0,140.0).step(1.0).name('MOVE-Y');
				var WEDGE = gui.addFolder("WEDGE");
				gui.add(guiControls,'startAng',0.0,360.0).step(1.0).name('START ANGLE');
				gui.add(guiControls,'arcWidth',0.0,6.3).step(0.01).name('END ANGLE');

				f2.domElement.classList.add('red');


				var customContainer = document.getElementById('my-gui-container');
				customContainer.appendChild(LENS.domElement);

				f2.open();
				LENS.open();

				/*****************************************************************************************
						LOAD THE IMAGE TEXTURE TO BE USED FOR RENDERING
				******************************************************************************************/
			//	cubeTextures['Default'] = THREE.ImageUtils.loadTexture('./img/Final_Padded_FeMassPdPt.png' );
				cubeTextures['Default'] = THREE.ImageUtils.loadTexture('./img/12CeCoFeGd.png');
        cubeTextures['Default'].generateMipmaps = false;
				cubeTextures['Default'].minFilter = THREE.LinearFilter;
				cubeTextures['Default'].magFilter = THREE.LinearFilter;



			//	var transferTexture = updateTransferFunction();

				var screenSize = new THREE.Vector2( window.innerWidth/2, window.innerHeight/2 );
				rtTexture = new THREE.WebGLRenderTarget( screenSize.x, screenSize.y,
														{ 	minFilter: THREE.LinearFilter,
															magFilter: THREE.LinearFilter,
															wrapS:  THREE.ClampToEdgeWrapping,
															wrapT:  THREE.ClampToEdgeWrapping,
															format: THREE.RGBFormat,
															type: THREE.FloatType,
															generateMipmaps: false} );


				var materialFirstPass = new THREE.ShaderMaterial( {
					vertexShader: document.getElementById( 'vertexShaderFirstPass' ).textContent,
					fragmentShader: document.getElementById( 'fragmentShaderFirstPass' ).textContent,
					side: THREE.BackSide
				} );

				materialSecondPass = new THREE.ShaderMaterial( {
					vertexShader: document.getElementById( 'vertexShaderSecondPass' ).textContent,
					fragmentShader: document.getElementById( 'fragmentShaderSecondPass' ).textContent,
					side: THREE.FrontSide,
					uniforms: {	tex:  { type: "t", value: rtTexture },
								cubeTex:  { type: "t", value: cubeTextures['Default'] },
								transferTex:  { type: "t", value: transferTexture },
								steps : {type: "1f" , value: guiControls.steps },
								modeGBC : {type: "1f" , value: guiControls.modeGBC },
								rotateVar3D : {type: "1f" , value: guiControls.rotateVar3D },
								alphaCorrection : {type: "1f" , value: guiControls.alphaCorrection },
                radialValue : {type: "1f" , value: guiControls.radialValue },
								testValue : {type: "1f" , value: guiControls.testValue },
								binValue : {type: "1f" , value: guiControls.binValue },
								xValue : {type: "1f" , value: guiControls.xValue },
								yValue : {type: "1f" , value: guiControls.yValue },
								radiusR : {type: "1f" , value: guiControls.radiusR },
								arcWidth : {type: "1f" , value: guiControls.arcWidth },
								modeARC : {type: "1f" , value: guiControls.modeARC },
								points : {type: "1f" , value: guiControls.points },
                aa : {type: "1f" , value: guiControls.aa },
								startAng : {type: "1f" , value: guiControls.startAng }
								}
				 });

				sceneFirstPass = new THREE.Scene();
				sceneSecondPass = new THREE.Scene();


				var boxGeometry = new THREE.BoxGeometry(1.0, 1.0, 1.0);
				boxGeometry.doubleSided = true;

				var meshFirstPass = new THREE.Mesh( boxGeometry, materialFirstPass );
				var meshSecondPass = new THREE.Mesh( boxGeometry, materialSecondPass );

				sceneFirstPass.add( meshFirstPass );
				sceneSecondPass.add( meshSecondPass );

				renderer = new THREE.WebGLRenderer({ alpha: true });
				container.appendChild( renderer.domElement );


				onWindowResize();

				window.addEventListener( 'resize', onWindowResize, false );


			};
