/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @providesModule TicTacToeApp
 * @flow
 */
'use strict';
var _ = require('underscore');
var React = require('react-native');
var {
  AppRegistry,
  Image,
  Text,
  ScrollView,
  View,
} = React;


var Markup = React.createClass({
  getDefaultProps: : function(){
    return {
      layout :null
    }
  }
  render() {
    var layout = this.props.layout;
    return {render(layout)};  
  }
});

function render(tree){
  return (viewmap[tree.type] || viewmap['default'] )(tree);  
}

function hexfix(style){
  var ret = {};
  for (var key in style){
    var v = style[key];
    if(typeof v === 'string' && v.charAt(0)==='#' && v.length===4){      
      v = '#' + v.charAt(1) + v.charAt(1) + v.charAt(2) + v.charAt(2) +  v.charAt(3) + v.charAt(3) 
    }
    ret[key]=v;
  }
  return ret;
}

var keys = [ "width", "height", "top", "left", "right", "bottom", 
  "margin", "marginVertical", "marginHorizontal", "marginTop", "marginBottom", "marginLeft", "marginRight", 
  "padding", "paddingVertical", "paddingHorizontal", "paddingTop", "paddingBottom", "paddingLeft", "paddingRight", 
  "borderWidth", "borderTopWidth", "borderRightWidth", "borderBottomWidth", "borderLeftWidth", 
  "position", 
  "flexDirection", "flexWrap", "justifyContent", "alignItems", "alignSelf", "flex", 
  "backgroundColor", 
  "borderColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor", "borderRadius", 
  "opacity", 
  "overflow", 
  "shadowColor", "shadowOffset", "shadowOpacity", "shadowRadius", 
  "transformMatrix", "rotation", "scaleX", "scaleY", "translateX", "translateY", 


  "fontSize", "color", 'textAlign', 'resizeMode' ];

function style(tree){
  var ret = {};
  var style = tree.props.style || {};
  for(var key in style){
    if(keys.indexOf(key)>=0){
      ret[key] = style[key]
    }
  }
  return hexfix(ret);
}

var urlRegExp = /url\([\'\"]?(\S+?)[\'\"]?\)/img;

var viewmap = {
  'view': function(o){
    var _s = o.props.style || {}, s = style(o);
    var children = (o.children || []).map(render);

    
    return <View style={s}>
      { _s.backgroundImage ? 
        <Image source={{uri: _s.backgroundImage.replace(urlRegExp, function(match, url){ return url; })}} 
          style={{
            position:'absolute', 
            top:0, left:0, right:0, bottom:0, flex:1, 
            resizeMode: Image.resizeMode[_s.backgroundSize || 'cover'], 
            alignSelf:'stretch' }}>
        </Image> : <Text/>}            
      {children}
    </View>   
  
    
  },
  'default': function(o){
    console.log('missed a ' + o.type);
    
    return <View style ={style(o)}>{(o.children || []).map(render) || ''}</View> 
  },
  'carousel': function(o){
    return <ScrollView 
      horizontal={o.props.style.flexDirection==='row'?true: false} 
      style ={[{flex:1}, style(o)]}>
        {(o.children || []).map(render) || ''}
    </ScrollView> 
  },
  'image': function(o){
    return <Image 
      style={Object.assign({flex:1, alignSelf: 'stretch', 
        height:o.props.height, width:o.props.width, 
        resizeMode:Image.resizeMode.contain}, style(o))} 
      source={{uri: o.props.src}}>
        {(o.children || []).map(render) || ''}
    </Image> 
  },
  'text': function(o){
    
    return <Text style={Object.assign({overflow: 'visible'}, style(o))}> {o.props.value} </Text>
  }

}



AppRegistry.registerComponent('Markup', () => Markup);

module.exports = Markup;
