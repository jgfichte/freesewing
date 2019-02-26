import dimensions from "./shared";

export default function(part) {
  let { macro, Point, Path, points, paths, complete, paperless, snippets, Snippet, sa } = part.shorthand();

  // Extract seamline from sleeve
  delete paths.ts;
  paths.seam = paths.us
    .clone()
    .attr("class", "fabric", true);
  delete paths.us;

  // Complete?
  if (complete) {
    snippets.logo = new Snippet("logo", points.elbowCenter);
    macro("title", {
      at: points.armCenter,
      nr: 4,
      title: "undersleeve"
    });

    if (sa) {
      paths.sa = paths.seam.clone();
      // Remove hem
      paths.sa.ops.splice(-2);
      paths.sa = paths.sa
        .offset(sa)
        .join(new Path()
          .move(points.usWristLeft)
          .line(points.usWristRight)
          .offset(sa * 3)
        )
        .close()
        .attr("class", "fabric sa");
    }

  }

  // Paperless?
  if (paperless) {
    dimensions(part, "us");
    macro("hd", {
      from: points.usLeftEdge,
      to: points.usTip,
      y: points.usTip.y - sa - 15
    });
    macro("vd", {
      from: points.tsRightEdge,
      to: points.usTip,
      x: points.tsRightEdge.x + sa + 15
    });
  }

  return part;
}
