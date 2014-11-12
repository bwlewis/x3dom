#' scatterplotx3 x3dom 3D scatterplot example
#'
#' A basic 3D scatterplot using d3.js and x3dom.
#'
#' @param x A data matrix with three columns corresponding to the x,y,z
#' coordinate axes. Column labels, if present, are used as axis labels.
#' @param width The container div width.
#' @param height The container div height.
#' @param tick.marks Set FALSE to disable display of tick marks.
#' @param num.ticks A three-element vector with the suggested number of
#' ticks to display per axis.
#' @param color Either a single valid RGB, hex or named color name, or
#' a vector of valid color names of length \code{nrow(x)}.
#' @param size The plot point radius, either as a single number or a
#' vector of sizes of length \code{nrow(x)}.
#' @param grid Set FALSE to disable display of a grid.
#'
#' @source
#' Harry Voorhees: \url{http://bl.ocks.org/hlvoorhees/5986172}.
#' 
#' @examples
#' ## dontrun
#' # A stand-alone example
#' set.seed(1)
#' x <- matrix(rnorm(100*3),ncol=3)
#' scatterplotx3(x)
#'
#' # A shiny example
#' runApp(system.file("examples/shiny",package="x3dom"))
#' 
#' @seealso scatterplot3d, rgl
#' @importFrom rjson toJSON
#' @export

scatterplotx3 <- function(
  x,
  height = NULL,
  width = NULL,
  axis = TRUE,
  tick.marks = TRUE,
  num.ticks = c(6,6,6),
  color = "steelblue",
  size = 0.15,
  grid = TRUE)
{
  # validate input
  if(!is.matrix(x)) stop("x must be a three column matrix")
  if(ncol(x)!=3) stop("x must be a three column matrix")

  # create options
  options = as.list(environment())[-1]
  # javascript does not like dots in names
  i = grep("\\.",names(options))
  if(length(i)>0) names(options)[i] = gsub("\\.","",names(options)[i])
  
  # convert matrix to a JSON array required by scatterplot3x.js
  x = as.data.frame(x)
  options$key = names(x)
  # this is stupid
  if(any(c("opt__color","opt_size") %in% names(x))) stop("Sorry, the names 'opt__color' and 'opt__size' are reserved.")
  x$opt__color = color
  x$opt__size = size
  j = toJSON(Reduce(c,lapply(1:nrow(x),function(i)list(x[i,]))))

  # create widget
  htmlwidgets::createWidget(
      name = "scatterplotx3",
      x = list(data=j, options=options),
               width = width,
               height = height,
               htmlwidgets::sizingPolicy(padding = 0, browser.fill = TRUE),
               package = "x3dom")
}

#' @rdname x3dom-shiny
#' @export
scatterplotx3Output <- function(outputId, width = "100%", height = "500px") {
    shinyWidgetOutput(outputId, "scatterplotx3", width, height,
                        package = "x3dom")
}

#' @rdname x3dom-shiny
#' @export
renderScatterplotx3 <- function(expr, env = parent.frame(), quoted = FALSE) {
    if (!quoted) { expr <- substitute(expr) } # force quoted
    shinyRenderWidget(expr, scatterplotx3Output, env, quoted = TRUE)
}
