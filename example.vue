<template>
  <l-map ref="map" :zoom="14" :center="initialLocation"  :options="{zoomControl:false,editable: true}">
    <l-icon-default></l-icon-default>
    <l-tile-layer
      :url="mapData.url"
      :attribution="mapData.attribution"
    />
  </l-map>
</template>

<script>
  import L from 'leaflet'
  import { LMap, LTileLayer, LIconDefault, LPopup } from 'vue2-leaflet'
  import './Vue2LeafletEditablePlugin'

  function rand(n) {
    let max = n + 0.01
    let min = n - 0.01
    return Math.random() * (max - min) + min;
  }

  export default {
    components: {
      LMap,
      LTileLayer,
      LIconDefault,
      LPopup,
    },
    data () {
      let locations = []
      for (let i = 0; i < 10; i++) {
        locations.push({
          id: i,
          latlng: L.latLng(rand(48.8399515), rand(2.3927873)),
          text: 'Moving Marker #' + i
        })
      }
      let icon = L.icon({
          iconUrl: 'https://s3-eu-west-1.amazonaws.com/ct-documents/emails/A-static.png',
          iconSize: [21, 31],
          iconAnchor: [10.5, 31],
          popupAnchor: [4, -25]
        })
      return {
        locations,
        icon,
        initialLocation: L.latLng(48.8399515, 2.3927873),
        mapData: {
          attribution: `&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>`,
          url: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png'
        }
      }
    },
    mounted() {
        document.oncontextmenu = function(e){
            e.preventDefault();
        };
        let isEnd = true
        isEnd = false
        let map = this.$refs.map.mapObject
        let polygon = map.editTools.startPolygon()
        map.on('mouseup', function (e) {
            if (e.originalEvent.button === 2 && !isEnd ){
                map.editTools.stopDrawing()
                isEnd = true
                console.log(polygon.toGeoJSON())
            }
        })

    }
  }
</script>

<style>
  @import "~leaflet/dist/leaflet.css";
  html, body {
    height: 100%;
    margin: 0;
  }
</style>
