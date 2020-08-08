export default function (part) {
  /*
   * Helper method to draw the inseam path
   */
  const drawInseam = () =>
    new Path().move(points.floorIn).curve(points.kneeInCp2, points.forkCp1, points.fork)
  /*
   * Helper method to draw the outseam path
   */
  const drawOutseam = (noPocketFlap = false) => {
    let waistOut = points.styleWaistOut || points.waistOut
    let outseam = new Path()
      .move(waistOut)
      .curve(points.seatOut, points.kneeOutCp1, points.floorOut)
    if (!options.frontPockets || noPocketFlap) return outseam
    else {
      // Split outseam at top and bottom, and inject pocket flap
      let split = outseam.split(points.pocketFlapTopIn)
      return split[0]
        .join(
          new Path()
            .move(points.pocketFlapTopIn)
            .line(points.pocketFlapTopOut)
            .line(points.pocketFlapBottomOut)
            .line(points.pocketFlapBottomIn)
        )
        .join(split[1].split(points.pocketFlapBottomIn)[1])
    }
  }

  /*
   * Helper method to draw the outline path
   */
  const drawPath = () => {
    let waistIn = points.styleWaistIn || points.waistIn
    let waistOut = points.styleWaistOut || points.waistOut
    return drawOutseam()
      .line(points.floorIn)
      .join(drawInseam())
      .curve(points.crotchSeamCurveCp1, points.crotchSeamCurveCp2, points.crotchSeamCurveStart)
      .line(waistIn)
      .line(waistOut)
      .close()
  }
  /*
   * Helper method to calculate the inseam delta
   */
  const inseamDelta = () => drawInseam().length() - store.get('pacoInseamBack')
  /*
   * Helper method to calculate the outseam delta
   */
  const outseamDelta = () => drawOutseam(true).length() - store.get('pacoOutseamBack')

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

  // Adapt bottom leg based on heel and heel ease
  let quarterHeel = (measurements.heel * (1 + options.heelEase) * (1 - options.legBalance)) / 2
  points.floorOut = points.floor.shift(180, quarterHeel)
  points.floorIn = points.floor.shift(0, quarterHeel)
  points.kneeOut = points.knee.shift(180, quarterHeel)
  points.kneeOutCp1 = points.kneeOut
  points.kneeIn = points.knee.shift(0, quarterHeel)
  points.kneeInCp2 = points.kneeIn

  // Shorter leg if we have an elasticated hem
  if (options.elasticatedHem) {
    for (const p of ['floor', 'floorIn', 'floorOut'])
      points[p] = points[p].shift(90, options.ankleElastic)
  }

  // Adapt waist so we can get these pants over our bum without a zipper
  let delta =
    (measurements.seat * (1 - options.legBalance)) / 2 -
    points.styleWaistIn.dist(points.styleWaistOut)
  let angle = points.styleWaistIn.angle(points.styleWaistOut)
  points.styleWaistOut = points.styleWaistOut.shift(angle, delta)
  points.seatOut = points.seatOut.shift(angle, delta)

  // Cut the top of our pants short to make room for the waistband/elastic
  points.styleWaistOut = drawOutseam(true).shiftAlong(options.waistElastic)
  points.styleWaistIn = points.styleWaistIn.shiftTowards(
    points.crotchSeamCurveStart,
    options.waistElastic
  )

  // Our style changes will have influenced the inseam & outseam a bit
  // but not enough to do a full slash & rotate. So let's just fix the
  // inseam, and then lengthen/shorten the outseam at the waist
  let dIn = inseamDelta()
  points.floor = points.floor.shift(90, dIn)
  points.floorIn = points.floorIn.shift(90, dIn)
  points.floorOut = points.floorOut.shift(90, dIn)
  points.styleWaistOut = points.floorOut.shiftOutwards(points.styleWaistOut, outseamDelta() * -1)

  // Add the (optional) front pocket extention
  if (options.frontPockets) {
    let outseam = drawOutseam(true)
    points.pocketFlapTopIn = outseam.shiftAlong(options.frontPocketFlapSize)
    points.pocketFlapBottomIn = outseam.shiftAlong(
      options.frontPocketFlapSize + measurements.heel * options.frontPocketHeelRatio
    )
    points.pocketFlapTopOut = points.pocketFlapTopIn
      .shiftTowards(points.pocketFlapBottomIn, options.frontPocketFlapSize)
      .rotate(-90, points.pocketFlapTopIn)
    points.pocketFlapBottomOut = points.pocketFlapBottomIn
      .shiftTowards(points.pocketFlapTopIn, options.frontPocketFlapSize)
      .rotate(90, points.pocketFlapBottomIn)
    points.pocketFlapBottomOut = points.pocketFlapTopOut.shiftOutwards(
      points.pocketFlapBottomOut,
      options.frontPocketFlapSize
    )

    points.flapTopLeft = points.pocketFlapTopOut.flipX(points.pocketFlapTopIn)
    points.flapBottomLeft = points.pocketFlapBottomOut.flipX(points.pocketFlapBottomIn)
    points.topLeft = utils.beamsIntersect(
      points.flapBottomLeft,
      points.flapTopLeft,
      points.styleWaistOut,
      points.styleWaistIn
    )
    points.topRight = points.topLeft.shiftFractionTowards(points.styleWaistIn, 0.6)
    points.bottomRight = points.topRight
      .shift(
        points.flapTopLeft.angle(points.flapBottomLeft),
        points.flapTopLeft.dist(points.flapBottomLeft) * 1.75
      )
      .rotate(5, points.topRight)
    points.bottom = new Point(
      points.flapBottomLeft.x + points.flapBottomLeft.dx(points.bottomRight) / 2,
      points.bottomRight.y
    )
    points.bottomCp1 = new Point(points.flapBottomLeft.x, points.bottom.y)
    points.bottomCp2 = utils.beamIntersectsY(points.topRight, points.bottomRight, points.bottom.y)
    paths.pocket = new Path()
      .move(points.topLeft)
      .line(points.flapBottomLeft)
      ._curve(points.bottomCp1, points.bottom)
      .line(points.bottomRight)
      .line(points.topRight)
      .line(points.topLeft)
      .close()
      .attr('class', 'lining')
  }

  // Now draw the outline
  paths.seam = drawPath()

  if (complete) {
    if (options.frontPockets) {
      paths.pocket = new Path()
        .move(points.topLeft)
        .line(points.flapBottomLeft)
        ._curve(points.bottomCp1, points.bottom)
        .line(points.bottomRight)
        .line(points.topRight)
        .line(points.topLeft)
        .close()
        .attr('class', 'lining dashed')
      paths.pocketFlap = new Path()
        .move(points.pocketFlapTopIn)
        .line(points.flapTopLeft)
        .move(points.pocketFlapBottomIn)
        .line(points.flapBottomLeft)
        .attr('class', 'fabric dashed')
      macro('sprinkle', {
        snippet: 'notch',
        on: ['flapTopLeft', 'flapBottomLeft', 'topLeft', 'topRight']
      })
    }
  }

  return part
}