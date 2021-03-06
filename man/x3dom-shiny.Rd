% Generated by roxygen2 (4.0.2): do not edit by hand
\name{helloOutput}
\alias{helloOutput}
\alias{renderHello}
\alias{renderScatterplotx3}
\alias{scatterplotx3Output}
\alias{x3dom-shiny}
\title{Shiny bindings for x3dom widgets}
\usage{
helloOutput(outputId, width = "100\%", height = "400px")

renderHello(expr, env = parent.frame(), quoted = FALSE)

scatterplotx3Output(outputId, width = "100\%", height = "500px")

renderScatterplotx3(expr, env = parent.frame(), quoted = FALSE)
}
\arguments{
\item{outputId}{output variable to read from}

\item{width,height}{Must be a valid CSS unit (like \code{"100\%"},
\code{"400px"}, \code{"auto"}) or a number, which will be coerced to a
string and have \code{"px"} appended.}

\item{expr}{An expression that generates x3dom graphics.}

\item{env}{The environment in which to evaluate \code{expr}.}

\item{quoted}{Is \code{expr} a quoted expression (with \code{quote()})? This
  is useful if you want to save an expression in a variable.}
}
\description{
Output and render functions for using x3dom widgets within Shiny
applications and interactive Rmd documents.
}

