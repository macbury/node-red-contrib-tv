![preview](https://raw.githubusercontent.com/macbury/node-red-contrib-tv/master/docs/dashboard.gif)

# node-red-contrib-tv

[![npm version](https://badge.fury.io/js/node-red-contrib-tv.svg)](https://badge.fury.io/js/node-red-contrib-tv)

Create nice dynamic dashboards ready to display on big tv screen. Inspired by [smashing](https://smashing.github.io/). Just install this pallete, add widget first and just visit your `node-red` server at `/tv` path and enjoy the view.  

## See it in action:

[![Watch the video](https://img.youtube.com/vi/mTykQGRdKS4/hqdefault.jpg)](https://youtu.be/mTykQGRdKS4)

## Inspiration

I wanted an easy way to display some data on my tv. The default [node-red-dashboard](https://flows.nodered.org/node/node-red-dashboard) was ugly for my standards and I loved the look and feel of the [smashing](https://smashing.github.io/) dashboard. In the first attempt node red was used for collecting data, and pushing it to separate instance of [smashing dashboard](https://smashing.github.io/) but adding new widgets, and making changes required editing code. So I decided to backport logic and few widgets to be `node-red` 

## Building and running on localhost

First install dependencies:

```sh
yarn
```

To run in hot module reloading mode:

```sh
yarn dev
```

This will start node red instance with installed pallete. Every change in `nodes/` or `backend/` directory will restart node red server.

## Publish

```
npm publish
```

## Running

Open the file `http://127.0.0.1:1880/tv` in your browser

## TODO

* [ ] Bring guage widget
* [ ] Bring list widget
* [ ] Bring iframe widget
* [ ] Bring image widget

## Credits

Made with [createapp.dev](https://createapp.dev/)

## Style

* [material colors](https://www.materialui.co/colors)
* [smashing styles](https://smashing.github.io/)
* [font-awesome](https://fontawesome.com/icons?d=gallery)

## Tech stack

* [node-red](https://www.npmjs.com/package/node-red)
* [react](https://reactjs.org/)
* [parcel bundler](https://parceljs.org/)

## References

* https://github.com/strml/react-grid-layout#installation
* https://nodered.org/docs/creating-nodes/first-node
* https://nodered.org/docs/creating-nodes/config-nodes
* https://github.com/futurice/chilipie-kiosk