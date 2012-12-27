DivEditor.UI.FlyPanel = function(properties) {
  
  this.css = {position : 'absolute'};
  
  this.putProperties(properties);
  
  this.make();
  this.init();
  
}

DivEditor.UI.FlyPanel.prototype = new DivEditor.UI.Panel();

DivEditor.UI.FlyPanel.prototype.make = function() {
  
  DivEditor.UI.Panel.prototype.make.apply(this);
  
  if (this.element) {
    
    this.element.hide();
    
  }
  
}

DivEditor.UI.FlyPanel.prototype.refresh = function() {
  
  if (this.element) {
    
    if (this.text) {
      this.element.css(this.css);
    }
    
  }
  
}
