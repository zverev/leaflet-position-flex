L.PositionFlex = L.Control.extend({
  options: {
    position: 'middle'
  },

  initialize (options) {
    L.setOptions(this, options)
  },

  addControl (ctrl) {
    ctrl._map = this._map
    const ctrlContainer = ctrl.onAdd(this._map)
    this._container.appendChild(ctrlContainer)
  },

  removeControl (ctrl) {
    ctrl.onRemove()
  },

  onAdd (map) {
    if (!map.getMap) {
      // adding to leaflet map
      this._createOwnControlCorner(map)
    }

    if (!this._container) {
      this._container = this._render()
    }
    return this._container
  },

  onRemove (map) {

  },

  getMap () {
    return this._map
  },

  _createOwnControlCorner (lMap) {
    this._controlCornerEl = L.DomUtil.create('div', 'positionFlex-lMapControlCorner', lMap._controlContainer)
    L.DomUtil.addClass(this._controlCornerEl, 'leaflet-top leaflet-bottom leaflet-left leaflet-right')
    lMap._controlCorners[this.options.position] = this._controlCornerEl
  },

  _render () {
    return L.DomUtil.create('div', 'positionFlex')
  }
})

L.positionFlex = function (options) {
  return new L.PositionFlex(options)
}
