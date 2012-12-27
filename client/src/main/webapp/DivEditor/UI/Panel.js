DivEditor.UI.Panel = function(properties) {
  
  this.components = [];
  
  this.putProperties(properties);
  
  this.make();
  this.init();
  
}

DivEditor.UI.Panel.prototype = new DivEditor.UI.Component();

DivEditor.UI.Panel.prototype.addComponent = function(component, index) {
  
  if (index) {
    this.components = [].concat(this.properties.components.slice(0, index), new Array(component), this.properties.components.slice(index));
  }
  else {
    this.components.push(component);
  }
  
  component.parentElement = this.element;
  component.make();
  component.init();
  
}

DivEditor.UI.Panel.prototype.removeComponentByIndex = function(index) {
  
  this.components = this.properties.components.splice(index, 1);
  
}

DivEditor.UI.Panel.prototype.removeComponentById = function(id) {
  
  for (var index = 0; index < this.properties.components.length; index++) {
    if (this.components[index].id == id) {
      this.removeComponentByIndex(index);
      break;
    }
  }
  
}
