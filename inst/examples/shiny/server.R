library(shiny)
library(x3dom)

set.seed(1)
example_data <- matrix(runif(100*3),ncol=3)

shinyServer(function(input, output) {
    
  output$hello <- renderHello({
    hello()
  })

  output$x3dom <- renderScatterplotx3({
    num.ticks = input$nticks
    color = palette()[rep(1:input$colors, length.out=nrow(example_data))]
    color = gsub("[0-9]","",color)
    sizes = rep(c(0.15, 0.25, 0.35)[1:input$sizes], length.out=nrow(example_data))
    axis = num.ticks > 0
    num.ticks = rep(num.ticks,3)
    scatterplotx3(x=example_data,
                  num.ticks=num.ticks,
                  axis=axis,
                  color=color,
                  size=sizes,
                  grid=input$grid)
  })
  
})
