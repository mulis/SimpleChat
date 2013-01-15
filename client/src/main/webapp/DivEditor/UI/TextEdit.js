DivEditor.UI.TextEdit = function(properties) {
  
  this.text = '';
  
  this.putProperties(properties);
  
  this.make();
  this.init();
  
}

DivEditor.UI.TextEdit.prototype = new DivEditor.UI.Component();

DivEditor.UI.TextEdit.prototype.make = function() {
  
  DivEditor.UI.Component.prototype.make.apply(this);
  
  if (this.element) {

    this.element.attr('contenteditable', 'true');

  }
  
}

DivEditor.UI.TextEdit.prototype.refresh = function() {
  
  if (this.element) {
    
    if (this.text) {
      this.element.text(this.text);
    }
    
  }
  
}
