(this["webpackJsonprylos-space-adventure"]=this["webpackJsonprylos-space-adventure"]||[]).push([[0],{48:function(e,n,t){},58:function(e,n,t){"use strict";t.r(n);var r=t(4),i=t.n(r),a=t(33),o=t.n(a),c=(t(48),t(7)),s=t(11),l=t(0),d=t(10),u=t(1);function m(e){var n=e.count,t=void 0===n?2e3:n,i=Object(r.useMemo)((function(){for(var e=[],n=0;n<t;n++){var r=4e3,i=2*Math.PI*Math.random(),a=Math.acos(2*Math.random()-1),o=r*Math.cos(i)*Math.sin(a)+(4e3*Math.random()-2e3),c=r*Math.sin(i)*Math.sin(a)+(4e3*Math.random()-2e3),s=r*Math.cos(a)+(2e3*Math.random()-1e3);e.push(o),e.push(c),e.push(s)}return new Float32Array(e)}),[t]);return Object(u.jsxs)("points",{children:[Object(u.jsx)("bufferGeometry",{children:Object(u.jsx)("bufferAttribute",{attachObject:["attributes","position"],count:i.length/3,array:i,itemSize:3})}),Object(u.jsx)("pointsMaterial",{size:15,sizeAttenuation:!0,color:"white",fog:!1})]})}var h=t.p+"static/media/earth.45ed3b77.jpg",j=t.p+"static/media/moon.27019542.png";function p(){var e=Object(r.useRef)(),n=Object(d.e)(l.TextureLoader,[h,j]),t=Object(s.a)(n,2),i=t[0],a=t[1];return Object(u.jsxs)("group",{ref:e,scale:[100,100,100],position:[-500,-500,1e3],children:[Object(u.jsxs)("mesh",{children:[Object(u.jsx)("sphereGeometry",{args:[5,32,32]}),Object(u.jsx)("meshStandardMaterial",{map:i,roughness:1,fog:!1})]}),Object(u.jsxs)("mesh",{position:[5,-5,-5],children:[Object(u.jsx)("sphereGeometry",{args:[.75,32,32]}),Object(u.jsx)("meshStandardMaterial",{roughness:1,map:a,fog:!1})]}),Object(u.jsx)("pointLight",{position:[-5,-5,-5],distance:1e3,intensity:6}),Object(u.jsxs)("mesh",{position:[-30,-10,-60],children:[Object(u.jsx)("sphereGeometry",{args:[4,32,32]}),Object(u.jsx)("meshBasicMaterial",{color:"#FFFF99",fog:!1}),Object(u.jsx)("pointLight",{distance:6100,intensity:50,color:"white"})]})]})}var b=t(42),f=t(19),x=t(36),g=t(43),O=t(44);function y(){var e=Object(r.useRef)(),n=Object(d.f)(),t=n.scene,i=n.gl,a=n.size,o=n.camera;return Object(r.useEffect)((function(){e.current.setSize(a.width,a.height)}),[a]),Object(d.d)((function(){return e.current.render()}),2),Object(u.jsxs)("effectComposer",{ref:e,args:[i],children:[Object(u.jsx)("renderPass",{attachArray:"passes",scene:t,camera:o}),Object(u.jsx)("unrealBloomPass",{attachArray:"passes",args:[void 0,1.8,1,0]})]})}Object(d.c)({EffectComposer:b.a,ShaderPass:f.a,RenderPass:x.a,UnrealBloomPass:g.a,FilmPass:O.a});var v=t(9),w=t(5),M=t(38),k=t(27),S=t.p+"static/media/laser.373d639d.mp3",_=t.p+"static/media/engine.75bbe12e.mp3",A=t.p+"static/media/engine2.87c3c40a.mp3",R=t.p+"static/media/warp.1f9bec85.mp3",T=t.p+"static/media/click.db461987.mp3",z=t.p+"static/media/explosion.615cfd43.mp3",C=t.p+"static/media/crash.184e27d2.wav",P=t.p+"static/media/rylos-freak-lust.d42472e3.png",B=t.p+"static/media/rylos-freak-lust.a13462cf.mp3",E=t.p+"static/media/rylos-misunderstood.d13d9c2d.jpg",G=t.p+"static/media/rylos-misunderstood.2afd4c11.mp3",I=t.p+"static/media/rylos-road.86b24c20.png",F=t.p+"static/media/rylos-road.138ea8a0.mp3",D=t.p+"static/media/rylos-climate.f7a8098a.jpg",L=t.p+"static/media/rylos-climate.c3742818.mp3",N=t.p+"static/media/rylos-black-liquid.c5d1d0a2.jpg",V=t.p+"static/media/rylos-black-liquid.130be6d9.mp3",q={explosion:z},U=[{songName:"Rylos - Freak Lust",songCover:P,songSrc:B},{songName:"Rylos - Misunderstood",songCover:E,songSrc:G},{songName:"Rylos - Road",songCover:I,songSrc:F},{songName:"Rylos - Climate",songCover:D,songSrc:L},{songName:"Rylos - Black Liquid",songCover:N,songSrc:V}],X=new Audio(C),H=new Audio(S),J=new Audio(_),K=new Audio(A),W=new Audio(R),Y=new Audio(T);new Audio(z);function Q(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,t=arguments.length>2&&void 0!==arguments[2]&&arguments[2];e.currentTime=0,e.volume=n,e.loop=t,e.play()}var Z=t(37),$=t.n(Z),ee=1;function ne(e,n,t,r,i){return new Array(e).fill().map((function(){var e=Math.random(),a=n.parameters.path.getPointAt(e);a.multiplyScalar(15);var o=a.clone().add(new l.Vector3(-t+Math.random()*t*2,-t+Math.random()*t*2,-t+Math.random()*t*2)),c=.1+Math.random();return{guid:ee++,scale:"function"===typeof i?i():i,size:r,offset:o,pos:a,speed:c,radius:t,t:e,hit:new l.Vector3,distance:1e3}}))}var te=Object(k.a)((function(e,n){var t=new M.a.GrannyKnot,r=new l.TubeBufferGeometry(t,250,.2,10,!0),i=void 0,a=void 0,o=void 0,c=new l.Box3;return{currentTrackIndex:0,menu:void 0,camera:void 0,lastPoints:0,points:0,highScore:0,health:100,lasers:[],explosions:[],rocks:ne(100,r,150,8,(function(){return 1+2.5*Math.random()})),immunity:!0,clock:null,mutation:{t:0,position:new l.Vector3,startTime:null,track:r,scale:15,fov:70,hits:!1,particles:ne(1500,r,100,1,(function(){return.5+.8*Math.random()})),looptime:4e4,binormal:new l.Vector3,normal:new l.Vector3,mouse:new l.Vector2(-250,50),dummy:new l.Object3D,ray:new l.Ray,box:new l.Box3},actions:{menu:{start:function(){e({menu:null})},game:function(){e({menu:"game"})},credits:function(){e({menu:"credits"})}},reset:function(){e({menu:"game",health:100,immunity:!0,points:0})},init:function(t){var i=n(),o=i.mutation,c=i.actions,s=localStorage.getItem("rylos-space-adventure-hiscore");s&&parseInt(s)&&e({highScore:s}),e({camera:t,clock:new l.Clock(!0)});var u=n().clock;o.startTime=Date.now(),Q(J,.4,!0),Q(K,.4,!0),Object(d.b)((function(){n().immunity&&setTimeout((function(){return e({immunity:!1})}),5e3)})),Object(d.b)((function(){var t=n(),i=t.rocks,s=t.immunity,l=Date.now(),d=40-u.getElapsedTime()/15,m=Math.max(1e3*d,1e4),h=o.t=(l-o.startTime)%m/m;o.position=r.parameters.path.getPointAt(h),o.position.multiplyScalar(o.scale);var j=!1;h>.3&&h<.4?j||(j=!0,Q(W)):h>.5&&(j=!1);var p=i.filter(c.test),b=o.hits;o.hits=p.length,0===b&&o.hits&&Q(Y);var f=n().lasers;if(o.hits&&f.length&&l-f[f.length-1]<100){var x=p.map((function(e){return Object(w.a)({time:Date.now()},e)}));e((function(e){return{explosions:[].concat(Object(v.a)(e.explosions),Object(v.a)(x))}})),clearTimeout(a),a=setTimeout((function(){return e((function(e){return{explosions:e.explosions.filter((function(e){var n=e.time;return Date.now()-n<=1e3}))}}))}),1e3);var g=ne(o.hits,r,150,8,(function(){return 1+2.5*Math.random()}));e((function(e){return{points:e.points+100*p.length,rocks:[].concat(Object(v.a)(g),Object(v.a)(e.rocks.filter((function(e){return!p.find((function(n){return n.guid===e.guid}))}))))}}))}var O=p.filter((function(e){return e.distance<30}));if(O.length>0){Q(X,1,!1);var y=O.map((function(e){return Object(w.a)({time:Date.now()},e)}));e((function(e){return{explosions:[].concat(Object(v.a)(e.explosions),Object(v.a)(y))}})),clearTimeout(a),a=setTimeout((function(){return e((function(e){return{explosions:e.explosions.filter((function(e){var n=e.time;return Date.now()-n<=1e3}))}}))}),1e3);var M=ne(o.hits,r,150,8,(function(){return 1+2.5*Math.random()}));e((function(e){return{rocks:[].concat(Object(v.a)(M),Object(v.a)(e.rocks.filter((function(e){return!O.find((function(n){return n.guid===e.guid}))}))))}})),!1===s&&e((function(e){return{health:Math.max(0,e.health-20)}}))}if(n().health<=0){var k=n().points;e({menu:"dead",lastPoints:k,clock:null}),n().highScore<k&&(e({highScore:k}),localStorage.setItem("rylos-space-adventure-hiscore",k))}}))},autofire:$()((function(e){e&&0===e.button&&(clearInterval(o),n().actions.fire(),o=setInterval((function(){n().actions.fire()}),120))}),120),cancelAutofire:function(){clearInterval(o)},fire:function(){e((function(e){return{lasers:[].concat(Object(v.a)(e.lasers),[Date.now()])}})),clearTimeout(i),i=setTimeout((function(){return e((function(e){return{lasers:e.lasers.filter((function(e){return Date.now()-e<=1e3}))}}))}),1e3),Q(H,.25)},onTouchMove:function(e){var t=e.touches[0],r=t.clientX,i=t.clientY;n().actions.move({clientX:r,clientY:i})},move:function(e){var t=e.clientX,r=e.clientY;n().mutation.mouse.set(t-window.innerWidth/2,r-window.innerHeight/2)},test:function(e){c.min.copy(e.offset),c.max.copy(e.offset),c.expandByScalar(e.size*e.scale),e.hit.set(1e4,1e4,1e4);var t=n().mutation.ray.intersectBox(c,e.hit);return e.distance=n().mutation.ray.origin.distanceTo(e.hit),t}}}}));function re(){var e=Object(r.useRef)(),n=te((function(e){return e.mutation})),t=n.particles,i=n.dummy;return Object(r.useEffect)((function(){t.forEach((function(n,t){var r=n.offset,a=n.scale;i.position.copy(r),i.scale.set(a,a,a),i.rotation.set(Math.sin(Math.random())*Math.PI,Math.sin(Math.random())*Math.PI,Math.cos(Math.random())*Math.PI),i.updateMatrix(),e.current.setMatrixAt(t,i.matrix)})),e.current.instanceMatrix.needsUpdate=!0}),[]),Object(u.jsxs)("instancedMesh",{ref:e,args:[null,null,t.length],frustumCulled:!1,children:[Object(u.jsx)("coneGeometry",{args:[2,2,3]}),Object(u.jsx)("meshStandardMaterial",{color:"#606060"})]})}var ie=t(28);function ae(){var e=Object(d.e)(ie.a,"/rylos-space-adventure/rock.gltf");return te((function(e){return e.rocks})).map((function(n){return Object(r.createElement)(oe,Object(w.a)(Object(w.a)({},e),{},{key:"rock-".concat(n.guid),data:n}))}))}var oe=i.a.memo((function(e){var n=e.nodes,t=e.materials,i=e.data,a=Object(r.useRef)(),o=te((function(e){return e.clock}));return Object(d.d)((function(){try{var e=Math.cos(o.getElapsedTime()/2*i.speed)*Math.PI;a.current.rotation.set(e,e,e)}catch(n){}})),Object(u.jsx)("group",{ref:a,position:i.offset,scale:[i.scale,i.scale,i.scale],children:Object(u.jsx)("group",{position:[-.016298329457640648,-.012838120572268963,.24073271453380585],rotation:[3.0093872578726644,.27444228385461117,-.22745113653772078],scale:[20,20,20],children:Object(u.jsx)("mesh",{geometry:n.node_id4_Material_52_0.geometry,material:t.Material_52,"material-roughness":1,"material-metalness":1})})})}));function ce(e,n){return{ref:i.a.createRef(),color:e,data:new Array(20).fill().map((function(){return[new l.Vector3,new l.Vector3(2*Math.random()-1,2*Math.random()-1,2*Math.random()-1).normalize().multiplyScalar(.75*n)]}))}}function se(){return te((function(e){return e.explosions})).map((function(e){var n=e.guid,t=e.offset,r=e.scale;return Object(u.jsx)(le,{position:t,scale:.75*r},"explosion-".concat(n))}))}function le(e){var n=e.position,t=e.scale,i=Object(r.useRef)(),a=te((function(e){return e.mutation})).dummy,o=Object(r.useMemo)((function(){return[ce("white",.8),ce("orange",.6)]}),[]);return Object(r.useEffect)((function(){Q(new Audio(q.explosion),.2)}),[]),Object(d.d)((function(){o.forEach((function(e,n){var t=e.data;try{var r=i.current.children[n];t.forEach((function(e,n){var t=Object(s.a)(e,2),i=t[0],o=t[1];i.add(o),a.position.copy(i),a.updateMatrix(),r.setMatrixAt(n,a.matrix)})),r.material.opacity-=.025,r.instanceMatrix.needsUpdate=!0}catch(o){}}))})),Object(u.jsx)("group",{ref:i,position:n,scale:[t,t,t],children:o.map((function(e,n){var t=e.color,r=e.data;return Object(u.jsxs)("instancedMesh",{args:[null,null,r.length],frustumCulled:!1,children:[Object(u.jsx)("dodecahedronGeometry",{args:[10,0]}),Object(u.jsx)("meshBasicMaterial",{color:t,transparent:!0,opacity:1,fog:!1})]},n)}))})}function de(){var e=te((function(e){return e.mutation})),n=e.scale,t=e.track;return Object(u.jsx)("mesh",{scale:[n,n,n],geometry:t,children:Object(u.jsx)("meshBasicMaterial",{color:"#9b51e0"})})}var ue=new l.BoxBufferGeometry(1,1,40),me=new l.Color("red"),he=new l.Color("orangered"),je=new l.Color("#FFF293"),pe=new l.MeshBasicMaterial({color:he}),be=new l.MeshBasicMaterial({color:he,fog:!1}),fe=new l.Vector3,xe=new l.Vector3;function ge(){var e=Object(d.e)(ie.a,"/rylos-space-adventure/ship.gltf").nodes,n=te((function(e){return e.clock})),t=te((function(e){return e.mutation})),i=t.mouse,a=t.ray,o=te((function(e){return e.lasers})),c=Object(r.useRef)(),s=Object(r.useRef)(),l=Object(r.useRef)(),m=Object(r.useRef)(),h=Object(r.useRef)(),j=Object(r.useRef)();return Object(d.d)((function(){n&&(c.current.position.z=Math.sin(40*n.getElapsedTime())*Math.PI*.2,c.current.rotation.z+=.2*(i.x/500-c.current.rotation.z)),c.current.rotation.x+=.2*(-i.y/1200-c.current.rotation.x),c.current.rotation.y+=.2*(-i.x/1200-c.current.rotation.y),c.current.position.x+=.2*(i.x/10-c.current.position.x),c.current.position.y+=.2*(25+-i.y/10-c.current.position.y),n&&(m.current.scale.x=1+Math.sin(200*n.getElapsedTime()),m.current.scale.y=1+Math.sin(200*n.getElapsedTime())),m.current.scale.x=.01,m.current.scale.y=.01;for(var e=0;e<o.length;e++){s.current.children[e].position.z-=20}l.current.intensity+=.3*((o.length&&Date.now()-o[o.length-1]<100?20:0)-l.current.intensity),c.current.getWorldPosition(fe),c.current.getWorldDirection(xe),a.origin.copy(fe),a.direction.copy(xe.negate()),be.color=t.hits?me:he,j.current.visible=!!t.hits})),Object(u.jsxs)("group",{ref:c,children:[Object(u.jsxs)("group",{scale:[3.5,3.5,3.5],children:[Object(u.jsxs)("group",{ref:h,position:[0,0,-300],name:"cross",children:[Object(u.jsx)("mesh",{renderOrder:1e3,material:be,children:Object(u.jsx)("boxGeometry",{args:[20,2,2]})}),Object(u.jsx)("mesh",{renderOrder:1e3,material:be,children:Object(u.jsx)("boxGeometry",{args:[2,20,2]})})]}),Object(u.jsxs)("group",{ref:j,position:[0,0,-300],name:"target",children:[Object(u.jsx)("mesh",{position:[0,20,0],renderOrder:1e3,material:be,children:Object(u.jsx)("boxGeometry",{args:[40,2,2]})}),Object(u.jsx)("mesh",{position:[0,-20,0],renderOrder:1e3,material:be,children:Object(u.jsx)("boxGeometry",{args:[40,2,2]})}),Object(u.jsx)("mesh",{position:[20,0,0],renderOrder:1e3,material:be,children:Object(u.jsx)("boxGeometry",{args:[2,40,2]})}),Object(u.jsx)("mesh",{position:[-20,0,0],renderOrder:1e3,material:be,children:Object(u.jsx)("boxGeometry",{args:[2,40,2]})})]}),Object(u.jsx)("pointLight",{ref:l,position:[0,0,-20],distance:100,intensity:0,color:je}),Object(u.jsx)("group",{ref:s,children:o.map((function(e,n){return Object(u.jsxs)("group",{children:[Object(u.jsx)("mesh",{position:[-2.8,0,-.8],geometry:ue,material:pe}),Object(u.jsx)("mesh",{position:[2.8,0,-.8],geometry:ue,material:pe})]},n)}))}),Object(u.jsxs)("group",{rotation:[Math.PI/2,Math.PI,0],children:[Object(u.jsx)("mesh",{name:"Renault_(S,_T1)_0",geometry:e["Renault_(S,_T1)_0"].geometry,children:Object(u.jsx)("meshStandardMaterial",{color:"#16161d"})}),Object(u.jsx)("mesh",{name:"Renault_(S,_T1)_1",geometry:e["Renault_(S,_T1)_1"].geometry,children:Object(u.jsx)("meshStandardMaterial",{color:"#4c341c"})}),Object(u.jsx)("mesh",{name:"Renault_(S,_T1)_2",geometry:e["Renault_(S,_T1)_2"].geometry,children:Object(u.jsx)("meshStandardMaterial",{color:"#16161d"})}),Object(u.jsx)("mesh",{name:"Renault_(S,_T1)_3",geometry:e["Renault_(S,_T1)_3"].geometry,children:Object(u.jsx)("meshBasicMaterial",{color:"lightblue"})}),Object(u.jsx)("mesh",{name:"Renault_(S,_T1)_4",geometry:e["Renault_(S,_T1)_4"].geometry,children:Object(u.jsx)("meshBasicMaterial",{color:"orangered"})}),Object(u.jsx)("mesh",{name:"Renault_(S,_T1)_5",geometry:e["Renault_(S,_T1)_5"].geometry,children:Object(u.jsx)("meshBasicMaterial",{color:"orangered"})})]})]}),Object(u.jsx)("pointLight",{ref:m,position:[0,1,30],distance:100,intensity:1,color:"orangered"})]})}var Oe=0;function ye(e){var n=e.children,t=Object(r.useRef)(),i=Object(r.useRef)(),a=te((function(e){return e.mutation})),o=a.fov,c=a.scale,s=a.binormal,l=a.normal,m=a.track,h=a.mouse,j=Object(d.f)().camera;return Object(d.d)((function(){var e=a.t,n=a.position.clone(),r=m.tangents.length,i=e*r,d=Math.floor(i),u=(d+1)%r;s.subVectors(m.binormals[u],m.binormals[d]),s.multiplyScalar(i-d).add(m.binormals[d]);var p=m.parameters.path.getTangentAt(e);Oe+=.05*(Math.max(15,15+-h.y/20)-Oe),l.copy(s).cross(p),n.add(l.clone().multiplyScalar(Oe)),j.position.copy(n);var b=m.parameters.path.getPointAt((e+30/m.parameters.path.getLength())%1).multiplyScalar(c);j.matrix.lookAt(j.position,b,l),j.quaternion.setFromRotationMatrix(j.matrix),j.fov+=.05*((e>.4&&e<.45?120:o)-j.fov),j.updateProjectionMatrix();var f=m.parameters.path.getPointAt((e+1/m.parameters.path.getLength())%1).multiplyScalar(c);t.current.position.copy(f),t.current.quaternion.setFromRotationMatrix(j.matrix)})),Object(u.jsxs)("group",{ref:t,children:[Object(u.jsx)("pointLight",{distance:400,position:[0,100,-420],intensity:5,color:"#9b51e0"}),Object(u.jsx)("group",{ref:i,position:[0,0,-50],children:n})]})}var ve,we,Me,ke,Se,_e,Ae,Re,Te,ze,Ce,Pe,Be,Ee,Ge,Ie=t(8),Fe=t.p+"static/media/rewind.4cd5b907.svg",De=t.p+"static/media/play.496c51e4.svg",Le=function(){var e=Math.floor(Math.random()*(U.length-1-0+1)+0),n=Object(r.useState)(e),t=Object(s.a)(n,2),i=t[0],a=t[1],o=Object(r.useState)(new Audio(U[i].songSrc))[0],c=U[i];Object(r.useEffect)((function(){return o.loop=!0,o.play(),function(){o.pause(),o.removeAttribute("src"),o.load()}}),[]),Object(r.useEffect)((function(){o.pause(),o.setAttribute("src",U[i].songSrc),o.load(),o.play()}),[i]);return Object(u.jsxs)(Ne,{children:[Object(u.jsx)(Ve,{children:Object(u.jsx)("img",{src:c.songCover})}),Object(u.jsxs)(qe,{children:[Object(u.jsx)(Ue,{children:Object(u.jsxs)(Xe,{children:[Object(u.jsx)("span",{children:null===c||void 0===c?void 0:c.songName}),Object(u.jsx)("span",{className:"last",children:null===c||void 0===c?void 0:c.songName})]})}),Object(u.jsxs)(He,{children:[Object(u.jsx)("button",{children:Object(u.jsx)("img",{onClick:function(){var e=Math.max(i-1,0);a(i===e?U.length-1:e)},src:Fe})}),Object(u.jsx)("button",{onClick:function(){o.duration>0&&!o.paused?o.pause():o.play()},children:Object(u.jsx)("img",{src:De})}),Object(u.jsx)("button",{children:Object(u.jsx)("img",{onClick:function(){var e=Math.min(i+1,U.length-1);a(e===i?0:e)},src:Fe})})]})]})]})},Ne=Ie.c.div(ve||(ve=Object(c.a)(["\n  width: 400px;\n  max-width: 100%;\n  background: linear-gradient(#4f0158, #000000);\n  flex-direction: row;\n  display: flex;\n  padding: 10px;\n  overflow: hidden;\n  box-shadow: 0 15px 15px rgba(0, 0, 0, 0.7);\n  border-radius: 4px;\n\n  * {\n    cursor: pointer;\n    pointer-events: all;\n  }\n\n  @media only screen and (max-width: 900px) {\n    width: 100%;\n  }\n"]))),Ve=Ie.c.div(we||(we=Object(c.a)(["\n  border: 2px solid orangered;\n  overflow: hidden;\n  height: 90px;\n  width: 90px;\n  margin-right: 1rem;\n  img {\n    height: 100%;\n  }\n"]))),qe=Ie.c.div(Me||(Me=Object(c.a)(["\n  flex-grow: 1;\n"]))),Ue=Ie.c.div(ke||(ke=Object(c.a)(["\n  display: flex;\n  flex-direction: row;\n  width: 100%;\n  margin-bottom: 0.5rem;\n"]))),Xe=Ie.c.div(Se||(Se=Object(c.a)(["\n  position: relative;\n  height: 100%;\n  width: 100%;\n  border-radius: 2px;\n  padding: 1rem 0.5rem;\n  overflow: hidden;\n  background: black;\n\n  span {\n    white-space: nowrap;\n    padding-left: 100%;\n    top: 8px;\n    position: absolute;\n    color: white;\n    display: inline-block;\n    animation: scroll-left 12s linear infinite;\n  }\n  span.last {\n    animation-delay: 6s;\n  }\n"]))),He=Ie.c.div(_e||(_e=Object(c.a)(["\n  button {\n    border-radius: 1rem;\n    background: transparent;\n    width: 3.5rem;\n    margin-right: 0.5rem;\n    height: 2.5rem;\n    border-color: orangered;\n  }\n\n  button:last-of-type img {\n    width: 100%;\n    transform: scaleX(-1);\n  }\n\n  button img {\n    width: 100%;\n    height: 100%;\n  }\n"]))),Je=t.p+"static/media/cardiogram.3d5622b7.svg",Ke=t.p+"static/media/heartbeat.7f66a5e2.wav",We=t.p+"static/media/garbage.520ba2b9.svg";function Ye(){var e=te((function(e){return e.points})),n=te((function(e){return e.immunity})),t=te((function(e){return e.health})),i=te((function(e){return e.actions.toggleSound})),a=Object(r.useMemo)((function(){return e>=1e3?(e/1e3).toFixed(1)+"K":e}),[e]),o=t<50,c=o?"#c5411e":"#008C20";return Object(r.useEffect)((function(){var e=new Audio;return e.volume=1,e.loop=!0,o?(e.setAttribute("src",Ke),e.load(),e.play()):(e.pause(),e.removeAttribute("src"),e.load()),function(){e.pause(),e.removeAttribute("src"),e.load()}}),[o]),Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)(jn,{onClick:function(){return i()},children:Object(u.jsxs)(mn,{children:[Object(u.jsx)("img",{className:o?"pulse":"",src:Je}),Object(u.jsx)("div",{style:{flexGrow:1,marginRight:"1rem"},children:Object(u.jsx)(hn,{style:{backgroundColor:n?"blue":c,width:"".concat(t,"%")}})})]})}),Object(u.jsx)(pn,{children:Object(u.jsx)("a",{target:"_blank",href:"https://www.rylosplanet.fi/",children:"Rylos Planet"})}),Object(u.jsx)(bn,{children:Object(u.jsxs)(un,{children:[Object(u.jsx)("img",{src:We}),Object(u.jsx)("h1",{children:a})]})}),Object(u.jsx)(xn,{}),Object(u.jsx)(fn,{children:Object(u.jsx)(Le,{})})]})}var Qe,Ze,$e,en,nn,tn,rn,an,on,cn,sn,ln,dn=Object(Ie.b)(Ae||(Ae=Object(c.a)(["\n  font-family: 'Sedgwick Ave', sans-serif;\n  position: absolute;\n  text-transform: uppercase;\n  font-weight: 900;\n  font-variant-numeric: slashed-zero tabular-nums;\n  line-height: 1em;\n  pointer-events: none;\n  color: #9b51e0;\n"]))),un=Ie.c.div(Re||(Re=Object(c.a)(["\n  display: flex;\n  flex-direction: row;\n\n  img {\n    width: 50px;\n    margin-right: 2rem;\n  }\n"]))),mn=Ie.c.div(Te||(Te=Object(c.a)(["\n  border-radius: 0.5rem;\n  display: flex;\n  flex-direction: row;\n  background: #333;\n  border: 2px solid #666;\n  min-width: 10vw;\n  margin-top: 1rem;\n  padding: 0.5rem;\n  max-width: 150px;\n\n  img {\n    max-width: 45px;\n    margin-right: 1rem;\n  }\n"]))),hn=Ie.c.div(ze||(ze=Object(c.a)(["\n  background: green;\n  color: white;\n  overflow: hidden;\n  transition: width 0.2s ease-in;\n  height: 100%;\n"]))),jn=Ie.c.div(Ce||(Ce=Object(c.a)(["\n  ","\n  top: 50px;\n  left: 50px;\n  font-size: 2em;\n  transform: skew(5deg, 5deg);\n\n  @media only screen and (max-width: 900px) {\n    left: 20px;\n    top: 20px;\n    transform: none;\n    font-size: 1.5em;\n  }\n"])),dn),pn=Ie.c.div(Pe||(Pe=Object(c.a)(["\n  ","\n  text-align: right;\n  top: 50px;\n  right: 50px;\n  font-size: 2em;\n  transform: skew(-5deg, -5deg);\n  pointer-events: all;\n  cursor: pointer;\n  text-shadow: 1px 1px 1px rgba(0, 0, 0.5);\n\n  * {\n    cursor: pointer;\n    pointer-events: all;\n  }\n\n  @media only screen and (max-width: 900px) {\n    top: 55px;\n    right: 30px;\n    transform: none;\n    font-size: 1.5em;\n  }\n\n  & > a {\n    color: #9b51e0;\n    text-decoration: none;\n  }\n  @media only screen and (max-width: 900px) {\n    font-size: 1.5em;\n  }\n"])),dn),bn=Ie.c.div(Be||(Be=Object(c.a)(["\n  ","\n  bottom: 50px;\n  left: 50px;\n  transform: skew(-5deg, -5deg);\n  text-shadow: 1px 1px 1px rgba(0, 0, 0.5);\n\n  h1 {\n    margin: 0;\n    font-size: 4em;\n    line-height: 1em;\n  }\n  @media only screen and (max-width: 900px) {\n    left: 20px;\n    bottom: 140px;\n    h1 {\n      font-size: 3em !important;\n    }\n  }\n"])),dn),fn=Ie.c.div(Ee||(Ee=Object(c.a)(["\n  ","\n  bottom: 50px;\n  right: 50px;\n  transform: skew(5deg, 5deg);\n\n  * {\n    cursor: pointer;\n    pointer-events: all;\n  }\n\n  @media only screen and (max-width: 900px) {\n    transform: none;\n    bottom: 0;\n    right: 0;\n    width: 100%;\n  }\n"])),dn),xn=Object(Ie.a)(Ge||(Ge=Object(c.a)(["\n  * {\n    box-sizing: border-box;\n  }\n\n  html,\n  body,\n  #root {\n    width: 100%;\n    height: 100%;\n    margin: 0;\n    padding: 0;\n    user-select: none;\n    overflow: hidden;\n  }\n\n  #root {\n    overflow: auto;\n    padding: 0px;\n  }\n\n  body {\n    position: fixed;\n    overflow: hidden;\n    overscroll-behavior-y: none;\n    font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, ubuntu, roboto, noto, segoe ui, arial, sans-serif;\n    color: black;\n    background: white;\n  }\n"]))),gn=t.p+"static/media/rylos-logo.46173d62.png",On=t.p+"static/media/game-over.dea041e4.wav",yn=function(e){return Object(u.jsx)(vn,{children:Object(u.jsx)(Mn,{children:e.children})})},vn=Ie.c.div(Qe||(Qe=Object(c.a)(["\n  background-repeat: no-repeat;\n  background-position: center 10%;\n  background-color: #16161d;\n  display: flex;\n  width: 100%;\n  height: 100%;\n  align-items: center;\n  justify-content: center;\n  color: white;\n\n  * {\n    cursor: default;\n  }\n\n  a {\n    cursor: pointer;\n  }\n\n  h1 {\n    font-size: 6rem;\n    font-family: 'Sedgwick Ave';\n    text-transform: uppercase;\n    margin-bottom: 0;\n    margin-top: 0;\n    text-align: center;\n  }\n\n  div + p {\n    font-size: 2rem;\n    width: 1200px;\n    max-width: 100%;\n    text-align: center;\n    margin-bottom: 5rem;\n    margin-top: 0;\n  }\n\n  @media only screen and (max-width: 900px) {\n    h1 {\n      font-size: 2.5rem;\n    }\n\n    div + p {\n      font-size: 1.2rem;\n    }\n  }\n"]))),wn=Ie.c.button(Ze||(Ze=Object(c.a)(["\n  border: 3px solid orangered;\n  pointer-events: all;\n  background: linear-gradient(#4f0158, #000000);\n  cursor: pointer;\n  color: white;\n  font-weight: 900;\n  text-transform: uppercase;\n  font-size: 3rem;\n  font-family: 'Sedgwick Ave';\n  min-width: 300px;\n  padding: 0 2rem;\n  margin-top: 1rem;\n\n  @media only screen and (max-width: 900px) {\n    font-size: 2rem;\n  }\n"]))),Mn=Ie.c.div($e||($e=Object(c.a)(["\n  height: 100%;\n  min-width: 80vw;\n  max-width: 90vw;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  img {\n    max-width: 100%;\n  }\n"]))),kn=t.p+"static/media/award.8c76d1fb.svg";function Sn(){var e=te((function(e){return e.menu}));return"dead"===e?Object(u.jsx)(_n,{}):"game"===e?Object(u.jsx)(Rn,{}):"credits"===e?Object(u.jsx)(An,{}):Object(u.jsx)(Tn,{})}var _n=function(){var e=te((function(e){return e.highScore})),n=te((function(e){return e.lastPoints})),t=te((function(e){return e.actions.reset}));return Object(r.useEffect)((function(){var e=new Audio;return e.setAttribute("src",On),e.play(),function(){e.pause(),e.removeAttribute("src"),e.load()}})),Object(u.jsxs)(yn,{children:[Object(u.jsx)("audio",{autoPlay:!0,children:Object(u.jsx)("source",{src:On})}),Object(u.jsx)("h1",{children:"Game Over"}),Object(u.jsxs)(Bn,{children:[Object(u.jsxs)("p",{children:["Score: ",n]}),e>0&&Object(u.jsxs)("p",{children:["Highscore: ",e]}),n>0&&n===e&&Object(u.jsxs)(En,{children:[Object(u.jsx)("img",{src:kn}),Object(u.jsx)("p",{children:"New highscore!"})]})]}),Object(u.jsx)(wn,{onClick:t,children:"Restart"})]})},An=function(){var e=te((function(e){return e.actions}));return Object(u.jsxs)(yn,{children:[Object(u.jsx)(wn,{onClick:function(){return e.menu.start()},children:"Back"}),Object(u.jsxs)(Fn,{children:[Object(u.jsx)("h2",{children:"Credits"}),Object(u.jsx)("p",{children:Object(u.jsx)("a",{href:"https://github.com/jakke-korpelainen/rylos-space-adventure",children:"Source code"})}),Object(u.jsx)("h3",{children:"Programming"}),Object(u.jsx)("p",{children:Object(u.jsx)("a",{href:"https://jakke.fi",children:"Jakke Korpelainen"})}),Object(u.jsxs)("p",{children:["Based on tremendous work of ",Object(u.jsx)("a",{href:"https://github.com/drcmda",children:"drcmda"})]}),Object(u.jsx)("h3",{children:"Assets"}),Object(u.jsxs)("p",{children:["Ship: ",Object(u.jsx)("a",{href:"https://sketchfab.com/themuffincoder",children:"TheMuffinCoder"})]}),Object(u.jsxs)("p",{children:["Rocks: ",Object(u.jsx)("a",{href:"https://sketchfab.com/dzemalmclaren",children:"Dzemal Semanic"})]}),Object(u.jsxs)("p",{children:["Crash sound created by ",Object(u.jsx)("a",{href:"https://freesound.org/s/95078/",children:"sandyrb"})]}),Object(u.jsx)("h3",{children:"Music"}),Object(u.jsx)("p",{children:Object(u.jsx)("a",{href:"https://www.rylosplanet.fi/",children:"Rylos"})})]})]})},Rn=function(){var e=te((function(e){return e.mutation})).fov,n=te((function(e){return e.actions})),t=Object(r.useState)(!0),i=Object(s.a)(t,2),a=i[0],o=i[1];return Object(r.useEffect)((function(){return function(){J.pause(),K.pause()}}),[]),Object(u.jsxs)(Gn,{children:[Object(u.jsx)(In,{style:a?{}:{opacity:0,pointerEvents:"none"},children:Object(u.jsx)("h1",{children:"Loading..."})}),Object(u.jsxs)(zn,{onTouchMove:n.onTouchMove,onPointerUp:n.cancelAutofire,onPointerMove:n.move,onPointerDown:function(e){n.move(e),n.autofire(e)},children:[Object(u.jsxs)(d.a,{linear:!0,mode:"concurrent",dpr:[1,1.5],gl:{antialias:!1},camera:{position:[0,0,2e3],near:.01,far:1e4,fov:e},onCreated:function(e){var t=e.gl,r=e.camera;n.init(r),t.toneMapping=l.CineonToneMapping,t.setClearColor(new l.Color("#020209")),o(!1)},children:[Object(u.jsx)("fog",{attach:"fog",args:["#070710",100,700]}),Object(u.jsx)("ambientLight",{intensity:.2}),Object(u.jsx)(m,{}),Object(u.jsx)(se,{}),Object(u.jsx)(de,{}),Object(u.jsx)(re,{}),Object(u.jsxs)(r.Suspense,{fallback:null,children:[Object(u.jsx)(ae,{}),Object(u.jsx)(p,{}),Object(u.jsx)(ye,{children:Object(u.jsx)(ge,{})})]}),Object(u.jsx)(y,{})]}),Object(u.jsx)(Ye,{})]})]})},Tn=function(){var e=te((function(e){return e.actions}));return Object(u.jsxs)(yn,{children:[Object(u.jsx)("img",{src:gn}),Object(u.jsxs)(Cn,{children:[Object(u.jsxs)(Pn,{children:[Object(u.jsx)("span",{children:"S"}),Object(u.jsx)("span",{children:"p"}),Object(u.jsx)("span",{children:"a"}),Object(u.jsx)("span",{children:"c"}),Object(u.jsx)("span",{children:"e"})]}),Object(u.jsxs)(Pn,{children:[Object(u.jsx)("span",{children:"A"}),Object(u.jsx)("span",{children:"d"}),Object(u.jsx)("span",{children:"v"}),Object(u.jsx)("span",{children:"e"}),Object(u.jsx)("span",{children:"n"}),Object(u.jsx)("span",{children:"t"}),Object(u.jsx)("span",{children:"u"}),Object(u.jsx)("span",{children:"r"}),Object(u.jsx)("span",{children:"e"})]})]}),Object(u.jsx)("p",{children:"Humankind has been dumping trash in to the space for ages. Now the trash are returning to the earth. Only Ned the Carrot and his loyal spaceship can stop the earth from being trashed."}),Object(u.jsx)(wn,{onClick:function(){e.menu.game()},children:"Play"}),Object(u.jsx)(wn,{onClick:function(){e.menu.credits()},children:"Credits"})]})},zn=Ie.c.div(en||(en=Object(c.a)(["\n  height: 100%;\n"]))),Cn=Ie.c.div(nn||(nn=Object(c.a)(["\n  display: flex;\n  flex-direction: row;\n"]))),Pn=Ie.c.h1(tn||(tn=Object(c.a)(["\n  display: inline-block;\n\n  &:first-of-type {\n    margin-right: 2rem;\n  }\n\n  span {\n    text-shadow: 2px 2px 5px #9b51e0;\n    display: inline-block;\n    animation: wave-text 1s ease-in-out infinite;\n  }\n\n  span:nth-of-type(1) {\n    animation-delay: 0s;\n  }\n  span:nth-of-type(2) {\n    animation-delay: 0.1s;\n  }\n  span:nth-of-type(3) {\n    animation-delay: 0.2s;\n  }\n  span:nth-of-type(4) {\n    animation-delay: 0.3s;\n  }\n  span:nth-of-type(5) {\n    animation-delay: 0.4s;\n  }\n  span:nth-of-type(6) {\n    animation-delay: 0.5s;\n  }\n  span:nth-of-type(7) {\n    animation-delay: 0.6s;\n  }\n  span:nth-of-type(8) {\n    animation-delay: 0.7s;\n  }\n  span:nth-of-type(9) {\n    animation-delay: 0.8s;\n  }\n"]))),Bn=Ie.c.div(rn||(rn=Object(c.a)(["\n  > p {\n    font-size: 2rem;\n    text-align: center;\n    margin-bottom: 1rem;\n    margin-top: 0;\n  }\n\n  @media only screen and (max-width: 900px) {\n    p {\n      font-size: 1.2rem;\n    }\n  }\n"]))),En=Ie.c.div(an||(an=Object(c.a)(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  img {\n    max-width: 45px;\n    margin-right: 1rem;\n  }\n\n  p {\n    white-space: nowrap;\n    font-size: 2rem;\n    text-align: center;\n    color: goldenrod;\n  }\n"]))),Gn=Ie.c.div(on||(on=Object(c.a)([""]))),In=Ie.c.div(cn||(cn=Object(c.a)(["\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0.5);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 999;\n  transition: opacity linear 2s;\n\n  h1 {\n    font-size: 3rem;\n    color: white;\n  }\n"]))),Fn=Ie.c.div(sn||(sn=Object(c.a)(["\n  width: 100%;\n  margin-top: 2rem;\n\n  a {\n    color: white;\n  }\n"])));Object(Ie.b)(ln||(ln=Object(c.a)(["\n  font-family: 'Sedgwick Ave', sans-serif;\n  position: absolute;\n  text-transform: uppercase;\n  font-weight: 900;\n  font-variant-numeric: slashed-zero tabular-nums;\n  line-height: 1em;\n  pointer-events: none;\n  color: #9b51e0;\n"])));o.a.render(Object(u.jsx)(Sn,{}),document.getElementById("root"))}},[[58,1,2]]]);
//# sourceMappingURL=main.a257b351.chunk.js.map