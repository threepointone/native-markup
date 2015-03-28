var React = require('react');

function omit(o, keys){
  Object.keys(o).reduce((x, k) =>{ 
    if (!keys.contains(k)){
      x[k]=o[k];
    } 
    return x;
  }, {});
}

var View = React.createClass({
  getDefaultProps: function () {
    return {
      tag: 'view'  
    };
  },
  render: function(){
    return <div>{this.props.children}</div>
  }
});

var Image = React.createClass({
  getDefaultProps: function () {
    return {
      tag: 'image'  
    };
  },
  render: function(){
    return <div>{this.props.children}</div>
  }
});

var Text = React.createClass({
  getDefaultProps: function () {
    return {
      tag: 'text'  
    };
  },
  render: function(){
    return <div>{this.props.children}</div>
  }
});


function toJSON(vEl){

  var ret = {
    type: vEl._store.props.tag,
    props: omit(vEl._store.props, ['children', 'tag'])
  }

  if(vEl._store.props.children){
    ret.children = vEl._store.props.children.map(toJSON);
    if(ret.children.length===0){
      delete ret.children;
    }
  }
  return ret;
}

module.exports = {
  Image: Image,
  View: View,
  Text: Text,
  toJSON: toJSON
};
