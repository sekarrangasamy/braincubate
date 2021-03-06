/*
 Highcharts JS v7.0.2 (2019-01-17)

 (c) 2009-2019 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(f) { "object" === typeof module && module.exports ? (f["default"] = f, module.exports = f) : "function" === typeof define && define.amd ? define(function() { return f }) : f("undefined" !== typeof Highcharts ? Highcharts : void 0) })(function(f) {
	(function(b) {
		var f = b.addEvent, l = b.Axis, q = b.Chart, k = b.color, p, r = b.extend, n = b.isNumber, c = b.Legend, g = b.LegendSymbolMixin, v = b.noop, u = b.merge, t = b.pick; b.ColorAxis || (p = b.ColorAxis = function() { this.init.apply(this, arguments) }, r(p.prototype, l.prototype), r(p.prototype, {
			defaultColorAxisOptions: {
				lineWidth: 0,
				minPadding: 0, maxPadding: 0, gridLineWidth: 1, tickPixelInterval: 72, startOnTick: !0, endOnTick: !0, offset: 0, marker: { animation: { duration: 50 }, width: .01, color: "#999999" }, labels: { overflow: "justify", rotation: 0 }, minColor: "#e6ebf5", maxColor: "#003399", tickLength: 5, showInLegend: !0
			}, keepProps: ["legendGroup", "legendItemHeight", "legendItemWidth", "legendItem", "legendSymbol"].concat(l.prototype.keepProps), init: function(a, d) {
				var e = "vertical" !== a.options.legend.layout, h; this.coll = "colorAxis"; h = u(this.defaultColorAxisOptions,
					{ side: e ? 2 : 1, reversed: !e }, d, { opposite: !e, showEmpty: !1, title: null, visible: a.options.legend.enabled }); l.prototype.init.call(this, a, h); d.dataClasses && this.initDataClasses(d); this.initStops(); this.horiz = e; this.zoomEnabled = !1; this.defaultLegendLength = 200
			}, initDataClasses: function(a) {
				var d = this.chart, e, h = 0, m = d.options.chart.colorCount, b = this.options, c = a.dataClasses.length; this.dataClasses = e = []; this.legendItems = []; a.dataClasses.forEach(function(a, g) {
					a = u(a); e.push(a); if (d.styledMode || !a.color) "category" ===
						b.dataClassColor ? (d.styledMode || (g = d.options.colors, m = g.length, a.color = g[h]), a.colorIndex = h, h++ , h === m && (h = 0)) : a.color = k(b.minColor).tweenTo(k(b.maxColor), 2 > c ? .5 : g / (c - 1))
				})
			}, setTickPositions: function() { if (!this.dataClasses) return l.prototype.setTickPositions.call(this) }, initStops: function() { this.stops = this.options.stops || [[0, this.options.minColor], [1, this.options.maxColor]]; this.stops.forEach(function(a) { a.color = k(a[1]) }) }, setOptions: function(a) {
				l.prototype.setOptions.call(this, a); this.options.crosshair =
					this.options.marker
			}, setAxisSize: function() { var a = this.legendSymbol, d = this.chart, e = d.options.legend || {}, h, m; a ? (this.left = e = a.attr("x"), this.top = h = a.attr("y"), this.width = m = a.attr("width"), this.height = a = a.attr("height"), this.right = d.chartWidth - e - m, this.bottom = d.chartHeight - h - a, this.len = this.horiz ? m : a, this.pos = this.horiz ? e : h) : this.len = (this.horiz ? e.symbolWidth : e.symbolHeight) || this.defaultLegendLength }, normalizedValue: function(a) {
				this.isLog && (a = this.val2lin(a)); return 1 - (this.max - a) / (this.max - this.min ||
					1)
			}, toColor: function(a, d) { var e = this.stops, h, m, b = this.dataClasses, g, c; if (b) for (c = b.length; c--;) { if (g = b[c], h = g.from, e = g.to, (void 0 === h || a >= h) && (void 0 === e || a <= e)) { m = g.color; d && (d.dataClass = c, d.colorIndex = g.colorIndex); break } } else { a = this.normalizedValue(a); for (c = e.length; c-- && !(a > e[c][0]);); h = e[c] || e[c + 1]; e = e[c + 1] || h; a = 1 - (e[0] - a) / (e[0] - h[0] || 1); m = h.color.tweenTo(e.color, a) } return m }, getOffset: function() {
				var a = this.legendGroup, d = this.chart.axisOffset[this.side]; a && (this.axisParent = a, l.prototype.getOffset.call(this),
					this.added || (this.added = !0, this.labelLeft = 0, this.labelRight = this.width), this.chart.axisOffset[this.side] = d)
			}, setLegendColor: function() { var a, d = this.reversed; a = d ? 1 : 0; d = d ? 0 : 1; a = this.horiz ? [a, 0, d, 0] : [0, d, 0, a]; this.legendColor = { linearGradient: { x1: a[0], y1: a[1], x2: a[2], y2: a[3] }, stops: this.stops } }, drawLegendSymbol: function(a, d) {
				var e = a.padding, h = a.options, c = this.horiz, b = t(h.symbolWidth, c ? this.defaultLegendLength : 12), g = t(h.symbolHeight, c ? 12 : this.defaultLegendLength), k = t(h.labelPadding, c ? 16 : 30), h = t(h.itemDistance,
					10); this.setLegendColor(); d.legendSymbol = this.chart.renderer.rect(0, a.baseline - 11, b, g).attr({ zIndex: 1 }).add(d.legendGroup); this.legendItemWidth = b + e + (c ? h : k); this.legendItemHeight = g + e + (c ? k : 0)
			}, setState: function(a) { this.series.forEach(function(d) { d.setState(a) }) }, visible: !0, setVisible: v, getSeriesExtremes: function() {
				var a = this.series, d = a.length; this.dataMin = Infinity; for (this.dataMax = -Infinity; d--;)a[d].getExtremes(), void 0 !== a[d].valueMin && (this.dataMin = Math.min(this.dataMin, a[d].valueMin), this.dataMax =
					Math.max(this.dataMax, a[d].valueMax))
			}, drawCrosshair: function(a, d) { var e = d && d.plotX, c = d && d.plotY, b, g = this.pos, k = this.len; d && (b = this.toPixels(d[d.series.colorKey]), b < g ? b = g - 2 : b > g + k && (b = g + k + 2), d.plotX = b, d.plotY = this.len - b, l.prototype.drawCrosshair.call(this, a, d), d.plotX = e, d.plotY = c, this.cross && !this.cross.addedToColorAxis && this.legendGroup && (this.cross.addClass("highcharts-coloraxis-marker").add(this.legendGroup), this.cross.addedToColorAxis = !0, this.chart.styledMode || this.cross.attr({ fill: this.crosshair.color }))) },
			getPlotLinePath: function(a, d, e, b, c) { return n(c) ? this.horiz ? ["M", c - 4, this.top - 6, "L", c + 4, this.top - 6, c, this.top, "Z"] : ["M", this.left, c, "L", this.left - 6, c + 6, this.left - 6, c - 6, "Z"] : l.prototype.getPlotLinePath.call(this, a, d, e, b) }, update: function(a, d) {
				var e = this.chart, c = e.legend; this.series.forEach(function(a) { a.isDirtyData = !0 }); a.dataClasses && c.allItems && (c.allItems.forEach(function(a) { a.isDataClass && a.legendGroup && a.legendGroup.destroy() }), e.isDirtyLegend = !0); e.options[this.coll] = u(this.userOptions, a); l.prototype.update.call(this,
					a, d); this.legendItem && (this.setLegendColor(), c.colorizeItem(this, !0))
			}, remove: function() { this.legendItem && this.chart.legend.destroyItem(this); l.prototype.remove.call(this) }, getDataClassLegendSymbols: function() {
				var a = this, d = this.chart, c = this.legendItems, h = d.options.legend, k = h.valueDecimals, p = h.valueSuffix || "", f; c.length || this.dataClasses.forEach(function(e, h) {
					var l = !0, m = e.from, n = e.to; f = ""; void 0 === m ? f = "\x3c " : void 0 === n && (f = "\x3e "); void 0 !== m && (f += b.numberFormat(m, k) + p); void 0 !== m && void 0 !== n && (f +=
						" - "); void 0 !== n && (f += b.numberFormat(n, k) + p); c.push(r({ chart: d, name: f, options: {}, drawLegendSymbol: g.drawRectangle, visible: !0, setState: v, isDataClass: !0, setVisible: function() { l = this.visible = !l; a.series.forEach(function(a) { a.points.forEach(function(a) { a.dataClass === h && a.setVisible(l) }) }); d.legend.colorizeItem(this, l) } }, e))
				}); return c
			}, name: ""
		}), ["fill", "stroke"].forEach(function(a) { b.Fx.prototype[a + "Setter"] = function() { this.elem.attr(a, k(this.start).tweenTo(k(this.end), this.pos), null, !0) } }), f(q, "afterGetAxes",
			function() { var a = this.options.colorAxis; this.colorAxis = []; a && new p(this, a) }), f(c, "afterGetAllItems", function(a) { var d = [], c = this.chart.colorAxis[0]; c && c.options && c.options.showInLegend && (c.options.dataClasses ? d = c.getDataClassLegendSymbols() : d.push(c), c.series.forEach(function(c) { b.erase(a.allItems, c) })); for (c = d.length; c--;)a.allItems.unshift(d[c]) }), f(c, "afterColorizeItem", function(a) { a.visible && a.item.legendColor && a.item.legendSymbol.attr({ fill: a.item.legendColor }) }), f(c, "afterUpdate", function(a,
				c, b) { this.chart.colorAxis[0] && this.chart.colorAxis[0].update({}, b) }))
	})(f); (function(b) {
		var f = b.defined, l = b.noop, q = b.seriesTypes; b.colorPointMixin = { isValid: function() { return null !== this.value && Infinity !== this.value && -Infinity !== this.value }, setVisible: function(b) { var k = this, f = b ? "show" : "hide"; k.visible = !!b;["graphic", "dataLabel"].forEach(function(b) { if (k[b]) k[b][f]() }) }, setState: function(k) { b.Point.prototype.setState.call(this, k); this.graphic && this.graphic.attr({ zIndex: "hover" === k ? 1 : 0 }) } }; b.colorSeriesMixin =
			{
				pointArrayMap: ["value"], axisTypes: ["xAxis", "yAxis", "colorAxis"], optionalAxis: "colorAxis", trackerGroups: ["group", "markerGroup", "dataLabelsGroup"], getSymbol: l, parallelArrays: ["x", "y", "value"], colorKey: "value", pointAttribs: q.column.prototype.pointAttribs, translateColors: function() { var b = this, f = this.options.nullColor, l = this.colorAxis, n = this.colorKey; this.data.forEach(function(c) { var g = c[n]; if (g = c.options.color || (c.isNull ? f : l && void 0 !== g ? l.toColor(g, c) : c.color || b.color)) c.color = g }) }, colorAttribs: function(b) {
					var k =
						{}; f(b.color) && (k[this.colorProp || "fill"] = b.color); return k
				}
			}
	})(f); (function(b) {
		var f = b.colorPointMixin, l = b.merge, q = b.noop, k = b.pick, p = b.Series, r = b.seriesType, n = b.seriesTypes; r("heatmap", "scatter", { animation: !1, borderWidth: 0, nullColor: "#f7f7f7", dataLabels: { formatter: function() { return this.point.value }, inside: !0, verticalAlign: "middle", crop: !1, overflow: !1, padding: 0 }, marker: null, pointRange: null, tooltip: { pointFormat: "{point.x}, {point.y}: {point.value}\x3cbr/\x3e" }, states: { hover: { halo: !1, brightness: .2 } } },
			l(b.colorSeriesMixin, {
				pointArrayMap: ["y", "value"], hasPointSpecificOptions: !0, getExtremesFromAll: !0, directTouch: !0, init: function() { var c; n.scatter.prototype.init.apply(this, arguments); c = this.options; c.pointRange = k(c.pointRange, c.colsize || 1); this.yAxis.axisPointRange = c.rowsize || 1 }, translate: function() {
					var c = this.options, b = this.xAxis, f = this.yAxis, l = c.pointPadding || 0, n = function(a, c, b) { return Math.min(Math.max(c, a), b) }, a = this.pointPlacementToXValue(); this.generatePoints(); this.points.forEach(function(d) {
						var e =
							(c.colsize || 1) / 2, g = (c.rowsize || 1) / 2, m = n(Math.round(b.len - b.translate(d.x - e, 0, 1, 0, 1, -a)), -b.len, 2 * b.len), e = n(Math.round(b.len - b.translate(d.x + e, 0, 1, 0, 1, -a)), -b.len, 2 * b.len), p = n(Math.round(f.translate(d.y - g, 0, 1, 0, 1)), -f.len, 2 * f.len), g = n(Math.round(f.translate(d.y + g, 0, 1, 0, 1)), -f.len, 2 * f.len), q = k(d.pointPadding, l); d.plotX = d.clientX = (m + e) / 2; d.plotY = (p + g) / 2; d.shapeType = "rect"; d.shapeArgs = { x: Math.min(m, e) + q, y: Math.min(p, g) + q, width: Math.abs(e - m) - 2 * q, height: Math.abs(g - p) - 2 * q }
					}); this.translateColors()
				}, drawPoints: function() {
					var c =
						this.chart.styledMode ? "css" : "attr"; n.column.prototype.drawPoints.call(this); this.points.forEach(function(b) { b.graphic[c](this.colorAttribs(b)) }, this)
				}, animate: q, getBox: q, drawLegendSymbol: b.LegendSymbolMixin.drawRectangle, alignDataLabel: n.column.prototype.alignDataLabel, getExtremes: function() { p.prototype.getExtremes.call(this, this.valueData); this.valueMin = this.dataMin; this.valueMax = this.dataMax; p.prototype.getExtremes.call(this) }
			}), b.extend({
				haloPath: function(c) {
					if (!c) return []; var b = this.shapeArgs;
					return ["M", b.x - c, b.y - c, "L", b.x - c, b.y + b.height + c, b.x + b.width + c, b.y + b.height + c, b.x + b.width + c, b.y - c, "Z"]
				}
			}, f))
	})(f)
});
	//# sourceMappingURL=heatmap.js.map