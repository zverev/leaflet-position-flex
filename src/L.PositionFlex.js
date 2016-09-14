L.PositionFlex = L.Control.extend({
  options: {
    position: 'middle'
  },

  initialize (options) {
    L.setOptions(this, options)
  },

  addControl (ctrl) {
    ctrl._map = this._map
    const pos = ctrl.options.position
    const controlCorner = this._controlCorners[pos]
    if (!this._container) {
      throw `control is not rendered yet`
    }
    if (!controlCorner) {
      throw `control position '${pos}' is not supported`
    }
    const ctrlContainer = ctrl.onAdd(this._map)
    controlCorner.appendChild(ctrlContainer)
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
      this._render()
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
    this._controlCorners = {}
    this._container = L.DomUtil.create('div', 'positionFlex')
    this._controlCorners['start'] = L.DomUtil.create('div', 'positionFlex-positionStart', this._container)
    this._controlCorners['middle'] = L.DomUtil.create('div', 'positionFlex-positionMiddle', this._container)
    this._controlCorners['end'] = L.DomUtil.create('div', 'positionFlex-positionEnd', this._container)
  }
})

L.positionFlex = function (options) {
  return new L.PositionFlex(options)
}
