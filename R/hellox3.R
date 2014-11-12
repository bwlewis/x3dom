#' x3dom hello world example
#'
#' Display three simple objects in the x3dom.
#'
#' @param width The container div width.
#' @param height The container div height.
#' @export
hello <- function(width=NULL, height=NULL)
{
  # create widget
  htmlwidgets::createWidget(
    name = "hello",
    x = list(data=data, options=options),
    width = width,
    height = height,
    htmlwidgets::sizingPolicy(padding = 0, browser.fill = TRUE),
    package = "x3dom")
}

#' @rdname x3dom-shiny
#' @export
helloOutput <- function(outputId, width = "100%", height = "400px") {
    shinyWidgetOutput(outputId, "hello", width, height,
                        package = "x3dom")
}

#' @rdname x3dom-shiny
#' @export
renderHello <- function(expr, env = parent.frame(), quoted = FALSE) {
    if (!quoted) { expr <- substitute(expr) } # force quoted
    shinyRenderWidget(expr, helloOutput, env, quoted = TRUE)
}
