L.PositionFlex = L.Control.extend({
  initialize (options) {
    L.setOptions(this, options)
  },

  addControl (ctrl) {
    ctrl._map = this._map
    const ctrlContainer = ctrl.onAdd(this._map)
    this._container.appendChild(ctrlContainer)
  },

  removeControl (ctrl) {
    ctrl.remove()
  },

  onAdd (map) {
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

  _render () {
    return L.DomUtil.create('div', 'positionFlex')
  }
})

L.positionFlex = function (options) {
  return new L.PositionFlex(options)
}
