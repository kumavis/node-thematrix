###
 * thematrix
 * https://github.com/100hz/node-thematrix
 *
 * Copyright (c) 2013 Sebastian Krüger
 * Licensed under the MIT license.
###


require 'colors'

class ThematrixAspect
  
  @fill:(fill,min)->   
    fill = "THEMATRIX" if fill.length == 0
    fill = Array(Math.ceil(min / fill.length) + 1).join(fill) if fill.length < min
      
  render:->
    @renderings+=1
    
    state = @state()
    
    if(state?)
      state.call(@)
      @timer()
      
  print:->
    process.stdout.write(@buf.toString().green)
    
  fadeInLine:(i,j,random)->
    for c in [0...@fill.length]
      index = (j-c)*@w + i
      if index >= 0
        @buf[index] = @randomChar()
      else
        break
    
  fadeIn:->
    @i?=0
    @j?=0
    @lines?=[]
    
    for i in [0...@w]
      @lines[i]?= - @randomDistance()
      d = @lines[i]
      @fadeInLine(i,d,d == @h) if d > -1 && @randomFlow()
      @lines[i]+=1 if d < @h
    
    @print()

   
  randomDistance:->
    Math.floor(Math.random()*@distance)
    
  randomFlow:->
    Math.random() > 0.5
    
  randomChar:->
    @fill.charCodeAt(Math.floor(Math.random()*@fill.length))

    
  timer:->
    self = this
    setTimeout ->
      self.render()
    ,@interval
    
  state:->
    if !@i? && !@j?
      @fadeIn
    else if @i < @w && @j < @h
      @fadeIn
    #else
     # @finalize
  
  thematrix:(options = {
    interval: 50, 
    w: 80, 
    h: 24,
    distance: 20
    })->
    
    {@interval, @w, @h,@distance} = options
    
    @fill = ThematrixAspect.fill(this.toString(),@h)
    @buf = new Buffer @w*@h
    for i in [0...@buf.length]
      @buf[i]=' '.charCodeAt(0) 
    @renderings = 0

    @render()


module.exports = ThematrixAspect