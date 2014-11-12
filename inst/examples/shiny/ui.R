library(shiny)
library(x3dom)

shinyUI(fluidPage(
  
  titlePanel("Shiny x3dom examples"),
  
  sidebarLayout(
    sidebarPanel(
      numericInput("nticks", "Number of ticks", 6, min = 0, max = 10, step = 1),
      numericInput("colors", "Number of colors", 5, min = 1, max = 8, step = 1),
      numericInput("sizes", "Number of sizes", 2, min = 1, max = 3, step = 1),
      checkboxInput("grid", label = "Grid", value = TRUE),
      p("Press the 'r' key on the figure to reset the view. Use the mouse zoom to zoom in/out.")
    ),
    mainPanel(
      tabsetPanel(
        tabPanel("scatterplot", scatterplotx3Output("x3dom")),
        tabPanel("Hello x3dom", helloOutput("hello"))
      )
    )
  )
))
