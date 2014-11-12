
#' Tools for creating x3dom and d3.js graphics from R
#'
#' Tools for creating x3dom and d3.js graphics from R
#'
#' @name x3dom-package
#' @aliases x3dom
#' @docType package
NULL


#' Shiny bindings for x3dom widgets
#'
#' Output and render functions for using x3dom widgets within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{"100\%"},
#'   \code{"400px"}, \code{"auto"}) or a number, which will be coerced to a
#'   string and have \code{"px"} appended.
#' @param expr An expression that generates x3dom graphics.
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @importFrom htmlwidgets shinyWidgetOutput
#' @importFrom htmlwidgets shinyRenderWidget
#'
#' @name x3dom-shiny
NULL
