# vue2-leaflet-slidemarker

- 1.0.0 this version is the vue2-leaflet-movingmarker update

## Install
```bashnp
npm install --save vue2-leaflet-slidemarker
```

## Demo

```bash
git clone https://github.com/pumelotea/vue2-leaflet-slidemarker.git
cd vue2-leaflet-slidemarker
yarn
yarn example

# or alternatively using npm
npm install
npm run example
```

Then you should be able to navigate with your browser and see the demo in http://localhost:4000/

You can see the demo code in the file example.vue

## Usage

### on &lt;template&gt; add

something like this
```html
<l-map :zoom=10 :center="initialLocation">
  <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
  <l-slide-marker
      v-for="driver in drivers"
      :key="driver.uuid"
      v-if="driver.location"
      :lat-lng="getLocation(driver)"
      :icon="getIcon(driver.uuid)"
      @click="setCurrentDriver(driver)"
      ref="driverMarker"
      :duration="2000"
  />
</l-map>
```
### on &lt;script&gt; add

#### option 1

In the same template file, at `<script>` part, this will make the component available only to the template in this file

```js
import LSlideMarker from 'vue2-leaflet-slidemarker'
...
export default {
  ...
  components: {
    LSlideMarker
    ...
  },
  ...
}
```
#### option 2

At main Vue configuration, this will make the component available to all templates in your app
```js
import Vue from 'vue'
import LSlideMarker from 'vue2-leaflet-slidemarker'
...
Vue.component('l-slide-marker', LSlideMarker)
```

## Access movingmarker layer directly

If you need to access other movingmarker methods, like [slideTo()](https://gitlab.com/movingmarker/Leaflet.Marker.SlideTo), you can do it with a ref on the movingmarker vue element and using the `mapObject` property

```html
...
<l-slide-marker ref="slideMarkerRef">
  ...
</l-slide-marker>
...
```
```js
...
this.$refs.movingSlideRef.mapObject.slideTo()
...
```



## License

MIT
