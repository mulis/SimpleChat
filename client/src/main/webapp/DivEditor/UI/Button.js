DivEditor.UI.Button = function(properties) {
  
  this.tagName = 'button';
  this.text = '';
  
  this.putProperties(properties);
  
  this.make();
  this.init();
  
}

DivEditor.UI.Button.prototype = new DivEditor.UI.Component();

DivEditor.UI.Button.prototype.refresh = function() {
  
  if (this.element) {
    
    if (this.text) {
      this.element.text(this.text);
    }
    
  }
  
}
