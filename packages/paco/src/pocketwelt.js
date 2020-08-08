export default function (part) {
  let {
    utils,
    store,
    sa,
    Point,
    points,
    Path,
    paths,
    Snippet,
    snippets,
    options,
    measurements,
    complete,
    paperless,
    macro
  } = part.shorthand()

  // Don't bother of we're not drafting back pockets
  if (!options.backPockets) {
    part.render = false
    return part
  }

  // Clean up
  for (const path in paths) delete paths[path]
  for (const snippet in snippets) delete snippets[snippet]

  let welt = points.pocketLeft.dist(points.pocketRight) * options.weltFactor
  points.topLeft = new Point(points.pocketBagWaistLeft.x, points.pocketLeft.y)
  points.topRight = new Point(points.pocketBagWaistRight.x, points.topLeft.y)
  points.bottomLeft = points.topLeft.shift(-90, welt * 2)
  points.bottomRight = points.topRight.shift(-90, welt * 2)

  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .attr('class', 'lining')

  if (complete) {
    points.title = points.topLeft.shiftFractionTowards(points.bottomRight, 0.4)
    macro('title', {
      at: points.title,
      nr: 5,
      title: 'pocketWelt'
    })
    macro('grainline', {
      from: points.topLeft.shift(0, 15),
      to: points.bottomLeft.shift(0, 15)
    })
    macro('sprinkle', {
      snippet: 'bnotch',
      on: ['pocketLeft', 'pocketRight', 'pocketBagWaistLeft', 'pocketBagWaistRight']
    })
  }

  return part
}