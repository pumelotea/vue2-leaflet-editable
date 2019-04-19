(function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.Vue2LeafletEditablePlugin=e():t.Vue2LeafletEditablePlugin=e()})(this,function(){return function(t){function e(n){if(i[n])return i[n].exports;var r=i[n]={i:n,l:!1,exports:{}};return t[n].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var i={};return e.m=t,e.c=i,e.i=function(t){return t},e.d=function(t,i,n){e.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/",e(e.s=1)}([function(t,e){(function(t){t.Editable=t.Evented.extend({statics:{FORWARD:1,BACKWARD:-1},options:{zIndex:1e3,polygonClass:t.Polygon,polylineClass:t.Polyline,markerClass:t.Marker,rectangleClass:t.Rectangle,circleClass:t.Circle,drawingCSSClass:"leaflet-editable-drawing",drawingCursor:"crosshair",editLayer:void 0,featuresLayer:void 0,polylineEditorClass:void 0,polygonEditorClass:void 0,markerEditorClass:void 0,rectangleEditorClass:void 0,circleEditorClass:void 0,lineGuideOptions:{},skipMiddleMarkers:!1},initialize:function(e,i){t.setOptions(this,i),this._lastZIndex=this.options.zIndex,this.map=e,this.editLayer=this.createEditLayer(),this.featuresLayer=this.createFeaturesLayer(),this.forwardLineGuide=this.createLineGuide(),this.backwardLineGuide=this.createLineGuide()},fireAndForward:function(t,e){e=e||{},e.editTools=this,this.fire(t,e),this.map.fire(t,e)},createLineGuide:function(){var e=t.extend({dashArray:"5,10",weight:1,interactive:!1},this.options.lineGuideOptions);return t.polyline([],e)},createVertexIcon:function(e){return t.Browser.mobile&&t.Browser.touch?new t.Editable.TouchVertexIcon(e):new t.Editable.VertexIcon(e)},createEditLayer:function(){return this.options.editLayer||(new t.LayerGroup).addTo(this.map)},createFeaturesLayer:function(){return this.options.featuresLayer||(new t.LayerGroup).addTo(this.map)},moveForwardLineGuide:function(t){this.forwardLineGuide._latlngs.length&&(this.forwardLineGuide._latlngs[1]=t,this.forwardLineGuide._bounds.extend(t),this.forwardLineGuide.redraw())},moveBackwardLineGuide:function(t){this.backwardLineGuide._latlngs.length&&(this.backwardLineGuide._latlngs[1]=t,this.backwardLineGuide._bounds.extend(t),this.backwardLineGuide.redraw())},anchorForwardLineGuide:function(t){this.forwardLineGuide._latlngs[0]=t,this.forwardLineGuide._bounds.extend(t),this.forwardLineGuide.redraw()},anchorBackwardLineGuide:function(t){this.backwardLineGuide._latlngs[0]=t,this.backwardLineGuide._bounds.extend(t),this.backwardLineGuide.redraw()},attachForwardLineGuide:function(){this.editLayer.addLayer(this.forwardLineGuide)},attachBackwardLineGuide:function(){this.editLayer.addLayer(this.backwardLineGuide)},detachForwardLineGuide:function(){this.forwardLineGuide.setLatLngs([]),this.editLayer.removeLayer(this.forwardLineGuide)},detachBackwardLineGuide:function(){this.backwardLineGuide.setLatLngs([]),this.editLayer.removeLayer(this.backwardLineGuide)},blockEvents:function(){this._oldTargets||(this._oldTargets=this.map._targets,this.map._targets={})},unblockEvents:function(){this._oldTargets&&(this.map._targets=t.extend(this.map._targets,this._oldTargets),delete this._oldTargets)},registerForDrawing:function(e){this._drawingEditor&&this.unregisterForDrawing(this._drawingEditor),this.blockEvents(),e.reset(),this._drawingEditor=e,this.map.on("mousemove touchmove",e.onDrawingMouseMove,e),this.map.on("mousedown",this.onMousedown,this),this.map.on("mouseup",this.onMouseup,this),t.DomUtil.addClass(this.map._container,this.options.drawingCSSClass),this.defaultMapCursor=this.map._container.style.cursor,this.map._container.style.cursor=this.options.drawingCursor},unregisterForDrawing:function(e){this.unblockEvents(),t.DomUtil.removeClass(this.map._container,this.options.drawingCSSClass),this.map._container.style.cursor=this.defaultMapCursor,(e=e||this._drawingEditor)&&(this.map.off("mousemove touchmove",e.onDrawingMouseMove,e),this.map.off("mousedown",this.onMousedown,this),this.map.off("mouseup",this.onMouseup,this),e===this._drawingEditor&&(delete this._drawingEditor,e._drawing&&e.cancelDrawing()))},onMousedown:function(t){1==t.originalEvent.which&&(this._mouseDown=t,this._drawingEditor.onDrawingMouseDown(t))},onMouseup:function(e){if(this._mouseDown){var i=this._drawingEditor,n=this._mouseDown;if(this._mouseDown=null,i.onDrawingMouseUp(e),this._drawingEditor!==i)return;var r=t.point(n.originalEvent.clientX,n.originalEvent.clientY),a=t.point(e.originalEvent.clientX,e.originalEvent.clientY).distanceTo(r);Math.abs(a)<9*(window.devicePixelRatio||1)&&this._drawingEditor.onDrawingClick(e)}},drawing:function(){return this._drawingEditor&&this._drawingEditor.drawing()},stopDrawing:function(){this.unregisterForDrawing()},commitDrawing:function(t){this._drawingEditor&&this._drawingEditor.commitDrawing(t)},connectCreatedToMap:function(t){return this.featuresLayer.addLayer(t)},startPolyline:function(t,e){var i=this.createPolyline([],e);return i.enableEdit(this.map).newShape(t),i},startPolygon:function(t,e){var i=this.createPolygon([],e);return i.enableEdit(this.map).newShape(t),i},startMarker:function(t,e){t=t||this.map.getCenter().clone();var i=this.createMarker(t,e);return i.enableEdit(this.map).startDrawing(),i},startRectangle:function(e,i){var n=e||t.latLng([0,0]),r=new t.LatLngBounds(n,n),a=this.createRectangle(r,i);return a.enableEdit(this.map).startDrawing(),a},startCircle:function(t,e){t=t||this.map.getCenter().clone();var i=this.createCircle(t,e);return i.enableEdit(this.map).startDrawing(),i},startHole:function(t,e){t.newHole(e)},createLayer:function(e,i,n){n=t.Util.extend({editOptions:{editTools:this}},n);var r=new e(i,n);return this.fireAndForward("editable:created",{layer:r}),r},createPolyline:function(t,e){return this.createLayer(e&&e.polylineClass||this.options.polylineClass,t,e)},createPolygon:function(t,e){return this.createLayer(e&&e.polygonClass||this.options.polygonClass,t,e)},createMarker:function(t,e){return this.createLayer(e&&e.markerClass||this.options.markerClass,t,e)},createRectangle:function(t,e){return this.createLayer(e&&e.rectangleClass||this.options.rectangleClass,t,e)},createCircle:function(t,e){return this.createLayer(e&&e.circleClass||this.options.circleClass,t,e)}}),t.extend(t.Editable,{makeCancellable:function(t){t.cancel=function(){t._cancelled=!0}}}),t.Map.mergeOptions({editToolsClass:t.Editable,editable:!1,editOptions:{}}),t.Map.addInitHook(function(){this.whenReady(function(){this.options.editable&&(this.editTools=new this.options.editToolsClass(this,this.options.editOptions))})}),t.Editable.VertexIcon=t.DivIcon.extend({options:{iconSize:new t.Point(8,8)}}),t.Editable.TouchVertexIcon=t.Editable.VertexIcon.extend({options:{iconSize:new t.Point(20,20)}}),t.Editable.VertexMarker=t.Marker.extend({options:{draggable:!0,className:"leaflet-div-icon leaflet-vertex-icon"},initialize:function(e,i,n,r){this.latlng=e,this.latlngs=i,this.editor=n,t.Marker.prototype.initialize.call(this,e,r),this.options.icon=this.editor.tools.createVertexIcon({className:this.options.className}),this.latlng.__vertex=this,this.editor.editLayer.addLayer(this),this.setZIndexOffset(n.tools._lastZIndex+1)},onAdd:function(e){t.Marker.prototype.onAdd.call(this,e),this.on("drag",this.onDrag),this.on("dragstart",this.onDragStart),this.on("dragend",this.onDragEnd),this.on("mouseup",this.onMouseup),this.on("click",this.onClick),this.on("contextmenu",this.onContextMenu),this.on("mousedown touchstart",this.onMouseDown),this.on("mouseover",this.onMouseOver),this.on("mouseout",this.onMouseOut),this.addMiddleMarkers()},onRemove:function(e){this.middleMarker&&this.middleMarker.delete(),delete this.latlng.__vertex,this.off("drag",this.onDrag),this.off("dragstart",this.onDragStart),this.off("dragend",this.onDragEnd),this.off("mouseup",this.onMouseup),this.off("click",this.onClick),this.off("contextmenu",this.onContextMenu),this.off("mousedown touchstart",this.onMouseDown),this.off("mouseover",this.onMouseOver),this.off("mouseout",this.onMouseOut),t.Marker.prototype.onRemove.call(this,e)},onDrag:function(e){e.vertex=this,this.editor.onVertexMarkerDrag(e);var i=t.DomUtil.getPosition(this._icon),n=this._map.layerPointToLatLng(i);this.latlng.update(n),this._latlng=this.latlng,this.editor.refresh(),this.middleMarker&&this.middleMarker.updateLatLng();var r=this.getNext();r&&r.middleMarker&&r.middleMarker.updateLatLng()},onDragStart:function(t){t.vertex=this,this.editor.onVertexMarkerDragStart(t)},onDragEnd:function(t){t.vertex=this,this.editor.onVertexMarkerDragEnd(t)},onClick:function(t){t.vertex=this,this.editor.onVertexMarkerClick(t)},onMouseup:function(e){t.DomEvent.stop(e),e.vertex=this,this.editor.map.fire("mouseup",e)},onContextMenu:function(t){t.vertex=this,this.editor.onVertexMarkerContextMenu(t)},onMouseDown:function(t){t.vertex=this,this.editor.onVertexMarkerMouseDown(t)},onMouseOver:function(t){t.vertex=this,this.editor.onVertexMarkerMouseOver(t)},onMouseOut:function(t){t.vertex=this,this.editor.onVertexMarkerMouseOut(t)},delete:function(){var t=this.getNext();this.latlngs.splice(this.getIndex(),1),this.editor.editLayer.removeLayer(this),this.editor.onVertexDeleted({latlng:this.latlng,vertex:this}),this.latlngs.length||this.editor.deleteShape(this.latlngs),t&&t.resetMiddleMarker(),this.editor.refresh()},getIndex:function(){return this.latlngs.indexOf(this.latlng)},getLastIndex:function(){return this.latlngs.length-1},getPrevious:function(){if(!(this.latlngs.length<2)){var t=this.getIndex(),e=t-1;0===t&&this.editor.CLOSED&&(e=this.getLastIndex());var i=this.latlngs[e];return i?i.__vertex:void 0}},getNext:function(){if(!(this.latlngs.length<2)){var t=this.getIndex(),e=t+1;t===this.getLastIndex()&&this.editor.CLOSED&&(e=0);var i=this.latlngs[e];return i?i.__vertex:void 0}},addMiddleMarker:function(t){this.editor.hasMiddleMarkers()&&(t=t||this.getPrevious())&&!this.middleMarker&&(this.middleMarker=this.editor.addMiddleMarker(t,this,this.latlngs,this.editor))},addMiddleMarkers:function(){if(this.editor.hasMiddleMarkers()){var t=this.getPrevious();t&&this.addMiddleMarker(t);var e=this.getNext();e&&e.resetMiddleMarker()}},resetMiddleMarker:function(){this.middleMarker&&this.middleMarker.delete(),this.addMiddleMarker()},split:function(){this.editor.splitShape&&this.editor.splitShape(this.latlngs,this.getIndex())},continue:function(){if(this.editor.continueBackward){var t=this.getIndex();0===t?this.editor.continueBackward(this.latlngs):t===this.getLastIndex()&&this.editor.continueForward(this.latlngs)}}}),t.Editable.mergeOptions({vertexMarkerClass:t.Editable.VertexMarker}),t.Editable.MiddleMarker=t.Marker.extend({options:{opacity:.5,className:"leaflet-div-icon leaflet-middle-icon",draggable:!0},initialize:function(e,i,n,r,a){this.left=e,this.right=i,this.editor=r,this.latlngs=n,t.Marker.prototype.initialize.call(this,this.computeLatLng(),a),this._opacity=this.options.opacity,this.options.icon=this.editor.tools.createVertexIcon({className:this.options.className}),this.editor.editLayer.addLayer(this),this.setVisibility()},setVisibility:function(){var e=this._map.latLngToContainerPoint(this.left.latlng),i=this._map.latLngToContainerPoint(this.right.latlng),n=t.point(this.options.icon.options.iconSize);e.distanceTo(i)<3*n.x?this.hide():this.show()},show:function(){this.setOpacity(this._opacity)},hide:function(){this.setOpacity(0)},updateLatLng:function(){this.setLatLng(this.computeLatLng()),this.setVisibility()},computeLatLng:function(){var t=this.editor.map.latLngToContainerPoint(this.left.latlng),e=this.editor.map.latLngToContainerPoint(this.right.latlng),i=(t.y+e.y)/2,n=(t.x+e.x)/2;return this.editor.map.containerPointToLatLng([n,i])},onAdd:function(e){t.Marker.prototype.onAdd.call(this,e),t.DomEvent.on(this._icon,"mousedown touchstart",this.onMouseDown,this),e.on("zoomend",this.setVisibility,this)},onRemove:function(e){delete this.right.middleMarker,t.DomEvent.off(this._icon,"mousedown touchstart",this.onMouseDown,this),e.off("zoomend",this.setVisibility,this),t.Marker.prototype.onRemove.call(this,e)},onMouseDown:function(e){var i=t.DomUtil.getPosition(this._icon);if(e={originalEvent:e,latlng:this.editor.map.layerPointToLatLng(i)},0!==this.options.opacity&&(t.Editable.makeCancellable(e),this.editor.onMiddleMarkerMouseDown(e),!e._cancelled)){this.latlngs.splice(this.index(),0,e.latlng),this.editor.refresh();var n=this._icon,r=this.editor.addVertexMarker(e.latlng,this.latlngs);this.editor.onNewVertex(r);var a=r._icon.parentNode;a.removeChild(r._icon),r._icon=n,a.appendChild(r._icon),r._initIcon(),r._initInteraction(),r.setOpacity(1),t.Draggable._dragging=!1,r.dragging._draggable._onDown(e.originalEvent),this.delete()}},delete:function(){this.editor.editLayer.removeLayer(this)},index:function(){return this.latlngs.indexOf(this.right.latlng)}}),t.Editable.mergeOptions({middleMarkerClass:t.Editable.MiddleMarker}),t.Editable.BaseEditor=t.Handler.extend({initialize:function(e,i,n){t.setOptions(this,n),this.map=e,this.feature=i,this.feature.editor=this,this.editLayer=new t.LayerGroup,this.tools=this.options.editTools||e.editTools},addHooks:function(){this.isConnected()?this.onFeatureAdd():this.feature.once("add",this.onFeatureAdd,this),this.onEnable(),this.feature.on(this._getEvents(),this)},removeHooks:function(){this.feature.off(this._getEvents(),this),this.feature.dragging&&this.feature.dragging.disable(),this.editLayer.clearLayers(),this.tools.editLayer.removeLayer(this.editLayer),this.onDisable(),this._drawing&&this.cancelDrawing()},drawing:function(){return!!this._drawing},reset:function(){},onFeatureAdd:function(){this.tools.editLayer.addLayer(this.editLayer),this.feature.dragging&&this.feature.dragging.enable()},hasMiddleMarkers:function(){return!this.options.skipMiddleMarkers&&!this.tools.options.skipMiddleMarkers},fireAndForward:function(t,e){e=e||{},e.layer=this.feature,this.feature.fire(t,e),this.tools.fireAndForward(t,e)},onEnable:function(){this.fireAndForward("editable:enable")},onDisable:function(){this.fireAndForward("editable:disable")},onEditing:function(){this.fireAndForward("editable:editing")},onStartDrawing:function(){this.fireAndForward("editable:drawing:start")},onEndDrawing:function(){this.fireAndForward("editable:drawing:end")},onCancelDrawing:function(){this.fireAndForward("editable:drawing:cancel")},onCommitDrawing:function(t){this.fireAndForward("editable:drawing:commit",t)},onDrawingMouseDown:function(t){this.fireAndForward("editable:drawing:mousedown",t)},onDrawingMouseUp:function(t){this.fireAndForward("editable:drawing:mouseup",t)},startDrawing:function(){this._drawing||(this._drawing=t.Editable.FORWARD),this.tools.registerForDrawing(this),this.onStartDrawing()},commitDrawing:function(t){this.onCommitDrawing(t),this.endDrawing()},cancelDrawing:function(){t.Draggable._dragging=!1,this.onCancelDrawing(),this.endDrawing()},endDrawing:function(){this._drawing=!1,this.tools.unregisterForDrawing(this),this.onEndDrawing()},onDrawingClick:function(e){this.drawing()&&(t.Editable.makeCancellable(e),this.fireAndForward("editable:drawing:click",e),e._cancelled||(this.isConnected()||this.connect(e),this.processDrawingClick(e)))},isConnected:function(){return this.map.hasLayer(this.feature)},connect:function(){this.tools.connectCreatedToMap(this.feature),this.tools.editLayer.addLayer(this.editLayer)},onMove:function(t){this.fireAndForward("editable:drawing:move",t)},onDrawingMouseMove:function(t){this.onMove(t)},_getEvents:function(){return{dragstart:this.onDragStart,drag:this.onDrag,dragend:this.onDragEnd,remove:this.disable}},onDragStart:function(t){this.onEditing(),this.fireAndForward("editable:dragstart",t)},onDrag:function(t){this.onMove(t),this.fireAndForward("editable:drag",t)},onDragEnd:function(t){this.fireAndForward("editable:dragend",t)}}),t.Editable.MarkerEditor=t.Editable.BaseEditor.extend({onDrawingMouseMove:function(e){t.Editable.BaseEditor.prototype.onDrawingMouseMove.call(this,e),this._drawing&&this.feature.setLatLng(e.latlng)},processDrawingClick:function(t){this.fireAndForward("editable:drawing:clicked",t),this.commitDrawing(t)},connect:function(e){e&&(this.feature._latlng=e.latlng),t.Editable.BaseEditor.prototype.connect.call(this,e)}}),t.Editable.PathEditor=t.Editable.BaseEditor.extend({CLOSED:!1,MIN_VERTEX:2,addHooks:function(){return t.Editable.BaseEditor.prototype.addHooks.call(this),this.feature&&this.initVertexMarkers(),this},initVertexMarkers:function(t){if(this.enabled())if(t=t||this.getLatLngs(),d(t))this.addVertexMarkers(t);else for(var e=0;e<t.length;e++)this.initVertexMarkers(t[e])},getLatLngs:function(){return this.feature.getLatLngs()},reset:function(){this.editLayer.clearLayers(),this.initVertexMarkers()},addVertexMarker:function(t,e){return new this.tools.options.vertexMarkerClass(t,e,this)},onNewVertex:function(t){this.fireAndForward("editable:vertex:new",{latlng:t.latlng,vertex:t})},addVertexMarkers:function(t){for(var e=0;e<t.length;e++)this.addVertexMarker(t[e],t)},refreshVertexMarkers:function(t){t=t||this.getDefaultLatLngs();for(var e=0;e<t.length;e++)t[e].__vertex.update()},addMiddleMarker:function(t,e,i){return new this.tools.options.middleMarkerClass(t,e,i,this)},onVertexMarkerClick:function(e){if(t.Editable.makeCancellable(e),this.fireAndForward("editable:vertex:click",e),!(e._cancelled||this.tools.drawing()&&this.tools._drawingEditor!==this)){var i,n=e.vertex.getIndex();e.originalEvent.ctrlKey?this.onVertexMarkerCtrlClick(e):e.originalEvent.altKey?this.onVertexMarkerAltClick(e):e.originalEvent.shiftKey?this.onVertexMarkerShiftClick(e):e.originalEvent.metaKey?this.onVertexMarkerMetaKeyClick(e):n===e.vertex.getLastIndex()&&this._drawing===t.Editable.FORWARD?n>=this.MIN_VERTEX-1&&(i=!0):0===n&&this._drawing===t.Editable.BACKWARD&&this._drawnLatLngs.length>=this.MIN_VERTEX?i=!0:0===n&&this._drawing===t.Editable.FORWARD&&this._drawnLatLngs.length>=this.MIN_VERTEX&&this.CLOSED?i=!0:this.onVertexRawMarkerClick(e),this.fireAndForward("editable:vertex:clicked",e),i&&this.commitDrawing(e)}},onVertexRawMarkerClick:function(t){this.fireAndForward("editable:vertex:rawclick",t),t._cancelled||this.vertexCanBeDeleted(t.vertex)&&t.vertex.delete()},vertexCanBeDeleted:function(t){return t.latlngs.length>this.MIN_VERTEX},onVertexDeleted:function(t){this.fireAndForward("editable:vertex:deleted",t)},onVertexMarkerCtrlClick:function(t){this.fireAndForward("editable:vertex:ctrlclick",t)},onVertexMarkerShiftClick:function(t){this.fireAndForward("editable:vertex:shiftclick",t)},onVertexMarkerMetaKeyClick:function(t){this.fireAndForward("editable:vertex:metakeyclick",t)},onVertexMarkerAltClick:function(t){this.fireAndForward("editable:vertex:altclick",t)},onVertexMarkerContextMenu:function(t){this.fireAndForward("editable:vertex:contextmenu",t)},onVertexMarkerMouseDown:function(t){this.fireAndForward("editable:vertex:mousedown",t)},onVertexMarkerMouseOver:function(t){this.fireAndForward("editable:vertex:mouseover",t)},onVertexMarkerMouseOut:function(t){this.fireAndForward("editable:vertex:mouseout",t)},onMiddleMarkerMouseDown:function(t){this.fireAndForward("editable:middlemarker:mousedown",t)},onVertexMarkerDrag:function(t){this.onMove(t),this.feature._bounds&&this.extendBounds(t),this.fireAndForward("editable:vertex:drag",t)},onVertexMarkerDragStart:function(t){this.fireAndForward("editable:vertex:dragstart",t)},onVertexMarkerDragEnd:function(t){this.fireAndForward("editable:vertex:dragend",t)},setDrawnLatLngs:function(t){this._drawnLatLngs=t||this.getDefaultLatLngs()},startDrawing:function(){this._drawnLatLngs||this.setDrawnLatLngs(),t.Editable.BaseEditor.prototype.startDrawing.call(this)},startDrawingForward:function(){this.startDrawing()},endDrawing:function(){this.tools.detachForwardLineGuide(),this.tools.detachBackwardLineGuide(),this._drawnLatLngs&&this._drawnLatLngs.length<this.MIN_VERTEX&&this.deleteShape(this._drawnLatLngs),t.Editable.BaseEditor.prototype.endDrawing.call(this),delete this._drawnLatLngs},addLatLng:function(e){this._drawing===t.Editable.FORWARD?this._drawnLatLngs.push(e):this._drawnLatLngs.unshift(e),this.feature._bounds.extend(e);var i=this.addVertexMarker(e,this._drawnLatLngs);this.onNewVertex(i),this.refresh()},newPointForward:function(t){this.addLatLng(t),this.tools.attachForwardLineGuide(),this.tools.anchorForwardLineGuide(t)},newPointBackward:function(t){this.addLatLng(t),this.tools.anchorBackwardLineGuide(t)},push:function(e){if(!e)return console.error("L.Editable.PathEditor.push expect a valid latlng as parameter");this._drawing===t.Editable.FORWARD?this.newPointForward(e):this.newPointBackward(e)},removeLatLng:function(t){t.__vertex.delete(),this.refresh()},pop:function(){if(!(this._drawnLatLngs.length<=1)){var e;return e=this._drawing===t.Editable.FORWARD?this._drawnLatLngs[this._drawnLatLngs.length-1]:this._drawnLatLngs[0],this.removeLatLng(e),this._drawing===t.Editable.FORWARD?this.tools.anchorForwardLineGuide(this._drawnLatLngs[this._drawnLatLngs.length-1]):this.tools.anchorForwardLineGuide(this._drawnLatLngs[0]),e}},processDrawingClick:function(e){e.vertex&&e.vertex.editor===this||(this._drawing===t.Editable.FORWARD?this.newPointForward(e.latlng):this.newPointBackward(e.latlng),this.fireAndForward("editable:drawing:clicked",e))},onDrawingMouseMove:function(e){t.Editable.BaseEditor.prototype.onDrawingMouseMove.call(this,e),this._drawing&&(this.tools.moveForwardLineGuide(e.latlng),this.tools.moveBackwardLineGuide(e.latlng))},refresh:function(){this.feature.redraw(),this.onEditing()},newShape:function(t){var e=this.addNewEmptyShape();e&&(this.setDrawnLatLngs(e[0]||e),this.startDrawingForward(),this.fireAndForward("editable:shape:new",{shape:e}),t&&this.newPointForward(t))},deleteShape:function(e,i){var n={shape:e};if(t.Editable.makeCancellable(n),this.fireAndForward("editable:shape:delete",n),!n._cancelled)return e=this._deleteShape(e,i),this.ensureNotFlat&&this.ensureNotFlat(),this.feature.setLatLngs(this.getLatLngs()),this.refresh(),this.reset(),this.fireAndForward("editable:shape:deleted",{shape:e}),e},_deleteShape:function(t,e){if(e=e||this.getLatLngs(),e.length){var i=this,n=function(t,e){return t.splice(t.indexOf(e),1),t.length||i._deleteShape(t),e};if(e===t)return function(t,e){return t.splice(0,Number.MAX_VALUE)}(e);for(var r=0;r<e.length;r++){if(e[r]===t)return n(e,t);if(-1!==e[r].indexOf(t))return n(e[r],t)}}},deleteShapeAt:function(t){var e=this.feature.shapeAt(t);if(e)return this.deleteShape(e)},appendShape:function(t){this.insertShape(t)},prependShape:function(t){this.insertShape(t,0)},insertShape:function(t,e){this.ensureMulti(),t=this.formatShape(t),void 0===e&&(e=this.feature._latlngs.length),this.feature._latlngs.splice(e,0,t),this.feature.redraw(),this._enabled&&this.reset()},extendBounds:function(t){this.feature._bounds.extend(t.vertex.latlng)},onDragStart:function(e){this.editLayer.clearLayers(),t.Editable.BaseEditor.prototype.onDragStart.call(this,e)},onDragEnd:function(e){this.initVertexMarkers(),t.Editable.BaseEditor.prototype.onDragEnd.call(this,e)}}),t.Editable.PolylineEditor=t.Editable.PathEditor.extend({startDrawingBackward:function(){this._drawing=t.Editable.BACKWARD,this.startDrawing()},continueBackward:function(t){this.drawing()||(t=t||this.getDefaultLatLngs(),this.setDrawnLatLngs(t),t.length>0&&(this.tools.attachBackwardLineGuide(),this.tools.anchorBackwardLineGuide(t[0])),this.startDrawingBackward())},continueForward:function(t){this.drawing()||(t=t||this.getDefaultLatLngs(),this.setDrawnLatLngs(t),t.length>0&&(this.tools.attachForwardLineGuide(),this.tools.anchorForwardLineGuide(t[t.length-1])),this.startDrawingForward())},getDefaultLatLngs:function(e){return e=e||this.feature._latlngs,!e.length||e[0]instanceof t.LatLng?e:this.getDefaultLatLngs(e[0])},ensureMulti:function(){this.feature._latlngs.length&&d(this.feature._latlngs)&&(this.feature._latlngs=[this.feature._latlngs])},addNewEmptyShape:function(){if(this.feature._latlngs.length){var t=[];return this.appendShape(t),t}return this.feature._latlngs},formatShape:function(t){return d(t)?t:t[0]?this.formatShape(t[0]):void 0},splitShape:function(e,i){if(i&&!(i>=e.length-1)){this.ensureMulti();var n=this.feature._latlngs.indexOf(e);if(-1!==n){var r=e.slice(0,i+1),a=e.slice(i);a[0]=t.latLng(a[0].lat,a[0].lng,a[0].alt),this.feature._latlngs.splice(n,1,r,a),this.refresh(),this.reset()}}}}),t.Editable.PolygonEditor=t.Editable.PathEditor.extend({CLOSED:!0,MIN_VERTEX:3,newPointForward:function(e){t.Editable.PathEditor.prototype.newPointForward.call(this,e),this.tools.backwardLineGuide._latlngs.length||this.tools.anchorBackwardLineGuide(e),2===this._drawnLatLngs.length&&this.tools.attachBackwardLineGuide()},addNewEmptyHole:function(t){this.ensureNotFlat();var e=this.feature.shapeAt(t);if(e){var i=[];return e.push(i),i}},newHole:function(t){var e=this.addNewEmptyHole(t);e&&(this.setDrawnLatLngs(e),this.startDrawingForward(),t&&this.newPointForward(t))},addNewEmptyShape:function(){if(this.feature._latlngs.length&&this.feature._latlngs[0].length){var t=[];return this.appendShape(t),t}return this.feature._latlngs},ensureMulti:function(){this.feature._latlngs.length&&d(this.feature._latlngs[0])&&(this.feature._latlngs=[this.feature._latlngs])},ensureNotFlat:function(){this.feature._latlngs.length&&!d(this.feature._latlngs)||(this.feature._latlngs=[this.feature._latlngs])},vertexCanBeDeleted:function(e){var i=this.feature.parentShape(e.latlngs);return t.Util.indexOf(i,e.latlngs)>0||t.Editable.PathEditor.prototype.vertexCanBeDeleted.call(this,e)},getDefaultLatLngs:function(){return this.feature._latlngs.length||this.feature._latlngs.push([]),this.feature._latlngs[0]},formatShape:function(t){return!d(t)||t[0]&&0===t[0].length?t:[t]}}),t.Editable.RectangleEditor=t.Editable.PathEditor.extend({CLOSED:!0,MIN_VERTEX:4,options:{skipMiddleMarkers:!0},extendBounds:function(e){var i=e.vertex.getIndex(),n=e.vertex.getNext(),r=e.vertex.getPrevious(),a=(i+2)%4,s=e.vertex.latlngs[a],o=new t.LatLngBounds(e.latlng,s);r.latlng.update([e.latlng.lat,s.lng]),n.latlng.update([s.lat,e.latlng.lng]),this.updateBounds(o),this.refreshVertexMarkers()},onDrawingMouseDown:function(e){t.Editable.PathEditor.prototype.onDrawingMouseDown.call(this,e),this.connect();var i=this.getDefaultLatLngs();3===i.length&&i.push(e.latlng);var n=new t.LatLngBounds(e.latlng,e.latlng);this.updateBounds(n),this.updateLatLngs(n),this.refresh(),this.reset(),e.originalEvent._simulated=!1,this.map.dragging._draggable._onUp(e.originalEvent),i[3].__vertex.dragging._draggable._onDown(e.originalEvent)},onDrawingMouseUp:function(e){this.commitDrawing(e),e.originalEvent._simulated=!1,t.Editable.PathEditor.prototype.onDrawingMouseUp.call(this,e)},onDrawingMouseMove:function(e){e.originalEvent._simulated=!1,t.Editable.PathEditor.prototype.onDrawingMouseMove.call(this,e)},getDefaultLatLngs:function(t){return t||this.feature._latlngs[0]},updateBounds:function(t){this.feature._bounds=t},updateLatLngs:function(t){for(var e=this.getDefaultLatLngs(),i=this.feature._boundsToLatLngs(t),n=0;n<e.length;n++)e[n].update(i[n])}}),t.Editable.CircleEditor=t.Editable.PathEditor.extend({MIN_VERTEX:2,options:{skipMiddleMarkers:!0},initialize:function(e,i,n){t.Editable.PathEditor.prototype.initialize.call(this,e,i,n),this._resizeLatLng=this.computeResizeLatLng()},computeResizeLatLng:function(){var t=(this.feature._radius||this.feature._mRadius)*Math.cos(Math.PI/4),e=this.map.project(this.feature._latlng);return this.map.unproject([e.x+t,e.y-t])},updateResizeLatLng:function(){this._resizeLatLng.update(this.computeResizeLatLng()),this._resizeLatLng.__vertex.update()},getLatLngs:function(){return[this.feature._latlng,this._resizeLatLng]},getDefaultLatLngs:function(){return this.getLatLngs()},onVertexMarkerDrag:function(e){1===e.vertex.getIndex()?this.resize(e):this.updateResizeLatLng(e),t.Editable.PathEditor.prototype.onVertexMarkerDrag.call(this,e)},resize:function(t){var e=this.feature._latlng.distanceTo(t.latlng);this.feature.setRadius(e)},onDrawingMouseDown:function(e){t.Editable.PathEditor.prototype.onDrawingMouseDown.call(this,e),this._resizeLatLng.update(e.latlng),this.feature._latlng.update(e.latlng),this.connect(),e.originalEvent._simulated=!1,this.map.dragging._draggable._onUp(e.originalEvent),this._resizeLatLng.__vertex.dragging._draggable._onDown(e.originalEvent)},onDrawingMouseUp:function(e){this.commitDrawing(e),e.originalEvent._simulated=!1,t.Editable.PathEditor.prototype.onDrawingMouseUp.call(this,e)},onDrawingMouseMove:function(e){e.originalEvent._simulated=!1,t.Editable.PathEditor.prototype.onDrawingMouseMove.call(this,e)},onDrag:function(e){t.Editable.PathEditor.prototype.onDrag.call(this,e),this.feature.dragging.updateLatLng(this._resizeLatLng)}});var e={createEditor:function(t){t=t||this._map;var e=(this.options.editOptions||{}).editTools||t.editTools;if(!e)throw Error("Unable to detect Editable instance.");return new(this.options.editorClass||this.getEditorClass(e))(t,this,this.options.editOptions)},enableEdit:function(t){return this.editor||this.createEditor(t),this.editor.enable(),this.editor},editEnabled:function(){return this.editor&&this.editor.enabled()},disableEdit:function(){this.editor&&(this.editor.disable(),delete this.editor)},toggleEdit:function(){this.editEnabled()?this.disableEdit():this.enableEdit()},_onEditableAdd:function(){this.editor&&this.enableEdit()}},i={getEditorClass:function(e){return e&&e.options.polylineEditorClass?e.options.polylineEditorClass:t.Editable.PolylineEditor},shapeAt:function(t,e){var i=null;if(e=e||this._latlngs,!e.length)return i;if(d(e)&&this.isInLatLngs(t,e))i=e;else for(var n=0;n<e.length;n++)if(this.isInLatLngs(t,e[n]))return e[n];return i},isInLatLngs:function(e,i){if(!i)return!1;var n,r,a,s,o=[],d=this._clickTolerance();if(this._projectLatlngs(i,o,this._pxBounds),o=o[0],s=this._map.latLngToLayerPoint(e),!this._pxBounds.contains(s))return!1;for(n=1,a=o.length,r=0;n<a;r=n++)if(t.LineUtil.pointToSegmentDistance(s,o[r],o[n])<=d)return!0;return!1}},n={getEditorClass:function(e){return e&&e.options.polygonEditorClass?e.options.polygonEditorClass:t.Editable.PolygonEditor},shapeAt:function(t,e){var i=null;if(e=e||this._latlngs,!e.length)return i;if(d(e)&&this.isInLatLngs(t,e))i=e;else if(d(e[0])&&this.isInLatLngs(t,e[0]))i=e;else for(var n=0;n<e.length;n++)if(this.isInLatLngs(t,e[n][0]))return e[n];return i},isInLatLngs:function(t,e){var i,n,r,a,s,o=!1;for(r=0,s=e.length,a=s-1;r<s;a=r++)i=e[r],n=e[a],i.lat>t.lat!=n.lat>t.lat&&t.lng<(n.lng-i.lng)*(t.lat-i.lat)/(n.lat-i.lat)+i.lng&&(o=!o);return o},parentShape:function(e,i){if(i=i||this._latlngs){var n=t.Util.indexOf(i,e);if(-1!==n)return i;for(var r=0;r<i.length;r++)if(-1!==(n=t.Util.indexOf(i[r],e)))return i[r]}}},r={getEditorClass:function(e){return e&&e.options.markerEditorClass?e.options.markerEditorClass:t.Editable.MarkerEditor}},a={getEditorClass:function(e){return e&&e.options.rectangleEditorClass?e.options.rectangleEditorClass:t.Editable.RectangleEditor}},s={getEditorClass:function(e){return e&&e.options.circleEditorClass?e.options.circleEditorClass:t.Editable.CircleEditor}},o=function(){this.on("add",this._onEditableAdd)},d=t.LineUtil.isFlat||t.LineUtil._flat||t.Polyline._flat;t.Polyline&&(t.Polyline.include(e),t.Polyline.include(i),t.Polyline.addInitHook(o)),t.Polygon&&(t.Polygon.include(e),t.Polygon.include(n)),t.Marker&&(t.Marker.include(e),t.Marker.include(r),t.Marker.addInitHook(o)),t.Rectangle&&(t.Rectangle.include(e),t.Rectangle.include(a)),t.Circle&&(t.Circle.include(e),t.Circle.include(s)),t.LatLng.prototype.update=function(e){e=t.latLng(e),this.lat=e.lat,this.lng=e.lng}})(window.L)},function(t,e,i){t.exports=i(0)}])});
//# sourceMappingURL=Vue2LeafletEditablePlugin.js.map